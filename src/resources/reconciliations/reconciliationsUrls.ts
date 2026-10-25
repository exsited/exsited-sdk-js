/** Path templates and body keys for the reconciliation endpoints. */

/** V4 serves no reconciliation itself, only the two lists hung off one. */
export const RECONCILIATION_SALE_PAYMENTS = '/api/{api_version}/reconciliations/{reconciliation_id}/sale_payments';
export const RECONCILIATION_SALE_REFUNDS = '/api/{api_version}/reconciliations/{reconciliation_id}/sale_refunds';

/** The key a listing's records sit under. */
export const RECONCILIATION_SALE_PAYMENTS_KEY = 'data';
export const RECONCILIATION_SALE_REFUNDS_KEY = 'data';
