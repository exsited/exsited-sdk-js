/** The tasks endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './tasksUrls.js';
import {Task, TaskChecklist, TaskChecklistByUuid, TaskList, TaskNoteList, TaskView} from './tasksDto.js';

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

/** `GET /api/{api_version}/tasks` */
export function getTasks(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<TaskList>> {
    return client.sendGetRequest<TaskList>(urls.TASKS, {
        queryParams,
        dtoType: TaskList,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/tasks/{task_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteTask(
    client: ExsitedClient,
    taskId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(taskId, 'task_id');
    return client.sendDeleteRequest<never>(urls.TASK, {
        pathParams: {task_id: taskId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/tasks/{task_id}`
 */
export function getTask(
    client: ExsitedClient,
    taskId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Task>> {
    requireValue(taskId, 'task_id');
    return client.sendGetRequest<Task>(urls.TASK, {
        pathParams: {task_id: taskId},
        queryParams,
        dtoType: Task,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/tasks/{task_id}`
 */
export function updateTask(
    client: ExsitedClient,
    taskId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Task>> {
    requireValue(taskId, 'task_id');
    requirePayload(payload);
    return client.sendPatchRequest<Task>(urls.TASK, {
        pathParams: {task_id: taskId},
        jsonBody: payload,
        dtoType: Task,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/tasks/{task_id}/checklist`
 */
export function getTaskChecklist(
    client: ExsitedClient,
    taskId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<TaskChecklist>> {
    requireValue(taskId, 'task_id');
    return client.sendGetRequest<TaskChecklist>(urls.TASK_CHECKLIST, {
        pathParams: {task_id: taskId},
        queryParams,
        dtoType: TaskChecklist,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/tasks/{task_id}/checklist`
 */
export function createTaskChecklist(
    client: ExsitedClient,
    taskId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Task>> {
    requireValue(taskId, 'task_id');
    requirePayload(payload);
    return client.sendPostRequest<Task>(urls.TASK_CHECKLIST, {
        pathParams: {task_id: taskId},
        jsonBody: payload,
        dtoType: Task,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/tasks/{task_code}/notes`
 */
export function getTaskNotes(
    client: ExsitedClient,
    taskId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<TaskNoteList>> {
    requireValue(taskId, 'task_code');
    return client.sendGetRequest<TaskNoteList>(urls.TASK_NOTES, {
        pathParams: {task_code: taskId},
        queryParams,
        dtoType: TaskNoteList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/tasks/{task_code}/notes`
 *
 * No typed view, so `.dto` is null.
 *
 * Form-encoded, not JSON: the text travels as the `note` form field, and `files` in `options` attaches uploads,
 * sent with the note as one multipart body.
 */
export function createTaskNote(
    client: ExsitedClient,
    taskId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<never>> {
    requireValue(taskId, 'task_code');
    requireNote(note);
    return client.sendPostRequest<never>(urls.TASK_NOTES, {
        pathParams: {task_code: taskId},
        formData: {note},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}`
 */
export function getTaskChecklistByUuid(
    client: ExsitedClient,
    taskId: string,
    taskChecklistUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<TaskChecklistByUuid>> {
    requireValue(taskId, 'task_id');
    requireValue(taskChecklistUuid, 'task_checklist_uuid');
    return client.sendGetRequest<TaskChecklistByUuid>(urls.TASK_CHECKLIST_BY_UUID, {
        pathParams: {task_id: taskId, task_checklist_uuid: taskChecklistUuid},
        queryParams,
        dtoType: TaskChecklistByUuid,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/tasks/{task_code}/notes/{note_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteTaskNote(
    client: ExsitedClient,
    taskId: string,
    taskNoteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(taskId, 'task_code');
    requireValue(taskNoteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.TASK_NOTE, {
        pathParams: {task_code: taskId, note_id: taskNoteId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/tasks`
 *
 * Create task, `{"work_task": {...}}`, `name` required and unknown keys refused; `201` with the task as `getTask` reads
 * it.
 */
export function createTask(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<TaskView>> {
    requirePayload(payload);
    return client.sendPostRequest<TaskView>(urls.TASKS, {
        jsonBody: payload,
        dtoType: TaskView,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}`
 *
 * Edit one checklist item, `{"checklist": {...}}`; the task's id or code, and the whole task back.
 */
export function updateTaskChecklistByUuid(
    client: ExsitedClient,
    taskId: string,
    taskChecklistUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<TaskView>> {
    requireValue(taskId, 'task_id');
    requireValue(taskChecklistUuid, 'task_checklist_uuid');
    requirePayload(payload);
    return client.sendPatchRequest<TaskView>(urls.TASK_CHECKLIST_BY_UUID, {
        pathParams: {task_id: taskId, task_checklist_uuid: taskChecklistUuid},
        jsonBody: payload,
        dtoType: TaskView,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}`
 *
 * Delete one checklist item; `409` once the item is `COMPLETED`.
 */
export function deleteTaskChecklistByUuid(
    client: ExsitedClient,
    taskId: string,
    taskChecklistUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(taskId, 'task_id');
    requireValue(taskChecklistUuid, 'task_checklist_uuid');
    return client.sendDeleteRequest<never>(urls.TASK_CHECKLIST_BY_UUID, {
        pathParams: {task_id: taskId, task_checklist_uuid: taskChecklistUuid},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/tasks/{task_code}/notes/{note_id}`
 *
 * Get one note, by the task's code; a `wt_` id answers `404`.
 */
export function getTaskNote(
    client: ExsitedClient,
    taskCode: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(taskCode, 'task_code');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<never>(urls.TASK_NOTE, {
        pathParams: {task_code: taskCode, note_id: noteId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/tasks/{task_code}/notes/{note_id}`
 *
 * Update a note's text; a form, as the create is, by the task's code.
 */
export function updateTaskNote(
    client: ExsitedClient,
    taskCode: string,
    noteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<never>> {
    requireValue(taskCode, 'task_code');
    requireValue(noteId, 'note_id');
    requireNote(note);
    return client.sendPatchRequest<never>(urls.TASK_NOTE, {
        pathParams: {task_code: taskCode, note_id: noteId},
        formData: {note},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/tasks/{task_code}/notes/{note_id}/files`
 *
 * List a note's attachments, by the task's code.
 */
export function getTaskNoteFiles(
    client: ExsitedClient,
    taskCode: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(taskCode, 'task_code');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<never>(urls.TASK_NOTE_FILES, {
        pathParams: {task_code: taskCode, note_id: noteId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/tasks/{task_code}/notes/{note_id}/files/{file_id}`
 *
 * Get one attachment, the `uuid` the files listing gives; a JSON descriptor under `file`, not the bytes.
 */
export function getTaskNoteFile(
    client: ExsitedClient,
    taskCode: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(taskCode, 'task_code');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendGetRequest<never>(urls.TASK_NOTE_FILE, {
        pathParams: {task_code: taskCode, note_id: noteId, file_id: fileId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/tasks/{task_code}/notes/{note_id}/files/{file_id}`
 *
 * Delete one attachment, by the task's code and the file's `uuid`.
 */
export function deleteTaskNoteFile(
    client: ExsitedClient,
    taskCode: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(taskCode, 'task_code');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendDeleteRequest<never>(urls.TASK_NOTE_FILE, {
        pathParams: {task_code: taskCode, note_id: noteId, file_id: fileId},
        ...options,
    });
}
