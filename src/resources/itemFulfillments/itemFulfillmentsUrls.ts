/** Path templates and body keys for the item fulfillment endpoints. */

export const ITEM_FULFILLMENTS = '/api/{api_version}/item_fulfillments';
export const ITEM_FULFILLMENT = '/api/{api_version}/item_fulfillments/{fulfillment_id}';
export const ITEM_FULFILLMENT_NOTES = '/api/{api_version}/item_fulfillments/{fulfillment_id}/notes';
export const ITEM_FULFILLMENT_NOTE = '/api/{api_version}/item_fulfillments/{fulfillment_id}/notes/{note_id}';

/** The key a listing's records sit under. */
export const ITEM_FULFILLMENTS_KEY = 'data';
export const ITEM_FULFILLMENT_NOTES_KEY = 'data';

/** The envelope one record arrives under. */
export const INVOICE_KEY = 'invoice';
export const ITEM_FULFILLMENT_KEY = 'item_fulfillment';
export const NOTE_KEY = 'note';
