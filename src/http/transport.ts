/** The wire: one request per attempt, retries, timeouts, size ceilings and decoding. */

import {ErrorType, pathTemplateOf} from '../client/apiResponse.js';
import {
    DEFAULT_MAX_MULTIPART_OVERHEAD_BYTES,
    DEFAULT_MAX_REQUEST_BYTES,
    DEFAULT_MAX_RESPONSE_BYTES,
    DEFAULT_MAX_UPLOAD_BYTES,
    DEFAULT_TIMEOUT_SECONDS,
    type SdkConfig,
    unsendableHeaderReason,
} from '../config/sdkConfig.js';
import {SdkError, SdkUsageError, describeCause} from '../errors.js';
import {isJsonContentType} from './mediaType.js';
import {
    MULTIPART_CLOSING_BYTES,
    type MultipartPart,
    createNodeFetch,
    encodeMultipartParts,
    multipartFramingBytes,
} from './nodeFetch.js';
import {RetryPolicy, TRANSPORT_ERROR_KINDS} from './retryPolicy.js';
import {refuseUnsendableUrl} from './urlBuilder.js';

export type UploadContent = Uint8Array | ArrayBuffer | Blob | AsyncIterable<unknown>;

export type UploadValue =
    | UploadContent
    | readonly [filename: string | null, content: UploadContent]
    | readonly [filename: string | null, content: UploadContent, contentType: string | null];

export type MultipartFiles =
    | Readonly<Record<string, UploadValue>>
    | ReadonlyMap<string, UploadValue>
    | ReadonlyArray<readonly [name: string, value: UploadValue]>
    | Iterable<readonly [name: string, value: UploadValue]>;

export type FormFields =
    | Readonly<Record<string, unknown>>
    | ReadonlyMap<string, unknown>
    | ReadonlyArray<readonly [name: string, value: unknown]>
    | Iterable<readonly [name: string, value: unknown]>;

/** One encoded body: a frozen record whose `bytes` answers a copy of private bytes. */
export interface WireBody {
    readonly bytes: Uint8Array | null;
    readonly contentType: string | null;
}

/** The ceilings a caller may set on one request's preparation; an omitted value falls back. */
export interface RequestCeilings {
    /** Alias of `maxUploadBytes`. */
    maxBytes?: number | undefined;
    maxUploadBytes?: number | undefined;
    maxRequestBytes?: number | undefined;
    maxMultipartOverheadBytes?: number | undefined;
    prepareTimeoutMs?: number | undefined;
}

/** One request as the client hands it over; `body` comes pre-encoded from {@link encodeRequestBody}. */
export interface HttpRequest {
    method: string;
    url: string;
    endpoint?: string | null | undefined;
    params?: Readonly<Record<string, unknown>> | null | undefined;
    body?: WireBody | null | undefined;
    jsonBody?: unknown;
    formData?: unknown;
    files?: unknown;
    headers?: Readonly<Record<string, string | Uint8Array>> | null | undefined;
}

/** What one exchange produced, before the client wraps it in an `ApiResponse`. */
export interface HttpResponseParts {
    statusCode: number;
    data: unknown;
    bodyText: string | null;
    headers: Record<string, string>;
    contentType: string | null;
    resolvedUrl: string;
    attemptCount: number;
    maxAttempts: number;
    elapsedSeconds: number;
}

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

export interface TransportOptions {
    retryPolicy?: RetryPolicy | null | undefined;
    dispatcher?: unknown;
    onProgress?: ((message: string) => void) | undefined;
    fetchImpl?: FetchLike | null | undefined;
    /** How a retry waits; a caller can replace it, for example to avoid sleeping. */
    sleep?: ((ms: number) => Promise<void>) | undefined;
}

type Tagged = Error & {kind?: string; limitBytes?: number};

const JSON_CONTENT_TYPE = 'application/json';
const TEXT_CONTENT_TYPE_PREFIX = 'text/';
const UNKNOWN_PARAMETER_ERROR = 'unknown_parameter';
const RESENDABLE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const PARAMETER_NAME_PATTERN = /[A-Za-z0-9_-]+/;
/** Bytes that forge a part header; prototype-less, so `'constructor'` is no match. */
const FORGEABLE_PART_BYTES: Record<string, string> = Object.assign(Object.create(null) as Record<string, string>, {
    '\r': 'a carriage return',
    '\n': 'a newline',
    '\u0000': 'a NUL',
});
/** Header bytes are octets, so they are read back one byte per character. */
const LATIN1_DECODER = new TextDecoder('latin1');
const BYTE_ORDER_MARK = /^\uFEFF/;

/** Default ceiling on a request body's source material, as `SdkConfig.maxUploadBytes`. */
export const MAX_REQUEST_BODY_BYTES = DEFAULT_MAX_UPLOAD_BYTES;

const DEFAULT_PREPARE_TIMEOUT_MS = DEFAULT_TIMEOUT_SECONDS * 1000;

function overCeiling(label: string, maxBytes: number, setting: string, advice: string): SdkUsageError {
    return new SdkUsageError(
        `${label}: over the ${maxBytes}-byte ${setting} ceiling, so the request was not built - ${advice}`,
    );
}

const UPLOAD_ADVICE =
    'this SDK reads an upload into memory to build the body, so the source material is what it has to hold; ' +
    'raise maxUploadBytes on the client, or split the payload across several calls';
const REQUEST_ADVICE =
    'this is the encoded body that would cross the wire, framing included; raise maxRequestBytes on the client, ' +
    'or split the payload across several calls';
const FRAMING_ADVICE =
    'delimiters, part headers and encoded names are counted apart from the content, because a payload of many ' +
    'small parts is mostly framing; raise maxMultipartOverheadBytes on the client, or send fewer parts';

function preparationTimedOut(timeoutMs: number): SdkError {
    return Object.assign(
        new SdkError(`the request body could not be built within ${timeoutMs}ms`, {
            errorType: ErrorType.TIMEOUT,
            rawResponse: null,
        }),
        {kind: TRANSPORT_ERROR_KINDS.READ_TIMEOUT},
    );
}

interface ByteBudget {
    readonly limit: number;
    readonly remaining: number;
    take(bytes: number, label: string, setting: string, advice: string): void;
}

/** A running total against one ceiling, shared across a request so the limit is an aggregate. */
function byteBudget(limit: number): ByteBudget {
    let used = 0;
    return {
        limit,
        get remaining() {
            return Math.max(0, limit - used);
        },
        take(bytes, label, setting, advice) {
            used += bytes;
            if (used > limit) throw overCeiling(label, limit, setting, advice);
        },
    };
}

interface Deadline {
    race<T>(promise: Promise<T>): Promise<T>;
    close(): void;
}

/** One deadline over a request's preparation, able to interrupt a blocked producer. */
function preparationDeadline(timeoutMs: number): Deadline {
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
        return {race: (promise) => promise, close: () => {}};
    }
    let timer: ReturnType<typeof setTimeout> | null = null;
    const expiry = new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => reject(preparationTimedOut(timeoutMs)), timeoutMs);
    });
    // Nothing races the expiry when there is no stream, and an unhandled rejection kills the process.
    expiry.catch(() => {});
    return {
        race: <T>(promise: Promise<T>): Promise<T> => {
            // The losing promise settles later; an unhandled rejection kills the process.
            promise.catch(() => {});
            return Promise.race([promise, expiry]);
        },
        close: () => {
            if (timer !== null) clearTimeout(timer);
            timer = null;
        },
    };
}

/** The ceilings and preparation deadline one config implies. */
export function requestCeilings(config: Partial<SdkConfig> | null | undefined): RequestCeilings {
    const timeoutSeconds = config?.timeoutSeconds;
    return {
        maxUploadBytes: config?.maxUploadBytes,
        maxRequestBytes: config?.maxRequestBytes,
        maxMultipartOverheadBytes: config?.maxMultipartOverheadBytes,
        prepareTimeoutMs:
            typeof timeoutSeconds === 'number' && Number.isFinite(timeoutSeconds) ? timeoutSeconds * 1000 : undefined,
    };
}

interface ResolvedCeilings {
    maxUploadBytes: number;
    maxRequestBytes: number;
    maxMultipartOverheadBytes: number;
    prepareTimeoutMs: number;
}

function positiveOr(supplied: unknown, fallback: number): number {
    return typeof supplied === 'number' && Number.isFinite(supplied) && supplied > 0 ? supplied : fallback;
}

function resolveCeilings(options: RequestCeilings = {}): ResolvedCeilings {
    return {
        maxUploadBytes: positiveOr(options.maxUploadBytes ?? options.maxBytes, DEFAULT_MAX_UPLOAD_BYTES),
        maxRequestBytes: positiveOr(options.maxRequestBytes, DEFAULT_MAX_REQUEST_BYTES),
        maxMultipartOverheadBytes: positiveOr(options.maxMultipartOverheadBytes, DEFAULT_MAX_MULTIPART_OVERHEAD_BYTES),
        prepareTimeoutMs: positiveOr(options.prepareTimeoutMs, DEFAULT_PREPARE_TIMEOUT_MS),
    };
}

/** A header value as text, or `null` when the value is neither text nor bytes. */
export function headerValueText(value: unknown): string | null {
    if (typeof value === 'string') return value;
    if (value instanceof Uint8Array) return LATIN1_DECODER.decode(value);
    return null;
}

/** An HTTP method token, per RFC 9110. The same pattern as `retryPolicy.ts`. */
const HTTP_METHOD_TOKEN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

/** Normalise and validate the HTTP verb before any I/O; `'GET\r\nX: y'` would forge a request line. */
function requestMethod(httpMethod: unknown): string {
    if (typeof httpMethod !== 'string' || !httpMethod.trim()) {
        throw new SdkUsageError(
            `httpMethod: expected a non-blank string like 'GET', got ${JSON.stringify(httpMethod)}`,
        );
    }
    const method = httpMethod.trim().toUpperCase();
    if (!HTTP_METHOD_TOKEN.test(method)) {
        throw new SdkUsageError(
            `httpMethod: ${JSON.stringify(httpMethod)} is not an HTTP method - a method is one token of ` +
                'letters, digits and the punctuation RFC 9110 allows, with no spaces or control characters',
        );
    }
    return method;
}

/** The headers as the wire will carry them; anything but text or bytes is refused, not coerced. */
function sendableHeaders(headers: Readonly<Record<string, unknown>> | null | undefined): Record<string, string> {
    // Prototype-less while filled, so `__proto__` is recorded as a header; restored because fetch spreads it.
    const sendable = Object.create(null) as Record<string, string>;
    for (const [name, value] of Object.entries(headers || {})) {
        const valueText = headerValueText(value);
        const unsendable = unsendableHeaderReason(name, valueText);
        if (unsendable !== null) throw new SdkUsageError(unsendable);
        sendable[name] = valueText as string;
    }
    return Object.setPrototypeOf(sendable, Object.prototype) as Record<string, string>;
}

/** Why a value cannot go into a multipart part header (CR/LF would forge one), or `null`; never echoes it. */
function multipartLabelProblem(what: string, value: unknown): string | null {
    const text = typeof value === 'string' ? value : String(value ?? '');
    for (let index = 0; index < text.length; index += 1) {
        const named = FORGEABLE_PART_BYTES[text[index] as string];
        if (named === undefined) continue;
        // The byte offset, not the character index: a part header is written in bytes.
        const offset = new TextEncoder().encode(text.slice(0, index)).length;
        return (
            `files: ${what} carries ${named} at byte ${offset}, which would forge a header on the multipart part ` +
            'this SDK sends. The value is not shown: it may be attacker-chosen. Strip CR, LF and NUL from an ' +
            'upload filename before passing it on'
        );
    }
    return null;
}

/** Refuse labels that would forge a multipart part header; exported so the client can judge before the token grant. */
export function refuseUnsendableMultipartLabels(files: unknown, formData: unknown): void {
    if (!files) return;
    for (const [key, entry] of pairsOf(files)) {
        const field = String(key);
        const problems: Array<[string, unknown]> = [[`a files part name of ${field.length} character(s)`, field]];
        if (Array.isArray(entry) && entry.length > 1) {
            if (entry[0] != null) problems.push([`the filename on part '${field}'`, String(entry[0])]);
            if (typeof entry[2] === 'string' && entry[2]) {
                problems.push([`the content type on part '${field}'`, entry[2]]);
            }
        } else {
            problems.push([`the filename on part '${field}'`, field]);
        }
        for (const [what, value] of problems) {
            const problem = multipartLabelProblem(what, value);
            if (problem !== null) throw new SdkUsageError(problem);
        }
    }
    for (const [key] of pairsOf(formData)) {
        const name = String(key);
        const problem = multipartLabelProblem(`a formData name of ${name.length} character(s)`, name);
        if (problem !== null) throw new SdkUsageError(problem);
    }
}

/** Whether a value is a Node stream, which can only be sent once. */
function isNodeStream(value: unknown): boolean {
    return (
        Boolean(value) &&
        typeof value === 'object' &&
        (typeof (value as {pipe?: unknown}).pipe === 'function' ||
            typeof (value as {read?: unknown}).read === 'function')
    );
}

/** Whether a value can only be read once: true for a generator, false for a Buffer. */
export function isOneShotContainer(value: unknown): boolean {
    if (value == null) return false;
    if (typeof value === 'string') return false;
    if (Array.isArray(value)) return false;
    if (value instanceof Map) return false;
    if (ArrayBuffer.isView(value)) return false;
    if (isNodeStream(value)) return false;
    if (typeof value !== 'object') return false;
    const proto: unknown = Object.getPrototypeOf(value);
    if (proto === Object.prototype || proto === null) return false;
    return typeof (value as {[Symbol.iterator]?: unknown})[Symbol.iterator] === 'function';
}

/** A one-shot container read into an array, so it can be walked twice. */
export function materialisePayload(files: unknown, formData: unknown): [unknown, unknown] {
    if (isOneShotContainer(files)) files = [...(files as Iterable<unknown>)];
    if (isOneShotContainer(formData)) formData = [...(formData as Iterable<unknown>)];
    return [files, formData];
}

/** A private, immutable copy of one call's query parameters, read once before the first await. */
export function snapshotQueryParams(
    params: Readonly<Record<string, unknown>> | null | undefined,
): Readonly<Record<string, string | readonly string[]>> | null {
    if (params == null) return null;
    const snapshot = Object.create(null) as Record<string, string | readonly string[]>;
    for (const [name, value] of Object.entries(params)) {
        snapshot[String(name)] = Array.isArray(value)
            ? Object.freeze(value.map((item: unknown) => String(item)))
            : String(value);
    }
    Object.setPrototypeOf(snapshot, Object.prototype);
    return Object.freeze(snapshot);
}

function refuseLoneContainer(container: unknown, label: string, advice: string): void {
    if (
        typeof container !== 'object' ||
        isNodeStream(container) ||
        ArrayBuffer.isView(container) ||
        container instanceof ArrayBuffer ||
        container instanceof Blob
    ) {
        throw new SdkUsageError(
            `${label}: expected an object of field name to value, a Map, or an array of (name, value) pairs - ${advice}`,
        );
    }
}

/** A private, immutable snapshot of one payload, every label converted to text once. */
export function snapshotPayload(
    files: unknown,
    formData: unknown,
): [ReadonlyArray<readonly [string, unknown]> | null, ReadonlyArray<readonly [string, string]> | null] {
    const [oneShotFiles, oneShotFormData] = materialisePayload(files, formData);
    return [snapshotFiles(oneShotFiles), snapshotFormData(oneShotFormData)];
}

function snapshotFiles(files: unknown): ReadonlyArray<readonly [string, unknown]> | null {
    if (files == null) return null;
    refuseLoneContainer(files, 'files', 'a lone handle or a lone buffer carries no field name to send it under');
    const snapshot: Array<readonly [string, unknown]> = [];
    for (const [key, entry] of pairsOf(files)) {
        const name = String(key);
        snapshot.push(Object.freeze([name, snapshotFilesEntry(name, entry)] as const));
    }
    return Object.freeze(snapshot);
}

function snapshotFilesEntry(name: string, entry: unknown): unknown {
    if (!Array.isArray(entry) || entry.length <= 1) return snapshotUploadValue(entry);
    refuseOverlongFilesTuple(name, entry);
    return Object.freeze([
        entry[0] == null ? null : String(entry[0]),
        snapshotUploadValue(entry[1]),
        typeof entry[2] === 'string' && entry[2] ? entry[2] : null,
    ]);
}

function refuseOverlongFilesTuple(name: string, entry: readonly unknown[]): void {
    if (entry.length <= 3) return;
    throw new SdkUsageError(
        `files[${JSON.stringify(name)}]: a (filename, value, contentType?) tuple has at most three slots, got ` +
            `${entry.length}. This SDK writes Content-Disposition and Content-Type on a part and no other header, ` +
            'so a fourth value would go nowhere',
    );
}

/** Upload bytes this module allocated and never exposed, so {@link partContent} can skip a second copy. */
const sdkOwnedPayloadBytes = new WeakSet<object>();

/** One upload value with its bytes copied into private storage before the call's first await. */
function snapshotUploadValue(value: unknown): unknown {
    if (ArrayBuffer.isView(value)) {
        const owned = new Uint8Array(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength));
        sdkOwnedPayloadBytes.add(owned);
        return owned;
    }
    if (value instanceof ArrayBuffer) {
        const owned = new Uint8Array(value.slice(0));
        sdkOwnedPayloadBytes.add(owned);
        return owned;
    }
    return value;
}

/** The `formData` half of {@link snapshotPayload}; bytes, a stream or a `Blob` is refused, not sent as text. */
function snapshotFormData(formData: unknown): ReadonlyArray<readonly [string, string]> | null {
    if (formData == null) return null;
    refuseLoneContainer(formData, 'formData', 'a lone value carries no field name to send it under');
    const snapshot: Array<readonly [string, string]> = [];
    for (const [key, value] of pairsOf(formData)) {
        const name = String(key);
        if (isNodeStream(value) || ArrayBuffer.isView(value) || value instanceof ArrayBuffer || value instanceof Blob) {
            throw new SdkUsageError(
                `formData[${JSON.stringify(name)}]: a form field is sent as text, so a stream, a buffer or a Blob ` +
                    'here would go out as its toString rather than its bytes - pass it under files to send it as an ' +
                    'upload',
            );
        }
        snapshot.push(Object.freeze([name, String(value)] as const));
    }
    return Object.freeze(snapshot);
}

function filesEntryStream(entry: unknown): unknown {
    if (Array.isArray(entry) && entry.length > 1) return filesEntryStream(entry[1]);
    return entry;
}

/** Unwrap one payload container to the objects a request would read; an unknown shape counts as one. */
function containerStreams(payload: unknown): unknown[] {
    if (payload == null) return [];
    if (payload instanceof Map) return [...payload.values()].map(filesEntryStream);
    if (Array.isArray(payload)) return payload.map(filesEntryStream);
    if (isOneShotContainer(payload)) return [payload];
    if (typeof payload === 'object' && !ArrayBuffer.isView(payload) && !isNodeStream(payload)) {
        return Object.values(payload).map(filesEntryStream);
    }
    return [payload];
}

function payloadStreams(payload: unknown): unknown[] {
    return containerStreams(payload).filter((candidate) => isNodeStream(candidate));
}

/** Whether a payload container could be read a second time: a buffer yes, a read stream no. */
export function canReplayPayload(files: unknown, formData: unknown): boolean {
    if (isOneShotContainer(files) || isOneShotContainer(formData)) return false;
    return payloadStreams(files).length === 0 && payloadStreams(formData).length === 0;
}

/** Whether a payload holds nothing already consumed; a Node readable has no seek to wind back. */
export function rewindPayload(files: unknown, formData: unknown): boolean {
    return payloadStreams(files).length === 0 && payloadStreams(formData).length === 0;
}

/** Replace every stream in a payload with the bytes it holds, so it is drained exactly once. */
export async function bufferPayloadStreams(
    files: unknown,
    formData: unknown,
    options: RequestCeilings = {},
): Promise<[unknown, unknown]> {
    const ceilings = resolveCeilings(options);
    const budget = byteBudget(ceilings.maxUploadBytes);
    const deadline = preparationDeadline(ceilings.prepareTimeoutMs);
    try {
        return [
            await bufferContainerStreams(files, 'files', budget, deadline),
            await bufferContainerStreams(formData, 'formData', budget, deadline),
        ];
    } finally {
        deadline.close();
    }
}

/** One payload container with its streams read into bytes; an unknown shape is untouched. */
async function bufferContainerStreams(
    payload: unknown,
    label: string,
    budget: ByteBudget,
    deadline: Deadline,
): Promise<unknown> {
    if (payload == null || !payloadStreams(payload).length) return payload;
    if (payload instanceof Map) {
        const buffered = new Map<unknown, unknown>();
        for (const [key, entry] of payload) {
            buffered.set(key, await bufferEntryStream(entry, String(key), budget, deadline));
        }
        return buffered;
    }
    if (Array.isArray(payload)) {
        const buffered: unknown[] = [];
        for (const entry of payload as unknown[]) {
            buffered.push(
                Array.isArray(entry) && entry.length > 1
                    ? [
                          entry[0],
                          await bufferEntryStream(entry[1], String(entry[0]), budget, deadline),
                          ...entry.slice(2),
                      ]
                    : await bufferEntryStream(entry, label, budget, deadline),
            );
        }
        return buffered;
    }
    if (typeof payload === 'object' && !ArrayBuffer.isView(payload) && !isNodeStream(payload)) {
        const buffered: Record<string, unknown> = {};
        for (const [key, entry] of Object.entries(payload)) {
            buffered[key] = await bufferEntryStream(entry, key, budget, deadline);
        }
        return buffered;
    }
    return payload;
}

async function bufferEntryStream(
    entry: unknown,
    key: string,
    budget: ByteBudget,
    deadline: Deadline,
): Promise<unknown> {
    if (Array.isArray(entry) && entry.length > 1) {
        return [entry[0], await bufferEntryStream(entry[1], key, budget, deadline), ...entry.slice(2)];
    }
    if (isNodeStream(entry)) return readStreamBytes(key, entry, budget, deadline);
    return entry;
}

/** The names the API complained about, in both shapes of `errors`, so a stale echo shows. */
function extractErrorFields(body: Record<string, unknown>): Set<string> {
    const fields = new Set<string>();
    const entries = body['errors'];
    if (Array.isArray(entries)) {
        for (const entry of entries as unknown[]) {
            const field = entry && typeof entry === 'object' ? (entry as {field?: unknown}).field : null;
            if (field) fields.add(String(field).trim().toLowerCase());
        }
    } else if (entries && typeof entries === 'object' && !ArrayBuffer.isView(entries)) {
        for (const fieldName of Object.keys(entries)) {
            const name = String(fieldName).trim().toLowerCase();
            if (name) fields.add(name);
        }
    }
    return fields;
}

/** The names listed in an `unknown query parameter(s): a, b` message, the one stable wording. */
function parseUnknownParameterMessage(body: Record<string, unknown>): Set<string> {
    const fields = new Set<string>();
    const message = String(body['message'] || '');
    const marker = 'unknown query parameter(s):';
    const idx = message.indexOf(marker);
    if (idx >= 0) {
        for (const listed of message.slice(idx + marker.length).split(',')) {
            const named = PARAMETER_NAME_PATTERN.exec(listed);
            if (named) fields.add(named[0].toLowerCase());
        }
    }
    return fields;
}

function responseBodyChunks(response: Response): AsyncIterable<unknown> | null {
    const body = (response as {body?: unknown}).body as
        {getReader?: unknown; [Symbol.asyncIterator]?: unknown} | null | undefined;
    if (!body) return null;
    if (typeof body.getReader === 'function') return readableStreamChunks(body as ReadableStream<Uint8Array>);
    if (typeof body[Symbol.asyncIterator] === 'function') return body as AsyncIterable<unknown>;
    return null;
}

/** A web `ReadableStream` as an async iterable, cancelled if the consumer stops early. */
async function* readableStreamChunks(body: ReadableStream<Uint8Array>): AsyncGenerator<Uint8Array> {
    const reader = body.getReader();
    try {
        for (;;) {
            const {done, value} = await reader.read();
            if (done) return;
            yield value;
        }
    } finally {
        try {
            await reader.cancel();
        } catch {
            // Already closed, or the backend refuses to cancel on request.
        }
    }
}

interface CallLabel {
    method?: string;
    endpoint?: string | null;
    requestInfo?: unknown;
}

function responseOverCap(limitBytes: number, call: CallLabel | null = null): SdkError {
    const subject =
        call && call.method && call.endpoint ? `${call.method} ${call.endpoint} answered with` : 'the response carried';
    return Object.assign(
        new SdkError(
            `${subject} a body over the ${limitBytes}-byte maxResponseBytes cap, so it was not buffered - raise ` +
                'maxResponseBytes on the client if a body this large is expected',
            {
                errorType: ErrorType.UNKNOWN,
                rawResponse: null,
                requestInfo: (call && call.requestInfo) || null,
            },
        ),
        {kind: TRANSPORT_ERROR_KINDS.RESPONSE_TOO_LARGE, limitBytes},
    );
}

/** Read a response body chunk by chunk, refusing one over `limitBytes`; a declared `Content-Length` over it is refused unread. */
async function readCappedBody(response: Response, limitBytes: number): Promise<Uint8Array> {
    const declared = (response.headers.get('content-length') || '').trim();
    if (/^\d+$/.test(declared) && Number(declared) > limitBytes) {
        await releaseResponseBody(response);
        throw responseOverCap(limitBytes);
    }
    const chunks = responseBodyChunks(response);
    if (!chunks) {
        const whole = new Uint8Array(await response.arrayBuffer());
        if (whole.byteLength > limitBytes) throw responseOverCap(limitBytes);
        return whole;
    }
    const collected: Uint8Array[] = [];
    let total = 0;
    for await (const chunk of chunks) {
        const bytes = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk as ArrayBufferLike);
        total += bytes.byteLength;
        if (total > limitBytes) {
            // Dropped before the refusal leaves, so a cap-sized list is not held while it propagates.
            collected.length = 0;
            throw responseOverCap(limitBytes);
        }
        collected.push(bytes);
    }
    // A single chunk is returned as is: joining would allocate a second cap-sized array.
    if (collected.length === 1) return collected[0] as Uint8Array;
    return joinBytes(collected, total);
}

function joinBytes(chunks: readonly Uint8Array[], total: number): Uint8Array {
    const joined = new Uint8Array(total);
    let at = 0;
    for (const chunk of chunks) {
        joined.set(chunk, at);
        at += chunk.byteLength;
    }
    return joined;
}

/** Decode by Content-Type: 204 or empty is `null`, JSON an object, `text/*` a string, anything else bytes. */
export async function decodeResponseBody(response: Response, maxBytes = DEFAULT_MAX_RESPONSE_BYTES): Promise<unknown> {
    return (await decodeResponseParts(response, maxBytes)).data;
}

/** The same decode, plus the body text it came from; `bodyText` is `null` for a `204`, empty or binary body. */
export async function decodeResponseParts(
    response: Response,
    maxBytes = DEFAULT_MAX_RESPONSE_BYTES,
): Promise<{data: unknown; bodyText: string | null}> {
    if (response.status === 204) return {data: null, bodyText: null};
    const buffer = await readCappedBody(response, maxBytes);
    if (buffer.byteLength === 0) return {data: null, bodyText: null};
    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    if (isJsonContentType(contentType)) {
        const text = new TextDecoder('utf-8').decode(buffer);
        try {
            return {data: JSON.parse(text), bodyText: text};
        } catch {
            try {
                // Stripped for the parse only: `bodyText` stays the bytes the API sent.
                return {data: JSON.parse(text.replace(BYTE_ORDER_MARK, '')), bodyText: text};
            } catch {
                return {data: text, bodyText: text};
            }
        }
    }
    if (contentType.startsWith(TEXT_CONTENT_TYPE_PREFIX)) {
        const text = new TextDecoder('utf-8').decode(buffer);
        return {data: text, bodyText: text};
    }
    return {data: buffer, bodyText: null};
}

/** Release a body the retry loop abandons: an unread body keeps its socket checked out of the pool. */
async function releaseResponseBody(response: Response): Promise<void> {
    try {
        if (response.bodyUsed) return;
        const body = (response as {body?: unknown}).body as {cancel?: unknown; destroy?: unknown} | null | undefined;
        if (body && typeof body.cancel === 'function') {
            await (body as ReadableStream).cancel();
            return;
        }
        // A Node stream, which is what a `node-fetch`-shaped backend answers.
        if (body && typeof body.destroy === 'function') {
            (body as {destroy: () => void}).destroy();
            return;
        }
        // No stream to cancel: read the bytes to their end so the connection is released.
        if (typeof response.arrayBuffer === 'function') await response.arrayBuffer();
    } catch {
        // The body was already gone, or the backend refuses to release it; the retry proceeds.
    }
}

/** The errno codes that mean nothing was delivered; read only for an untagged failure. */
const NOT_DELIVERED_ERROR_CODES = new Set([
    'ENOTFOUND',
    'EAI_AGAIN',
    'ECONNREFUSED',
    'EHOSTUNREACH',
    'ENETUNREACH',
    'EADDRNOTAVAIL',
    'EACCES',
]);

/**
 * Sort a network failure into a retry `kind`. An unknown code is `CONNECTION_RESET`, not `CONNECTION`:
 * a write is replayed only for a failure that certainly did not arrive.
 */
function classifyTransportError(error: Tagged): string {
    if (error && error.kind) return error.kind;
    const held = error as {cause?: {code?: unknown}; code?: unknown; name?: unknown};
    const code = String((held && (held.cause?.code || held.code)) || '');
    if (/CERT|SSL|SELF_SIGNED|UNABLE_TO_VERIFY|DEPTH_ZERO|ALT_NAME/.test(code)) return TRANSPORT_ERROR_KINDS.SSL;
    if (held && held.name === 'AbortError') return TRANSPORT_ERROR_KINDS.TIMEOUT;
    if (NOT_DELIVERED_ERROR_CODES.has(code)) return TRANSPORT_ERROR_KINDS.CONNECTION;
    return TRANSPORT_ERROR_KINDS.CONNECTION_RESET;
}

/** Wrap a thrown string or null: assigning `.kind` to one raises a `TypeError` over the real failure. */
function taggable(raised: unknown): Tagged {
    if (raised !== null && (typeof raised === 'object' || typeof raised === 'function')) return raised as Tagged;
    return new Error(`the transport backend rejected with a ${typeof raised} rather than an error`, {cause: raised});
}

function defaultSleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

type Outcome =
    {retryDelay: number; status: number} | {response: Response; decoded: {data: unknown; bodyText: string | null}};

/** Sends HTTP requests and decodes responses. One backend per instance. */
export class Transport {
    readonly #config: SdkConfig;
    readonly #retryPolicy: RetryPolicy;
    readonly #onProgress: (message: string) => void;
    readonly #dispatcher: unknown;
    readonly #fetch: FetchLike & {close?: () => void; discardPooledConnections?: () => void};
    readonly #ownsFetch: boolean;
    readonly #sleep: (ms: number) => Promise<void>;

    constructor(config: SdkConfig, options: TransportOptions = {}) {
        this.#config = config;
        // Snapshotted, so the caller cannot change the policy between two attempts of a call.
        this.#retryPolicy = RetryPolicy.snapshotOf(options.retryPolicy, config);
        this.#onProgress = options.onProgress || (() => {});
        this.#dispatcher = options.dispatcher ?? config.dispatcher ?? null;
        this.#sleep = options.sleep ?? defaultSleep;
        const injected = options.fetchImpl ?? config.injectedFetch;
        if (injected) {
            // Caller-supplied: its lifetime and its transport settings are theirs.
            this.#fetch = injected;
            this.#ownsFetch = false;
        } else {
            this.#fetch = createNodeFetch({
                caBundle: config.caBundle,
                verifySsl: config.verifySsl,
                proxyUrl: config.proxyUrl,
                poolMaxsize: config.poolMaxsize,
                connectTimeoutSeconds: config.connectTimeoutSeconds,
                timeoutSeconds: config.timeoutSeconds,
                // Enforced while the backend reads, so it bounds the allocation instead of checking one already made.
                maxResponseBytes: config.maxResponseBytes,
                maxCaBundleBytes: config.maxCaBundleBytes,
            });
            this.#ownsFetch = true;
        }
    }

    /** Send one request, retrying per the policy; `body` comes pre-encoded from {@link encodeRequestBody}. */
    async sendHttpRequest(request: HttpRequest): Promise<HttpResponseParts> {
        // Read and frozen once: a caller can run code during the awaits below, and every attempt sends the same bytes.
        const method = requestMethod(request.method);
        const headers = Object.freeze(sendableHeaders(request.headers));
        const params = snapshotQueryParams(request.params);
        // Checked here too: this class is exported, so a direct caller skips the client's refusals.
        const finalUrl = refuseUnsendableUrl(buildUrlWithParams(request.url, params), 'url');
        // The template, not the resolved path, which carries whatever filled its placeholders.
        const endpoint = pathTemplateOf(request.endpoint);
        const [, readTimeout] = this.#config.timeout;
        let wireBody = request.body == null ? null : adoptWireBody(request.body);
        if (wireBody == null) {
            const ceilings = requestCeilings(this.#config);
            const [files, formData] = await bufferPayloadStreams(
                ...snapshotPayload(request.files, request.formData),
                ceilings,
            );
            wireBody = await encodeRequestBody(request.jsonBody, formData, files, ceilings);
        }
        // Before the first attempt, with the other refusals raised before any I/O.
        refuseContradictoryMultipartType(headers, wireBody);
        const started = performanceNow();
        const maxAttempts = this.#retryPolicy.maxAttempts;
        let attempt = 0;
        let requestsSent = 0;
        let staleEchoResent = false;
        let lastException: Tagged | null = null;

        while (attempt < maxAttempts) {
            attempt += 1;
            requestsSent += 1;
            this.#onProgress(`${method} ${endpoint ?? ''} sending (attempt ${attempt}/${maxAttempts})`);

            let outcome: Outcome;
            try {
                const current = attempt;
                outcome = await this.#fetchOnce(
                    method,
                    finalUrl,
                    headers,
                    wireBody,
                    readTimeout * 1000,
                    // Inside the ceiling, so a failure mid-body still reaches the retry table.
                    async (response): Promise<Outcome> => {
                        if (current < maxAttempts && this.#retryPolicy.shouldRetryStatusCode(response.status, method)) {
                            const retryDelay = this.#retryPolicy.computeBackoffSeconds(current, {
                                retryAfterHeader: response.headers.get('retry-after'),
                            });
                            // The header is read above; nothing else will read this body.
                            await releaseResponseBody(response);
                            return {retryDelay, status: response.status};
                        }
                        return {response, decoded: await decodeResponseParts(response, this.#config.maxResponseBytes)};
                    },
                );
            } catch (raised) {
                // A usage error is not a network failure; wrapping it would hide the fix.
                if (raised instanceof SdkUsageError) throw raised;
                const exception = taggable(raised);
                // A size verdict, not a transport failure; rebuilt so the refusal carries this call's `RequestInfo`.
                if (exception.kind === TRANSPORT_ERROR_KINDS.RESPONSE_TOO_LARGE) {
                    throw responseOverCap(exception.limitBytes ?? this.#config.maxResponseBytes, {
                        method,
                        endpoint,
                        requestInfo: this.#requestInfo(
                            method,
                            finalUrl,
                            endpoint,
                            requestsSent,
                            this.#grantedAttempts(staleEchoResent),
                            started,
                        ),
                    });
                }
                lastException = exception;
                exception.kind = exception.kind || classifyTransportError(exception);
                if (attempt >= maxAttempts || !this.#retryPolicy.shouldRetryAfterException(exception, method)) {
                    break;
                }
                const delay = this.#retryPolicy.computeBackoffSeconds(attempt);
                this.#onProgress(
                    `${exception.name || 'error'}; retrying in ${delay.toFixed(1)}s (attempt ${attempt + 1}/${maxAttempts})`,
                );
                await this.#sleep(delay * 1000);
                continue;
            }

            if ('retryDelay' in outcome) {
                this.#onProgress(
                    `${outcome.status}; retrying in ${outcome.retryDelay.toFixed(1)}s (attempt ${attempt + 1}/${maxAttempts})`,
                );
                // Outside the ceiling, which bounds an attempt and not the wait between two.
                await this.#sleep(outcome.retryDelay * 1000);
                continue;
            }

            const {response, decoded} = outcome;
            const parts: HttpResponseParts = {
                statusCode: response.status,
                data: decoded.data,
                bodyText: decoded.bodyText,
                headers: Object.fromEntries(response.headers),
                contentType: response.headers.get('content-type'),
                // The only assembled form of the URL and query every attempt wrote.
                resolvedUrl: finalUrl,
                attemptCount: requestsSent,
                maxAttempts: this.#grantedAttempts(staleEchoResent),
                elapsedSeconds: round4((performanceNow() - started) / 1000),
            };

            if (!staleEchoResent && RESENDABLE_METHODS.has(method) && this.#detectStaleParameterEcho(parts, params)) {
                // The echo is a one-slot shift on that keep-alive connection, so the resend gets a fresh connection.
                staleEchoResent = true;
                attempt -= 1;
                this.#discardPooledConnections();
                continue;
            }

            return parts;
        }

        throw this.#buildTransportError(
            lastException,
            method,
            finalUrl,
            endpoint,
            requestsSent,
            this.#grantedAttempts(staleEchoResent),
            started,
        );
    }

    /** One whole attempt (request, response and body) under one hard ceiling. */
    async #fetchOnce<T>(
        method: string,
        url: string,
        headers: Readonly<Record<string, string>>,
        wireBody: WireBody,
        timeoutMs: number,
        consume: (response: Response) => Promise<T>,
    ): Promise<T> {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const init: RequestInit & {headers: Record<string, string>} = {
                method,
                headers: {...headers},
                redirect: 'manual',
                signal: controller.signal,
            };
            if (this.#dispatcher) (init as {dispatcher?: unknown}).dispatcher = this.#dispatcher;
            applyWireBody(init, wireBody);
            return await consume(await this.#fetch(url, init));
        } finally {
            clearTimeout(timer);
        }
    }

    /** Drop pooled connections; an injected `fetchImpl` that cannot is left alone. */
    #discardPooledConnections(): void {
        const impl = this.#fetch;
        if (typeof impl.discardPooledConnections === 'function') impl.discardPooledConnections();
    }

    #grantedAttempts(staleEchoResent: boolean): number {
        return this.#retryPolicy.maxAttempts + (staleEchoResent ? 1 : 0);
    }

    /**
     * Detect a `400` that belongs to another request: after a `400` a server can repeat that error on the
     * next request over the same keep-alive connection, naming only fields this request did not send.
     */
    #detectStaleParameterEcho(parts: HttpResponseParts, params: Readonly<Record<string, unknown>> | null): boolean {
        const data = parts.data;
        if (
            parts.statusCode !== 400 ||
            !data ||
            typeof data !== 'object' ||
            Array.isArray(data) ||
            ArrayBuffer.isView(data)
        ) {
            return false;
        }
        const body = data as Record<string, unknown>;
        let namedFields = extractErrorFields(body);
        if (!namedFields.size && body['error'] === UNKNOWN_PARAMETER_ERROR) {
            namedFields = parseUnknownParameterMessage(body);
        }
        if (!namedFields.size) return false;
        const sent = new Set(Object.keys(params || {}).map((name) => String(name).toLowerCase()));
        // With nothing sent, this would collapse to "any 400 carrying an errors block".
        if (!sent.size) return false;
        for (const field of namedFields) if (sent.has(field)) return false;
        return true;
    }

    #buildTransportError(
        exception: Tagged | null,
        method: string,
        url: string,
        endpoint: string | null,
        attempt: number,
        maxAttempts: number,
        started: number,
    ): SdkError {
        const kind = exception && exception.kind;
        const timedOut =
            kind === TRANSPORT_ERROR_KINDS.TIMEOUT ||
            kind === TRANSPORT_ERROR_KINDS.READ_TIMEOUT ||
            kind === TRANSPORT_ERROR_KINDS.CONNECT_TIMEOUT;
        const errorType = timedOut ? ErrorType.TIMEOUT : ErrorType.NETWORK;
        const label = timedOut ? 'timed out' : 'failed';
        const message =
            `${method} ${endpoint ?? '<endpoint withheld>'} ${label} after ${attempt} attempt(s): ` +
            `${kind || 'transport failure'} (${describeCause(exception)})`;
        return new SdkError(message, {
            errorType,
            rawResponse: null,
            cause: exception,
            requestInfo: this.#requestInfo(method, url, endpoint, attempt, maxAttempts, started),
        });
    }

    /** The `RequestInfo` for a call with no response; the query is dropped, since `?email=` is not secret-named. */
    #requestInfo(
        method: string,
        url: string,
        endpoint: string | null,
        attempt: number,
        maxAttempts: number,
        started: number,
    ): Record<string, unknown> {
        return {
            clientName: this.#config.clientName,
            apiVersion: this.#config.apiVersion,
            httpMethod: method,
            url: stripQuery(url),
            endpoint,
            queryParams: {},
            headers: {},
            body: null,
            attemptCount: attempt,
            maxAttempts,
            elapsedSeconds: round4((performanceNow() - started) / 1000),
        };
    }

    /** Release a fetch backend this transport owns. */
    async closeTransport(): Promise<void> {
        if (this.#ownsFetch && typeof this.#fetch.close === 'function') this.#fetch.close();
    }
}

function stripQuery(url: string): string {
    const cut = url.search(/[?#]/);
    return cut < 0 ? url : url.slice(0, cut);
}

function buildUrlWithParams(url: string, params: Readonly<Record<string, string | readonly string[]>> | null): string {
    if (!params || !Object.keys(params).length) return url;
    const usp = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) for (const item of value) usp.append(key, String(item));
        else usp.append(key, String(value));
    }
    return url + (url.includes('?') ? '&' : '?') + usp.toString();
}

/** Encode one payload to the bytes that cross the wire, once, as a frozen record whose `bytes` answers a copy. */
export async function encodeRequestBody(
    jsonBody: unknown,
    formData: unknown,
    files: unknown,
    options: RequestCeilings = {},
): Promise<WireBody> {
    const ceilings = resolveCeilings(options);
    if (jsonBody !== undefined && jsonBody !== null) {
        const text = typeof jsonBody === 'string' ? jsonBody : JSON.stringify(jsonBody);
        // Measured before it is encoded, so the refusal costs no second allocation.
        const size = Buffer.byteLength(text, 'utf8');
        if (size > ceilings.maxRequestBytes) {
            throw overCeiling('jsonBody', ceilings.maxRequestBytes, 'maxRequestBytes', REQUEST_ADVICE);
        }
        return frozenWireBody(new TextEncoder().encode(text), JSON_CONTENT_TYPE);
    }
    if (files) {
        // Validated and encoded from one copy, so a stateful `toString` cannot pass validation then forge a header.
        const deadline = preparationDeadline(ceilings.prepareTimeoutMs);
        let parts: MultipartPart[];
        try {
            parts = await materialiseMultipartParts(files, formData, ceilings, deadline);
        } finally {
            deadline.close();
        }
        refuseUnsendableMaterialisedParts(parts);
        const multipart = encodeMultipartParts(parts);
        return frozenWireBody(multipart.bytes, multipart.contentType);
    }
    if (formData) {
        return frozenWireBody(encodeUrlEncoded(formData, ceilings), 'application/x-www-form-urlencoded');
    }
    return frozenWireBody(null, null);
}

/** Write the form fields as `application/x-www-form-urlencoded` under a running `maxRequestBytes` total. */
function encodeUrlEncoded(formData: unknown, ceilings: ResolvedCeilings): Uint8Array {
    const encoded: string[] = [];
    let total = 0;
    let source = 0;
    for (const [key, value] of pairsOf(formData)) {
        const name = String(key);
        const text = String(value);
        source += Buffer.byteLength(name, 'utf8') + Buffer.byteLength(text, 'utf8');
        if (source > ceilings.maxUploadBytes) {
            throw overCeiling(
                `formData[${JSON.stringify(name)}]`,
                ceilings.maxUploadBytes,
                'maxUploadBytes',
                UPLOAD_ADVICE,
            );
        }
        const pair = new URLSearchParams([[name, text]]).toString();
        total += (encoded.length ? 1 : 0) + Buffer.byteLength(pair, 'utf8');
        if (total > ceilings.maxRequestBytes) {
            throw overCeiling(
                `formData[${JSON.stringify(name)}]`,
                ceilings.maxRequestBytes,
                'maxRequestBytes',
                REQUEST_ADVICE,
            );
        }
        encoded.push(pair);
    }
    return new TextEncoder().encode(encoded.join('&'));
}

/** The bytes behind each settled wire body, held here because freezing the record leaves a typed array writable. */
const sdkOwnedWireBodies = new WeakMap<object, Uint8Array | null>();

/** One encoded body: a frozen record over private bytes, whose `bytes` accessor answers a copy. */
function frozenWireBody(bytes: Uint8Array | null, contentType: string | null): WireBody {
    const body = {} as WireBody;
    Object.defineProperty(body, 'bytes', {
        get: () => (bytes === null ? null : new Uint8Array(bytes)),
        enumerable: true,
    });
    Object.defineProperty(body, 'contentType', {value: contentType, enumerable: true});
    Object.freeze(body);
    sdkOwnedWireBodies.set(body, bytes);
    return body;
}

/** The private bytes behind a settled wire body; a miss means the body skipped {@link adoptWireBody}. */
function ownedWireBytes(body: WireBody): Uint8Array | null {
    const owned = sdkOwnedWireBodies.get(body);
    if (owned === undefined) {
        throw new SdkUsageError(
            'body: an encoded body reached an attempt without being adopted, so the bytes it names are not ones ' +
                'this SDK owns; pass jsonBody, formData or files and let encodeRequestBody settle them',
        );
    }
    return owned;
}

/**
 * Take ownership of an outside wire body by copying its bytes once, before the first attempt;
 * a body {@link encodeRequestBody} produced passes through uncopied.
 */
function adoptWireBody(body: WireBody): WireBody {
    if (sdkOwnedWireBodies.has(body)) return body;
    // Read once: a caller record may answer `bytes` from a getter of their own.
    const bytes: unknown = body.bytes;
    if (bytes == null) return frozenWireBody(null, body.contentType ?? null);
    if (!(bytes instanceof Uint8Array)) {
        throw new SdkUsageError(
            `body.bytes: expected a Uint8Array of already-encoded bytes, got ${typeof bytes}; ` +
                'pass jsonBody, formData or files and let encodeRequestBody settle the bytes',
        );
    }
    return frozenWireBody(new Uint8Array(bytes), body.contentType ?? null);
}

/** Put an encoded body on one attempt's request init; a caller `Content-Type` stands for JSON and urlencoded. */
function applyWireBody(init: RequestInit & {headers: Record<string, string>}, body: WireBody): void {
    const bytes = ownedWireBytes(body);
    if (bytes === null) return;
    init.body = bytes;
    if (!body.contentType) return;
    if (isMultipartType(body.contentType)) {
        // Owned, not defaulted: only this value names the boundary the body was written with.
        init.headers['Content-Type'] = body.contentType;
        for (const key of Object.keys(init.headers)) {
            if (key !== 'Content-Type' && key.toLowerCase() === 'content-type') delete init.headers[key];
        }
        return;
    }
    if (!hasHeader(init.headers, 'content-type')) init.headers['Content-Type'] = body.contentType;
}

function isMultipartType(contentType: string): boolean {
    return (contentType.split(';', 1)[0] ?? '').trim().toLowerCase().startsWith('multipart/');
}

/** Every `boundary=` parameter of a media type, unquoted, in order; all of them, since two contradict. */
function boundariesOf(contentType: string): string[] {
    const found: string[] = [];
    for (const parameter of contentType.split(';').slice(1)) {
        const eq = parameter.indexOf('=');
        if (eq < 0 || parameter.slice(0, eq).trim().toLowerCase() !== 'boundary') continue;
        found.push(
            parameter
                .slice(eq + 1)
                .trim()
                .replace(/^"(.*)"$/, '$1'),
        );
    }
    return found;
}

function mediaTypeOfHeader(contentType: string): string {
    return (contentType.split(';', 1)[0] ?? '').trim().toLowerCase();
}

/**
 * Refuse, rather than replace, a caller `Content-Type` contradicting a multipart body this SDK encoded;
 * only the exact media type with exactly this body's boundary is accepted.
 */
function refuseContradictoryMultipartType(headers: Readonly<Record<string, string>>, body: WireBody): void {
    if (!body.contentType || !isMultipartType(body.contentType)) return;
    const supplied = Object.entries(headers).find(([name]) => name.toLowerCase() === 'content-type');
    if (!supplied) return;
    const own = boundariesOf(body.contentType);
    const theirs = boundariesOf(supplied[1]);
    if (
        mediaTypeOfHeader(supplied[1]) === mediaTypeOfHeader(body.contentType) &&
        theirs.length === 1 &&
        own.length === 1 &&
        theirs[0] === own[0]
    ) {
        return;
    }
    throw new SdkUsageError(
        `${supplied[0]}: a multipart body's media type and boundary are chosen by this SDK when the parts are ` +
            'written, so a Content-Type supplied with the call cannot describe it - the header would say one thing ' +
            'and the body another, and the server would find no parts at all. Drop the header and the SDK sends ' +
            `${mediaTypeOfHeader(body.contentType)} with the boundary it used`,
    );
}

function hasHeader(headers: Readonly<Record<string, string>>, name: string): boolean {
    return Object.keys(headers).some((key) => key.toLowerCase() === name);
}

/**
 * Read a multipart payload down to {@link MultipartPart} records in one pass, so the label judged is the one
 * written; `maxUploadBytes`, `maxMultipartOverheadBytes` and `maxRequestBytes` are counted per part.
 */
async function materialiseMultipartParts(
    files: unknown,
    formData: unknown,
    ceilings: ResolvedCeilings,
    deadline: Deadline,
): Promise<MultipartPart[]> {
    refuseLoneContainer(files, 'files', 'a lone handle or a lone buffer carries no field name to send it under');
    const parts: MultipartPart[] = [];
    const content = byteBudget(ceilings.maxUploadBytes);
    const framing = byteBudget(ceilings.maxMultipartOverheadBytes);
    const wire = byteBudget(ceilings.maxRequestBytes);
    // The closing delimiter is written whatever else is, so it is spent before anything else.
    framing.take(MULTIPART_CLOSING_BYTES, 'files', 'maxMultipartOverheadBytes', FRAMING_ADVICE);
    wire.take(MULTIPART_CLOSING_BYTES, 'files', 'maxRequestBytes', REQUEST_ADVICE);
    const take = (part: MultipartPart, label: string): void => {
        const size = typeof part.content === 'string' ? Buffer.byteLength(part.content) : part.content.byteLength;
        // Raw labels first: measuring the framing exactly means escaping them, at up to three times their length.
        const labels =
            Buffer.byteLength(part.name) +
            (part.filename === null ? 0 : Buffer.byteLength(part.filename)) +
            (part.contentType ? Buffer.byteLength(part.contentType) : 0);
        if (labels > framing.remaining) {
            throw overCeiling(label, framing.limit, 'maxMultipartOverheadBytes', FRAMING_ADVICE);
        }
        const frame = multipartFramingBytes(part);
        content.take(size, label, 'maxUploadBytes', UPLOAD_ADVICE);
        framing.take(frame, label, 'maxMultipartOverheadBytes', FRAMING_ADVICE);
        wire.take(size + frame, label, 'maxRequestBytes', REQUEST_ADVICE);
        parts.push(part);
    };
    for (const [key, value] of pairsOf(formData)) {
        const name = String(key);
        take({name, filename: null, contentType: null, content: String(value)}, `formData[${JSON.stringify(name)}]`);
    }
    for (const [key, entry] of pairsOf(files)) {
        const name = String(key);
        const label = `files[${JSON.stringify(name)}]`;
        let filename = name;
        let value: unknown = entry;
        let contentType: string | null = null;
        if (Array.isArray(entry) && entry.length > 1) {
            refuseOverlongFilesTuple(name, entry);
            if (entry[0] != null) filename = String(entry[0]);
            value = entry[1];
            if (typeof entry[2] === 'string' && entry[2]) contentType = entry[2];
        }
        // Whichever ceiling has less left: content under `maxUploadBytes` can still exceed `maxRequestBytes`.
        const bytes = await partContent(name, value, Math.min(content.remaining, wire.remaining), content, deadline);
        if (bytes === null) {
            // A plain scalar under a `files` name: the caller meant an ordinary field.
            take({name, filename: null, contentType: null, content: String(value)}, label);
            continue;
        }
        if (contentType === null && value instanceof Blob && value.type) contentType = value.type;
        take({name, filename, contentType, content: bytes}, label);
    }
    return parts;
}

/**
 * The bytes behind one `files` value, copied into storage this module owns, or `null` for a plain scalar;
 * the copy stops a caller rewriting the array after the boundary was chosen by scanning it.
 */
async function partContent(
    key: string,
    value: unknown,
    maxBytes: number,
    budget: ByteBudget,
    deadline: Deadline,
): Promise<Uint8Array | null> {
    const label = `files[${JSON.stringify(key)}]`;
    if (value instanceof Blob) {
        if (value.size > maxBytes) throw overCeiling(label, budget.limit, 'maxUploadBytes', UPLOAD_ADVICE);
        return new Uint8Array(await value.arrayBuffer());
    }
    if (ArrayBuffer.isView(value)) {
        if (value.byteLength > maxBytes) throw overCeiling(label, budget.limit, 'maxUploadBytes', UPLOAD_ADVICE);
        // Already private after `snapshotPayload`; copying again would hold two of every upload.
        if (sdkOwnedPayloadBytes.has(value)) return value as Uint8Array;
        return new Uint8Array(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength));
    }
    if (value instanceof ArrayBuffer) {
        if (value.byteLength > maxBytes) throw overCeiling(label, budget.limit, 'maxUploadBytes', UPLOAD_ADVICE);
        return new Uint8Array(value.slice(0));
    }
    if (isNodeStream(value)) return readStreamBytes(key, value, budget, deadline);
    if (value === null || value === undefined || typeof value !== 'object') return null;
    throw new SdkUsageError(
        `files[${JSON.stringify(key)}]: expected bytes, a Blob, a readable stream, or a ` +
            '(filename, value, contentType?) tuple around one of those',
    );
}

/** Refuse a materialised part whose labels would forge a header: the pre-grant check, run on the encoded copy. */
function refuseUnsendableMaterialisedParts(parts: readonly MultipartPart[]): void {
    for (const part of parts) {
        const problems: Array<[string, unknown]> = [[`a part name of ${part.name.length} character(s)`, part.name]];
        if (part.filename !== null) problems.push([`the filename on part '${part.name}'`, part.filename]);
        if (part.contentType) problems.push([`the content type on part '${part.name}'`, part.contentType]);
        for (const [what, value] of problems) {
            const problem = multipartLabelProblem(what, value);
            if (problem !== null) throw new SdkUsageError(problem);
        }
    }
}

async function readStreamBytes(
    key: string,
    stream: unknown,
    budget: ByteBudget,
    deadline: Deadline,
): Promise<Uint8Array> {
    const label = `files[${JSON.stringify(key)}]`;
    const iterable = stream as {[Symbol.asyncIterator]?: () => AsyncIterator<unknown>};
    if (typeof iterable[Symbol.asyncIterator] !== 'function') {
        throw new SdkUsageError(
            `${label}: a stream that cannot be read - expected an async-iterable ` +
                'readable such as fs.createReadStream(...) or Readable.from(...)',
        );
    }
    const remaining = budget.remaining;
    const iterator = (iterable[Symbol.asyncIterator] as () => AsyncIterator<unknown>).call(stream);
    const chunks: Uint8Array[] = [];
    let total = 0;
    try {
        for (;;) {
            const step = await deadline.race(iterator.next());
            if (step.done) break;
            // Measured before it is copied, so an over-ceiling chunk is never allocated.
            if (total + chunkByteLength(step.value) > remaining) {
                throw overCeiling(label, budget.limit, 'maxUploadBytes', UPLOAD_ADVICE);
            }
            // Copied on arrival: a Node readable hands on its source's buffers, which a caller could rewrite.
            const bytes = ownedChunkBytes(step.value);
            total += bytes.byteLength;
            chunks.push(bytes);
        }
    } catch (error) {
        // Released before the failure leaves, so nothing read is held while the refusal propagates.
        chunks.length = 0;
        endStream(stream, iterator);
        throw error;
    }
    budget.take(total, label, 'maxUploadBytes', UPLOAD_ADVICE);
    return joinBytes(chunks, total);
}

/** Stop an abandoned stream: `destroy()` reaches a producer blocked in `read`, `return()` a generator. */
function endStream(stream: unknown, iterator: AsyncIterator<unknown>): void {
    try {
        const destroy = (stream as {destroy?: unknown}).destroy;
        if (typeof destroy === 'function') (destroy as () => void).call(stream);
    } catch {
        // A stream already torn down, or one that does not support being told.
    }
    try {
        const returned = iterator.return?.();
        if (returned && typeof returned.catch === 'function') returned.catch(() => {});
    } catch {
        // Same: the iteration is over either way.
    }
}

function chunkByteLength(chunk: unknown): number {
    if (typeof chunk === 'string') return Buffer.byteLength(chunk, 'utf8');
    if (ArrayBuffer.isView(chunk)) return chunk.byteLength;
    if (chunk instanceof ArrayBuffer) return chunk.byteLength;
    return ownedChunkBytes(chunk).byteLength;
}

function ownedChunkBytes(chunk: unknown): Uint8Array {
    if (typeof chunk === 'string') return new TextEncoder().encode(chunk);
    if (ArrayBuffer.isView(chunk)) {
        return new Uint8Array(chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength));
    }
    if (chunk instanceof ArrayBuffer) return new Uint8Array(chunk.slice(0));
    // An array-like: this overload copies, where the `ArrayBuffer` one above aliases.
    return new Uint8Array(chunk as ArrayLike<number>);
}

function pairsOf(container: unknown): Array<readonly [unknown, unknown]> {
    if (!container) return [];
    if (Array.isArray(container)) return container as Array<readonly [unknown, unknown]>;
    if (container instanceof Map) return [...container.entries()];
    if (typeof container === 'object') return Object.entries(container);
    return [];
}

function performanceNow(): number {
    return globalThis.performance ? globalThis.performance.now() : hrtimeMs();
}

function hrtimeMs(): number {
    const [s, ns] = process.hrtime();
    return s * 1000 + ns / 1e6;
}

function round4(n: number): number {
    return Math.round(n * 1e4) / 1e4;
}

/** How many bytes a string occupies once encoded as UTF-8; a lone surrogate counts as the three of U+FFFD. */
export function utf8ByteLength(text: string): number {
    return Buffer.byteLength(text, 'utf8');
}
