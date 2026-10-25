/** The timesheets endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './timesheetsUrls.js';
import {Timesheet, TimesheetList, Timesheets} from './timesheetsDto.js';

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

/** `GET /api/{api_version}/timesheets` */
export function getTimesheets(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<TimesheetList>> {
    return client.sendGetRequest<TimesheetList>(urls.TIMESHEETS, {
        queryParams,
        dtoType: TimesheetList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/timesheets`
 */
export function createTimesheet(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Timesheet>> {
    requirePayload(payload);
    return client.sendPostRequest<Timesheet>(urls.TIMESHEETS, {
        jsonBody: payload,
        dtoType: Timesheet,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/timesheets/{timesheet_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteTimesheet(
    client: ExsitedClient,
    createdTimesheetId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(createdTimesheetId, 'timesheet_id');
    return client.sendDeleteRequest<never>(urls.TIMESHEET, {
        pathParams: {timesheet_id: createdTimesheetId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/timesheets/{timesheet_id}`
 */
export function updateTimesheet(
    client: ExsitedClient,
    createdTimesheetId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Timesheet>> {
    requireValue(createdTimesheetId, 'timesheet_id');
    requirePayload(payload);
    return client.sendPatchRequest<Timesheet>(urls.TIMESHEET, {
        pathParams: {timesheet_id: createdTimesheetId},
        jsonBody: payload,
        dtoType: Timesheet,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/timesheets/{timesheet_id}`
 *
 * Get one timesheet, by the `ts_` id the listing and the create answer.
 */
export function getTimesheet(
    client: ExsitedClient,
    timesheetId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Timesheets>> {
    requireValue(timesheetId, 'timesheet_id');
    return client.sendGetRequest<Timesheets>(urls.TIMESHEET, {
        pathParams: {timesheet_id: timesheetId},
        dtoType: Timesheets,
        ...options,
    });
}
