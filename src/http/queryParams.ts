/**
 * Normalises query **values**, never names: v4 names are snake_case on the wire and nothing converts them.
 * The flat filter form `filter_<field>[_<operator>]` is built by {@link filterParam}; the expression form, one
 * `filter` carrying something like `items/status eq 'ACTIVE'`, and `expand=all` pass through as written.
 */

import {SdkUsageError} from '../errors.js';
import {MAX_REDACTION_DEPTH} from '../redaction.js';

type QueryLeaf = string | number | bigint | boolean | Date;
export type QueryValue = QueryLeaf | null | undefined | ReadonlyArray<QueryLeaf | null | undefined>;
export type QueryParams = Readonly<Record<string, QueryValue>> | ReadonlyMap<string, QueryValue>;

/** A normalised query: each name against its wire value, or the list of them a repeated name sends. */
export type NormalisedQuery = Record<string, unknown>;

/**
 * Sort direction for the families that spell sorting as `sort=-field`. The `order_by` and `direction` families
 * build their pair with their own `sortParams`; the wrong spelling is accepted and silently ignored.
 */
export const SortDirection = Object.freeze({ASC: 'asc', DESC: 'desc'} as const);
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

/**
 * The filter comparisons, as the suffix after the field name; `eq` is no suffix at all. The union of the four
 * per-type lists the API serves; `starts_with` is accepted but matches nothing.
 */
export const FILTER_OPERATORS = Object.freeze([
    'eq',
    'neq',
    'in',
    'nin',
    'contains',
    'not_contains',
    'starts_with',
    'gt',
    'gte',
    'lt',
    'lte',
    'has_value',
    'does_not_have_value',
] as const);
export type FilterOperator = (typeof FILTER_OPERATORS)[number];

/** Presence checks whose value is never read; pass `true`, since a `null` value drops the whole filter. */
export const PRESENCE_OPERATORS = Object.freeze(['has_value', 'does_not_have_value'] as const);

/** The two operators that take a comma-separated list; build the value with {@link filterValues}. */
export const LIST_OPERATORS = Object.freeze(['in', 'nin'] as const);

/** The query name of a flat filter: `filterParam('status')` is `filter_status`, with `'neq'` `filter_status_neq`. */
export function filterParam(field: string, operator: FilterOperator = 'eq'): string {
    if (typeof field !== 'string' || field.trim() === '') {
        throw new SdkUsageError(`filter field: expected a name like 'status', got ${JSON.stringify(field)}`);
    }
    if (!FILTER_OPERATORS.includes(operator)) {
        throw new SdkUsageError(
            `filter operator ${JSON.stringify(operator)}: expected one of ${FILTER_OPERATORS.join(', ')}`,
        );
    }
    const stem = `filter_${field.trim()}`;
    return operator === 'eq' ? stem : `${stem}_${operator}`;
}

/** One comma-separated value for an `in` or `nin` filter; a list would send the name twice and match the last. */
export function filterValues(values: ReadonlyArray<string | number | boolean | Date>): string {
    if (!Array.isArray(values)) {
        throw new SdkUsageError(
            `filter values: expected an array of values like ['ACTIVE', 'INACTIVE'], got ${JSON.stringify(values)}`,
        );
    }
    const rendered: string[] = [];
    for (const value of values as unknown[]) {
        if (value === null || value === undefined) {
            throw new SdkUsageError(
                "filter values: a member is null, which has no value to match; drop it, or use the 'does_not_have_value' " +
                    "operator if what was meant is 'this field is unset'",
            );
        }
        const text = String(normaliseQueryValue(value, 'filter values', new Set(), 1));
        if (text.includes(',')) {
            throw new SdkUsageError(
                `filter values: the member ${JSON.stringify(text)} contains a comma, which the API reads as the separator ` +
                    'between two values, so it would match something other than what was asked for',
            );
        }
        rendered.push(text);
    }
    if (rendered.length === 0) {
        throw new SdkUsageError(
            "filter values: expected at least one value; an empty 'in' filter is sent as 'filter_<field>_in=' and " +
                "answered 200 with no rows, which reads as 'nothing matched' rather than as the mistake it is",
        );
    }
    return rendered.join(',');
}

/** The `sort` value for one field: the field itself ascending, `-field` descending. */
export function sortParam(field: string, direction: SortDirection = SortDirection.ASC): string {
    if (typeof field !== 'string' || field.trim() === '') {
        throw new SdkUsageError(`sort field: expected a name like 'created_on', got ${JSON.stringify(field)}`);
    }
    if (direction !== SortDirection.ASC && direction !== SortDirection.DESC) {
        throw new SdkUsageError(`sort direction ${JSON.stringify(direction)}: expected 'asc' or 'desc'`);
    }
    return direction === SortDirection.ASC ? field.trim() : `-${field.trim()}`;
}

/** Whether a value is a plain object rather than an array or a class instance. */
function isPlainMapping(value: unknown): boolean {
    if (value === null || typeof value !== 'object') return false;
    if (Array.isArray(value)) return false;
    if (value instanceof Date) return false;
    if (ArrayBuffer.isView(value)) return false;
    const proto: unknown = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

/** Whether a value is a sequence to expand into repeated names; a string is one value. */
function isIterableNonString(value: unknown): value is Iterable<unknown> {
    if (typeof value === 'string') return false;
    if (value == null) return false;
    if (ArrayBuffer.isView(value)) return false;
    return typeof (value as {[Symbol.iterator]?: unknown})[Symbol.iterator] === 'function';
}

/** The type name to quote when `params` is not a key/value object. */
function describeParams(params: unknown): string {
    if (Array.isArray(params)) return 'array';
    if (params instanceof Set) return 'set';
    return typeof params;
}

/** The `(name, value)` pairs of `params`; a `Map` is read by its own entries, which `Object.entries` cannot see. */
function queryParamEntries(params: unknown): Array<[string, unknown]> {
    if (params instanceof Map) {
        return [...params].map(([key, value]: [unknown, unknown]) => [
            typeof key === 'string' ? key : String(key),
            value,
        ]);
    }
    if (typeof params === 'object' && params !== null && !Array.isArray(params) && !isIterableNonString(params)) {
        return Object.entries(params as Record<string, unknown>);
    }
    throw new SdkUsageError(
        `query params: expected an object of names to values, got ${describeParams(params)}; ` +
            'to send one name twice give it a list, as in {limit: [5, 6]}',
    );
}

/** Normalise query parameter values for the wire; keys pass through untouched. */
export function buildQueryParams(params: QueryParams | null | undefined = null): NormalisedQuery {
    if (params == null) return {};
    // Prototype-less while filled, so `__proto__` is recorded as a parameter; restored before it is answered.
    const normalised = Object.create(null) as NormalisedQuery;
    for (const [key, value] of queryParamEntries(params)) {
        if (value === null || value === undefined) continue;
        normalised[key] = normaliseQueryValue(value, key, new Set(), 0);
    }
    return Object.setPrototypeOf(normalised, Object.prototype) as NormalisedQuery;
}

function normaliseQueryValue(value: unknown, key: string, seen: Set<object>, depth: number): unknown {
    if (depth >= MAX_REDACTION_DEPTH) {
        throw new SdkUsageError(
            `query param ${JSON.stringify(key)}: nested more than ${MAX_REDACTION_DEPTH} levels deep, which is too deep to encode in a query string`,
        );
    }
    // Before the iterable branch: a Map iterates as `[key, value]` pairs, which have no unambiguous encoding.
    if (value instanceof Map) throw nestedMappingError(key);
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) {
            // `.toISOString()` would throw a bare `RangeError`, not an `SdkError`.
            throw new SdkUsageError(
                `query param ${JSON.stringify(key)}: an invalid Date has no ISO 8601 form; pass a valid Date or an ISO 8601 string`,
            );
        }
        return value.toISOString();
    }
    // Before the nested-object refusal: a sequence has a query form, one repeated name; a nested bag does not.
    if (isIterableNonString(value)) {
        const container = value as object;
        if (seen.has(container)) {
            throw new SdkUsageError(
                `query param ${JSON.stringify(key)}: the value refers to itself, so it has no finite query-string encoding`,
            );
        }
        if (depth >= 1) {
            // Refused, not stringified: the encoder would turn `[1, 2]` into the one value `1,2`, a guess at intent.
            throw new SdkUsageError(
                `query param ${JSON.stringify(key)}: a sequence inside a sequence has no query-string encoding; flatten it to one list of scalars`,
            );
        }
        const nextSeen = new Set(seen);
        nextSeen.add(container);
        const out: unknown[] = [];
        for (const entry of value) {
            if (entry === null || entry === undefined) continue;
            out.push(normaliseQueryValue(entry, key, nextSeen, depth + 1));
        }
        return out;
    }
    if (isPlainMapping(value)) throw nestedMappingError(key);
    return wireQueryLeaf(value, key);
}

/** One leaf as the wire will carry it, settled now, since a `toString` may answer differently after the grant. */
function wireQueryLeaf(value: unknown, key: string): unknown {
    const kind = typeof value;
    if (kind === 'string' || kind === 'number' || kind === 'bigint') return value;
    try {
        return String(value);
    } catch (error) {
        throw new SdkUsageError(
            `query param ${JSON.stringify(key)}: its value has no text form ` +
                `(${error instanceof Error ? error.message : String(error)}); pass a string, a number, a boolean, a Date or a list of those`,
        );
    }
}

function nestedMappingError(key: string): SdkUsageError {
    return new SdkUsageError(
        `query param ${JSON.stringify(key)}: nested objects cannot be encoded in a query string; flatten it or send it in the body`,
    );
}
