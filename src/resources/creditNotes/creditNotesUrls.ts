/** Path templates and body keys for the credit note endpoints. */

export const CREDIT_NOTES = '/api/{api_version}/credit_notes';
export const CREDIT_NOTE = '/api/{api_version}/credit_notes/{credit_note_id}';
export const CREDIT_NOTE_APPLY = '/api/{api_version}/credit_notes/{credit_note_id}/apply';
export const CREDIT_NOTE_ITEMS = '/api/{api_version}/credit_notes/{credit_note_id}/items';
export const CREDIT_NOTE_CREDIT_NOTE_APPLICATIONS =
    '/api/{api_version}/credit_notes/{credit_note_id}/credit_note_applications';
export const CREDIT_NOTE_NOTES = '/api/{api_version}/credit_notes/{credit_note_id}/notes';
export const CREDIT_NOTE_NOTE = '/api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}';
export const CREDIT_NOTE_NOTE_FILES = '/api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}/files';
export const CREDIT_NOTE_NOTE_FILE = '/api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}/files/{file_id}';

/** The key a listing's records sit under. */
export const CREDIT_NOTES_KEY = 'data';
export const CREDIT_NOTE_NOTES_KEY = 'data';
export const CREDIT_NOTE_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const CREDIT_NOTE_KEY = 'credit_note';

/**
 * The envelope one record arrives under. `items` and `credit_note_applications` answer under `credit_note` too,
 * carrying only `object`, `href` and their own list.
 */
export const NOTE_KEY = 'note';
export const FILE_KEY = 'file';

/** The two keys `createCreditNote` takes under `credit_note`; any other is a `400`. */
export const CREDIT_NOTE_CREATE_KEYS = Object.freeze(['invoice_id', 'amount']);

/**
 * The one key `applyCreditNote` takes under `credit_note`; each entry of it takes `invoice_id` and `amount` and nothing
 * else.
 */
export const CREDIT_NOTE_APPLY_KEYS = Object.freeze(['invoices']);
