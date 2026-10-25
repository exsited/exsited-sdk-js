/** The applications endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './applicationsUrls.js';
import {SettingsApplication, SettingsApplicationList} from './applicationsDto.js';

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
 * `GET /api/{api_version}/settings/applications`
 *
 * List the OAuth applications.
 */
export function getSettingsApplications(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApplicationList>> {
    return client.sendGetRequest<SettingsApplicationList>(urls.SETTINGS_APPLICATIONS, {
        queryParams,
        dtoType: SettingsApplicationList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/applications`
 *
 * Create an OAuth application; `name` and `redirect_url` are required, and the client id and secret are generated
 * server side and never answered.
 */
export function createSettingsApplication(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApplication>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsApplication>(urls.SETTINGS_APPLICATIONS, {
        jsonBody: payload,
        dtoType: SettingsApplication,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/applications/{application_id}`
 *
 * Read one OAuth application by its `app_` id.
 */
export function getSettingsApplication(
    client: ExsitedClient,
    applicationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApplication>> {
    requireValue(applicationId, 'application_id');
    return client.sendGetRequest<SettingsApplication>(urls.SETTINGS_APPLICATION, {
        pathParams: {application_id: applicationId},
        dtoType: SettingsApplication,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/applications/{application_id}`
 *
 * Delete an OAuth application.
 */
export function deleteSettingsApplication(
    client: ExsitedClient,
    applicationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(applicationId, 'application_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_APPLICATION, {
        pathParams: {application_id: applicationId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/applications/{application_id}`
 *
 * Update an OAuth application's fields or its status.
 */
export function updateSettingsApplication(
    client: ExsitedClient,
    applicationId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsApplication>> {
    requireValue(applicationId, 'application_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsApplication>(urls.SETTINGS_APPLICATION, {
        pathParams: {application_id: applicationId},
        jsonBody: payload,
        dtoType: SettingsApplication,
        ...options,
    });
}
