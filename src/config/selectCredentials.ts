/**
 * The process-wide instance registration `buildClient()` selects from, and the list checks the registry shares.
 * Kept apart from `client/clientRegistry.ts`, which re-exports it, so `buildClient` needs no import cycle.
 */

import {AuthConfig} from './authConfig.js';
import {readClientName, SdkConfig, selectCredentials} from './sdkConfig.js';
import {SdkUsageError} from '../errors.js';

export {readClientName, selectCredentials};

/** One registered instance: a full config, the credentials to build one from, or a plain object of config fields. */
export type CredentialsBlock = SdkConfig | AuthConfig | Readonly<Record<string, unknown>>;

/** Which instance: a position, or a `clientName`. Omit it for the first. */
export type InstanceSelector = number | string;

/** One label per entry, for a message; an unnamed entry reports its position. */
export function labelCredentials(credentials: readonly unknown[]): string[] {
    return credentials.map((block, index) => readClientName(block) || `<index ${index}>`);
}

/** The list as an array, refusing a single block passed where a list was meant. */
export function readInstanceBlocks(credentials: Iterable<CredentialsBlock>, entryPoint: string): CredentialsBlock[] {
    if (
        credentials == null ||
        typeof credentials === 'string' ||
        credentials instanceof SdkConfig ||
        credentials instanceof AuthConfig ||
        (typeof credentials === 'object' && typeof (credentials as Iterable<unknown>)[Symbol.iterator] !== 'function')
    ) {
        throw new SdkUsageError(
            `${entryPoint} takes a list of instances, not a single block; wrap it in a list: ${entryPoint}([block])`,
        );
    }
    if (typeof (credentials as Iterable<CredentialsBlock>)[Symbol.iterator] !== 'function') {
        throw new SdkUsageError(`${entryPoint} takes a list of instances; ${typeof credentials} is not a list`);
    }
    const blocks = [...credentials];
    if (blocks.length === 0) throw new SdkUsageError(`${entryPoint} needs at least one credentials block`);
    return blocks;
}

/** Map each `clientName` to its position, refusing a name two entries answer to. */
export function indexDeclaredNames(credentials: readonly unknown[]): Map<string, number> {
    const declared = new Map<string, number>();
    for (const [index, block] of credentials.entries()) {
        // Left unindexed: `AuthConfig` rejects a nameless block with a better error.
        const name = readClientName(block);
        if (name == null) continue;
        const earlier = declared.get(name);
        if (earlier !== undefined) {
            throw new SdkUsageError(
                `two instances share clientName ${JSON.stringify(name)} (positions ${earlier} and ${index}); names must be unique so one can be told from the other`,
            );
        }
        declared.set(name, index);
    }
    return declared;
}

/** A selector as a position in the list, shared with `ClientRegistry.resolveIndex`. */
export function resolvePosition(credentials: readonly unknown[], instance?: InstanceSelector | null): number {
    if (instance === undefined || instance === null) return 0;
    if (typeof instance === 'number') {
        const size = credentials.length;
        if (!Number.isInteger(instance)) {
            throw new SdkUsageError(`instance: an index must be a whole number, got ${JSON.stringify(instance)}`);
        }
        if (instance >= -size && instance < size) return ((instance % size) + size) % size;
        throw new SdkUsageError(`no instance at index ${instance}; ${size} registered (0-${size - 1})`);
    }
    if (typeof instance === 'string') {
        const found = indexDeclaredNames(credentials).get(instance);
        if (found !== undefined) return found;
        throw new SdkUsageError(
            `unknown instance ${JSON.stringify(instance)}; registered: ${labelCredentials(credentials).join(', ')}`,
        );
    }
    throw new SdkUsageError(`instance must be omitted, an index or a clientName, got ${typeof instance}`);
}

/** Snapshot the blocks, so a caller mutating what they passed cannot change the registry. */
export function copyBlocks(blocks: readonly CredentialsBlock[]): CredentialsBlock[] {
    return blocks.map((block) =>
        block && typeof block === 'object' && !(block instanceof SdkConfig) && !(block instanceof AuthConfig)
            ? (structuredClone(block) as CredentialsBlock)
            : block,
    );
}

let registeredInstances: CredentialsBlock[] = [];

/** Register the credential blocks `buildClient()` selects from; the first is the default, a later call replaces all. */
export function registerInstances(credentials: Iterable<CredentialsBlock>): void {
    const blocks = readInstanceBlocks(credentials, 'registerInstances');
    indexDeclaredNames(blocks);
    registeredInstances = copyBlocks(blocks);
}

/** The registered blocks, as a copy; throws if nothing has been registered yet. */
export function getRegisteredInstances(): CredentialsBlock[] {
    if (!registeredInstances.length) {
        throw new SdkUsageError(
            'no instances registered - call registerInstances([...]) first, or pass credentials to buildClient()',
        );
    }
    return copyBlocks(registeredInstances);
}

/** Every registered instance name, in selection order; an unnamed block reports its position. */
export function listInstanceNames(): string[] {
    return labelCredentials(getRegisteredInstances());
}

/** Forget the process-wide registration, so one test cannot leave instances visible to the next. */
export function resetRegisteredInstances(): void {
    registeredInstances = [];
}
