/** Path templates and body keys for the purchase invoice endpoints. */

export const PURCHASE_INVOICES = '/api/{api_version}/purchase_invoices';
export const PURCHASE_INVOICES_NOTES = '/api/{api_version}/purchase_invoices/notes';
export const PURCHASE_INVOICE = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}';
export const PURCHASE_INVOICE_AMEND = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/amend';
export const PURCHASE_INVOICE_CANCEL = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/cancel';
export const PURCHASE_INVOICE_INFORMATION = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/information';
export const PURCHASE_INVOICE_LINES = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/lines';
export const PURCHASE_INVOICE_NOTES = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes';
export const PURCHASE_INVOICE_PDF = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/pdf';
export const PURCHASE_INVOICE_PURCHASE_CREDIT_NOTE_APPLICATIONS =
    '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications';
export const PURCHASE_INVOICE_PURCHASE_PAYMENTS =
    '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments';
export const PURCHASE_INVOICE_REACTIVATE = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/reactivate';
export const PURCHASE_INVOICE_LINE =
    '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/lines/{purchase_invoice_line_uuid}';
export const PURCHASE_INVOICE_NOTE = '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}';
export const PURCHASE_INVOICE_NOTE_FILES =
    '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files';
export const PURCHASE_INVOICE_NOTE_FILE =
    '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files/{file_id}';
export const PURCHASE_INVOICE_PURCHASE_CREDIT_NOTE_APPLICATION =
    '/api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications/{application_id}';

/** The key a listing's records sit under. */
export const PURCHASE_INVOICES_KEY = 'data';
export const PURCHASE_INVOICES_NOTES_KEY = 'data';
export const PURCHASE_INVOICE_NOTES_KEY = 'data';
export const PURCHASE_INVOICE_PURCHASE_CREDIT_NOTE_APPLICATIONS_KEY = 'data';
export const PURCHASE_INVOICE_PURCHASE_PAYMENTS_KEY = 'data';
export const PURCHASE_INVOICE_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const PURCHASE_INVOICE_KEY = 'purchase_invoice';
export const WATCHERLIST_KEY = 'watcherList';
export const FILE_KEY = 'file';
export const NOTE_KEY = 'note';
export const PURCHASE_CREDIT_NOTE_APPLICATION_KEY = 'purchase_credit_note_application';
