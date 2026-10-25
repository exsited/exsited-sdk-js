/** The item fulfillments endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './itemFulfillmentsUrls.js';
import {
    ItemFulfillmentList,
    ItemFulfillmentNoteList,
    ItemFulfillmentNoteRead,
    ItemFulfillmentNotes,
    ItemFulfillmentRead,
    ItemFulfillmentUpdated,
    ItemFulfillments,
} from './itemFulfillmentsDto.js';

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

function requireNote(note: unknown): void {
    if (note === undefined || note === null) {
        throw new SdkUsageError(
            'note is required: the note text is the body of this request, and omitting ' +
                'it would be encoded as the string "undefined" and stored as the note',
        );
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
 * `GET /api/{api_version}/item_fulfillments`
 *
 * Recorded status codes: 200.
 */
export function getItemFulfillments(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ItemFulfillmentList>> {
    return client.sendGetRequest<ItemFulfillmentList>(urls.ITEM_FULFILLMENTS, {
        queryParams,
        dtoType: ItemFulfillmentList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/item_fulfillments`
 *
 * Recorded status codes: 201.
 */
export function createItemFulfillment(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ItemFulfillments>> {
    requirePayload(payload);
    return client.sendPostRequest<ItemFulfillments>(urls.ITEM_FULFILLMENTS, {
        jsonBody: payload,
        dtoType: ItemFulfillments,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/item_fulfillments/{fulfillment_id}`
 *
 * Recorded status codes: 200.
 */
export function getItemFulfillment(
    client: ExsitedClient,
    fulfillmentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ItemFulfillmentRead>> {
    requireValue(fulfillmentId, 'fulfillment_id');
    return client.sendGetRequest<ItemFulfillmentRead>(urls.ITEM_FULFILLMENT, {
        pathParams: {fulfillment_id: fulfillmentId},
        queryParams,
        dtoType: ItemFulfillmentRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/item_fulfillments/{fulfillment_id}`
 *
 * Recorded status codes: 200.
 */
export function updateItemFulfillment(
    client: ExsitedClient,
    fulfillmentId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ItemFulfillmentUpdated>> {
    requireValue(fulfillmentId, 'fulfillment_id');
    requirePayload(payload);
    return client.sendPatchRequest<ItemFulfillmentUpdated>(urls.ITEM_FULFILLMENT, {
        pathParams: {fulfillment_id: fulfillmentId},
        jsonBody: payload,
        dtoType: ItemFulfillmentUpdated,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/item_fulfillments/{fulfillment_id}/notes`
 *
 * Recorded status codes: 400.
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function createItemFulfillmentNote(
    client: ExsitedClient,
    fulfillmentId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<ItemFulfillmentNotes>> {
    requireValue(fulfillmentId, 'fulfillment_id');
    requireNote(note);
    return client.sendPostRequest<ItemFulfillmentNotes>(urls.ITEM_FULFILLMENT_NOTES, {
        pathParams: {fulfillment_id: fulfillmentId},
        formData: {note},
        dtoType: ItemFulfillmentNotes,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/item_fulfillments/{fulfillment_id}`
 *
 * Delete fulfillment, by its `ifm_` id; refused `400` `stock_committed` once any of its stock has been sent.
 */
export function deleteItemFulfillment(
    client: ExsitedClient,
    fulfillmentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(fulfillmentId, 'fulfillment_id');
    return client.sendDeleteRequest<never>(urls.ITEM_FULFILLMENT, {
        pathParams: {fulfillment_id: fulfillmentId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/item_fulfillments/{fulfillment_id}/notes`
 *
 * List fulfillment notes; the notes of the fulfillment's sale invoice, which is where `createItemFulfillmentNote` puts
 * them.
 */
export function getItemFulfillmentNotes(
    client: ExsitedClient,
    fulfillmentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ItemFulfillmentNoteList>> {
    requireValue(fulfillmentId, 'fulfillment_id');
    return client.sendGetRequest<ItemFulfillmentNoteList>(urls.ITEM_FULFILLMENT_NOTES, {
        pathParams: {fulfillment_id: fulfillmentId},
        queryParams,
        dtoType: ItemFulfillmentNoteList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/item_fulfillments/{fulfillment_id}/notes/{note_id}`
 *
 * Get one fulfillment note, answered under `item_fulfillment.note`.
 */
export function getItemFulfillmentNote(
    client: ExsitedClient,
    fulfillmentId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ItemFulfillmentNoteRead>> {
    requireValue(fulfillmentId, 'fulfillment_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<ItemFulfillmentNoteRead>(urls.ITEM_FULFILLMENT_NOTE, {
        pathParams: {fulfillment_id: fulfillmentId, note_id: noteId},
        dtoType: ItemFulfillmentNoteRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/item_fulfillments/{fulfillment_id}/notes/{note_id}`
 *
 * Delete fulfillment note, `ifm_` and `note_` ids; it looks on the fulfillment, where the create never puts one.
 */
export function deleteItemFulfillmentNote(
    client: ExsitedClient,
    fulfillmentId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(fulfillmentId, 'fulfillment_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.ITEM_FULFILLMENT_NOTE, {
        pathParams: {fulfillment_id: fulfillmentId, note_id: noteId},
        ...options,
    });
}
