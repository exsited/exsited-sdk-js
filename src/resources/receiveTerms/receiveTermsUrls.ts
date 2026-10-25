/** Path templates and body keys for the receive term endpoints. */

export const SETTINGS_RECEIVE_TERMS = '/api/{api_version}/settings/receive_terms';
export const SETTINGS_RECEIVE_TERM = '/api/{api_version}/settings/receive_terms/{receive_term_id}';

/** The key a listing's records sit under. */
export const SETTINGS_RECEIVE_TERMS_KEY = 'data';

/** The envelope one record arrives under. */
export const RECEIVE_TERM_KEY = 'receive_term';
