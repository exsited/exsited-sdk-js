/** Path templates and body keys for the employee endpoints. */

export const EMPLOYEES = '/api/{api_version}/employees';
export const EMPLOYEE = '/api/{api_version}/employees/{employee_id}';

/** The key a listing's records sit under. */
export const EMPLOYEES_KEY = 'data';

/** The envelope one record arrives under. */
export const EMPLOYEE_KEY = 'employee';
