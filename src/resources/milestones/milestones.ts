/** The milestones endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './milestonesUrls.js';
import {Milestones} from './milestonesDto.js';

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

/** `GET /api/{api_version}/milestones` */
export function getMilestones(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Milestones>> {
    return client.sendGetRequest<Milestones>(urls.MILESTONES, {
        queryParams,
        dtoType: Milestones,
        ...options,
    });
}

/** `GET /api/{api_version}/milestones/account/{account_id}` */
export function getMilestonesAccountById(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Milestones>> {
    requireValue(accountId, 'account_id');
    return client.sendGetRequest<Milestones>(urls.MILESTONES_ACCOUNT_BY_ID, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: Milestones,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/milestones/labour/{labour_id}`
 */
export function getMilestonesLabourById(
    client: ExsitedClient,
    labourId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Milestones>> {
    requireValue(labourId, 'labour_id');
    return client.sendGetRequest<Milestones>(urls.MILESTONES_LABOUR_BY_ID, {
        pathParams: {labour_id: labourId},
        queryParams,
        dtoType: Milestones,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/milestones/employee/{employee_code}`
 *
 * Get milestones by employee; the employee's `code`, since an `emp_` id answers `404`.
 */
export function getMilestonesEmployeeByCode(
    client: ExsitedClient,
    employeeCode: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Milestones>> {
    requireValue(employeeCode, 'employee_code');
    return client.sendGetRequest<Milestones>(urls.MILESTONES_EMPLOYEE_BY_CODE, {
        pathParams: {employee_code: employeeCode},
        queryParams,
        dtoType: Milestones,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/milestones/{milestone_uuid}`
 *
 * Get one milestone, a `wfm_` id or its raw uuid; a workflow's milestone definition is a different record and answers
 * `404`.
 */
export function getMilestone(
    client: ExsitedClient,
    milestoneUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(milestoneUuid, 'milestone_uuid');
    return client.sendGetRequest<never>(urls.MILESTONE, {
        pathParams: {milestone_uuid: milestoneUuid},
        ...options,
    });
}
