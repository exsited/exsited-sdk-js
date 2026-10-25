/** Path templates and body keys for the order endpoints. */

export const ORDERS = '/api/{api_version}/orders';
export const ORDER = '/api/{api_version}/orders/{order_id}';
export const ORDER_ACTIVATE = '/api/{api_version}/orders/{order_id}/activate';
export const ORDER_ACTIVATE_DRAFT = '/api/{api_version}/orders/{order_id}/activate_draft';
export const ORDER_BILLING_PREFERENCES = '/api/{api_version}/orders/{order_id}/billing_preferences';
export const ORDER_CANCEL = '/api/{api_version}/orders/{order_id}/cancel';
export const ORDER_CHANGE = '/api/{api_version}/orders/{order_id}/change';
export const ORDER_CONVERT_TO_ORDER = '/api/{api_version}/orders/{order_id}/convert_to_order';
export const ORDER_CUSTOM_OBJECTS = '/api/{api_version}/orders/{order_id}/custom_objects';
export const ORDER_CUSTOM_OBJECTS_INSTANCES = '/api/{api_version}/orders/{order_id}/custom_objects_instances';
export const ORDER_DISCARD_DRAFT = '/api/{api_version}/orders/{order_id}/discard_draft';
export const ORDER_EXTEND_TRIAL = '/api/{api_version}/orders/{order_id}/extend_trial';
export const ORDER_INFORMATION = '/api/{api_version}/orders/{order_id}/information';
export const ORDER_ITEM_FULFILLMENTS = '/api/{api_version}/orders/{order_id}/item_fulfillments';
export const ORDER_LINES = '/api/{api_version}/orders/{order_id}/lines';
export const ORDER_NOTES = '/api/{api_version}/orders/{order_id}/notes';
export const ORDER_PAYMENT_METHODS = '/api/{api_version}/orders/{order_id}/payment_methods';
export const ORDER_PDF = '/api/{api_version}/orders/{order_id}/pdf';
export const ORDER_REACTIVATE = '/api/{api_version}/orders/{order_id}/reactivate';
export const ORDER_RELINQUISH = '/api/{api_version}/orders/{order_id}/relinquish';
export const ORDER_LINE = '/api/{api_version}/orders/{order_id}/lines/{line_uuid}';
export const ORDER_NOTE = '/api/{api_version}/orders/{order_id}/notes/{order_note_id}';
export const ORDER_PAYMENT_METHOD = '/api/{api_version}/orders/{order_id}/payment_methods/{payment_method_ref}';
export const ORDER_LINE_BILLING_PREFERENCES =
    '/api/{api_version}/orders/{order_id}/lines/{line_uuid}/billing_preferences';
export const ORDER_NOTE_FILES = '/api/{api_version}/orders/{order_id}/notes/{order_note_id}/files';
export const ORDER_NOTE_FILE = '/api/{api_version}/orders/{order_id}/notes/{order_note_id}/files/{order_file_id}';
export const ORDERS_NOTES = '/api/{api_version}/orders/notes';
export const ORDERS_PREVIEW = '/api/{api_version}/orders/preview';
export const ORDERS_EXPRESS = '/api/{api_version}/orders/express';
export const ORDER_ACCEPT = '/api/{api_version}/orders/{order_id}/accept';
export const ORDER_ACTIVATE_INVOICE_FROM_DORMANT =
    '/api/{api_version}/orders/{order_id}/activate_invoice_from_dormant/{invoice_uuid}';
export const ORDER_CHANGE_PREVIEW = '/api/{api_version}/orders/{order_id}/change/preview';
export const ORDER_CHANGE_STATUS = '/api/{api_version}/orders/{order_id}/change_status';
export const ORDER_CONTRACT_ADJUSTMENT = '/api/{api_version}/orders/{order_id}/contract_adjustment';
export const ORDER_CONTRACT_ADJUSTMENT_PREVIEW = '/api/{api_version}/orders/{order_id}/contract_adjustment/preview';
export const ORDER_DOWNGRADE = '/api/{api_version}/orders/{order_id}/downgrade';
export const ORDER_DOWNGRADE_PREVIEW = '/api/{api_version}/orders/{order_id}/downgrade/preview';
export const ORDER_UPGRADE = '/api/{api_version}/orders/{order_id}/upgrade';
export const ORDER_UPGRADE_PREVIEW = '/api/{api_version}/orders/{order_id}/upgrade/preview';
export const ORDER_TERMINATE_TRIAL = '/api/{api_version}/orders/{order_id}/terminate_trial';
export const ORDER_CUSTOM_OBJECT = '/api/{api_version}/orders/{order_id}/custom_objects/{custom_object_id}';
export const ORDER_CUSTOM_OBJECT_INSTANCE =
    '/api/{api_version}/orders/{order_id}/custom_objects/{custom_object_id}/instances/{instance_id}';
export const ORDER_CUSTOM_OBJECTS_INSTANCE =
    '/api/{api_version}/orders/{order_id}/custom_objects_instances/{custom_object_id}';
export const ORDER_CUSTOM_OBJECTS_INSTANCE_INSTANCE =
    '/api/{api_version}/orders/{order_id}/custom_objects_instances/{custom_object_id}/instances/{instance_id}';
export const ORDER_ITEM_FULFILLMENT = '/api/{api_version}/orders/{order_id}/item_fulfillments/{fulfillment_id}';
export const ORDER_KPIS = '/api/{api_version}/orders/{order_id}/kpis';
export const ORDER_PAYMENT = '/api/{api_version}/orders/{order_id}/payments/{payment_id}';
export const ORDER_QUOTE_PARTIAL_INVOICES = '/api/{api_version}/orders/{order_id}/quote_partial_invoices';
export const ORDER_SHIPPING_PDF = '/api/{api_version}/orders/{order_id}/shipping_pdf/{shipping_line_id}';

/** The key a listing's records sit under. */
export const ORDERS_KEY = 'data';
export const ORDER_CUSTOM_OBJECTS_INSTANCES_KEY = 'data';
export const ORDER_CUSTOM_OBJECTS_KEY = 'data';
export const ORDER_ITEM_FULFILLMENTS_KEY = 'data';
export const ORDER_NOTES_KEY = 'data';
export const ORDER_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const ORDER_KEY = 'order';
export const FILE_KEY = 'file';
export const NOTE_KEY = 'note';
export const ORDER_LINE_KEY = 'order_line';
