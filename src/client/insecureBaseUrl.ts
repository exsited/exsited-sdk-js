/** The one warning a plaintext `baseUrl` deserves, said once per host; run by the client, since a config has no side effects. */

import {InsecureTransportWarning} from '../errors.js';

/** Hosts where `http://` reaches nothing but this machine; the numeric loopback range is {@link isLoopbackHost}'s. */
export const LOOPBACK_HOSTNAMES: ReadonlySet<string> = new Set(['localhost', 'localhost.localdomain']);

/**
 * Whether a parsed URL's `hostname` refers only to this machine. Parsed, never resolved: a DNS lookup would make
 * building a client do network I/O.
 */
export function isLoopbackHost(hostname: string | null | undefined): boolean {
    if (hostname === null || hostname === undefined || hostname === '') return false;
    const host = hostname.toLowerCase();
    if (LOOPBACK_HOSTNAMES.has(host)) return true;
    // The whole of 127.0.0.0/8: a second local service on 127.0.0.2 is just as local.
    const quad = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
    if (quad !== null) {
        const octets = quad.slice(1).map(Number);
        if (octets.every((octet) => octet <= 255)) return octets[0] === 127;
        return false;
    }
    if (host.startsWith('[') && host.endsWith(']')) return isIpv6Loopback(host.slice(1, -1));
    return false;
}

/** Whether an IPv6 literal is `::1` in any spelling; an IPv4-mapped `::ffff:127.0.0.1` is not. */
function isIpv6Loopback(literal: string): boolean {
    // A zone id (`%eth0`) is scoping, not address, and never appears on loopback.
    const address = literal.split('%')[0] ?? '';
    if (address.includes('.')) return false;
    const halves = address.split('::');
    if (halves.length > 2) return false;
    const head = (halves[0] ?? '').split(':').filter((group) => group !== '');
    const tail = halves.length === 2 ? (halves[1] ?? '').split(':').filter((g) => g !== '') : [];
    const explicit = head.length + tail.length;
    if (halves.length === 1 ? explicit !== 8 : explicit > 8) return false;
    const groups = halves.length === 1 ? head : [...head, ...Array(8 - explicit).fill('0'), ...tail];
    return groups.every((group, index) => {
        if (!/^[0-9a-f]{1,4}$/.test(group)) return false;
        return Number.parseInt(group, 16) === (index === 7 ? 1 : 0);
    });
}

/** Base URLs already warned about in this process: once per host, since `process.emitWarning` does not deduplicate. */
const warnedAbout = new Set<string>();

/** For tests: forget what has already been warned about. */
export function resetPlaintextWarnings(): void {
    warnedAbout.clear();
}

/** Warn, once, when `baseUrl` sends credentials over plaintext to another host; answers the message, or `null`. */
export function warnAboutPlaintextBaseUrl(baseUrl: string): string | null {
    let parsed: URL;
    try {
        parsed = new URL(baseUrl);
    } catch {
        return null;
    }
    if (parsed.protocol !== 'http:') return null;
    if (isLoopbackHost(parsed.hostname)) return null;
    const key = `${parsed.protocol}//${parsed.host}`;
    if (warnedAbout.has(key)) return null;
    warnedAbout.add(key);
    const message =
        `baseUrl uses http://, so every request to ${parsed.hostname} crosses the ` +
        'network in cleartext - the bearer token on each call, and the clientId and ' +
        'clientSecret in the token request itself. Anything on the path can read ' +
        'them and act as this client until the secret is rotated. Use https:// ' +
        'unless this is a local development instance.';
    emitWarning(message);
    return message;
}

function emitWarning(message: string): void {
    try {
        if (typeof process === 'undefined' || typeof process.emitWarning !== 'function') return;
        process.emitWarning(message, {type: 'InsecureTransportWarning', ctor: InsecureTransportWarning});
    } catch {
        // A partial `process` shim is not a reason to fail building a client.
    }
}
