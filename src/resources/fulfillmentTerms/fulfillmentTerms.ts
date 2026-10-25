/** The fulfillment terms endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './fulfillmentTermsUrls.js';
import {SettingsFulfillmentTerm, SettingsFulfillmentTermList} from './fulfillmentTermsDto.js';

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
 * `GET /api/{api_version}/settings/fulfillment_terms`
 *
 * List fulfillment terms.
 */
export function getSettingsFulfillmentTerms(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFulfillmentTermList>> {
    return client.sendGetRequest<SettingsFulfillmentTermList>(urls.SETTINGS_FULFILLMENT_TERMS, {
        queryParams,
        dtoType: SettingsFulfillmentTermList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/fulfillment_terms`
 *
 * Create a fulfillment term; `period` is sent upper case and answered lower case.
 */
export function createSettingsFulfillmentTerm(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFulfillmentTerm>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsFulfillmentTerm>(urls.SETTINGS_FULFILLMENT_TERMS, {
        jsonBody: payload,
        dtoType: SettingsFulfillmentTerm,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/fulfillment_terms/{fulfillment_term_id}`
 *
 * Get one fulfillment term.
 */
export function getSettingsFulfillmentTerm(
    client: ExsitedClient,
    fulfillmentTermId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFulfillmentTerm>> {
    requireValue(fulfillmentTermId, 'fulfillment_term_id');
    return client.sendGetRequest<SettingsFulfillmentTerm>(urls.SETTINGS_FULFILLMENT_TERM, {
        pathParams: {fulfillment_term_id: fulfillmentTermId},
        dtoType: SettingsFulfillmentTerm,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/fulfillment_terms/{fulfillment_term_id}`
 *
 * Delete a fulfillment term.
 */
export function deleteSettingsFulfillmentTerm(
    client: ExsitedClient,
    fulfillmentTermId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(fulfillmentTermId, 'fulfillment_term_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_FULFILLMENT_TERM, {
        pathParams: {fulfillment_term_id: fulfillmentTermId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/fulfillment_terms/{fulfillment_term_id}`
 *
 * Update or enable/disable a fulfillment term - `PATCH /settings/fulfillment_terms/{fulfillment_term_id}`; `status`
 * takes active or inactive.
 */
export function updateSettingsFulfillmentTerm(
    client: ExsitedClient,
    fulfillmentTermId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFulfillmentTerm>> {
    requireValue(fulfillmentTermId, 'fulfillment_term_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsFulfillmentTerm>(urls.SETTINGS_FULFILLMENT_TERM, {
        pathParams: {fulfillment_term_id: fulfillmentTermId},
        jsonBody: payload,
        dtoType: SettingsFulfillmentTerm,
        ...options,
    });
}
