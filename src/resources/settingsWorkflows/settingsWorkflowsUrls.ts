/** Path templates and body keys for the workflow endpoints. */

export const SETTINGS_WORKFLOWS = '/api/{api_version}/settings/workflows';
export const SETTINGS_WORKFLOW = '/api/{api_version}/settings/workflows/{workflow_id}';

/** The key a listing's records sit under. */
export const SETTINGS_WORKFLOWS_KEY = 'data';

/** The envelope one record arrives under. */
export const WORKFLOW_KEY = 'workflow';
