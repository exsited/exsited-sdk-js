/** The account groups endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './accountGroupsUrls.js';
import {SettingsAccountGroup, SettingsAccountGroupList} from './accountGroupsDto.js';

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
 * `GET /api/{api_version}/settings/account_groups`
 *
 * List the account groups.
 */
export function getSettingsAccountGroups(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAccountGroupList>> {
    return client.sendGetRequest<SettingsAccountGroupList>(urls.SETTINGS_ACCOUNT_GROUPS, {
        queryParams,
        dtoType: SettingsAccountGroupList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/account_groups`
 *
 * Create an account group; `name` is required.
 */
export function createSettingsAccountGroup(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAccountGroup>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsAccountGroup>(urls.SETTINGS_ACCOUNT_GROUPS, {
        jsonBody: payload,
        dtoType: SettingsAccountGroup,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/account_groups/{account_group_id}`
 *
 * Read one account group by its `ag_` id.
 */
export function getSettingsAccountGroup(
    client: ExsitedClient,
    accountGroupId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAccountGroup>> {
    requireValue(accountGroupId, 'account_group_id');
    return client.sendGetRequest<SettingsAccountGroup>(urls.SETTINGS_ACCOUNT_GROUP, {
        pathParams: {account_group_id: accountGroupId},
        dtoType: SettingsAccountGroup,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/account_groups/{account_group_id}`
 *
 * Delete an account group no account uses.
 */
export function deleteSettingsAccountGroup(
    client: ExsitedClient,
    accountGroupId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(accountGroupId, 'account_group_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_ACCOUNT_GROUP, {
        pathParams: {account_group_id: accountGroupId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/account_groups/{account_group_id}`
 *
 * Update an account group's fields or its status.
 */
export function updateSettingsAccountGroup(
    client: ExsitedClient,
    accountGroupId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(accountGroupId, 'account_group_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_ACCOUNT_GROUP, {
        pathParams: {account_group_id: accountGroupId},
        jsonBody: payload,
        ...options,
    });
}
