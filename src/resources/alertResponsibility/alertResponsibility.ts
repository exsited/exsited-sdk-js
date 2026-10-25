/** The alert responsibility endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './alertResponsibilityUrls.js';
import {AlertResponsibility, AlertResponsibilityList} from './alertResponsibilityDto.js';

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
 * `GET /api/{api_version}/alert_responsibility`
 *
 * List alert responsibilities, the singular path the workflow services serve.
 */
export function getAlertResponsibilities(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AlertResponsibilityList>> {
    return client.sendGetRequest<AlertResponsibilityList>(urls.ALERT_RESPONSIBILITIES, {
        queryParams,
        dtoType: AlertResponsibilityList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/alert_responsibility/{alert_responsibility_id}`
 *
 * One alert responsibility; the `ar_` id or the raw uuid.
 */
export function getAlertResponsibility(
    client: ExsitedClient,
    alertResponsibilityId: string,
    options: CallOptions = {},
): Promise<ApiResponse<AlertResponsibility>> {
    requireValue(alertResponsibilityId, 'alert_responsibility_id');
    return client.sendGetRequest<AlertResponsibility>(urls.ALERT_RESPONSIBILITY, {
        pathParams: {alert_responsibility_id: alertResponsibilityId},
        dtoType: AlertResponsibility,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/alert_responsibility`
 *
 * Create an alert responsibility, under `alert_responsibility`; `name` is required and unique, beside `display_name`
 * and `description` only.
 */
export function createAlertResponsibility(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<AlertResponsibility>> {
    requirePayload(payload);
    return client.sendPostRequest<AlertResponsibility>(urls.ALERT_RESPONSIBILITIES, {
        jsonBody: payload,
        dtoType: AlertResponsibility,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/alert_responsibility/{alert_responsibility_id}`
 *
 * Update an alert responsibility; `status` may move between `active` and `inactive` beside the three create keys.
 */
export function updateAlertResponsibility(
    client: ExsitedClient,
    alertResponsibilityId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<AlertResponsibility>> {
    requireValue(alertResponsibilityId, 'alert_responsibility_id');
    requirePayload(payload);
    return client.sendPatchRequest<AlertResponsibility>(urls.ALERT_RESPONSIBILITY, {
        pathParams: {alert_responsibility_id: alertResponsibilityId},
        jsonBody: payload,
        dtoType: AlertResponsibility,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/alert_responsibility/{alert_responsibility_id}`
 *
 * Delete an alert responsibility, a soft delete; the id must be the `ar_` one.
 */
export function deleteAlertResponsibility(
    client: ExsitedClient,
    alertResponsibilityId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(alertResponsibilityId, 'alert_responsibility_id');
    return client.sendDeleteRequest<never>(urls.ALERT_RESPONSIBILITY, {
        pathParams: {alert_responsibility_id: alertResponsibilityId},
        ...options,
    });
}
