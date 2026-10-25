/** Path templates and body keys for the approval profile endpoints. */

export const SETTINGS_APPROVAL_PROFILES = '/api/{api_version}/settings/approval_profiles';
export const SETTINGS_APPROVAL_PROFILE = '/api/{api_version}/settings/approval_profiles/{approval_profile_id}';

/** The key a listing's records sit under. */
export const SETTINGS_APPROVAL_PROFILES_KEY = 'data';

/** The envelope one record arrives under. */
export const APPROVAL_PROFILE_KEY = 'approval_profile';
