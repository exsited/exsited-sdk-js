/** The quote orders endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './quoteOrdersUrls.js';
import {QuoteOrderInvoiceList} from './quoteOrdersDto.js';

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
 * `GET /api/{api_version}/quote_orders/{quote_order_id}/invoices`
 *
 * List the invoices raised from a quote; an order that is not a quote answers `404`.
 */
export function getQuoteOrderInvoices(
    client: ExsitedClient,
    quoteOrderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<QuoteOrderInvoiceList>> {
    requireValue(quoteOrderId, 'quote_order_id');
    return client.sendGetRequest<QuoteOrderInvoiceList>(urls.QUOTE_ORDER_INVOICES, {
        pathParams: {quote_order_id: quoteOrderId},
        queryParams,
        dtoType: QuoteOrderInvoiceList,
        ...options,
    });
}
