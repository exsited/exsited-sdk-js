/** Path templates for the workflow endpoints. */

export const MILESTONE = '/api/{api_version}/milestones/{milestone_uuid}';
export const WORKFLOW_COMPONENT_BY_ID = '/api/{api_version}/workflow/component/{cc_id}';
export const WORKFLOW_MILESTONES = '/api/{api_version}/workflows/{workflow_uuid}/milestones';
export const WORKFLOW_COMPONENT_CC_MILESTONE = '/api/{api_version}/workflow/component/{cc_id}/milestone';
export const WORKFLOW_COMPONENT_HISTORY = '/api/{api_version}/workflow/component/{component_object_id}/history';
export const WORKFLOW_COMPONENT_CC_INSTANCE_CC_MILESTONE =
    '/api/{api_version}/workflow/component/{component_uuid}/{component_object_id}/milestone';
export const WORKFLOWS = '/api/{api_version}/workflows';
export const WORKFLOW = '/api/{api_version}/workflows/{workflow_id}';
export const WORKFLOW_MILESTONE = '/api/{api_version}/workflows/{workflow_id}/milestones/{milestone_id}';
export const WORKFLOW_STAGES = '/api/{api_version}/workflows/{workflow_id}/stages';
export const WORKFLOW_STAGE = '/api/{api_version}/workflows/{workflow_id}/stages/{stage_id}';
export const WORKFLOW_CUSTOM_COMPONENT_HISTORY =
    '/api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/history';
export const WORKFLOW_CUSTOM_COMPONENT_MILESTONES =
    '/api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/milestones';
export const WORKFLOW_CUSTOM_COMPONENT_MILESTONE =
    '/api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/milestones/{milestone_id}';

/** The key a listing's records sit under. */
export const WORKFLOW_MILESTONES_KEY = 'data';
export const WORKFLOWS_KEY = 'data';
export const WORKFLOW_STAGES_KEY = 'data';

/** The envelope one record arrives under, and the one a create or an update is sent under. */
export const WORKFLOW_KEY = 'workflow';
export const WORKFLOW_MILESTONE_KEY = 'workflow_milestone';
export const WORKFLOW_STAGE_KEY = 'workflow_stage';
export const WORKFLOW_MILESTONE_INSTANCE_KEY = 'workflow_milestone_instance';
