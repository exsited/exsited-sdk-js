/** Path templates and body keys for the department endpoints. */

export const SETTINGS_DEPARTMENTS = '/api/{api_version}/settings/departments';
export const SETTINGS_DEPARTMENT = '/api/{api_version}/settings/departments/{department_id}';

/** The key a listing's records sit under. */
export const SETTINGS_DEPARTMENTS_KEY = 'data';

/** The envelope one record arrives under. */
export const DEPARTMENT_KEY = 'department';
