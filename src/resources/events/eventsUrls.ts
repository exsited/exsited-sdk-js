/** Path templates and body keys for the event endpoints. */

export const EVENTS = '/api/{api_version}/events';
export const EVENT = '/api/{api_version}/events/{event_uuid}';
export const EVENT_EXECUTE = '/api/{api_version}/events/{event_uuid}/execute';
export const EVENT_REMOVE = '/api/{api_version}/events/{event_uuid}/remove';

/** The key a listing's records sit under. */
export const EVENTS_KEY = 'data';

/** The envelope one record arrives under. */
export const EVENT_KEY = 'event';
