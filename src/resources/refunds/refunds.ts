/** The refunds endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './refundsUrls.js';
import {Refund, RefundList, RefundNote, RefundNoteFile, RefundNoteList, RefundUpdated} from './refundsDto.js';
import {NoteFileList} from '../accounts/accountsDto.js';

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

function requireNote(note: unknown): void {
    if (note === undefined || note === null) {
        throw new SdkUsageError(
            'note is required: the note text is the body of this request, and omitting ' +
                'it would be encoded as the string "undefined" and stored as the note',
        );
    }
}

/**
 * `GET /api/{api_version}/refunds`
 *
 * Recorded status codes: 200.
 */
export function getRefunds(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<RefundList>> {
    return client.sendGetRequest<RefundList>(urls.REFUNDS, {
        queryParams,
        dtoType: RefundList,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/refunds/{refund_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deleteRefund(
    client: ExsitedClient,
    refundId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(refundId, 'refund_id');
    return client.sendDeleteRequest<never>(urls.REFUND, {
        pathParams: {refund_id: refundId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/refunds/{refund_id}`
 *
 * Recorded status codes: 200.
 */
export function getRefund(
    client: ExsitedClient,
    refundId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Refund>> {
    requireValue(refundId, 'refund_id');
    return client.sendGetRequest<Refund>(urls.REFUND, {
        pathParams: {refund_id: refundId},
        queryParams,
        dtoType: Refund,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/refunds/{refund_id}`
 *
 * Recorded status codes: 202.
 */
export function updateRefund(
    client: ExsitedClient,
    refundId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<RefundUpdated>> {
    requireValue(refundId, 'refund_id');
    requirePayload(payload);
    return client.sendPatchRequest<RefundUpdated>(urls.REFUND, {
        pathParams: {refund_id: refundId},
        jsonBody: payload,
        dtoType: RefundUpdated,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/credit_notes/{credit_note_id}/refunds`
 *
 * Recorded status codes: 201.
 */
export function createCreditNoteRefund(
    client: ExsitedClient,
    creditNoteId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<RefundUpdated>> {
    requireValue(creditNoteId, 'credit_note_id');
    requirePayload(payload);
    return client.sendPostRequest<RefundUpdated>(urls.CREDIT_NOTE_REFUNDS, {
        pathParams: {credit_note_id: creditNoteId},
        jsonBody: payload,
        dtoType: RefundUpdated,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/refunds/{refund_id}/notes`
 *
 * List a refund's notes; a paged listing, under `data`.
 */
export function getRefundNotes(
    client: ExsitedClient,
    refundId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<RefundNoteList>> {
    requireValue(refundId, 'refund_id');
    return client.sendGetRequest<RefundNoteList>(urls.REFUND_NOTES, {
        pathParams: {refund_id: refundId},
        queryParams,
        dtoType: RefundNoteList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/refunds/{refund_id}/notes/{note_id}`
 *
 * Retrieve one note, by its `note_` id; under `note`.
 */
export function getRefundNote(
    client: ExsitedClient,
    refundId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<RefundNote>> {
    requireValue(refundId, 'refund_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<RefundNote>(urls.REFUND_NOTE, {
        pathParams: {refund_id: refundId, note_id: noteId},
        dtoType: RefundNote,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/refunds/{refund_id}/notes`
 *
 * Attach a note to a refund; a form, the text as the `note` field, and `201` under `note`.
 */
export function createRefundNote(
    client: ExsitedClient,
    refundId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<RefundNote>> {
    requireValue(refundId, 'refund_id');
    requireNote(note);
    return client.sendPostRequest<RefundNote>(urls.REFUND_NOTES, {
        pathParams: {refund_id: refundId},
        formData: {note},
        dtoType: RefundNote,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/refunds/{refund_id}/notes/{note_id}`
 *
 * Delete one note; `204`. The server checks `CREATE_REFUND_NOTE` here, not a delete permission.
 */
export function deleteRefundNote(
    client: ExsitedClient,
    refundId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(refundId, 'refund_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.REFUND_NOTE, {
        pathParams: {refund_id: refundId, note_id: noteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/refunds/{refund_id}/notes/{note_id}/files`
 *
 * List a note's attachments, under `data`.
 */
export function getRefundNoteFiles(
    client: ExsitedClient,
    refundId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteFileList>> {
    requireValue(refundId, 'refund_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<NoteFileList>(urls.REFUND_NOTE_FILES, {
        pathParams: {refund_id: refundId, note_id: noteId},
        dtoType: NoteFileList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/refunds/{refund_id}/notes/{note_id}/files/{file_id}`
 *
 * Retrieve one attachment, by the attachment's `uuid`; a JSON descriptor under `file`, not the file's bytes.
 */
export function getRefundNoteFile(
    client: ExsitedClient,
    refundId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<RefundNoteFile>> {
    requireValue(refundId, 'refund_id');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendGetRequest<RefundNoteFile>(urls.REFUND_NOTE_FILE, {
        pathParams: {refund_id: refundId, note_id: noteId, file_id: fileId},
        dtoType: RefundNoteFile,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/refunds/{refund_id}/notes/{note_id}/files/{file_id}`
 *
 * Delete one attachment, by the attachment's `uuid`; `204`.
 */
export function deleteRefundNoteFile(
    client: ExsitedClient,
    refundId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(refundId, 'refund_id');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendDeleteRequest<never>(urls.REFUND_NOTE_FILE, {
        pathParams: {refund_id: refundId, note_id: noteId, file_id: fileId},
        ...options,
    });
}
