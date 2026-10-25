/** The credit notes endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './creditNotesUrls.js';
import {
    CreditNoteApplications,
    CreditNoteItems,
    CreditNoteList,
    CreditNoteNote,
    CreditNoteNoteList,
    CreditNoteRead,
    CreditNoteUpdated,
} from './creditNotesDto.js';

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
 * `GET /api/{api_version}/credit_notes`
 *
 * Recorded status codes: 200.
 */
export function getCreditNotes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteList>> {
    return client.sendGetRequest<CreditNoteList>(urls.CREDIT_NOTES, {
        queryParams,
        dtoType: CreditNoteList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/credit_notes/{credit_note_id}`
 *
 * Recorded status codes: 200.
 */
export function getCreditNote(
    client: ExsitedClient,
    creditNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteRead>> {
    requireValue(creditNoteId, 'credit_note_id');
    return client.sendGetRequest<CreditNoteRead>(urls.CREDIT_NOTE, {
        pathParams: {credit_note_id: creditNoteId},
        queryParams,
        dtoType: CreditNoteRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/credit_notes`
 *
 * Credit an invoice, `{"credit_note": {invoice_id, amount}}`; `201`. The amount is drawn from the invoice's active
 * payments, oldest first.
 */
export function createCreditNote(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.CREDIT_NOTES, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/credit_notes/{credit_note_id}`
 */
export function updateCreditNote(
    client: ExsitedClient,
    creditNoteId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteUpdated>> {
    requireValue(creditNoteId, 'credit_note_id');
    requirePayload(payload);
    return client.sendPatchRequest<CreditNoteUpdated>(urls.CREDIT_NOTE, {
        pathParams: {credit_note_id: creditNoteId},
        jsonBody: payload,
        dtoType: CreditNoteUpdated,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/credit_notes/{credit_note_id}`
 *
 * Delete a credit note, by `cn_` id or code; `204`. A credit note with an active refund is refused `400` `in_use`.
 */
export function deleteCreditNote(
    client: ExsitedClient,
    creditNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(creditNoteId, 'credit_note_id');
    return client.sendDeleteRequest<never>(urls.CREDIT_NOTE, {
        pathParams: {credit_note_id: creditNoteId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/credit_notes/{credit_note_id}/apply`
 *
 * Apply a credit note to invoices, under `credit_note.invoices`; it records a payment against each, and answers the
 * credit note.
 */
export function applyCreditNote(
    client: ExsitedClient,
    creditNoteId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(creditNoteId, 'credit_note_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.CREDIT_NOTE_APPLY, {
        pathParams: {credit_note_id: creditNoteId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/credit_notes/{credit_note_id}/items`
 *
 * A credit note's balance rows, under `credit_note.items`; not a paged listing.
 */
export function getCreditNoteItems(
    client: ExsitedClient,
    creditNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteItems>> {
    requireValue(creditNoteId, 'credit_note_id');
    return client.sendGetRequest<CreditNoteItems>(urls.CREDIT_NOTE_ITEMS, {
        pathParams: {credit_note_id: creditNoteId},
        dtoType: CreditNoteItems,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/credit_notes/{credit_note_id}/credit_note_applications`
 *
 * A credit note's applications, under `credit_note.applications`; not a paged listing.
 */
export function getCreditNoteCreditNoteApplications(
    client: ExsitedClient,
    creditNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteApplications>> {
    requireValue(creditNoteId, 'credit_note_id');
    return client.sendGetRequest<CreditNoteApplications>(urls.CREDIT_NOTE_CREDIT_NOTE_APPLICATIONS, {
        pathParams: {credit_note_id: creditNoteId},
        dtoType: CreditNoteApplications,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/credit_notes/{credit_note_id}/notes`
 *
 * List a credit note's notes; a paged listing, under `data`.
 */
export function getCreditNoteNotes(
    client: ExsitedClient,
    creditNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteNoteList>> {
    requireValue(creditNoteId, 'credit_note_id');
    return client.sendGetRequest<CreditNoteNoteList>(urls.CREDIT_NOTE_NOTES, {
        pathParams: {credit_note_id: creditNoteId},
        queryParams,
        dtoType: CreditNoteNoteList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}`
 *
 * Retrieve one note, by its `note_` id; under `note`.
 */
export function getCreditNoteNote(
    client: ExsitedClient,
    creditNoteId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteNote>> {
    requireValue(creditNoteId, 'credit_note_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<CreditNoteNote>(urls.CREDIT_NOTE_NOTE, {
        pathParams: {credit_note_id: creditNoteId, note_id: noteId},
        dtoType: CreditNoteNote,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/credit_notes/{credit_note_id}/notes`
 *
 * Attach a note to a credit note; a form, the text as the `note` field, and `201`.
 */
export function createCreditNoteNote(
    client: ExsitedClient,
    creditNoteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<never>> {
    requireValue(creditNoteId, 'credit_note_id');
    requireNote(note);
    return client.sendPostRequest<never>(urls.CREDIT_NOTE_NOTES, {
        pathParams: {credit_note_id: creditNoteId},
        formData: {note},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}`
 *
 * Delete one note, by its `note_` id; `204`.
 */
export function deleteCreditNoteNote(
    client: ExsitedClient,
    creditNoteId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(creditNoteId, 'credit_note_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.CREDIT_NOTE_NOTE, {
        pathParams: {credit_note_id: creditNoteId, note_id: noteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}/files`
 *
 * List a note's attachments, under `data`.
 */
export function getCreditNoteNoteFiles(
    client: ExsitedClient,
    creditNoteId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(creditNoteId, 'credit_note_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<never>(urls.CREDIT_NOTE_NOTE_FILES, {
        pathParams: {credit_note_id: creditNoteId, note_id: noteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}/files/{file_id}`
 *
 * Retrieve one attachment; a JSON descriptor under `file`, not the file's bytes.
 */
export function getCreditNoteNoteFile(
    client: ExsitedClient,
    creditNoteId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(creditNoteId, 'credit_note_id');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendGetRequest<never>(urls.CREDIT_NOTE_NOTE_FILE, {
        pathParams: {credit_note_id: creditNoteId, note_id: noteId, file_id: fileId},
        ...options,
    });
}
