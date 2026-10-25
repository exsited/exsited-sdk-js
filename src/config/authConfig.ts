/**
 * Who you are and which instance you are talking to.
 *
 * Only the credentials and where the resulting token is kept, so a credentials
 * file contains nothing but credentials; how the SDK *behaves* is
 * {@link SdkConfig}.
 */

import { SdkConfigError } from '../errors.js';
import { REDACTED } from '../redaction.js';

export const DEFAULT_CLIENT_NAME = 'default';
export const DEFAULT_GRANT_TYPE = 'client_credentials';

export interface AuthConfigInput {
  /**
   * Label for this instance. Shown in logs and used to select it by name.
   * Required, so two registered instances cannot silently share an implicit one.
   */
  clientName: string;
  /** Instance URL, e.g. `https://dev-api.exsited.com`. A trailing `/` is stripped. */
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  /**
   * Sent in the `client_credentials` token request body, and omitted from the
   * `refresh_token` one, which does not take it.
   */
  redirectUri: string;
  grantType?: string;
  /**
   * Where the access and refresh tokens are cached. A path caches to that file,
   * `null` keeps the token in memory for the life of the process, and omitting
   * it uses the platform's per-user cache directory.
   *
   * One path is safe to share between instances: entries are keyed by a
   * fingerprint of the credentials, so identical ones authenticate once between
   * them and two operators sharing an OAuth2 client never get each other's
   * token.
   */
  tokenCachePath?: string | null;
}

/**
 * Credentials for one Exsited instance.
 *
 * Frozen and validated at construction; `clientSecret` is masked by
 * `toString`/`toJSON`, so an instance is safe to log.
 *
 * Four credentials, which are exactly the four the token endpoint takes.
 */
export class AuthConfig {
  readonly clientName: string;
  readonly baseUrl: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly redirectUri: string;
  readonly grantType: string;
  readonly tokenCachePath: string | null | undefined;

  constructor(input: AuthConfigInput) {
    const problems: string[] = [];

    for (const name of ['clientName', 'baseUrl', 'clientId', 'clientSecret', 'redirectUri'] as const) {
      const value = input[name];
      if (typeof value !== 'string') {
        problems.push(`${name}: expected a string, got ${value === null ? 'null' : typeof value}`);
      } else if (value.trim() === '') {
        problems.push(`${name}: must not be blank`);
      }
    }

    const baseUrl = typeof input.baseUrl === 'string' ? normaliseBaseUrl(input.baseUrl, problems) : '';
    const grantType = input.grantType ?? DEFAULT_GRANT_TYPE;
    if (typeof grantType !== 'string' || grantType.trim() === '') {
      problems.push('grantType: must not be blank');
    }
    if (
      input.tokenCachePath !== undefined &&
      input.tokenCachePath !== null &&
      (typeof input.tokenCachePath !== 'string' || input.tokenCachePath.trim() === '')
    ) {
      // A blank string is how an unset environment variable arrives, and it is
      // falsy - so it would silently choose the memory store, which is what
      // `null` is reserved for.
      problems.push(
        'tokenCachePath: must not be blank - pass null to keep the token in memory, ' +
          'or a path to cache it',
      );
    }

    if (problems.length > 0) {
      const label = typeof input.clientName === 'string' && input.clientName.trim() ? input.clientName : '<unnamed>';
      throw new SdkConfigError(`instance ${label}: ${problems.join('; ')}`);
    }

    this.clientName = input.clientName;
    this.baseUrl = baseUrl;
    this.clientId = input.clientId;
    this.clientSecret = input.clientSecret;
    this.redirectUri = input.redirectUri;
    this.grantType = grantType;
    this.tokenCachePath = input.tokenCachePath;
    Object.freeze(this);
  }

  toJSON(): Record<string, unknown> {
    return {
      clientName: this.clientName,
      baseUrl: this.baseUrl,
      clientId: this.clientId,
      clientSecret: REDACTED,
      redirectUri: this.redirectUri,
      grantType: this.grantType,
    };
  }

  toString(): string {
    return `AuthConfig(${JSON.stringify(this.toJSON())})`;
  }
}

function normaliseBaseUrl(raw: string, problems: string[]): string {
  const trimmed = raw.trim().replace(/\/+$/, '');
  if (trimmed === '') return '';
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    // `new URL` refuses a port that is not digits, and one above 65535, by
    // failing the whole parse, so the port is named here rather than the whole
    // value being reported as not a URL.
    const port = portTextOf(trimmed);
    if (port !== undefined && port !== '' && !isValidPort(port)) {
      problems.push(`baseUrl: port ${JSON.stringify(port)} is not a number in 1-65535`);
    } else {
      problems.push(`baseUrl: not a URL: ${trimmed}`);
    }
    return trimmed;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    problems.push(`baseUrl: needs an http:// or https:// scheme, got ${parsed.protocol}`);
  }
  if (parsed.username || parsed.password) {
    // `fetch` turns userinfo into a Basic header that replaces the bearer token.
    problems.push('baseUrl: must not carry user:password@ credentials');
  }
  if (parsed.search || parsed.hash) {
    problems.push('baseUrl: must not carry a query string or fragment');
  }
  // Port 0 is the one port `new URL` accepts and nothing can connect to: it
  // means "let the kernel choose" to a listener and nothing at all to a client.
  if (parsed.port !== '' && !isValidPort(parsed.port)) {
    problems.push(`baseUrl: port ${JSON.stringify(parsed.port)} is not a number in 1-65535`);
  }
  // A path is allowed: an instance can be mounted under a sub-path.
  return trimmed;
}

/** Whether `port` is a decimal number in 1 to 65535. */
function isValidPort(port: string): boolean {
  if (!/^\d+$/.test(port)) return false;
  const value = Number(port);
  return value >= 1 && value <= 65535;
}

/**
 * The port text out of a URL's authority, or `undefined` when it has none.
 *
 * Textual rather than parsed, because the case this exists for is the one
 * `new URL` refused to parse at all.
 */
function portTextOf(url: string): string | undefined {
  const afterScheme = url.replace(/^[A-Za-z][A-Za-z0-9+.-]*:\/\//, '');
  const authority = afterScheme.split(/[/?#]/)[0] ?? '';
  const hostAndPort = authority.slice(authority.indexOf('@') + 1);
  const colon = hostAndPort.lastIndexOf(':');
  // A colon inside an IPv6 literal is part of the host, and those are
  // bracketed, so only a colon after the closing bracket introduces a port.
  if (colon < 0 || colon < hostAndPort.lastIndexOf(']')) return undefined;
  return hostAndPort.slice(colon + 1);
}
