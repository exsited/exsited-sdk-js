/** Path templates and body keys for the communication profile endpoints. */

export const SETTINGS_COMMUNICATION_PROFILES = '/api/{api_version}/settings/communication_profiles';
export const SETTINGS_COMMUNICATION_PROFILE =
    '/api/{api_version}/settings/communication_profiles/{communication_profile_id}';

/** The key a listing's records sit under. */
export const SETTINGS_COMMUNICATION_PROFILES_KEY = 'data';

/** The envelope one record arrives under. */
export const COMMUNICATION_PROFILE_KEY = 'communication_profile';
