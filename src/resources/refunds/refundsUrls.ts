/** Path templates and body keys for the refund endpoints. */

export const REFUNDS = '/api/{api_version}/refunds';
export const REFUND = '/api/{api_version}/refunds/{refund_id}';
export const CREDIT_NOTE_REFUNDS = '/api/{api_version}/credit_notes/{credit_note_id}/refunds';
export const REFUND_NOTES = '/api/{api_version}/refunds/{refund_id}/notes';
export const REFUND_NOTE = '/api/{api_version}/refunds/{refund_id}/notes/{note_id}';
export const REFUND_NOTE_FILES = '/api/{api_version}/refunds/{refund_id}/notes/{note_id}/files';
export const REFUND_NOTE_FILE = '/api/{api_version}/refunds/{refund_id}/notes/{note_id}/files/{file_id}';

/** The key a listing's records sit under. */
export const REFUNDS_KEY = 'data';
export const REFUND_NOTES_KEY = 'data';
export const REFUND_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const REFUND_KEY = 'refund';
export const NOTE_KEY = 'note';
export const FILE_KEY = 'file';
