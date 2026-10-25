/** The employees endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './employeesUrls.js';
import {Employee, EmployeeList} from './employeesDto.js';

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

/** `GET /api/{api_version}/employees` */
export function getEmployees(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<EmployeeList>> {
    return client.sendGetRequest<EmployeeList>(urls.EMPLOYEES, {
        queryParams,
        dtoType: EmployeeList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/employees`
 */
export function createEmployee(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Employee>> {
    requirePayload(payload);
    return client.sendPostRequest<Employee>(urls.EMPLOYEES, {
        jsonBody: payload,
        dtoType: Employee,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/employees/{employee_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteEmployee(
    client: ExsitedClient,
    employeeId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(employeeId, 'employee_id');
    return client.sendDeleteRequest<never>(urls.EMPLOYEE, {
        pathParams: {employee_id: employeeId},
        ...options,
    });
}

/** `GET /api/{api_version}/employees/{employee_id}` */
export function getEmployee(
    client: ExsitedClient,
    employeeId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Employee>> {
    requireValue(employeeId, 'employee_id');
    return client.sendGetRequest<Employee>(urls.EMPLOYEE, {
        pathParams: {employee_id: employeeId},
        queryParams,
        dtoType: Employee,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/employees/{employee_id}`
 */
export function updateEmployee(
    client: ExsitedClient,
    employeeId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Employee>> {
    requireValue(employeeId, 'employee_id');
    requirePayload(payload);
    return client.sendPatchRequest<Employee>(urls.EMPLOYEE, {
        pathParams: {employee_id: employeeId},
        jsonBody: payload,
        dtoType: Employee,
        ...options,
    });
}
