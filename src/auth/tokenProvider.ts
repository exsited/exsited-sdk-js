/**
 * Obtaining and refreshing the OAuth2 access token.
 *
 * Success means any 2xx: the token endpoint may answer 200 or 201. It issues a
 * refresh token and honours the `refresh_token` grant, so a renewal tries that
 * first and falls back to a full `client_credentials` request.
 *
 * A v4 client authenticates at `/api/v4/oauth2/token`; see `TOKEN_API_VERSION`.
 */

import type { SdkConfig } from '../config/sdkConfig.js';
import { SdkAuthError, SdkError } from '../errors.js';
import { redactValue } from '../redaction.js';
import { checkAccessCredential, checkRefreshCredential } from './credentials.js';
import { buildCredentialsNamespace, type TokenRecord, type TokenStore } from './tokenStore.js';

export const DEFAULT_TOKEN_TTL_SECONDS = 3600;
/** Refreshed this long before expiry, so a token never expires mid-flight. */
export const EXPIRY_SKEW_SECONDS = 60;
/**
 * The longest lifetime believed from the server, and the furthest ahead a cached
 * expiry is trusted. `expiresAt` is an absolute stamp from whichever machine
 * minted the token, so a clock running ahead could make an expired one look
 * fresh; bounding the window lets it reach the API and be answered `401`, which
 * the refresh-and-replay path already handles.
 */
export const MAX_TOKEN_TTL_SECONDS = 24 * 60 * 60;

interface TokenResponseBody {
  access_token?: unknown;
  refresh_token?: unknown;
  expires_in?: unknown;
}

export class TokenProvider {
  readonly #config: SdkConfig;
  readonly #store: TokenStore;
  readonly #namespace: string;

  constructor(config: SdkConfig, store: TokenStore) {
    this.#config = config;
    this.#store = store;
    this.#namespace = buildCredentialsNamespace(
      config.baseUrl,
      config.auth.clientId,
      config.auth.clientSecret,
      config.auth.grantType,
    );
  }

  get tokenUrl(): string {
    return `${this.#config.baseUrl}${this.#config.tokenPath}`;
  }

  /** A usable access token, fetched only if needed. */
  async getAccessToken(): Promise<string> {
    const cached = this.#store.read(this.#namespace);
    if (cached && !needsRefresh(cached)) return cached.accessToken;
    return this.#renew(null);
  }

  /**
   * Replace a token the API has just rejected.
   *
   * If the store already holds a different one, another worker refreshed first
   * and that token is used rather than minting a third.
   */
  async refreshAccessToken(staleAccessToken: string | null): Promise<string> {
    return this.#renew(staleAccessToken);
  }

  /**
   * Evict a token the API has just refused, if the cache still holds it.
   *
   * Run when the refresh that should have replaced the token threw. The cache is
   * shared across processes, so a dead token left in it would be read, sent and
   * refused by every later process, turning a transient failure into a permanent
   * one.
   *
   * A **compare**-and-clear rather than a bare clear: between the `401` and this
   * call another worker may have refreshed and written a live token, and throwing
   * that away would make every worker mint its own. On these credentials a new
   * grant invalidates the previous token, so a herd of simultaneous grants is not
   * merely wasteful - each one kills the last.
   *
   * Taken under the same cross-process lock a write uses, so the read and the
   * clear cannot straddle another worker's write.
   *
   * @param deadAccessToken the token that produced the `401`. Null or empty names
   *   no token, so nothing is evicted; clearing on "I do not know which" would
   *   discard a live entry.
   * @returns whether an entry was actually removed.
   */
  async invalidateAccessToken(deadAccessToken: string | null): Promise<boolean> {
    if (deadAccessToken === null || deadAccessToken === '') return false;
    try {
      return this.#store.withLock(this.#namespace, () => {
        const existing = this.#store.read(this.#namespace);
        if (existing === null || existing.accessToken !== deadAccessToken) return false;
        this.#store.clear(this.#namespace);
        return true;
      });
    } catch (error) {
      // The same narrowing `#renew` applies to its own write. A refused lock or an
      // unreadable cache file is an `SdkError` and costs only the eviction: this
      // runs on the way out of a refresh that threw, and replacing that error with
      // a cache error would hide why authentication failed. A `TypeError` is a
      // custom `TokenStore` whose signature has drifted, and is not absorbed.
      if (!(error instanceof SdkError)) throw error;
      return false;
    }
  }

  async #renew(staleAccessToken: string | null): Promise<string> {
    const existing = this.#store.read(this.#namespace);
    if (existing && existing.accessToken !== staleAccessToken && !needsRefresh(existing)) {
      // Someone else already refreshed while this call was in flight.
      return existing.accessToken;
    }

    let record: TokenRecord | null = null;
    if (existing?.refreshToken) {
      record = await this.#requestWithRefreshGrant(existing.refreshToken);
    }
    record ??= await this.#requestWithCredentials();

    try {
      // The store takes the cross-process lock itself, and refuses rather than
      // writing without one. Caught here because the token in hand is valid:
      // what a refusal costs is caching, so this process pays for its own token
      // and the call goes through. Swallowing it silently is what the store's
      // one-per-run process warning is for.
      this.#store.write(this.#namespace, record);
    } catch (error) {
      // Deliberately narrow. A `TypeError` here is a custom `TokenStore` whose
      // signature has drifted, and absorbing that would turn caching off
      // permanently and silently, with nothing ever saying why.
      if (!(error instanceof SdkError)) throw error;
    }
    return record.accessToken;
  }

  async #requestWithCredentials(): Promise<TokenRecord> {
    const response = await this.#post({
      // Four fields, exactly as the API takes them; the instance ignores a field
      // it does not recognise rather than refusing it.
      grant_type: this.#config.auth.grantType,
      client_id: this.#config.auth.clientId,
      client_secret: this.#config.auth.clientSecret,
      redirect_uri: this.#config.auth.redirectUri,
    });
    const redirect = describeRedirect(response);
    if (redirect !== null) {
      throw new SdkAuthError(
        'the token request was refused: check client_id, client_secret and redirect_uri ' +
          `(${redirect})`,
        {
          // A followed redirect's status is the sign-in page's, not the token endpoint's.
          statusCode: response.redirected ? null : response.status,
          errorType: 'authentication',
        },
      );
    }
    if (!response.ok) {
      const detail = await safeText(response);
      throw new SdkAuthError(
        `token request failed with ${response.status}: ${detail || 'no detail'}`,
        {
          statusCode: response.status,
          errorType: 'authentication',
          rawResponse: redactValue(detail),
        },
      );
    }
    return this.#buildRecord(await safeJson(response), null);
  }

  async #requestWithRefreshGrant(refreshToken: string): Promise<TokenRecord | null> {
    try {
      // No `redirect_uri`: the refresh grant does not take one.
      const response = await this.#post({
        grant_type: 'refresh_token',
        client_id: this.#config.auth.clientId,
        client_secret: this.#config.auth.clientSecret,
        refresh_token: refreshToken,
      });
      if (!response.ok) return null;
      return this.#buildRecord(await safeJson(response), refreshToken);
    } catch {
      // A failed refresh must fall back to a full grant, not propagate.
      return null;
    }
  }

  async #post(body: Record<string, string>): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.#config.timeoutMs);
    try {
      return await this.#config.fetchImpl(this.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': this.#config.userAgent,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  }

  #buildRecord(body: unknown, previousRefreshToken: string | null): TokenRecord {
    const parsed = (body ?? {}) as TokenResponseBody;
    const rawAccessToken = parsed.access_token;
    if (rawAccessToken === undefined || rawAccessToken === null || rawAccessToken === '') {
      throw new SdkAuthError('token response carried no access_token', {
        errorType: 'authentication',
        rawResponse: redactValue(body),
      });
    }
    // Checked against its own grammar rather than coerced: `String()` would turn
    // a JSON number into a Bearer credential no server issued.
    const accessToken = checkAccessCredential(rawAccessToken, 'access_token');
    const rawTtl = typeof parsed.expires_in === 'number' ? parsed.expires_in : DEFAULT_TOKEN_TTL_SECONDS;
    const ttl = Math.min(Math.max(rawTtl, 0), MAX_TOKEN_TTL_SECONDS);
    // A different grammar on purpose: this one is a token-request field, not a
    // header value, so it keeps punctuation Bearer has no room for.
    const refreshToken =
      parsed.refresh_token === undefined || parsed.refresh_token === null
        ? previousRefreshToken
        : checkRefreshCredential(parsed.refresh_token, 'refresh_token');
    return {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + ttl * 1000,
    };
  }
}

/** Refreshed *before* expiry rather than after a rejection. */
function needsRefresh(record: TokenRecord): boolean {
  return Date.now() >= record.expiresAt - EXPIRY_SKEW_SECONDS * 1000;
}

/**
 * How the token endpoint refused credentials by redirecting rather than with a
 * `401`, or null when it did not. A rejected client is sent to the sign-in page:
 * a `fetch` that does not follow redirects sees the 3xx, one that does lands on
 * a page that is not JSON. Never names the target, whose query string is not
 * the caller's to print.
 */
function describeRedirect(response: Response): string | null {
  if (response.status >= 300 && response.status < 400) {
    return `the API answered ${response.status}, redirecting to its sign-in page`;
  }
  if (!response.redirected) return null;
  const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
  if (contentType.includes('json')) return null;
  return 'the API redirected the request to its sign-in page';
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function safeText(response: Response): Promise<string> {
  try {
    return (await response.text()).slice(0, 500);
  } catch {
    return '';
  }
}
