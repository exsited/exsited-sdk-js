/** Path templates and body keys for the purchase payment endpoints. */

export const PURCHASE_PAYMENTS = '/api/{api_version}/purchase_payments';
export const PURCHASE_PAYMENT = '/api/{api_version}/purchase_payments/{purchase_payment_id}';
export const PURCHASE_INVOICE_PURCHASE_PAYMENTS =
    '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments';
export const PURCHASE_PAYMENT_NOTES = '/api/{api_version}/purchase_payments/{purchase_payment_id}/notes';
export const PURCHASE_PAYMENT_NOTE = '/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}';
export const PURCHASE_PAYMENT_NOTE_FILES =
    '/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files';
export const PURCHASE_PAYMENT_NOTE_FILE =
    '/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files/{file_id}';
export const PURCHASE_PAYMENT_PURCHASE_CREDIT_NOTES =
    '/api/{api_version}/purchase_payments/{purchase_payment_id}/purchase_credit_notes';

/** The key a listing's records sit under. */
export const PURCHASE_INVOICE_PURCHASE_PAYMENTS_KEY = 'data';
export const PURCHASE_PAYMENTS_KEY = 'data';
export const PURCHASE_PAYMENT_NOTES_KEY = 'data';
export const PURCHASE_PAYMENT_NOTE_FILES_KEY = 'data';
export const PURCHASE_PAYMENT_PURCHASE_CREDIT_NOTES_KEY = 'data';

/** The envelope one record arrives under. */
export const FILES_KEY = 'files';
export const PURCHASE_PAYMENT_KEY = 'purchase_payment';
export const FILE_KEY = 'file';
export const NOTE_KEY = 'note';
