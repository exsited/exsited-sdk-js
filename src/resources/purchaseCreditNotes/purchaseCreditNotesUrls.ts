/** Path templates and body keys for the purchase credit note endpoints. */

export const PURCHASE_CREDIT_NOTES = '/api/{api_version}/purchase_credit_notes';
export const PURCHASE_CREDIT_NOTE = '/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}';
export const PURCHASE_CREDIT_NOTE_APPLY = '/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/apply';
export const PURCHASE_CREDIT_NOTE_NOTES = '/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/notes';
export const PURCHASE_CREDIT_NOTE_NOTE =
    '/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/notes/{note_id}';

/** The key a listing's records sit under. */
export const PURCHASE_CREDIT_NOTES_KEY = 'data';

/** The envelope one record arrives under. */
export const PURCHASE_CREDIT_NOTE_KEY = 'purchase_credit_note';
export const NOTE_KEY = 'note';

/** The two keys `createPurchaseCreditNote` takes under `purchase_credit_note`. */
export const PURCHASE_CREDIT_NOTE_CREATE_KEYS = Object.freeze(['purchase_invoice_id', 'amount']);

/**
 * The one key `applyPurchaseCreditNote` takes under `purchase_credit_note`; each entry of it takes
 * `purchase_invoice_id` and `amount` and nothing else.
 */
export const PURCHASE_CREDIT_NOTE_APPLY_KEYS = Object.freeze(['purchase_invoices']);
