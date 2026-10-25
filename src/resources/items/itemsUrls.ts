/**
 * Path templates, body keys and filter names for the item endpoints. `{item_id}` is the listing's `id` (`"ITEM-0001"`),
 * never the `uuid` or the integer `id` the sale, purchase and inventories reads carry; `{warehouse_name}` is a
 * warehouse name.
 */

export const ITEMS = '/api/{api_version}/items';
export const ITEM = '/api/{api_version}/items/{item_id}';
export const ITEM_INFORMATION = '/api/{api_version}/items/{item_id}/information';

/** Both have answered HTTP 500. See the functions. */
export const ITEM_DEACTIVATE = '/api/{api_version}/items/{item_id}/deactivate';
export const ITEM_REACTIVATE = '/api/{api_version}/items/{item_id}/reactivate';

export const ITEM_IMAGE = '/api/{api_version}/items/{item_id}/image';

/**
 * The sale, purchase and inventories trio. Each is readable, creatable once and patchable, and each answers a **stub**
 * item rather than the whole record.
 */
export const ITEM_SALE = '/api/{api_version}/items/{item_id}/sale';
export const ITEM_PURCHASE = '/api/{api_version}/items/{item_id}/purchase';
export const ITEM_INVENTORIES = '/api/{api_version}/items/{item_id}/inventories';

export const ITEM_INVENTORY_ADD = '/api/{api_version}/items/{item_id}/inventory/add';
export const ITEM_INVENTORY_ADJUSTMENTS = '/api/{api_version}/items/{item_id}/inventory_adjustments';

/** Inventory for one warehouse. `{warehouse_name}` is a name, not an id. */
export const ITEM_WAREHOUSE_INVENTORIES = '/api/{api_version}/items/{item_id}/warehouses/{warehouse_name}/inventories';

export const ITEM_BUNDLE_DETAILS = '/api/{api_version}/items/{item_id}/bundle_details';
export const ITEM_VARIATIONS = '/api/{api_version}/items/{item_id}/variations';

export const ITEM_FAMILY_DETAILS = '/api/{api_version}/items/{item_id}/family_details';

export const ITEM_PACKAGE_DETAILS = '/api/{api_version}/items/{item_id}/package_details';
export const ITEM_PACKAGE_DETAIL = '/api/{api_version}/items/{item_id}/package_details/{package_detail_id}';

export const ITEM_NOTES = '/api/{api_version}/items/{item_id}/notes';
export const ITEM_NOTE = '/api/{api_version}/items/{item_id}/notes/{note_id}';
export const ITEM_NOTE_FILES = '/api/{api_version}/items/{item_id}/notes/{note_id}/files';
export const ITEM_NOTE_FILE = '/api/{api_version}/items/{item_id}/notes/{note_id}/files/{file_id}';
export const ITEM_INVENTORY = '/api/{api_version}/items/{item_id}/inventory';
export const ITEM_INVENTORIES_ADD = '/api/{api_version}/items/{item_id}/inventories/add';
export const ITEM_KPIS = '/api/{api_version}/items/{item_id}/kpis';

/** The key a listing's records sit under. */
export const ITEMS_KEY = 'data';
export const ITEM_INVENTORY_ADJUSTMENTS_KEY = 'data';
export const ITEM_NOTES_KEY = 'data';
export const ITEM_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const ITEM_KEY = 'item';
export const NOTE_KEY = 'note';
export const INVENTORY_ADJUSTMENT_KEY = 'inventory_adjustment';
export const FILE_KEY = 'file';
export const ITEM_KPIS_KEY = 'item_kpis';

/**
 * The names that shape the listing, which pages by cursor and sorts by the `order_by` and `direction` pair; every other
 * name is a `filter_<field>`, and a nested field takes the single `filter` expression.
 */
export const ITEMS_QUERY_PARAMS = Object.freeze(['limit', 'cursor', 'order_by', 'direction', 'filter']);

/** The top-level item fields `filter_<field>` accepts, each with `_neq` too. */
export const FILTERABLE_FIELDS = Object.freeze([
    'id',
    'uuid',
    'name',
    'display_name',
    'description',
    'status',
    'type',
    'origin',
    'invoice_note',
    'image_uri',
    'base_uom',
    'group',
    'manager',
    'custom_form',
    'created_by',
    'last_updated_by',
    'version',
]);

/** The subset that also takes `_contains` and `_not_contains`. */
export const TEXT_FILTER_FIELDS = Object.freeze([
    'id',
    'name',
    'display_name',
    'description',
    'origin',
    'invoice_note',
    'image_uri',
]);

/**
 * The documented `filter_<field>` names the API answers `400 "Filter syntax deprecated bracket"`; each is inside the
 * `sale`, `purchase` or `inventories` block and is reached through the `filter` expression instead.
 */
export const DEPRECATED_FILTERS = Object.freeze([
    'item_number',
    'upc_code',
    'sale_enabled',
    'sales_accounting_code_revenue',
    'sales_billing_mode',
    'sales_charge_type',
    'sales_currency',
    'sales_fulfillment_mode',
    'sales_payment_mode',
    'sales_pricing_method',
    'sales_tax_inclusive_based_on',
    'purchase_enabled',
    'purchase_currency',
    'purchase_order_note',
    'purchase_profile',
    'purchase_receive_mode',
    'inventory_enabled',
    'inventory_quantity_available',
    'inventory_quantity_on_hand',
    'inventory_qty_avl_on_sale_determination',
]);

/**
 * The fields `filter_<field>` reaches inside the `sale`, `purchase` and `inventories` blocks. All answer `200`; an
 * unmatched value is `data: []`, not an error.
 */
export const NESTED_BLOCK_FILTERS = Object.freeze([
    'item_number',
    'upc_code',
    'sale_enabled',
    'sales_accounting_code_revenue',
    'sales_billing_mode',
    'sales_charge_type',
    'sales_currency',
    'sales_fulfillment_mode',
    'sales_payment_mode',
    'sales_pricing_method',
    'sales_tax_inclusive_based_on',
    'purchase_enabled',
    'purchase_currency',
    'purchase_order_note',
    'purchase_profile',
    'purchase_receive_mode',
    'inventory_enabled',
    'inventory_quantity_available',
    'inventory_quantity_on_hand',
    'inventory_qty_avl_on_sale_determination',
]);
