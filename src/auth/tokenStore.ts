/**
 * Where the access and refresh tokens live between calls.
 *
 * Two stores. {@link MemoryTokenStore} keeps the token for the life of the
 * process. {@link FileTokenStore} writes it to a file guarded by a lock, so two
 * processes writing at once cannot interleave and lose one of the records.
 *
 * The lock guards the **write**, not the grant. `TokenProvider` mints outside it
 * and locks only to store the result, so concurrent processes may still mint a
 * token each; what they cannot do is clobber each other's file. Minting twice
 * costs a round trip, which is why it was not worth holding a filesystem lock
 * across a network call to prevent.
 *
 * The lock is a **file created exclusively** (`openSync` with `wx`), beside the
 * cache and named for the cache rather than for a namespace, because a write
 * rewrites the whole document: two sets of credentials taking two different
 * locks over one file is not mutual exclusion at all.
 *
 * Exclusive creation is not an OS lock. The kernel releases nothing when the
 * holder dies, so recovery is this module's problem, and it is why the lock
 * carries a **stamp**: the holder's pid, the host that minted that pid, a
 * timestamp and a serial. A lock is taken over early only when the stamp names
 * this host and that pid is gone; age remains the backstop for everything the
 * pid cannot answer.
 *
 * **The lock fails closed.** When there is no cross-process lock to take, every
 * mutation throws {@link SdkTokenLockError} rather than running under an
 * in-process guard that only looks like exclusion, under which two processes
 * could rewrite a shared file at the same moment and one lose the other's entry.
 * The token layer catches the refusal, so what it costs is caching, never the
 * call. See {@link FileTokenStore.crossProcessLockingDegraded}.
 *
 * **One in-process guard per cache path**, keyed by the resolved real path -
 * case-folded on Windows - and resolved once at construction. Two stores built
 * from one config are the ordinary shape, so the guard belongs to the path and
 * not the instance; resolving once keeps a later `process.chdir` from moving the
 * I/O away from the lock that guards it.
 *
 * `node:fs`, `node:os` and `node:path` are imported statically here, so a host
 * that has none of them cannot load this module in the first place. What is
 * guarded is `process`, which bundlers do shim partially: a missing `pid`,
 * `platform` or `kill` costs the pid rule and falls back to age, never a throw.
 */

import { createHash } from 'node:crypto';
import {
  closeSync,
  fstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  readSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { homedir, hostname, platform, tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';

import { SdkTokenCacheError, SdkTokenLockError } from '../errors.js';
import { checkAccessCredential, checkRefreshCredential } from './credentials.js';

export const DEFAULT_TOKEN_CACHE_FILENAME = 'exsited_ts_token.json';

/**
 * The most of the cache file this SDK reads, and the size above which it
 * refuses it instead.
 *
 * The whole file is parsed at once, from a **well-known per-user path any
 * process running as this user can append to**, so an unbounded read there is
 * a memory cost decided by whatever last wrote the file.
 *
 * One entry is three JSON fields keyed by a 16-character digest, about 9 KB with
 * two 4 KB bearer credentials and usually well under 1 KB, so a megabyte holds
 * far more credential sets than a machine has and is still a size any process
 * holds without noticing.
 */
export const MAX_TOKEN_CACHE_BYTES = 1024 * 1024;

/**
 * How old a lock must be before age alone is enough to break it.
 *
 * The backstop, not the main route: a pid the stamp names is asked about first.
 * Age still has to cover a stamp this host cannot judge - one written on another
 * machine, one from a host that cannot name itself, one a crash left unstamped -
 * and the case a signal cannot see, a holder that is a zombie or has already
 * been reaped into a reused pid.
 */
export const STALE_LOCK_MS = 30_000;

/**
 * How long {@link FileTokenStore.withLock} waits for a **live** holder before
 * going on without the lock.
 *
 * `work` is a synchronous read-modify-write of a small JSON file; the token
 * grant happens outside it. So this is orders of magnitude more than the guarded
 * section needs, and it is short because the wait is a blocking one: `withLock`
 * takes a synchronous callback, so nothing else in this process runs while it
 * polls. A dead holder costs none of it, since the pid rule breaks its lock, so
 * this window is patience with a live one.
 */
const LOCK_WAIT_MS = 2_000;
const LOCK_POLL_MS = 25;

/**
 * Prefixes the host name inside a stamp. Keyed rather than positional, so a
 * stamp that records no host is read as carrying none instead of having some
 * other field misread as one.
 */
const LOCK_HOST_FIELD = 'host=';

/** Distinguishes two stores in one process stamping in the same millisecond. */
let lockSerial = 0;

/**
 * The in-process half of the lock over **one cache path**.
 *
 * One instance per file, shared by every store that names it, so two stores
 * built from one config - two clients from one set of credentials, the ordinary
 * shape - coordinate rather than the second colliding with the first's own
 * sidecar and being refused by its own process.
 */
class CachePathGuard {
  /** Nesting depth. Above zero, the file lock is already held by this process. */
  depth = 0;
  /** The exact bytes this process stamped, or null while it holds no lock. */
  heldStamp: string | null = null;
  degradedReason: string | null = null;
  /** Whether the current unbroken run of refusals has already been announced. */
  degradationReported = false;
}

/**
 * Keyed by the resolved path, folded on Windows, so a relative spelling, a
 * symlink and a difference in case all find the one guard for the file.
 */
const guardsByCachePath = new Map<string, CachePathGuard>();

/**
 * The absolute real file a cache path names, resolved once and kept, so a later
 * `process.chdir` cannot move the I/O away from the guard and the lock sidecar,
 * and two spellings of one file share one guard. The file usually does not exist
 * yet on a first run, so the directory is resolved instead and the basename
 * rejoined.
 */
function resolveCachePath(filePath: string): string {
  const absolute = resolve(filePath);
  try {
    return realpathSync.native(absolute);
  } catch {
    // Not there yet, which is the ordinary first-run case.
  }
  try {
    return join(realpathSync.native(dirname(absolute)), basename(absolute));
  } catch {
    // Nor is the directory. `resolve` is still absolute, which is what matters.
    return absolute;
  }
}

/** The key one cache path's guard is filed under. */
function guardKeyFor(path: string): string {
  // Folded only where the filesystem folds. On a case-sensitive filesystem two
  // names differing in case are two files, and merging their guards would
  // serialise writes that never needed serialising.
  return platform() === 'win32' ? path.toLowerCase() : path;
}

function guardForPath(path: string): CachePathGuard {
  const key = guardKeyFor(path);
  let guard = guardsByCachePath.get(key);
  if (guard === undefined) {
    guard = new CachePathGuard();
    guardsByCachePath.set(key, guard);
  }
  return guard;
}

export interface TokenRecord {
  accessToken: string;
  refreshToken: string | null;
  /** Absolute epoch milliseconds. */
  expiresAt: number;
}

export interface TokenStore {
  read(namespace: string): TokenRecord | null;
  write(namespace: string, record: TokenRecord): void;
  clear(namespace: string): void;
  /**
   * Run `work` with exclusive access to the store.
   *
   * `work` is synchronous, so this cannot span a token grant: it serialises the
   * read-modify-write of the cache and nothing more.
   */
  withLock<T>(namespace: string, work: () => T): T;
}

/**
 * Fingerprint a set of credentials, for keying a shared token file.
 *
 * Derived from every value that decides *which principal the server mints for*,
 * so identical credentials share one cached token and any difference gets its
 * own entry. `redirectUri` is sent by the token request but selects no token, so
 * it is not included.
 *
 * Each value is fed in **with its length** rather than joined on a separator,
 * which would be forgeable: `clientSecret="secret"` with `clientId="alice|x"`
 * would otherwise key the same as `clientSecret="secret|alice"` with
 * `clientId="x"`.
 *
 * Treat this function as frozen: one differing byte in the digest silently stops
 * an existing cache file's entries being found, and nothing checks it.
 */
export function buildCredentialsNamespace(
  baseUrl: string,
  clientId: string,
  clientSecret = '',
  grantType = '',
): string {
  // Two literals here look like mistakes and are not, and changing either
  // silently stops existing cache entries being found.
  //
  // `'v4'` versions this fingerprint scheme, not the API: it stops an entry
  // written by another scheme being read as one of these.
  //
  // The empty string is a fixed slot in the material; dropping it would change
  // every digest already written.
  const material = ['v4', baseUrl, clientId, clientSecret, '', grantType]
    .map((value) => `${value.length}:${value}`)
    .join('');
  return createHash('sha256').update(material, 'utf8').digest('hex').slice(0, 16);
}

/** The platform's per-user cache path for the token file. */
export function buildDefaultTokenCachePath(filename = DEFAULT_TOKEN_CACHE_FILENAME): string {
  const os = platform();
  let dir: string;
  if (os === 'win32') {
    dir = join(readEnv('LOCALAPPDATA') ?? tmpdir(), 'exsited');
  } else if (os === 'darwin') {
    dir = join(homedir(), 'Library', 'Caches', 'exsited');
  } else {
    dir = join(readEnv('XDG_CACHE_HOME') ?? join(homedir(), '.cache'), 'exsited');
  }
  return join(dir, filename);
}

export class MemoryTokenStore implements TokenStore {
  #records = new Map<string, TokenRecord>();

  read(namespace: string): TokenRecord | null {
    // Copied out as well as in, so a caller editing what a read hands back
    // cannot edit the store.
    const record = this.#records.get(namespace);
    return record === undefined ? null : { ...record };
  }
  write(namespace: string, record: TokenRecord): void {
    this.#records.set(namespace, { ...record });
  }
  clear(namespace: string): void {
    this.#records.delete(namespace);
  }
  withLock<T>(_namespace: string, work: () => T): T {
    // One process, and Node runs this synchronously, so there is nothing to
    // exclude. The method exists so the two stores are interchangeable.
    return work();
  }
}

export class FileTokenStore implements TokenStore {
  /** The resolved real path, absolute from construction on. */
  readonly path: string;

  /** Beside the cache and named for it, not for a namespace: see the module note. */
  readonly #lockPath: string;

  /** Shared by every store naming this file: see {@link CachePathGuard}. */
  readonly #guard: CachePathGuard;

  constructor(path: string) {
    // Resolved once. The sidecar is derived from the resolved path for the same
    // reason, so the lock and the data it protects cannot end up in different
    // directories after a working-directory change.
    this.path = resolveCachePath(path);
    this.#lockPath = `${this.path}.lock`;
    this.#guard = guardForPath(this.path);
  }

  /**
   * Why the last lock attempt on this cache path was refused, or `null` while
   * the cross-process lock is in force.
   *
   * Readable because the failure would otherwise be invisible from the inside:
   * two processes rewriting the file at the same moment, one losing the other's
   * entry, looks exactly like working coordination to both of them. The attempt
   * is refused - see {@link withLock} - and the first refusal in an unbroken run
   * is emitted as a process warning.
   */
  get crossProcessLockingDegraded(): string | null {
    return this.#guard.degradedReason;
  }

  /**
   * This store's entry, or `null` when the file holds none for it.
   *
   * @throws SdkTokenCacheError when the file cannot be read, or when the entry
   *   is **there and unusable**. Absent and unusable are different answers:
   *   reading a corrupt entry as "nothing cached" would hide it behind an
   *   authentication on every call for as long as it stayed on disk.
   *   The two credentials are checked against their own grammars here as well
   *   as at grant decoding, because a cache file is text on disk that anything
   *   running as this user can edit.
   */
  read(namespace: string): TokenRecord | null {
    const all = this.#readAll();
    const entry = all[namespace];
    if (entry === undefined || entry === null) return null;
    if (typeof entry !== 'object' || Array.isArray(entry)) {
      throw this.#refuseTheCacheEntry(`the entry is a JSON ${typeof entry}, not an object`);
    }
    const record = entry as Partial<TokenRecord>;
    if (typeof record.expiresAt !== 'number' || !Number.isFinite(record.expiresAt)) {
      throw this.#refuseTheCacheEntry('expiresAt is not a finite number of milliseconds');
    }
    try {
      const accessToken = checkAccessCredential(record.accessToken, 'accessToken');
      const refreshToken =
        record.refreshToken === undefined || record.refreshToken === null
          ? null
          : checkRefreshCredential(record.refreshToken, 'refreshToken');
      return { accessToken, refreshToken, expiresAt: record.expiresAt };
    } catch (error) {
      throw this.#refuseTheCacheEntry(error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Write this store's entry, leaving every other namespace intact.
   *
   * Takes the cross-process lock itself rather than trusting the caller to:
   * this is a read-modify-write over the whole document, so an unlocked one can
   * put back an entry another process just cleared. The lock is reentrant, so a
   * caller already inside {@link withLock} stays correct.
   *
   * @throws SdkTokenCacheError when the existing file could not be read, so the
   *   snapshot this write would rebuild it from is not the file's contents.
   *   Refusing costs this process its cached token; writing anyway would cost
   *   every other namespace theirs.
   * @throws SdkTokenLockError when the cache could not be locked.
   */
  write(namespace: string, record: TokenRecord): void {
    this.withLock(namespace, () => {
      const all = this.#readAll();
      all[namespace] = { ...record };
      this.#writeAll(all);
    });
  }

  /**
   * Drop this store's entry, leaving other namespaces' tokens alone.
   *
   * **The lock sidecar is never removed**, only the entry. The sidecar is the
   * identity of the lock, so unlinking it would end mutual exclusion outright:
   * a waiter goes on holding a lock on an unlinked inode while the next process
   * creates a fresh sidecar and locks that, and both are then inside the
   * critical section at once, each overwriting the other's token. An empty
   * sidecar costs nothing, and outliving the data it protected is the point.
   *
   * @throws SdkTokenCacheError when the file could not be read, so which other
   *   namespaces it holds is unknown and rewriting it would discard them.
   * @throws SdkTokenLockError when the cache could not be locked.
   */
  clear(namespace: string): void {
    this.withLock(namespace, () => {
      const all = this.#readAll();
      if (!(namespace in all)) return;
      delete all[namespace];
      this.#writeAll(all);
    });
  }

  /**
   * Run `work` holding the cross-process lock over this cache file.
   *
   * Reentrant per **cache path**, not per object: a nested acquisition on a
   * path this process already holds counts depth rather than colliding with its
   * own sidecar.
   *
   * @throws SdkTokenLockError when there is no cross-process lock to take; the
   *   token layer catches this, so a refusal costs caching rather than the call.
   */
  withLock<T>(_namespace: string, work: () => T): T {
    const guard = this.#guard;
    if (guard.depth > 0) {
      // An outer level on this same path already holds the file lock.
      guard.depth += 1;
      try {
        return work();
      } finally {
        guard.depth -= 1;
      }
    }
    this.#acquireLock();
    guard.depth += 1;
    try {
      return work();
    } finally {
      guard.depth -= 1;
      this.#releaseLock();
    }
  }

  /**
   * Take the lock, or refuse.
   *
   * @throws SdkTokenLockError when there is no cross-process lock to be had.
   */
  #acquireLock(): void {
    // Without this the very first call on a machine finds no cache directory,
    // and every attempt to create the lock in it fails for the whole wait.
    try {
      mkdirSync(dirname(this.path), { recursive: true });
    } catch {
      // Whatever stopped it will be named by the create below, which is the
      // error the caller can act on.
    }

    const deadline = Date.now() + LOCK_WAIT_MS;
    // The deadline is tested on every iteration but the first, so that breaking
    // an abandoned lock cannot become a loop of its own: taking one over is only
    // progress if the create that follows it is allowed to be the last.
    for (let firstAttempt = true; ; firstAttempt = false) {
      if (!firstAttempt && Date.now() >= deadline) {
        throw this.#refuseTheLock(
          `another holder kept the lock for longer than ${LOCK_WAIT_MS}ms`,
        );
      }
      const stamp = buildLockStamp();
      let handle: number | null = null;
      try {
        handle = openSync(this.#lockPath, 'wx', 0o600);
        writeFileSync(handle, stamp);
        closeSync(handle);
        handle = null;
        this.#guard.heldStamp = stamp;
        // Re-armed on every success, so a condition that comes back after a
        // recovery is announced again rather than staying silent for the life
        // of the process.
        this.#guard.degradedReason = null;
        this.#guard.degradationReported = false;
        return;
      } catch (error) {
        if (handle !== null) {
          // Created, but the stamp did not get safely onto disk. A lock no
          // holder can prove is its own is recoverable by age alone, so it is
          // taken back rather than left for the gate 30 seconds away.
          try {
            closeSync(handle);
          } catch {
            /* the descriptor is going away with this failure either way */
          }
          this.#removeLock();
          throw this.#refuseTheLock(
            `the lock file ${this.#lockPath} could not be written (${describe(error)})`,
          );
        }
        if (describe(error) !== 'EEXIST') {
          // A read-only mount, a denied directory, a path whose parent is a
          // file. None of these becomes true by waiting, so it is refused at
          // once rather than polled.
          throw this.#refuseTheLock(
            `the lock file ${this.#lockPath} could not be created (${describe(error)})`,
          );
        }
      }

      if (this.#breakAbandonedLock()) continue;
      sleep(LOCK_POLL_MS);
    }
  }

  /**
   * Remove a lock nobody is holding, and report whether it did.
   *
   * The pid is asked first and only when the stamp names **this** host, because
   * a pid identifies nothing on another machine and a shared cache path is
   * exactly what puts two machines on one lock. Age covers the rest.
   */
  #breakAbandonedLock(): boolean {
    const holder = readLockHolder(this.#lockPath);
    const here = lockHost();
    // The empty-host test is not redundant: `lockHost` answers '' when this
    // machine cannot name itself, and two unnameable hosts would otherwise
    // compare equal to each other.
    if (holder !== null && holder.host !== '' && holder.host === here && !processIsRunning(holder.pid)) {
      return this.#removeLock();
    }
    let mtimeMs: number;
    try {
      mtimeMs = statSync(this.#lockPath).mtimeMs;
    } catch {
      // Gone between the create and the stat. The next create is the retry.
      return false;
    }
    if (Date.now() - mtimeMs <= STALE_LOCK_MS) return false;
    return this.#removeLock();
  }

  /**
   * Give up the lock, but only while it still carries this holder's own stamp.
   *
   * After a takeover the file belongs to whoever broke this holder's lock, and
   * removing theirs would let a third writer in on top of them.
   */
  #releaseLock(): void {
    const held = this.#guard.heldStamp;
    this.#guard.heldStamp = null;
    if (held === null) return;
    let content: string;
    try {
      content = readFileSync(this.#lockPath, 'utf8');
    } catch {
      return;
    }
    if (content !== held) return;
    this.#removeLock();
  }

  #removeLock(): boolean {
    try {
      // `recursive` also removes a lock left behind as a directory rather than
      // a file.
      rmSync(this.#lockPath, { recursive: true, force: true });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Announce the degradation once per unbroken run, and build the refusal.
   *
   * @returns the error, for the caller to `throw`, so the throw site reads as
   *   one and the stack starts there.
   */
  #refuseTheLock(reason: string): SdkTokenLockError {
    const message =
      `the token cache at ${this.path} could not be locked across processes, so the ` +
      `operation was refused rather than run without exclusion: ${reason}. Two ` +
      'processes sharing this file would otherwise write it at the same moment and ' +
      "lose each other's entry, refresh tokens included. Pass tokenCachePath: null to " +
      'keep the token in memory, or point it at a filesystem where locking works; ' +
      'read FileTokenStore.crossProcessLockingDegraded to detect this in code';
    this.#guard.degradedReason = reason;
    if (!this.#guard.degradationReported) {
      this.#guard.degradationReported = true;
      warn(message);
    }
    return new SdkTokenLockError(message);
  }

  /**
   * Every namespace in the cache file, or `{}` **only** when it holds none.
   *
   * `{}` means "this file holds nothing", which is true of a missing file and
   * of an empty one, and both mutations rebuild the whole file from what this
   * returns. So anything else - unreadable, not UTF-8, not JSON, not an object,
   * larger than the ceiling - throws instead: rebuilding from `{}` would
   * truncate a shared file down to this store's one entry and destroy every
   * other namespace's refresh token.
   *
   * Foreign entries are carried through untouched - never retyped, never
   * reshaped - so a write puts back what it read; every string, key order,
   * boolean and null round-trips exactly through JSON re-encoding.
   */
  #readAll(): Record<string, unknown> {
    const bytes = this.#readWithinTheCeiling();
    if (bytes === null) return {};
    let content: string;
    try {
      // Fatal, unlike `readFileSync(path, 'utf8')`, which silently substitutes
      // U+FFFD: bytes that are not this file's text are a corrupt cache, and
      // parsing the substitution would be reading a different document.
      content = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch (error) {
      throw this.#refuseTheCacheFile('is not UTF-8 text', error);
    }
    if (content.trim() === '') return {};
    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch (error) {
      throw this.#refuseTheCacheFile('does not hold valid JSON', error);
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw this.#refuseTheCacheFile(
        `holds a JSON ${Array.isArray(parsed) ? 'array' : typeof parsed} where an object ` +
          'of credential namespaces was expected',
        null,
      );
    }
    return parsed as Record<string, unknown>;
  }

  /**
   * The cache file's bytes, read one past {@link MAX_TOKEN_CACHE_BYTES}.
   *
   * One past, and no further: enough to know the file is over the ceiling
   * without holding the whole of it.
   *
   * @returns the bytes, or `null` when there is no such file.
   */
  #readWithinTheCeiling(): Uint8Array | null {
    let handle: number;
    try {
      handle = openSync(this.path, 'r');
    } catch (error) {
      if (describe(error) === 'ENOENT') return null;
      throw this.#refuseTheCacheFile('could not be opened', error);
    }
    try {
      const declared = fstatSync(handle).size;
      if (declared > MAX_TOKEN_CACHE_BYTES) throw this.#refuseTheCacheFile(oversize(), null);
      // One byte of headroom, so a file that grew between the stat and the read
      // is caught by the same gate rather than being silently truncated.
      const buffer = Buffer.allocUnsafe(declared + 1);
      let filled = 0;
      for (;;) {
        const read = readSync(handle, buffer, filled, buffer.byteLength - filled, null);
        if (read === 0) break;
        filled += read;
        if (filled > MAX_TOKEN_CACHE_BYTES) throw this.#refuseTheCacheFile(oversize(), null);
        if (filled === buffer.byteLength) break;
      }
      return buffer.subarray(0, filled);
    } catch (error) {
      if (error instanceof SdkTokenCacheError) throw error;
      throw this.#refuseTheCacheFile('could not be read', error);
    } finally {
      try {
        closeSync(handle);
      } catch {
        // Nothing left to do with a descriptor that will not close.
      }
    }
  }

  /** The one refusal for a cache file that cannot be used. */
  #refuseTheCacheFile(problem: string, error: unknown): SdkTokenCacheError {
    const native = error === null || error === undefined ? '' : `: ${describe(error)}`;
    return new SdkTokenCacheError(
      `the token cache ${problem}. It is not read as empty: this file is keyed by ` +
        'credentials namespace and is meant to be shared, so rewriting it from an empty ' +
        'snapshot would discard every other namespace in it. Repair or move the file, ' +
        `or pass tokenCachePath: null to keep the token in memory. Path: ${this.path}` +
        native,
    );
  }

  /** The refusal for an entry that is there and cannot be used. */
  #refuseTheCacheEntry(problem: string): SdkTokenCacheError {
    return new SdkTokenCacheError(
      `the cached token record is not usable: ${problem}. It is not read as absent: an ` +
        'entry that exists and cannot be understood is a corrupt cache, and reading it ' +
        'as empty would hide that behind an authentication on every call. Clear the ' +
        `entry, or pass tokenCachePath: null to keep the token in memory. Path: ${this.path}`,
    );
  }

  #writeAll(all: Record<string, unknown>): void {
    try {
      mkdirSync(dirname(this.path), { recursive: true });
      // Written to a sibling and renamed, so a reader never sees half a file.
      const temporary = `${this.path}.${currentPid()}.tmp`;
      writeFileSync(temporary, JSON.stringify(all), { mode: 0o600 });
      renameSync(temporary, this.path);
    } catch {
      // The token still works for this process; only the sharing is lost.
    }
  }
}

/** The one wording for a cache file past the ceiling, used from two gates. */
function oversize(): string {
  return (
    `is larger than the ${MAX_TOKEN_CACHE_BYTES}-byte ceiling this SDK reads it to, ` +
    'so it was not loaded'
  );
}

/** What one lock stamp says about who wrote it. */
interface LockHolder {
  pid: number;
  /** '' when the stamp names no host, which makes every pid rule fall back to age. */
  host: string;
}

/**
 * The stamp written into a lock: pid, host, timestamp, serial.
 *
 * The serial is what separates two stores in one process that stamp inside the
 * same millisecond, so release can tell one holder's lock from the other's. The
 * timestamp is for a human reading the file; staleness is judged from the mtime,
 * never from this, because a clock the holder set is not one this reader shares.
 */
function buildLockStamp(): string {
  lockSerial = (lockSerial + 1) % Number.MAX_SAFE_INTEGER;
  return `${currentPid()} ${LOCK_HOST_FIELD}${lockHost()} ${new Date().toISOString()} ${lockSerial}\n`;
}

/** Read the pid and host out of a lock, or null when it carries neither usably. */
function readLockHolder(lockPath: string): LockHolder | null {
  let content: string;
  try {
    content = readFileSync(lockPath, 'utf8');
  } catch {
    return null;
  }
  const fields = content.trim().split(/\s+/).filter((field) => field !== '');
  const first = fields[0];
  if (first === undefined) return null;
  const pid = Number(first);
  if (!Number.isInteger(pid) || pid <= 0) return null;
  let host = '';
  for (const field of fields.slice(1)) {
    if (field.startsWith(LOCK_HOST_FIELD)) {
      host = field.slice(LOCK_HOST_FIELD.length);
      break;
    }
  }
  return { pid, host };
}

/**
 * Whether a pid names a process that is still running.
 *
 * Signal 0 is delivered to nothing and answers only whether it could be. Only
 * `ESRCH` - no such process - is read as death. Everything else is read as
 * alive, `EPERM` above all: a running process owned by another user refuses the
 * signal, and treating that refusal as death would take the lock away from a
 * holder that is still using it. A host with no `process.kill` cannot ask at
 * all, and answers alive for the same reason.
 *
 * A holder this cannot see through - a zombie, a pid already reused - keeps the
 * lock until the age gate reaches it.
 */
function processIsRunning(pid: number): boolean {
  if (pid <= 0) return false;
  try {
    if (typeof process === 'undefined' || typeof process.kill !== 'function') return true;
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return describe(error) !== 'ESRCH';
  }
}

/**
 * This machine's name, or '' when it has none this module can compare.
 *
 * Whitespace is rejected because a stamp is whitespace-separated, so a host name
 * carrying a space would be read back as a different name than was written.
 */
function lockHost(): string {
  try {
    const name = hostname();
    return typeof name === 'string' && name !== '' && !/\s/.test(name) ? name : '';
  } catch {
    return '';
  }
}

/** This process's id, or 0 where the host exposes none. 0 never matches a stamp. */
function currentPid(): number {
  try {
    if (typeof process === 'undefined') return 0;
    const pid: unknown = process.pid;
    return typeof pid === 'number' && Number.isInteger(pid) && pid > 0 ? pid : 0;
  } catch {
    return 0;
  }
}

/** One environment variable, or undefined on a host that shims `process` away. */
function readEnv(name: string): string | undefined {
  try {
    if (typeof process === 'undefined') return undefined;
    const value = process.env?.[name];
    return value === undefined || value === '' ? undefined : value;
  } catch {
    return undefined;
  }
}

/** A filesystem failure's errno name, or its message when it carries none. */
function describe(error: unknown): string {
  const code: unknown = (error as { code?: unknown } | null | undefined)?.code;
  if (typeof code === 'string' && code !== '') return code;
  return error instanceof Error ? error.message : String(error);
}

/** Say it once, where the host has somewhere to say it. Silence is not an error. */
function warn(message: string): void {
  try {
    if (typeof process === 'undefined' || typeof process.emitWarning !== 'function') return;
    process.emitWarning(message, 'ExsitedTokenLockWarning');
  } catch {
    // A partial `process` shim is not a reason to fail a token write.
  }
}

function sleep(ms: number): void {
  // Synchronous by design: `withLock` takes a synchronous `work`, so the whole
  // acquire-run-release has to complete without yielding to the event loop. An
  // async wait would let another call in this process interleave into it. It is
  // also why LOCK_WAIT_MS is short - every millisecond of it is a millisecond
  // this process does nothing else.
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
