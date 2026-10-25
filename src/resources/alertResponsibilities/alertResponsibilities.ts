/** The alert responsibilities endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './alertResponsibilitiesUrls.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

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
 * `GET /api/{api_version}/settings/alert_responsibilities`
 *
 * List the alert responsibilities.
 */
export function getSettingsAlertResponsibilities(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendGetRequest<never>(urls.SETTINGS_ALERT_RESPONSIBILITIES, {
        queryParams,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/alert_responsibilities`
 *
 * Create an alert responsibility; `name` is required.
 */
export function createSettingsAlertResponsibility(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_ALERT_RESPONSIBILITIES, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/alert_responsibilities/{alert_responsibility_id}`
 *
 * Read one alert responsibility by its `ar_` id.
 */
export function getSettingsAlertResponsibility(
    client: ExsitedClient,
    alertResponsibilityId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(alertResponsibilityId, 'alert_responsibility_id');
    return client.sendGetRequest<never>(urls.SETTINGS_ALERT_RESPONSIBILITY, {
        pathParams: {alert_responsibility_id: alertResponsibilityId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/alert_responsibilities/{alert_responsibility_id}`
 *
 * Delete an alert responsibility.
 */
export function deleteSettingsAlertResponsibility(
    client: ExsitedClient,
    alertResponsibilityId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(alertResponsibilityId, 'alert_responsibility_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_ALERT_RESPONSIBILITY, {
        pathParams: {alert_responsibility_id: alertResponsibilityId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/alert_responsibilities/{alert_responsibility_id}`
 *
 * Update an alert responsibility's fields or its status.
 */
export function updateSettingsAlertResponsibility(
    client: ExsitedClient,
    alertResponsibilityId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(alertResponsibilityId, 'alert_responsibility_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_ALERT_RESPONSIBILITY, {
        pathParams: {alert_responsibility_id: alertResponsibilityId},
        jsonBody: payload,
        ...options,
    });
}
