/**
 * Header names, which HTTP treats as case insensitive and a JavaScript object
 * does not.
 *
 * In a plain object `Authorization` and `authorization` are two keys, and
 * `fetch` fills a `Headers` from a record by appending each entry, so the two
 * reach the server as one field joined with a comma: `Basic abc, Bearer tok`,
 * which no server can act on.
 */

import {SdkUsageError} from '../errors.js';

/**
 * The characters RFC 9110 section 5.6.2 allows in a token, which is what a
 * header field name is.
 *
 * Written out rather than assembled from `\w`, which in a Unicode-aware pattern
 * would accept a Cyrillic lookalike. The same set the method check uses, for the
 * same reason: a field name is a token and nothing else.
 */
const FIELD_NAME_CHARACTERS = new Set("!#$%&'*+-.^_`|~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

/** CR, LF and NUL, as code points, so this source carries none of them itself. */
const FORBIDDEN_VALUE_CODES = new Set([13, 10, 0]);

/** Whether `name` is an RFC 9110 header field name and not something else. */
export function isHttpFieldName(name: unknown): boolean {
    if (typeof name !== 'string' || name === '') return false;
    for (const character of name) {
        if (!FIELD_NAME_CHARACTERS.has(character)) return false;
    }
    return true;
}

/**
 * Merge header records so that one field name is one header, whatever its
 * spelling, with the last writer winning.
 *
 * Later sources override earlier ones, and the override replaces the **name as
 * well as the value**, so a caller who writes `accept` gets `accept` on the wire
 * rather than the SDK's `Accept` carrying their value. Both spellings are the
 * same header to every server, and keeping the one the caller wrote is what
 * "the wire is untouched" means here.
 *
 * `undefined` sources are skipped so a caller can pass an optional record
 * straight in.
 */
export function mergeHeaders(...sources: ReadonlyArray<Record<string, string> | undefined>): Record<string, string> {
    // Keyed by the lowercased name, holding the spelling to send with it. Keying a
    // plain object by the lowercased name would send every header lowercased,
    // which is legal but is not what anyone wrote.
    const byFieldName = new Map<string, [string, string]>();
    for (const source of sources) {
        if (source === undefined) continue;
        for (const [name, value] of Object.entries(source)) {
            byFieldName.set(name.toLowerCase(), [name, value]);
        }
    }
    const merged: Record<string, string> = {};
    for (const [name, value] of byFieldName.values()) merged[name] = value;
    return merged;
}

/**
 * Refuse header names and values that cannot be sent, before any I/O.
 *
 * Both halves are refused here rather than left to `fetch`, which throws a
 * `TypeError` naming its own internals from inside the send - after the token
 * grant, three layers from the call that wrote the header. A caller mistake
 * should be reported where it was written.
 *
 * A value carrying CR, LF or NUL is the header-injection case: everything after
 * the break reads as a second header, or as the start of a body.
 *
 * @returns `headers` unchanged, so this can sit in the expression that uses it.
 * @throws SdkUsageError naming the header, since that is what the caller wrote.
 */
export function checkHeaders(
    headers: Record<string, string> | undefined,
    where: string,
): Record<string, string> | undefined {
    if (headers === undefined) return headers;
    for (const [name, value] of Object.entries(headers)) {
        if (!isHttpFieldName(name)) {
            throw new SdkUsageError(
                `${where}: ${JSON.stringify(name)} is not an HTTP header name - letters, digits ` +
                    "and !#$%&'*+-.^_`|~ only, no space, no colon, no CR or LF",
            );
        }
        if (typeof value !== 'string') {
            throw new SdkUsageError(
                `${where}.${name}: the value must be a string, got ${value === null ? 'null' : typeof value}`,
            );
        }
        if (carriesAForbiddenCode(value)) {
            throw new SdkUsageError(
                `${where}.${name}: the value must not contain a line break or a NUL - everything ` +
                    'after one would be read as a second header',
            );
        }
    }
    return headers;
}

function carriesAForbiddenCode(value: string): boolean {
    for (let at = 0; at < value.length; at += 1) {
        if (FORBIDDEN_VALUE_CODES.has(value.charCodeAt(at))) return true;
    }
    return false;
}
