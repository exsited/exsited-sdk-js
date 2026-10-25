/** The invoice terms endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './invoiceTermsUrls.js';
import {SettingsInvoiceTerm, SettingsInvoiceTermList, SettingsInvoiceTermWrite} from './invoiceTermsDto.js';

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
 * `GET /api/{api_version}/settings/invoice_terms`
 *
 * List invoice terms.
 */
export function getSettingsInvoiceTerms(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsInvoiceTermList>> {
    return client.sendGetRequest<SettingsInvoiceTermList>(urls.SETTINGS_INVOICE_TERMS, {
        queryParams,
        dtoType: SettingsInvoiceTermList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/invoice_terms`
 *
 * Create an invoice term; the answer is flat, where a read nests `duration`.
 */
export function createSettingsInvoiceTerm(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsInvoiceTermWrite>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsInvoiceTermWrite>(urls.SETTINGS_INVOICE_TERMS, {
        jsonBody: payload,
        dtoType: SettingsInvoiceTermWrite,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/invoice_terms/{invoice_term_id}`
 *
 * Get one invoice term.
 */
export function getSettingsInvoiceTerm(
    client: ExsitedClient,
    invoiceTermId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsInvoiceTerm>> {
    requireValue(invoiceTermId, 'invoice_term_id');
    return client.sendGetRequest<SettingsInvoiceTerm>(urls.SETTINGS_INVOICE_TERM, {
        pathParams: {invoice_term_id: invoiceTermId},
        dtoType: SettingsInvoiceTerm,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/invoice_terms/{invoice_term_id}`
 *
 * Delete an invoice term.
 */
export function deleteSettingsInvoiceTerm(
    client: ExsitedClient,
    invoiceTermId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(invoiceTermId, 'invoice_term_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_INVOICE_TERM, {
        pathParams: {invoice_term_id: invoiceTermId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/invoice_terms/{invoice_term_id}`
 *
 * Update or enable/disable an invoice term - `PATCH /settings/invoice_terms/{invoice_term_id}`; the answer is flat,
 * where a read nests `duration`.
 */
export function updateSettingsInvoiceTerm(
    client: ExsitedClient,
    invoiceTermId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsInvoiceTermWrite>> {
    requireValue(invoiceTermId, 'invoice_term_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsInvoiceTermWrite>(urls.SETTINGS_INVOICE_TERM, {
        pathParams: {invoice_term_id: invoiceTermId},
        jsonBody: payload,
        dtoType: SettingsInvoiceTermWrite,
        ...options,
    });
}
