/** The pricing periods endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './pricingPeriodsUrls.js';
import {SettingsPricingPeriod, SettingsPricingPeriodList} from './pricingPeriodsDto.js';

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
 * `GET /api/{api_version}/settings/pricing_periods`
 *
 * List pricing periods; `time_period` reads null here, whatever the record holds.
 */
export function getSettingsPricingPeriods(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPricingPeriodList>> {
    return client.sendGetRequest<SettingsPricingPeriodList>(urls.SETTINGS_PRICING_PERIODS, {
        queryParams,
        dtoType: SettingsPricingPeriodList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/pricing_periods`
 *
 * Create a pricing period.
 */
export function createSettingsPricingPeriod(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPricingPeriod>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsPricingPeriod>(urls.SETTINGS_PRICING_PERIODS, {
        jsonBody: payload,
        dtoType: SettingsPricingPeriod,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/pricing_periods/{pricing_period_id}`
 *
 * Get one pricing period; `time_period` reads null here, whatever the record holds.
 */
export function getSettingsPricingPeriod(
    client: ExsitedClient,
    pricingPeriodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPricingPeriod>> {
    requireValue(pricingPeriodId, 'pricing_period_id');
    return client.sendGetRequest<SettingsPricingPeriod>(urls.SETTINGS_PRICING_PERIOD, {
        pathParams: {pricing_period_id: pricingPeriodId},
        dtoType: SettingsPricingPeriod,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/pricing_periods/{pricing_period_id}`
 *
 * Delete a pricing period.
 */
export function deleteSettingsPricingPeriod(
    client: ExsitedClient,
    pricingPeriodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(pricingPeriodId, 'pricing_period_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_PRICING_PERIOD, {
        pathParams: {pricing_period_id: pricingPeriodId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/pricing_periods/{pricing_period_id}`
 *
 * Update or enable/disable a pricing period - `PATCH /settings/pricing_periods/{pricing_period_id}`; `status` takes
 * active or inactive.
 */
export function updateSettingsPricingPeriod(
    client: ExsitedClient,
    pricingPeriodId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPricingPeriod>> {
    requireValue(pricingPeriodId, 'pricing_period_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsPricingPeriod>(urls.SETTINGS_PRICING_PERIOD, {
        pathParams: {pricing_period_id: pricingPeriodId},
        jsonBody: payload,
        dtoType: SettingsPricingPeriod,
        ...options,
    });
}
