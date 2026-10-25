/** The action scripts endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './actionScriptsUrls.js';
import {ActionScript, ActionScriptList} from './actionScriptsDto.js';

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

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/**
 * `GET /api/{api_version}/action_scripts`
 *
 * List action scripts; deleted scripts are left out.
 */
export function getActionScripts(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ActionScriptList>> {
    return client.sendGetRequest<ActionScriptList>(urls.ACTION_SCRIPTS, {
        queryParams,
        dtoType: ActionScriptList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/action_scripts/{action_script_id}`
 *
 * One action script; the id is the `ascr_` one.
 */
export function getActionScript(
    client: ExsitedClient,
    actionScriptId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ActionScript>> {
    requireValue(actionScriptId, 'action_script_id');
    return client.sendGetRequest<ActionScript>(urls.ACTION_SCRIPT, {
        pathParams: {action_script_id: actionScriptId},
        dtoType: ActionScript,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/action_scripts`
 *
 * Store an action script, under `action_script`; `name` is required and unique, and a `script_file` is a `.js` file
 * sent as base64 `content`.
 */
export function createActionScript(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ActionScript>> {
    requirePayload(payload);
    return client.sendPostRequest<ActionScript>(urls.ACTION_SCRIPTS, {
        jsonBody: payload,
        dtoType: ActionScript,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/action_scripts/{action_script_id}`
 *
 * Update an action script, under `action_script`; an unknown key is refused.
 */
export function updateActionScript(
    client: ExsitedClient,
    actionScriptId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ActionScript>> {
    requireValue(actionScriptId, 'action_script_id');
    requirePayload(payload);
    return client.sendPatchRequest<ActionScript>(urls.ACTION_SCRIPT, {
        pathParams: {action_script_id: actionScriptId},
        jsonBody: payload,
        dtoType: ActionScript,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/action_scripts/{action_script_id}`
 *
 * Delete an action script; answered `204`.
 */
export function deleteActionScript(
    client: ExsitedClient,
    actionScriptId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(actionScriptId, 'action_script_id');
    return client.sendDeleteRequest<never>(urls.ACTION_SCRIPT, {
        pathParams: {action_script_id: actionScriptId},
        ...options,
    });
}
