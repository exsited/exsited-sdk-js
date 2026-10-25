/** The billing periods endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './billingPeriodsUrls.js';
import {SettingsBillingPeriod, SettingsBillingPeriodList} from './billingPeriodsDto.js';

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
 * `GET /api/{api_version}/settings/billing_periods`
 *
 * List the billing periods.
 */
export function getSettingsBillingPeriods(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsBillingPeriodList>> {
    return client.sendGetRequest<SettingsBillingPeriodList>(urls.SETTINGS_BILLING_PERIODS, {
        queryParams,
        dtoType: SettingsBillingPeriodList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/billing_periods`
 *
 * Create a billing period; `name` and `time_period` are required, and `time_period` is the time period's hyphenated
 * uuid, not its `tp_` id.
 */
export function createSettingsBillingPeriod(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsBillingPeriod>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsBillingPeriod>(urls.SETTINGS_BILLING_PERIODS, {
        jsonBody: payload,
        dtoType: SettingsBillingPeriod,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/billing_periods/{billing_period_id}`
 *
 * Read one billing period by its `bp_` id.
 */
export function getSettingsBillingPeriod(
    client: ExsitedClient,
    billingPeriodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsBillingPeriod>> {
    requireValue(billingPeriodId, 'billing_period_id');
    return client.sendGetRequest<SettingsBillingPeriod>(urls.SETTINGS_BILLING_PERIOD, {
        pathParams: {billing_period_id: billingPeriodId},
        dtoType: SettingsBillingPeriod,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/billing_periods/{billing_period_id}`
 *
 * Delete a billing period.
 */
export function deleteSettingsBillingPeriod(
    client: ExsitedClient,
    billingPeriodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(billingPeriodId, 'billing_period_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_BILLING_PERIOD, {
        pathParams: {billing_period_id: billingPeriodId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/billing_periods/{billing_period_id}`
 *
 * Update a billing period; the answer carries `time_period` in place of `period` and `duration`.
 */
export function updateSettingsBillingPeriod(
    client: ExsitedClient,
    billingPeriodId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsBillingPeriod>> {
    requireValue(billingPeriodId, 'billing_period_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsBillingPeriod>(urls.SETTINGS_BILLING_PERIOD, {
        pathParams: {billing_period_id: billingPeriodId},
        jsonBody: payload,
        dtoType: SettingsBillingPeriod,
        ...options,
    });
}
