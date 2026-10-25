/** The additional codes endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './additionalCodesUrls.js';
import {SettingsAdditionalCode, SettingsAdditionalCodeList} from './additionalCodesDto.js';

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
 * `GET /api/{api_version}/settings/additional_codes`
 *
 * List the additional codes, the data sets of purchase order lines.
 */
export function getSettingsAdditionalCodes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAdditionalCodeList>> {
    return client.sendGetRequest<SettingsAdditionalCodeList>(urls.SETTINGS_ADDITIONAL_CODES, {
        queryParams,
        dtoType: SettingsAdditionalCodeList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/additional_codes`
 *
 * Create an additional code; `name` is required.
 */
export function createSettingsAdditionalCode(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAdditionalCode>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsAdditionalCode>(urls.SETTINGS_ADDITIONAL_CODES, {
        jsonBody: payload,
        dtoType: SettingsAdditionalCode,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/additional_codes/{additional_code_id}`
 *
 * Read one additional code by its `ac_` id.
 */
export function getSettingsAdditionalCode(
    client: ExsitedClient,
    additionalCodeId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAdditionalCode>> {
    requireValue(additionalCodeId, 'additional_code_id');
    return client.sendGetRequest<SettingsAdditionalCode>(urls.SETTINGS_ADDITIONAL_CODE, {
        pathParams: {additional_code_id: additionalCodeId},
        dtoType: SettingsAdditionalCode,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/additional_codes/{additional_code_id}`
 *
 * Delete an additional code.
 */
export function deleteSettingsAdditionalCode(
    client: ExsitedClient,
    additionalCodeId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(additionalCodeId, 'additional_code_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_ADDITIONAL_CODE, {
        pathParams: {additional_code_id: additionalCodeId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/additional_codes/{additional_code_id}`
 *
 * Update an additional code's fields or its status.
 */
export function updateSettingsAdditionalCode(
    client: ExsitedClient,
    additionalCodeId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(additionalCodeId, 'additional_code_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_ADDITIONAL_CODE, {
        pathParams: {additional_code_id: additionalCodeId},
        jsonBody: payload,
        ...options,
    });
}
