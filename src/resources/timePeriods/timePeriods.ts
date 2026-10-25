/** The time periods endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './timePeriodsUrls.js';
import {SettingsTimePeriod, SettingsTimePeriodList} from './timePeriodsDto.js';

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
 * `GET /api/{api_version}/settings/time_periods`
 *
 * List time periods.
 */
export function getSettingsTimePeriods(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTimePeriodList>> {
    return client.sendGetRequest<SettingsTimePeriodList>(urls.SETTINGS_TIME_PERIODS, {
        queryParams,
        dtoType: SettingsTimePeriodList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/time_periods`
 *
 * Create a time period; `period` is sent upper case and answered lower case.
 */
export function createSettingsTimePeriod(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTimePeriod>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsTimePeriod>(urls.SETTINGS_TIME_PERIODS, {
        jsonBody: payload,
        dtoType: SettingsTimePeriod,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/time_periods/{time_period_id}`
 *
 * Get one time period.
 */
export function getSettingsTimePeriod(
    client: ExsitedClient,
    timePeriodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTimePeriod>> {
    requireValue(timePeriodId, 'time_period_id');
    return client.sendGetRequest<SettingsTimePeriod>(urls.SETTINGS_TIME_PERIOD, {
        pathParams: {time_period_id: timePeriodId},
        dtoType: SettingsTimePeriod,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/time_periods/{time_period_id}`
 *
 * Delete a time period.
 */
export function deleteSettingsTimePeriod(
    client: ExsitedClient,
    timePeriodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(timePeriodId, 'time_period_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_TIME_PERIOD, {
        pathParams: {time_period_id: timePeriodId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/time_periods/{time_period_id}`
 *
 * Update or enable/disable a time period - `PATCH /settings/time_periods/{time_period_id}`; `status` takes active or
 * inactive.
 */
export function updateSettingsTimePeriod(
    client: ExsitedClient,
    timePeriodId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTimePeriod>> {
    requireValue(timePeriodId, 'time_period_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsTimePeriod>(urls.SETTINGS_TIME_PERIOD, {
        pathParams: {time_period_id: timePeriodId},
        jsonBody: payload,
        dtoType: SettingsTimePeriod,
        ...options,
    });
}
