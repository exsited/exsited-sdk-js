/** The purchase invoices endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './purchaseInvoicesUrls.js';
import {
    AccountPurchaseInvoices,
    PurchaseInvoice,
    PurchaseInvoiceCancel,
    PurchaseInvoiceInformation,
    PurchaseInvoiceLine,
    PurchaseInvoiceLines,
    PurchaseInvoiceList,
    PurchaseInvoiceNote,
    PurchaseInvoiceNoteFile,
    PurchaseInvoiceNoteFileList,
    PurchaseInvoiceNoteList,
    PurchaseInvoiceNotes,
    PurchaseInvoicePurchasePaymentList,
    PurchaseInvoiceRead,
    PurchaseInvoicesNoteList,
} from './purchaseInvoicesDto.js';
import {PurchaseCreditNoteApplicationRead} from '../purchaseCreditNoteApplications/purchaseCreditNoteApplicationsDto.js';

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

function requireNote(note: unknown): void {
    if (note === undefined || note === null) {
        throw new SdkUsageError(
            'note is required: the note text is the body of this request, and omitting ' +
                'it would be encoded as the string "undefined" and stored as the note',
        );
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
 * `GET /api/{api_version}/purchase_invoices`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoices(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceList>> {
    return client.sendGetRequest<PurchaseInvoiceList>(urls.PURCHASE_INVOICES, {
        queryParams,
        dtoType: PurchaseInvoiceList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_invoices`
 */
export function createPurchaseInvoice(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceInformation>> {
    requirePayload(payload);
    return client.sendPostRequest<PurchaseInvoiceInformation>(urls.PURCHASE_INVOICES, {
        jsonBody: payload,
        dtoType: PurchaseInvoiceInformation,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/notes`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoicesNotes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoicesNoteList>> {
    return client.sendGetRequest<PurchaseInvoicesNoteList>(urls.PURCHASE_INVOICES_NOTES, {
        queryParams,
        dtoType: PurchaseInvoicesNoteList,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_invoices/{purchase_invoice_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deletePurchaseInvoice(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_INVOICE, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoice(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceRead>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    return client.sendGetRequest<PurchaseInvoiceRead>(urls.PURCHASE_INVOICE, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        queryParams,
        dtoType: PurchaseInvoiceRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/amend`
 */
export function amendPurchaseInvoice(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceRead>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseInvoiceRead>(urls.PURCHASE_INVOICE_AMEND, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        jsonBody: payload,
        dtoType: PurchaseInvoiceRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/cancel`
 *
 * Recorded status codes: 201.
 */
export function cancelPurchaseInvoice(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceCancel>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseInvoiceCancel>(urls.PURCHASE_INVOICE_CANCEL, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        jsonBody: payload,
        dtoType: PurchaseInvoiceCancel,
        ...options,
    });
}

/** `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/information` */
export function getPurchaseInvoiceInformation(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoice>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    return client.sendGetRequest<PurchaseInvoice>(urls.PURCHASE_INVOICE_INFORMATION, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        queryParams,
        dtoType: PurchaseInvoice,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/purchase_invoices/{purchase_invoice_id}/information`
 *
 * Recorded status codes: 200.
 */
export function updatePurchaseInvoiceInformation(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceInformation>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requirePayload(payload);
    return client.sendPatchRequest<PurchaseInvoiceInformation>(urls.PURCHASE_INVOICE_INFORMATION, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        jsonBody: payload,
        dtoType: PurchaseInvoiceInformation,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/lines`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoiceLines(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceLines>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    return client.sendGetRequest<PurchaseInvoiceLines>(urls.PURCHASE_INVOICE_LINES, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        queryParams,
        dtoType: PurchaseInvoiceLines,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoiceNotes(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceNoteList>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    return client.sendGetRequest<PurchaseInvoiceNoteList>(urls.PURCHASE_INVOICE_NOTES, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        queryParams,
        dtoType: PurchaseInvoiceNoteList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes`
 *
 * Recorded status codes: 201.
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function createPurchaseInvoiceNote(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<PurchaseInvoiceNotes>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requireNote(note);
    return client.sendPostRequest<PurchaseInvoiceNotes>(urls.PURCHASE_INVOICE_NOTES, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        formData: {note},
        dtoType: PurchaseInvoiceNotes,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/pdf`
 *
 * No typed view, so `.dto` is null.
 */
export function getPurchaseInvoicePdf(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    return client.sendGetRequest<never>(urls.PURCHASE_INVOICE_PDF, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoicePurchaseCreditNoteApplications(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountPurchaseInvoices>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    return client.sendGetRequest<AccountPurchaseInvoices>(urls.PURCHASE_INVOICE_PURCHASE_CREDIT_NOTE_APPLICATIONS, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        queryParams,
        dtoType: AccountPurchaseInvoices,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications/{application_id}`
 *
 * One purchase credit note application through a purchase invoice; not checked against the invoice, so any application
 * answers under any invoice.
 */
export function getPurchaseInvoicePurchaseCreditNoteApplication(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    applicationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteApplicationRead>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requireValue(applicationId, 'application_id');
    return client.sendGetRequest<PurchaseCreditNoteApplicationRead>(
        urls.PURCHASE_INVOICE_PURCHASE_CREDIT_NOTE_APPLICATION,
        {
            pathParams: {purchase_invoice_id: purchaseInvoiceId, application_id: applicationId},
            dtoType: PurchaseCreditNoteApplicationRead,
            ...options,
        },
    );
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoicePurchasePayments(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoicePurchasePaymentList>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    return client.sendGetRequest<PurchaseInvoicePurchasePaymentList>(urls.PURCHASE_INVOICE_PURCHASE_PAYMENTS, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        queryParams,
        dtoType: PurchaseInvoicePurchasePaymentList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/reactivate`
 */
export function reactivatePurchaseInvoice(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceInformation>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseInvoiceInformation>(urls.PURCHASE_INVOICE_REACTIVATE, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        jsonBody: payload,
        dtoType: PurchaseInvoiceInformation,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/lines/{purchase_invoice_line_uuid}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoiceLine(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    purchaseInvoiceLineUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceLine>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requireValue(purchaseInvoiceLineUuid, 'purchase_invoice_line_uuid');
    return client.sendGetRequest<PurchaseInvoiceLine>(urls.PURCHASE_INVOICE_LINE, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId, purchase_invoice_line_uuid: purchaseInvoiceLineUuid},
        queryParams,
        dtoType: PurchaseInvoiceLine,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}`
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function updatePurchaseInvoiceNote(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    noteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<PurchaseInvoiceNote>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requireValue(noteId, 'note_id');
    requireNote(note);
    return client.sendPatchRequest<PurchaseInvoiceNote>(urls.PURCHASE_INVOICE_NOTE, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId, note_id: noteId},
        formData: {note},
        dtoType: PurchaseInvoiceNote,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoiceNote(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    noteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceNote>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<PurchaseInvoiceNote>(urls.PURCHASE_INVOICE_NOTE, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId, note_id: noteId},
        queryParams,
        dtoType: PurchaseInvoiceNote,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deletePurchaseInvoiceNote(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_INVOICE_NOTE, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId, note_id: noteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseInvoiceNoteFiles(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    noteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceNoteFileList>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<PurchaseInvoiceNoteFileList>(urls.PURCHASE_INVOICE_NOTE_FILES, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId, note_id: noteId},
        queryParams,
        dtoType: PurchaseInvoiceNoteFileList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files/{file_id}`
 */
export function getPurchaseInvoiceNoteFile(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    noteId: string,
    fileId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseInvoiceNoteFile>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendGetRequest<PurchaseInvoiceNoteFile>(urls.PURCHASE_INVOICE_NOTE_FILE, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId, note_id: noteId, file_id: fileId},
        queryParams,
        dtoType: PurchaseInvoiceNoteFile,
        ...options,
    });
}
