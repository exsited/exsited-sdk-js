/**
 * Walking a paginated listing without hand-rolling the loop.
 *
 * **v4 serves two paging shapes, split by resource, and this walks both.**
 *
 * Cursor - the account, item and invoice families:
 * ```json
 * {"object":"list","data":[…],
 *  "pagination":{"limit":5,"has_more":true,"next_cursor":"XCY2e7…"}}
 * ```
 *
 * Offset - documented for the payment, refund and purchase families:
 * ```json
 * {"pagination":{"records":14,"limit":20,"offset":0,
 *                "previous_page":"","next_page":"NULL"}}
 * ```
 *
 * Two traps in the offset shape:
 *
 * - **`next_page` is the literal string `"NULL"`** at the end of a listing. A
 *   truthiness test follows `"NULL"` as though it were a link.
 * - **A `next_page` link can point at another path**, so this walker re-sends
 *   the request with an incremented `offset` rather than following the link at
 *   all.
 */

import {SdkError, SdkUsageError} from '../errors.js';
import type {QueryParams} from '../http/queryParams.js';
import type {ApiResponse} from './apiResponse.js';
import type {ExsitedClient, SendOptions} from './exsitedClient.js';

/** The query parameter carrying a cursor. Owned by {@link iterPages}. */
export const CURSOR_PARAM = 'cursor';
export const OFFSET_PARAM = 'offset';
export const LIMIT_PARAM = 'limit';

/**
 * The envelope key holding a page's records. A family's own `RECORD_KEY`
 * settles it, and every family that ships one exports `'data'`.
 */
export const DEFAULT_RECORD_KEY = 'data';

/** The string the offset shape uses to mean "no next page". */
export const NO_NEXT_PAGE = 'NULL';

export interface PageOptions extends Omit<SendOptions, 'queryParams'> {
    queryParams?: QueryParams | undefined;
    /**
     * The envelope key holding each page's records.
     *
     * Only consulted to count a page when an offset block carries no usable
     * `limit`. It matters for an envelope whose records are not under `data`:
     * counting under the wrong key answers 0 and ends the walk after a single
     * page, reporting success. Pass that family's `RECORD_KEY`.
     * {@link iterRecords} passes its own down. Every family shipped here exports
     * `RECORD_KEY = 'data'`, so the default is right for every listing in this SDK.
     */
    recordKey?: string | undefined;
    /** Stop after this many pages. Omit to walk to the end. */
    maxPages?: number;
    /**
     * With the default `true`, a failed page raises. A loop that quietly ends on a
     * `500` reads exactly like the listing ending, and the records after it are
     * silently lost.
     */
    raiseOnError?: boolean;
}

/**
 * Yield one {@link ApiResponse} per page.
 *
 * `queryParams` is re-sent with **every** page: a cursor identifies a position
 * within one particular filtered, sorted listing, so the filters have to travel
 * with it or the cursor addresses a different listing than it came from. The
 * same holds for an offset.
 *
 * @throws SdkUsageError when `queryParams` carries `cursor` or `offset`, which
 *   this owns - a caller's would be overwritten on the second page and silently
 *   ignored on the first.
 */
export async function* iterPages(
    client: ExsitedClient,
    path: string,
    options: PageOptions = {},
): AsyncGenerator<ApiResponse, void, undefined> {
    const {maxPages, raiseOnError = true, queryParams, recordKey = DEFAULT_RECORD_KEY, ...rest} = options;
    if (maxPages !== undefined && (!Number.isInteger(maxPages) || maxPages < 1)) {
        throw new SdkUsageError(`maxPages: expected a positive integer, got ${String(maxPages)}`);
    }
    for (const owned of [CURSOR_PARAM, OFFSET_PARAM]) {
        if (queryParams && owned in queryParams) {
            throw new SdkUsageError(
                `queryParams: ${JSON.stringify(owned)} is owned by iterPages, which sets it ` +
                    'from each page; to resume from a saved position call sendGetRequest directly',
            );
        }
    }

    const base: QueryParams = {...(queryParams ?? {})};
    const seenCursors = new Set<string>();
    const seenOffsets = new Set<number>();
    let pageParams: QueryParams = {...base};
    let pages = 0;

    for (;;) {
        const response = await client.sendGetRequest(path, {
            ...rest,
            queryParams: pageParams,
            raiseOnError,
        });
        yield response;
        pages += 1;

        if (!response.succeeded) return;
        if (maxPages !== undefined && pages >= maxPages) return;

        const block = readPagination(response.map);
        if (!block) return;

        const cursor = readNextCursor(block);
        if (cursor !== null) {
            if (seenCursors.has(cursor)) {
                throw new SdkError(
                    'pagination loop: the API handed back the same next_cursor a second ' +
                        'time, so following it again would never terminate - the pages ' +
                        'already yielded are good',
                );
            }
            seenCursors.add(cursor);
            pageParams = {...base, [CURSOR_PARAM]: cursor};
            continue;
        }

        const nextOffset = readNextOffset(block, countRecords(response.map, recordKey));
        if (nextOffset === null) return;
        if (seenOffsets.has(nextOffset)) {
            // A server that ignores the offset it was sent answers the same block every
            // time, so the computed "next" offset never moves. Stopping quietly would
            // read as the listing's end; this reports it as the server bug it is.
            throw new SdkError(
                `pagination loop: the walk arrived back at offset ${nextOffset}, so ` +
                    'advancing further would re-read records already yielded - the pages ' +
                    'already yielded are good',
            );
        }
        seenOffsets.add(nextOffset);
        pageParams = {...base, [OFFSET_PARAM]: nextOffset};
    }
}

/**
 * Yield each record of a listing, across every page. The record key is the third argument,
 * or `options.recordKey`; either may be omitted for {@link DEFAULT_RECORD_KEY}.
 */
export function iterRecords<T = unknown>(
    client: ExsitedClient,
    path: string,
    recordKey: string,
    options?: Omit<PageOptions, 'recordKey'>,
): AsyncGenerator<T, void, undefined>;
/** Yield each record of a listing, across every page, with the record key in `options`. */
export function iterRecords<T = unknown>(
    client: ExsitedClient,
    path: string,
    options?: PageOptions,
): AsyncGenerator<T, void, undefined>;
export async function* iterRecords<T = unknown>(
    client: ExsitedClient,
    path: string,
    recordKeyOrOptions?: string | PageOptions,
    maybeOptions?: PageOptions,
): AsyncGenerator<T, void, undefined> {
    const keyGiven = typeof recordKeyOrOptions === 'string';
    const options: PageOptions = (keyGiven ? maybeOptions : recordKeyOrOptions) ?? {};
    if (keyGiven && options.recordKey !== undefined) {
        throw new SdkUsageError('recordKey: pass it as the third argument or in options, not both');
    }
    const {recordKey = keyGiven ? recordKeyOrOptions : DEFAULT_RECORD_KEY, ...pageOptions} = options;
    if (typeof recordKey !== 'string' || recordKey.trim() === '') {
        throw new SdkUsageError(
            `recordKey: expected the envelope key holding the records, got ${JSON.stringify(recordKey)}`,
        );
    }
    let index = 0;
    for await (const page of iterPages(client, path, {
        ...pageOptions,
        recordKey,
        raiseOnError: true,
    })) {
        const body = page.map;
        const records =
            body !== null && typeof body === 'object' ? (body as Record<string, unknown>)[recordKey] : undefined;
        if (!Array.isArray(records)) {
            if (index > 0) {
                // A later page with no list under the key is the end of the records, not
                // a wrong key - yield nothing rather than raising mid-stream after
                // earlier pages were already consumed.
                index += 1;
                continue;
            }
            const available =
                body !== null && typeof body === 'object'
                    ? Object.keys(body as Record<string, unknown>)
                          .sort()
                          .join(', ')
                    : `a ${typeof body} body`;
            throw new SdkUsageError(
                `recordKey ${JSON.stringify(recordKey)}: this page has no list under that ` +
                    `key; it carries ${available}`,
            );
        }
        index += 1;
        yield* records as T[];
    }
}

function readPagination(body: unknown): Record<string, unknown> | null {
    if (body === null || typeof body !== 'object') return null;
    const block = (body as Record<string, unknown>)['pagination'];
    if (block === null || typeof block !== 'object' || Array.isArray(block)) return null;
    return block as Record<string, unknown>;
}

/**
 * The cursor for the next page, or null when this is not the cursor shape or the
 * listing has ended.
 *
 * `has_more` is authoritative and checked first: the last page of some listings
 * carries a stale `next_cursor` alongside `has_more: false`, and following it
 * re-fetches a page already yielded.
 */
export function readNextCursor(block: Record<string, unknown>): string | null {
    if ('has_more' in block && !block['has_more']) return null;
    const cursor = block['next_cursor'];
    return typeof cursor === 'string' && cursor.trim() !== '' ? cursor : null;
}

/**
 * The offset for the next page, or null at the end.
 *
 * `next_page` decides *whether* there is one - compared against the string
 * {@link NO_NEXT_PAGE}, never for truthiness - and the offset is then computed
 * rather than taken from the link, so a link to another path cannot drag the walk
 * off the listing.
 */
export function readNextOffset(block: Record<string, unknown>, recordsOnPage: number): number | null {
    if (!('next_page' in block)) return null;
    const next = block['next_page'];
    if (next === null || next === undefined) return null;
    if (typeof next === 'string' && (next.trim() === '' || next.trim().toUpperCase() === NO_NEXT_PAGE)) {
        return null;
    }
    const offset = block[OFFSET_PARAM];
    const limit = block[LIMIT_PARAM];
    const current = typeof offset === 'number' ? offset : 0;
    const step = typeof limit === 'number' && limit > 0 ? limit : recordsOnPage;
    if (step <= 0) return null;
    return current + step;
}

function countRecords(body: unknown, recordKey: string): number {
    if (body === null || typeof body !== 'object') return 0;
    const records = (body as Record<string, unknown>)[recordKey];
    return Array.isArray(records) ? records.length : 0;
}
