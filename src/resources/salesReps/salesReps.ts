/** The sales reps endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './salesRepsUrls.js';
import {SettingsSalesRep, SettingsSalesRepList} from './salesRepsDto.js';

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
 * `GET /api/{api_version}/settings/sales_reps`
 *
 * List sales reps.
 */
export function getSettingsSalesReps(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsSalesRepList>> {
    return client.sendGetRequest<SettingsSalesRepList>(urls.SETTINGS_SALES_REPS, {
        queryParams,
        dtoType: SettingsSalesRepList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/sales_reps`
 *
 * Create a sales rep; answers 400 validation_error, naming no field, even for a valid body.
 */
export function createSettingsSalesRep(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_SALES_REPS, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/sales_reps/{sales_rep_id}`
 *
 * Get one sales rep.
 */
export function getSettingsSalesRep(
    client: ExsitedClient,
    salesRepId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsSalesRep>> {
    requireValue(salesRepId, 'sales_rep_id');
    return client.sendGetRequest<SettingsSalesRep>(urls.SETTINGS_SALES_REP, {
        pathParams: {sales_rep_id: salesRepId},
        dtoType: SettingsSalesRep,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/sales_reps/{sales_rep_id}`
 *
 * Delete a sales rep.
 */
export function deleteSettingsSalesRep(
    client: ExsitedClient,
    salesRepId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(salesRepId, 'sales_rep_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_SALES_REP, {
        pathParams: {sales_rep_id: salesRepId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/sales_reps/{sales_rep_id}`
 *
 * Update or enable/disable a sales rep; `status` takes active or inactive.
 */
export function updateSettingsSalesRep(
    client: ExsitedClient,
    salesRepId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(salesRepId, 'sales_rep_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_SALES_REP, {
        pathParams: {sales_rep_id: salesRepId},
        jsonBody: payload,
        ...options,
    });
}
