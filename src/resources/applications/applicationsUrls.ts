/** Path templates and body keys for the application endpoints. */

export const SETTINGS_APPLICATIONS = '/api/{api_version}/settings/applications';
export const SETTINGS_APPLICATION = '/api/{api_version}/settings/applications/{application_id}';

/** The key a listing's records sit under. */
export const SETTINGS_APPLICATIONS_KEY = 'data';

/** The envelope one record arrives under. */
export const APPLICATION_KEY = 'application';
