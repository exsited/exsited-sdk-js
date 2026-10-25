/** The receive terms endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './receiveTermsUrls.js';
import {SettingsReceiveTerm, SettingsReceiveTermList} from './receiveTermsDto.js';

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
 * `GET /api/{api_version}/settings/receive_terms`
 *
 * List receive terms.
 */
export function getSettingsReceiveTerms(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsReceiveTermList>> {
    return client.sendGetRequest<SettingsReceiveTermList>(urls.SETTINGS_RECEIVE_TERMS, {
        queryParams,
        dtoType: SettingsReceiveTermList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/receive_terms`
 *
 * Create a receive term; `period` is sent upper case and answered lower case.
 */
export function createSettingsReceiveTerm(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsReceiveTerm>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsReceiveTerm>(urls.SETTINGS_RECEIVE_TERMS, {
        jsonBody: payload,
        dtoType: SettingsReceiveTerm,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/receive_terms/{receive_term_id}`
 *
 * Get one receive term.
 */
export function getSettingsReceiveTerm(
    client: ExsitedClient,
    receiveTermId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsReceiveTerm>> {
    requireValue(receiveTermId, 'receive_term_id');
    return client.sendGetRequest<SettingsReceiveTerm>(urls.SETTINGS_RECEIVE_TERM, {
        pathParams: {receive_term_id: receiveTermId},
        dtoType: SettingsReceiveTerm,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/receive_terms/{receive_term_id}`
 *
 * Delete a receive term.
 */
export function deleteSettingsReceiveTerm(
    client: ExsitedClient,
    receiveTermId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(receiveTermId, 'receive_term_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_RECEIVE_TERM, {
        pathParams: {receive_term_id: receiveTermId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/receive_terms/{receive_term_id}`
 *
 * Update or enable/disable a receive term - `PATCH /settings/receive_terms/{receive_term_id}`; `status` takes active or
 * inactive.
 */
export function updateSettingsReceiveTerm(
    client: ExsitedClient,
    receiveTermId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsReceiveTerm>> {
    requireValue(receiveTermId, 'receive_term_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsReceiveTerm>(urls.SETTINGS_RECEIVE_TERM, {
        pathParams: {receive_term_id: receiveTermId},
        jsonBody: payload,
        dtoType: SettingsReceiveTerm,
        ...options,
    });
}
