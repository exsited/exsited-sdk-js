/** Path templates and body keys for the credit note application endpoints. */

export const CREDIT_NOTE_APPLICATIONS = '/api/{api_version}/credit_note_applications';
export const CREDIT_NOTE_APPLICATION = '/api/{api_version}/credit_note_applications/{credit_note_application_id}';
export const INVOICE_CREDIT_NOTE_APPLICATIONS = '/api/{api_version}/invoices/{invoice_id}/credit_note_applications';

/** The key a listing's records sit under. */
export const CREDIT_NOTE_APPLICATIONS_KEY = 'data';
export const INVOICE_CREDIT_NOTE_APPLICATIONS_KEY = 'data';

/** The envelope one record arrives under. */
export const CREDIT_NOTE_APPLICATION_KEY = 'credit_note_application';
