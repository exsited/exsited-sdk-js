/** The workflows endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './workflowsUrls.js';
import {WorkflowList, WorkflowMilestoneList, WorkflowMilestoneView, WorkflowView} from './workflowsDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

function requireValue(value: unknown, what: string): void {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        throw new SdkUsageError(`${what} is required: the request cannot be built without it`);
    }
}

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/**
 * `GET /api/{api_version}/workflows`
 *
 * List workflows, cursor paged; a deleted one is not listed.
 */
export function getWorkflows(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<WorkflowList>> {
    return client.sendGetRequest<WorkflowList>(urls.WORKFLOWS, {
        queryParams,
        dtoType: WorkflowList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/workflows/{workflow_id}`
 *
 * Retrieve one workflow, the `wf_` id or the `code`, under `workflow`.
 */
export function getWorkflow(
    client: ExsitedClient,
    workflowId: string,
    options: CallOptions = {},
): Promise<ApiResponse<WorkflowView>> {
    requireValue(workflowId, 'workflow_id');
    return client.sendGetRequest<WorkflowView>(urls.WORKFLOW, {
        pathParams: {workflow_id: workflowId},
        dtoType: WorkflowView,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/workflows`
 *
 * Create a workflow, as a draft, wrapped in `workflow`; `name` is required and any key but the eight the handler reads
 * is refused.
 */
export function createWorkflow(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<WorkflowView>> {
    requirePayload(payload);
    return client.sendPostRequest<WorkflowView>(urls.WORKFLOWS, {
        jsonBody: payload,
        dtoType: WorkflowView,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/workflows/{workflow_id}`
 *
 * Update a workflow or move its status, wrapped in `workflow`; `DRAFT` goes to `ACTIVE`, and `ACTIVE` and `INACTIVE` to
 * each other.
 */
export function updateWorkflow(
    client: ExsitedClient,
    workflowId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<WorkflowView>> {
    requireValue(workflowId, 'workflow_id');
    requirePayload(payload);
    return client.sendPatchRequest<WorkflowView>(urls.WORKFLOW, {
        pathParams: {workflow_id: workflowId},
        jsonBody: payload,
        dtoType: WorkflowView,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/workflows/{workflow_id}`
 *
 * Delete a workflow; answered `204`. The record is kept as `DELETED` and reads `404` after; a pre-built workflow is
 * refused.
 */
export function deleteWorkflow(
    client: ExsitedClient,
    workflowId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(workflowId, 'workflow_id');
    return client.sendDeleteRequest<never>(urls.WORKFLOW, {
        pathParams: {workflow_id: workflowId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/workflows/{workflow_id}/stages`
 *
 * List a workflow's stages; no typed view.
 */
export function getWorkflowStages(
    client: ExsitedClient,
    workflowId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(workflowId, 'workflow_id');
    return client.sendGetRequest<never>(urls.WORKFLOW_STAGES, {
        pathParams: {workflow_id: workflowId},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/workflows/{workflow_id}/stages/{stage_id}`
 *
 * Retrieve one stage, the `wfs_` id, under `workflow_stage`; no typed view.
 */
export function getWorkflowStage(
    client: ExsitedClient,
    workflowId: string,
    stageId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(workflowId, 'workflow_id');
    requireValue(stageId, 'stage_id');
    return client.sendGetRequest<never>(urls.WORKFLOW_STAGE, {
        pathParams: {workflow_id: workflowId, stage_id: stageId},
        ...options,
    });
}

/** `DELETE /api/{api_version}/milestones/{milestone_uuid}` */
export function deleteMilestone(
    client: ExsitedClient,
    milestoneUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(milestoneUuid, 'milestone_uuid');
    return client.sendDeleteRequest<never>(urls.MILESTONE, {
        pathParams: {milestone_uuid: milestoneUuid},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/history`
 *
 * Workflow history of one component instance, the component's dashed uuid and the instance's `code`; no
 * typed view.
 */
export function getWorkflowCustomComponentHistory(
    client: ExsitedClient,
    componentUuid: string,
    objectCode: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(objectCode, 'object_code');
    return client.sendGetRequest<never>(urls.WORKFLOW_CUSTOM_COMPONENT_HISTORY, {
        pathParams: {component_uuid: componentUuid, object_code: objectCode},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/milestones`
 *
 * Milestones of one component instance, the component's dashed uuid and the instance's `code`; no typed
 * view.
 */
export function getWorkflowCustomComponentMilestones(
    client: ExsitedClient,
    componentUuid: string,
    objectCode: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(objectCode, 'object_code');
    return client.sendGetRequest<never>(urls.WORKFLOW_CUSTOM_COMPONENT_MILESTONES, {
        pathParams: {component_uuid: componentUuid, object_code: objectCode},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/milestones/{milestone_id}`
 *
 * One milestone of one component instance, the `wfmi_` id, under `workflow_milestone_instance`; no typed
 * view.
 */
export function getWorkflowCustomComponentMilestone(
    client: ExsitedClient,
    componentUuid: string,
    objectCode: string,
    milestoneId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(objectCode, 'object_code');
    requireValue(milestoneId, 'milestone_id');
    return client.sendGetRequest<never>(urls.WORKFLOW_CUSTOM_COMPONENT_MILESTONE, {
        pathParams: {component_uuid: componentUuid, object_code: objectCode, milestone_id: milestoneId},
        ...options,
    });
}

/** `PATCH /api/{api_version}/workflow/component/{cc_id}`: answers 405. */
export function updateWorkflowComponentById(
    client: ExsitedClient,
    ccId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(ccId, 'cc_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.WORKFLOW_COMPONENT_BY_ID, {
        pathParams: {cc_id: ccId},
        jsonBody: payload,
        ...options,
    });
}

/** `GET /api/{api_version}/workflows/{workflow_uuid}/milestones` */
export function getWorkflowMilestones(
    client: ExsitedClient,
    workflowUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<WorkflowMilestoneList>> {
    requireValue(workflowUuid, 'workflow_uuid');
    return client.sendGetRequest<WorkflowMilestoneList>(urls.WORKFLOW_MILESTONES, {
        pathParams: {workflow_uuid: workflowUuid},
        queryParams,
        dtoType: WorkflowMilestoneList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/workflows/{workflow_id}/milestones/{milestone_id}`
 *
 * Retrieve one milestone definition, the `wfm_` id, under `workflow_milestone`.
 */
export function getWorkflowMilestone(
    client: ExsitedClient,
    workflowId: string,
    milestoneId: string,
    options: CallOptions = {},
): Promise<ApiResponse<WorkflowMilestoneView>> {
    requireValue(workflowId, 'workflow_id');
    requireValue(milestoneId, 'milestone_id');
    return client.sendGetRequest<WorkflowMilestoneView>(urls.WORKFLOW_MILESTONE, {
        pathParams: {workflow_id: workflowId, milestone_id: milestoneId},
        dtoType: WorkflowMilestoneView,
        ...options,
    });
}

/** `POST /api/{api_version}/workflow/component/{cc_id}/milestone`: answers 405. */
export function createWorkflowComponentCcMilestone(
    client: ExsitedClient,
    ccId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(ccId, 'cc_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.WORKFLOW_COMPONENT_CC_MILESTONE, {
        pathParams: {cc_id: ccId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * The workflow history of one component instance, by its code:
 * `GET /api/{api_version}/workflow/component/{component_object_id}/history`; answered under `histories`.
 */
export function getWorkflowComponentHistory(
    client: ExsitedClient,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<never>(urls.WORKFLOW_COMPONENT_HISTORY, {
        pathParams: {component_object_id: componentObjectId},
        queryParams,
        ...options,
    });
}

/**
 * The milestones of one component instance, by the component's uuid and the instance's code:
 * `GET /api/{api_version}/workflow/component/{component_uuid}/{component_object_id}/milestone`; answered under
 * `milestones`.
 */
export function getWorkflowComponentCcInstanceCcMilestone(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<never>(urls.WORKFLOW_COMPONENT_CC_INSTANCE_CC_MILESTONE, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        queryParams,
        ...options,
    });
}
