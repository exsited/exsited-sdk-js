/** The alerts endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './alertsUrls.js';
import {Alerts} from './alertsDto.js';

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

/** `GET /api/{api_version}/alerts` */
export function getAlerts(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Alerts>> {
    return client.sendGetRequest<Alerts>(urls.ALERTS, {
        queryParams,
        dtoType: Alerts,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/alerts/{alert_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function getAlert(
    client: ExsitedClient,
    alertId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(alertId, 'alert_id');
    return client.sendGetRequest<never>(urls.ALERT, {
        pathParams: {alert_id: alertId},
        queryParams,
        ...options,
    });
}

/** `GET /api/{api_version}/alerts/account/{account_id}` */
export function getAlertsAccountById(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Alerts>> {
    requireValue(accountId, 'account_id');
    return client.sendGetRequest<Alerts>(urls.ALERTS_ACCOUNT_BY_ID, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: Alerts,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/alerts/employee/{employee_id}`
 */
export function getAlertsEmployeeById(
    client: ExsitedClient,
    employeeId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Alerts>> {
    requireValue(employeeId, 'employee_id');
    return client.sendGetRequest<Alerts>(urls.ALERTS_EMPLOYEE_BY_ID, {
        pathParams: {employee_id: employeeId},
        queryParams,
        dtoType: Alerts,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/alerts/labour/{labour_id}`
 */
export function getAlertsLabourById(
    client: ExsitedClient,
    labourId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Alerts>> {
    requireValue(labourId, 'labour_id');
    return client.sendGetRequest<Alerts>(urls.ALERTS_LABOUR_BY_ID, {
        pathParams: {labour_id: labourId},
        queryParams,
        dtoType: Alerts,
        ...options,
    });
}
