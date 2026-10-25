/** The payments endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './paymentsUrls.js';
import {
    PaymentList,
    PaymentNoteFile,
    PaymentNoteList,
    PaymentNoteRead,
    PaymentRead,
    PaymentsNoteList,
} from './paymentsDto.js';
import {NoteFileList} from '../accounts/accountsDto.js';

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
 * `GET /api/{api_version}/payments`
 *
 * Recorded status codes: 200.
 */
export function getPayments(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentList>> {
    return client.sendGetRequest<PaymentList>(urls.PAYMENTS, {
        queryParams,
        dtoType: PaymentList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/payments/notes`
 *
 * Recorded status codes: 200.
 */
export function getPaymentsNotes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentsNoteList>> {
    return client.sendGetRequest<PaymentsNoteList>(urls.PAYMENTS_NOTES, {
        queryParams,
        dtoType: PaymentsNoteList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/payments`
 *
 * Record a payment, wrapped in `payment`; `201`, answered as `getPayment` reads it. A `payment_applied` processor with
 * a card token charges the card.
 */
export function createPayment(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentRead>> {
    requirePayload(payload);
    return client.sendPostRequest<PaymentRead>(urls.PAYMENTS, {
        jsonBody: payload,
        dtoType: PaymentRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/payments/{payment_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deletePayment(
    client: ExsitedClient,
    paymentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(paymentId, 'payment_id');
    return client.sendDeleteRequest<never>(urls.PAYMENT, {
        pathParams: {payment_id: paymentId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/payments/{payment_id}`
 */
export function updatePayment(
    client: ExsitedClient,
    paymentId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentRead>> {
    requireValue(paymentId, 'payment_id');
    requirePayload(payload);
    return client.sendPatchRequest<PaymentRead>(urls.PAYMENT, {
        pathParams: {payment_id: paymentId},
        jsonBody: payload,
        dtoType: PaymentRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/payments/{payment_id}`
 *
 * Recorded status codes: 200.
 */
export function getPayment(
    client: ExsitedClient,
    paymentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentRead>> {
    requireValue(paymentId, 'payment_id');
    return client.sendGetRequest<PaymentRead>(urls.PAYMENT, {
        pathParams: {payment_id: paymentId},
        queryParams,
        dtoType: PaymentRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/invoices/{invoice_id}/payments`
 *
 * Recorded status codes: 200.
 */
export function getInvoicePayments(
    client: ExsitedClient,
    invoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentList>> {
    requireValue(invoiceId, 'invoice_id');
    return client.sendGetRequest<PaymentList>(urls.INVOICE_PAYMENTS, {
        pathParams: {invoice_id: invoiceId},
        queryParams,
        dtoType: PaymentList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/invoices/{invoice_id}/payments/{payment_id}`
 *
 * Retrieve one payment through an invoice; the payment is not checked against the invoice, only the invoice's existence
 * is.
 */
export function getInvoicePayment(
    client: ExsitedClient,
    invoiceId: string,
    paymentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentRead>> {
    requireValue(invoiceId, 'invoice_id');
    requireValue(paymentId, 'payment_id');
    return client.sendGetRequest<PaymentRead>(urls.INVOICE_PAYMENT, {
        pathParams: {invoice_id: invoiceId, payment_id: paymentId},
        dtoType: PaymentRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/payments`
 *
 * Recorded status codes: 200.
 */
export function getOrderPayments(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentList>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<PaymentList>(urls.ORDER_PAYMENTS, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: PaymentList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/payments/{payment_id}/notes`
 *
 * Recorded status codes: 200.
 */
export function getPaymentNotes(
    client: ExsitedClient,
    paymentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentNoteList>> {
    requireValue(paymentId, 'payment_id');
    return client.sendGetRequest<PaymentNoteList>(urls.PAYMENT_NOTES, {
        pathParams: {payment_id: paymentId},
        queryParams,
        dtoType: PaymentNoteList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/payments/{payment_id}/notes`
 *
 * Recorded status codes: 500.
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function createPaymentNote(
    client: ExsitedClient,
    paymentId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<PaymentNoteRead>> {
    requireValue(paymentId, 'payment_id');
    requireNote(note);
    return client.sendPostRequest<PaymentNoteRead>(urls.PAYMENT_NOTES, {
        pathParams: {payment_id: paymentId},
        formData: {note},
        dtoType: PaymentNoteRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/payments/{payment_id}/notes/{payment_note_id}`
 *
 * Recorded status codes: 200.
 */
export function getPaymentNote(
    client: ExsitedClient,
    paymentId: string,
    paymentNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentNoteRead>> {
    requireValue(paymentId, 'payment_id');
    requireValue(paymentNoteId, 'payment_note_id');
    return client.sendGetRequest<PaymentNoteRead>(urls.PAYMENT_NOTE, {
        pathParams: {payment_id: paymentId, payment_note_id: paymentNoteId},
        queryParams,
        dtoType: PaymentNoteRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/payments/{payment_id}/notes/{payment_note_id}`
 *
 * Recorded status codes: 400.
 *
 * No typed view, so `.dto` is null.
 */
export function deletePaymentNote(
    client: ExsitedClient,
    paymentId: string,
    paymentNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(paymentId, 'payment_id');
    requireValue(paymentNoteId, 'payment_note_id');
    return client.sendDeleteRequest<never>(urls.PAYMENT_NOTE, {
        pathParams: {payment_id: paymentId, payment_note_id: paymentNoteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/payments/{payment_id}/notes/{payment_note_id}/files`
 *
 * List a note's attachments, under `data`.
 */
export function getPaymentNoteFiles(
    client: ExsitedClient,
    paymentId: string,
    paymentNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteFileList>> {
    requireValue(paymentId, 'payment_id');
    requireValue(paymentNoteId, 'payment_note_id');
    return client.sendGetRequest<NoteFileList>(urls.PAYMENT_NOTE_FILES, {
        pathParams: {payment_id: paymentId, payment_note_id: paymentNoteId},
        dtoType: NoteFileList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/payments/{payment_id}/notes/{payment_note_id}/files/{payment_file_id}`
 *
 * Recorded status codes: 404.
 */
export function getPaymentNoteFile(
    client: ExsitedClient,
    paymentId: string,
    paymentNoteId: string,
    paymentFileId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PaymentNoteFile>> {
    requireValue(paymentId, 'payment_id');
    requireValue(paymentNoteId, 'payment_note_id');
    requireValue(paymentFileId, 'payment_file_id');
    return client.sendGetRequest<PaymentNoteFile>(urls.PAYMENT_NOTE_FILE, {
        pathParams: {payment_id: paymentId, payment_note_id: paymentNoteId, payment_file_id: paymentFileId},
        queryParams,
        dtoType: PaymentNoteFile,
        ...options,
    });
}
