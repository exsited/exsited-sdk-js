/** Path templates and body keys for the invoice term endpoints. */

export const SETTINGS_INVOICE_TERMS = '/api/{api_version}/settings/invoice_terms';
export const SETTINGS_INVOICE_TERM = '/api/{api_version}/settings/invoice_terms/{invoice_term_id}';

/** The key a listing's records sit under. */
export const SETTINGS_INVOICE_TERMS_KEY = 'data';

/** The envelope one record arrives under. */
export const INVOICE_TERM_KEY = 'invoice_term';
