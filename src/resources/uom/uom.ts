/** The uom endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './uomUrls.js';
import {SettingsUom, SettingsUomList} from './uomDto.js';

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
 * `GET /api/{api_version}/settings/uom`
 *
 * List units of measurement.
 */
export function getSettingsUoms(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsUomList>> {
    return client.sendGetRequest<SettingsUomList>(urls.SETTINGS_UOMS, {
        queryParams,
        dtoType: SettingsUomList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/uom`
 *
 * Create a unit of measurement; answers 400 validation_error, naming no field, even for a valid body.
 */
export function createSettingsUom(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_UOMS, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/uom/{uom_id}`
 *
 * Get one unit of measurement.
 */
export function getSettingsUom(
    client: ExsitedClient,
    uomId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsUom>> {
    requireValue(uomId, 'uom_id');
    return client.sendGetRequest<SettingsUom>(urls.SETTINGS_UOM, {
        pathParams: {uom_id: uomId},
        dtoType: SettingsUom,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/uom/{uom_id}`
 *
 * Delete a unit of measurement.
 */
export function deleteSettingsUom(
    client: ExsitedClient,
    uomId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(uomId, 'uom_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_UOM, {
        pathParams: {uom_id: uomId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/uom/{uom_id}`
 *
 * Update or enable/disable a unit of measurement; `status` takes active or inactive.
 */
export function updateSettingsUom(
    client: ExsitedClient,
    uomId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(uomId, 'uom_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_UOM, {
        pathParams: {uom_id: uomId},
        jsonBody: payload,
        ...options,
    });
}
