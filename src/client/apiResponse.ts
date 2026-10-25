/** What every SDK call returns: one HTTP exchange, not a model of the resource. */

import {DEFAULT_RESPONSE_FORMAT, ResponseFormat} from '../config/sdkConfig.js';
import {isDtoMapping} from '../dto.js';
import {type FieldError, SdkAuthError, SdkError, SdkUsageError} from '../errors.js';
import {REDACTED, redactMapping, redactValue, shouldRedact} from '../redaction.js';

const MAX_REPORTED_MESSAGES = 50;
const MAX_MESSAGE_DEPTH = 4;
const URL_FIELD = 'url';
/** The v4 envelope names every body by its `object`; an error body names itself this. */
const ERROR_OBJECT = 'error';

/** Classification of a failed call, derived from the HTTP status. A member is its string value. */
export const ErrorType = Object.freeze({
    NONE: 'none',
    REDIRECT: 'redirect',
    VALIDATION: 'validation',
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    NOT_FOUND: 'not_found',
    METHOD_NOT_ALLOWED: 'method_not_allowed',
    CONFLICT: 'conflict',
    RATE_LIMIT: 'rate_limit',
    SERVER: 'server',
    NETWORK: 'network',
    TIMEOUT: 'timeout',
    UNKNOWN: 'unknown',
} as const);
export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];

const ERROR_TYPE_VALUES: ReadonlySet<string> = new Set(Object.values(ErrorType));

/** Map an HTTP status to an ErrorType; a denied 2xx classifies `unknown`, not `none`. */
export function classifyErrorType(statusCode: number, bodyDeniedSuccess = false): ErrorType {
    if (statusCode >= 200 && statusCode < 300) return bodyDeniedSuccess ? ErrorType.UNKNOWN : ErrorType.NONE;
    if (statusCode >= 300 && statusCode < 400) return ErrorType.REDIRECT;
    if (statusCode === 400 || statusCode === 422) return ErrorType.VALIDATION;
    if (statusCode === 401) return ErrorType.AUTHENTICATION;
    if (statusCode === 403) return ErrorType.AUTHORIZATION;
    if (statusCode === 404) return ErrorType.NOT_FOUND;
    if (statusCode === 405) return ErrorType.METHOD_NOT_ALLOWED;
    if (statusCode === 409) return ErrorType.CONFLICT;
    if (statusCode === 429) return ErrorType.RATE_LIMIT;
    if (statusCode >= 500 && statusCode < 600) return ErrorType.SERVER;
    return ErrorType.UNKNOWN;
}

/** Redact query values for RequestInfo into a frozen copy; prototype-less while filled, for `__proto__`. */
function redactQueryParams(
    params: Readonly<Record<string, unknown>> | null | undefined,
): Readonly<Record<string, unknown>> {
    if (!params) return Object.freeze({});
    const out = Object.create(null) as Record<string, unknown>;
    for (const [key, value] of Object.entries(params)) {
        out[key] = shouldRedact(String(key)) ? REDACTED : redactValue(value);
    }
    return Object.freeze(Object.setPrototypeOf(out, Object.prototype) as Record<string, unknown>);
}

function redactUrl(url: unknown): string {
    return String(redactMapping({[URL_FIELD]: url as string})[URL_FIELD] ?? '');
}

/** A supplied path template, minus any query string or fragment. */
export function pathTemplateOf(endpoint: unknown): string | null {
    if (typeof endpoint !== 'string' || !endpoint) return null;
    const cut = endpoint.search(/[?#]/);
    return cut < 0 ? endpoint : endpoint.slice(0, cut);
}

/** The {@link RequestInfo} fields carrying the call's values, withheld from every rendering. */
const WITHHELD_FIELDS = Object.freeze(['url', 'queryParams', 'headers', 'body'] as const);

export interface RequestInfoOptions {
    clientName: string;
    apiVersion: string;
    httpMethod: string;
    url: string;
    resolvedUrl?: string | undefined;
    /** The unresolved path template. */
    endpoint?: string | null | undefined;
    queryParams?: Readonly<Record<string, unknown>> | null | undefined;
    body?: unknown;
    headers?: Readonly<Record<string, unknown>> | null | undefined;
    attemptCount?: number | undefined;
    maxAttempts?: number | undefined;
    elapsedSeconds?: number | undefined;
}

/** What was sent: structural fields enumerable, the call's values withheld from default traversal. */
export class RequestInfo {
    /** The URL as requested, before redaction. */
    readonly #resolvedUrl: string;

    readonly clientName: string;
    readonly apiVersion: string;
    readonly httpMethod: string;
    /** The resolved URL, secrets redacted; still carries the host and path. */
    declare readonly url: string;
    /** The unfilled path template, named by default-safe output in place of `url`. */
    readonly endpoint: string | null;
    declare readonly queryParams: Readonly<Record<string, unknown>>;
    declare readonly body: unknown;
    declare readonly headers: Readonly<Record<string, string>>;
    readonly attemptCount: number;
    readonly maxAttempts: number;
    readonly elapsedSeconds: number;

    constructor(options: RequestInfoOptions) {
        this.clientName = options.clientName;
        this.apiVersion = options.apiVersion;
        this.httpMethod = options.httpMethod;
        // The assembled target the transport wrote, query included: it tells two pages apart.
        const resolved = typeof options.resolvedUrl === 'string' ? options.resolvedUrl : options.url;
        this.#resolvedUrl = typeof resolved === 'string' ? resolved : '';
        this.endpoint = pathTemplateOf(options.endpoint);
        this.attemptCount = options.attemptCount ?? 1;
        this.maxAttempts = options.maxAttempts ?? 1;
        this.elapsedSeconds = options.elapsedSeconds ?? 0.0;
        const withheld: Record<(typeof WITHHELD_FIELDS)[number], unknown> = {
            url: redactUrl(options.url),
            queryParams: redactQueryParams(options.queryParams),
            headers: redactMapping((options.headers ?? {}) as Record<string, unknown>),
            body: redactValue(options.body ?? null),
        };
        // Withheld from default traversal before the freeze, and reachable by name.
        for (const name of WITHHELD_FIELDS) {
            Object.defineProperty(this, name, {value: withheld[name], enumerable: false, writable: false});
        }
        Object.freeze(this);
    }

    /** The structural view every default rendering uses: the call, not its values. */
    toJSON(): Record<string, unknown> {
        return {
            clientName: this.clientName,
            apiVersion: this.apiVersion,
            httpMethod: this.httpMethod,
            endpoint: this.endpoint,
            attemptCount: this.attemptCount,
            maxAttempts: this.maxAttempts,
            elapsedSeconds: this.elapsedSeconds,
            withheld: [...WITHHELD_FIELDS],
        };
    }

    [Symbol.for('nodejs.util.inspect.custom')](): string {
        return `RequestInfo ${JSON.stringify(this.toJSON())}`;
    }

    /** The unredacted resolved URL held on `info`, or `''`; a static method, since a getter would be traversed. */
    static resolvedUrlOf(info: unknown): string {
        return info instanceof RequestInfo ? info.#resolvedUrl : '';
    }
}

/** The unredacted resolved URL of a {@link RequestInfo}, for the pagination walk. Not safe to log. */
export function resolvedRequestUrl(info: unknown): string {
    return RequestInfo.resolvedUrlOf(info);
}

/** Anything `dto` can build a view with: a `Dto` subclass, or any type answering `fromMap` the same way. */
export interface DtoTypeLike<T = unknown> {
    fromMap(body: unknown): T;
}

export interface ApiResponseInit<T = unknown> {
    statusCode: number;
    /** The decoded body. */
    data: unknown;
    headers?: Readonly<Record<string, string>> | null | undefined;
    contentType?: string | null | undefined;
    requestInfo?: RequestInfo | null | undefined;
    errorType?: string | undefined;
    /** The body as received; `json` serves it. */
    bodyText?: string | null | undefined;
    responseFormat?: string | undefined;
    /** The shape `dto` builds. */
    dtoType?: DtoTypeLike<T> | null | undefined;
}

/** One HTTP exchange: what was sent, what came back. */
export class ApiResponse<T = unknown> {
    readonly #map: unknown;
    readonly #bodyText: string | null;
    readonly #dtoType: DtoTypeLike<T> | null;
    /** The built view, and whether it has been built; `null` is a valid built value. */
    #dto: T | null = null;
    #dtoBuilt = false;

    /** The view `responseFormat` selects, installed as an own enumerable accessor. */
    readonly data: unknown;

    readonly statusCode: number;
    /** Which form `data` presents; `map`, `json` and `dto` ignore it. */
    readonly responseFormat: string;
    readonly headers: Readonly<Record<string, string>>;
    /** `null` for a `204`, and for a backend that reported no content type. */
    readonly contentType: string | null;
    /** `null` on a response built without one. */
    readonly requestInfo: RequestInfo | null;
    readonly errorType: ErrorType;

    constructor(options: ApiResponseInit<T>) {
        this.statusCode = options.statusCode;
        this.#map = options.data;
        this.#bodyText = options.bodyText ?? null;
        this.#dtoType = options.dtoType ?? null;
        this.responseFormat = options.responseFormat ?? DEFAULT_RESPONSE_FORMAT;
        // Copied and frozen: a caller holding the original could otherwise change this record.
        this.headers = Object.freeze({...(options.headers || {})});
        this.contentType = options.contentType ?? null;
        this.requestInfo = options.requestInfo ?? null;
        let errorType: string = options.errorType ?? ErrorType.NONE;
        if (!ERROR_TYPE_VALUES.has(errorType)) {
            throw new SdkUsageError(
                `unknown error_type ${JSON.stringify(errorType)}; expected one of: ${[...ERROR_TYPE_VALUES].join(', ')}`,
            );
        }
        // Keyed on the decoded body, never `data`: `succeeded` cannot depend on the form asked.
        const denied = bodyDeniesSuccess(this.#map);
        if (errorType === ErrorType.NONE && (!(this.statusCode >= 200 && this.statusCode < 300) || denied)) {
            errorType = classifyErrorType(this.statusCode, denied);
        }
        this.errorType = errorType as ErrorType;

        // An unsupported form reads `null`; own and enumerable, because `JSON.stringify` and spread skip getters.
        Object.defineProperty(this, 'data', {
            get: () => {
                if (this.responseFormat === ResponseFormat.JSON) return this.#bodyText;
                if (this.responseFormat === ResponseFormat.DTO) return this.dto;
                return this.#map;
            },
            enumerable: true,
            configurable: false,
        });

        Object.freeze(this);
    }

    /** The decoded body: an object or array for JSON, `Uint8Array` for a download, `null` for 204. */
    get map(): unknown {
        return this.#map;
    }

    /** The text `map` was decoded from, in the server's key order; `null` when not text. */
    get json(): string | null {
        return this.#bodyText;
    }

    /** The typed view over this body; `null` if the body is not a record or no type is declared. */
    get dto(): T | null {
        if (!this.#dtoBuilt) {
            this.#dtoBuilt = true;
            this.#dto = this.#dtoType && isDtoMapping(this.#map) ? this.#dtoType.fromMap(this.#map) : null;
        }
        return this.#dto;
    }

    /** `true` for a 2xx whose body does not deny it: a v4 body naming itself `{"object": "error"}` is a failure. */
    get succeeded(): boolean {
        return this.statusCode >= 200 && this.statusCode < 300 && !bodyDeniesSuccess(this.#map);
    }

    /** The v4 envelope's machine-readable code, or `null`. */
    get errorCode(): string | null {
        return this.#errorField('code') ?? this.#errorField('error');
    }

    /** The v4 envelope's own id for this request, `"req_..."`, or `null`. */
    get requestId(): string | null {
        return this.#errorField('request_id');
    }

    /** The v4 envelope's documentation link for {@link errorCode}, or `null`. */
    get docUrl(): string | null {
        return this.#errorField('doc_url');
    }

    /** The v4 envelope's per-field failures; only entries naming a `field`. */
    getFieldErrors(): FieldError[] {
        const body = errorBodyOf(this.#map);
        if (!body || !Array.isArray(body['errors'])) return [];
        const out: FieldError[] = [];
        for (const entry of body['errors'] as unknown[]) {
            if (!isMappingLike(entry)) continue;
            const field = entry['field'];
            if (field === undefined || field === null || String(field).trim() === '') continue;
            const built: FieldError = {field: String(field)};
            for (const key of ['code', 'message', 'doc_url'] as const) {
                const value = entry[key];
                if (value !== undefined && value !== null) built[key] = String(value);
            }
            out.push(built);
        }
        return out;
    }

    /** Human-readable problems from an error body, most specific first; empty on success. */
    getErrorMessages(): string[] {
        const map = errorBodyOf(this.#map);
        if (map == null) return [];

        let messages = readErrorEntries(map['errors']);
        if (!messages.length) messages = readMessageValue(map['message']);
        if (!messages.length) messages = readMessageValue(map['error']);
        if (!messages.length) messages = readMessageValue(map['errorCode']);
        if (!messages.length) messages = readMessageValue(map['code']);
        if (!messages.length) messages = readMessageValue(map['detail']);
        if (!messages.length) messages = readMessageValue(map['title']);
        return capMessages(messages);
    }

    /** Throw an `SdkError` when the call failed, otherwise answer the response so it chains. */
    raiseForStatus(): this {
        if (this.succeeded) return this;
        const messages = this.getErrorMessages();
        // Structural, never `messages[0]`: an uncaught error prints this, and the API's text names the record.
        const summary = messages.length
            ? `HTTP ${this.statusCode} with ${messages.length} reported message(s); read getErrorMessages() for the API's own text`
            : `HTTP ${this.statusCode} with no reported message`;
        const ErrorClass = this.statusCode === 401 || this.statusCode === 403 ? SdkAuthError : SdkError;
        const error = new ErrorClass(summary, {
            statusCode: this.statusCode,
            errorType: this.errorType,
            rawResponse: redactValue(this.#map),
            responseHeaders: redactMapping(this.headers as Record<string, unknown>) as Record<string, string>,
            requestInfo: this.requestInfo,
            errorCode: this.errorCode,
            requestId: this.requestId,
            docUrl: this.docUrl,
            fieldErrors: this.getFieldErrors(),
        });
        for (const message of messages) error.addError(message);
        throw error;
    }

    /** One top-level string off an error envelope; never read on a success, where `code` may be a record's own. */
    #errorField(key: string): string | null {
        if (this.succeeded) return null;
        const value = errorBodyOf(this.#map)?.[key];
        return typeof value === 'string' && value.trim() !== '' ? value : null;
    }
}

/** Whether a decoded body is worth searching for messages; the prototype is checked so a `Date` does not qualify. */
function isMappingLike(value: unknown): value is Record<string, unknown> {
    if (value === null || typeof value !== 'object') return false;
    if (Array.isArray(value) || ArrayBuffer.isView(value)) return false;
    const proto: unknown = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

/** Whether a decoded body denies success: a v4 body whose `object` is `"error"`, whatever the status. */
function bodyDeniesSuccess(data: unknown): boolean {
    if (!isMappingLike(data)) return false;
    const objectName = data['object'];
    return typeof objectName === 'string' && objectName.trim().toLowerCase() === ERROR_OBJECT;
}

/** The body as a mapping, parsing a JSON error that arrived undecoded under another content type. */
function errorBodyOf(data: unknown): Record<string, unknown> | null {
    if (isMappingLike(data)) return data;
    return parseJsonBody(data);
}

function parseJsonBody(data: unknown): Record<string, unknown> | null {
    let text: unknown = data;
    if (text instanceof Uint8Array) {
        try {
            text = new TextDecoder('utf-8', {fatal: true}).decode(text);
        } catch {
            return null;
        }
    }
    if (typeof text !== 'string') return null;
    const trimmed = text
        .trim()
        .replace(/^\uFEFF/, '')
        .trim();
    if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return null;
    let parsed: unknown;
    try {
        parsed = JSON.parse(trimmed);
    } catch {
        return null;
    }
    return isMappingLike(parsed) ? parsed : null;
}

function readMessageValue(value: unknown, depth = 0): string[] {
    if (value == null || depth > MAX_MESSAGE_DEPTH) return [];
    if (typeof value === 'string') return value.trim() ? [value] : [];
    if (isMappingLike(value)) {
        const text = value['message'] != null ? value['message'] : value['code'];
        return readMessageValue(text, depth + 1);
    }
    if (Array.isArray(value)) {
        const messages: string[] = [];
        for (const item of value as unknown[]) messages.push(...readMessageValue(item, depth + 1));
        return messages;
    }
    const text = String(value);
    return text.trim() ? [text] : [];
}

function readErrorEntries(entries: unknown): string[] {
    if (isMappingLike(entries)) {
        const messages: string[] = [];
        for (const [fieldName, value] of Object.entries(entries)) {
            messages.push(...prefixField(fieldName, readMessageValue(value)));
        }
        return messages;
    }
    if (Array.isArray(entries)) {
        const messages: string[] = [];
        for (const entry of entries as unknown[]) {
            if (isMappingLike(entry)) {
                const text = entry['message'] != null ? entry['message'] : entry['code'];
                messages.push(...prefixField(entry['field'], readMessageValue(text)));
            } else {
                messages.push(...readMessageValue(entry));
            }
        }
        return messages;
    }
    if (typeof entries === 'string') return readMessageValue(entries);
    return [];
}

function prefixField(fieldName: unknown, messages: string[]): string[] {
    if (fieldName == null || !String(fieldName).trim()) return messages;
    return messages.map((message) => `${String(fieldName)}: ${message}`);
}

function capMessages(messages: string[]): string[] {
    if (messages.length <= MAX_REPORTED_MESSAGES) return messages;
    const remainder = messages.length - MAX_REPORTED_MESSAGES;
    return [...messages.slice(0, MAX_REPORTED_MESSAGES), `+${remainder} more problems`];
}
