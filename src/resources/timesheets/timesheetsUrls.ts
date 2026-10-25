/** Path templates and body keys for the timesheet endpoints. */

export const TIMESHEETS = '/api/{api_version}/timesheets';
export const TIMESHEET = '/api/{api_version}/timesheets/{timesheet_id}';

/** The key a listing's records sit under. */
export const TIMESHEETS_KEY = 'data';

/** The envelope one record arrives under. */
export const TIMESHEET_KEY = 'timesheet';
