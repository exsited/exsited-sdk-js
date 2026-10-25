/** The note groups endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './noteGroupsUrls.js';
import {NoteGroup, NoteGroupList, NoteGroupNotes} from './noteGroupsDto.js';

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

/** `GET /api/{api_version}/note_groups` */
export function getNoteGroups(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<NoteGroupList>> {
    return client.sendGetRequest<NoteGroupList>(urls.NOTE_GROUPS, {
        queryParams,
        dtoType: NoteGroupList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/note_groups`
 */
export function createNoteGroup(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<NoteGroup>> {
    requirePayload(payload);
    return client.sendPostRequest<NoteGroup>(urls.NOTE_GROUPS, {
        jsonBody: payload,
        dtoType: NoteGroup,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/note_groups/{note_group_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteNoteGroup(
    client: ExsitedClient,
    noteGroupId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(noteGroupId, 'note_group_id');
    return client.sendDeleteRequest<never>(urls.NOTE_GROUP, {
        pathParams: {note_group_id: noteGroupId},
        ...options,
    });
}

/** `GET /api/{api_version}/note_groups/{note_group_id}` */
export function getNoteGroup(
    client: ExsitedClient,
    noteGroupId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<NoteGroup>> {
    requireValue(noteGroupId, 'note_group_id');
    return client.sendGetRequest<NoteGroup>(urls.NOTE_GROUP, {
        pathParams: {note_group_id: noteGroupId},
        queryParams,
        dtoType: NoteGroup,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/note_groups/{note_group_id}`
 */
export function updateNoteGroup(
    client: ExsitedClient,
    noteGroupId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<NoteGroup>> {
    requireValue(noteGroupId, 'note_group_id');
    requirePayload(payload);
    return client.sendPatchRequest<NoteGroup>(urls.NOTE_GROUP, {
        pathParams: {note_group_id: noteGroupId},
        jsonBody: payload,
        dtoType: NoteGroup,
        ...options,
    });
}

/** `GET /api/{api_version}/note_groups/{note_group_id}/notes` */
export function getNoteGroupNotes(
    client: ExsitedClient,
    noteGroupId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<NoteGroupNotes>> {
    requireValue(noteGroupId, 'note_group_id');
    return client.sendGetRequest<NoteGroupNotes>(urls.NOTE_GROUP_NOTES, {
        pathParams: {note_group_id: noteGroupId},
        queryParams,
        dtoType: NoteGroupNotes,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/note_groups/{note_group_id}/notes/user/{note_user}`
 *
 * List a group's notes as one of its users sees them; `note_user` is the note user's uuid or what it was added as: an
 * entity's uuid, or a manual user's email address.
 */
export function getNoteGroupNotesByUser(
    client: ExsitedClient,
    noteGroupId: string,
    noteUser: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(noteGroupId, 'note_group_id');
    requireValue(noteUser, 'note_user');
    return client.sendGetRequest<never>(urls.NOTE_GROUP_NOTES_BY_USER, {
        pathParams: {note_group_id: noteGroupId, note_user: noteUser},
        queryParams,
        ...options,
    });
}
