/** The approval user groups endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './approvalUserGroupsUrls.js';
import {SettingsApprovalUserGroup, SettingsApprovalUserGroupList} from './approvalUserGroupsDto.js';

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
 * `GET /api/{api_version}/settings/approval_user_groups`
 *
 * List the approval user groups.
 */
export function getSettingsApprovalUserGroups(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApprovalUserGroupList>> {
    return client.sendGetRequest<SettingsApprovalUserGroupList>(urls.SETTINGS_APPROVAL_USER_GROUPS, {
        queryParams,
        dtoType: SettingsApprovalUserGroupList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/approval_user_groups`
 *
 * Create an approval user group; `name` is required.
 */
export function createSettingsApprovalUserGroup(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApprovalUserGroup>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsApprovalUserGroup>(urls.SETTINGS_APPROVAL_USER_GROUPS, {
        jsonBody: payload,
        dtoType: SettingsApprovalUserGroup,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/approval_user_groups/{approval_user_group_id}`
 *
 * Read one approval user group by its `aug_` id.
 */
export function getSettingsApprovalUserGroup(
    client: ExsitedClient,
    approvalUserGroupId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApprovalUserGroup>> {
    requireValue(approvalUserGroupId, 'approval_user_group_id');
    return client.sendGetRequest<SettingsApprovalUserGroup>(urls.SETTINGS_APPROVAL_USER_GROUP, {
        pathParams: {approval_user_group_id: approvalUserGroupId},
        dtoType: SettingsApprovalUserGroup,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/approval_user_groups/{approval_user_group_id}`
 *
 * Delete an approval user group.
 */
export function deleteSettingsApprovalUserGroup(
    client: ExsitedClient,
    approvalUserGroupId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(approvalUserGroupId, 'approval_user_group_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_APPROVAL_USER_GROUP, {
        pathParams: {approval_user_group_id: approvalUserGroupId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/approval_user_groups/{approval_user_group_id}`
 *
 * Update an approval user group's name, display name or description.
 */
export function updateSettingsApprovalUserGroup(
    client: ExsitedClient,
    approvalUserGroupId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApprovalUserGroup>> {
    requireValue(approvalUserGroupId, 'approval_user_group_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsApprovalUserGroup>(urls.SETTINGS_APPROVAL_USER_GROUP, {
        pathParams: {approval_user_group_id: approvalUserGroupId},
        jsonBody: payload,
        dtoType: SettingsApprovalUserGroup,
        ...options,
    });
}
