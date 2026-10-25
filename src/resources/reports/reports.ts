/** The reports endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import * as urls from './reportsUrls.js';
import {
    ReportsAccountsAccountOverview,
    ReportsInvoicesInvoiceOverview,
    ReportsOrdersOrderOverview,
    ReportsPurchaseInvoicesPurchaseInvoiceOverview,
    ReportsPurchaseOrdersPurchaseOrderOverview,
    ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview,
    ReportsTransactionsPaymentAndRefundOverview,
} from './reportsDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/** `GET /api/{api_version}/reports/accounts/account_overview` */
export function getReportsAccountsAccountOverview(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReportsAccountsAccountOverview>> {
    return client.sendGetRequest<ReportsAccountsAccountOverview>(urls.REPORTS_ACCOUNTS_ACCOUNT_OVERVIEW, {
        queryParams,
        dtoType: ReportsAccountsAccountOverview,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/reports/invoices/invoice_overview`
 */
export function getReportsInvoicesInvoiceOverview(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReportsInvoicesInvoiceOverview>> {
    return client.sendGetRequest<ReportsInvoicesInvoiceOverview>(urls.REPORTS_INVOICES_INVOICE_OVERVIEW, {
        queryParams,
        dtoType: ReportsInvoicesInvoiceOverview,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/reports/orders/order_overview`
 */
export function getReportsOrdersOrderOverview(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReportsOrdersOrderOverview>> {
    return client.sendGetRequest<ReportsOrdersOrderOverview>(urls.REPORTS_ORDERS_ORDER_OVERVIEW, {
        queryParams,
        dtoType: ReportsOrdersOrderOverview,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/reports/purchase_invoices/purchase_invoice_overview`
 */
export function getReportsPurchaseInvoicesPurchaseInvoiceOverview(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReportsPurchaseInvoicesPurchaseInvoiceOverview>> {
    return client.sendGetRequest<ReportsPurchaseInvoicesPurchaseInvoiceOverview>(
        urls.REPORTS_PURCHASE_INVOICES_PURCHASE_INVOICE_OVERVIEW,
        {
            queryParams,
            dtoType: ReportsPurchaseInvoicesPurchaseInvoiceOverview,
            ...options,
        },
    );
}

/**
 * `GET /api/{api_version}/reports/purchase_orders/purchase_order_overview`
 */
export function getReportsPurchaseOrdersPurchaseOrderOverview(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReportsPurchaseOrdersPurchaseOrderOverview>> {
    return client.sendGetRequest<ReportsPurchaseOrdersPurchaseOrderOverview>(
        urls.REPORTS_PURCHASE_ORDERS_PURCHASE_ORDER_OVERVIEW,
        {
            queryParams,
            dtoType: ReportsPurchaseOrdersPurchaseOrderOverview,
            ...options,
        },
    );
}

/**
 * `GET /api/{api_version}/reports/purchase_transactions/purchase_payment_and_refund_overview`
 */
export function getReportsPurchaseTransactionsPurchasePaymentAndRefundOverview(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview>> {
    return client.sendGetRequest<ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview>(
        urls.REPORTS_PURCHASE_TRANSACTIONS_PURCHASE_PAYMENT_AND_REFUND_OVERVIEW,
        {
            queryParams,
            dtoType: ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview,
            ...options,
        },
    );
}

/**
 * `GET /api/{api_version}/reports/transactions/payment_and_refund_overview`
 */
export function getReportsTransactionsPaymentAndRefundOverview(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReportsTransactionsPaymentAndRefundOverview>> {
    return client.sendGetRequest<ReportsTransactionsPaymentAndRefundOverview>(
        urls.REPORTS_TRANSACTIONS_PAYMENT_AND_REFUND_OVERVIEW,
        {
            queryParams,
            dtoType: ReportsTransactionsPaymentAndRefundOverview,
            ...options,
        },
    );
}
