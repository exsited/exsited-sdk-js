/** The approvals endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './approvalsUrls.js';
import {ApprovalsAccountList, ApprovalsSaleorder} from './approvalsDto.js';

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

/** `GET /api/{api_version}/approvals/account` */
export function getApprovalsAccount(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ApprovalsAccountList>> {
    return client.sendGetRequest<ApprovalsAccountList>(urls.APPROVALS_ACCOUNT, {
        queryParams,
        dtoType: ApprovalsAccountList,
        ...options,
    });
}

/** `GET /api/{api_version}/approvals/saleOrder` */
export function getApprovalsSaleorder(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ApprovalsSaleorder>> {
    return client.sendGetRequest<ApprovalsSaleorder>(urls.APPROVALS_SALEORDER, {
        queryParams,
        dtoType: ApprovalsSaleorder,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/approvals/account/{account_uuid}`
 *
 * No typed view, so `.dto` is null.
 */
export function getApprovalsAccountByUuid(
    client: ExsitedClient,
    accountUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(accountUuid, 'account_uuid');
    return client.sendGetRequest<never>(urls.APPROVALS_ACCOUNT_BY_UUID, {
        pathParams: {account_uuid: accountUuid},
        queryParams,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/approvals/approve`
 *
 * Approve a pending approval, `{"approval": {"entity", "resource_id", "note"}}` for any of the 16 entities; it runs the
 * held action.
 */
export function approveApproval(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.APPROVALS_APPROVE, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/approvals/reject`
 *
 * Reject a pending approval, the same `{"approval": {"entity", "resource_id", "note"}}` body as `approveApproval`.
 */
export function rejectApproval(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.APPROVALS_REJECT, {
        jsonBody: payload,
        ...options,
    });
}
