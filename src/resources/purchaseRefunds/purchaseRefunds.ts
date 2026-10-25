/** The purchase refunds endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './purchaseRefundsUrls.js';
import {PurchaseRefund, PurchaseRefunds} from './purchaseRefundsDto.js';

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
 * `GET /api/{api_version}/purchase_refunds`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseRefunds(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseRefunds>> {
    return client.sendGetRequest<PurchaseRefunds>(urls.PURCHASE_REFUNDS, {
        queryParams,
        dtoType: PurchaseRefunds,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_refunds/{purchase_refund_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseRefund(
    client: ExsitedClient,
    purchaseRefundId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseRefund>> {
    requireValue(purchaseRefundId, 'purchase_refund_id');
    return client.sendGetRequest<PurchaseRefund>(urls.PURCHASE_REFUND, {
        pathParams: {purchase_refund_id: purchaseRefundId},
        queryParams,
        dtoType: PurchaseRefund,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/purchase_refunds`
 *
 * Refund from a purchase credit note; `201`, as `getPurchaseRefund` reads it. `payment_method` is the supplier's method
 * reference.
 */
export function createPurchaseCreditNotePurchaseRefund(
    client: ExsitedClient,
    purchaseCreditNoteId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseRefund>> {
    requireValue(purchaseCreditNoteId, 'purchase_credit_note_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseRefund>(urls.PURCHASE_CREDIT_NOTE_PURCHASE_REFUNDS, {
        pathParams: {purchase_credit_note_id: purchaseCreditNoteId},
        jsonBody: payload,
        dtoType: PurchaseRefund,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/purchase_refunds/{purchase_refund_id}`
 *
 * Edit a refund's reference, note, date or attributes, wrapped in `purchase_refund`; the amount cannot change.
 */
export function updatePurchaseRefund(
    client: ExsitedClient,
    purchaseRefundId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseRefund>> {
    requireValue(purchaseRefundId, 'purchase_refund_id');
    requirePayload(payload);
    return client.sendPatchRequest<PurchaseRefund>(urls.PURCHASE_REFUND, {
        pathParams: {purchase_refund_id: purchaseRefundId},
        jsonBody: payload,
        dtoType: PurchaseRefund,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_refunds/{purchase_refund_id}`
 *
 * Delete a refund, by its code; `204`.
 */
export function deletePurchaseRefund(
    client: ExsitedClient,
    purchaseRefundId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseRefundId, 'purchase_refund_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_REFUND, {
        pathParams: {purchase_refund_id: purchaseRefundId},
        ...options,
    });
}
