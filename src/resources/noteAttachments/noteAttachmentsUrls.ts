/** Path templates and body keys for the note attachment endpoints. */

/** Singular on the wire, and not scoped to the note's owner. */
export const NOTE_ATTACHMENT = '/api/{api_version}/note_attachment/{attachment_uuid}';

/** The envelope one record arrives under. */
export const NOTE_ATTACHMENT_KEY = 'note_attachment';
