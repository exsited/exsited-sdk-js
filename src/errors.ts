/** Exception hierarchy and the dependency leaf. Errors derive from {@link SdkError}; the two warnings do not. */

/** C0, DEL, C1 and the two Unicode line separators - what could drive a terminal. */
const CONTROL_CHARACTERS = new RegExp('[\\u0000-\\u001f\\u007f-\\u009f\\u2028\\u2029]', 'g');

const UNRENDERABLE = '<unrenderable value>';

function safeStr(value: unknown): string {
    try {
        if (typeof value === 'string') return value;
        return String(value);
    } catch {
        try {
            const text = JSON.stringify(value);
            // `JSON.stringify` answers undefined for a function; callers call a string method.
            return typeof text === 'string' ? text : UNRENDERABLE;
        } catch {
            return UNRENDERABLE;
        }
    }
}

/** The five C0 characters with a familiar spelling. */
const SHORT_ESCAPES: Record<number, string> = {
    8: '\\b',
    9: '\\t',
    10: '\\n',
    12: '\\f',
    13: '\\r',
};

function escapeControlCharacter(ch: string): string {
    const code = ch.charCodeAt(0);
    const short = SHORT_ESCAPES[code];
    if (short) return short;
    if (code <= 0xff) return `\\x${code.toString(16).padStart(2, '0')}`;
    return `\\u${code.toString(16).padStart(4, '0')}`;
}

function flatten(value: unknown): string {
    return safeStr(value).replace(CONTROL_CHARACTERS, escapeControlCharacter);
}

function safeJson(value: unknown): string {
    const open = new WeakSet<object>();
    try {
        const text = JSON.stringify(value, (_key, item: unknown) => {
            if (typeof item === 'bigint') return `${item}`;
            if (item !== null && typeof item === 'object') {
                if (open.has(item)) return '<circular>';
                open.add(item);
            }
            return item;
        });
        return typeof text === 'string' ? text : safeStr(value);
    } catch {
        return UNRENDERABLE;
    }
}

const REDIRECT_STATUS_CODES = [301, 302, 303, 307, 308];

const REDIRECT_HINT =
    'the API redirected and the SDK does not follow one - read the Location ' +
    'header off the response and decide whether to re-issue the call against it. ' +
    "The copy on this exception's responseHeaders has its secret query " +
    'parameters redacted, so it is for reading and not for re-issuing: call again ' +
    'with raiseOnError off if you need the response itself';

/** Prototype-less: a literal answers a function for a `statusCode` of `'toString'`. */
const HINTS_BY_STATUS: Record<number, string> = Object.assign(Object.create(null) as Record<number, string>, {
    400:
        'the API rejected the request itself - check the payload shape and the ' +
        "query parameter names against the endpoint's docstring",
    401:
        'credentials were rejected, or the token expired and could not be renewed ' +
        '- check clientId, clientSecret and redirectUri',
    403: 'authenticated, but this client is not allowed to do that',
    404: 'no such record - check the id you passed actually exists',
    405: 'wrong HTTP method for this path',
    409: 'conflicts with existing data, or the record is locked',
    429: 'rate limited - slow down, or raise maxRetries so the SDK waits and retries for you',
    500:
        'the server failed. Retrying may help on a read; by default the SDK will not retry ' +
        'a write on a 500, because it cannot tell whether the server committed',
    502: 'a gateway between you and the API failed',
    503: 'the API is unavailable, usually briefly',
    504: 'a gateway timed out waiting for the API',
});
for (const status of REDIRECT_STATUS_CODES) HINTS_BY_STATUS[status] = REDIRECT_HINT;

const LOCATION_HEADER = 'location';

/** The Node hook `util.inspect`, and therefore `console.error`, calls to render a value. */
const INSPECT = Symbol.for('nodejs.util.inspect.custom');

/** Install a property the default renderings (inspect, uncaught, JSON, spread) cannot see; still reachable by name. */
function defineWithheld(target: object, name: string, value: unknown): void {
    Object.defineProperty(target, name, {value, enumerable: false, writable: true, configurable: true});
}

function stackFrames(stack: unknown): string {
    if (typeof stack !== 'string' || !stack) return '';
    const frames = stack.split('\n').filter((line) => /^\s+at\s/.test(line));
    return frames.join('\n');
}

function redirectTarget(headers: Record<string, string>): string | null {
    for (const [name, value] of Object.entries(headers)) {
        if (String(name).toLowerCase() === LOCATION_HEADER) return value;
    }
    return null;
}

/** The request fields the renderings below read, whatever built the record. */
interface RenderedRequest {
    httpMethod?: unknown;
    endpoint?: unknown;
    url?: unknown;
    queryParams?: unknown;
    attemptCount?: unknown;
    maxAttempts?: unknown;
    elapsedSeconds?: unknown;
}

/** The endpoint template an info names, or `null`; never the resolved path, whose values identify a person. */
function endpointOf(info: RenderedRequest | null): string | null {
    const endpoint = info == null ? null : info.endpoint;
    return typeof endpoint === 'string' && endpoint ? endpoint : null;
}

/** Name a failure's cause by class and `errno` code; its `message` is left out, as it names hosts and documents. */
export function describeCause(error: unknown): string {
    if (error === null || error === undefined) return 'none';
    if (typeof error !== 'object') return typeof error;
    const held = error as {name?: unknown; code?: unknown; constructor?: {name?: unknown}};
    let name: unknown = 'error';
    let code: string | null = null;
    try {
        name = held.name || held.constructor?.name || 'error';
        code = typeof held.code === 'string' && held.code ? held.code : null;
    } catch {
        // A hostile accessor: the class alone still says what family this belongs to.
    }
    return code ? `${flatten(name)} ${flatten(code)}` : flatten(name);
}

/** A field-level failure, as the v4 error envelope reports it. */
export interface FieldError {
    field: string;
    code?: string;
    message?: string;
    doc_url?: string;
}

export interface SdkErrorOptions {
    statusCode?: number | null | undefined;
    errorType?: string | null | undefined;
    rawResponse?: unknown;
    responseHeaders?: Readonly<Record<string, string>> | null | undefined;
    requestInfo?: unknown;
    /** The original failure, read with {@link SdkError.getCause}. */
    cause?: unknown;
    /** Values the refusal refers to but must not print. */
    details?: Record<string, unknown> | undefined;
    /** The v4 envelope's machine-readable `code`, such as `'validation_error'`. */
    errorCode?: string | null | undefined;
    /** The v4 envelope's `request_id`: the handle tying this failure to the server's record of it. */
    requestId?: string | null | undefined;
    /** The v4 envelope's `doc_url`. */
    docUrl?: string | null | undefined;
    /** The v4 envelope's `errors[]` entries that name a field. */
    fieldErrors?: readonly FieldError[] | undefined;
}

/**
 * Base class for every SDK error, carrying the failing response already redacted. Default renderings are
 * structural: values are withheld as non-enumerable or private, and `explain({includeSensitive: true})` shows them.
 */
export class SdkError extends Error {
    readonly statusCode: number | null;
    readonly errorType: string | null;
    /** The cause's class and `errno` code, such as `'Error ECONNREFUSED'`; `'none'` without a cause. */
    readonly causeCategory: string;
    /** The v4 envelope's machine-readable code, or `null`. Structural, so default renderings may show it. */
    readonly errorCode: string | null;
    /** The v4 envelope's request id, or `null`. Quote it when reporting a problem. */
    readonly requestId: string | null;
    /** The v4 envelope's documentation link, or `null`. */
    readonly docUrl: string | null;
    /** The failing body, already redacted. Withheld from default renderings. */
    declare readonly rawResponse: unknown;
    /** The response headers, already redacted. Withheld from default renderings. */
    declare readonly responseHeaders: Record<string, string>;
    /** The request that failed. Withheld from default renderings. */
    declare readonly requestInfo: unknown;
    /** Values the message refers to but will not print; withheld and frozen. */
    declare readonly details: Readonly<Record<string, unknown>>;
    /** The per-field failures of the v4 envelope, which quote the application's text; withheld. */
    declare readonly fieldErrors: readonly FieldError[];

    /** The application's field-level messages; private because Node prints an `errors` array property. */
    #errors: string[] = [];

    /** The failure this error replaced; private because Node prints a `cause`, which may name a host. */
    #cause: unknown = null;

    constructor(message: string, options: SdkErrorOptions = {}) {
        // `cause` is not forwarded: `Error` would install it as an own property and Node prints it.
        super(message);
        this.name = 'SdkError';
        this.message = message;
        // Structural, and therefore enumerable: all a default rendering may add to the message.
        this.statusCode = options.statusCode ?? null;
        this.errorType = options.errorType ?? null;
        this.#cause = options.cause ?? null;
        this.causeCategory = describeCause(this.#cause);
        this.errorCode = options.errorCode ?? null;
        this.requestId = options.requestId ?? null;
        this.docUrl = options.docUrl ?? null;
        // Withheld from every default traversal, and reachable by name.
        defineWithheld(this, 'rawResponse', options.rawResponse ?? null);
        defineWithheld(this, 'responseHeaders', {...(options.responseHeaders || {})});
        defineWithheld(this, 'requestInfo', options.requestInfo ?? null);
        defineWithheld(this, 'details', Object.freeze({...(options.details || {})}));
        defineWithheld(this, 'fieldErrors', Object.freeze([...(options.fieldErrors ?? [])]));
        // Without this, `instanceof` fails for subclasses when a consumer compiles to ES5.
        Object.setPrototypeOf(this, new.target.prototype);
    }

    /** The original failure, or `null`; unsafe to print, as {@link SdkError.causeCategory} is the safe form. */
    getCause(): unknown {
        return this.#cause;
    }

    /** Append one field-level message from the response body. */
    addError(errorMessage: string): this {
        this.#errors.push(errorMessage);
        return this;
    }

    /** What `console.error(error)` prints: {@link SdkError.explain} and the stack, not every own property. */
    [INSPECT](): string {
        try {
            const frames = stackFrames(this.stack);
            return frames ? `${this.explain()}\n${frames}` : this.explain();
        } catch {
            return `${this.name}: ${UNRENDERABLE}`;
        }
    }

    /** A copy of the field-level messages the API supplied. */
    getErrorMessages(): string[] {
        return [...this.#errors];
    }

    /** A suggestion keyed off the status code, or `null` when there is none. */
    getHint(): string | null {
        if (this.statusCode == null) return null;
        return HINTS_BY_STATUS[this.statusCode] ?? null;
    }

    /** The diagnostic as one printable block that cannot raise; `{includeSensitive: true}` adds the values. */
    explain(options: {includeSensitive?: boolean} = {}): string {
        const sensitive = options.includeSensitive === true;
        const lines = [this.toString()];

        const info = this.requestInfo as RenderedRequest | null;
        if (info != null) {
            const params = info.queryParams;
            const parameterCount = params && typeof params === 'object' ? Object.keys(params).length : 0;
            if (parameterCount) {
                lines.push(`  params  : ${sensitive ? safeJson(params) : `${parameterCount} parameter(s)`}`);
            }
            if (info.attemptCount && info.maxAttempts) {
                lines.push(`  attempt : ${safeStr(info.attemptCount)}/${safeStr(info.maxAttempts)}`);
            }
            if (info.elapsedSeconds != null) lines.push(`  elapsed : ${safeStr(info.elapsedSeconds)}s`);
            if (sensitive && info.url) lines.push(`  url     : ${flatten(info.url)}`);
        }

        // The v4 envelope's identifiers name the failure, not the record, so they are shown by default.
        if (this.errorCode) lines.push(`  code    : ${flatten(this.errorCode)}`);
        if (this.requestId) lines.push(`  request : ${flatten(this.requestId)}`);
        if (this.docUrl) lines.push(`  docs    : ${flatten(this.docUrl)}`);

        const location = redirectTarget(this.responseHeaders);
        if (location) lines.push(`  location: ${sensitive ? flatten(location) : 'withheld'}`);

        const messages = this.getErrorMessages();
        if (messages.length) {
            if (sensitive) {
                lines.push('  reported:');
                for (const message of messages) lines.push(`    - ${flatten(message)}`);
            } else {
                lines.push(`  reported: ${messages.length} message(s)`);
            }
        }

        if (this.causeCategory && this.causeCategory !== 'none') {
            // The cause's message only on request: it names the address or path it was about.
            const cause = this.getCause() as {message?: unknown} | null;
            const shown = sensitive && cause ? `${this.causeCategory}: ${flatten(cause.message ?? cause)}` : null;
            lines.push(`  cause   : ${shown ?? `${this.causeCategory} (getCause() for the original)`}`);
        }

        const detailNames = Object.keys(this.details || {});
        if (detailNames.length) {
            lines.push(
                `  details : ${
                    sensitive
                        ? safeJson(this.details)
                        : `${detailNames.sort().join(', ')} - read error.details for the values`
                }`,
            );
        }

        const hint = this.getHint();
        if (hint) lines.push(`  hint    : ${hint}`);

        if (this.rawResponse != null) {
            // JSON rather than `String()`: a character count over `[object Object]` says nothing.
            const body = flatten(safeJson(this.rawResponse));
            if (sensitive) {
                lines.push(
                    `  body    : ${body.length > 500 ? `${body.slice(0, 500)}... +${body.length - 500} chars` : body}`,
                );
            } else {
                lines.push(`  body    : ${body.length} char(s)`);
            }
        }

        if (!sensitive) lines.push('  detail  : explain({includeSensitive: true}) renders the values withheld above');

        return lines.join('\n');
    }

    /** One structural line: class, status, category, method, endpoint template, attempts and `message`. */
    override toString(): string {
        const parts = [this.name];
        if (this.statusCode) {
            parts.push(this.errorType ? `${this.statusCode} ${flatten(this.errorType)}` : String(this.statusCode));
        } else if (this.errorType) {
            parts.push(flatten(this.errorType));
        }
        const info = this.requestInfo as RenderedRequest | null;
        const endpoint = endpointOf(info);
        if (info != null && info.httpMethod && endpoint) parts.push(`${flatten(info.httpMethod)} ${flatten(endpoint)}`);
        if (info != null && info.attemptCount && info.maxAttempts) {
            parts.push(`attempt ${safeStr(info.attemptCount)}/${safeStr(info.maxAttempts)}`);
        }
        parts.push(flatten(this.message));
        return parts.join(' · ');
    }
}

/** A setting is wrong. Thrown at construction, before any I/O, listing every problem. */
export class SdkConfigError extends SdkError {
    constructor(message: string, options?: SdkErrorOptions) {
        super(message, options);
        this.name = 'SdkConfigError';
    }
}

/** The call itself is wrong, and no request was sent: `missing path params: account_id`. */
export class SdkUsageError extends SdkError {
    constructor(message: string, options?: SdkErrorOptions) {
        super(message, options);
        this.name = 'SdkUsageError';
    }
}

/** No such property on a bound resource, usually a misspelt endpoint; suggests the closest real name. */
export class SdkAttributeError extends SdkUsageError {
    constructor(message: string, options?: SdkErrorOptions) {
        super(message, options);
        this.name = 'SdkAttributeError';
    }
}

/**
 * The token cache file is present and cannot be used. Kept apart from an absent cache, since treating a corrupt
 * file as empty would rebuild it and drop every other credential's entry.
 */
export class SdkTokenCacheError extends SdkError {
    constructor(message: string, options?: SdkErrorOptions) {
        super(message, options);
        this.name = 'SdkTokenCacheError';
    }
}

/** A second name for the token cache refusal; the same class, so either name catches it. */
export {SdkTokenCacheError as TokenCacheError};

/**
 * The cross-process lock over the token cache could not be taken. Thrown rather than running the guarded section
 * anyway; the token layer catches it, so a refusal costs caching, never the call.
 */
export class SdkTokenLockError extends SdkError {
    constructor(message: string, options?: SdkErrorOptions) {
        super(message, options);
        this.name = 'SdkTokenLockError';
    }
}

/**
 * Authentication failed. A grant that issues nothing usable always raises; a `401` or `403` on a call
 * becomes this through `raiseForStatus()`.
 */
export class SdkAuthError extends SdkError {
    constructor(message: string, options?: SdkErrorOptions) {
        super(message, options);
        this.name = 'SdkAuthError';
    }
}

/**
 * A minted token could not be cached: a warning, since the call succeeds and only the next process re-mints.
 * A custom store's `TypeError` is raised instead, as a bug.
 */
export class TokenCacheWriteWarning extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TokenCacheWriteWarning';
    }
}

/** Certificate verification is off: an `http://` base URL, or `verifySsl: false`. */
export class InsecureTransportWarning extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InsecureTransportWarning';
    }
}
