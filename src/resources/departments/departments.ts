/** The departments endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './departmentsUrls.js';
import {SettingsDepartment, SettingsDepartmentList} from './departmentsDto.js';

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
 * `GET /api/{api_version}/settings/departments`
 *
 * List the departments; some carry no `id` and cannot be read singly.
 */
export function getSettingsDepartments(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDepartmentList>> {
    return client.sendGetRequest<SettingsDepartmentList>(urls.SETTINGS_DEPARTMENTS, {
        queryParams,
        dtoType: SettingsDepartmentList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/departments/{department_id}`
 *
 * Read one department by its `dept_` id.
 */
export function getSettingsDepartment(
    client: ExsitedClient,
    departmentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDepartment>> {
    requireValue(departmentId, 'department_id');
    return client.sendGetRequest<SettingsDepartment>(urls.SETTINGS_DEPARTMENT, {
        pathParams: {department_id: departmentId},
        dtoType: SettingsDepartment,
        ...options,
    });
}
