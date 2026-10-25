/** Path templates and body keys for the communication endpoints. */

export const COMMUNICATIONS_SEND_EMAIL = '/api/{api_version}/communications/send_email';

/** The one key the body names, which picks the document the email carries. */
export const SEND_EMAIL_DOCUMENT_KEYS = Object.freeze(['invoice', 'purchase_invoice', 'account_statement', 'payment']);

/** The envelope one record arrives under. */
export const EMAIL_KEY = 'email';
