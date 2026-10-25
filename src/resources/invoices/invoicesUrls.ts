/**
 * Path templates, body keys and query names for the invoice endpoints. `{invoice_id}` is the record's `id`, never its
 * `uuid`; the RMA path is spelled `authorisations`.
 */

export const INVOICES = '/api/{api_version}/invoices';
export const INVOICE = '/api/{api_version}/invoices/{invoice_id}';
export const INVOICE_INFORMATION = '/api/{api_version}/invoices/{invoice_id}/information';

/** The three lifecycle transitions. Each answers `202`, not `200`. */
export const INVOICE_AMEND = '/api/{api_version}/invoices/{invoice_id}/amend';
export const INVOICE_CANCEL = '/api/{api_version}/invoices/{invoice_id}/cancel';
export const INVOICE_REACTIVATE = '/api/{api_version}/invoices/{invoice_id}/reactivate';

/** Answers a JSON descriptor of the PDF's links, not the document. */
export const INVOICE_PDF = '/api/{api_version}/invoices/{invoice_id}/pdf';

export const INVOICE_ITEM_FULFILLMENTS = '/api/{api_version}/invoices/{invoice_id}/item_fulfillments';
export const INVOICE_ITEM_FULFILLMENT = '/api/{api_version}/invoices/{invoice_id}/item_fulfillments/{fulfillment_id}';

/** British spelling, with an `s`. */
export const INVOICE_RMAS = '/api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations';
export const INVOICE_RMA = '/api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_id}';

export const INVOICE_NOTES = '/api/{api_version}/invoices/{invoice_id}/notes';
export const INVOICE_NOTE = '/api/{api_version}/invoices/{invoice_id}/notes/{note_id}';
export const INVOICE_NOTE_FILES = '/api/{api_version}/invoices/{invoice_id}/notes/{note_id}/files';
export const INVOICE_NOTE_FILE = '/api/{api_version}/invoices/{invoice_id}/notes/{note_id}/files/{file_id}';

/** An order's invoices - and the endpoint that **raises** one against an order. */
export const ORDER_INVOICES = '/api/{api_version}/orders/{order_id}/invoices';
export const INVOICE_KPIS = '/api/{api_version}/invoices/{invoice_id}/kpis';
export const INVOICE_LINES = '/api/{api_version}/invoices/{invoice_id}/lines';
export const INVOICE_LINE = '/api/{api_version}/invoices/{invoice_id}/lines/{line_id}';
export const INVOICE_CREDIT_NOTE_APPLICATION =
    '/api/{api_version}/invoices/{invoice_id}/credit_note_applications/{credit_note_application_id}';
export const INVOICE_CUSTOM_OBJECTS = '/api/{api_version}/invoices/{invoice_id}/custom_objects';
export const INVOICE_CUSTOM_OBJECT = '/api/{api_version}/invoices/{invoice_id}/custom_objects/{custom_object_id}';
export const INVOICE_CUSTOM_OBJECT_INSTANCE =
    '/api/{api_version}/invoices/{invoice_id}/custom_objects/{custom_object_id}/instances/{instance_id}';

/** The key a listing's records sit under. */
export const INVOICES_KEY = 'data';
export const INVOICE_ITEM_FULFILLMENTS_KEY = 'data';
export const INVOICE_NOTES_KEY = 'data';
export const INVOICE_RMAS_KEY = 'data';
export const INVOICE_NOTE_FILES_KEY = 'data';
export const ORDER_INVOICES_KEY = 'data';
export const INVOICE_CUSTOM_OBJECTS_KEY = 'data';

/** The envelope one record arrives under. */
export const INVOICE_KEY = 'invoice';
export const ITEM_FULFILLMENT_KEY = 'item_fulfillment';
export const NOTE_KEY = 'note';
export const RETURN_MERCHANDISE_AUTHORISATION_KEY = 'return_merchandise_authorisation';
export const FILE_KEY = 'file';
export const INVOICE_KPIS_KEY = 'invoice_kpis';
export const CREDIT_NOTE_APPLICATION_KEY = 'credit_note_application';

/**
 * The names that shape the listing, which pages by cursor; every other name is a `filter_<field>` or
 * `filter_<field>_<operator>`, the money and date fields taking the range operators too. A bare `filter` expression is
 * `400`.
 */
export const INVOICES_QUERY_PARAMS = Object.freeze(['limit', 'cursor']);
