/**
 * What a `Content-Type` names, with one definition both directions read.
 *
 * A media type is `type/subtype` followed by parameters, so the comparison has
 * to drop the parameters and match the whole `type/subtype`, never a substring
 * of it: `application/jsonp` is a script, not JSON, while
 * `application/vnd.api+json` and `application/scim+json` are JSON.
 */

/** What the SDK writes when it encodes a body itself. */
export const JSON_MEDIA_TYPE = 'application/json';

/** The RFC 6839 structured-syntax suffix that makes a vendor type JSON. */
const JSON_SUFFIX = '+json';
const JSON_TREE = 'application/';

/**
 * Reduce a `Content-Type` to the lowered `type/subtype` used for comparison.
 *
 * Parameters are dropped and case is folded, so `Application/JSON; charset=utf-8`
 * and `application/json` are the same media type.
 */
export function mediaTypeOf(value: string): string {
    return (value.split(';', 1)[0] ?? '').trim().toLowerCase();
}

/**
 * Whether a raw `Content-Type` header labels a JSON body.
 *
 * `application/json` and the RFC 6839 structured-suffix forms under
 * `application/`. `text/json` is not one: it is unregistered, and the SDK sends
 * `application/json`. Total and pure, because it runs on every response:
 * anything that is not text answers `false` rather than throwing.
 */
export function isJsonContentType(value: unknown): boolean {
    if (typeof value !== 'string') return false;
    const mediaType = mediaTypeOf(value);
    if (mediaType === JSON_MEDIA_TYPE) return true;
    return (
        mediaType.startsWith(JSON_TREE) &&
        mediaType.endsWith(JSON_SUFFIX) &&
        // `application/+json` has no subtype prefix, so it names nothing.
        mediaType.length > JSON_TREE.length + JSON_SUFFIX.length
    );
}

/**
 * Whether a body under this `Content-Type` is text rather than bytes.
 *
 * JSON in any of its forms, or anything in the `text/` tree. Everything else is
 * kept as bytes: a note attachment may be a PNG, and turning those bytes into
 * text produces mojibake that looks like data.
 */
export function isTextualContentType(value: unknown): boolean {
    if (typeof value !== 'string') return false;
    return isJsonContentType(value) || mediaTypeOf(value).startsWith('text/');
}
