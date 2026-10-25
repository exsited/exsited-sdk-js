/** The labours endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './laboursUrls.js';
import {
    Labour,
    LabourAvailabilityList,
    LabourCalendar,
    LabourList,
    LabourOrderList,
    LabourProfile,
    LabourProfileList,
    LabourProfileSessionList,
    LabourProfileSessionView,
} from './laboursDto.js';

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

/** `GET /api/{api_version}/labour_availability` */
export function getLabourAvailability(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<LabourAvailabilityList>> {
    return client.sendGetRequest<LabourAvailabilityList>(urls.LABOUR_AVAILABILITY, {
        queryParams,
        dtoType: LabourAvailabilityList,
        ...options,
    });
}

/** `GET /api/{api_version}/labour_profiles` */
export function getLabourProfiles(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<LabourProfileList>> {
    return client.sendGetRequest<LabourProfileList>(urls.LABOUR_PROFILES, {
        queryParams,
        dtoType: LabourProfileList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/labour_profiles`
 */
export function createLabourProfile(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<LabourProfile>> {
    requirePayload(payload);
    return client.sendPostRequest<LabourProfile>(urls.LABOUR_PROFILES, {
        jsonBody: payload,
        dtoType: LabourProfile,
        ...options,
    });
}

/** `GET /api/{api_version}/labours` */
export function getLabours(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<LabourList>> {
    return client.sendGetRequest<LabourList>(urls.LABOURS, {
        queryParams,
        dtoType: LabourList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/labours`
 */
export function createLabour(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Labour>> {
    requirePayload(payload);
    return client.sendPostRequest<Labour>(urls.LABOURS, {
        jsonBody: payload,
        dtoType: Labour,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/labour_profiles/{labour_profile_id}`
 */
export function getLabourProfile(
    client: ExsitedClient,
    labourProfileId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<LabourProfile>> {
    requireValue(labourProfileId, 'labour_profile_id');
    return client.sendGetRequest<LabourProfile>(urls.LABOUR_PROFILE, {
        pathParams: {labour_profile_id: labourProfileId},
        queryParams,
        dtoType: LabourProfile,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/labour_profiles/{labour_profile_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function updateLabourProfile(
    client: ExsitedClient,
    labourProfileId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(labourProfileId, 'labour_profile_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.LABOUR_PROFILE, {
        pathParams: {labour_profile_id: labourProfileId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/labour_profiles/{labour_profile_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteLabourProfile(
    client: ExsitedClient,
    labourProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(labourProfileId, 'labour_profile_id');
    return client.sendDeleteRequest<never>(urls.LABOUR_PROFILE, {
        pathParams: {labour_profile_id: labourProfileId},
        ...options,
    });
}

/** `GET /api/{api_version}/labours/available_for_booking` */
export function getLaboursAvailableForBooking(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<LabourList>> {
    return client.sendGetRequest<LabourList>(urls.LABOURS_AVAILABLE_FOR_BOOKING, {
        queryParams,
        dtoType: LabourList,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/labours/{labour_uuid}`
 */
export function updateLabour(
    client: ExsitedClient,
    labourUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Labour>> {
    requireValue(labourUuid, 'labour_uuid');
    requirePayload(payload);
    return client.sendPatchRequest<Labour>(urls.LABOUR, {
        pathParams: {labour_uuid: labourUuid},
        jsonBody: payload,
        dtoType: Labour,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/labours/{labour_uuid}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteLabour(
    client: ExsitedClient,
    labourUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(labourUuid, 'labour_uuid');
    return client.sendDeleteRequest<never>(urls.LABOUR, {
        pathParams: {labour_uuid: labourUuid},
        ...options,
    });
}

/** `GET /api/{api_version}/labours/{labour_uuid}` */
export function getLabour(
    client: ExsitedClient,
    labourUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Labour>> {
    requireValue(labourUuid, 'labour_uuid');
    return client.sendGetRequest<Labour>(urls.LABOUR, {
        pathParams: {labour_uuid: labourUuid},
        queryParams,
        dtoType: Labour,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/labours/{labour_id}/cancel`
 */
export function cancelLabour(
    client: ExsitedClient,
    labourId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Labour>> {
    requireValue(labourId, 'labour_id');
    requirePayload(payload);
    return client.sendPostRequest<Labour>(urls.LABOUR_CANCEL, {
        pathParams: {labour_id: labourId},
        jsonBody: payload,
        dtoType: Labour,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/labours/{labour_id}/reactivate`
 */
export function reactivateLabour(
    client: ExsitedClient,
    labourId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Labour>> {
    requireValue(labourId, 'labour_id');
    requirePayload(payload);
    return client.sendPostRequest<Labour>(urls.LABOUR_REACTIVATE, {
        pathParams: {labour_id: labourId},
        jsonBody: payload,
        dtoType: Labour,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/labours/{labour_uuid}/orders`
 */
export function getLabourOrders(
    client: ExsitedClient,
    labourUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<LabourOrderList>> {
    requireValue(labourUuid, 'labour_uuid');
    return client.sendGetRequest<LabourOrderList>(urls.LABOUR_ORDERS, {
        pathParams: {labour_uuid: labourUuid},
        queryParams,
        dtoType: LabourOrderList,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/labour_availability`
 *
 * Edit availability slots in bulk; the body is `{"labours": [{"id", "labour_availability",
 * "labour_custom_availability"}]}`, `204`.
 */
export function updateLabourAvailability(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.LABOUR_AVAILABILITY, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/labour_profiles/{labour_profile_id}/sessions`
 *
 * List a labour profile's sessions.
 */
export function getLabourProfileSessions(
    client: ExsitedClient,
    labourProfileId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<LabourProfileSessionList>> {
    requireValue(labourProfileId, 'labour_profile_id');
    return client.sendGetRequest<LabourProfileSessionList>(urls.LABOUR_PROFILE_SESSIONS, {
        pathParams: {labour_profile_id: labourProfileId},
        queryParams,
        dtoType: LabourProfileSessionList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/labour_profiles/{labour_profile_id}/sessions/{session_id}`
 *
 * Get one labour profile session.
 */
export function getLabourProfileSession(
    client: ExsitedClient,
    labourProfileId: string,
    sessionId: string,
    options: CallOptions = {},
): Promise<ApiResponse<LabourProfileSessionView>> {
    requireValue(labourProfileId, 'labour_profile_id');
    requireValue(sessionId, 'session_id');
    return client.sendGetRequest<LabourProfileSessionView>(urls.LABOUR_PROFILE_SESSION, {
        pathParams: {labour_profile_id: labourProfileId, session_id: sessionId},
        dtoType: LabourProfileSessionView,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/labours/{labour_id}/availability`
 *
 * One labour's availability calendar, under `labour_calendar`; the id or the code.
 */
export function getLabourCalendar(
    client: ExsitedClient,
    labourId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<LabourCalendar>> {
    requireValue(labourId, 'labour_id');
    return client.sendGetRequest<LabourCalendar>(urls.LABOUR_CALENDAR, {
        pathParams: {labour_id: labourId},
        queryParams,
        dtoType: LabourCalendar,
        ...options,
    });
}
