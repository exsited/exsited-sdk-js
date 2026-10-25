/** The accounting codes endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './accountingCodesUrls.js';
import {SettingsAccountingCode, SettingsAccountingCodeList} from './accountingCodesDto.js';

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

/** `GET /api/{api_version}/settings/accounting_codes` */
export function getSettingsAccountingCodes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAccountingCodeList>> {
    return client.sendGetRequest<SettingsAccountingCodeList>(urls.SETTINGS_ACCOUNTING_CODES, {
        queryParams,
        dtoType: SettingsAccountingCodeList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/accounting_codes`
 */
export function createSettingsAccountingCode(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAccountingCode>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsAccountingCode>(urls.SETTINGS_ACCOUNTING_CODES, {
        jsonBody: payload,
        dtoType: SettingsAccountingCode,
        ...options,
    });
}

/** `GET /api/{api_version}/settings/accounting_codes/{accounting_code_id}` */
export function getSettingsAccountingCode(
    client: ExsitedClient,
    accountingCodeId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAccountingCode>> {
    requireValue(accountingCodeId, 'accounting_code_id');
    return client.sendGetRequest<SettingsAccountingCode>(urls.SETTINGS_ACCOUNTING_CODE, {
        pathParams: {accounting_code_id: accountingCodeId},
        queryParams,
        dtoType: SettingsAccountingCode,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/accounting_codes/{accounting_code_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteSettingsAccountingCode(
    client: ExsitedClient,
    accountingCodeId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(accountingCodeId, 'accounting_code_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_ACCOUNTING_CODE, {
        pathParams: {accounting_code_id: accountingCodeId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/accounting_codes/{accounting_code_id}`
 */
export function updateSettingsAccountingCode(
    client: ExsitedClient,
    accountingCodeId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsAccountingCode>> {
    requireValue(accountingCodeId, 'accounting_code_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsAccountingCode>(urls.SETTINGS_ACCOUNTING_CODE, {
        pathParams: {accounting_code_id: accountingCodeId},
        jsonBody: payload,
        dtoType: SettingsAccountingCode,
        ...options,
    });
}
