/** Path templates and body keys for the alert responsibility endpoints. */

export const SETTINGS_ALERT_RESPONSIBILITIES = '/api/{api_version}/settings/alert_responsibilities';
export const SETTINGS_ALERT_RESPONSIBILITY =
    '/api/{api_version}/settings/alert_responsibilities/{alert_responsibility_id}';

/** The key a listing's records sit under. */
export const SETTINGS_ALERT_RESPONSIBILITIES_KEY = 'data';

/** The envelope one record arrives under. */
export const ALERT_RESPONSIBILITY_KEY = 'alert_responsibility';
