/** The zones endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './zonesUrls.js';
import {SettingsZone, SettingsZoneList} from './zonesDto.js';

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
 * `GET /api/{api_version}/settings/zones`
 *
 * List zones.
 */
export function getSettingsZones(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsZoneList>> {
    return client.sendGetRequest<SettingsZoneList>(urls.SETTINGS_ZONES, {
        queryParams,
        dtoType: SettingsZoneList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/zones`
 *
 * Create a zone; `country_list` takes country ids, one at least.
 */
export function createSettingsZone(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsZone>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsZone>(urls.SETTINGS_ZONES, {
        jsonBody: payload,
        dtoType: SettingsZone,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/zones/{zone_id}`
 *
 * Get one zone.
 */
export function getSettingsZone(
    client: ExsitedClient,
    zoneId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsZone>> {
    requireValue(zoneId, 'zone_id');
    return client.sendGetRequest<SettingsZone>(urls.SETTINGS_ZONE, {
        pathParams: {zone_id: zoneId},
        dtoType: SettingsZone,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/zones/{zone_id}`
 *
 * Delete a zone.
 */
export function deleteSettingsZone(
    client: ExsitedClient,
    zoneId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(zoneId, 'zone_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_ZONE, {
        pathParams: {zone_id: zoneId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/zones/{zone_id}`
 *
 * Update a zone; answers 200 and changes nothing.
 */
export function updateSettingsZone(
    client: ExsitedClient,
    zoneId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsZone>> {
    requireValue(zoneId, 'zone_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsZone>(urls.SETTINGS_ZONE, {
        pathParams: {zone_id: zoneId},
        jsonBody: payload,
        dtoType: SettingsZone,
        ...options,
    });
}
