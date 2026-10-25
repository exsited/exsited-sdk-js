/** The roles endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './rolesUrls.js';
import {SettingsRole, SettingsRoleList} from './rolesDto.js';

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
 * `GET /api/{api_version}/settings/roles`
 *
 * List roles.
 */
export function getSettingsRoles(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsRoleList>> {
    return client.sendGetRequest<SettingsRoleList>(urls.SETTINGS_ROLES, {
        queryParams,
        dtoType: SettingsRoleList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/roles`
 *
 * Create a role; the role is saved and the answer is then a 500, from a failing server-side lookup.
 */
export function createSettingsRole(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_ROLES, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/roles/{role_id}`
 *
 * Get one role.
 */
export function getSettingsRole(
    client: ExsitedClient,
    roleId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsRole>> {
    requireValue(roleId, 'role_id');
    return client.sendGetRequest<SettingsRole>(urls.SETTINGS_ROLE, {
        pathParams: {role_id: roleId},
        dtoType: SettingsRole,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/roles/{role_id}`
 *
 * Delete a role; a system role is refused.
 */
export function deleteSettingsRole(
    client: ExsitedClient,
    roleId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(roleId, 'role_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_ROLE, {
        pathParams: {role_id: roleId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/roles/{role_id}`
 *
 * Update or enable/disable a role; the change is saved and the answer is then a 500, from a failing server-side
 * lookup.
 */
export function updateSettingsRole(
    client: ExsitedClient,
    roleId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(roleId, 'role_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_ROLE, {
        pathParams: {role_id: roleId},
        jsonBody: payload,
        ...options,
    });
}
