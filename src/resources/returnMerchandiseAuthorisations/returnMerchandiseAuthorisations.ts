/** The return merchandise authorisations endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './returnMerchandiseAuthorisationsUrls.js';
import {
    InvoiceReturnMerchandiseAuthorisationReceive,
    InvoiceReturnMerchandiseAuthorisationReceiveList,
    ReturnMerchandiseAuthorisationList,
    ReturnMerchandiseAuthorisationRead,
    ReturnMerchandiseAuthorisations,
} from './returnMerchandiseAuthorisationsDto.js';

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
 * `GET /api/{api_version}/return_merchandise_authorisations`
 *
 * Recorded status codes: 200.
 */
export function getReturnMerchandiseAuthorisations(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnMerchandiseAuthorisationList>> {
    return client.sendGetRequest<ReturnMerchandiseAuthorisationList>(urls.RETURN_MERCHANDISE_AUTHORISATIONS, {
        queryParams,
        dtoType: ReturnMerchandiseAuthorisationList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/return_merchandise_authorisations`
 *
 * Recorded status codes: 201.
 */
export function createReturnMerchandiseAuthorisation(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnMerchandiseAuthorisations>> {
    requirePayload(payload);
    return client.sendPostRequest<ReturnMerchandiseAuthorisations>(urls.RETURN_MERCHANDISE_AUTHORISATIONS, {
        jsonBody: payload,
        dtoType: ReturnMerchandiseAuthorisations,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/return_merchandise_authorisations/{rma_id}`
 *
 * Recorded status codes: 200.
 */
export function getReturnMerchandiseAuthorisation(
    client: ExsitedClient,
    rmaId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnMerchandiseAuthorisationRead>> {
    requireValue(rmaId, 'rma_id');
    return client.sendGetRequest<ReturnMerchandiseAuthorisationRead>(urls.RETURN_MERCHANDISE_AUTHORISATION, {
        pathParams: {rma_id: rmaId},
        queryParams,
        dtoType: ReturnMerchandiseAuthorisationRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive`
 *
 * Recorded status codes: 200.
 */
export function getInvoiceReturnMerchandiseAuthorisationReceive(
    client: ExsitedClient,
    invoiceId: string,
    rmaId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceReturnMerchandiseAuthorisationReceiveList>> {
    requireValue(invoiceId, 'invoice_id');
    requireValue(rmaId, 'rma_code');
    return client.sendGetRequest<InvoiceReturnMerchandiseAuthorisationReceiveList>(
        urls.INVOICE_RETURN_MERCHANDISE_AUTHORISATION_RECEIVE,
        {
            pathParams: {invoice_id: invoiceId, rma_code: rmaId},
            queryParams,
            dtoType: InvoiceReturnMerchandiseAuthorisationReceiveList,
            ...options,
        },
    );
}

/**
 * `GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive/{receive_uuid}`
 *
 * Recorded status codes: 200.
 */
export function getInvoiceReturnMerchandiseAuthorisationReceiveByUuid(
    client: ExsitedClient,
    invoiceId: string,
    rmaId: string,
    receiveUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceReturnMerchandiseAuthorisationReceive>> {
    requireValue(invoiceId, 'invoice_id');
    requireValue(rmaId, 'rma_code');
    requireValue(receiveUuid, 'receive_uuid');
    return client.sendGetRequest<InvoiceReturnMerchandiseAuthorisationReceive>(
        urls.INVOICE_RETURN_MERCHANDISE_AUTHORISATION_RECEIVE_BY_UUID,
        {
            pathParams: {invoice_id: invoiceId, rma_code: rmaId, receive_uuid: receiveUuid},
            queryParams,
            dtoType: InvoiceReturnMerchandiseAuthorisationReceive,
            ...options,
        },
    );
}

/**
 * `PATCH /api/{api_version}/return_merchandise_authorisations/{rma_id}`
 *
 * Update RMA, the `rma_` id and `{"return_merchandise_authorisation": {...}}` of `rma_date`, `note` and `returns`.
 */
export function updateReturnMerchandiseAuthorisation(
    client: ExsitedClient,
    rmaId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnMerchandiseAuthorisationRead>> {
    requireValue(rmaId, 'rma_id');
    requirePayload(payload);
    return client.sendPatchRequest<ReturnMerchandiseAuthorisationRead>(urls.RETURN_MERCHANDISE_AUTHORISATION, {
        pathParams: {rma_id: rmaId},
        jsonBody: payload,
        dtoType: ReturnMerchandiseAuthorisationRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/return_merchandise_authorisations/{rma_id}`
 *
 * Delete RMA, the `rma_` id; only a draft is deleted, anything else is refused `400` `stock_committed`.
 */
export function deleteReturnMerchandiseAuthorisation(
    client: ExsitedClient,
    rmaId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rmaId, 'rma_id');
    return client.sendDeleteRequest<never>(urls.RETURN_MERCHANDISE_AUTHORISATION, {
        pathParams: {rma_id: rmaId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/return_merchandise_authorisations/{rma_id}/approve`
 *
 * Approve RMA, no body; `422` when the RMA holds no pending approval.
 */
export function approveReturnMerchandiseAuthorisation(
    client: ExsitedClient,
    rmaId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnMerchandiseAuthorisationRead>> {
    requireValue(rmaId, 'rma_id');
    return client.sendPostRequest<ReturnMerchandiseAuthorisationRead>(urls.RETURN_MERCHANDISE_AUTHORISATION_APPROVE, {
        pathParams: {rma_id: rmaId},
        dtoType: ReturnMerchandiseAuthorisationRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/return_merchandise_authorisations/{rma_id}/reject`
 *
 * Reject RMA, no body; `422` when the RMA holds no pending approval.
 */
export function rejectReturnMerchandiseAuthorisation(
    client: ExsitedClient,
    rmaId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnMerchandiseAuthorisationRead>> {
    requireValue(rmaId, 'rma_id');
    return client.sendPostRequest<ReturnMerchandiseAuthorisationRead>(urls.RETURN_MERCHANDISE_AUTHORISATION_REJECT, {
        pathParams: {rma_id: rmaId},
        dtoType: ReturnMerchandiseAuthorisationRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/return_merchandise_authorisations/{rma_id}/receive`
 *
 * Receive returned stock, `{"return_merchandise_authorisation": {"receive_returns": [{"uuid",
 * "rma_receive_quantity"}]}}`.
 */
export function receiveReturnMerchandiseAuthorisation(
    client: ExsitedClient,
    rmaId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnMerchandiseAuthorisationRead>> {
    requireValue(rmaId, 'rma_id');
    requirePayload(payload);
    return client.sendPostRequest<ReturnMerchandiseAuthorisationRead>(urls.RETURN_MERCHANDISE_AUTHORISATION_RECEIVE, {
        pathParams: {rma_id: rmaId},
        jsonBody: payload,
        dtoType: ReturnMerchandiseAuthorisationRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/return_merchandise_authorisations/{rma_code}/receive`
 *
 * List an RMA's receipts, by the RMA's code; an `rma_` id answers `404`.
 */
export function getReturnMerchandiseAuthorisationReceive(
    client: ExsitedClient,
    rmaCode: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceReturnMerchandiseAuthorisationReceiveList>> {
    requireValue(rmaCode, 'rma_code');
    return client.sendGetRequest<InvoiceReturnMerchandiseAuthorisationReceiveList>(
        urls.RETURN_MERCHANDISE_AUTHORISATION_RECEIVE_BY_CODE,
        {
            pathParams: {rma_code: rmaCode},
            queryParams,
            dtoType: InvoiceReturnMerchandiseAuthorisationReceiveList,
            ...options,
        },
    );
}

/**
 * `GET /api/{api_version}/return_merchandise_authorisations/{rma_code}/receive/{receive_uuid}`
 *
 * Get one RMA receipt, the `rrma_` id or the receipt's code, under `receive_rma`.
 */
export function getReturnMerchandiseAuthorisationReceiveByUuid(
    client: ExsitedClient,
    rmaCode: string,
    receiveUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceReturnMerchandiseAuthorisationReceive>> {
    requireValue(rmaCode, 'rma_code');
    requireValue(receiveUuid, 'receive_uuid');
    return client.sendGetRequest<InvoiceReturnMerchandiseAuthorisationReceive>(
        urls.RETURN_MERCHANDISE_AUTHORISATION_RECEIVE_BY_UUID,
        {
            pathParams: {rma_code: rmaCode, receive_uuid: receiveUuid},
            dtoType: InvoiceReturnMerchandiseAuthorisationReceive,
            ...options,
        },
    );
}

/**
 * `POST /api/{api_version}/return_merchandise_authorisations/{rma_id}/notes`
 *
 * Add RMA note, the `rma_` id and a JSON `{"note": {"note": "..."}}`, not a form; no attachment.
 */
export function createReturnMerchandiseAuthorisationNote(
    client: ExsitedClient,
    rmaId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rmaId, 'rma_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.RETURN_MERCHANDISE_AUTHORISATION_NOTES, {
        pathParams: {rma_id: rmaId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/return_merchandise_authorisations/{rma_code}/notes`
 *
 * List RMA notes, by the RMA's code; an `rma_` id answers `404`.
 */
export function getReturnMerchandiseAuthorisationNotes(
    client: ExsitedClient,
    rmaCode: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rmaCode, 'rma_code');
    return client.sendGetRequest<never>(urls.RETURN_MERCHANDISE_AUTHORISATION_NOTES_BY_CODE, {
        pathParams: {rma_code: rmaCode},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}`
 *
 * Get one RMA note, by the RMA's code.
 */
export function getReturnMerchandiseAuthorisationNote(
    client: ExsitedClient,
    rmaCode: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rmaCode, 'rma_code');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<never>(urls.RETURN_MERCHANDISE_AUTHORISATION_NOTE_BY_CODE, {
        pathParams: {rma_code: rmaCode, note_id: noteId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/return_merchandise_authorisations/{rma_id}/notes/{note_id}`
 *
 * Delete RMA note, the `rma_` id; a code answers `404`.
 */
export function deleteReturnMerchandiseAuthorisationNote(
    client: ExsitedClient,
    rmaId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rmaId, 'rma_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.RETURN_MERCHANDISE_AUTHORISATION_NOTE, {
        pathParams: {rma_id: rmaId, note_id: noteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}/files`
 *
 * List an RMA note's attachments, by the code.
 */
export function getReturnMerchandiseAuthorisationNoteFiles(
    client: ExsitedClient,
    rmaCode: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rmaCode, 'rma_code');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<never>(urls.RETURN_MERCHANDISE_AUTHORISATION_NOTE_FILES_BY_CODE, {
        pathParams: {rma_code: rmaCode, note_id: noteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}/files/{file_id}`
 *
 * Get one RMA note attachment.
 */
export function getReturnMerchandiseAuthorisationNoteFile(
    client: ExsitedClient,
    rmaCode: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rmaCode, 'rma_code');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendGetRequest<never>(urls.RETURN_MERCHANDISE_AUTHORISATION_NOTE_FILE_BY_CODE, {
        pathParams: {rma_code: rmaCode, note_id: noteId, file_id: fileId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/return_merchandise_authorisations/{rma_id}/notes/{note_id}/files/{file_id}`
 *
 * Delete an RMA note attachment.
 */
export function deleteReturnMerchandiseAuthorisationNoteFile(
    client: ExsitedClient,
    rmaId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rmaId, 'rma_id');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendDeleteRequest<never>(urls.RETURN_MERCHANDISE_AUTHORISATION_NOTE_FILE, {
        pathParams: {rma_id: rmaId, note_id: noteId, file_id: fileId},
        ...options,
    });
}
