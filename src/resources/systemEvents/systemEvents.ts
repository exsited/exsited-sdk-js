/** The system events endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './systemEventsUrls.js';
import {SettingsSystemEvent, SettingsSystemEventList} from './systemEventsDto.js';

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
 * `GET /api/{api_version}/settings/system_events`
 *
 * List the base system events; reference data, read only.
 */
export function getSettingsSystemEvents(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsSystemEventList>> {
    return client.sendGetRequest<SettingsSystemEventList>(urls.SETTINGS_SYSTEM_EVENTS, {
        queryParams,
        dtoType: SettingsSystemEventList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/system_events/{system_event_id}`
 *
 * Get one system event.
 */
export function getSettingsSystemEvent(
    client: ExsitedClient,
    systemEventId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsSystemEvent>> {
    requireValue(systemEventId, 'system_event_id');
    return client.sendGetRequest<SettingsSystemEvent>(urls.SETTINGS_SYSTEM_EVENT, {
        pathParams: {system_event_id: systemEventId},
        dtoType: SettingsSystemEvent,
        ...options,
    });
}
