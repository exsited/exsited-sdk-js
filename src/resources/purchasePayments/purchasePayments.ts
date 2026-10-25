/** The purchase payments endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './purchasePaymentsUrls.js';
import {
    PurchasePaymentList,
    PurchasePaymentNote,
    PurchasePaymentNoteFile,
    PurchasePaymentNoteFileList,
    PurchasePaymentNoteList,
    PurchasePaymentNoteUpdated,
    PurchasePaymentNotes,
    PurchasePaymentRead,
    PurchasePaymentUpdated,
    PurchasePayments,
} from './purchasePaymentsDto.js';
import {PurchaseCreditNoteList} from '../purchaseCreditNotes/purchaseCreditNotesDto.js';

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
 * `GET /api/{api_version}/purchase_payments`
 *
 * Recorded status codes: 200.
 */
export function getPurchasePayments(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePaymentList>> {
    return client.sendGetRequest<PurchasePaymentList>(urls.PURCHASE_PAYMENTS, {
        queryParams,
        dtoType: PurchasePaymentList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_payments`
 *
 * Recorded status codes: 200.
 */
export function createPurchasePayment(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePayments>> {
    requirePayload(payload);
    return client.sendPostRequest<PurchasePayments>(urls.PURCHASE_PAYMENTS, {
        jsonBody: payload,
        dtoType: PurchasePayments,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_payments/{purchase_payment_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deletePurchasePayment(
    client: ExsitedClient,
    purchasePaymentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_PAYMENT, {
        pathParams: {purchase_payment_id: purchasePaymentId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_payments/{purchase_payment_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchasePayment(
    client: ExsitedClient,
    purchasePaymentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePaymentRead>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    return client.sendGetRequest<PurchasePaymentRead>(urls.PURCHASE_PAYMENT, {
        pathParams: {purchase_payment_id: purchasePaymentId},
        queryParams,
        dtoType: PurchasePaymentRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/purchase_payments/{purchase_payment_id}`
 *
 * Recorded status codes: 200.
 */
export function updatePurchasePayment(
    client: ExsitedClient,
    purchasePaymentId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePaymentUpdated>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    requirePayload(payload);
    return client.sendPatchRequest<PurchasePaymentUpdated>(urls.PURCHASE_PAYMENT, {
        pathParams: {purchase_payment_id: purchasePaymentId},
        jsonBody: payload,
        dtoType: PurchasePaymentUpdated,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments`
 *
 * Recorded status codes: 200.
 */
export function createPurchaseInvoicePurchasePayment(
    client: ExsitedClient,
    purchaseInvoiceId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePayments>> {
    requireValue(purchaseInvoiceId, 'purchase_invoice_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchasePayments>(urls.PURCHASE_INVOICE_PURCHASE_PAYMENTS, {
        pathParams: {purchase_invoice_id: purchaseInvoiceId},
        jsonBody: payload,
        dtoType: PurchasePayments,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_payments/{purchase_payment_id}/purchase_credit_notes`
 *
 * The purchase credit notes a payment raised; a paged listing.
 */
export function getPurchasePaymentPurchaseCreditNotes(
    client: ExsitedClient,
    purchasePaymentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteList>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    return client.sendGetRequest<PurchaseCreditNoteList>(urls.PURCHASE_PAYMENT_PURCHASE_CREDIT_NOTES, {
        pathParams: {purchase_payment_id: purchasePaymentId},
        queryParams,
        dtoType: PurchaseCreditNoteList,
        ...options,
    });
}

/** `GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes` */
export function getPurchasePaymentNotes(
    client: ExsitedClient,
    purchasePaymentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePaymentNoteList>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    return client.sendGetRequest<PurchasePaymentNoteList>(urls.PURCHASE_PAYMENT_NOTES, {
        pathParams: {purchase_payment_id: purchasePaymentId},
        queryParams,
        dtoType: PurchasePaymentNoteList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_payments/{purchase_payment_id}/notes`
 *
 * Recorded status codes: 200.
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function createPurchasePaymentNote(
    client: ExsitedClient,
    purchasePaymentId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<PurchasePaymentNotes>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    requireNote(note);
    return client.sendPostRequest<PurchasePaymentNotes>(urls.PURCHASE_PAYMENT_NOTES, {
        pathParams: {purchase_payment_id: purchasePaymentId},
        formData: {note},
        dtoType: PurchasePaymentNotes,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchasePaymentNote(
    client: ExsitedClient,
    purchasePaymentId: string,
    ppNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePaymentNote>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    requireValue(ppNoteId, 'pp_note_id');
    return client.sendGetRequest<PurchasePaymentNote>(urls.PURCHASE_PAYMENT_NOTE, {
        pathParams: {purchase_payment_id: purchasePaymentId, pp_note_id: ppNoteId},
        queryParams,
        dtoType: PurchasePaymentNote,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}`
 *
 * Update a note; a form, the text as the `note` field, answered under `note`.
 */
export function updatePurchasePaymentNote(
    client: ExsitedClient,
    purchasePaymentId: string,
    ppNoteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<PurchasePaymentNoteUpdated>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    requireValue(ppNoteId, 'pp_note_id');
    requireNote(note);
    return client.sendPatchRequest<PurchasePaymentNoteUpdated>(urls.PURCHASE_PAYMENT_NOTE, {
        pathParams: {purchase_payment_id: purchasePaymentId, pp_note_id: ppNoteId},
        formData: {note},
        dtoType: PurchasePaymentNoteUpdated,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deletePurchasePaymentNote(
    client: ExsitedClient,
    purchasePaymentId: string,
    ppNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    requireValue(ppNoteId, 'pp_note_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_PAYMENT_NOTE, {
        pathParams: {purchase_payment_id: purchasePaymentId, pp_note_id: ppNoteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files`
 *
 * Recorded status codes: 200.
 */
export function getPurchasePaymentNoteFiles(
    client: ExsitedClient,
    purchasePaymentId: string,
    ppNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePaymentNoteFileList>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    requireValue(ppNoteId, 'pp_note_id');
    return client.sendGetRequest<PurchasePaymentNoteFileList>(urls.PURCHASE_PAYMENT_NOTE_FILES, {
        pathParams: {purchase_payment_id: purchasePaymentId, pp_note_id: ppNoteId},
        queryParams,
        dtoType: PurchasePaymentNoteFileList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files/{file_id}`
 */
export function getPurchasePaymentNoteFile(
    client: ExsitedClient,
    purchasePaymentId: string,
    ppNoteId: string,
    fileId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchasePaymentNoteFile>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    requireValue(ppNoteId, 'pp_note_id');
    requireValue(fileId, 'file_id');
    return client.sendGetRequest<PurchasePaymentNoteFile>(urls.PURCHASE_PAYMENT_NOTE_FILE, {
        pathParams: {purchase_payment_id: purchasePaymentId, pp_note_id: ppNoteId, file_id: fileId},
        queryParams,
        dtoType: PurchasePaymentNoteFile,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files/{file_id}`
 *
 * Delete one attachment, by the attachment's `uuid`; `204`.
 */
export function deletePurchasePaymentNoteFile(
    client: ExsitedClient,
    purchasePaymentId: string,
    ppNoteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchasePaymentId, 'purchase_payment_id');
    requireValue(ppNoteId, 'pp_note_id');
    requireValue(fileId, 'file_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_PAYMENT_NOTE_FILE, {
        pathParams: {purchase_payment_id: purchasePaymentId, pp_note_id: ppNoteId, file_id: fileId},
        ...options,
    });
}
