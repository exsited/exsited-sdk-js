/** The credit note applications endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './creditNoteApplicationsUrls.js';
import {
    CreditNoteApplicationList,
    CreditNoteApplicationRead,
    InvoiceCreditNoteApplications,
} from './creditNoteApplicationsDto.js';

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

/**
 * `GET /api/{api_version}/credit_note_applications`
 *
 * Recorded status codes: 200.
 */
export function getCreditNoteApplications(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteApplicationList>> {
    return client.sendGetRequest<CreditNoteApplicationList>(urls.CREDIT_NOTE_APPLICATIONS, {
        queryParams,
        dtoType: CreditNoteApplicationList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/credit_note_applications/{credit_note_application_id}`
 *
 * Recorded status codes: 200.
 */
export function getCreditNoteApplication(
    client: ExsitedClient,
    creditNoteApplicationId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteApplicationRead>> {
    requireValue(creditNoteApplicationId, 'credit_note_application_id');
    return client.sendGetRequest<CreditNoteApplicationRead>(urls.CREDIT_NOTE_APPLICATION, {
        pathParams: {credit_note_application_id: creditNoteApplicationId},
        queryParams,
        dtoType: CreditNoteApplicationRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/invoices/{invoice_id}/credit_note_applications`
 *
 * Recorded status codes: 200.
 */
export function getInvoiceCreditNoteApplications(
    client: ExsitedClient,
    invoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceCreditNoteApplications>> {
    requireValue(invoiceId, 'invoice_id');
    return client.sendGetRequest<InvoiceCreditNoteApplications>(urls.INVOICE_CREDIT_NOTE_APPLICATIONS, {
        pathParams: {invoice_id: invoiceId},
        queryParams,
        dtoType: InvoiceCreditNoteApplications,
        ...options,
    });
}
