/** Retry decisions and backoff timing. Pure - `Transport` owns the loop and the sleeping. */

import {SdkConfigError} from '../errors.js';

export const DEFAULT_MAX_ATTEMPTS = 1;

// The runtime authority behind the views below. Allow-lists: a verb never seen is neither safe nor idempotent.
const SAFE_METHOD_NAMES: readonly string[] = Object.freeze(['GET', 'HEAD', 'OPTIONS', 'TRACE']);
const IDEMPOTENT_METHOD_NAMES: readonly string[] = Object.freeze(['GET', 'HEAD', 'OPTIONS', 'TRACE', 'PUT', 'DELETE']);
const UNSAFE_METHOD_NAMES: readonly string[] = Object.freeze(['POST', 'PUT', 'PATCH', 'DELETE']);

/** An HTTP method token, per RFC 9110. A value that is not one is unsafe and not idempotent. */
const HTTP_METHOD_TOKEN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

function methodName(method: unknown): string | null {
    if (typeof method !== 'string') return null;
    const name = method.trim().toUpperCase();
    return HTTP_METHOD_TOKEN.test(name) ? name : null;
}

/** Whether a value is one RFC 9110 method token, as it stands: no trimming, no case folding. */
export function isHttpMethodToken(method: unknown): boolean {
    return typeof method === 'string' && HTTP_METHOD_TOKEN.test(method);
}

/** Statuses worth another attempt. `401` is absent: it is refresh-and-replayed a layer up. */
export const DEFAULT_RETRYABLE_HTTP_CODES: readonly number[] = Object.freeze([429, 500, 502, 503, 504]);

/** The methods this SDK treats as safe, as a read-only view over a private frozen array. */
export const SAFE_METHODS: ReadonlySet<string> = readOnlySet('SAFE_METHODS', SAFE_METHOD_NAMES, 'the safe-method set');

/** The write verbs this SDK names; absence from this set does not make a method safe. */
export const UNSAFE_METHODS: ReadonlySet<string> = readOnlySet(
    'UNSAFE_METHODS',
    UNSAFE_METHOD_NAMES,
    'the unsafe-method set',
);

/** The statuses retried on a state-changing method: none. A status says what the server answered, not what it did. */
export const DEFAULT_UNSAFE_RETRYABLE_HTTP_CODES: readonly number[] = Object.freeze([]);

/**
 * Error `kind` tags the transport classifies a failure with. `CONNECTION` is establishment only, `CONNECTION_RESET`
 * a socket that died after the request went out; the delivery-stage table sends the two opposite ways.
 */
export const TRANSPORT_ERROR_KINDS = Object.freeze({
    SSL: 'SSLError',
    CONNECT_TIMEOUT: 'ConnectTimeout',
    READ_TIMEOUT: 'ReadTimeout',
    CONNECTION: 'ConnectionError',
    CONNECTION_RESET: 'ConnectionResetError',
    TIMEOUT: 'Timeout',
    CHUNKED_ENCODING: 'ChunkedEncodingError',
    CONTENT_DECODING: 'ContentDecodingError',
    RESPONSE_TOO_LARGE: 'ResponseTooLarge',
} as const);
export type TransportErrorKind = (typeof TRANSPORT_ERROR_KINDS)[keyof typeof TRANSPORT_ERROR_KINDS];

/** How far a failed attempt got, which is what decides whether it may be sent again. */
export const DELIVERY_STAGE = Object.freeze({
    /** Nothing was delivered: the connection was never established. */
    NOT_SENT: 'notSent',
    /** The request was on its way out or already out, so the server may have acted on it. */
    SENT: 'sent',
    /** Repeating cannot help, whatever was delivered. */
    FATAL: 'fatal',
} as const);
export type DeliveryStage = (typeof DELIVERY_STAGE)[keyof typeof DELIVERY_STAGE];

/** Retry only what certainly did not arrive; an unlisted `kind` reads as `SENT`. Tabulated in docs/ARCHITECTURE.md. */
const DELIVERY_STAGE_BY_KIND: Readonly<Record<string, DeliveryStage>> = Object.freeze({
    [TRANSPORT_ERROR_KINDS.CONNECTION]: DELIVERY_STAGE.NOT_SENT,
    [TRANSPORT_ERROR_KINDS.CONNECT_TIMEOUT]: DELIVERY_STAGE.NOT_SENT,
    [TRANSPORT_ERROR_KINDS.READ_TIMEOUT]: DELIVERY_STAGE.SENT,
    [TRANSPORT_ERROR_KINDS.TIMEOUT]: DELIVERY_STAGE.SENT,
    [TRANSPORT_ERROR_KINDS.CONNECTION_RESET]: DELIVERY_STAGE.SENT,
    [TRANSPORT_ERROR_KINDS.CHUNKED_ENCODING]: DELIVERY_STAGE.SENT,
    [TRANSPORT_ERROR_KINDS.CONTENT_DECODING]: DELIVERY_STAGE.SENT,
    [TRANSPORT_ERROR_KINDS.SSL]: DELIVERY_STAGE.NOT_SENT,
    [TRANSPORT_ERROR_KINDS.RESPONSE_TOO_LARGE]: DELIVERY_STAGE.FATAL,
});

/** How far the attempt behind a failure got. */
export function deliveryStageOfKind(kind: unknown): DeliveryStage {
    return DELIVERY_STAGE_BY_KIND[kind as string] ?? DELIVERY_STAGE.SENT;
}

/** The methods a server must treat identically however many times they arrive. */
export const IDEMPOTENT_METHODS: ReadonlySet<string> = readOnlySet(
    'IDEMPOTENT_METHODS',
    IDEMPOTENT_METHOD_NAMES,
    'the idempotent-method set',
);

/** Excludes NaN, infinities and booleans. The same check is in `config/sdkConfig.ts`. */
function isRealNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value);
}

/** A `Set` whose named reads answer from a frozen snapshot, not its storage, which `Set.prototype.add.call` can reach. */
function readOnlySet<T>(name: string, snapshot: readonly T[], subject: string): ReadonlySet<T> {
    const members = new Set<T>(snapshot);
    const define = (key: PropertyKey, value: unknown): void => {
        Object.defineProperty(members, key, {value, writable: false, enumerable: false, configurable: false});
    };

    for (const mutator of ['add', 'delete', 'clear']) {
        define(mutator, function refuse(): never {
            throw new TypeError(`${name}: ${subject} cannot be changed`);
        });
    }
    define('has', (value: T) => snapshot.includes(value));
    define('forEach', (callback: (value: T, key: T, set: ReadonlySet<T>) => void, thisArg?: unknown) => {
        for (const value of snapshot) callback.call(thisArg, value, value, members);
    });
    for (const reader of ['values', 'keys', Symbol.iterator]) {
        define(reader, () => snapshot[Symbol.iterator]());
    }
    define('entries', () => snapshot.map((value) => [value, value] as [T, T])[Symbol.iterator]());
    Object.defineProperty(members, 'size', {
        get: () => snapshot.length,
        enumerable: false,
        configurable: false,
    });
    return Object.freeze(members);
}

/** The caller's status codes as a set that cannot be widened afterwards. */
function frozenStatusCodes(name: string, supplied: unknown, fallback: readonly number[]): ReadonlySet<number> {
    const source = supplied === undefined ? fallback : supplied;
    const iterable =
        source !== null &&
        typeof source !== 'string' &&
        typeof (source as {[Symbol.iterator]?: unknown} | undefined)?.[Symbol.iterator] === 'function';
    if (!iterable) {
        // A string would become a set of its digits and `null` an empty set.
        throw new SdkConfigError(`${name}: expected an iterable of HTTP status codes, got ${JSON.stringify(source)}`);
    }
    const snapshot = Object.freeze([...new Set(source as Iterable<unknown>)]);
    // Each value, not just the container: `'429'`, `4.29` or `NaN` would match no real status, retries silently off.
    for (const code of snapshot) {
        if (!Number.isInteger(code) || (code as number) < 100 || (code as number) > 599) {
            throw new SdkConfigError(
                `${name}: expected whole HTTP status codes between 100 and 599, got ${JSON.stringify(code) ?? String(code)}`,
            );
        }
    }
    return readOnlySet(name, snapshot as readonly number[], "a RetryPolicy's status codes");
}

/** Whether replaying this verb could change data twice; read from the private list, and anything unnamed is unsafe. */
export function isUnsafeMethod(method: unknown): boolean {
    const name = methodName(method);
    return name === null || !SAFE_METHOD_NAMES.includes(name);
}

/** Whether this verb may be resent after a failure that may already have arrived; unknown is not idempotent. */
export function isIdempotentMethod(method: unknown): boolean {
    const name = methodName(method);
    return name !== null && IDEMPOTENT_METHOD_NAMES.includes(name);
}

// Keeps the power finite rather than capping the delay: `2 ** 30` seconds is past any reachable backoffMaxSeconds.
const MAX_BACKOFF_EXPONENT = 30;

/** The delay-seconds form of `Retry-After`; the sign matters, `Date.parse` reads `'-3'`. */
const NUMERIC_RETRY_AFTER = /^[+-]?\d+(\.\d+)?$/;

/** `Retry-After` as numeric seconds, or an HTTP date as seconds from now; else null. */
export function parseRetryAfter(retryAfter: unknown, now: () => number = () => Date.now()): number | null {
    if (!retryAfter) return null;
    const value = String(retryAfter).trim();
    if (NUMERIC_RETRY_AFTER.test(value)) return Math.max(0, Number(value));
    const when = Date.parse(value);
    if (Number.isNaN(when)) return null;
    return Math.max(0, (when - now()) / 1000);
}

export interface RetryPolicyOptions {
    maxAttempts?: number | undefined;
    backoffSeconds?: number | undefined;
    backoffMaxSeconds?: number | undefined;
    retryableStatusCodes?: Iterable<number> | undefined;
    unsafeRetryableStatusCodes?: Iterable<number> | undefined;
}

/** The config fields a policy is built from. */
export interface RetrySettings {
    maxRetries: number;
    retryBackoffSeconds: number;
    retryBackoffMaxSeconds: number;
    retryableHttpCodes: Iterable<number>;
    unsafeRetryableHttpCodes?: Iterable<number> | undefined;
}

/** How many attempts to make, on what, and how long to wait between them. */
export class RetryPolicy {
    readonly maxAttempts: number;
    readonly backoffSeconds: number;
    readonly backoffMaxSeconds: number;
    readonly retryableStatusCodes: ReadonlySet<number>;
    readonly unsafeRetryableStatusCodes: ReadonlySet<number>;

    constructor(options: RetryPolicyOptions = {}) {
        // `=== undefined`, not `??`: a field that arrived as JSON `null` was supplied, so it is reported.
        this.maxAttempts = options.maxAttempts === undefined ? DEFAULT_MAX_ATTEMPTS : options.maxAttempts;
        this.backoffSeconds = options.backoffSeconds === undefined ? 0.5 : options.backoffSeconds;
        this.backoffMaxSeconds = options.backoffMaxSeconds === undefined ? 20.0 : options.backoffMaxSeconds;
        this.retryableStatusCodes = frozenStatusCodes(
            'retryableStatusCodes',
            options.retryableStatusCodes,
            DEFAULT_RETRYABLE_HTTP_CODES,
        );
        this.unsafeRetryableStatusCodes = frozenStatusCodes(
            'unsafeRetryableStatusCodes',
            options.unsafeRetryableStatusCodes,
            DEFAULT_UNSAFE_RETRYABLE_HTTP_CODES,
        );

        if (!Number.isInteger(this.maxAttempts) || this.maxAttempts < 1) {
            throw new SdkConfigError(
                `maxAttempts: must be at least 1 (1 disables retry), got ${JSON.stringify(this.maxAttempts)}`,
            );
        }
        for (const name of ['backoffSeconds', 'backoffMaxSeconds'] as const) {
            const value: unknown = this[name];
            if (!isRealNumber(value)) {
                throw new SdkConfigError(`${name}: expected a number of seconds, got ${JSON.stringify(value)}`);
            }
        }
        if (this.backoffSeconds < 0)
            throw new SdkConfigError(`backoffSeconds: must be >= 0, got ${this.backoffSeconds}`);
        if (this.backoffMaxSeconds < this.backoffSeconds) {
            throw new SdkConfigError(
                `backoffMaxSeconds: must be >= backoffSeconds, got ${this.backoffMaxSeconds} < ${this.backoffSeconds}`,
            );
        }
        Object.freeze(this);
    }

    /**
     * The policy a transport decides by: a {@link RetryPolicy} as it stands, else a plain object read once and
     * rebuilt, so a value changed mid-retry cannot change the call's limits.
     */
    static snapshotOf(supplied: unknown, config: RetrySettings): RetryPolicy {
        if (supplied === null || supplied === undefined) return RetryPolicy.fromConfig(config);
        if (supplied instanceof RetryPolicy) return supplied;
        if (typeof supplied !== 'object') {
            throw new SdkConfigError(
                `retryPolicy: expected a RetryPolicy or an object carrying its settings, got ${typeof supplied}`,
            );
        }
        const held = supplied as RetryPolicyOptions;
        return new RetryPolicy({
            maxAttempts: held.maxAttempts,
            backoffSeconds: held.backoffSeconds,
            backoffMaxSeconds: held.backoffMaxSeconds,
            retryableStatusCodes: held.retryableStatusCodes,
            unsafeRetryableStatusCodes: held.unsafeRetryableStatusCodes,
        });
    }

    /** Build a policy from an SdkConfig. */
    static fromConfig(config: RetrySettings): RetryPolicy {
        return new RetryPolicy({
            maxAttempts: config.maxRetries,
            backoffSeconds: config.retryBackoffSeconds,
            backoffMaxSeconds: config.retryBackoffMaxSeconds,
            retryableStatusCodes: config.retryableHttpCodes,
            unsafeRetryableStatusCodes: config.unsafeRetryableHttpCodes ?? DEFAULT_UNSAFE_RETRYABLE_HTTP_CODES,
        });
    }

    /**
     * Whether a status warrants another attempt: a safe method on the status alone, anything else only if listed
     * in `unsafeRetryableStatusCodes`. An explicitly passed `undefined` method counts as unsafe.
     */
    shouldRetryStatusCode(statusCode: number, ...methodArgs: unknown[]): boolean {
        const method = methodArgs.length === 0 ? 'GET' : methodArgs[0];
        if (!this.retryableStatusCodes.has(statusCode)) return false;
        if (isUnsafeMethod(method)) return this.unsafeRetryableStatusCodes.has(statusCode);
        return true;
    }

    /**
     * Whether a transport failure warrants another attempt: nothing delivered retries any method, possibly
     * delivered only an {@link IDEMPOTENT_METHODS} one.
     */
    shouldRetryAfterException(error: {kind?: unknown} | null | undefined, ...methodArgs: unknown[]): boolean {
        const method = methodArgs.length === 0 ? 'GET' : methodArgs[0];
        const stage = deliveryStageOfKind(error && error.kind);
        if (stage === DELIVERY_STAGE.FATAL) return false;
        if (stage === DELIVERY_STAGE.NOT_SENT) return true;
        return isIdempotentMethod(method);
    }

    /**
     * How long to wait before the next attempt: exponential with full jitter; a server's `Retry-After` wins,
     * capped at `backoffMaxSeconds`. `attempt` is the 1-based index of the attempt that just failed.
     */
    computeBackoffSeconds(
        attempt: number,
        options: {retryAfterHeader?: string | null | undefined; now?: () => number; random?: () => number} = {},
    ): number {
        const serverDelay = parseRetryAfter(options.retryAfterHeader, options.now);
        if (serverDelay !== null) return Math.min(serverDelay, this.backoffMaxSeconds);
        const exponent = Math.min(Math.max(0, attempt - 1), MAX_BACKOFF_EXPONENT);
        const window = Math.min(this.backoffSeconds * 2 ** exponent, this.backoffMaxSeconds);
        const random = options.random ?? Math.random;
        return random() * window;
    }
}
