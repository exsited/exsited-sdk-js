/** The usages endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './usagesUrls.js';
import {Usage, UsageList, UsageUpdated, Usages} from './usagesDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/** The key a listing puts its records under. */
export const RECORD_KEY = 'data';

function requireValue(value: unknown, what: string): void {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        throw new SdkUsageError(`${what} is required: the request cannot be built without it`);
    }
}

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/**
 * `GET /api/{api_version}/usages`
 *
 * Recorded status codes: 200.
 */
export function getUsages(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<UsageList>> {
    return client.sendGetRequest<UsageList>(urls.USAGES, {
        queryParams,
        dtoType: UsageList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/usages`
 *
 * Recorded status codes: 201.
 */
export function createUsage(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Usages>> {
    requirePayload(payload);
    return client.sendPostRequest<Usages>(urls.USAGES, {
        jsonBody: payload,
        dtoType: Usages,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/usages/{usage_id}`
 *
 * Recorded status codes: 404, 200.
 */
export function getUsage(
    client: ExsitedClient,
    usageId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Usage>> {
    requireValue(usageId, 'usage_id');
    return client.sendGetRequest<Usage>(urls.USAGE, {
        pathParams: {usage_id: usageId},
        queryParams,
        dtoType: Usage,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/usages/{usage_id}`
 *
 * Recorded status codes: 404.
 *
 * No typed view, so `.dto` is null.
 */
export function deleteUsage(
    client: ExsitedClient,
    usageId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(usageId, 'usage_id');
    return client.sendDeleteRequest<never>(urls.USAGE, {
        pathParams: {usage_id: usageId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/usages/{usage_id}`
 *
 * Recorded status codes: 200.
 */
export function updateUsage(
    client: ExsitedClient,
    usageId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<UsageUpdated>> {
    requireValue(usageId, 'usage_id');
    requirePayload(payload);
    return client.sendPatchRequest<UsageUpdated>(urls.USAGE, {
        pathParams: {usage_id: usageId},
        jsonBody: payload,
        dtoType: UsageUpdated,
        ...options,
    });
}

/**
 * `PUT /api/{api_version}/usages/{usage_id}`
 *
 * Recorded status codes: 200.
 */
export function replaceUsage(
    client: ExsitedClient,
    usageId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<UsageUpdated>> {
    requireValue(usageId, 'usage_id');
    requirePayload(payload);
    return client.sendPutRequest<UsageUpdated>(urls.USAGE, {
        pathParams: {usage_id: usageId},
        jsonBody: payload,
        dtoType: UsageUpdated,
        ...options,
    });
}
