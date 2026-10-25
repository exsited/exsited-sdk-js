/** The custom events endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './customEventsUrls.js';
import {SettingsCustomEvent, SettingsCustomEventList} from './customEventsDto.js';

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
 * `GET /api/{api_version}/settings/custom_events`
 *
 * List the custom events.
 */
export function getSettingsCustomEvents(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomEventList>> {
    return client.sendGetRequest<SettingsCustomEventList>(urls.SETTINGS_CUSTOM_EVENTS, {
        queryParams,
        dtoType: SettingsCustomEventList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/custom_events`
 *
 * Create a custom event; `name` and `base_event`, an `se_` id, are required, and a message is added to every
 * communication profile.
 */
export function createSettingsCustomEvent(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_CUSTOM_EVENTS, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/custom_events/{custom_event_id}`
 *
 * Read one custom event by its `ce_` id.
 */
export function getSettingsCustomEvent(
    client: ExsitedClient,
    customEventId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomEvent>> {
    requireValue(customEventId, 'custom_event_id');
    return client.sendGetRequest<SettingsCustomEvent>(urls.SETTINGS_CUSTOM_EVENT, {
        pathParams: {custom_event_id: customEventId},
        dtoType: SettingsCustomEvent,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/custom_events/{custom_event_id}`
 *
 * Delete a custom event no workflow uses.
 */
export function deleteSettingsCustomEvent(
    client: ExsitedClient,
    customEventId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customEventId, 'custom_event_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_CUSTOM_EVENT, {
        pathParams: {custom_event_id: customEventId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/custom_events/{custom_event_id}`
 *
 * Update a custom event's fields or its status.
 */
export function updateSettingsCustomEvent(
    client: ExsitedClient,
    customEventId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customEventId, 'custom_event_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_CUSTOM_EVENT, {
        pathParams: {custom_event_id: customEventId},
        jsonBody: payload,
        ...options,
    });
}
