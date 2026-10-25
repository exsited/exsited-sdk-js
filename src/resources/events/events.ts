/** The events endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './eventsUrls.js';
import {Event, EventList} from './eventsDto.js';

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

/** `GET /api/{api_version}/events` */
export function getEvents(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<EventList>> {
    return client.sendGetRequest<EventList>(urls.EVENTS, {
        queryParams,
        dtoType: EventList,
        ...options,
    });
}

/** `GET /api/{api_version}/events/{event_uuid}` */
export function getEvent(
    client: ExsitedClient,
    eventUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Event>> {
    requireValue(eventUuid, 'event_uuid');
    return client.sendGetRequest<Event>(urls.EVENT, {
        pathParams: {event_uuid: eventUuid},
        queryParams,
        dtoType: Event,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/events/{event_uuid}/execute`
 *
 * No typed view, so `.dto` is null.
 */
export function createEventExecute(
    client: ExsitedClient,
    eventUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(eventUuid, 'event_uuid');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.EVENT_EXECUTE, {
        pathParams: {event_uuid: eventUuid},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/events/{event_uuid}/remove`
 */
export function createEventRemove(
    client: ExsitedClient,
    eventUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Event>> {
    requireValue(eventUuid, 'event_uuid');
    requirePayload(payload);
    return client.sendPostRequest<Event>(urls.EVENT_REMOVE, {
        pathParams: {event_uuid: eventUuid},
        jsonBody: payload,
        dtoType: Event,
        ...options,
    });
}
