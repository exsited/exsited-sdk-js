/** Path templates and body keys for the purchase refund endpoints. */

export const PURCHASE_REFUNDS = '/api/{api_version}/purchase_refunds';
export const PURCHASE_REFUND = '/api/{api_version}/purchase_refunds/{purchase_refund_id}';
export const PURCHASE_CREDIT_NOTE_PURCHASE_REFUNDS =
    '/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/purchase_refunds';

/** The key a listing's records sit under. */
export const PURCHASE_REFUNDS_KEY = 'data';

/** The envelope one record arrives under. */
export const PURCHASE_REFUND_KEY = 'purchase_refund';

/** The keys `updatePurchaseRefund` takes under `purchase_refund`; any other is a `400`. */
export const PURCHASE_REFUND_UPDATE_KEYS = Object.freeze(['alternate_date', 'reference', 'note', 'custom_attributes']);
