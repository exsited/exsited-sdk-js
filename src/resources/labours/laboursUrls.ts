/** Path templates and body keys for the labour endpoints. */

export const LABOUR_AVAILABILITY = '/api/{api_version}/labour_availability';
export const LABOUR_PROFILES = '/api/{api_version}/labour_profiles';
export const LABOURS = '/api/{api_version}/labours';
export const LABOUR_PROFILE = '/api/{api_version}/labour_profiles/{labour_profile_id}';
export const LABOURS_AVAILABLE_FOR_BOOKING = '/api/{api_version}/labours/available_for_booking';
export const LABOUR = '/api/{api_version}/labours/{labour_uuid}';
export const LABOUR_CANCEL = '/api/{api_version}/labours/{labour_id}/cancel';
export const LABOUR_REACTIVATE = '/api/{api_version}/labours/{labour_id}/reactivate';
export const LABOUR_ORDERS = '/api/{api_version}/labours/{labour_uuid}/orders';
export const LABOUR_PROFILE_SESSIONS = '/api/{api_version}/labour_profiles/{labour_profile_id}/sessions';
export const LABOUR_PROFILE_SESSION = '/api/{api_version}/labour_profiles/{labour_profile_id}/sessions/{session_id}';
export const LABOUR_CALENDAR = '/api/{api_version}/labours/{labour_id}/availability';

/** The key a listing's records sit under. */
export const LABOURS_AVAILABLE_FOR_BOOKING_KEY = 'data';
export const LABOURS_KEY = 'data';
export const LABOUR_AVAILABILITY_KEY = 'data';
export const LABOUR_PROFILES_KEY = 'data';
export const LABOUR_ORDERS_KEY = 'data';
export const LABOUR_PROFILE_SESSIONS_KEY = 'data';

/** The envelope one record arrives under. */
export const LABOUR_KEY = 'labour';
export const LABOUR_PROFILE_KEY = 'labour_profile';
export const LABOUR_CALENDAR_KEY = 'labour_calendar';
export const LABOUR_PROFILE_SESSION_KEY = 'labour_profile_session';
