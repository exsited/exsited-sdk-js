/** Path templates and body keys for the purchase order endpoints. */

export const PURCHASE_ORDERS = '/api/{api_version}/purchase_orders';
export const PURCHASE_ORDERS_NOTES = '/api/{api_version}/purchase_orders/notes';
export const PURCHASE_ORDER = '/api/{api_version}/purchase_orders/{purchase_order_id}';
export const PURCHASE_ORDER_CANCEL = '/api/{api_version}/purchase_orders/{purchase_order_id}/cancel';
export const PURCHASE_ORDER_CHANGE = '/api/{api_version}/purchase_orders/{purchase_order_id}/change';
export const PURCHASE_ORDER_INFORMATION = '/api/{api_version}/purchase_orders/{purchase_order_id}/information';
export const PURCHASE_ORDER_LINES = '/api/{api_version}/purchase_orders/{purchase_order_id}/lines';
export const PURCHASE_ORDER_NOTES = '/api/{api_version}/purchase_orders/{purchase_order_id}/notes';
export const PURCHASE_ORDER_PURCHASE_INVOICES =
    '/api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices';
export const PURCHASE_ORDER_PURCHASE_PAYMENTS =
    '/api/{api_version}/purchase_orders/{purchase_order_id}/purchase_payments';
export const PURCHASE_ORDER_REACTIVATE = '/api/{api_version}/purchase_orders/{purchase_order_id}/reactivate';
export const PURCHASE_ORDER_LINE =
    '/api/{api_version}/purchase_orders/{purchase_order_id}/lines/{purchase_order_line_uuid}';
export const PURCHASE_ORDER_NOTE =
    '/api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}';
export const PURCHASE_ORDER_NOTE_FILES =
    '/api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files';
export const PURCHASE_ORDER_NOTE_FILE =
    '/api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files/{purchase_order_file_id}';
export const PURCHASE_ORDER_KPIS = '/api/{api_version}/purchase_orders/{purchase_order_id}/kpis';

/** The key a listing's records sit under. */
export const PURCHASE_ORDERS_KEY = 'data';
export const PURCHASE_ORDERS_NOTES_KEY = 'data';
export const PURCHASE_ORDER_LINES_KEY = 'data';
export const PURCHASE_ORDER_PURCHASE_INVOICES_KEY = 'data';
export const PURCHASE_ORDER_PURCHASE_PAYMENTS_KEY = 'data';
export const PURCHASE_ORDER_NOTES_KEY = 'data';
export const PURCHASE_ORDER_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const PURCHASE_ORDER_KEY = 'purchase_order';
export const FILE_KEY = 'file';
export const NOTE_KEY = 'note';
export const PURCHASE_INVOICE_KEY = 'purchase_invoice';
export const PURCHASE_ORDER_LINE_KEY = 'purchase_order_line';
export const PURCHASE_ORDER_KPIS_KEY = 'purchase_order_kpis';
