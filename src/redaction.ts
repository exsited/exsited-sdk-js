/** Secret handling: the one place that decides what counts as a secret. Imports nothing from the package. */

export const REDACTED = '***';

/** What replaces a structure nested deeper than {@link MAX_REDACTION_DEPTH}. */
export const TOO_DEEP = '<...>';

export const CIRCULAR = '<circular>';

/** What replaces a value this module could not read - a report that reading threw. */
const UNREADABLE = '<unreadable>';

type Container = Record<PropertyKey, unknown>;

function readProperty(container: unknown, key: PropertyKey): unknown {
    try {
        return (container as Container)[key];
    } catch {
        return UNREADABLE;
    }
}

function ownKeys(container: object): string[] {
    try {
        // Object.keys, unlike Object.entries, invokes no getter.
        return Object.keys(container);
    } catch {
        return [];
    }
}

function mapEntries(map: Map<unknown, unknown>): Array<[unknown, unknown]> {
    try {
        return [...map.entries()];
    } catch {
        return [];
    }
}

/** The `(name, value)` pairs of a `Map` or `Headers`, or `null` so the caller reads properties instead. */
function pairIterableEntries(container: unknown): Array<[unknown, unknown]> | null {
    if (container instanceof Map) return mapEntries(container);
    if (Array.isArray(container) || typeof container === 'string') return null;
    try {
        const iterator = (container as {[Symbol.iterator]?: unknown})[Symbol.iterator];
        if (typeof iterator !== 'function') return null;
        return [...(container as Iterable<unknown>)].filter(
            (entry): entry is [unknown, unknown] => Array.isArray(entry) && entry.length === 2,
        );
    } catch {
        return [];
    }
}

/** How deep {@link redactValue} walks before writing {@link TOO_DEEP} instead. */
export const MAX_REDACTION_DEPTH = 64;

/** A key is a secret when its name **contains** one of these, separators and case ignored. */
export const SENSITIVE_KEY_MARKERS: readonly string[] = Object.freeze([
    'secret',
    'password',
    'passphrase',
    'passwd',
    'pwd',
    'token',
    'bearer',
    'jwt',
    'authorization',
    'authstring',
    'apikey',
    'assertion',
    'credential',
    'verifier',
    'cookie',
    'session',
    'signature',
    'privatekey',
]);

/** Trailing words that mean the field *describes* a secret rather than being one. */
const NON_SECRET_TAIL_WORDS = new Set([
    'amount',
    'at',
    'consent',
    'count',
    'duration',
    // `customer_password_expired` is a boolean flag about a password, not a password.
    'expired',
    'level',
    'path',
    'policy',
    'remaining',
    'status',
    'type',
]);

/** Leading words that make the field a boolean *about* a secret. */
const NON_SECRET_LEAD_WORDS = new Set(['has', 'is', 'was']);

/** Splits a name at punctuation and at camel-case humps. */
const KEY_WORD_BOUNDARY = /[^A-Za-z0-9]+|(?<=[a-z0-9])(?=[A-Z])/;

function keyWords(key: unknown): string[] {
    return String(key)
        .split(KEY_WORD_BOUNDARY)
        .filter((word) => word)
        .map((word) => word.toLowerCase());
}

/** The markers as one separator-free word each, so the scan is a plain substring test. */
const NORMALISED_MARKERS = [...new Set(SENSITIVE_KEY_MARKERS.map((m) => keyWords(m).join('')))];

/** Whether a key's name means its value must not be shown: true for `'X-Api-Key'` and `'api_key'`, false for `'page'`. */
export function shouldRedact(key: string): boolean {
    const words = keyWords(key);
    if (
        words.length &&
        (NON_SECRET_LEAD_WORDS.has(words[0] as string) || NON_SECRET_TAIL_WORDS.has(words[words.length - 1] as string))
    ) {
        return false;
    }
    const normalised = words.join('');
    return NORMALISED_MARKERS.some((marker) => normalised.includes(marker));
}

/** A prototype-less accumulator, so `__proto__` is recorded as data; {@link sealed} restores the prototype. */
function openObject(): Record<string, unknown> {
    return Object.create(null) as Record<string, unknown>;
}

/** Finish an accumulator: an ordinary prototype, frozen; an own `__proto__` entry stays data. */
function sealed<T extends object>(out: T): Readonly<T> {
    return Object.freeze(Object.setPrototypeOf(out, Object.prototype) as T);
}

function isMapping(value: unknown): boolean {
    if (value === null || typeof value !== 'object') return false;
    if (Array.isArray(value)) return false;
    if (value instanceof Map) return true;
    if (ArrayBuffer.isView(value)) return false;
    if (value instanceof Date) return false;
    const proto: unknown = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

/**
 * Snapshot a value for display with secret-looking entries replaced by {@link REDACTED}; the original is untouched.
 * The snapshot is deep and frozen; anything not JSON-shaped is summarised as `<Type size>`, never stringified.
 */
export function redactValue(value: unknown): unknown {
    return redact(value, 0, new Set());
}

function typeName(value: unknown): string {
    try {
        const name: unknown = (value as {constructor?: {name?: unknown}} | null)?.constructor?.name;
        return typeof name === 'string' && name ? name : 'object';
    } catch {
        return 'object';
    }
}

/** Name a value this module will not reproduce by its structural lengths only; no content, and no `toString`. */
function summariseOpaque(value: unknown): string {
    if (typeof value === 'function') return '<function>';
    if (typeof value === 'symbol') return '<symbol>';
    if (typeof value === 'bigint') return '<bigint>';
    if (ArrayBuffer.isView(value)) return `<${typeName(value)} ${value.byteLength} bytes>`;
    if (value instanceof ArrayBuffer) return `<ArrayBuffer ${value.byteLength} bytes>`;
    if (value instanceof Set) return `<Set ${value.size} entries>`;
    return `<${typeName(value)}>`;
}

/** The display name of one `Map` key without running its `toString`; a non-primitive key is named by type and index. */
function mapKeyName(key: unknown, out: Record<string, unknown>): string {
    let name: string;
    if (typeof key === 'string') name = key;
    else if (key === null) name = 'null';
    else if (key === undefined) name = 'undefined';
    else if (typeof key === 'number' || typeof key === 'boolean' || typeof key === 'bigint') name = `${key}`;
    else name = summariseOpaque(key);
    if (!Object.prototype.hasOwnProperty.call(out, name)) return name;
    let index = 2;
    while (Object.prototype.hasOwnProperty.call(out, `${name} #${index}`)) index += 1;
    return `${name} #${index}`;
}

function redact(value: unknown, depth: number, seen: Set<object>): unknown {
    const mapping = isMapping(value);
    if (mapping || Array.isArray(value)) {
        if (depth >= MAX_REDACTION_DEPTH) return TOO_DEEP;
        const container = value as object;
        if (seen.has(container)) return CIRCULAR;
        seen.add(container);
        try {
            const out = openObject();
            if (mapping) {
                if (value instanceof Map) {
                    for (const [key, item] of mapEntries(value)) {
                        const name = mapKeyName(key, out);
                        out[name] = shouldRedact(name) ? REDACTED : redact(item, depth + 1, seen);
                    }
                    return sealed(out);
                }
                for (const key of ownKeys(container)) {
                    // Name judged first, so a getter behind a secret key is not invoked.
                    out[key] = shouldRedact(key) ? REDACTED : redact(readProperty(value, key), depth + 1, seen);
                }
                return sealed(out);
            }
            const items: unknown[] = [];
            const length = Number(readProperty(value, 'length')) || 0;
            for (let index = 0; index < length; index += 1) {
                items.push(redactEntry(readProperty(value, index), depth + 1, seen));
            }
            return Object.freeze(items);
        } finally {
            seen.delete(container);
        }
    }
    if (typeof value === 'string') {
        return redactUrls(redactJsonText(value, depth, seen));
    }
    if (value === null || value === undefined || typeof value === 'number' || typeof value === 'boolean') {
        return value;
    }
    return summariseOpaque(value);
}

function redactEntry(entry: unknown, depth: number, seen: Set<object>): unknown {
    if (Array.isArray(entry) && entry.length === 2 && typeof entry[0] === 'string' && shouldRedact(entry[0])) {
        return [entry[0], REDACTED];
    }
    return redact(entry, depth, seen);
}

/** Redact a JSON document that arrived as text; one that will not parse is withheld and named by size. */
function redactJsonText(text: string, depth: number, seen: Set<object>): string {
    const trimmed = text.replace(/^\s+/, '');
    if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return text;
    let parsed: unknown;
    try {
        parsed = JSON.parse(text);
    } catch {
        return `<unparsed ${trimmed.startsWith('{') ? 'JSON object' : 'JSON array'} text ${text.length} chars>`;
    }
    const redacted = redact(parsed, depth + 1, seen);
    if (JSON.stringify(redacted) === JSON.stringify(parsed)) return text;
    return JSON.stringify(redacted);
}

/** Redact a flat mapping such as headers into a frozen copy; a `Map` or `Headers` is read by iteration. */
export function redactMapping(
    headers: Record<string, unknown> | Map<unknown, unknown> | Headers | null | undefined,
): Readonly<Record<string, string>> {
    if (!headers) return Object.freeze({});
    const out = openObject();
    const pairs = pairIterableEntries(headers);
    if (pairs !== null) {
        for (const [key, value] of pairs) {
            out[String(key)] = shouldRedact(String(key)) ? REDACTED : redactUrls(value);
        }
        return sealed(out) as Readonly<Record<string, string>>;
    }
    for (const key of ownKeys(headers)) {
        // Name first, so a secret-named header's getter is never invoked.
        out[key] = shouldRedact(key) ? REDACTED : redactUrls(readProperty(headers, key));
    }
    return sealed(out) as Readonly<Record<string, string>>;
}

/** A run of characters that could be a URL inside a longer value. */
const URL_RUN = /[A-Za-z][A-Za-z0-9+.-]*:\/\/[^\s<>"']*/g;

/** A schemeless `/path?query` or `/path#fragment` run. */
const PATH_QUERY_RUN = /\/[^\s<>"'?#]*[?#][^\s<>"']+/g;

/**
 * Redact every URL and schemeless `path?query` in free text: `?access_token=abc123` becomes `?access_token=***`.
 * A text that is itself a JSON document is redacted as one first, as a lower layer's message often quotes a body.
 */
export function redactText(value: string): string {
    const document = redactJsonText(value, 0, new Set());
    const cleaned = document.replace(URL_RUN, (match) => redactOneUrl(match));
    return cleaned.replace(PATH_QUERY_RUN, (match) => redactOneUrl(match));
}

function redactUrls(value: unknown): unknown {
    if (typeof value !== 'string') return value;
    const cleaned = value.replace(URL_RUN, (match) => redactOneUrl(match));
    return cleaned.replace(PATH_QUERY_RUN, (match) => redactOneUrl(match));
}

function redactOneUrl(url: string): string {
    const hash = url.indexOf('#');
    const fragment = hash >= 0 ? url.slice(hash + 1) : '';
    const beforeFragment = hash >= 0 ? url.slice(0, hash) : url;
    const q = beforeFragment.indexOf('?');
    const query = q >= 0 ? beforeFragment.slice(q + 1) : '';
    const base = q >= 0 ? beforeFragment.slice(0, q) : beforeFragment;

    let newBase = base;
    let authorityChanged = false;
    const m = base.match(/^([A-Za-z][A-Za-z0-9+.-]*:\/\/)([^/]*)(.*)$/s);
    if (m) {
        const authority = m[2] as string;
        const redactedAuthority = redactUserinfo(authority);
        authorityChanged = redactedAuthority !== authority;
        newBase = (m[1] as string) + redactedAuthority + (m[3] as string);
    }
    const newQuery = redactQueryString(query);
    const newFragment = redactQueryString(fragment);
    if (!authorityChanged && newQuery === query && newFragment === fragment) return url;
    let out = newBase;
    if (q >= 0) out += `?${newQuery}`;
    if (hash >= 0) out += `#${newFragment}`;
    return out;
}

/** Replace an embedded password, keeping the user visible. */
function redactUserinfo(authority: string): string {
    const at = authority.lastIndexOf('@');
    if (at < 0) return authority;
    const userinfo = authority.slice(0, at);
    const host = authority.slice(at + 1);
    if (!userinfo.includes(':')) return authority;
    const user = userinfo.slice(0, userinfo.indexOf(':'));
    return `${user}:${REDACTED}@${host}`;
}

/** Decode a query-string name, where `+` means a space. */
function decodeQueryName(name: string): string {
    try {
        return decodeURIComponent(name.replace(/\+/g, ' '));
    } catch {
        return name;
    }
}

/** Replace the value of every secret-named parameter, leaving the rest exact. */
function redactQueryString(query: string): string {
    if (!query) return query;
    const rewritten: string[] = [];
    let matched = false;
    for (const chunk of query.split('&')) {
        const eq = chunk.indexOf('=');
        if (eq >= 0 && shouldRedact(decodeQueryName(chunk.slice(0, eq)))) {
            rewritten.push(`${chunk.slice(0, eq)}=${REDACTED}`);
            matched = true;
        } else {
            rewritten.push(chunk);
        }
    }
    return matched ? rewritten.join('&') : query;
}

/** Render `name=value` pairs for a config class's `toString`, secret-named fields redacted. */
export function redactFields(instance: unknown, fieldNames: Iterable<string>): string[] {
    const shown: string[] = [];
    for (const name of fieldNames) {
        // Read defensively: `toString` must not be brought down by its own subject.
        let value = instance == null ? undefined : readProperty(instance, name);
        if (value && shouldRedact(name)) {
            value = REDACTED;
        } else {
            value = redactValue(value);
        }
        shown.push(`${name}=${renderFieldValue(value)}`);
    }
    return shown;
}

/** Render one already-redacted field value as JSON. */
function renderFieldValue(value: unknown): string {
    try {
        return JSON.stringify(value) ?? 'undefined';
    } catch {
        return UNREADABLE;
    }
}
