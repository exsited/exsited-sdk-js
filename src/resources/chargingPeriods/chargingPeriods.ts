/** The charging periods endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './chargingPeriodsUrls.js';
import {SettingsChargingPeriod, SettingsChargingPeriodList} from './chargingPeriodsDto.js';

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
 * `GET /api/{api_version}/settings/charging_periods`
 *
 * List the charging periods.
 */
export function getSettingsChargingPeriods(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsChargingPeriodList>> {
    return client.sendGetRequest<SettingsChargingPeriodList>(urls.SETTINGS_CHARGING_PERIODS, {
        queryParams,
        dtoType: SettingsChargingPeriodList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/charging_periods`
 *
 * Create a charging period; `name`, `display_name` and `time_period`, a `tp_` id, are required.
 */
export function createSettingsChargingPeriod(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsChargingPeriod>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsChargingPeriod>(urls.SETTINGS_CHARGING_PERIODS, {
        jsonBody: payload,
        dtoType: SettingsChargingPeriod,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/charging_periods/{charging_period_id}`
 *
 * Read one charging period by its `cp_` id.
 */
export function getSettingsChargingPeriod(
    client: ExsitedClient,
    chargingPeriodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsChargingPeriod>> {
    requireValue(chargingPeriodId, 'charging_period_id');
    return client.sendGetRequest<SettingsChargingPeriod>(urls.SETTINGS_CHARGING_PERIOD, {
        pathParams: {charging_period_id: chargingPeriodId},
        dtoType: SettingsChargingPeriod,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/charging_periods/{charging_period_id}`
 *
 * Delete a charging period.
 */
export function deleteSettingsChargingPeriod(
    client: ExsitedClient,
    chargingPeriodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(chargingPeriodId, 'charging_period_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_CHARGING_PERIOD, {
        pathParams: {charging_period_id: chargingPeriodId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/charging_periods/{charging_period_id}`
 *
 * Update a charging period's fields or its status.
 */
export function updateSettingsChargingPeriod(
    client: ExsitedClient,
    chargingPeriodId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsChargingPeriod>> {
    requireValue(chargingPeriodId, 'charging_period_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsChargingPeriod>(urls.SETTINGS_CHARGING_PERIOD, {
        pathParams: {charging_period_id: chargingPeriodId},
        jsonBody: payload,
        dtoType: SettingsChargingPeriod,
        ...options,
    });
}
