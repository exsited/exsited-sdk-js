/**
 * The v4 paging block, in any of its three shapes: a response fills only one of them and the others read `null`.
 * `hasMore` is present only on the cursor shape, `records` only on the offset shape, and `hasNext` only on the
 * external database listings' shape, which is how to tell them apart.
 */

import {Dto, sealDtoSchema} from '../../dto.js';

/** A {@link Pagination}'s `links`. */
export class PaginationLinks extends Dto {
    static override FIELDS = {
        next: 'string',
        prev: 'string',
    } as const;

    next = this.declared<string | null>('next');
    prev = this.declared<string | null>('prev');
}

export class Pagination extends Dto {
    static override FIELDS = {
        limit: 'int',
        hasMore: 'boolean',
        nextCursor: 'string',
        prevCursor: 'string',
        links: PaginationLinks,
        records: 'int',
        offset: 'int',
        nextPage: 'string',
        previousPage: 'string',
        hasNext: 'boolean',
        hasPrev: 'boolean',
        perPage: 'int',
    } as const;

    /** The one field the cursor and offset shapes share. */
    limit = this.declared<number | null>('limit');
    /** Authoritative over `next_cursor`, which can be stale on the last page. */
    hasMore = this.declared<boolean | null>('hasMore');
    nextCursor = this.declared<string | null>('nextCursor');
    prevCursor = this.declared<string | null>('prevCursor');
    /** Relative `next` and `prev` URLs. */
    links = this.declared<PaginationLinks | null>('links');
    /** Total matching records, not the page's length. */
    records = this.declared<number | null>('records');
    offset = this.declared<number | null>('offset');
    /**
     * **The literal string `"NULL"` at the end of a listing, not `null`**, though a
     * real `null` and a URL also occur. Compare against the string; a truthiness
     * test follows `"NULL"` as though it were a link.
     */
    nextPage = this.declared<string | null>('nextPage');
    /**
     * **`""` or `null`, never a URL**, even on a page that has a previous one.
     * There is no backward paging on this shape.
     */
    previousPage = this.declared<string | null>('previousPage');
    /** The external database listings page with these three instead. */
    hasNext = this.declared<boolean | null>('hasNext');
    hasPrev = this.declared<boolean | null>('hasPrev');
    perPage = this.declared<number | null>('perPage');
}

sealDtoSchema(PaginationLinks, Pagination);
