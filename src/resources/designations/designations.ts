/** The designations endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './designationsUrls.js';
import {SettingsDesignation, SettingsDesignationList} from './designationsDto.js';

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
 * `GET /api/{api_version}/settings/designations`
 *
 * List the designations.
 */
export function getSettingsDesignations(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDesignationList>> {
    return client.sendGetRequest<SettingsDesignationList>(urls.SETTINGS_DESIGNATIONS, {
        queryParams,
        dtoType: SettingsDesignationList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/designations`
 *
 * Create a designation; `name` is required.
 */
export function createSettingsDesignation(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_DESIGNATIONS, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/designations/{designation_id}`
 *
 * Read one designation by its `des_` id.
 */
export function getSettingsDesignation(
    client: ExsitedClient,
    designationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDesignation>> {
    requireValue(designationId, 'designation_id');
    return client.sendGetRequest<SettingsDesignation>(urls.SETTINGS_DESIGNATION, {
        pathParams: {designation_id: designationId},
        dtoType: SettingsDesignation,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/designations/{designation_id}`
 *
 * Delete a designation.
 */
export function deleteSettingsDesignation(
    client: ExsitedClient,
    designationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(designationId, 'designation_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_DESIGNATION, {
        pathParams: {designation_id: designationId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/designations/{designation_id}`
 *
 * Update a designation's name, display name or description.
 */
export function updateSettingsDesignation(
    client: ExsitedClient,
    designationId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(designationId, 'designation_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_DESIGNATION, {
        pathParams: {designation_id: designationId},
        jsonBody: payload,
        ...options,
    });
}
