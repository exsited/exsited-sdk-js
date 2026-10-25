/** The proforma invoices endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './proformaInvoicesUrls.js';

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

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/**
 * `GET /api/{api_version}/proforma_invoices`
 *
 * List pro-forma invoices; paged by cursor, under `data`.
 */
export function getProformaInvoices(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendGetRequest<never>(urls.PROFORMA_INVOICES, {
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/proforma_invoices/{proforma_id}`
 *
 * Retrieve one pro-forma invoice, by its code; under `proforma_invoice`.
 */
export function getProformaInvoice(
    client: ExsitedClient,
    proformaId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(proformaId, 'proforma_id');
    return client.sendGetRequest<never>(urls.PROFORMA_INVOICE, {
        pathParams: {proforma_id: proformaId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/proforma_invoices/{proforma_id}`
 *
 * Delete a pro-forma invoice; `204`. A paid one is refused `400` `already_paid`.
 */
export function deleteProformaInvoice(
    client: ExsitedClient,
    proformaId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(proformaId, 'proforma_id');
    return client.sendDeleteRequest<never>(urls.PROFORMA_INVOICE, {
        pathParams: {proforma_id: proformaId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/proforma_invoices/{proforma_id}/payments`
 *
 * Pay a pro-forma invoice, wrapped in `payment`; `201`, answering the new payment's code as `payment.payment_id`.
 */
export function createProformaInvoicePayment(
    client: ExsitedClient,
    proformaId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(proformaId, 'proforma_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.PROFORMA_INVOICE_PAYMENTS, {
        pathParams: {proforma_id: proformaId},
        jsonBody: payload,
        ...options,
    });
}
