/** Path templates and body keys for the purchase credit note application endpoints. */

export const PURCHASE_CREDIT_NOTE_APPLICATIONS = '/api/{api_version}/purchase_credit_note_applications';
export const PURCHASE_CREDIT_NOTE_APPLICATION =
    '/api/{api_version}/purchase_credit_note_applications/{purchase_credit_note_application_id}';

/** The key a listing's records sit under. */
export const PURCHASE_CREDIT_NOTE_APPLICATIONS_KEY = 'data';

/** The envelope one record arrives under. */
export const PURCHASE_CREDIT_NOTE_APPLICATION_KEY = 'purchase_credit_note_application';
