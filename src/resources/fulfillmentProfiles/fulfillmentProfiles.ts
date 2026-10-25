/** The fulfillment profiles endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './fulfillmentProfilesUrls.js';
import {SettingsFulfillmentProfile, SettingsFulfillmentProfileList} from './fulfillmentProfilesDto.js';

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
 * `GET /api/{api_version}/settings/fulfillment_profiles`
 *
 * List fulfillment profiles.
 */
export function getSettingsFulfillmentProfiles(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFulfillmentProfileList>> {
    return client.sendGetRequest<SettingsFulfillmentProfileList>(urls.SETTINGS_FULFILLMENT_PROFILES, {
        queryParams,
        dtoType: SettingsFulfillmentProfileList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/fulfillment_profiles`
 *
 * Create a fulfillment profile; `statuses` needs one entry at least.
 */
export function createSettingsFulfillmentProfile(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFulfillmentProfile>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsFulfillmentProfile>(urls.SETTINGS_FULFILLMENT_PROFILES, {
        jsonBody: payload,
        dtoType: SettingsFulfillmentProfile,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}`
 *
 * Get one fulfillment profile - `GET /settings/fulfillment_profiles/{fulfillment_profile_id}`.
 */
export function getSettingsFulfillmentProfile(
    client: ExsitedClient,
    fulfillmentProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFulfillmentProfile>> {
    requireValue(fulfillmentProfileId, 'fulfillment_profile_id');
    return client.sendGetRequest<SettingsFulfillmentProfile>(urls.SETTINGS_FULFILLMENT_PROFILE, {
        pathParams: {fulfillment_profile_id: fulfillmentProfileId},
        dtoType: SettingsFulfillmentProfile,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}`
 *
 * Delete a fulfillment profile - `DELETE /settings/fulfillment_profiles/{fulfillment_profile_id}`.
 */
export function deleteSettingsFulfillmentProfile(
    client: ExsitedClient,
    fulfillmentProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(fulfillmentProfileId, 'fulfillment_profile_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_FULFILLMENT_PROFILE, {
        pathParams: {fulfillment_profile_id: fulfillmentProfileId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}`
 *
 * Update a fulfillment profile - `PATCH /settings/fulfillment_profiles/{fulfillment_profile_id}`.
 */
export function updateSettingsFulfillmentProfile(
    client: ExsitedClient,
    fulfillmentProfileId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFulfillmentProfile>> {
    requireValue(fulfillmentProfileId, 'fulfillment_profile_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsFulfillmentProfile>(urls.SETTINGS_FULFILLMENT_PROFILE, {
        pathParams: {fulfillment_profile_id: fulfillmentProfileId},
        jsonBody: payload,
        dtoType: SettingsFulfillmentProfile,
        ...options,
    });
}
