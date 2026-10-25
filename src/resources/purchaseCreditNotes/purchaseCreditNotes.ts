/** The purchase credit notes endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './purchaseCreditNotesUrls.js';
import {
    PurchaseCreditNoteCreated,
    PurchaseCreditNoteList,
    PurchaseCreditNoteRead,
    PurchaseCreditNoteUpdated,
} from './purchaseCreditNotesDto.js';

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
 * `GET /api/{api_version}/purchase_credit_notes`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseCreditNotes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteList>> {
    return client.sendGetRequest<PurchaseCreditNoteList>(urls.PURCHASE_CREDIT_NOTES, {
        queryParams,
        dtoType: PurchaseCreditNoteList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseCreditNote(
    client: ExsitedClient,
    purchaseCreditNoteId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteRead>> {
    requireValue(purchaseCreditNoteId, 'purchase_credit_note_id');
    return client.sendGetRequest<PurchaseCreditNoteRead>(urls.PURCHASE_CREDIT_NOTE, {
        pathParams: {purchase_credit_note_id: purchaseCreditNoteId},
        queryParams,
        dtoType: PurchaseCreditNoteRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_credit_notes`
 *
 * Credit a purchase invoice, as `{"purchase_credit_note": {purchase_invoice_id, amount}}`; `201`, drawn from its
 * payments.
 */
export function createPurchaseCreditNote(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteCreated>> {
    requirePayload(payload);
    return client.sendPostRequest<PurchaseCreditNoteCreated>(urls.PURCHASE_CREDIT_NOTES, {
        jsonBody: payload,
        dtoType: PurchaseCreditNoteCreated,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}`
 */
export function updatePurchaseCreditNote(
    client: ExsitedClient,
    purchaseCreditNoteId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteUpdated>> {
    requireValue(purchaseCreditNoteId, 'purchase_credit_note_id');
    requirePayload(payload);
    return client.sendPatchRequest<PurchaseCreditNoteUpdated>(urls.PURCHASE_CREDIT_NOTE, {
        pathParams: {purchase_credit_note_id: purchaseCreditNoteId},
        jsonBody: payload,
        dtoType: PurchaseCreditNoteUpdated,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}`
 *
 * Delete a purchase credit note, by its `pcn_` id only; `204`.
 */
export function deletePurchaseCreditNote(
    client: ExsitedClient,
    purchaseCreditNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseCreditNoteId, 'purchase_credit_note_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_CREDIT_NOTE, {
        pathParams: {purchase_credit_note_id: purchaseCreditNoteId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/apply`
 *
 * Apply credit to purchase invoices, under `purchase_credit_note.purchase_invoices`; it records a purchase payment.
 */
export function applyPurchaseCreditNote(
    client: ExsitedClient,
    purchaseCreditNoteId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteCreated>> {
    requireValue(purchaseCreditNoteId, 'purchase_credit_note_id');
    requirePayload(payload);
    return client.sendPostRequest<PurchaseCreditNoteCreated>(urls.PURCHASE_CREDIT_NOTE_APPLY, {
        pathParams: {purchase_credit_note_id: purchaseCreditNoteId},
        jsonBody: payload,
        dtoType: PurchaseCreditNoteCreated,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/notes`
 *
 * Attach a note; a form, the text as the `note` field, and `201`.
 */
export function createPurchaseCreditNoteNote(
    client: ExsitedClient,
    purchaseCreditNoteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseCreditNoteId, 'purchase_credit_note_id');
    requireNote(note);
    return client.sendPostRequest<never>(urls.PURCHASE_CREDIT_NOTE_NOTES, {
        pathParams: {purchase_credit_note_id: purchaseCreditNoteId},
        formData: {note},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/notes/{note_id}`
 *
 * Delete one note, by the `pcn_` and `note_` ids; `204`.
 */
export function deletePurchaseCreditNoteNote(
    client: ExsitedClient,
    purchaseCreditNoteId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(purchaseCreditNoteId, 'purchase_credit_note_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.PURCHASE_CREDIT_NOTE_NOTE, {
        pathParams: {purchase_credit_note_id: purchaseCreditNoteId, note_id: noteId},
        ...options,
    });
}
