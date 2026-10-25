/**
 * Immutable SDK behaviour settings. The one environment read is `EXSITED_RESPONSE_FORMAT`, once, at construction;
 * credentials always come from the caller, through `AuthConfig`.
 */

import {statSync} from 'node:fs';

import {AuthConfig, type AuthConfigInput} from './authConfig.js';
import {SdkConfigError, SdkUsageError} from '../errors.js';
import {
    DEFAULT_RETRYABLE_HTTP_CODES as RETRYABLE,
    DEFAULT_UNSAFE_RETRYABLE_HTTP_CODES as UNSAFE_RETRYABLE,
} from '../http/retryPolicy.js';
import {redactFields} from '../redaction.js';

// Kept in step with package.json by hand: a module built as both ESM and CJS has no one way to find its own
// package.json at runtime.
export const SDK_VERSION = '4.0.0';

/**
 * The API versions this SDK speaks: v4 alone. The list stays a list so a future version is an addition, and a
 * version with no resources behind it is refused rather than answered 404 on every path.
 */
export const API_VERSIONS = Object.freeze(['v4'] as const);
export type ApiVersion = (typeof API_VERSIONS)[number];
export const DEFAULT_API_VERSION: ApiVersion = 'v4';

/** Which API version the token endpoint lives under: a v4 client authenticates at `/api/v4/oauth2/token`. */
export const TOKEN_API_VERSION: Readonly<Record<ApiVersion, string>> = Object.freeze({v4: 'v4'});

export const DEFAULT_TIMEOUT_SECONDS = 30.0;
export const DEFAULT_CONNECT_TIMEOUT_SECONDS = 10.0;
export const DEFAULT_MAX_RETRIES = 1;
export const DEFAULT_RETRYABLE_HTTP_CODES: readonly number[] = Object.freeze([...RETRYABLE].sort((a, b) => a - b));
export const DEFAULT_UNSAFE_RETRYABLE_HTTP_CODES: readonly number[] = Object.freeze(
    [...UNSAFE_RETRYABLE].sort((a, b) => a - b),
);
export const DEFAULT_RETRY_BACKOFF_SECONDS = 0.5;
export const DEFAULT_RETRY_BACKOFF_MAX_SECONDS = 20.0;
export const DEFAULT_POOL_MAXSIZE = 10;

export const DEFAULT_MAX_RESPONSE_BYTES = 64 * 1024 * 1024;

/**
 * Ceiling on the encoded body one request puts on the wire, framing included: 1 GiB. Separate from
 * {@link DEFAULT_MAX_UPLOAD_BYTES}; building a body holds about twice this in memory.
 */
export const DEFAULT_MAX_REQUEST_BYTES = 1024 * 1024 * 1024;

export const DEFAULT_MAX_UPLOAD_BYTES = 1024 * 1024 * 1024;

export const DEFAULT_MAX_MULTIPART_OVERHEAD_BYTES = 16 * 1024 * 1024;

export const DEFAULT_MAX_CA_BUNDLE_BYTES = 8 * 1024 * 1024;

export const DEFAULT_LOG_LEVEL = 'WARNING';
export const DEFAULT_PRINT_FORMAT = 'pretty';
export const DEFAULT_USER_AGENT = `exsited-ts-sdk/${SDK_VERSION}`;

export const PRINT_FORMAT_PRETTY = 'pretty';
export const PRINT_FORMAT_COMPACT = 'compact';

/** Which form `response.data` presents; `response.map`, `.json` and `.dto` ignore it and are always there. */
export const ResponseFormat = Object.freeze({
    MAP: 'map',
    JSON: 'json',
    DTO: 'dto',
} as const);
export type ResponseFormat = (typeof ResponseFormat)[keyof typeof ResponseFormat];

/** The built-in default: the decoded body. */
export const DEFAULT_RESPONSE_FORMAT: ResponseFormat = ResponseFormat.MAP;

/** The lowest-priority source of `responseFormat` - below a client, below a call site. */
export const RESPONSE_FORMAT_ENV_VAR = 'EXSITED_RESPONSE_FORMAT';

export type LogLevelName = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
export type PrintFormat = 'pretty' | 'compact';

const VALID_LOG_LEVELS: readonly string[] = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'];
const VALID_PRINT_FORMATS: readonly string[] = [PRINT_FORMAT_PRETTY, PRINT_FORMAT_COMPACT];
export const VALID_RESPONSE_FORMATS: readonly ResponseFormat[] = Object.freeze(Object.values(ResponseFormat));
// Tested after `normaliseApiVersion` has supplied the `v`, so a bare `'4'` passes as `'v4'`.
const API_VERSION_PATTERN = /^v[1-9][0-9]*$/;
const MAX_HTTP_CODES = 500;

function bounded(value: unknown): string {
    let text: string;
    try {
        text = typeof value === 'string' ? JSON.stringify(value) : String(value);
    } catch {
        text = '<unrenderable>';
    }
    return text.length > 120 ? `${text.slice(0, 120)}...` : text;
}

const isText = (v: unknown): boolean => typeof v === 'string';
const isBoolean = (v: unknown): boolean => typeof v === 'boolean';
// Excludes NaN, infinities and booleans. The same check is in http/retryPolicy.ts.
const isRealNumber = (v: unknown): boolean => typeof v === 'number' && Number.isFinite(v);
const isWholeNumber = (v: unknown): boolean => Number.isInteger(v);
const isCodeSequence = (v: unknown): boolean => Array.isArray(v);
const isOptionalPath = (v: unknown): boolean => v == null || typeof v === 'string';
const isOptionalText = (v: unknown): boolean => v == null || typeof v === 'string';
const isOptionalFunction = (v: unknown): boolean => v == null || typeof v === 'function';

const FIELD_TYPES: ReadonlyArray<[string, (v: unknown) => boolean, string]> = [
    ['apiVersion', isText, "a version string like 'v4' or '4'"],
    ['timeoutSeconds', isRealNumber, 'a number of seconds'],
    ['connectTimeoutSeconds', isRealNumber, 'a number of seconds'],
    ['maxRetries', isWholeNumber, 'an integer'],
    ['retryableHttpCodes', isCodeSequence, 'an iterable of HTTP status codes'],
    ['unsafeRetryableHttpCodes', isCodeSequence, 'an iterable of HTTP status codes'],
    ['retryBackoffSeconds', isRealNumber, 'a number of seconds'],
    ['retryBackoffMaxSeconds', isRealNumber, 'a number of seconds'],
    ['verifySsl', isBoolean, 'true or false'],
    ['caBundle', isOptionalPath, 'a path or null'],
    ['proxyUrl', isOptionalText, 'a proxy URL or null'],
    ['poolMaxsize', isWholeNumber, 'an integer'],
    ['maxResponseBytes', isWholeNumber, 'an integer number of bytes'],
    ['maxRequestBytes', isWholeNumber, 'an integer number of bytes'],
    ['maxUploadBytes', isWholeNumber, 'an integer number of bytes'],
    ['maxMultipartOverheadBytes', isWholeNumber, 'an integer number of bytes'],
    ['maxCaBundleBytes', isWholeNumber, 'an integer number of bytes'],
    ['raiseOnError', isBoolean, 'true or false'],
    ['responseFormat', isText, 'a string'],
    ['userAgent', isText, 'a string'],
    ['logLevel', isText, 'a string'],
    ['logBodies', isBoolean, 'true or false'],
    ['logFile', isOptionalPath, 'a path or null'],
    ['printApiInfo', isBoolean, 'true or false'],
    ['printRequestPayload', isBoolean, 'true or false'],
    ['printResponseBody', isBoolean, 'true or false'],
    ['printHeaders', isBoolean, 'true or false'],
    ['printCurl', isBoolean, 'true or false'],
    ['printOnlyOnError', isBoolean, 'true or false'],
    ['printFormat', isText, 'a string'],
    ['printColor', isBoolean, 'true or false'],
    ['printMaxChars', isWholeNumber, 'an integer'],
    ['fetchImpl', isOptionalFunction, 'a fetch function'],
];

/** Every `SdkConfig` behaviour field, in declaration order. */
const CONFIG_FIELDS = [
    'apiVersion',
    'timeoutSeconds',
    'connectTimeoutSeconds',
    'maxRetries',
    'retryableHttpCodes',
    'unsafeRetryableHttpCodes',
    'retryBackoffSeconds',
    'retryBackoffMaxSeconds',
    'verifySsl',
    'caBundle',
    'proxyUrl',
    'poolMaxsize',
    'maxResponseBytes',
    'maxRequestBytes',
    'maxUploadBytes',
    'maxMultipartOverheadBytes',
    'maxCaBundleBytes',
    'defaultHeaders',
    'raiseOnError',
    'responseFormat',
    'userAgent',
    'logLevel',
    'logBodies',
    'logFile',
    'printApiInfo',
    'printRequestPayload',
    'printResponseBody',
    'printHeaders',
    'printCurl',
    'printOnlyOnError',
    'printFormat',
    'printColor',
    'printMaxChars',
    'dispatcher',
    'fetchImpl',
] as const;

/** Every name a caller may pass as an override; `auth` is handled apart from the rest. */
const KNOWN_CONFIG_FIELDS: readonly string[] = ['auth', ...CONFIG_FIELDS];

/** The header shapes `defaultHeaders` accepts: an object, `[name, value]` pairs, or a JSON object as text. */
export type HeaderInput =
    Readonly<Record<string, string | number | boolean>> | ReadonlyArray<readonly [string, string]> | string;

/** Every behaviour setting, all optional, as `SdkConfig`, `withOverrides` and `buildClient` accept them. */
export interface SdkOptions {
    /** Version in the path. `'V4'`, `'4'` and `' 4 '` all store `'v4'`, the one version this SDK speaks. */
    apiVersion?: string;
    /** Read deadline and hard ceiling on one attempt, in seconds. Default `30`. */
    timeoutSeconds?: number;
    /** Deadline for opening the connection, in seconds. Default `10`. */
    connectTimeoutSeconds?: number;
    /** Total attempts, not extra ones: `1` means no retry. Default `1`. */
    maxRetries?: number;
    /** Statuses retried on a safe method. Default `[429, 500, 502, 503, 504]`. */
    retryableHttpCodes?: Iterable<number>;
    /** Statuses retried on a write too; none proves a write did not apply. Default `[]`. */
    unsafeRetryableHttpCodes?: Iterable<number>;
    /** Base backoff before the jitter is applied. Default `0.5`. */
    retryBackoffSeconds?: number;
    /** Ceiling on any single backoff, and on a server's `Retry-After`. Default `20`. */
    retryBackoffMaxSeconds?: number;
    /** Verify the server certificate. Turning this off warns. Default `true`. */
    verifySsl?: boolean;
    /** Path to a CA bundle, for a private or self-signed chain. Default `null`. */
    caBundle?: string | null;
    /** `http://` or `https://` proxy for every request. Default `null`. */
    proxyUrl?: string | null;
    /** Sockets kept open for reuse, not a ceiling on concurrency. Default `10`. */
    poolMaxsize?: number;
    /** Ceiling on one buffered response body, in bytes. Default `64 * 1024 * 1024`. */
    maxResponseBytes?: number;
    /** Ceiling on the encoded request body, framing included. Default `1024 * 1024 * 1024`. */
    maxRequestBytes?: number;
    /** Ceiling on the source material one body is built from. Default `1024 * 1024 * 1024`. */
    maxUploadBytes?: number;
    /** Ceiling on multipart framing and part headers. Default `16 * 1024 * 1024`. */
    maxMultipartOverheadBytes?: number;
    /** Ceiling on the CA bundle read at construction. Default `8 * 1024 * 1024`. */
    maxCaBundleBytes?: number;
    /** Headers added to every request. */
    defaultHeaders?: HeaderInput | null;
    /** Throw on a failed call instead of returning it. Default `false`. */
    raiseOnError?: boolean;
    /** Which form `response.data` presents; else `EXSITED_RESPONSE_FORMAT`, else `'map'`. */
    responseFormat?: ResponseFormat | string | null;
    /** The `User-Agent` sent. Default `exsited-ts-sdk/<version>`. */
    userAgent?: string;
    /** Lowest severity emitted. Default `'WARNING'`. */
    logLevel?: LogLevelName | string;
    /** Include request and response bodies in DEBUG records, redacted. Default `false`. */
    logBodies?: boolean;
    /** Also append records to this file. Default `null`. */
    logFile?: string | null;
    /** Print method, URL, status, attempt and timing for each call. Default `false`. */
    printApiInfo?: boolean;
    /** Print the request body that was sent, redacted. Default `false`. */
    printRequestPayload?: boolean;
    /** Print the response body, with bytes summarised. Default `false`. */
    printResponseBody?: boolean;
    /** Print request and response headers, redacted. Default `false`. */
    printHeaders?: boolean;
    /** Print a runnable `curl` reproduction, secrets removed. Default `false`. */
    printCurl?: boolean;
    /** Print only the calls that failed. Default `false`. */
    printOnlyOnError?: boolean;
    /** Boxed output, or one line per call. Default `'pretty'`. */
    printFormat?: PrintFormat | string;
    /** ANSI colour, honouring NO_COLOR and whether stdout is a TTY. Default `false`. */
    printColor?: boolean;
    /** Truncate printed bodies to this many characters; `0` is unlimited. Default `0`. */
    printMaxChars?: number;
    /** An undici `Dispatcher` handed to an injected `fetchImpl` on every request. Default `null`. */
    dispatcher?: unknown;
    /** A `fetch` to send through instead of the SDK's own node:http backend; the test seam. Default `null`. */
    fetchImpl?: typeof fetch | null;
}

type ConfigField = (typeof CONFIG_FIELDS)[number];

const DEFAULTS: Readonly<Record<ConfigField, unknown>> = {
    apiVersion: DEFAULT_API_VERSION,
    timeoutSeconds: DEFAULT_TIMEOUT_SECONDS,
    connectTimeoutSeconds: DEFAULT_CONNECT_TIMEOUT_SECONDS,
    maxRetries: DEFAULT_MAX_RETRIES,
    retryableHttpCodes: DEFAULT_RETRYABLE_HTTP_CODES,
    unsafeRetryableHttpCodes: DEFAULT_UNSAFE_RETRYABLE_HTTP_CODES,
    retryBackoffSeconds: DEFAULT_RETRY_BACKOFF_SECONDS,
    retryBackoffMaxSeconds: DEFAULT_RETRY_BACKOFF_MAX_SECONDS,
    verifySsl: true,
    caBundle: null,
    proxyUrl: null,
    poolMaxsize: DEFAULT_POOL_MAXSIZE,
    maxResponseBytes: DEFAULT_MAX_RESPONSE_BYTES,
    maxRequestBytes: DEFAULT_MAX_REQUEST_BYTES,
    maxUploadBytes: DEFAULT_MAX_UPLOAD_BYTES,
    maxMultipartOverheadBytes: DEFAULT_MAX_MULTIPART_OVERHEAD_BYTES,
    maxCaBundleBytes: DEFAULT_MAX_CA_BUNDLE_BYTES,
    defaultHeaders: [],
    raiseOnError: false,
    responseFormat: DEFAULT_RESPONSE_FORMAT,
    userAgent: DEFAULT_USER_AGENT,
    logLevel: DEFAULT_LOG_LEVEL,
    logBodies: false,
    logFile: null,
    printApiInfo: false,
    printRequestPayload: false,
    printResponseBody: false,
    printHeaders: false,
    printCurl: false,
    printOnlyOnError: false,
    printFormat: DEFAULT_PRINT_FORMAT,
    printColor: false,
    printMaxChars: 0,
    dispatcher: null,
    fetchImpl: null,
};

/** Settle the version on `vN` - `'V4'`, `' 4 '` and `'4'` become `'v4'`; a non-string is returned unchanged. */
function normaliseApiVersion(raw: unknown): unknown {
    if (raw != null && typeof raw !== 'string') return raw;
    const value = String(raw || '')
        .trim()
        .toLowerCase();
    return value && !value.startsWith('v') ? `v${value}` : value;
}

/**
 * The `responseFormat` the environment offers, read once per config and ranked below a client and a call site;
 * an unrecognised value is returned unchanged so validation refuses it by name.
 */
function environmentResponseFormat(): {value: unknown; source: string | null} {
    const raw = typeof process !== 'undefined' && process.env ? process.env[RESPONSE_FORMAT_ENV_VAR] : undefined;
    if (raw == null || !String(raw).trim()) return {value: DEFAULT_RESPONSE_FORMAT, source: null};
    return {value: raw, source: RESPONSE_FORMAT_ENV_VAR};
}

function normaliseCase(raw: unknown, transform: (text: string) => string): unknown {
    if (raw != null && typeof raw !== 'string') return raw;
    return transform(String(raw || '').trim());
}

function normaliseCodes(raw: unknown): unknown {
    if (typeof raw === 'string' || !isIterable(raw)) return raw;
    const out: unknown[] = [];
    for (const item of raw) {
        out.push(item);
        if (out.length > MAX_HTTP_CODES) break;
    }
    return out;
}

function isIterable(v: unknown): v is Iterable<unknown> {
    return v != null && typeof (v as {[Symbol.iterator]?: unknown})[Symbol.iterator] === 'function';
}

/** RFC 9110 token, non-empty. Read only through {@link unsendableHeaderReason}. */
const HEADER_NAME_PATTERN = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;

/** An RFC 9110 header value: internal tabs allowed, no leading or trailing whitespace. */
const HEADER_VALUE_PATTERN = /^(?:[\x21-\x7e](?:[\x20-\x7e\x09]*[\x21-\x7e])?)?$/;

/**
 * Why a header pair cannot be sent, or `null` - the one header grammar, applied at construction, before the
 * token grant and before I/O. Controls, DEL and bytes >= 0x80 are refused; the value is never quoted back.
 */
export function unsendableHeaderReason(name: unknown, valueText: string | null): string | null {
    if (valueText !== null && HEADER_NAME_PATTERN.test(String(name)) && HEADER_VALUE_PATTERN.test(valueText)) {
        return null;
    }
    return (
        `header ${JSON.stringify(String(name))}: not something that can be sent - a name or value carrying a ` +
        'carriage return, a newline, a NUL, another control character, a DEL, a leading or trailing space or tab, ' +
        'a colon in the name, a byte outside printable ASCII, or a value that is neither text nor bytes. An ' +
        'internal tab is allowed. The value is not shown: it may be a credential'
    );
}

function headerPair(name: unknown, value: unknown): [string, string] {
    if (!(typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')) {
        throw new SdkConfigError(
            `defaultHeaders: ${bounded(String(name))} holds ${bounded(value)}, which is not a header value; headers must be flat`,
        );
    }
    const nameText = String(name);
    const valueText = String(value);
    const unsendable = unsendableHeaderReason(nameText, valueText);
    if (unsendable) throw new SdkConfigError(`defaultHeaders: ${unsendable}`);
    return [nameText, valueText];
}

function normaliseHeaders(raw: unknown): Array<[string, string]> {
    if (!raw) return [];
    if (Array.isArray(raw)) {
        const pairs: Array<[string, string]> = [];
        for (const entry of raw as unknown[]) {
            if (typeof entry === 'string' || !Array.isArray(entry) || entry.length !== 2) {
                throw new SdkConfigError(`defaultHeaders: expected (name, value) pairs, got ${bounded(entry)}`);
            }
            pairs.push(headerPair(entry[0], entry[1]));
        }
        return pairs;
    }
    if (typeof raw === 'string') {
        let decoded: unknown;
        try {
            decoded = JSON.parse(raw);
        } catch (error) {
            throw new SdkConfigError(
                `defaultHeaders: expected an object or a JSON object, got ${bounded(raw)} (${error instanceof Error ? error.message : String(error)})`,
            );
        }
        if (decoded === null || typeof decoded !== 'object' || Array.isArray(decoded)) {
            throw new SdkConfigError('defaultHeaders: JSON must be an object');
        }
        return Object.entries(decoded as Record<string, unknown>).map(([k, v]) => headerPair(k, v));
    }
    if (typeof raw === 'object') {
        return Object.entries(raw as Record<string, unknown>).map(([k, v]) => headerPair(k, v));
    }
    throw new SdkConfigError(
        `defaultHeaders: expected an object, a JSON object or (name, value) pairs, got ${bounded(raw)}`,
    );
}

function problemsWithTheProxyUrl(proxyUrl: string): string[] {
    let parsed: URL;
    try {
        parsed = new URL(proxyUrl);
    } catch {
        // No '; ' in one problem, as that joins the batch; the parser's text is dropped as it may quote the value.
        return ['proxyUrl: is not a URL - the value is not shown: it may carry a password'];
    }
    const scheme = parsed.protocol.replace(/:$/, '');
    if ((scheme !== 'http' && scheme !== 'https') || !parsed.host) {
        return [
            'proxyUrl: must start with http:// or https:// and include a host - the value is not shown: it may carry a password',
        ];
    }
    return [];
}

/** The refusals of a log path: a blank one, and one that would break the one-record-per-line file. */
function problemsWithTheLogFile(logFile: unknown): string[] {
    if (typeof logFile !== 'string') return [];
    if (logFile.trim() === '') return ['logFile: must be a non-blank path, or null to write no file'];
    if (/[\r\n\u0000]/.test(logFile)) return ['logFile: must not contain a line break or a NUL'];
    return [];
}

/** Whether a value could be an undici `Dispatcher`: `dispatch` is the one method its fetch calls. */
function isDispatcherLike(value: unknown): boolean {
    if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return false;
    return typeof (value as {dispatch?: unknown}).dispatch === 'function';
}

/**
 * Frozen SDK configuration.
 * @example
 * const config = new SdkConfig(auth, {
 *     raiseOnError: true,      // throw instead of returning a failed response
 *     maxRetries: 3,
 *     printApiInfo: true,      // log method, URL, status, timing
 * });
 * const staging = config.withOverrides({auth: stagingAuth}); // swap credentials only
 */
export class SdkConfig {
    readonly auth: AuthConfig;
    readonly apiVersion: ApiVersion;
    readonly timeoutSeconds: number;
    readonly connectTimeoutSeconds: number;
    readonly maxRetries: number;
    readonly retryableHttpCodes: readonly number[];
    readonly unsafeRetryableHttpCodes: readonly number[];
    readonly retryBackoffSeconds: number;
    readonly retryBackoffMaxSeconds: number;
    readonly verifySsl: boolean;
    readonly caBundle: string | null;
    readonly proxyUrl: string | null;
    readonly poolMaxsize: number;
    readonly maxResponseBytes: number;
    readonly maxRequestBytes: number;
    readonly maxUploadBytes: number;
    readonly maxMultipartOverheadBytes: number;
    readonly maxCaBundleBytes: number;
    readonly defaultHeaders: ReadonlyArray<readonly [string, string]>;
    readonly raiseOnError: boolean;
    readonly responseFormat: ResponseFormat;
    readonly userAgent: string;
    readonly logLevel: LogLevelName;
    readonly logBodies: boolean;
    readonly logFile: string | null;
    readonly printApiInfo: boolean;
    readonly printRequestPayload: boolean;
    readonly printResponseBody: boolean;
    readonly printHeaders: boolean;
    readonly printCurl: boolean;
    readonly printOnlyOnError: boolean;
    readonly printFormat: PrintFormat;
    readonly printColor: boolean;
    readonly printMaxChars: number;
    /** An undici `Dispatcher` handed to an injected `fetchImpl`: the seam for TLS through undici. */
    readonly dispatcher: unknown;
    /** The injected `fetch`, or `null` for the SDK's own node:http backend. */
    readonly #fetchImpl: typeof fetch | null;

    constructor(auth: AuthConfig, overrides: SdkOptions = {}) {
        const values: Record<string, unknown> = {};
        rejectUnknownConfigFields(overrides);
        // An explicit `auth` override beats the positional one, so `withOverrides({auth})` swaps credentials only.
        const suppliedAuth: unknown = 'auth' in overrides ? (overrides as {auth?: unknown}).auth : auth;
        for (const name of CONFIG_FIELDS) {
            values[name] = name in overrides ? (overrides as Record<string, unknown>)[name] : DEFAULTS[name];
        }

        // The environment is read only when no code set a format, once per config.
        const suppliedFormat = overrides.responseFormat;
        const resolvedFormat =
            suppliedFormat == null ? environmentResponseFormat() : {value: suppliedFormat, source: null};
        values['responseFormat'] = resolvedFormat.value;

        // A normaliser returns a wrong-typed value unchanged for validation to report.
        values['apiVersion'] = normaliseApiVersion(values['apiVersion']);
        values['responseFormat'] = normaliseCase(values['responseFormat'], (s) => s.toLowerCase());
        values['logLevel'] = normaliseCase(values['logLevel'], (s) => s.toUpperCase());
        values['printFormat'] = normaliseCase(values['printFormat'], (s) => s.toLowerCase());
        values['retryableHttpCodes'] = normaliseCodes(values['retryableHttpCodes']);
        values['unsafeRetryableHttpCodes'] = normaliseCodes(values['unsafeRetryableHttpCodes']);

        let headerProblem: string | null = null;
        try {
            values['defaultHeaders'] = normaliseHeaders(values['defaultHeaders']);
        } catch (error) {
            headerProblem = error instanceof Error ? error.message : String(error);
            values['defaultHeaders'] = [];
        }

        validate(suppliedAuth, values, headerProblem, resolvedFormat.source);

        // `Object.freeze` is shallow: without this, `retryableHttpCodes.push(999)` would bypass validation.
        const headers = values['defaultHeaders'] as Array<[string, string]>;
        for (const pair of headers) Object.freeze(pair);

        this.auth = suppliedAuth as AuthConfig;
        this.apiVersion = values['apiVersion'] as ApiVersion;
        this.timeoutSeconds = values['timeoutSeconds'] as number;
        this.connectTimeoutSeconds = values['connectTimeoutSeconds'] as number;
        this.maxRetries = values['maxRetries'] as number;
        this.retryableHttpCodes = Object.freeze([...(values['retryableHttpCodes'] as number[])]);
        this.unsafeRetryableHttpCodes = Object.freeze([...(values['unsafeRetryableHttpCodes'] as number[])]);
        this.retryBackoffSeconds = values['retryBackoffSeconds'] as number;
        this.retryBackoffMaxSeconds = values['retryBackoffMaxSeconds'] as number;
        this.verifySsl = values['verifySsl'] as boolean;
        this.caBundle = (values['caBundle'] as string | null | undefined) ?? null;
        this.proxyUrl = (values['proxyUrl'] as string | null | undefined) ?? null;
        this.poolMaxsize = values['poolMaxsize'] as number;
        this.maxResponseBytes = values['maxResponseBytes'] as number;
        this.maxRequestBytes = values['maxRequestBytes'] as number;
        this.maxUploadBytes = values['maxUploadBytes'] as number;
        this.maxMultipartOverheadBytes = values['maxMultipartOverheadBytes'] as number;
        this.maxCaBundleBytes = values['maxCaBundleBytes'] as number;
        this.defaultHeaders = Object.freeze(headers);
        this.raiseOnError = values['raiseOnError'] as boolean;
        this.responseFormat = values['responseFormat'] as ResponseFormat;
        this.userAgent = values['userAgent'] as string;
        this.logLevel = values['logLevel'] as LogLevelName;
        this.logBodies = values['logBodies'] as boolean;
        this.logFile = (values['logFile'] as string | null | undefined) ?? null;
        this.printApiInfo = values['printApiInfo'] as boolean;
        this.printRequestPayload = values['printRequestPayload'] as boolean;
        this.printResponseBody = values['printResponseBody'] as boolean;
        this.printHeaders = values['printHeaders'] as boolean;
        this.printCurl = values['printCurl'] as boolean;
        this.printOnlyOnError = values['printOnlyOnError'] as boolean;
        this.printFormat = values['printFormat'] as PrintFormat;
        this.printColor = values['printColor'] as boolean;
        this.printMaxChars = values['printMaxChars'] as number;
        // Held, not copied: a dispatcher is a live object with sockets in it.
        this.dispatcher = values['dispatcher'] ?? null;
        this.#fetchImpl = (values['fetchImpl'] as typeof fetch | null | undefined) ?? null;
        Object.freeze(this);
    }

    get baseUrl(): string {
        return this.auth.baseUrl;
    }
    get clientId(): string {
        return this.auth.clientId;
    }
    get clientSecret(): string {
        return this.auth.clientSecret;
    }
    get redirectUri(): string {
        return this.auth.redirectUri;
    }
    get clientName(): string {
        return this.auth.clientName;
    }
    get grantType(): string {
        return this.auth.grantType;
    }
    get tokenCachePath(): string | null | undefined {
        return this.auth.tokenCachePath;
    }

    /** The `(connect, read)` deadline pair, in seconds. */
    get timeout(): [number, number] {
        return [this.connectTimeoutSeconds, this.timeoutSeconds];
    }

    /** `defaultHeaders` as a fresh object. */
    get defaultHeadersDict(): Record<string, string> {
        return Object.fromEntries(this.defaultHeaders);
    }

    /** The path the token is minted at, under {@link TOKEN_API_VERSION} for {@link apiVersion}. */
    get tokenPath(): string {
        return `/api/${TOKEN_API_VERSION[this.apiVersion]}/oauth2/token`;
    }

    /** The read deadline in milliseconds, as the token grant reads it. */
    get timeoutMs(): number {
        return this.timeoutSeconds * 1000;
    }

    /** The `fetch` the token grant is sent through: the injected one, else the global. */
    get fetchImpl(): typeof fetch {
        return this.#fetchImpl ?? globalThis.fetch;
    }

    /** Whether a caller injected `fetchImpl`, so the transport sends through it rather than its own backend. */
    get injectedFetch(): typeof fetch | null {
        return this.#fetchImpl;
    }

    /**
     * The config for one entry of a credentials list: an `SdkConfig`, an `AuthConfig`, or a plain object of
     * config fields. `instance` selects by position or `clientName`; the rest override the chosen entry.
     */
    static fromCredentials(
        credentials: Iterable<unknown>,
        options: SdkOptions & {instance?: number | string | null; auth?: AuthConfig} = {},
    ): SdkConfig {
        const {instance = null, ...overrides} = options;
        const chosen = selectCredentials(credentials, instance);
        if (chosen instanceof SdkConfig) {
            return Object.keys(overrides).length ? chosen.withOverrides(overrides) : chosen;
        }
        if (chosen instanceof AuthConfig) return new SdkConfig(chosen, overrides);
        if (chosen === null || typeof chosen !== 'object') {
            throw new SdkConfigError(
                `credentials[${instance === null ? 0 : JSON.stringify(instance)}]: expected an SdkConfig, an AuthConfig or a plain object of config fields, got ${chosen === null ? 'null' : typeof chosen}`,
            );
        }
        const block: Record<string, unknown> = {...(chosen as Record<string, unknown>)};
        const blockAuth = block['auth'];
        delete block['auth'];
        const authValues: Record<string, unknown> = {};
        for (const name of AUTH_FIELDS) {
            if (name in block) {
                authValues[name] = block[name];
                delete block[name];
            }
        }
        const settings: Record<string, unknown> = {...block, ...overrides};
        rejectUnknownConfigFields(settings);
        // An `auth` override beats the block's own and is passed to the constructor positionally.
        const suppliedAuth = 'auth' in settings ? settings['auth'] : blockAuth;
        delete settings['auth'];
        if (suppliedAuth == null) {
            return new SdkConfig(new AuthConfig(authValues as unknown as AuthConfigInput), settings as SdkOptions);
        }
        if (Object.keys(authValues).length) {
            throw new SdkConfigError(
                `auth: an AuthConfig was supplied alongside the credential field(s) ${Object.keys(authValues).sort().join(', ')}; pass one or the other`,
            );
        }
        return new SdkConfig(suppliedAuth as AuthConfig, settings as SdkOptions);
    }

    /** A new config with these settings replaced; everything else, credentials included, is kept. */
    withOverrides(changes: SdkOptions & {auth?: AuthConfig} = {}): SdkConfig {
        rejectUnknownConfigFields(changes);
        const merged: Record<string, unknown> = {};
        for (const name of CONFIG_FIELDS) merged[name] = name === 'fetchImpl' ? this.#fetchImpl : this[name];
        Object.assign(merged, changes);
        const nextAuth = 'auth' in changes ? (changes.auth as AuthConfig) : this.auth;
        delete merged['auth'];
        return new SdkConfig(nextAuth, merged as SdkOptions);
    }

    /** One line, with every secret-named field redacted. */
    toString(): string {
        const shown = redactFields(this, KNOWN_CONFIG_FIELDS);
        return `SdkConfig(${shown.join(', ')})`;
    }

    [Symbol.for('nodejs.util.inspect.custom')](): string {
        return this.toString();
    }
}

function validate(
    auth: unknown,
    values: Record<string, unknown>,
    headerProblem: string | null,
    responseFormatSource: string | null,
): void {
    const problems: string[] = [];
    if (headerProblem) problems.push(headerProblem);

    if (!(auth instanceof AuthConfig)) {
        problems.push(`auth: expected an AuthConfig, got ${auth === null ? 'null' : typeof auth}`);
    }

    const mistyped = new Set<string>();
    for (const [name, isValid, expected] of FIELD_TYPES) {
        const value = values[name];
        if (!isValid(value)) {
            mistyped.add(name);
            problems.push(`${name}: expected ${expected}, got ${bounded(value)}`);
        }
    }

    const number = (name: string): number => values[name] as number;

    if (!mistyped.has('apiVersion')) {
        const apiVersion = values['apiVersion'] as string;
        if (!API_VERSION_PATTERN.test(apiVersion)) {
            // Reported on the normalised value, so the message names both accepted spellings.
            problems.push(`apiVersion: expected something like 'v4' or '4', got ${bounded(apiVersion)}`);
        } else if (!(API_VERSIONS as readonly string[]).includes(apiVersion)) {
            problems.push(`apiVersion: expected one of ${API_VERSIONS.join(', ')}, got ${bounded(apiVersion)}`);
        }
    }
    if (!mistyped.has('maxRetries') && number('maxRetries') < 1) {
        problems.push(`maxRetries: must be at least 1 (1 disables retry), got ${number('maxRetries')}`);
    }
    if (!mistyped.has('timeoutSeconds') && number('timeoutSeconds') <= 0) {
        problems.push('timeoutSeconds: must be > 0');
    }
    if (!mistyped.has('connectTimeoutSeconds') && number('connectTimeoutSeconds') <= 0) {
        problems.push('connectTimeoutSeconds: must be > 0');
    }
    if (!mistyped.has('retryBackoffSeconds') && number('retryBackoffSeconds') < 0) {
        problems.push('retryBackoffSeconds: must be >= 0');
    }
    if (
        !mistyped.has('retryBackoffSeconds') &&
        !mistyped.has('retryBackoffMaxSeconds') &&
        number('retryBackoffMaxSeconds') < number('retryBackoffSeconds')
    ) {
        problems.push('retryBackoffMaxSeconds: must be >= retryBackoffSeconds');
    }
    if (!mistyped.has('poolMaxsize') && number('poolMaxsize') < 1) {
        problems.push('poolMaxsize: must be at least 1');
    }
    for (const name of [
        'maxResponseBytes',
        'maxRequestBytes',
        'maxUploadBytes',
        'maxMultipartOverheadBytes',
        'maxCaBundleBytes',
    ]) {
        if (!mistyped.has(name) && number(name) < 1) {
            problems.push(`${name}: must be at least 1 byte, got ${number(name)}`);
        }
    }

    for (const name of ['retryableHttpCodes', 'unsafeRetryableHttpCodes']) {
        if (mistyped.has(name)) continue;
        const codes = values[name] as unknown[];
        if (codes.length > MAX_HTTP_CODES) {
            problems.push(
                `${name}: at most ${MAX_HTTP_CODES} status codes (100-599 is every code there is), got more than that`,
            );
            continue;
        }
        for (const code of codes) {
            if (!isWholeNumber(code)) {
                problems.push(`${name}: expected HTTP status codes, got ${bounded(code)}`);
            } else if (!((code as number) >= 100 && (code as number) <= 599)) {
                problems.push(`${name}: ${String(code)} is not an HTTP status code`);
            }
        }
    }

    if (!mistyped.has('logLevel') && !VALID_LOG_LEVELS.includes(values['logLevel'] as string)) {
        problems.push(`logLevel: expected one of ${VALID_LOG_LEVELS.join(', ')}, got ${bounded(values['logLevel'])}`);
    }
    if (!mistyped.has('printFormat') && !VALID_PRINT_FORMATS.includes(values['printFormat'] as string)) {
        problems.push(
            `printFormat: expected one of ${VALID_PRINT_FORMATS.join(', ')}, got ${bounded(values['printFormat'])}`,
        );
    }
    if (!mistyped.has('printMaxChars') && number('printMaxChars') < 0) {
        problems.push('printMaxChars: must be >= 0 (0 = unlimited)');
    }
    // Refused, never a silent fall back to 'map'; the source is named because the environment is not in the diff.
    if (
        !mistyped.has('responseFormat') &&
        !(VALID_RESPONSE_FORMATS as readonly string[]).includes(values['responseFormat'] as string)
    ) {
        const from = responseFormatSource ? ` (from ${responseFormatSource})` : '';
        problems.push(
            `responseFormat: expected one of ${VALID_RESPONSE_FORMATS.join(', ')}, got ${bounded(values['responseFormat'])}${from}`,
        );
    }

    if (!mistyped.has('proxyUrl') && values['proxyUrl']) {
        problems.push(...problemsWithTheProxyUrl(values['proxyUrl'] as string));
    }

    if (!mistyped.has('caBundle') && values['caBundle']) {
        if (!values['verifySsl']) {
            problems.push(
                'caBundle and verifySsl=false are contradictory: one supplies a trust store, the other disables verification',
            );
        }
        let isFile = false;
        try {
            isFile = statSync(values['caBundle'] as string).isFile();
        } catch {
            isFile = false;
        }
        // The path is not quoted: it carries the account name and deployment layout, and this refusal is logged.
        if (!isFile) problems.push('caBundle: the path it names is not a readable file');
    }

    if (!mistyped.has('logFile')) problems.push(...problemsWithTheLogFile(values['logFile']));

    // Checked here rather than at the first request, where undici answers only `TypeError: fetch failed`.
    const dispatcher = values['dispatcher'];
    if (dispatcher !== undefined && dispatcher !== null && !isDispatcherLike(dispatcher)) {
        problems.push(
            `dispatcher: expected an undici Dispatcher - an object with a dispatch() method - got ${typeof dispatcher}`,
        );
    }

    if (problems.length) throw new SdkConfigError(problems.join('; '));
}

/** The `AuthConfig` fields a plain credentials block may carry beside its behaviour settings. */
const AUTH_FIELDS = Object.freeze([
    'baseUrl',
    'clientId',
    'clientSecret',
    'redirectUri',
    'clientName',
    'grantType',
    'tokenCachePath',
] as const);

/**
 * One entry out of a credentials list: the first when `instance` is null, a position (negative counts from the
 * end), or the entry whose `clientName` matches.
 */
export function selectCredentials(credentials: Iterable<unknown>, instance: number | string | null = null): unknown {
    const blocks = readCredentialBlocks(credentials);
    if (!blocks.length) throw new SdkUsageError('no credentials were supplied');
    if (instance === null || instance === undefined) return blocks[0];

    if (typeof instance === 'number' && Number.isInteger(instance)) {
        const length = blocks.length;
        if (instance < -length || instance >= length) {
            throw new SdkUsageError(`no credentials at index ${instance}; ${length} supplied (0-${length - 1})`);
        }
        return blocks[((instance % length) + length) % length];
    }

    const matched: number[] = [];
    blocks.forEach((block, index) => {
        if (readClientName(block) === instance) matched.push(index);
    });
    if (matched.length > 1) {
        throw new SdkUsageError(
            `instance ${JSON.stringify(instance)} is defined more than once, at index ${matched.join(' and ')}; clientName has to identify one entry`,
        );
    }
    if (matched.length) return blocks[matched[0] as number];

    const available = blocks.map((block, index) => readClientName(block) || `<index ${index}>`).join(', ');
    throw new SdkUsageError(`unknown instance ${JSON.stringify(instance)}; available: ${available}`);
}

function typeNameOf(value: unknown): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'Array';
    if (typeof value === 'object') {
        const named = (value as {constructor?: {name?: unknown}}).constructor;
        return (named && typeof named.name === 'string' && named.name) || 'object';
    }
    return typeof value;
}

function readCredentialBlocks(credentials: unknown): unknown[] {
    if (
        typeof credentials === 'string' ||
        (credentials !== null && typeof credentials === 'object' && !isIterable(credentials))
    ) {
        throw new SdkUsageError(
            `credentials: expected a list of credential blocks, not a single ${typeNameOf(credentials)}; ` +
                'wrap the single block in a list: [block]',
        );
    }
    if (!isIterable(credentials)) {
        throw new SdkUsageError(
            `credentials: expected a list of credential blocks; ${typeNameOf(credentials)} is not iterable`,
        );
    }
    return [...credentials];
}

/** An entry's `clientName`, from a config or a plain object; `null` when unnamed. */
export function readClientName(block: unknown): string | null {
    if (block instanceof SdkConfig || block instanceof AuthConfig) return block.clientName;
    if (block && typeof block === 'object') {
        const value = (block as Record<string, unknown>)['clientName'];
        return value ? String(value) : null;
    }
    return null;
}

function rejectUnknownConfigFields(values: object): void {
    const unknown = Object.keys(values).filter((key) => !KNOWN_CONFIG_FIELDS.includes(key));
    if (unknown.length) throw new SdkConfigError(`unknown config field(s): ${unknown.sort().join(', ')}`);
}
