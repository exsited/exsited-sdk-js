/** The return vendor authorizations endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './returnVendorAuthorizationsUrls.js';
import {ReturnVendorAuthorizationList, ReturnVendorAuthorizationView} from './returnVendorAuthorizationsDto.js';

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
 * `GET /api/{api_version}/return_vendor_authorizations`
 *
 * List RVAs.
 */
export function getReturnVendorAuthorizations(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnVendorAuthorizationList>> {
    return client.sendGetRequest<ReturnVendorAuthorizationList>(urls.RETURN_VENDOR_AUTHORIZATIONS, {
        queryParams,
        dtoType: ReturnVendorAuthorizationList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/return_vendor_authorizations`
 *
 * Create RVA, `{"return_vendor_authorization": {"purchase_order", "lines": [{"purchase_order_line", "rva_qty"}]}}`;
 * answered `201`.
 */
export function createReturnVendorAuthorization(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnVendorAuthorizationView>> {
    requirePayload(payload);
    return client.sendPostRequest<ReturnVendorAuthorizationView>(urls.RETURN_VENDOR_AUTHORIZATIONS, {
        jsonBody: payload,
        dtoType: ReturnVendorAuthorizationView,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/return_vendor_authorizations/{rva_id}`
 *
 * Get RVA, the `rva_` id or the code.
 */
export function getReturnVendorAuthorization(
    client: ExsitedClient,
    rvaId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnVendorAuthorizationView>> {
    requireValue(rvaId, 'rva_id');
    return client.sendGetRequest<ReturnVendorAuthorizationView>(urls.RETURN_VENDOR_AUTHORIZATION, {
        pathParams: {rva_id: rvaId},
        dtoType: ReturnVendorAuthorizationView,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/return_vendor_authorizations/{rva_id}`
 *
 * Edit RVA header, the `rva_` id or the code, `{"return_vendor_authorization": {...}}` of `rva_date`, `note` and
 * `custom_attributes`.
 */
export function updateReturnVendorAuthorization(
    client: ExsitedClient,
    rvaId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnVendorAuthorizationView>> {
    requireValue(rvaId, 'rva_id');
    requirePayload(payload);
    return client.sendPatchRequest<ReturnVendorAuthorizationView>(urls.RETURN_VENDOR_AUTHORIZATION, {
        pathParams: {rva_id: rvaId},
        jsonBody: payload,
        dtoType: ReturnVendorAuthorizationView,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/return_vendor_authorizations/{rva_id}`
 *
 * Delete draft RVA, the `rva_` id only; a code answers `404`, and anything but a draft `400` `stock_committed`.
 */
export function deleteReturnVendorAuthorization(
    client: ExsitedClient,
    rvaId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rvaId, 'rva_id');
    return client.sendDeleteRequest<never>(urls.RETURN_VENDOR_AUTHORIZATION, {
        pathParams: {rva_id: rvaId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/return_vendor_authorizations/{rva_id}/notes/{note_id}`
 *
 * Delete RVA note, the `rva_` id; no route lists or creates an RVA's notes.
 */
export function deleteReturnVendorAuthorizationNote(
    client: ExsitedClient,
    rvaId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rvaId, 'rva_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.RETURN_VENDOR_AUTHORIZATION_NOTE, {
        pathParams: {rva_id: rvaId, note_id: noteId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/return_vendor_authorizations/{rva_id}/notes/{note_id}/files/{file_id}`
 *
 * Delete RVA note attachment.
 */
export function deleteReturnVendorAuthorizationNoteFile(
    client: ExsitedClient,
    rvaId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rvaId, 'rva_id');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendDeleteRequest<never>(urls.RETURN_VENDOR_AUTHORIZATION_NOTE_FILE, {
        pathParams: {rva_id: rvaId, note_id: noteId, file_id: fileId},
        ...options,
    });
}
