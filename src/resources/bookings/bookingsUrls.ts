/** Path templates and body keys for the booking endpoints. */

export const BOOKING = '/api/{api_version}/booking';
export const BOOKING_BY_ID = '/api/{api_version}/booking/{booking_id}';
export const BOOKING_NOTES = '/api/{api_version}/booking/notes';
export const BOOKING_PREVIEW = '/api/{api_version}/booking/preview';
export const BOOKING_CHANGE = '/api/{api_version}/booking/{booking_id}/change';
export const BOOKING_CHANGE_PREVIEW = '/api/{api_version}/booking/{booking_id}/change/preview';
export const BOOKING_BILLING_PREFERENCES = '/api/{api_version}/booking/{booking_id}/billing_preferences';
export const BOOKING_INFORMATION = '/api/{api_version}/booking/{booking_id}/information';
export const BOOKING_LINES = '/api/{api_version}/booking/{booking_id}/lines';
export const BOOKING_LINE = '/api/{api_version}/booking/{booking_id}/lines/{line_uuid}';
export const BOOKING_LINE_BILLING_PREFERENCES =
    '/api/{api_version}/booking/{booking_id}/lines/{line_uuid}/billing_preferences';
export const BOOKING_CUSTOM_OBJECTS = '/api/{api_version}/booking/{booking_id}/custom_objects';
export const BOOKING_CUSTOM_OBJECT = '/api/{api_version}/booking/{booking_id}/custom_objects/{custom_object_id}';
export const BOOKING_CUSTOM_OBJECT_INSTANCE =
    '/api/{api_version}/booking/{booking_id}/custom_objects/{custom_object_id}/instances/{instance_id}';
export const BOOKING_CUSTOM_OBJECTS_INSTANCES = '/api/{api_version}/booking/{booking_id}/custom_objects_instances';
export const BOOKING_CUSTOM_OBJECTS_INSTANCE =
    '/api/{api_version}/booking/{booking_id}/custom_objects_instances/{custom_object_id}';
export const BOOKING_CUSTOM_OBJECTS_INSTANCE_INSTANCE =
    '/api/{api_version}/booking/{booking_id}/custom_objects_instances/{custom_object_id}/instances/{instance_id}';
export const BOOKING_INVOICES = '/api/{api_version}/booking/{booking_id}/invoices';
export const BOOKING_ITEM_FULFILLMENTS = '/api/{api_version}/booking/{booking_id}/item_fulfillments';
export const BOOKING_ITEM_FULFILLMENT = '/api/{api_version}/booking/{booking_id}/item_fulfillments/{fulfillment_id}';
export const BOOKING_KPIS = '/api/{api_version}/booking/{booking_id}/kpis';
export const BOOKING_PAYMENT_METHODS = '/api/{api_version}/booking/{booking_id}/payment_methods';
export const BOOKING_PAYMENT_METHOD = '/api/{api_version}/booking/{booking_id}/payment_methods/{payment_method_ref}';
export const BOOKING_PAYMENTS = '/api/{api_version}/booking/{booking_id}/payments';
export const BOOKING_PAYMENT = '/api/{api_version}/booking/{booking_id}/payments/{payment_id}';
export const BOOKING_PDF = '/api/{api_version}/booking/{booking_id}/pdf';
export const BOOKING_QUOTE_PARTIAL_INVOICES = '/api/{api_version}/booking/{booking_id}/quote_partial_invoices';
export const BOOKING_SHIPPING_PDF = '/api/{api_version}/booking/{booking_id}/shipping_pdf/{shipping_line_id}';

/** The key a listing's records sit under. */
export const BOOKING_KEY = 'data';

/** The envelope one record arrives under. */
export const ORDER_KEY = 'order';
