/** The orders endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './ordersUrls.js';
import {
    AccountOrders,
    OrderBillingPreferences,
    OrderCustomObject,
    OrderDiscardDraft,
    OrderExtendTrial,
    OrderInformation,
    OrderItemFulfillment,
    OrderKpis,
    OrderLine,
    OrderLines,
    OrderList,
    OrderNote,
    OrderNoteFile,
    OrderNoteFileList,
    OrderNoteList,
    OrderPayment,
    OrderPaymentMethod,
    OrderPaymentMethods,
    OrderPdf,
    OrderQuotePartialInvoices,
    OrderRead,
} from './ordersDto.js';

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

/** `GET /api/{api_version}/orders` */
export function getOrders(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderList>> {
    return client.sendGetRequest<OrderList>(urls.ORDERS, {
        queryParams,
        dtoType: OrderList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders`
 *
 * Answered `201`. One function takes every order body: a single or multi-line
 * order, a contract, a trial, custom attributes, billing properties, addresses, a
 * pre-order or a quote. A contract needs a recurring or metered item on a line.
 */
export function createOrder(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requirePayload(payload);
    return client.sendPostRequest<OrderRead>(urls.ORDERS, {
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/** `GET /api/{api_version}/orders/{order_id}` */
export function getOrder(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderRead>(urls.ORDER, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/orders/{order_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteOrder(
    client: ExsitedClient,
    orderId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    return client.sendDeleteRequest<never>(urls.ORDER, {
        pathParams: {order_id: orderId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/activate`
 *
 * No typed view, so `.dto` is null.
 */
export function activateOrder(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_ACTIVATE, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/activate_draft`
 */
export function createOrderActivateDraft(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderRead>(urls.ORDER_ACTIVATE_DRAFT, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/** `GET /api/{api_version}/orders/{order_id}/billing_preferences` */
export function getOrderBillingPreferences(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderBillingPreferences>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderBillingPreferences>(urls.ORDER_BILLING_PREFERENCES, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: OrderBillingPreferences,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/orders/{order_id}/billing_preferences`
 */
export function updateOrderBillingPreferences(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPatchRequest<OrderRead>(urls.ORDER_BILLING_PREFERENCES, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `PUT /api/{api_version}/orders/{order_id}/billing_preferences`
 */
export function replaceOrderBillingPreferences(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPutRequest<OrderRead>(urls.ORDER_BILLING_PREFERENCES, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/cancel`
 */
export function cancelOrder(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderRead>(urls.ORDER_CANCEL, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/change`
 */
export function changeOrder(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderRead>(urls.ORDER_CHANGE, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/convert_to_order`
 */
export function createOrderConvertToOrder(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderRead>(urls.ORDER_CONVERT_TO_ORDER, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/** `GET /api/{api_version}/orders/{order_id}/custom_objects` */
export function getOrderCustomObjects(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountOrders>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<AccountOrders>(urls.ORDER_CUSTOM_OBJECTS, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: AccountOrders,
        ...options,
    });
}

/** `GET /api/{api_version}/orders/{order_id}/custom_objects_instances` */
export function getOrderCustomObjectsInstances(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountOrders>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<AccountOrders>(urls.ORDER_CUSTOM_OBJECTS_INSTANCES, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: AccountOrders,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/discard_draft`
 */
export function createOrderDiscardDraft(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderDiscardDraft>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderDiscardDraft>(urls.ORDER_DISCARD_DRAFT, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderDiscardDraft,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/extend_trial`
 *
 * Answered `200` with a message. The new trial window must start after the
 * current trial ends.
 */
export function createOrderExtendTrial(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderExtendTrial>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderExtendTrial>(urls.ORDER_EXTEND_TRIAL, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderExtendTrial,
        ...options,
    });
}

/** `GET /api/{api_version}/orders/{order_id}/information` */
export function getOrderInformation(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderInformation>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderInformation>(urls.ORDER_INFORMATION, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: OrderInformation,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/orders/{order_id}/information`
 */
export function updateOrderInformation(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPatchRequest<OrderRead>(urls.ORDER_INFORMATION, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/** `GET /api/{api_version}/orders/{order_id}/item_fulfillments` */
export function getOrderItemFulfillments(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountOrders>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<AccountOrders>(urls.ORDER_ITEM_FULFILLMENTS, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: AccountOrders,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/lines`
 */
export function getOrderLines(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderLines>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderLines>(urls.ORDER_LINES, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: OrderLines,
        ...options,
    });
}

/** `GET /api/{api_version}/orders/{order_id}/notes` */
export function getOrderNotes(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderNoteList>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderNoteList>(urls.ORDER_NOTES, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: OrderNoteList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/notes`
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function createOrderNote(
    client: ExsitedClient,
    orderId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<OrderNote>> {
    requireValue(orderId, 'order_id');
    requireNote(note);
    return client.sendPostRequest<OrderNote>(urls.ORDER_NOTES, {
        pathParams: {order_id: orderId},
        formData: {note},
        dtoType: OrderNote,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/payment_methods`
 */
export function getOrderPaymentMethods(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderPaymentMethods>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderPaymentMethods>(urls.ORDER_PAYMENT_METHODS, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: OrderPaymentMethods,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/pdf`
 */
export function getOrderPdf(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderPdf>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderPdf>(urls.ORDER_PDF, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: OrderPdf,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/reactivate`
 */
export function reactivateOrder(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderRead>(urls.ORDER_REACTIVATE, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/relinquish`
 */
export function createOrderRelinquish(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderRead>(urls.ORDER_RELINQUISH, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/orders/{order_id}/lines/{line_uuid}`
 */
export function updateOrderLine(
    client: ExsitedClient,
    orderId: string,
    lineUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requireValue(lineUuid, 'line_uuid');
    requirePayload(payload);
    return client.sendPatchRequest<OrderRead>(urls.ORDER_LINE, {
        pathParams: {order_id: orderId, line_uuid: lineUuid},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/lines/{line_uuid}`
 */
export function getOrderLine(
    client: ExsitedClient,
    orderId: string,
    lineUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderLine>> {
    requireValue(orderId, 'order_id');
    requireValue(lineUuid, 'line_uuid');
    return client.sendGetRequest<OrderLine>(urls.ORDER_LINE, {
        pathParams: {order_id: orderId, line_uuid: lineUuid},
        queryParams,
        dtoType: OrderLine,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/orders/{order_id}/notes/{order_note_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteOrderNote(
    client: ExsitedClient,
    orderId: string,
    orderNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requireValue(orderNoteId, 'order_note_id');
    return client.sendDeleteRequest<never>(urls.ORDER_NOTE, {
        pathParams: {order_id: orderId, order_note_id: orderNoteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/notes/{order_note_id}`
 */
export function getOrderNote(
    client: ExsitedClient,
    orderId: string,
    orderNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderNote>> {
    requireValue(orderId, 'order_id');
    requireValue(orderNoteId, 'order_note_id');
    return client.sendGetRequest<OrderNote>(urls.ORDER_NOTE, {
        pathParams: {order_id: orderId, order_note_id: orderNoteId},
        queryParams,
        dtoType: OrderNote,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/orders/{order_id}/notes/{order_note_id}`
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function updateOrderNote(
    client: ExsitedClient,
    orderId: string,
    orderNoteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<OrderNote>> {
    requireValue(orderId, 'order_id');
    requireValue(orderNoteId, 'order_note_id');
    requireNote(note);
    return client.sendPatchRequest<OrderNote>(urls.ORDER_NOTE, {
        pathParams: {order_id: orderId, order_note_id: orderNoteId},
        formData: {note},
        dtoType: OrderNote,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/payment_methods/{payment_method_ref}`
 */
export function getOrderPaymentMethod(
    client: ExsitedClient,
    orderId: string,
    paymentMethodRef: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderPaymentMethod>> {
    requireValue(orderId, 'order_id');
    requireValue(paymentMethodRef, 'payment_method_ref');
    return client.sendGetRequest<OrderPaymentMethod>(urls.ORDER_PAYMENT_METHOD, {
        pathParams: {order_id: orderId, payment_method_ref: paymentMethodRef},
        queryParams,
        dtoType: OrderPaymentMethod,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/orders/{order_id}/lines/{line_uuid}/billing_preferences`
 */
export function updateOrderLineBillingPreferences(
    client: ExsitedClient,
    orderId: string,
    lineUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requireValue(lineUuid, 'line_uuid');
    requirePayload(payload);
    return client.sendPatchRequest<OrderRead>(urls.ORDER_LINE_BILLING_PREFERENCES, {
        pathParams: {order_id: orderId, line_uuid: lineUuid},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `PUT /api/{api_version}/orders/{order_id}/lines/{line_uuid}/billing_preferences`
 */
export function replaceOrderLineBillingPreferences(
    client: ExsitedClient,
    orderId: string,
    lineUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requireValue(lineUuid, 'line_uuid');
    requirePayload(payload);
    return client.sendPutRequest<OrderRead>(urls.ORDER_LINE_BILLING_PREFERENCES, {
        pathParams: {order_id: orderId, line_uuid: lineUuid},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/notes/{order_note_id}/files`
 */
export function getOrderNoteFiles(
    client: ExsitedClient,
    orderId: string,
    orderNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderNoteFileList>> {
    requireValue(orderId, 'order_id');
    requireValue(orderNoteId, 'order_note_id');
    return client.sendGetRequest<OrderNoteFileList>(urls.ORDER_NOTE_FILES, {
        pathParams: {order_id: orderId, order_note_id: orderNoteId},
        queryParams,
        dtoType: OrderNoteFileList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/notes/{order_note_id}/files/{order_file_id}`
 */
export function getOrderNoteFile(
    client: ExsitedClient,
    orderId: string,
    orderNoteId: string,
    orderFileId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderNoteFile>> {
    requireValue(orderId, 'order_id');
    requireValue(orderNoteId, 'order_note_id');
    requireValue(orderFileId, 'order_file_id');
    return client.sendGetRequest<OrderNoteFile>(urls.ORDER_NOTE_FILE, {
        pathParams: {order_id: orderId, order_note_id: orderNoteId, order_file_id: orderFileId},
        queryParams,
        dtoType: OrderNoteFile,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/notes`
 *
 * List the notes of every order; not scoped to one order.
 */
export function getOrdersNotes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<OrderNoteList>> {
    return client.sendGetRequest<OrderNoteList>(urls.ORDERS_NOTES, {
        queryParams,
        dtoType: OrderNoteList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/preview`
 *
 * Price an order without creating it, the `createOrder` body; `201`, with no cart data in the answer. An `account`
 * object still creates that account.
 */
export function previewOrder(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDERS_PREVIEW, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/express`
 *
 * Create an order, and its invoice and payment if the body nests them, in one call, the `createExpress` body under
 * `account`. Untested against the API.
 */
export function createOrderExpress(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDERS_EXPRESS, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/accept`
 *
 * Accept an order's pending acceptance; no body sent. It raises an invoice and may require payment. Untested against the API.
 */
export function acceptOrder(
    client: ExsitedClient,
    orderId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    return client.sendPostRequest<never>(urls.ORDER_ACCEPT, {
        pathParams: {order_id: orderId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/activate_invoice_from_dormant/{invoice_uuid}`
 *
 * Activate a dormant invoice, body under `activate`: `due_date`, `amount`. Untested against the API.
 */
export function activateOrderInvoiceFromDormant(
    client: ExsitedClient,
    orderId: string,
    invoiceUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requireValue(invoiceUuid, 'invoice_uuid');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_ACTIVATE_INVOICE_FROM_DORMANT, {
        pathParams: {order_id: orderId, invoice_uuid: invoiceUuid},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/change/preview`
 *
 * Preview a change, the `changeOrder` body; nothing is changed, and the answer is the order as it stands.
 */
export function previewOrderChange(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<OrderRead>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<OrderRead>(urls.ORDER_CHANGE_PREVIEW, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        dtoType: OrderRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/change_status`
 *
 * Trigger a workflow state, body `order.workflow_status`; it runs the workflow's connections. Untested against the API.
 */
export function changeOrderStatus(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_CHANGE_STATUS, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/contract_adjustment`
 *
 * Upgrade or downgrade by package rank; the body is not wrapped: `effective_date` and `lines`. Untested against the API.
 */
export function adjustOrderContract(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_CONTRACT_ADJUSTMENT, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/contract_adjustment/preview`
 *
 * Preview a contract adjustment, the `adjustOrderContract` body, not wrapped.
 */
export function previewOrderContractAdjustment(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_CONTRACT_ADJUSTMENT_PREVIEW, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/downgrade`
 *
 * Downgrade a contract; the body is not wrapped: `effective_date` and `lines` naming each `charge_item_uuid` and
 * `package_name`.
 */
export function downgradeOrder(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_DOWNGRADE, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/downgrade/preview`
 *
 * Preview a downgrade, the `downgradeOrder` body, not wrapped.
 */
export function previewOrderDowngrade(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_DOWNGRADE_PREVIEW, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/upgrade`
 *
 * Upgrade a contract; the body is not wrapped: `effective_date` and `lines` naming each `charge_item_uuid` and
 * `package_name`.
 */
export function upgradeOrder(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_UPGRADE, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/upgrade/preview`
 *
 * Preview an upgrade, the `upgradeOrder` body, not wrapped.
 */
export function previewOrderUpgrade(
    client: ExsitedClient,
    orderId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.ORDER_UPGRADE_PREVIEW, {
        pathParams: {order_id: orderId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/orders/{order_id}/terminate_trial`
 *
 * End a contract's trial now; no body sent. It starts the contract. Untested against the API.
 */
export function terminateOrderTrial(
    client: ExsitedClient,
    orderId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    return client.sendPostRequest<never>(urls.ORDER_TERMINATE_TRIAL, {
        pathParams: {order_id: orderId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/orders/{order_id}/notes/{order_note_id}/files/{order_file_id}`
 *
 * Delete a note attachment; `204`.
 */
export function deleteOrderNoteFile(
    client: ExsitedClient,
    orderId: string,
    orderNoteId: string,
    orderFileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requireValue(orderNoteId, 'order_note_id');
    requireValue(orderFileId, 'order_file_id');
    return client.sendDeleteRequest<never>(urls.ORDER_NOTE_FILE, {
        pathParams: {order_id: orderId, order_note_id: orderNoteId, order_file_id: orderFileId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/custom_objects/{custom_object_id}`
 *
 * One custom object with the order's instances of it.
 */
export function getOrderCustomObject(
    client: ExsitedClient,
    orderId: string,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<OrderCustomObject>> {
    requireValue(orderId, 'order_id');
    requireValue(customObjectId, 'custom_object_id');
    return client.sendGetRequest<OrderCustomObject>(urls.ORDER_CUSTOM_OBJECT, {
        pathParams: {order_id: orderId, custom_object_id: customObjectId},
        dtoType: OrderCustomObject,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/custom_objects/{custom_object_id}/instances/{instance_id}`
 *
 * One custom object instance.
 */
export function getOrderCustomObjectInstance(
    client: ExsitedClient,
    orderId: string,
    customObjectId: string,
    instanceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requireValue(customObjectId, 'custom_object_id');
    requireValue(instanceId, 'instance_id');
    return client.sendGetRequest<never>(urls.ORDER_CUSTOM_OBJECT_INSTANCE, {
        pathParams: {order_id: orderId, custom_object_id: customObjectId, instance_id: instanceId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/custom_objects_instances/{custom_object_id}`
 *
 * The server's alias of `getOrderCustomObject`.
 */
export function getOrderCustomObjectsInstance(
    client: ExsitedClient,
    orderId: string,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<OrderCustomObject>> {
    requireValue(orderId, 'order_id');
    requireValue(customObjectId, 'custom_object_id');
    return client.sendGetRequest<OrderCustomObject>(urls.ORDER_CUSTOM_OBJECTS_INSTANCE, {
        pathParams: {order_id: orderId, custom_object_id: customObjectId},
        dtoType: OrderCustomObject,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/custom_objects_instances/{custom_object_id}/instances/{instance_id}`
 *
 * The server's alias of `getOrderCustomObjectInstance`.
 */
export function getOrderCustomObjectsInstanceInstance(
    client: ExsitedClient,
    orderId: string,
    customObjectId: string,
    instanceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requireValue(customObjectId, 'custom_object_id');
    requireValue(instanceId, 'instance_id');
    return client.sendGetRequest<never>(urls.ORDER_CUSTOM_OBJECTS_INSTANCE_INSTANCE, {
        pathParams: {order_id: orderId, custom_object_id: customObjectId, instance_id: instanceId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/item_fulfillments/{fulfillment_id}`
 *
 * One fulfillment; the server does not check that the fulfillment belongs to the order.
 */
export function getOrderItemFulfillment(
    client: ExsitedClient,
    orderId: string,
    fulfillmentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<OrderItemFulfillment>> {
    requireValue(orderId, 'order_id');
    requireValue(fulfillmentId, 'fulfillment_id');
    return client.sendGetRequest<OrderItemFulfillment>(urls.ORDER_ITEM_FULFILLMENT, {
        pathParams: {order_id: orderId, fulfillment_id: fulfillmentId},
        dtoType: OrderItemFulfillment,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/kpis`
 *
 * An order's KPIs, under `order_kpis`.
 */
export function getOrderKpis(
    client: ExsitedClient,
    orderId: string,
    options: CallOptions = {},
): Promise<ApiResponse<OrderKpis>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderKpis>(urls.ORDER_KPIS, {
        pathParams: {order_id: orderId},
        dtoType: OrderKpis,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/payments/{payment_id}`
 *
 * One payment; the server does not check that the payment belongs to the order.
 */
export function getOrderPayment(
    client: ExsitedClient,
    orderId: string,
    paymentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<OrderPayment>> {
    requireValue(orderId, 'order_id');
    requireValue(paymentId, 'payment_id');
    return client.sendGetRequest<OrderPayment>(urls.ORDER_PAYMENT, {
        pathParams: {order_id: orderId, payment_id: paymentId},
        dtoType: OrderPayment,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/quote_partial_invoices`
 *
 * The deposit and instalment invoices of a converted quote; an unconverted quote answers `400`.
 */
export function getOrderQuotePartialInvoices(
    client: ExsitedClient,
    orderId: string,
    options: CallOptions = {},
): Promise<ApiResponse<OrderQuotePartialInvoices>> {
    requireValue(orderId, 'order_id');
    return client.sendGetRequest<OrderQuotePartialInvoices>(urls.ORDER_QUOTE_PARTIAL_INVOICES, {
        pathParams: {order_id: orderId},
        dtoType: OrderQuotePartialInvoices,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/orders/{order_id}/shipping_pdf/{shipping_line_id}`
 *
 * A shipping line's PDF; `404` until the line has a generated shipping PDF.
 */
export function getOrderShippingPdf(
    client: ExsitedClient,
    orderId: string,
    shippingLineId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(orderId, 'order_id');
    requireValue(shippingLineId, 'shipping_line_id');
    return client.sendGetRequest<never>(urls.ORDER_SHIPPING_PDF, {
        pathParams: {order_id: orderId, shipping_line_id: shippingLineId},
        ...options,
    });
}
