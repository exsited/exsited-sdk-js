/** The purchase express endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './purchaseExpressUrls.js';
import {PurchaseExpress} from './purchaseExpressDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/**
 * `POST /api/{api_version}/purchase_express`
 *
 * Create a purchase order, and its purchase invoice and payment if the body nests them, in one call, body
 * `account.purchase_order`; `201`.
 */
export function createPurchaseExpress(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseExpress>> {
    requirePayload(payload);
    return client.sendPostRequest<PurchaseExpress>(urls.PURCHASE_EXPRESS, {
        jsonBody: payload,
        dtoType: PurchaseExpress,
        ...options,
    });
}
