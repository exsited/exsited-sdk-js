/**
 * The two grammars a token credential has to satisfy, and why they are two.
 *
 * An access token becomes the value after `Bearer ` in an `Authorization`
 * header, so it must be an RFC 6750 section 2.1 `b64token`. A refresh token is
 * a **field of a token request body**, RFC 6749 section 5.1 with Appendix A.17
 * `1*VSCHAR`, which keeps punctuation Bearer has no room for. The second is not
 * a relaxation of the first: checking a refresh credential against the Bearer
 * grammar would refuse values the standard allows and the server issued.
 *
 * A number is refused **as a type** rather than converted: `String()` never
 * fails, so a JSON `access_token` of `1e21` would be sent as `"1e+21"`, a Bearer
 * credential no server issued. A string is refused when it is not the grammar,
 * which also keeps a CR or an LF out of a header the SDK is about to build.
 *
 * Neither message shows the value. It is a credential, and messages reach logs.
 *
 * This module imports only `../errors.js`, so both the store and the provider
 * can read it without the two of them cycling through each other.
 */

import { SdkUsageError } from '../errors.js';

/**
 * RFC 6750 section 2.1 `b64token`: `1*( ALPHA / DIGIT / "-" / "." / "_" / "~" /
 * "+" / "/" ) *"="`.
 *
 * `$` is absolute here: without the `m` flag it matches only at the very end of
 * the input, so `"token\n"` does not pass - a
 * value read out of a file with its newline attached is header injection, not a
 * credential.
 */
const BEARER_CREDENTIAL = /^[A-Za-z0-9\-._~+/]+=*$/;

/** RFC 6749 section 5.1 / Appendix A.17 `1*VSCHAR`: visible ASCII and space. */
const REFRESH_CREDENTIAL = /^[\x20-\x7e]+$/;

/**
 * Check a credential that will be put in an `Authorization: Bearer` header.
 *
 * @param where names the field for the message: `access_token` off the wire,
 *   `accessToken` out of the cache.
 * @returns the value unchanged, so this reads as a conversion at a call site.
 * @throws SdkUsageError when it is not text, or not that grammar.
 */
export function checkAccessCredential(value: unknown, where = 'access_token'): string {
  if (typeof value !== 'string') {
    throw new SdkUsageError(
      `${where}: expected the credential as text, got ${describeType(value)}. A token ` +
        'is not converted from another type: what would be sent is that type\'s ' +
        'rendering, which is not a credential - a JSON number 1e21 renders as "1e+21"',
    );
  }
  if (!BEARER_CREDENTIAL.test(value)) {
    throw new SdkUsageError(
      `${where}: is not a Bearer credential. RFC 6750 allows letters, digits and ` +
        '- . _ ~ + / with optional = padding at the end, and this SDK puts the value ' +
        'straight into an Authorization header; the value itself is not shown',
    );
  }
  return value;
}

/**
 * Check a credential that will be sent as a field of a token request.
 *
 * @returns the value unchanged.
 * @throws SdkUsageError when it is not text, or carries something outside the
 *   visible ASCII range.
 */
export function checkRefreshCredential(value: unknown, where = 'refresh_token'): string {
  if (typeof value !== 'string') {
    throw new SdkUsageError(
      `${where}: expected the credential as text, got ${describeType(value)}`,
    );
  }
  if (!REFRESH_CREDENTIAL.test(value)) {
    throw new SdkUsageError(
      `${where}: is not a token-response value. RFC 6749 allows the visible ASCII ` +
        'range and a space, and this one carries something outside it - a control ' +
        'character, or one with no defined encoding on this request; the value ' +
        'itself is not shown',
    );
  }
  return value;
}

/** A type name for a message, without ever rendering the value itself. */
function describeType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  return `a ${typeof value}`;
}
