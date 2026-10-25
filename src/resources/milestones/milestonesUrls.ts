/** Path templates and body keys for the milestone endpoints. */

export const MILESTONES = '/api/{api_version}/milestones';
export const MILESTONES_ACCOUNT_BY_ID = '/api/{api_version}/milestones/account/{account_id}';
export const MILESTONES_LABOUR_BY_ID = '/api/{api_version}/milestones/labour/{labour_id}';
export const MILESTONES_EMPLOYEE_BY_CODE = '/api/{api_version}/milestones/employee/{employee_code}';
export const MILESTONE = '/api/{api_version}/milestones/{milestone_uuid}';

/** The key a listing's records sit under. */
export const MILESTONES_ACCOUNT_BY_ID_KEY = 'data';
export const MILESTONES_KEY = 'data';
export const MILESTONES_LABOUR_BY_ID_KEY = 'data';
export const MILESTONES_EMPLOYEE_BY_CODE_KEY = 'data';

/** The envelope one record arrives under. */
export const MILESTONE_KEY = 'milestone';
