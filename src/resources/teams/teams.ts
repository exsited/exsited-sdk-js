/** The teams endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './teamsUrls.js';
import {SettingsTeam, SettingsTeamList} from './teamsDto.js';

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
 * `GET /api/{api_version}/settings/teams`
 *
 * List teams.
 */
export function getSettingsTeams(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTeamList>> {
    return client.sendGetRequest<SettingsTeamList>(urls.SETTINGS_TEAMS, {
        queryParams,
        dtoType: SettingsTeamList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/teams`
 *
 * Create a team.
 */
export function createSettingsTeam(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTeam>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsTeam>(urls.SETTINGS_TEAMS, {
        jsonBody: payload,
        dtoType: SettingsTeam,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/teams/{team_id}`
 *
 * Get one team.
 */
export function getSettingsTeam(
    client: ExsitedClient,
    teamId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTeam>> {
    requireValue(teamId, 'team_id');
    return client.sendGetRequest<SettingsTeam>(urls.SETTINGS_TEAM, {
        pathParams: {team_id: teamId},
        dtoType: SettingsTeam,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/teams/{team_id}`
 *
 * Delete a team; refused while the team has members.
 */
export function deleteSettingsTeam(
    client: ExsitedClient,
    teamId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(teamId, 'team_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_TEAM, {
        pathParams: {team_id: teamId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/teams/{team_id}`
 *
 * Update or enable/disable a team; `status` takes active or inactive.
 */
export function updateSettingsTeam(
    client: ExsitedClient,
    teamId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTeam>> {
    requireValue(teamId, 'team_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsTeam>(urls.SETTINGS_TEAM, {
        pathParams: {team_id: teamId},
        jsonBody: payload,
        dtoType: SettingsTeam,
        ...options,
    });
}
