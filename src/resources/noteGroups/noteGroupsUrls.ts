/** Path templates and body keys for the note group endpoints. */

export const NOTE_GROUPS = '/api/{api_version}/note_groups';
export const NOTE_GROUP = '/api/{api_version}/note_groups/{note_group_id}';
export const NOTE_GROUP_NOTES = '/api/{api_version}/note_groups/{note_group_id}/notes';
export const NOTE_GROUP_NOTES_BY_USER = '/api/{api_version}/note_groups/{note_group_id}/notes/user/{note_user}';

/** The key a listing's records sit under. */
export const NOTE_GROUPS_KEY = 'data';
export const NOTE_GROUP_NOTES_KEY = 'data';
export const NOTE_GROUP_NOTES_BY_USER_KEY = 'data';

/** The envelope one record arrives under. */
export const NOTE_GROUP_KEY = 'note_group';
