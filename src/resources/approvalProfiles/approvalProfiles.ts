/** The approval profiles endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './approvalProfilesUrls.js';
import {SettingsApprovalProfile, SettingsApprovalProfileList} from './approvalProfilesDto.js';

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
 * `GET /api/{api_version}/settings/approval_profiles`
 *
 * List the approval profiles.
 */
export function getSettingsApprovalProfiles(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApprovalProfileList>> {
    return client.sendGetRequest<SettingsApprovalProfileList>(urls.SETTINGS_APPROVAL_PROFILES, {
        queryParams,
        dtoType: SettingsApprovalProfileList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/approval_profiles`
 *
 * Create an approval profile; `name`, `entity`, `event`, `approver_type` and `approver` are required.
 */
export function createSettingsApprovalProfile(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_APPROVAL_PROFILES, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/approval_profiles/{approval_profile_id}`
 *
 * Read one approval profile by its `ap_` id.
 */
export function getSettingsApprovalProfile(
    client: ExsitedClient,
    approvalProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApprovalProfile>> {
    requireValue(approvalProfileId, 'approval_profile_id');
    return client.sendGetRequest<SettingsApprovalProfile>(urls.SETTINGS_APPROVAL_PROFILE, {
        pathParams: {approval_profile_id: approvalProfileId},
        dtoType: SettingsApprovalProfile,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/approval_profiles/{approval_profile_id}`
 *
 * Delete an approval profile that is not in use.
 */
export function deleteSettingsApprovalProfile(
    client: ExsitedClient,
    approvalProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(approvalProfileId, 'approval_profile_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_APPROVAL_PROFILE, {
        pathParams: {approval_profile_id: approvalProfileId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/approval_profiles/{approval_profile_id}`
 *
 * Update an approval profile's fields or its status.
 */
export function updateSettingsApprovalProfile(
    client: ExsitedClient,
    approvalProfileId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(approvalProfileId, 'approval_profile_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_APPROVAL_PROFILE, {
        pathParams: {approval_profile_id: approvalProfileId},
        jsonBody: payload,
        ...options,
    });
}
