/** The salutations endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './salutationsUrls.js';
import {SettingsSalutation, SettingsSalutationList} from './salutationsDto.js';

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
 * `GET /api/{api_version}/settings/salutations`
 *
 * List salutations.
 */
export function getSettingsSalutations(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsSalutationList>> {
    return client.sendGetRequest<SettingsSalutationList>(urls.SETTINGS_SALUTATIONS, {
        queryParams,
        dtoType: SettingsSalutationList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/salutations`
 *
 * Create a salutation.
 */
export function createSettingsSalutation(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsSalutation>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsSalutation>(urls.SETTINGS_SALUTATIONS, {
        jsonBody: payload,
        dtoType: SettingsSalutation,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/salutations/{salutation_id}`
 *
 * Get one salutation.
 */
export function getSettingsSalutation(
    client: ExsitedClient,
    salutationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsSalutation>> {
    requireValue(salutationId, 'salutation_id');
    return client.sendGetRequest<SettingsSalutation>(urls.SETTINGS_SALUTATION, {
        pathParams: {salutation_id: salutationId},
        dtoType: SettingsSalutation,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/salutations/{salutation_id}`
 *
 * Delete a salutation.
 */
export function deleteSettingsSalutation(
    client: ExsitedClient,
    salutationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(salutationId, 'salutation_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_SALUTATION, {
        pathParams: {salutation_id: salutationId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/salutations/{salutation_id}`
 *
 * Update a salutation.
 */
export function updateSettingsSalutation(
    client: ExsitedClient,
    salutationId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsSalutation>> {
    requireValue(salutationId, 'salutation_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsSalutation>(urls.SETTINGS_SALUTATION, {
        pathParams: {salutation_id: salutationId},
        jsonBody: payload,
        dtoType: SettingsSalutation,
        ...options,
    });
}
