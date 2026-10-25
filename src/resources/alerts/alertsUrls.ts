/** Path templates and body keys for the alert endpoints. */

export const ALERTS = '/api/{api_version}/alerts';
export const ALERT = '/api/{api_version}/alerts/{alert_id}';
export const ALERTS_ACCOUNT_BY_ID = '/api/{api_version}/alerts/account/{account_id}';
export const ALERTS_EMPLOYEE_BY_ID = '/api/{api_version}/alerts/employee/{employee_id}';
export const ALERTS_LABOUR_BY_ID = '/api/{api_version}/alerts/labour/{labour_id}';

/** The key a listing's records sit under. */
export const ALERTS_ACCOUNT_BY_ID_KEY = 'data';
export const ALERTS_KEY = 'data';
export const ALERTS_EMPLOYEE_BY_ID_KEY = 'data';
export const ALERTS_LABOUR_BY_ID_KEY = 'data';
