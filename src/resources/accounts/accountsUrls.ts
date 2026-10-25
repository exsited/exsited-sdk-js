/**
 * Path templates, body keys and query names for the account endpoints. `{account_id}` is the record's `id`
 * (`"W13ZGY"`), never its `uuid`; `set-password` is the one hyphenated path.
 */

export const ACCOUNTS = '/api/{api_version}/accounts';
export const ACCOUNT = '/api/{api_version}/accounts/{account_id}';
export const ACCOUNT_INFORMATION = '/api/{api_version}/accounts/{account_id}/information';
export const ACCOUNT_CANCEL = '/api/{api_version}/accounts/{account_id}/cancel';
export const ACCOUNT_SET_PASSWORD = '/api/{api_version}/accounts/{account_id}/set-password';

export const ACCOUNT_CONTACTS = '/api/{api_version}/accounts/{account_id}/contacts';
export const ACCOUNT_CONTACT = '/api/{api_version}/accounts/{account_id}/contacts/{contact_type}';

export const ACCOUNT_ADDRESSES = '/api/{api_version}/accounts/{account_id}/addresses';
export const ACCOUNT_ADDRESS = '/api/{api_version}/accounts/{account_id}/addresses/{address_id}';

export const ACCOUNT_BILLING_PREFERENCES = '/api/{api_version}/accounts/{account_id}/billing_preferences';

export const ACCOUNT_PAYMENT_METHODS = '/api/{api_version}/accounts/{account_id}/payment_methods';
export const ACCOUNT_PAYMENT_METHOD = '/api/{api_version}/accounts/{account_id}/payment_methods/{payment_method_id}';

export const ACCOUNT_NOTES = '/api/{api_version}/accounts/{account_id}/notes';
export const ACCOUNT_NOTE = '/api/{api_version}/accounts/{account_id}/notes/{note_id}';
export const ACCOUNT_NOTE_FILES = '/api/{api_version}/accounts/{account_id}/notes/{note_id}/files';
export const ACCOUNT_NOTE_FILE = '/api/{api_version}/accounts/{account_id}/notes/{note_id}/files/{file_id}';

export const ACCOUNT_IMAGE = '/api/{api_version}/accounts/{account_id}/image';

export const ACCOUNT_EMAILS = '/api/{api_version}/accounts/{account_id}/communications/emails';
export const ACCOUNT_EMAIL = '/api/{api_version}/accounts/{account_id}/communications/emails/{email_id}';

// Related listings. Each is the same records the resource's own top-level listing holds, narrowed to one account, and
// each answers the standard list envelope.
export const ACCOUNT_ORDERS = '/api/{api_version}/accounts/{account_id}/orders';
export const ACCOUNT_INVOICES = '/api/{api_version}/accounts/{account_id}/invoices';
export const ACCOUNT_PAYMENTS = '/api/{api_version}/accounts/{account_id}/payments';
export const ACCOUNT_REFUNDS = '/api/{api_version}/accounts/{account_id}/refunds';
export const ACCOUNT_CREDIT_NOTES = '/api/{api_version}/accounts/{account_id}/credit_notes';
export const ACCOUNT_PURCHASE_ORDERS = '/api/{api_version}/accounts/{account_id}/purchase_orders';
export const ACCOUNT_PURCHASE_INVOICES = '/api/{api_version}/accounts/{account_id}/purchase_invoices';
export const ACCOUNT_PURCHASE_PAYMENTS = '/api/{api_version}/accounts/{account_id}/purchase_payments';
export const ACCOUNT_PURCHASE_REFUNDS = '/api/{api_version}/accounts/{account_id}/purchase_refunds';
export const ACCOUNT_CUSTOM_OBJECTS = '/api/{api_version}/accounts/{account_id}/custom_objects';
export const ACCOUNT_INVENTORIES = '/api/{api_version}/accounts/{account_id}/inventories';
export const ACCOUNT_QUOTE_PARTIAL_INVOICES = '/api/{api_version}/accounts/{account_id}/quote_partial_invoices';
export const ACCOUNT_REACTIVATE = '/api/{api_version}/accounts/{account_id}/reactivate';
export const ACCOUNT_PURGE = '/api/{api_version}/accounts/{account_id}/purge';
export const ACCOUNT_CUSTOM_OBJECT = '/api/{api_version}/accounts/{account_id}/custom_objects/{custom_object_id}';
export const ACCOUNT_CUSTOM_OBJECT_INSTANCE =
    '/api/{api_version}/accounts/{account_id}/custom_objects_instances/{custom_object_instance_id}';
export const ACCOUNT_CUSTOM_OBJECT_INSTANCE_OF =
    '/api/{api_version}/accounts/{account_id}/custom_objects/{custom_object_id}/instances/{custom_object_instance_id}';
export const ACCOUNT_COMPONENT_OBJECTS = '/api/{api_version}/accounts/{account_id}/component/{component_id}';
export const ACCOUNT_COMPONENT_OBJECT =
    '/api/{api_version}/accounts/{account_id}/component/{component_id}/{component_object_id}';
export const ACCOUNT_KPIS = '/api/{api_version}/accounts/{account_id}/kpis';
export const ACCOUNT_FINANCIAL_SUMMARY = '/api/{api_version}/accounts/{account_id}/financial_summary';

/** The key a listing's records sit under. */
export const ACCOUNTS_KEY = 'data';
export const ACCOUNT_EMAILS_KEY = 'data';
export const ACCOUNT_NOTES_KEY = 'data';
export const ACCOUNT_NOTE_FILES_KEY = 'data';
export const ACCOUNT_ORDERS_KEY = 'data';
export const ACCOUNT_PAYMENTS_KEY = 'data';
export const ACCOUNT_PURCHASE_INVOICES_KEY = 'data';
export const ACCOUNT_PURCHASE_ORDERS_KEY = 'data';
export const ACCOUNT_PURCHASE_PAYMENTS_KEY = 'data';
export const ACCOUNT_PURCHASE_REFUNDS_KEY = 'data';
export const ACCOUNT_REFUNDS_KEY = 'data';
export const ACCOUNT_CREDIT_NOTES_KEY = 'data';
export const ACCOUNT_CUSTOM_OBJECTS_KEY = 'data';
export const ACCOUNT_INVOICES_KEY = 'data';
export const ACCOUNT_COMPONENT_OBJECTS_KEY = 'data';

/** The envelope one record arrives under. */
export const ACCOUNT_KEY = 'account';
export const NOTE_KEY = 'note';
export const EMAIL_KEY = 'email';
export const FILE_KEY = 'file';
export const ACCOUNT_KPIS_KEY = 'account_kpis';
export const CUSTOM_OBJECT_KEY = 'custom_object';
export const CUSTOM_OBJECT_INSTANCE_KEY = 'custom_object_instance';
export const CUSTOM_COMPONENT_OBJECT_KEY = 'custom_component_object';

/** The wrapper each of these writes sends its fields under. */
export const ADDRESS_KEY = 'address';
export const CONTACT_KEY = 'contact';
export const BILLING_PREFERENCES_KEY = 'billing_preferences';
export const PAYMENT_METHOD_KEY = 'payment_method';

/**
 * The names that shape the listing; every other name is a `filter_<field>` or `filter_<field>_<operator>`, and an
 * unknown one is `400` naming the field.
 */
export const ACCOUNTS_QUERY_PARAMS = Object.freeze(['limit', 'cursor', 'sort']);

/** The fields `filter_<field>` accepts, each with `_neq` too. */
export const FILTERABLE_FIELDS = Object.freeze([
    'id',
    'name',
    'display_name',
    'email_address',
    'description',
    'origin',
    'website',
    'linkedin',
    'facebook',
    'twitter',
    'created_by',
    'last_updated_by',
    'status',
    'group',
    'manager',
    'currency',
    'time_zone',
    'tax',
    'uuid',
    'communication_preference',
    'accounting_code',
    'created_on',
    'last_updated_on',
]);

/** The subset that also takes `_contains` and `_not_contains`. */
export const TEXT_FILTER_FIELDS = Object.freeze([
    'id',
    'name',
    'display_name',
    'email_address',
    'description',
    'origin',
    'website',
    'linkedin',
    'facebook',
    'twitter',
    'created_by',
    'last_updated_by',
]);

/** The subset that also takes `_gt`, `_gte`, `_lt` and `_lte`, as `YYYY-MM-DD`. */
export const DATE_FILTER_FIELDS = Object.freeze(['created_on', 'last_updated_on']);

/**
 * The primary contact's fields, filtered as `filter_contact1_<field>`; a custom attribute is `filter_attribute_<name>`,
 * and the string, number, boolean and text kinds are not implemented by the API.
 */
export const CONTACT_FILTER_FIELDS = Object.freeze([
    'contact_salutation',
    'first_name',
    'last_name',
    'middle_name',
    'designation',
    'email_address',
    'address_line1',
    'country',
]);
