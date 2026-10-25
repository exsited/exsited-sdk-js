/**
 * URL assembly. A `{name}` value stays inside its path segment by percent-encoding with an empty safe set
 * and by refusing a dot-only value, since normalisers may decode `%2E%2E` back to `..`.
 */

import {SdkUsageError} from '../errors.js';
import {REDACTED} from '../redaction.js';

const PLACEHOLDER_PATTERN = /\{([a-z_][a-z0-9_]*)\}/g;
const QUERY_OR_FRAGMENT_PATTERN = /[?#]/;
const REDACTED_PARAMETER = new RegExp(`[?#&]([^?#&=]*)=${REDACTED.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=[&#]|$)`);
const IMPLIED_PORTS: Record<string, number> = {http: 80, https: 443};

/** Percent-encode a path segment with an empty safe set. */
function quoteSegment(text: string): string {
    return encodeURIComponent(text).replace(/[!'()*]/g, (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`);
}

/** Split a template into its path and any query string it carries. */
function splitPathTemplate(pathTemplate: string): [string, string] {
    const boundary = pathTemplate.search(QUERY_OR_FRAGMENT_PATTERN);
    if (boundary < 0) return [pathTemplate, ''];
    return [pathTemplate.slice(0, boundary), pathTemplate.slice(boundary)];
}

/** The `{name}` placeholders in a template, first-seen order. */
export function findPathParamNames(pathTemplate: string): string[] {
    const [template] = splitPathTemplate(pathTemplate);
    const seen: string[] = [];
    for (const match of template.matchAll(PLACEHOLDER_PATTERN)) {
        const name = match[1] as string;
        if (!seen.includes(name)) seen.push(name);
    }
    return seen;
}

/** Whether a path value is empty enough to collapse the URL into a different endpoint. */
function blankPathParam(value: unknown): boolean {
    return value === null || value === undefined || (typeof value === 'string' && !value.trim());
}

/** Whether a value can stand in for a path segment: text, an integer or a `BigInt` (ids pass 2^53), never a boolean. */
function usablePathParam(value: unknown): boolean {
    if (typeof value === 'string') return true;
    if (typeof value === 'bigint') return true;
    return typeof value === 'number' && Number.isInteger(value);
}

/** Whether a numeric path value cannot be written out as the digits the caller meant. */
function inexactPathParam(value: unknown): boolean {
    return typeof value === 'number' && !Number.isSafeInteger(value);
}

/** The text form of a path value, ready to be escaped into the template. */
function pathParamText(value: unknown): string {
    return typeof value === 'string' ? value.trim() : String(value);
}

/** Whether a path value is nothing but dots. */
function dotOnlyPathParam(text: string): boolean {
    return /^\.+$/.test(text);
}

/**
 * Fill `{name}` placeholders, reporting every missing, blank, unknown, wrong-typed, inexact or dot-only one
 * in one `SdkUsageError` before encoding; `.hidden` and `a..b` are ordinary identifiers.
 */
export function substitutePathParams(pathTemplate: string, pathParams: Record<string, unknown> | null = null): string {
    const [template, queryAndFragment] = splitPathTemplate(pathTemplate);
    const expected = findPathParamNames(pathTemplate);
    const supplied: Record<string, unknown> = {...(pathParams || {})};

    const problems: string[] = [];
    const missing = expected.filter((name) => !(name in supplied));
    if (missing.length) problems.push(`missing path params: ${[...missing].sort().join(', ')}`);
    const unknown = Object.keys(supplied).filter((name) => !expected.includes(name));
    if (unknown.length) problems.push(`unknown path params: ${[...unknown].sort().join(', ')}`);
    const given = expected.filter((name) => name in supplied);
    const blank = given.filter((name) => blankPathParam(supplied[name]));
    if (blank.length) problems.push(`blank path params: ${[...blank].sort().join(', ')}`);
    // Blankness first, so `null` and `undefined` are already in `blank`.
    const wrongTyped = given
        .filter((name) => !blank.includes(name) && !usablePathParam(supplied[name]))
        .map((name) => `${name} (${typeof supplied[name]})`);
    if (wrongTyped.length) problems.push(`wrong-typed path params: ${[...wrongTyped].sort().join(', ')}`);
    // Named without its value: a path parameter is an id, and an id is customer data.
    const inexact = given.filter((name) => !blank.includes(name) && inexactPathParam(supplied[name]));
    if (inexact.length) {
        problems.push(
            `inexact path params: ${[...inexact].sort().join(', ')} (a Number holds integers exactly only up to ` +
                '2**53 - 1, past which it is rounded and may be written in scientific notation; pass a BigInt or a ' +
                'string for an id that large)',
        );
    }
    // Reported alongside the rest, so it raises before any encoding or network work.
    const dotOnly = given.filter(
        (name) =>
            !blank.includes(name) && usablePathParam(supplied[name]) && dotOnlyPathParam(pathParamText(supplied[name])),
    );
    if (dotOnly.length) {
        problems.push(
            `dot-only path params: ${[...dotOnly].sort().join(', ')} (a value of only dots is not an identifier, ` +
                'and URL normalisation removes the segment, which would send this request to a different endpoint)',
        );
    }
    if (problems.length) throw new SdkUsageError(`${pathTemplate} -> ${problems.join('; ')}`);

    const substituted = template.replace(PLACEHOLDER_PATTERN, (_match, name: string) => {
        try {
            return quoteSegment(pathParamText(supplied[name]));
        } catch {
            // `encodeURIComponent` throws a bare `URIError` on an unpaired surrogate.
            throw new SdkUsageError(
                `${pathTemplate} -> path param ${name} cannot be percent-encoded: it holds a lone surrogate, which ` +
                    'is not a character any URL can carry',
            );
        }
    });
    if (substituted.includes('{') || substituted.includes('}')) {
        // The template, never the substituted path, which carries the ids that filled it.
        throw new SdkUsageError(
            `${pathTemplate} -> malformed placeholder: a brace survived substitution, so this is not the endpoint ` +
                'the template names - check the braces in the path',
        );
    }
    return substituted + queryAndFragment;
}

/** Refusal of a URL that will not parse. */
function unparsableUrl(label: string, url: string): SdkUsageError {
    return new SdkUsageError(
        `${label}: is not a URL this SDK can parse - its scheme, authority or port is not usable. Pass a link the ` +
            'API composed, or a path relative to the configured base URL',
        {details: {[label]: url}},
    );
}

/** Scheme, lower-cased host and port, with the scheme's implied port filled in. */
function splitOrigin(label: string, url: string): [string, string, number | null] {
    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        throw unparsableUrl(label, url);
    }
    const scheme = parsed.protocol.replace(/:$/, '').toLowerCase();
    const explicitPort = parsed.port ? Number(parsed.port) : null;
    const port = explicitPort ?? IMPLIED_PORTS[scheme] ?? null;
    return [scheme, (parsed.hostname || '').toLowerCase(), port];
}

/** Refuse an absolute URL off the configured origin, or carrying userinfo. */
function requireSameOrigin(baseUrl: string, url: string): void {
    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        throw unparsableUrl('path', url);
    }
    if (parsed.username || parsed.password) {
        throw new SdkUsageError(
            'path: the absolute URL carries credentials in its userinfo, which would replace the bearer token; ' +
                'strip the userinfo before following it',
            {details: {path: url}},
        );
    }
    const a = splitOrigin('path', url);
    const b = splitOrigin('baseUrl', baseUrl);
    const differs = ['scheme', 'host', 'port'].filter((_, index) => a[index] !== b[index]);
    if (differs.length) {
        throw new SdkUsageError(
            `path: the absolute URL is not on the configured origin - its ${differs.join(' and ')} ${
                differs.length > 1 ? 'differ' : 'differs'
            }. An absolute URL is requested with the access token attached, so only the API's own links may be ` +
                'passed back',
            {details: {path: url, baseUrl}},
        );
    }
}

/** Refuse a request target carrying a fragment. */
function rejectFragment(target: string, label: string): void {
    const marker = target.indexOf('#');
    if (marker < 0) return;
    throw new SdkUsageError(
        `${label}: carries a fragment at index ${marker}, and a fragment is never sent - everything from the '#' on is dropped before the request goes out, and the query parameters of the call would be appended behind it; remove the fragment, or percent-encode it as %23 if it is part of the path`,
    );
}

/** Refuse a request target carrying the redaction marker - it is a printed copy. */
function rejectRedactedValue(target: string, label: string): void {
    const found = REDACTED_PARAMETER.exec(target);
    if (!found) return;
    throw new SdkUsageError(
        `${label}: parameter ${JSON.stringify(found[1])} holds only the redaction marker ${JSON.stringify(REDACTED)}, so this URL is a printed or logged copy and the real value is not in it - read Location off the response itself, or call again with raiseOnError off so there is a response to read it from`,
    );
}

/** The one grammar every public URL seam applies before sending; the transport runs it too, being exported. */
export function refuseUnsendableUrl(target: unknown, label = 'url'): string {
    if (typeof target !== 'string') {
        throw new SdkUsageError(`${label}: expected a string request target, got ${typeof target}`);
    }
    rejectFragment(target, label);
    rejectRedactedValue(target, label);
    return target;
}

/** Join a base URL and a path. */
export function buildUrl(baseUrl: string, path: string): string {
    refuseUnsendableUrl(path, 'path');
    const lower = path.toLowerCase();
    if (lower.startsWith('http://') || lower.startsWith('https://')) {
        requireSameOrigin(baseUrl, path);
        return path;
    }
    return baseUrl.replace(/\/+$/, '') + (path.startsWith('/') ? '' : '/') + path;
}
