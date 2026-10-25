/** Path templates and body keys for the email template endpoints. */

export const SETTINGS_EMAIL_TEMPLATES = '/api/{api_version}/settings/email_templates';
export const SETTINGS_EMAIL_TEMPLATE = '/api/{api_version}/settings/email_templates/{email_template_id}';

/** The key a listing's records sit under. */
export const SETTINGS_EMAIL_TEMPLATES_KEY = 'data';

/** The envelope one record arrives under. */
export const EMAIL_TEMPLATE_KEY = 'email_template';
