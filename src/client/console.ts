/**
 * Rendering one exchange for a terminal. Every API and payload value is redacted first, except the `curl -F`
 * field name and filename, which are control-neutralised so the command reproduces.
 */

import {PRINT_FORMAT_COMPACT} from '../config/sdkConfig.js';
import {redactMapping, redactValue} from '../redaction.js';
import type {RequestInfo} from './apiResponse.js';

/** The keys both glyph mappings carry, identically, so a resolver cannot hand back a missing key. */
export type GlyphKey = 'top' | 'bottom' | 'tee' | 'v' | 'h' | 'ellipsis';

export type BoxGlyphs = Record<GlyphKey, string>;

/** What could be established about the console stream; `'unknown'` resolves to ASCII. */
export type ConsoleEncoding = 'utf-8' | 'unknown';

export const UNICODE_BOX_GLYPHS: BoxGlyphs = Object.freeze({
    top: '┌',
    bottom: '└',
    tee: '├',
    v: '│',
    h: '─',
    ellipsis: '…',
});

export const ASCII_BOX_GLYPHS: BoxGlyphs = Object.freeze({
    top: '+',
    bottom: '+',
    tee: '+',
    v: '|',
    h: '-',
    ellipsis: '...',
});

const LOCALE_VARIABLES = ['LC_ALL', 'LC_CTYPE', 'LANG'] as const;
const UTF8_LOCALE = /utf-?8/i;
const WINDOWS = 'win32';
const MAX_ASCII = 0x7f;

/** What a non-UTF stream cannot carry, minus the block's own tab, newline and return. */
const ABOVE_LATIN1 = new RegExp('[^\\t\\n\\r\\u0020-\\u00ff]', 'gu');

/** C0, DEL and C1, and the two Unicode line separators: what a terminal obeys, or what forges a line. */
const CONTROL_RUN = new RegExp('[\\u0000-\\u001f\\u007f-\\u009f\\u2028\\u2029]', 'g');
const CONTROL_RUN_KEEPING_NEWLINE = new RegExp('[\\u0000-\\u0009\\u000b-\\u001f\\u007f-\\u009f\\u2028\\u2029]', 'g');

/** JSON's own short escapes, so a block that was a JSON document before neutralising still is one after. */
const JSON_SHORT_ESCAPES: Partial<Record<number, string>> = Object.freeze({
    0x08: '\\b',
    0x09: '\\t',
    0x0a: '\\n',
    0x0c: '\\f',
    0x0d: '\\r',
});

/** The `TERM` value that means the terminal cannot render escapes at all. */
const DUMB_TERMINAL = 'dumb';
const ANSI_ESCAPE = '\u001b';
const ANSI_ESCAPE_START = '\u001b[';
const ANSI_RESET = '\u001b[0m';

/** Row indent. Body blocks are not indented, so a response pastes as valid JSON. */
const ROW_INDENT = '  ';

const CONSOLE_TITLE = 'Exsited';
const COMPACT_PREFIX = 'exsited';
const MULTIPART_PREFIX = '<multipart: ';
const UNNAMED_FILE = 'file';
const CONTENT_TYPE_HEADER = 'Content-Type';
const JSON_CONTENT_TYPE = 'application/json';
const POSIX_SHELL_LABEL = 'POSIX shell';

/** The three host signals the probe reads, separated so a test can state a console. */
export interface ConsoleSignals {
    available: boolean;
    isTty: boolean;
    platform: string;
    /** The first of `LC_ALL`, `LC_CTYPE`, `LANG` that is set. */
    locale: string | undefined;
}

const NO_SIGNALS: ConsoleSignals = Object.freeze({
    available: false,
    isTty: false,
    platform: '',
    locale: undefined,
});

/** Read the signals from the host, or report none where there is no `process` or no `stdout`. */
export function readConsoleSignals(): ConsoleSignals {
    try {
        if (typeof process === 'undefined' || process === null) return NO_SIGNALS;
        const stdout = process.stdout as {isTTY?: boolean} | undefined;
        if (stdout === undefined || stdout === null) return NO_SIGNALS;
        const env = (process.env ?? {}) as Record<string, string | undefined>;
        let locale: string | undefined;
        for (const name of LOCALE_VARIABLES) {
            if (env[name]) {
                locale = env[name];
                break;
            }
        }
        return {
            available: true,
            isTty: Boolean(stdout.isTTY),
            platform: typeof process.platform === 'string' ? process.platform : '',
            locale,
        };
    } catch {
        return NO_SIGNALS;
    }
}

/**
 * UTF-8 only for a TTY off Windows whose locale names UTF-8; Node cannot read the Windows code page,
 * so anything else is `'unknown'`.
 */
export function consoleEncoding(signals: ConsoleSignals = readConsoleSignals()): ConsoleEncoding {
    if (!signals.available) return 'unknown';
    if (!signals.isTty) return 'unknown';
    if (signals.platform === WINDOWS) return 'unknown';
    if (signals.locale !== undefined && UTF8_LOCALE.test(signals.locale)) return 'utf-8';
    return 'unknown';
}

/** Whether every character of `text` survives a console of this encoding; `'unknown'` means ASCII. */
export function canEncode(text: string, encoding: ConsoleEncoding): boolean {
    if (encoding === 'utf-8') return true;
    for (const character of text) {
        if ((character.codePointAt(0) ?? 0) > MAX_ASCII) return false;
    }
    return true;
}

/** Box-drawing characters the console can print, as a fresh mapping; every Unicode value is probed. */
export function resolveBoxGlyphs(encoding: ConsoleEncoding = consoleEncoding()): BoxGlyphs {
    const every = Object.values(UNICODE_BOX_GLYPHS).join('');
    return canEncode(every, encoding) ? {...UNICODE_BOX_GLYPHS} : {...ASCII_BOX_GLYPHS};
}

/** Escape above Latin-1 where the console cannot carry it, so an accented name stays readable. */
export function escapeForConsole(text: string, encoding: ConsoleEncoding = consoleEncoding()): string {
    if (encoding === 'utf-8') return text;
    return text.replace(ABOVE_LATIN1, (character) => {
        const code = character.codePointAt(0) ?? 0;
        if (code > 0xffff) return `\\u{${code.toString(16)}}`;
        return `\\u${code.toString(16).padStart(4, '0')}`;
    });
}

/** Escape control characters from outside the SDK: a terminal acts on escapes, and U+2028 forges a line. */
export function neutraliseControls(text: string, options: {keepNewlines?: boolean} = {}): string {
    const pattern = options.keepNewlines === true ? CONTROL_RUN_KEEPING_NEWLINE : CONTROL_RUN;
    return text.replace(pattern, (character) => {
        const code = character.charCodeAt(0);
        return JSON_SHORT_ESCAPES[code] ?? `\\u${code.toString(16).padStart(4, '0')}`;
    });
}

function neutralise(text: string, keepNewlines = false): string {
    return neutraliseControls(text, {keepNewlines});
}

function safeText(value: unknown): string {
    try {
        if (typeof value === 'string') return value;
        return String(value);
    } catch {
        return '<unrenderable value>';
    }
}

function isBinary(value: unknown): value is Uint8Array | ArrayBuffer | DataView {
    return value instanceof Uint8Array || value instanceof ArrayBuffer || value instanceof DataView;
}

function summariseBinary(value: Uint8Array | ArrayBuffer | DataView): string {
    return `<${value.byteLength} bytes>`;
}

/** Summarise binary at any depth from the raw `this[key]`, since `JSON.stringify` calls `Buffer`'s `toJSON` first. */
function binaryReplacer(this: unknown, key: string, val: unknown): unknown {
    const holder = this as Record<string, unknown> | null;
    const raw = holder && typeof holder === 'object' ? holder[key] : val;
    if (isBinary(raw)) return summariseBinary(raw);
    if (isBinary(val)) return summariseBinary(val);
    return val;
}

/** Whether a string is itself a JSON object or array document: true for `'{"a": 1}'`, false for `'42'`. */
function isJsonDocument(text: string): boolean {
    // Cheap reject first, so a long text body is not handed to the parser at all.
    const trimmed = text.replace(/^\s+/, '');
    if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return false;
    try {
        const parsed: unknown = JSON.parse(text);
        return parsed !== null && typeof parsed === 'object';
    } catch {
        return false;
    }
}

function collapseJsonDocument(text: string): string {
    let out = '';
    let inString = false;
    let escaped = false;
    for (const ch of text) {
        if (inString) {
            out += ch;
            if (escaped) escaped = false;
            else if (ch === '\\') escaped = true;
            else if (ch === '"') inString = false;
            continue;
        }
        // The four characters JSON allows between tokens, so nothing else can be dropped.
        if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') continue;
        out += ch;
        if (ch === '"') inString = true;
        else if (ch === ':' || ch === ',') out += ' ';
    }
    return out;
}

/** Render a value for display; a string that is already a JSON document prints as it stands, and nothing throws. */
export function renderJsonValue(value: unknown, options: {compact?: boolean} = {}): string {
    const compact = Boolean(options.compact);
    if (value === null || value === undefined) return '<empty>';
    if (isBinary(value)) return summariseBinary(value);
    if (typeof value === 'string') {
        // Printed as the document it is; JSON-encoding it would give a string literal with no fields.
        if (isJsonDocument(value)) return neutralise(value, !compact);
        // Compact owes the caller one line, which a text body would otherwise break.
        if (compact) return neutralise(JSON.stringify(value).slice(1, -1));
        return neutralise(value, true);
    }
    try {
        const rendered = compact ? JSON.stringify(value, binaryReplacer) : JSON.stringify(value, binaryReplacer, 2);
        // `undefined` back from stringify means the value has no JSON form at all.
        if (rendered === undefined) return neutralise(safeText(value), !compact);
        return neutralise(rendered, !compact);
    } catch {
        return neutralise(safeText(value), !compact);
    }
}

/** Whether colour escapes should be emitted at all; false when piped to a file. */
export function stdoutSupportsColour(): boolean {
    try {
        if (typeof process === 'undefined' || process === null) return false;
        if (process.env?.['NO_COLOR']) return false;
        if (process.env?.['TERM'] === DUMB_TERMINAL) return false;
        return Boolean(process.stdout && process.stdout.isTTY);
    } catch {
        return false;
    }
}

/** ANSI helpers that no-op when colour is off or stdout is not a TTY. */
class Colour {
    readonly #enabled: boolean;
    readonly #glyphs: BoxGlyphs;

    constructor(enabled: boolean, glyphs: BoxGlyphs) {
        this.#enabled = enabled;
        this.#glyphs = glyphs;
    }

    dim(text: string): string {
        return this.#enabled ? `\u001b[2m${text}\u001b[0m` : text;
    }

    section(label: string): string {
        const prefix = `${this.#glyphs.tee}${this.#glyphs.h} ${label} `;
        return this.dim(prefix + this.#glyphs.h.repeat(Math.max(4, 62 - prefix.length)));
    }

    status(text: string, succeeded: boolean): string {
        if (!this.#enabled) return text;
        return `\u001b[${succeeded ? '32' : '31'}m${text}\u001b[0m`;
    }
}

function shellQuote(s: unknown): string {
    return `'${String(s).replace(/'/g, "'\\''")}'`;
}

function hasRead(value: unknown): boolean {
    return (
        value !== null &&
        (typeof value === 'object' || typeof value === 'function') &&
        typeof (value as {read?: unknown}).read === 'function'
    );
}

function multipartEntries(files: unknown): Array<[string, string]> {
    if (files instanceof Map) {
        return [...(files as Map<unknown, unknown>).entries()].map(([key, value]) =>
            multipartEntry(String(key), value),
        );
    }
    if (files && typeof files === 'object' && !Array.isArray(files) && !hasRead(files) && !isBinary(files)) {
        return Object.entries(files).map(([key, value]) => multipartEntry(String(key), value));
    }
    if (Array.isArray(files)) {
        if (files.every((entry) => Array.isArray(entry) && entry.length === 2)) {
            return files.map((entry: unknown[]) => multipartEntry(String(entry[0]), entry[1]));
        }
        return [multipartEntry(UNNAMED_FILE, files)];
    }
    // A lone stream handle, probed rather than iterated so a one-shot container is not consumed.
    if (hasRead(files)) return [multipartEntry(UNNAMED_FILE, files)];
    return [];
}

function multipartEntry(fieldName: string, value: unknown): [string, string] {
    let filename: string | null = null;
    let handle: unknown = value;
    if (Array.isArray(value) && value.length) {
        if (typeof value[0] === 'string') filename = value[0];
        handle = value.length > 1 ? value[1] : null;
    }
    const named = handle && typeof handle === 'object' ? (handle as {name?: unknown}).name : undefined;
    const name = filename || (typeof named === 'string' && named) || UNNAMED_FILE;
    return [fieldName, String(name)];
}

/** Describe what was sent without reading a byte of any upload: `{files: '<multipart: file=a.xlsx>', form: body}`. */
export function summarisePayload(body: unknown, files: unknown): unknown {
    const entries = multipartEntries(files);
    if (!entries.length) return body;
    const names = entries.map(([field, filename]) => `${field}=${filename}`).join(', ');
    const summary = `${MULTIPART_PREFIX}${names}>`;
    if (body === null || body === undefined) return summary;
    return {files: summary, form: body};
}

function formPart(payload: unknown): unknown {
    if (
        payload &&
        typeof payload === 'object' &&
        !Array.isArray(payload) &&
        'files' in payload &&
        'form' in payload &&
        Object.keys(payload).length === 2 &&
        String((payload as {files: unknown}).files).startsWith(MULTIPART_PREFIX)
    ) {
        return (payload as {form: unknown}).form;
    }
    return payload;
}

function formFields(body: unknown): Array<[string, unknown]> {
    if (body && typeof body === 'object' && !Array.isArray(body)) {
        return Object.entries(redactValue(body) as Record<string, unknown>);
    }
    if (Array.isArray(body) && body.length && body.every((e) => Array.isArray(e) && e.length === 2)) {
        return redactValue(body) as Array<[string, unknown]>;
    }
    return [];
}

function namesTheContentType(headers: Record<string, unknown>): boolean {
    return Object.keys(headers).some((name) => name.toLowerCase() === CONTENT_TYPE_HEADER.toLowerCase());
}

/** What {@link buildCurlCommand} reproduces. */
export interface CurlExchange {
    method?: string;
    url: string;
    headers?: Readonly<Record<string, unknown>>;
    body?: unknown;
    files?: unknown;
    formEncoded?: boolean;
    verifySsl?: boolean;
    queryParams?: Readonly<Record<string, unknown>>;
}

/** A `curl` reproducing the call, single-quoted for a POSIX shell, secrets redacted: for reading, not re-issuing. */
export function buildCurlCommand(exchange: CurlExchange): string {
    const method = exchange.method || 'GET';
    const headers = redactMapping((exchange.headers || {}) as Record<string, unknown>);
    const formEncoded = Boolean(exchange.formEncoded);
    let url = neutralise(safeText(exchange.url));
    if (exchange.queryParams && Object.keys(exchange.queryParams).length) {
        const usp = new URLSearchParams();
        for (const [key, value] of Object.entries(exchange.queryParams)) {
            if (Array.isArray(value)) for (const item of value) usp.append(key, String(item));
            else usp.append(key, String(value));
        }
        // `%2A` back to `*` keeps the redaction marker readable.
        const separator = url.includes('?') ? '&' : '?';
        url = `${url}${separator}${usp.toString().replace(/%2A/g, '*')}`;
    }

    const parts = [`curl -X ${shellQuote(method)} ${shellQuote(url)}`];
    if (exchange.verifySsl === false) parts.push('  -k');
    for (const [key, value] of Object.entries(headers).sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
        parts.push(`  -H ${shellQuote(`${neutralise(safeText(key))}: ${neutralise(safeText(value))}`)}`);
    }

    const entries = multipartEntries(exchange.files);
    const body = formPart(exchange.body);
    for (const [fieldName, filename] of entries) {
        parts.push(`  -F ${shellQuote(`${neutralise(fieldName)}=@${neutralise(filename)}`)}`);
    }
    if (entries.length) {
        // Form fields ride in the same multipart body, so they are `-F` too.
        for (const [key, value] of formFields(body)) {
            parts.push(`  -F ${shellQuote(`${neutralise(safeText(key))}=${neutralise(safeText(value))}`)}`);
        }
    } else if (body !== null && body !== undefined) {
        const fields = formEncoded ? formFields(body) : [];
        if (fields.length) {
            // curl encodes each `--data-urlencode` field and sets the content type.
            for (const [key, value] of fields) {
                parts.push(
                    `  --data-urlencode ${shellQuote(`${neutralise(safeText(key))}=${neutralise(safeText(value))}`)}`,
                );
            }
        } else {
            const redacted = redactValue(body);
            // One line before the control guard: in single quotes a newline would forge a line; escaping breaks JSON.
            const rendered =
                typeof redacted === 'string' && isJsonDocument(redacted)
                    ? neutralise(collapseJsonDocument(redacted))
                    : renderJsonValue(redacted, {compact: true});
            if (!formEncoded && !namesTheContentType(headers)) {
                // curl defaults `--data-raw` to form encoding, and honours the last `-H`.
                parts.push(`  -H ${shellQuote(`${CONTENT_TYPE_HEADER}: ${JSON_CONTENT_TYPE}`)}`);
            }
            parts.push(`  --data-raw ${shellQuote(rendered)}`);
        }
    }
    return parts.join(' \\\n');
}

/** The print options {@link renderExchange} reads; an `SdkConfig` carries all of them. */
export interface ConsoleSettings {
    printApiInfo?: boolean;
    printRequestPayload?: boolean;
    printResponseBody?: boolean;
    printHeaders?: boolean;
    printCurl?: boolean;
    printFormat?: string;
    printColor?: boolean;
    printMaxChars?: number;
    verifySsl?: boolean;
}

/** One exchange as the console sees it: an `ApiResponse`, or a request that never produced one. */
export interface RenderableExchange {
    readonly requestInfo: RequestInfo | null;
    readonly statusCode: number | string;
    readonly succeeded: boolean;
    readonly headers: Readonly<Record<string, string>>;
    readonly map?: unknown;
    readonly data?: unknown;
    readonly requestId?: string | null;
}

/** The decoded body whatever `responseFormat` says, so a printed body stays comparable between runs. */
function readResponseBody(response: RenderableExchange): unknown {
    return 'map' in response ? response.map : response.data;
}

/** Render one exchange for the console, boxed or on one line per `config.printFormat`. */
export function renderExchange(
    response: RenderableExchange,
    body: unknown,
    files: unknown,
    config: ConsoleSettings,
    options: {formEncoded?: boolean} = {},
): string {
    const info = response.requestInfo as RequestInfo;
    const payload = summarisePayload(body, files);
    const formEncoded = Boolean(options.formEncoded);
    const maxChars = config.printMaxChars ?? 0;

    if (config.printFormat === PRINT_FORMAT_COMPACT) {
        const parts = [
            COMPACT_PREFIX,
            neutralise(safeText(info.clientName)),
            neutralise(safeText(info.httpMethod)),
            neutralise(safeText(info.url)),
            String(response.statusCode),
            `${info.attemptCount}/${info.maxAttempts}`,
            `${info.elapsedSeconds}s`,
        ];
        if (config.printRequestPayload) parts.push(`payload=${renderJsonValue(redactValue(payload), {compact: true})}`);
        if (config.printResponseBody)
            parts.push(`response=${renderJsonValue(redactValue(readResponseBody(response)), {compact: true})}`);
        return truncate(escapeForConsole(parts.join(' | ')), maxChars);
    }

    const glyphs = resolveBoxGlyphs();
    const colour = new Colour(Boolean(config.printColor) && stdoutSupportsColour(), glyphs);
    const lines = [colour.dim(`${glyphs.top}${glyphs.h} ${CONSOLE_TITLE} ${glyphs.h.repeat(51)}`)];

    if (config.printApiInfo) {
        const rows: Array<[string, unknown]> = [
            ['client', info.clientName],
            ['api version', info.apiVersion],
            ['method', info.httpMethod],
            ['endpoint', info.endpoint],
            ['url', info.url],
            ['params', renderJsonValue(info.queryParams, {compact: true})],
        ];
        for (const [label, value] of rows) {
            // The newline is escaped, so a value cannot forge a second field row.
            lines.push(`${ROW_INDENT}${label.padEnd(12)} : ${neutralise(safeText(value))}`);
        }
        lines.push(
            `${ROW_INDENT}${'status'.padEnd(12)} : ${colour.status(String(response.statusCode), Boolean(response.succeeded))}`,
        );
        lines.push(`${ROW_INDENT}${'attempt'.padEnd(12)} : ${info.attemptCount} / ${info.maxAttempts}`);
        lines.push(`${ROW_INDENT}${'elapsed'.padEnd(12)} : ${info.elapsedSeconds}s`);
        // The v4 envelope's own id for the request, the one thing support asks for.
        if (response.requestId) {
            lines.push(`${ROW_INDENT}${'request id'.padEnd(12)} : ${neutralise(safeText(response.requestId))}`);
        }
    }

    if (config.printHeaders) {
        lines.push(colour.section('request headers'));
        lines.push(...headerRows(info.headers));
        lines.push(colour.section('response headers'));
        // Response headers arrive raw, so they are redacted here; request headers already were, in RequestInfo.
        lines.push(...headerRows(redactMapping(response.headers as Record<string, unknown>)));
    }

    if (config.printRequestPayload && payload != null) {
        lines.push(colour.section('payload'));
        lines.push(renderJsonValue(redactValue(payload)));
    }

    if (config.printResponseBody) {
        lines.push(colour.section('response'));
        lines.push(renderJsonValue(redactValue(readResponseBody(response))));
    }

    if (config.printCurl) {
        // The shell is named in the label: POSIX quoting is not visible from the line.
        lines.push(colour.section(`curl (${POSIX_SHELL_LABEL})`));
        lines.push(
            buildCurlCommand({
                method: info.httpMethod,
                url: info.url,
                headers: info.headers,
                body: payload,
                files,
                formEncoded,
                ...(config.verifySsl === undefined ? {} : {verifySsl: config.verifySsl}),
                queryParams: info.queryParams,
            }),
        );
    }

    const closing = colour.dim(glyphs.bottom + glyphs.h.repeat(61));
    return truncate(escapeForConsole(lines.join('\n')), maxChars, `\n${closing}`);
}

function headerRows(headers: Readonly<Record<string, unknown>>): string[] {
    return Object.entries(headers)
        .sort((a, b) => (a[0] < b[0] ? -1 : 1))
        .map(([key, value]) => `${ROW_INDENT}${neutralise(safeText(key)).padEnd(14)}: ${neutralise(safeText(value))}`);
}

/** Cut a rendered block to `maxChars` (`0` is unlimited), notice and closing frame included. */
function truncate(text: string, maxChars: number, tail = ''): string {
    if (!maxChars || text.length + tail.length <= maxChars) return text + tail;
    const ellipsis = resolveBoxGlyphs().ellipsis;
    let reserved = tail.length + `${ellipsis} +${text.length} chars`.length;
    if (text.includes(ANSI_ESCAPE)) reserved += ANSI_RESET.length;
    const cut = Math.min(text.length, Math.max(0, maxChars - reserved));
    if (cut >= text.length) return text + tail;
    const sliced = closeColourRun(text.slice(0, cut));
    return `${sliced}${ellipsis} +${text.length - cut} chars${tail}`;
}

/** Repair an ANSI sequence a cut landed inside, so the terminal is not left dim afterwards. */
function closeColourRun(text: string): string {
    if (!text.includes(ANSI_ESCAPE)) return text;
    const marker = text.lastIndexOf(ANSI_ESCAPE);
    let out = text;
    if (!out.slice(marker).includes('m')) out = out.slice(0, marker);
    const last = out.lastIndexOf(ANSI_ESCAPE_START);
    if (last !== -1 && !out.startsWith(ANSI_RESET, last)) return out + ANSI_RESET;
    return out;
}
