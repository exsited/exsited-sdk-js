/** Several instances open at once. Cached **by position**: unnamed entries would collide. */

import {readClientName, SdkConfig} from '../config/sdkConfig.js';
import {
    copyBlocks,
    type CredentialsBlock,
    getRegisteredInstances,
    indexDeclaredNames,
    type InstanceSelector,
    listInstanceNames,
    readInstanceBlocks,
    registerInstances,
} from '../config/selectCredentials.js';
import {SdkError, SdkUsageError} from '../errors.js';
import {ExsitedClient} from './exsitedClient.js';

export {getRegisteredInstances, listInstanceNames, registerInstances};

const INDEX_LABEL_PATTERN = /^<index \d+>$/;

/** Name what was passed where a client was expected, without invoking its `toString`. */
function describeClient(value: unknown): string {
    if (value === null) return 'null';
    if (typeof value !== 'object') return typeof value;
    try {
        const name: unknown = (value as {constructor?: {name?: unknown}}).constructor?.name;
        return typeof name === 'string' && name ? `a ${name}` : 'an object';
    } catch {
        return 'an object';
    }
}

/** A collection of clients, one per instance, built on first use from blocks snapshotted at construction. */
export class ClientRegistry {
    readonly #credentials: CredentialsBlock[];
    readonly #names: Map<string, number>;
    readonly #labels: string[];
    readonly #clients = new Map<number, ExsitedClient>();
    /** Positions whose client the caller supplied, so `closeAllClients` leaves them open. */
    readonly #supplied = new Set<number>();

    constructor(credentials: Iterable<CredentialsBlock>) {
        const blocks = copyBlocks(readInstanceBlocks(credentials, 'ClientRegistry'));
        this.#credentials = blocks;
        this.#names = indexDeclaredNames(blocks);
        this.#labels = blocks.map((block, index) => readClientName(block) || `<index ${index}>`);
    }

    /** The position a name or index selects. */
    resolveIndex(name: InstanceSelector | null = null): number {
        if (name === null || name === undefined) return 0;
        if (typeof name === 'number' && Number.isInteger(name)) {
            const length = this.#credentials.length;
            if (-length <= name && name < length) return ((name % length) + length) % length;
            throw new SdkUsageError(`no instance at index ${name}; ${length} registered (0-${length - 1})`);
        }
        const found = typeof name === 'string' ? this.#names.get(name) : undefined;
        if (found !== undefined) return found;
        throw new SdkUsageError(
            `unknown instance ${JSON.stringify(name)}; registered: ${this.listClientNames().join(', ')}`,
        );
    }

    /** The client for one instance, built on first use. */
    getClient(name: InstanceSelector | null = null): ExsitedClient {
        const index = this.resolveIndex(name);
        let client = this.#clients.get(index);
        if (!client) {
            client = new ExsitedClient(SdkConfig.fromCredentials(this.#credentials, {instance: index}));
            this.#clients.set(index, client);
        }
        return client;
    }

    /** Add an already-built client under a new name; its lifetime stays the caller's. */
    addClient(name: string, client: ExsitedClient): void {
        if (typeof name !== 'string' || !name.trim()) {
            throw new SdkUsageError(`addClient needs a non-blank string name; got ${JSON.stringify(name)}`);
        }
        if (!(client instanceof ExsitedClient)) {
            throw new SdkUsageError(
                `addClient(${JSON.stringify(name)}) needs an ExsitedClient; got ${describeClient(client)} - ` +
                    'build one with buildClient() or new ExsitedClient(config)',
            );
        }
        if (!(client.config instanceof SdkConfig)) {
            throw new SdkUsageError(
                `addClient(${JSON.stringify(name)}): the client's config is not an SdkConfig, so the registry could ` +
                    'not build a second client from this instance',
            );
        }
        if (INDEX_LABEL_PATTERN.test(name)) {
            throw new SdkUsageError(
                `${JSON.stringify(name)} is the label an entry with no clientName already carries; pick a name that cannot collide with a position`,
            );
        }
        if (this.#names.has(name) || this.#labels.includes(name)) {
            throw new SdkUsageError(`instance ${JSON.stringify(name)} is already registered`);
        }
        this.#credentials.push(client.config);
        const index = this.#credentials.length - 1;
        this.#names.set(name, index);
        this.#labels.push(name);
        this.#clients.set(index, client);
        this.#supplied.add(index);
    }

    /** Every instance label, in selection order. */
    listClientNames(): string[] {
        return [...this.#labels];
    }

    /** Close every client this registry built, dropping all of them even on failure. */
    async closeAllClients(): Promise<void> {
        const built = [...this.#clients.keys()].filter((index) => !this.#supplied.has(index)).sort((a, b) => a - b);
        const failures: string[] = [];
        let first: unknown = null;
        try {
            for (const index of built) {
                try {
                    await (this.#clients.get(index) as ExsitedClient).closeClient();
                } catch (failure) {
                    failures.push(
                        `${this.#labels[index]}: ${failure instanceof Error ? failure.message : String(failure)}`,
                    );
                    if (first === null) first = failure;
                }
            }
        } finally {
            for (const index of built) this.#clients.delete(index);
        }
        if (first !== null) {
            throw new SdkError(
                `${failures.length} of ${built.length} clients failed to close (${failures.join('; ')}); all of them were attempted and dropped, so the registry is usable again`,
            );
        }
    }
}
