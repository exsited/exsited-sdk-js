/** Path templates and body keys for the payment endpoints. */

export const PAYMENTS = '/api/{api_version}/payments';
export const PAYMENTS_NOTES = '/api/{api_version}/payments/notes';
export const PAYMENT = '/api/{api_version}/payments/{payment_id}';
export const INVOICE_PAYMENTS = '/api/{api_version}/invoices/{invoice_id}/payments';
export const ORDER_PAYMENTS = '/api/{api_version}/orders/{order_id}/payments';
export const PAYMENT_NOTES = '/api/{api_version}/payments/{payment_id}/notes';
export const PAYMENT_NOTE = '/api/{api_version}/payments/{payment_id}/notes/{payment_note_id}';
export const PAYMENT_NOTE_FILE =
    '/api/{api_version}/payments/{payment_id}/notes/{payment_note_id}/files/{payment_file_id}';
export const PAYMENT_NOTE_FILES = '/api/{api_version}/payments/{payment_id}/notes/{payment_note_id}/files';
export const INVOICE_PAYMENT = '/api/{api_version}/invoices/{invoice_id}/payments/{payment_id}';

/** The key a listing's records sit under. */
export const INVOICE_PAYMENTS_KEY = 'data';
export const ORDER_PAYMENTS_KEY = 'data';
export const PAYMENTS_KEY = 'data';
export const PAYMENTS_NOTES_KEY = 'data';
export const PAYMENT_NOTES_KEY = 'data';
export const PAYMENT_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const PAYMENT_KEY = 'payment';
export const FILE_KEY = 'file';
export const NOTE_KEY = 'note';

/** The keys `createPayment` takes under `payment`; any other is a `400`. */
export const PAYMENT_CREATE_KEYS = Object.freeze([
    'id',
    'date',
    'origin',
    'payment_note',
    'note',
    'invoices',
    'payment_applied',
    'credit_applied',
    'gift_certificates',
    'custom_attributes',
]);
