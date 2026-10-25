/** The purchase orders endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './purchaseOrdersUrls.js';
import {
    PurchaseOrderInformation,
    PurchaseOrderKpis,
    PurchaseOrderLineList,
    PurchaseOrderLineRead,
    PurchaseOrderList,
    PurchaseOrderNoteFile,
    PurchaseOrderNoteFileList,
    PurchaseOrderNotes,
    PurchaseOrderPurchaseInvoice,
    PurchaseOrderPurchaseInvoiceList,
    PurchaseOrderPurchasePaymentList,
    PurchaseOrderRead,
    PurchaseOrderUpdated,
    PurchaseOrders,
    PurchaseOrdersNote,
    PurchaseOrdersNoteList,
} from './purchaseOrdersDto.js';

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
 * `GET /api/{api_version}/purchase_orders`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrders(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderList>> {
    return client.sendGetRequest<PurchaseOrderList>(urls.PURCHASE_ORDERS, {
        queryParams,
        dtoType: PurchaseOrderList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_orders`
 *
 * Recorded status codes: 201.
 */
export function createPurchaseOrder(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrders>> {
    requirePayload(payload);
    return client.sendPostRequest<PurchaseOrders>(urls.PURCHASE_ORDERS, {
        jsonBody: payload,
        dtoType: PurchaseOrders,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/notes`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrdersNotes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrdersNoteList>> {
    return client.sendGetRequest<PurchaseOrdersNoteList>(urls.PURCHASE_ORDERS_NOTES, {
        queryParams,
        dtoType: PurchaseOrdersNoteList,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_orders/{purchase_order_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deletePurchaseOrder(
    client: ExsitedClient,
    purchaseOrderId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_ORDER, {
        pathParams: {purchase_order_id: purchaseOrderId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/purchase_orders/{purchase_order_id}`
 *
 * Recorded status codes: 202.
 */
export function updatePurchaseOrder(
    client: ExsitedClient,
    purchaseOrderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderUpdated>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requirePayload(payload);
    return client.sendPatchRequest<PurchaseOrderUpdated>(urls.PURCHASE_ORDER, {
        pathParams: {purchase_order_id: purchaseOrderId},
        jsonBody: payload,
        dtoType: PurchaseOrderUpdated,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrder(
    client: ExsitedClient,
    purchaseOrderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderRead>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendGetRequest<PurchaseOrderRead>(urls.PURCHASE_ORDER, {
        pathParams: {purchase_order_id: purchaseOrderId},
        queryParams,
        dtoType: PurchaseOrderRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_orders/{purchase_order_id}/cancel`
 *
 * Recorded status codes: 204.
 */
export function cancelPurchaseOrder(
    client: ExsitedClient,
    purchaseOrderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderUpdated>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseOrderUpdated>(urls.PURCHASE_ORDER_CANCEL, {
        pathParams: {purchase_order_id: purchaseOrderId},
        jsonBody: payload,
        dtoType: PurchaseOrderUpdated,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_orders/{purchase_order_id}/change`
 */
export function changePurchaseOrder(
    client: ExsitedClient,
    purchaseOrderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderRead>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseOrderRead>(urls.PURCHASE_ORDER_CHANGE, {
        pathParams: {purchase_order_id: purchaseOrderId},
        jsonBody: payload,
        dtoType: PurchaseOrderRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/information`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderInformation(
    client: ExsitedClient,
    purchaseOrderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderInformation>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendGetRequest<PurchaseOrderInformation>(urls.PURCHASE_ORDER_INFORMATION, {
        pathParams: {purchase_order_id: purchaseOrderId},
        queryParams,
        dtoType: PurchaseOrderInformation,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/kpis`
 *
 * A purchase order's KPI block, under `purchase_order_kpis`; the same block `getPurchaseOrder` carries as `kpis`.
 */
export function getPurchaseOrderKpis(
    client: ExsitedClient,
    purchaseOrderId: string,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderKpis>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendGetRequest<PurchaseOrderKpis>(urls.PURCHASE_ORDER_KPIS, {
        pathParams: {purchase_order_id: purchaseOrderId},
        dtoType: PurchaseOrderKpis,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/lines`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderLines(
    client: ExsitedClient,
    purchaseOrderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderLineList>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendGetRequest<PurchaseOrderLineList>(urls.PURCHASE_ORDER_LINES, {
        pathParams: {purchase_order_id: purchaseOrderId},
        queryParams,
        dtoType: PurchaseOrderLineList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderNotes(
    client: ExsitedClient,
    purchaseOrderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderNotes>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendGetRequest<PurchaseOrderNotes>(urls.PURCHASE_ORDER_NOTES, {
        pathParams: {purchase_order_id: purchaseOrderId},
        queryParams,
        dtoType: PurchaseOrderNotes,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_orders/{purchase_order_id}/notes`
 *
 * Recorded status codes: 500.
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function createPurchaseOrderNote(
    client: ExsitedClient,
    purchaseOrderId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<PurchaseOrdersNote>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requireNote(note);
    return client.sendPostRequest<PurchaseOrdersNote>(urls.PURCHASE_ORDER_NOTES, {
        pathParams: {purchase_order_id: purchaseOrderId},
        formData: {note},
        dtoType: PurchaseOrdersNote,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices`
 *
 * Recorded status codes: 400.
 */
export function createPurchaseOrderPurchaseInvoice(
    client: ExsitedClient,
    purchaseOrderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderPurchaseInvoice>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseOrderPurchaseInvoice>(urls.PURCHASE_ORDER_PURCHASE_INVOICES, {
        pathParams: {purchase_order_id: purchaseOrderId},
        jsonBody: payload,
        dtoType: PurchaseOrderPurchaseInvoice,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderPurchaseInvoices(
    client: ExsitedClient,
    purchaseOrderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderPurchaseInvoiceList>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendGetRequest<PurchaseOrderPurchaseInvoiceList>(urls.PURCHASE_ORDER_PURCHASE_INVOICES, {
        pathParams: {purchase_order_id: purchaseOrderId},
        queryParams,
        dtoType: PurchaseOrderPurchaseInvoiceList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_payments`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderPurchasePayments(
    client: ExsitedClient,
    purchaseOrderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderPurchasePaymentList>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendGetRequest<PurchaseOrderPurchasePaymentList>(urls.PURCHASE_ORDER_PURCHASE_PAYMENTS, {
        pathParams: {purchase_order_id: purchaseOrderId},
        queryParams,
        dtoType: PurchaseOrderPurchasePaymentList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_orders/{purchase_order_id}/reactivate`
 *
 * Recorded status codes: 204.
 */
export function reactivatePurchaseOrder(
    client: ExsitedClient,
    purchaseOrderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderUpdated>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseOrderUpdated>(urls.PURCHASE_ORDER_REACTIVATE, {
        pathParams: {purchase_order_id: purchaseOrderId},
        jsonBody: payload,
        dtoType: PurchaseOrderUpdated,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/lines/{purchase_order_line_uuid}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderLine(
    client: ExsitedClient,
    purchaseOrderId: string,
    purchaseOrderLineUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderLineRead>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requireValue(purchaseOrderLineUuid, 'purchase_order_line_uuid');
    return client.sendGetRequest<PurchaseOrderLineRead>(urls.PURCHASE_ORDER_LINE, {
        pathParams: {purchase_order_id: purchaseOrderId, purchase_order_line_uuid: purchaseOrderLineUuid},
        queryParams,
        dtoType: PurchaseOrderLineRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}`
 *
 * Recorded status codes: 400.
 *
 * No typed view, so `.dto` is null.
 */
export function deletePurchaseOrderNote(
    client: ExsitedClient,
    purchaseOrderId: string,
    purchaseOrderNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requireValue(purchaseOrderNoteId, 'purchase_order_note_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_ORDER_NOTE, {
        pathParams: {purchase_order_id: purchaseOrderId, purchase_order_note_id: purchaseOrderNoteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderNote(
    client: ExsitedClient,
    purchaseOrderId: string,
    purchaseOrderNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrdersNote>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requireValue(purchaseOrderNoteId, 'purchase_order_note_id');
    return client.sendGetRequest<PurchaseOrdersNote>(urls.PURCHASE_ORDER_NOTE, {
        pathParams: {purchase_order_id: purchaseOrderId, purchase_order_note_id: purchaseOrderNoteId},
        queryParams,
        dtoType: PurchaseOrdersNote,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderNoteFiles(
    client: ExsitedClient,
    purchaseOrderId: string,
    purchaseOrderNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderNoteFileList>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requireValue(purchaseOrderNoteId, 'purchase_order_note_id');
    return client.sendGetRequest<PurchaseOrderNoteFileList>(urls.PURCHASE_ORDER_NOTE_FILES, {
        pathParams: {purchase_order_id: purchaseOrderId, purchase_order_note_id: purchaseOrderNoteId},
        queryParams,
        dtoType: PurchaseOrderNoteFileList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files/{purchase_order_file_id}`
 *
 * Recorded status codes: 404.
 */
export function getPurchaseOrderNoteFile(
    client: ExsitedClient,
    purchaseOrderId: string,
    purchaseOrderNoteId: string,
    purchaseOrderFileId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderNoteFile>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requireValue(purchaseOrderNoteId, 'purchase_order_note_id');
    requireValue(purchaseOrderFileId, 'purchase_order_file_id');
    return client.sendGetRequest<PurchaseOrderNoteFile>(urls.PURCHASE_ORDER_NOTE_FILE, {
        pathParams: {
            purchase_order_id: purchaseOrderId,
            purchase_order_note_id: purchaseOrderNoteId,
            purchase_order_file_id: purchaseOrderFileId,
        },
        queryParams,
        dtoType: PurchaseOrderNoteFile,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files/{purchase_order_file_id}`
 *
 * Delete one attachment, by the purchase order's code and the attachment's `uuid`; `204`.
 */
export function deletePurchaseOrderNoteFile(
    client: ExsitedClient,
    purchaseOrderId: string,
    purchaseOrderNoteId: string,
    purchaseOrderFileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    requireValue(purchaseOrderNoteId, 'purchase_order_note_id');
    requireValue(purchaseOrderFileId, 'purchase_order_file_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_ORDER_NOTE_FILE, {
        pathParams: {
            purchase_order_id: purchaseOrderId,
            purchase_order_note_id: purchaseOrderNoteId,
            purchase_order_file_id: purchaseOrderFileId,
        },
        ...options,
    });
}
