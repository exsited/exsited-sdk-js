/**
 * Path templates and body keys for the pro-forma invoice endpoints. `{proforma_id}` is the pro-forma invoice's code,
 * which it answers as both `id` and `invoice_id`.
 */

export const PROFORMA_INVOICES = '/api/{api_version}/proforma_invoices';
export const PROFORMA_INVOICE = '/api/{api_version}/proforma_invoices/{proforma_id}';
export const PROFORMA_INVOICE_PAYMENTS = '/api/{api_version}/proforma_invoices/{proforma_id}/payments';

/** The key a listing's records sit under. */
export const PROFORMA_INVOICES_KEY = 'data';

/**
 * The envelope one record arrives under. A payment answers `{object, payment_id, message}` under `payment`, not the
 * payment itself.
 */
export const PROFORMA_INVOICE_KEY = 'proforma_invoice';
export const PAYMENT_KEY = 'payment';
