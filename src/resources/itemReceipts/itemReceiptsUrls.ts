/** Path templates and body keys for the item receipt endpoints. */

export const ITEM_RECEIPTS = '/api/{api_version}/item_receipts';
export const ITEM_RECEIPT = '/api/{api_version}/item_receipts/{item_receipt_id}';
export const PURCHASE_ORDER_ITEM_RECEIPTS = '/api/{api_version}/purchase_orders/{purchase_order_id}/item_receipts';
export const ITEM_RECEIPT_NOTE = '/api/{api_version}/item_receipts/{item_receipt_id}/notes/{note_id}';

/** The key a listing's records sit under. */
export const ITEM_RECEIPTS_KEY = 'data';

/** The envelope one record arrives under. */
export const ITEM_RECEIPT_KEY = 'item_receipt';
export const PURCHASE_ORDER_KEY = 'purchase_order';

/** The create answers under a hyphenated key, unlike the read. */
export const ITEM_RECEIPT_CREATE_KEY = 'item-receipt';
