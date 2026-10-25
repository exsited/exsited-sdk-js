/** The reconciliations endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './reconciliationsUrls.js';

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

/**
 * `GET /api/{api_version}/reconciliations/{reconciliation_id}/sale_payments`
 *
 * List the payments in a reconciliation; the uuid or the numeric id.
 */
export function getReconciliationSalePayments(
    client: ExsitedClient,
    reconciliationId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(reconciliationId, 'reconciliation_id');
    return client.sendGetRequest<never>(urls.RECONCILIATION_SALE_PAYMENTS, {
        pathParams: {reconciliation_id: reconciliationId},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/reconciliations/{reconciliation_id}/sale_refunds`
 *
 * List the refunds in a reconciliation; the uuid or the numeric id.
 */
export function getReconciliationSaleRefunds(
    client: ExsitedClient,
    reconciliationId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(reconciliationId, 'reconciliation_id');
    return client.sendGetRequest<never>(urls.RECONCILIATION_SALE_REFUNDS, {
        pathParams: {reconciliation_id: reconciliationId},
        queryParams,
        ...options,
    });
}
