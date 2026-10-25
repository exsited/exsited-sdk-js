/** Path templates and body keys for the custom event endpoints. */

export const SETTINGS_CUSTOM_EVENTS = '/api/{api_version}/settings/custom_events';
export const SETTINGS_CUSTOM_EVENT = '/api/{api_version}/settings/custom_events/{custom_event_id}';

/** The key a listing's records sit under. */
export const SETTINGS_CUSTOM_EVENTS_KEY = 'data';

/** The envelope one record arrives under. */
export const CUSTOM_EVENT_KEY = 'custom_event';
