/** Path templates and body keys for the fulfillment profile endpoints. */

export const SETTINGS_FULFILLMENT_PROFILES = '/api/{api_version}/settings/fulfillment_profiles';
export const SETTINGS_FULFILLMENT_PROFILE = '/api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}';

/** The key a listing's records sit under. */
export const SETTINGS_FULFILLMENT_PROFILES_KEY = 'data';

/** The envelope one record arrives under. */
export const FULFILLMENT_PROFILE_KEY = 'fulfillment_profile';
