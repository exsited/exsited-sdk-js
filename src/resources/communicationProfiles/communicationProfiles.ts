/** The communication profiles endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './communicationProfilesUrls.js';
import {SettingsCommunicationProfile, SettingsCommunicationProfileList} from './communicationProfilesDto.js';

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
 * `GET /api/{api_version}/settings/communication_profiles`
 *
 * List the communication profiles.
 */
export function getSettingsCommunicationProfiles(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCommunicationProfileList>> {
    return client.sendGetRequest<SettingsCommunicationProfileList>(urls.SETTINGS_COMMUNICATION_PROFILES, {
        queryParams,
        dtoType: SettingsCommunicationProfileList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/communication_profiles`
 *
 * Create a communication profile; `name` is required, and its messages are copied from `copy_from` or else from the
 * default profile.
 */
export function createSettingsCommunicationProfile(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_COMMUNICATION_PROFILES, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/communication_profiles/{communication_profile_id}`
 *
 * Read one communication profile by its `cmp_` id.
 */
export function getSettingsCommunicationProfile(
    client: ExsitedClient,
    communicationProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCommunicationProfile>> {
    requireValue(communicationProfileId, 'communication_profile_id');
    return client.sendGetRequest<SettingsCommunicationProfile>(urls.SETTINGS_COMMUNICATION_PROFILE, {
        pathParams: {communication_profile_id: communicationProfileId},
        dtoType: SettingsCommunicationProfile,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/communication_profiles/{communication_profile_id}`
 *
 * Delete a communication profile that is not the default.
 */
export function deleteSettingsCommunicationProfile(
    client: ExsitedClient,
    communicationProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(communicationProfileId, 'communication_profile_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_COMMUNICATION_PROFILE, {
        pathParams: {communication_profile_id: communicationProfileId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/communication_profiles/{communication_profile_id}`
 *
 * Update a communication profile's fields and channel settings.
 */
export function updateSettingsCommunicationProfile(
    client: ExsitedClient,
    communicationProfileId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(communicationProfileId, 'communication_profile_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_COMMUNICATION_PROFILE, {
        pathParams: {communication_profile_id: communicationProfileId},
        jsonBody: payload,
        ...options,
    });
}
