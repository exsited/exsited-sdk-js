/** The item receipts endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './itemReceiptsUrls.js';
import {
    ItemReceipt,
    ItemReceiptList,
    ItemReceiptUpdated,
    ItemReceipts,
    PurchaseOrderItemReceipts,
} from './itemReceiptsDto.js';

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
 * `GET /api/{api_version}/item_receipts`
 *
 * Recorded status codes: 200.
 */
export function getItemReceipts(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ItemReceiptList>> {
    return client.sendGetRequest<ItemReceiptList>(urls.ITEM_RECEIPTS, {
        queryParams,
        dtoType: ItemReceiptList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/item_receipts`
 *
 * Recorded status codes: 201.
 */
export function createItemReceipt(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ItemReceipts>> {
    requirePayload(payload);
    return client.sendPostRequest<ItemReceipts>(urls.ITEM_RECEIPTS, {
        jsonBody: payload,
        dtoType: ItemReceipts,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/item_receipts/{item_receipt_id}`
 *
 * Recorded status codes: 202.
 */
export function updateItemReceipt(
    client: ExsitedClient,
    itemReceiptId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ItemReceiptUpdated>> {
    requireValue(itemReceiptId, 'item_receipt_id');
    requirePayload(payload);
    return client.sendPatchRequest<ItemReceiptUpdated>(urls.ITEM_RECEIPT, {
        pathParams: {item_receipt_id: itemReceiptId},
        jsonBody: payload,
        dtoType: ItemReceiptUpdated,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/item_receipts/{item_receipt_id}`
 *
 * Recorded status codes: 200.
 */
export function getItemReceipt(
    client: ExsitedClient,
    itemReceiptId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ItemReceipt>> {
    requireValue(itemReceiptId, 'item_receipt_id');
    return client.sendGetRequest<ItemReceipt>(urls.ITEM_RECEIPT, {
        pathParams: {item_receipt_id: itemReceiptId},
        queryParams,
        dtoType: ItemReceipt,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_orders/{purchase_order_id}/item_receipts`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseOrderItemReceipts(
    client: ExsitedClient,
    purchaseOrderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseOrderItemReceipts>> {
    requireValue(purchaseOrderId, 'purchase_order_id');
    return client.sendGetRequest<PurchaseOrderItemReceipts>(urls.PURCHASE_ORDER_ITEM_RECEIPTS, {
        pathParams: {purchase_order_id: purchaseOrderId},
        queryParams,
        dtoType: PurchaseOrderItemReceipts,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/item_receipts/{item_receipt_id}`
 *
 * Delete item receipt, by its `ir_` id; refused `400` `stock_committed` once the receipt is completed.
 */
export function deleteItemReceipt(
    client: ExsitedClient,
    itemReceiptId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(itemReceiptId, 'item_receipt_id');
    return client.sendDeleteRequest<never>(urls.ITEM_RECEIPT, {
        pathParams: {item_receipt_id: itemReceiptId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/item_receipts/{item_receipt_id}/notes/{note_id}`
 *
 * Delete item receipt note, `ir_` and `note_` ids; no route lists or creates a receipt's notes.
 */
export function deleteItemReceiptNote(
    client: ExsitedClient,
    itemReceiptId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(itemReceiptId, 'item_receipt_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.ITEM_RECEIPT_NOTE, {
        pathParams: {item_receipt_id: itemReceiptId, note_id: noteId},
        ...options,
    });
}
