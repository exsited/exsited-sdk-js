/** The settings workflows endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './settingsWorkflowsUrls.js';
import {SettingsWorkflow, SettingsWorkflowList} from './settingsWorkflowsDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/** The key a listing puts its records under. */
export const RECORD_KEY = 'data';

function requireValue(value: unknown, what: string): void {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        throw new SdkUsageError(`${what} is required: the request cannot be built without it`);
    }
}

/**
 * `GET /api/{api_version}/settings/workflows`
 *
 * List workflows; read only here, the writes live under `/workflows`.
 */
export function getSettingsWorkflows(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsWorkflowList>> {
    return client.sendGetRequest<SettingsWorkflowList>(urls.SETTINGS_WORKFLOWS, {
        queryParams,
        dtoType: SettingsWorkflowList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/workflows/{workflow_id}`
 *
 * Get one workflow.
 */
export function getSettingsWorkflow(
    client: ExsitedClient,
    workflowId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsWorkflow>> {
    requireValue(workflowId, 'workflow_id');
    return client.sendGetRequest<SettingsWorkflow>(urls.SETTINGS_WORKFLOW, {
        pathParams: {workflow_id: workflowId},
        dtoType: SettingsWorkflow,
        ...options,
    });
}
