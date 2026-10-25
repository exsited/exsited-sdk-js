/** A `fetch`-shaped client on `node:http`/`node:https`: CA bundle, proxy, pool, split timeouts, no redirects. */

import {randomBytes} from 'node:crypto';
import {closeSync, fstatSync, openSync, readSync} from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';
import * as net from 'node:net';
import * as tls from 'node:tls';
import * as zlib from 'node:zlib';

import {SdkConfigError} from '../errors.js';
import {TRANSPORT_ERROR_KINDS} from './retryPolicy.js';

const ACCEPT_ENCODING = 'gzip, deflate, br, identity';

/** Copies of the config defaults, held here so this module does not import the config. */
const FALLBACK_MAX_CA_BUNDLE_BYTES = 8 * 1024 * 1024;
const FALLBACK_MAX_RESPONSE_BYTES = 64 * 1024 * 1024;

type Tagged = Error & {kind: string; limitBytes?: number};

function tagged(error: unknown, kind: string): Tagged {
    const wrapped = error instanceof Error ? error : new Error(String(error));
    return Object.assign(wrapped, {kind});
}

const TLS_ERROR_CODES = /CERT|SSL|SELF_SIGNED|UNABLE_TO_VERIFY|DEPTH_ZERO|ALT_NAME|TLSV1|WRONG_VERSION/;

/** Sort a socket error into a `TRANSPORT_ERROR_KINDS` tag; only this layer knows whether it was `delivered`. */
function classify(error: unknown, delivered = false): string {
    const code = String((error as {code?: unknown} | null)?.code || '');
    if (TLS_ERROR_CODES.test(code)) return TRANSPORT_ERROR_KINDS.SSL;
    return delivered ? TRANSPORT_ERROR_KINDS.CONNECTION_RESET : TRANSPORT_ERROR_KINDS.CONNECTION;
}

async function encodeBody(body: unknown): Promise<{bytes: Buffer | null; contentType: string | null}> {
    if (body === null || body === undefined) return {bytes: null, contentType: null};
    if (typeof body === 'string') return {bytes: Buffer.from(body, 'utf8'), contentType: null};
    if (body instanceof URLSearchParams) {
        return {
            bytes: Buffer.from(body.toString(), 'utf8'),
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        };
    }
    if (typeof FormData !== 'undefined' && body instanceof FormData) {
        const encoded = await encodeMultipart(body);
        return {bytes: Buffer.from(encoded.bytes), contentType: encoded.contentType};
    }
    if (body instanceof Uint8Array) return {bytes: Buffer.from(body), contentType: null};
    if (body instanceof ArrayBuffer) return {bytes: Buffer.from(new Uint8Array(body)), contentType: null};
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        // `String(blob)` would put "[object Blob]" on the wire.
        return {bytes: Buffer.from(new Uint8Array(await body.arrayBuffer())), contentType: body.type || null};
    }
    if (typeof (body as {[Symbol.asyncIterator]?: unknown})[Symbol.asyncIterator] === 'function') {
        const chunks: Buffer[] = [];
        for await (const chunk of body as AsyncIterable<unknown>) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as Uint8Array));
        }
        return {bytes: Buffer.concat(chunks), contentType: null};
    }
    return {bytes: Buffer.from(String(body), 'utf8'), contentType: null};
}

/** One value made safe inside a quoted `Content-Disposition` parameter: percent form, as WHATWG ignores backslashes. */
function escapePartParameter(value: string): string {
    return value.replaceAll('\\', '%5C').replaceAll('"', '%22');
}

/** One multipart part, with every label and byte already read, so nothing is read twice. */
export interface MultipartPart {
    /** The field name. */
    name: string;
    /** `null` for a plain field rather than an upload. */
    filename: string | null;
    /** The part's own media type, when it has one. */
    contentType: string | null;
    content: Uint8Array | string;
}

const BOUNDARY_ATTEMPTS = 8;

const BOUNDARY_PREFIX = '----ExsitedSDK';
const BOUNDARY_RANDOM_BYTES = 16;

/** How many characters - and, being ASCII, how many bytes - every boundary this SDK writes has. */
export const MULTIPART_BOUNDARY_LENGTH = BOUNDARY_PREFIX.length + BOUNDARY_RANDOM_BYTES * 2;

const PLACEHOLDER_BOUNDARY = 'x'.repeat(MULTIPART_BOUNDARY_LENGTH);

const DEFAULT_PART_CONTENT_TYPE = 'application/octet-stream';

function newBoundary(): string {
    return `${BOUNDARY_PREFIX}${randomBytes(BOUNDARY_RANDOM_BYTES).toString('hex')}`;
}

/** The delimiter and header block in front of one part - the one place framing is spelled out. */
function partHeaderText(part: Omit<MultipartPart, 'content'>, boundary: string): string {
    const field = escapePartParameter(part.name);
    if (part.filename === null) {
        return `--${boundary}\r\nContent-Disposition: form-data; name="${field}"\r\n\r\n`;
    }
    const filename = escapePartParameter(part.filename);
    const type = part.contentType || DEFAULT_PART_CONTENT_TYPE;
    return (
        `--${boundary}\r\nContent-Disposition: form-data; name="${field}"; filename="${filename}"\r\n` +
        `Content-Type: ${type}\r\n\r\n`
    );
}

/** How many bytes of framing one part costs, as the encoder writes it. */
export function multipartFramingBytes(part: Omit<MultipartPart, 'content'>): number {
    return Buffer.byteLength(partHeaderText(part, PLACEHOLDER_BOUNDARY), 'utf8') + 2;
}

/** The framing bytes the closing `--<boundary>--\r\n` delimiter costs. */
export const MULTIPART_CLOSING_BYTES = Buffer.byteLength(`--${PLACEHOLDER_BOUNDARY}--\r\n`, 'utf8');

const CRLF = Buffer.from('\r\n', 'utf8');

const EMPTY_BUFFER = Buffer.alloc(0);

/** Whether any part, content or label, carries the delimiter `--<boundary>` this boundary would write. */
function boundaryCollides(parts: readonly MultipartPart[], boundary: string): boolean {
    const delimiter = `--${boundary}`;
    const delimiterBytes = Buffer.from(delimiter, 'utf8');
    for (const part of parts) {
        if (part.name.includes(delimiter)) return true;
        if (part.filename !== null && part.filename.includes(delimiter)) return true;
        if (part.contentType !== null && part.contentType.includes(delimiter)) return true;
        const content =
            typeof part.content === 'string'
                ? Buffer.from(part.content, 'utf8')
                : Buffer.from(part.content.buffer, part.content.byteOffset, part.content.byteLength);
        if (content.indexOf(delimiterBytes) !== -1) return true;
    }
    return false;
}

/** Encode materialised parts as a multipart body and its `Content-Type`; the random boundary is redrawn on collision. */
export function encodeMultipartParts(parts: readonly MultipartPart[]): {bytes: Uint8Array; contentType: string} {
    let boundary = newBoundary();
    for (let tries = 0; boundaryCollides(parts, boundary); tries += 1) {
        if (tries >= BOUNDARY_ATTEMPTS) {
            // Unreachable short of a payload built to contain this SDK's random boundaries.
            throw new Error('no multipart boundary could be found that the payload does not already contain');
        }
        boundary = newBoundary();
    }
    const chunks: Uint8Array[] = [];
    for (const part of parts) {
        chunks.push(Buffer.from(partHeaderText(part, boundary), 'utf8'));
        // Used as it stands: `transport.ts` already copied every upload into private storage.
        chunks.push(typeof part.content === 'string' ? Buffer.from(part.content, 'utf8') : part.content);
        chunks.push(CRLF);
    }
    chunks.push(Buffer.from(`--${boundary}--\r\n`, 'utf8'));
    return {bytes: Buffer.concat(chunks), contentType: `multipart/form-data; boundary=${boundary}`};
}

export async function encodeMultipart(form: FormData): Promise<{bytes: Uint8Array; contentType: string}> {
    const parts: MultipartPart[] = [];
    for (const [name, value] of form.entries()) {
        if (typeof value === 'object' && value !== null && typeof value.arrayBuffer === 'function') {
            parts.push({
                name,
                filename: value.name || name,
                contentType: value.type || null,
                content: new Uint8Array(await value.arrayBuffer()),
            });
        } else {
            parts.push({name, filename: null, contentType: null, content: String(value)});
        }
    }
    return encodeMultipartParts(parts);
}

function overCap(limitBytes: number): Tagged {
    return Object.assign(
        tagged(
            new Error(`the response body is over the ${limitBytes}-byte maxResponseBytes cap`),
            TRANSPORT_ERROR_KINDS.RESPONSE_TOO_LARGE,
        ),
        {limitBytes},
    );
}

/** Refusal of a body that could not be decoded from its declared encoding; the bytes are not shown. */
function undecodableBody(encoding: string, cause: unknown): Tagged {
    const held = cause as {code?: unknown; message?: unknown} | null;
    const reason = String(held?.code || held?.message || 'unknown');
    return tagged(
        new Error(`the response declared Content-Encoding: ${encoding} but the body could not be decoded (${reason})`),
        TRANSPORT_ERROR_KINDS.CONTENT_DECODING,
    );
}

/** Refusal of an encoding with no decoder; the peer's token is named, not the body. */
function unsupportedEncoding(encoding: string, header: string): Tagged {
    return tagged(
        new Error(
            `the response declared Content-Encoding: ${header}, and ${encoding} is not one this SDK can decode; ` +
                `the request asked for ${ACCEPT_ENCODING}`,
        ),
        TRANSPORT_ERROR_KINDS.CONTENT_DECODING,
    );
}

const DECODERS: Record<string, (input: Buffer, options: zlib.ZlibOptions) => Buffer> = {
    gzip: zlib.gunzipSync,
    'x-gzip': zlib.gunzipSync,
    deflate: zlib.inflateSync,
    br: zlib.brotliDecompressSync as (input: Buffer, options: zlib.ZlibOptions) => Buffer,
};

/**
 * Decompress per `Content-Encoding`, right to left, under the read ceiling; `maxOutputLength` stops a small
 * gzip body inflating to gigabytes before any cap is consulted.
 */
function decompress(bytes: Buffer, encoding: unknown, limitBytes: number): Buffer {
    if (!bytes.length) return bytes;
    const header = String(encoding || '').trim();
    const layers = header
        .split(',')
        .map((token) => token.toLowerCase().trim())
        .filter((token) => token && token !== 'identity');
    if (!layers.length) return bytes;
    // +1, so a body exactly on the limit inflates and one byte past it raises.
    const options = {maxOutputLength: limitBytes + 1};
    let decoded = bytes;
    for (const name of layers.reverse()) {
        const decoder = DECODERS[name];
        if (!decoder) throw unsupportedEncoding(name, header);
        try {
            decoded = decoder(decoded, options);
        } catch (error) {
            if ((error as {code?: unknown} | null)?.code === 'ERR_BUFFER_TOO_LARGE') throw overCap(limitBytes);
            throw undecodableBody(name, error);
        }
    }
    return decoded;
}

function handshakeSettled(socket: net.Socket): boolean {
    const secure = socket as tls.TLSSocket;
    if (!secure.encrypted) return true;
    try {
        return Boolean(typeof secure.getCipher === 'function' && secure.getCipher());
    } catch {
        return false;
    }
}

/** Read the CA bundle once, at construction and under a ceiling, so no request can fail on reading it. */
function readCaBundle(caBundle: string | null | undefined, maxBytes: number): Buffer | undefined {
    if (!caBundle) return undefined;
    let handle: number;
    try {
        handle = openSync(caBundle, 'r');
    } catch (error) {
        // The errno name is the structural part; the path goes on the withheld `details`.
        throw new SdkConfigError(
            `caBundle: the file it names could not be opened (${fileErrorCode(error)}); pass a readable PEM path, ` +
                'or null to use the system trust store',
            {details: {caBundle}},
        );
    }
    try {
        const declared = fstatSync(handle).size;
        // Sized from the handle's own length, not the ceiling; the `+ 1` catches a file that grew.
        const want = Math.min(declared, maxBytes) + 1;
        const buffer = Buffer.allocUnsafe(want);
        let read: number;
        try {
            read = readSync(handle, buffer, 0, want, 0);
        } catch (error) {
            throw new SdkConfigError(
                `caBundle: the file it names could not be read (${fileErrorCode(error)}); pass a readable PEM ` +
                    'path, or null to use the system trust store',
                {details: {caBundle}},
            );
        }
        if (read > maxBytes) {
            throw new SdkConfigError(
                `caBundle: the file it names is over the ${maxBytes}-byte maxCaBundleBytes ceiling, so it was not ` +
                    'read - a trust store is a few hundred kilobytes; raise maxCaBundleBytes if this one is ' +
                    'legitimately larger',
                {details: {caBundle}},
            );
        }
        return Buffer.from(buffer.subarray(0, read));
    } finally {
        closeSync(handle);
    }
}

function fileErrorCode(error: unknown): string {
    const code = (error as {code?: unknown} | null)?.code;
    return typeof code === 'string' && code ? code : 'unreadable';
}

function proxyIsSecure(proxy: URL): boolean {
    return proxy.protocol === 'https:';
}

function proxyPort(proxy: URL): number {
    return Number(proxy.port || (proxyIsSecure(proxy) ? 443 : 80));
}

function proxyAuthorization(proxy: URL): string | null {
    if (!proxy.username) return null;
    const credentials = Buffer.from(
        `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password || '')}`,
    ).toString('base64');
    return `Basic ${credentials}`;
}

type RegisterAbort = (abort: () => void) => () => void;

/** Open a `CONNECT` tunnel for an https target; an `https://` proxy is verified against the CA bundle. */
function openProxyTunnel(
    proxy: URL,
    target: URL,
    connectTimeoutMs: number,
    trust: {ca: Buffer | undefined; verifySsl: boolean},
    registerAbort: RegisterAbort,
): Promise<net.Socket> {
    return new Promise((resolve, reject) => {
        const port = target.port || '443';
        const options: https.RequestOptions = {
            host: proxy.hostname,
            port: proxyPort(proxy),
            method: 'CONNECT',
            path: `${target.hostname}:${port}`,
            headers: {Host: `${target.hostname}:${port}`},
            agent: false,
        };
        const authorization = proxyAuthorization(proxy);
        if (authorization) (options.headers as Record<string, string>)['Proxy-Authorization'] = authorization;
        if (proxyIsSecure(proxy)) {
            if (trust.ca !== undefined) options.ca = trust.ca;
            options.rejectUnauthorized = trust.verifySsl;
            // RFC 6066 forbids an IP literal as the SNI name.
            if (!net.isIP(proxy.hostname)) options.servername = proxy.hostname;
        }
        const request = (proxyIsSecure(proxy) ? https : http).request(options);
        const timer = setTimeout(() => {
            request.destroy(
                tagged(
                    new Error(`proxy CONNECT timed out after ${connectTimeoutMs}ms`),
                    TRANSPORT_ERROR_KINDS.CONNECT_TIMEOUT,
                ),
            );
        }, connectTimeoutMs);
        // Attached before `end()`, so an abort already pending tears this stage down at once.
        const unregisterAbort = registerAbort(() =>
            request.destroy(
                tagged(
                    new Error('request aborted while the proxy tunnel was being opened'),
                    TRANSPORT_ERROR_KINDS.CONNECT_TIMEOUT,
                ),
            ),
        );
        const settle = (): void => {
            clearTimeout(timer);
            unregisterAbort();
        };
        request.on('connect', (response: http.IncomingMessage, socket: net.Socket) => {
            settle();
            if (response.statusCode !== 200) {
                socket.destroy();
                reject(
                    tagged(
                        new Error(`proxy refused CONNECT with ${response.statusCode}`),
                        TRANSPORT_ERROR_KINDS.CONNECTION,
                    ),
                );
                return;
            }
            resolve(socket);
        });
        request.on('error', (error: Error & {kind?: string}) => {
            settle();
            reject(tagged(error, error.kind || classify(error)));
        });
        request.end();
    });
}

export interface NodeFetchSettings {
    caBundle?: string | null;
    verifySsl?: boolean;
    proxyUrl?: string | null;
    poolMaxsize?: number;
    connectTimeoutSeconds?: number;
    timeoutSeconds?: number;
    /** Bounds the read and the inflate, not just the verdict. */
    maxResponseBytes?: number;
    /** Bounds the trust store read at construction. */
    maxCaBundleBytes?: number;
}

/** The backend `createNodeFetch` answers: `fetch`, plus closing the pool and emptying it. */
export type NodeFetch = ((url: string, init?: RequestInit) => Promise<Response>) & {
    close: () => void;
    discardPooledConnections: () => void;
};

/** A `fetch` on node:http/https honouring the TLS, proxy, pool, timeout and size settings of one config. */
export function createNodeFetch(settings: NodeFetchSettings = {}): NodeFetch {
    const verifySsl = settings.verifySsl !== false;
    const maxCaBundleBytes =
        Number.isInteger(settings.maxCaBundleBytes) && (settings.maxCaBundleBytes as number) > 0
            ? (settings.maxCaBundleBytes as number)
            : FALLBACK_MAX_CA_BUNDLE_BYTES;
    const ca = readCaBundle(settings.caBundle, maxCaBundleBytes);
    const poolMaxsize =
        Number.isInteger(settings.poolMaxsize) && (settings.poolMaxsize as number) > 0
            ? (settings.poolMaxsize as number)
            : 10;
    const connectTimeoutMs = Math.max(1, (settings.connectTimeoutSeconds ?? 10) * 1000);
    const readTimeoutMs = Math.max(1, (settings.timeoutSeconds ?? 30) * 1000);
    const maxResponseBytes =
        Number.isInteger(settings.maxResponseBytes) && (settings.maxResponseBytes as number) > 0
            ? (settings.maxResponseBytes as number)
            : FALLBACK_MAX_RESPONSE_BYTES;
    const proxy = settings.proxyUrl ? new URL(settings.proxyUrl) : null;

    // `maxSockets` is unbounded: a capped agent queues, and the connect deadline would call that wait a timeout.
    const agentOptions: http.AgentOptions = {keepAlive: true, maxSockets: Infinity, maxFreeSockets: poolMaxsize};
    const trustOptions: https.AgentOptions =
        ca === undefined ? {rejectUnauthorized: verifySsl} : {ca, rejectUnauthorized: verifySsl};
    // Rebuildable, so a caller can be given a fresh connection.
    let httpsAgent = new https.Agent({...agentOptions, ...trustOptions});
    let httpAgent = new http.Agent(agentOptions);

    async function nodeFetch(url: string, init: RequestInit = {}): Promise<Response> {
        const target = new URL(url);
        const secure = target.protocol === 'https:';

        // Abort is wired up first: encoding a body and opening a tunnel both precede the request.
        const signal = init.signal ?? null;
        let aborted = Boolean(signal && signal.aborted);
        let notifyAbort: (() => void) | null = null;
        const onAbort = (): void => {
            aborted = true;
            if (notifyAbort) notifyAbort();
        };
        if (signal) signal.addEventListener('abort', onAbort, {once: true});
        const refuseIfAborted = (): void => {
            // Raised, not routed through `fail`: there is no ClientRequest to destroy yet.
            if (aborted) throw tagged(new Error('request aborted'), TRANSPORT_ERROR_KINDS.READ_TIMEOUT);
        };

        /** Releases a per-request proxy tunnel once the call has settled. */
        let releaseTunnel: (() => void) | null = null;

        try {
            refuseIfAborted();
            const {bytes, contentType} = await encodeBody(init.body);
            refuseIfAborted();

            const headers: Record<string, string> = {'Accept-Encoding': ACCEPT_ENCODING};
            for (const [name, value] of Object.entries((init.headers ?? {}) as Record<string, unknown>)) {
                headers[name] = String(value);
            }
            if (contentType && !Object.keys(headers).some((n) => n.toLowerCase() === 'content-type')) {
                headers['Content-Type'] = contentType;
            }
            if (bytes) headers['Content-Length'] = String(bytes.length);

            // The first hop's scheme decides: plaintext to a TLS proxy would expose the proxy credentials.
            const tunnelled = Boolean(proxy) && secure;
            const firstHopSecure = proxy ? (tunnelled ? true : proxyIsSecure(proxy)) : secure;

            const options: https.RequestOptions = {
                method: init.method || 'GET',
                headers,
                host: target.hostname,
                port: target.port || (secure ? 443 : 80),
                path: `${target.pathname}${target.search}`,
            };

            if (proxy && !secure) {
                // Plain HTTP through a proxy: the request line carries the absolute URI.
                options.host = proxy.hostname;
                options.port = proxyPort(proxy);
                options.path = url;
                options.agent = firstHopSecure ? httpsAgent : httpAgent;
                // Set explicitly: Node derives `Host` from the proxy it dials, and proxies route by it.
                headers['Host'] = target.host;
                const authorization = proxyAuthorization(proxy);
                if (authorization) headers['Proxy-Authorization'] = authorization;
                if (firstHopSecure) {
                    if (ca !== undefined) options.ca = ca;
                    options.rejectUnauthorized = verifySsl;
                    if (!net.isIP(proxy.hostname)) options.servername = proxy.hostname;
                }
            } else if (proxy && secure) {
                // HTTPS through a proxy: tunnel first, then TLS over that socket, on its own agent.
                const tunnel = await openProxyTunnel(proxy, target, connectTimeoutMs, {ca, verifySsl}, (abort) => {
                    notifyAbort = abort;
                    if (aborted) abort();
                    return () => {
                        notifyAbort = null;
                    };
                });
                const tunnelAgent = new https.Agent({keepAlive: false, ...trustOptions});
                const servername = net.isIP(target.hostname) ? undefined : target.hostname;
                const tlsOptions: tls.ConnectionOptions = {socket: tunnel, ...trustOptions};
                if (servername !== undefined) tlsOptions.servername = servername;
                (tunnelAgent as unknown as {createConnection: () => net.Socket}).createConnection = () =>
                    tls.connect(tlsOptions);
                options.agent = tunnelAgent;
                if (ca !== undefined) options.ca = ca;
                options.rejectUnauthorized = verifySsl;
                releaseTunnel = () => {
                    tunnelAgent.destroy();
                    tunnel.destroy();
                };
                // An abort during the open must not be answered by sending the request down it.
                refuseIfAborted();
            } else {
                options.agent = secure ? httpsAgent : httpAgent;
                if (secure) {
                    if (ca !== undefined) options.ca = ca;
                    options.rejectUnauthorized = verifySsl;
                }
            }

            return await new Promise<Response>((resolve, reject) => {
                const request = (firstHopSecure ? https : http).request(options);
                let connected = false;
                let settled = false;
                /** Detaches the handshake listeners this request put on its socket. */
                let releaseSocketListeners = (): void => {};
                let readTimer: ReturnType<typeof setTimeout> | undefined;

                const fail = (error: unknown, kind: string): void => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(connectTimer);
                    clearTimeout(readTimer);
                    releaseSocketListeners();
                    request.destroy();
                    if (releaseTunnel) releaseTunnel();
                    reject(tagged(error, kind));
                };

                // Attached first: destroying a ClientRequest with no 'error' listener raises.
                request.on('error', (error: Error & {kind?: string}) =>
                    fail(error, error.kind || classify(error, connected)),
                );

                // The connect half only, so a slow body cannot pass for a connect timeout and be retried wrongly.
                const connectTimer = setTimeout(() => {
                    fail(
                        new Error(`connect timed out after ${connectTimeoutMs}ms`),
                        TRANSPORT_ERROR_KINDS.CONNECT_TIMEOUT,
                    );
                }, connectTimeoutMs);

                const armReadTimer = (): void => {
                    clearTimeout(readTimer);
                    readTimer = setTimeout(() => {
                        fail(new Error(`read timed out after ${readTimeoutMs}ms`), TRANSPORT_ERROR_KINDS.READ_TIMEOUT);
                    }, readTimeoutMs);
                };

                const markConnected = (): void => {
                    if (connected) return;
                    connected = true;
                    clearTimeout(connectTimer);
                    armReadTimer();
                };

                request.on('socket', (socket: net.Socket) => {
                    if (!socket.connecting && handshakeSettled(socket)) {
                        // A pooled socket: neither event fires again, so a listener would leak.
                        markConnected();
                        return;
                    }
                    const onEstablished = (): void => {
                        releaseSocketListeners();
                        markConnected();
                    };
                    // Removed explicitly, or the event that did not fire stays on a pooled socket.
                    releaseSocketListeners = () => {
                        releaseSocketListeners = () => {};
                        socket.removeListener('connect', onEstablished);
                        socket.removeListener('secureConnect', onEstablished);
                    };
                    // Only `secureConnect` ends a TLS connect; `connect` fires before any certificate is exchanged.
                    if ((socket as tls.TLSSocket).encrypted) socket.on('secureConnect', onEstablished);
                    else socket.on('connect', onEstablished);
                });

                notifyAbort = () => {
                    fail(
                        new Error('request aborted'),
                        connected ? TRANSPORT_ERROR_KINDS.READ_TIMEOUT : TRANSPORT_ERROR_KINDS.CONNECT_TIMEOUT,
                    );
                };
                if (aborted) {
                    notifyAbort();
                    return;
                }

                request.on('response', (response: http.IncomingMessage) => {
                    clearTimeout(connectTimer);
                    connected = true;
                    releaseSocketListeners();
                    armReadTimer();
                    // Refused before a byte is read: the last point the allocation can be avoided.
                    const declared = Number(response.headers['content-length']);
                    if (Number.isFinite(declared) && declared > maxResponseBytes) {
                        fail(overCap(maxResponseBytes), TRANSPORT_ERROR_KINDS.RESPONSE_TOO_LARGE);
                        return;
                    }
                    const chunks: Buffer[] = [];
                    let received = 0;
                    response.on('data', (chunk: Buffer) => {
                        received += chunk.length;
                        // An undeclared or lying length is bounded by what has actually arrived.
                        if (received > maxResponseBytes) {
                            chunks.length = 0;
                            fail(overCap(maxResponseBytes), TRANSPORT_ERROR_KINDS.RESPONSE_TOO_LARGE);
                            return;
                        }
                        chunks.push(chunk);
                        armReadTimer();
                    });
                    response.on('end', () => {
                        if (settled) return;
                        settled = true;
                        clearTimeout(readTimer);
                        let raw = Buffer.concat(chunks);
                        // Both intermediates are cap-sized: one ceiling would otherwise permit two.
                        chunks.length = 0;
                        let body: Buffer;
                        try {
                            body = decompress(raw, response.headers['content-encoding'], maxResponseBytes);
                            if (body !== raw) raw = EMPTY_BUFFER;
                        } catch (error) {
                            // `settled` is already true, so `fail` would drop this refusal.
                            request.destroy();
                            if (releaseTunnel) releaseTunnel();
                            reject(error);
                            return;
                        }
                        const outHeaders = new Headers();
                        for (const [name, value] of Object.entries(response.headers)) {
                            if (value === undefined) continue;
                            if (Array.isArray(value)) for (const item of value) outHeaders.append(name, item);
                            else outHeaders.set(name, String(value));
                        }
                        // The decompressed length is what a reader would measure.
                        if (outHeaders.has('content-encoding')) {
                            outHeaders.delete('content-encoding');
                            outHeaders.set('content-length', String(body.length));
                        }
                        if (releaseTunnel) releaseTunnel();
                        // A status a `Response` cannot carry, such as a 1xx, reads as the gateway failure it stands for.
                        const status = response.statusCode && response.statusCode >= 200 ? response.statusCode : 502;
                        resolve(
                            new Response(body.length ? new Uint8Array(body) : null, {
                                status,
                                statusText: response.statusMessage || '',
                                headers: outHeaders,
                            }),
                        );
                    });
                    // The response had already begun, so the request was delivered in full.
                    response.on('error', (error: Error) => fail(error, classify(error, true)));
                });

                if (bytes) request.write(bytes);
                request.end();
            });
        } catch (error) {
            if (releaseTunnel) (releaseTunnel as () => void)();
            throw error;
        } finally {
            if (signal) signal.removeEventListener('abort', onAbort);
        }
    }

    const backend = nodeFetch as NodeFetch;
    backend.close = () => {
        httpsAgent.destroy();
        httpAgent.destroy();
    };
    /** Empty the pools and rebuild them; unlike `close()`, the instance stays usable. */
    backend.discardPooledConnections = () => {
        httpsAgent.destroy();
        httpAgent.destroy();
        httpsAgent = new https.Agent({...agentOptions, ...trustOptions});
        httpAgent = new http.Agent(agentOptions);
    };
    return backend;
}
