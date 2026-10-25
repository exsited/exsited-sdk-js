/** The custom components endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {dtoMapOf, isDtoMapping, sealDtoSchema} from '../../dto.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './customComponentsUrls.js';
import {
    Component,
    ComponentByUuid,
    ComponentList,
    ComponentObject,
    ComponentObjectActivity,
    ComponentObjectActivityEntry,
    ComponentObjectCustomObjects,
    ComponentObjectNote,
    ComponentObjectNoteFile,
    ComponentObjectNoteFiles,
    ComponentObjectNotes,
    ComponentObjectRecord,
    ComponentObjects,
} from './customComponentsDto.js';

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

const INSTANCE_VIEWS = new Map<string, typeof ComponentByUuid>();

/** The instance view under the one key the payload names, which the answer is keyed by too. */
function instanceView(payload: unknown): typeof ComponentByUuid {
    let body: unknown = dtoMapOf(payload);
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch {
            return ComponentByUuid;
        }
    }
    if (!isDtoMapping(body)) return ComponentByUuid;
    const keys = Object.keys(body);
    if (keys.length !== 1) return ComponentByUuid;
    const name = keys[0] as string;
    const cached = INSTANCE_VIEWS.get(name);
    if (cached !== undefined) return cached;
    const view = class extends ComponentByUuid {
        static override ENVELOPE_KEY = name;
    };
    Object.defineProperty(view, 'name', {value: ComponentByUuid.name});
    sealDtoSchema(view);
    INSTANCE_VIEWS.set(name, view);
    return view;
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
 * `GET /api/{api_version}/component`
 *
 * Recorded status codes: 200.
 */
export function getComponent(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentList>> {
    return client.sendGetRequest<ComponentList>(urls.COMPONENT, {
        queryParams,
        dtoType: ComponentList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/component/{component_uuid}`
 *
 * Recorded status codes: 200.
 */
export function getComponentByUuid(
    client: ExsitedClient,
    componentUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Component>> {
    requireValue(componentUuid, 'component_uuid');
    return client.sendGetRequest<Component>(urls.COMPONENT_BY_UUID, {
        pathParams: {component_uuid: componentUuid},
        queryParams,
        dtoType: Component,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/component/{component_uuid}`
 *
 * Recorded status codes: 201. Answered under the component's own name, the key the payload is written under.
 */
export function createComponentByUuid(
    client: ExsitedClient,
    componentUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentByUuid>> {
    requireValue(componentUuid, 'component_uuid');
    requirePayload(payload);
    return client.sendPostRequest<ComponentByUuid>(urls.COMPONENT_BY_UUID, {
        pathParams: {component_uuid: componentUuid},
        jsonBody: payload,
        dtoType: instanceView(payload),
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/component/{component_uuid}/{component_object_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deleteComponentById(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendDeleteRequest<never>(urls.COMPONENT_BY_ID, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/component/{component_uuid}/{component_object_id}`
 *
 * Recorded status codes: 202.
 */
export function updateComponentById(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentByUuid>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requirePayload(payload);
    return client.sendPatchRequest<ComponentByUuid>(urls.COMPONENT_BY_ID, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        jsonBody: payload,
        dtoType: instanceView(payload),
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects`
 *
 * Recorded status codes: 200.
 */
export function getComponentObjects(
    client: ExsitedClient,
    componentUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjects>> {
    requireValue(componentUuid, 'component_uuid');
    return client.sendGetRequest<ComponentObjects>(urls.COMPONENT_OBJECTS, {
        pathParams: {component_uuid: componentUuid},
        queryParams,
        dtoType: ComponentObjects,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}`
 *
 * Recorded status codes: 200.
 */
export function getComponentObject(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObject>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<ComponentObject>(urls.COMPONENT_OBJECT, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        queryParams,
        dtoType: ComponentObject,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity`
 *
 * Recorded status codes: 200.
 */
export function getComponentObjectActivity(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectActivity>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<ComponentObjectActivity>(urls.COMPONENT_OBJECT_ACTIVITY, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        queryParams,
        dtoType: ComponentObjectActivity,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects`
 *
 * Recorded status codes: 200.
 */
export function getComponentObjectCustomObjects(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectCustomObjects>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<ComponentObjectCustomObjects>(urls.COMPONENT_OBJECT_CUSTOM_OBJECTS, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        queryParams,
        dtoType: ComponentObjectCustomObjects,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/pdf`
 *
 * Recorded status codes: 200.
 *
 * No typed view, so `.dto` is null.
 */
export function getComponentObjectPdf(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<never>(urls.COMPONENT_OBJECT_PDF, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        queryParams,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/component`
 *
 * Create a component definition, under `component`; `name` is required, and `use_in` asks for `relation` beside it.
 */
export function createComponent(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Component>> {
    requirePayload(payload);
    return client.sendPostRequest<Component>(urls.COMPONENT, {
        jsonBody: payload,
        dtoType: Component,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/component/{component_uuid}`
 *
 * Update a component definition, the `cmp_` id, under `component`.
 */
export function updateComponent(
    client: ExsitedClient,
    componentUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Component>> {
    requireValue(componentUuid, 'component_uuid');
    requirePayload(payload);
    return client.sendPatchRequest<Component>(urls.COMPONENT_BY_UUID, {
        pathParams: {component_uuid: componentUuid},
        jsonBody: payload,
        dtoType: Component,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/components/{component_uuid}/objects`
 *
 * Create an instance on v4, under `custom_component_object`; every key is optional, and `parents` names the owner.
 */
export function createComponentObject(
    client: ExsitedClient,
    componentUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectRecord>> {
    requireValue(componentUuid, 'component_uuid');
    requirePayload(payload);
    return client.sendPostRequest<ComponentObjectRecord>(urls.COMPONENT_OBJECTS, {
        pathParams: {component_uuid: componentUuid},
        jsonBody: payload,
        dtoType: ComponentObjectRecord,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/components/{component_uuid}/objects/{component_object_id}`
 *
 * Update an instance on v4; `version_id` must match when sent, and `code`, `parents` and `custom_form` are refused.
 */
export function updateComponentObject(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectRecord>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requirePayload(payload);
    return client.sendPatchRequest<ComponentObjectRecord>(urls.COMPONENT_OBJECT, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        jsonBody: payload,
        dtoType: ComponentObjectRecord,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/components/{component_uuid}/objects/{component_object_id}`
 *
 * Delete an instance on v4; answered `204`.
 */
export function deleteComponentObject(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendDeleteRequest<never>(urls.COMPONENT_OBJECT, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity`
 *
 * Log an activity, under `custom_component_object_activity` with `type`, `message` and `user_name`.
 */
export function createComponentObjectActivity(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectActivityEntry>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requirePayload(payload);
    return client.sendPostRequest<ComponentObjectActivityEntry>(urls.COMPONENT_OBJECT_ACTIVITY, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        jsonBody: payload,
        dtoType: ComponentObjectActivityEntry,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity/{activity_id}`
 *
 * One activity.
 */
export function getComponentObjectActivityById(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    activityId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectActivityEntry>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(activityId, 'activity_id');
    return client.sendGetRequest<ComponentObjectActivityEntry>(urls.COMPONENT_OBJECT_ACTIVITY_ENTRY, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId, activity_id: activityId},
        dtoType: ComponentObjectActivityEntry,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/milestones`
 *
 * List workflow milestones; no typed view, so `.dto` is null.
 */
export function getComponentObjectMilestones(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<never>(urls.COMPONENT_OBJECT_MILESTONES, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/milestones/{milestone_id}`
 *
 * One workflow milestone, the `wfm_` id.
 */
export function getComponentObjectMilestone(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    milestoneId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(milestoneId, 'milestone_id');
    return client.sendGetRequest<never>(urls.COMPONENT_OBJECT_MILESTONE, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId, milestone_id: milestoneId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/history`
 *
 * List workflow history; no typed view, so `.dto` is null.
 */
export function getComponentObjectHistory(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<never>(urls.COMPONENT_OBJECT_HISTORY, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/history/{history_id}`
 *
 * One workflow history entry, the `wfh_` id.
 */
export function getComponentObjectHistoryById(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    historyId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(historyId, 'history_id');
    return client.sendGetRequest<never>(urls.COMPONENT_OBJECT_HISTORY_ENTRY, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId, history_id: historyId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes`
 *
 * List notes.
 */
export function getComponentObjectNotes(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectNotes>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    return client.sendGetRequest<ComponentObjectNotes>(urls.COMPONENT_OBJECT_NOTES, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        queryParams,
        dtoType: ComponentObjectNotes,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}`
 *
 * One note.
 */
export function getComponentObjectNote(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectNote>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<ComponentObjectNote>(urls.COMPONENT_OBJECT_NOTE, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId, note_id: noteId},
        dtoType: ComponentObjectNote,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files`
 *
 * List a note's files.
 */
export function getComponentObjectNoteFiles(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectNoteFiles>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(noteId, 'note_id');
    return client.sendGetRequest<ComponentObjectNoteFiles>(urls.COMPONENT_OBJECT_NOTE_FILES, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId, note_id: noteId},
        dtoType: ComponentObjectNoteFiles,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files/{file_id}`
 *
 * One file of a note `/notes/{note_id}/files/{file_id}`, the attachment's `uuid`.
 */
export function getComponentObjectNoteFile(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectNoteFile>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendGetRequest<ComponentObjectNoteFile>(urls.COMPONENT_OBJECT_NOTE_FILE, {
        pathParams: {
            component_uuid: componentUuid,
            component_object_id: componentObjectId,
            note_id: noteId,
            file_id: fileId,
        },
        dtoType: ComponentObjectNoteFile,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes`
 *
 * Attach a note; a form, the text as the `note` field with any `files` beside it.
 */
export function createComponentObjectNote(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<ComponentObjectNote>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireNote(note);
    return client.sendPostRequest<ComponentObjectNote>(urls.COMPONENT_OBJECT_NOTES, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        formData: {note},
        dtoType: ComponentObjectNote,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}`
 *
 * Update a note; a form, as the create is.
 */
export function updateComponentObjectNote(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    noteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<ComponentObjectNote>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(noteId, 'note_id');
    requireNote(note);
    return client.sendPatchRequest<ComponentObjectNote>(urls.COMPONENT_OBJECT_NOTE, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId, note_id: noteId},
        formData: {note},
        dtoType: ComponentObjectNote,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}`
 *
 * Delete a note; answered `204`.
 */
export function deleteComponentObjectNote(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(noteId, 'note_id');
    return client.sendDeleteRequest<never>(urls.COMPONENT_OBJECT_NOTE, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId, note_id: noteId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files/{file_id}`
 *
 * Delete a note's file `/notes/{note_id}/files/{file_id}`, the attachment's `uuid`; answered `204`.
 */
export function deleteComponentObjectNoteFile(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(noteId, 'note_id');
    requireValue(fileId, 'file_id');
    return client.sendDeleteRequest<never>(urls.COMPONENT_OBJECT_NOTE_FILE, {
        pathParams: {
            component_uuid: componentUuid,
            component_object_id: componentObjectId,
            note_id: noteId,
            file_id: fileId,
        },
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}`
 *
 * One custom object schema with its instances `/{component_object_id}/custom_objects/{custom_object_id}`.
 */
export function getComponentObjectCustomObject(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(customObjectId, 'custom_object_id');
    return client.sendGetRequest<never>(urls.COMPONENT_OBJECT_CUSTOM_OBJECT, {
        pathParams: {
            component_uuid: componentUuid,
            component_object_id: componentObjectId,
            custom_object_id: customObjectId,
        },
        ...options,
    });
}

/**
 * `POST /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}`
 *
 * Create a custom object instance `/{component_object_id}/custom_objects/{custom_object_id}`, under
 * `custom_object_instances` with an `attributes` list; the path has no `instances` segment.
 */
export function createComponentObjectCustomObjectInstance(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    customObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(customObjectId, 'custom_object_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.COMPONENT_OBJECT_CUSTOM_OBJECT, {
        pathParams: {
            component_uuid: componentUuid,
            component_object_id: componentObjectId,
            custom_object_id: customObjectId,
        },
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}`
 *
 * One custom object instance `/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}`.
 */
export function getComponentObjectCustomObjectInstance(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    customObjectId: string,
    instanceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(customObjectId, 'custom_object_id');
    requireValue(instanceId, 'instance_id');
    return client.sendGetRequest<never>(urls.COMPONENT_OBJECT_CUSTOM_OBJECT_INSTANCE, {
        pathParams: {
            component_uuid: componentUuid,
            component_object_id: componentObjectId,
            custom_object_id: customObjectId,
            instance_id: instanceId,
        },
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}`
 *
 * Update a custom object instance `/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}`,
 * under `custom_object_instance` with an `attributes` list.
 */
export function updateComponentObjectCustomObjectInstance(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    customObjectId: string,
    instanceId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(customObjectId, 'custom_object_id');
    requireValue(instanceId, 'instance_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.COMPONENT_OBJECT_CUSTOM_OBJECT_INSTANCE, {
        pathParams: {
            component_uuid: componentUuid,
            component_object_id: componentObjectId,
            custom_object_id: customObjectId,
            instance_id: instanceId,
        },
        jsonBody: payload,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}`
 *
 * Delete a custom object instance `/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}`.
 */
export function deleteComponentObjectCustomObjectInstance(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    customObjectId: string,
    instanceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requireValue(customObjectId, 'custom_object_id');
    requireValue(instanceId, 'instance_id');
    return client.sendDeleteRequest<never>(urls.COMPONENT_OBJECT_CUSTOM_OBJECT_INSTANCE, {
        pathParams: {
            component_uuid: componentUuid,
            component_object_id: componentObjectId,
            custom_object_id: customObjectId,
            instance_id: instanceId,
        },
        ...options,
    });
}

/**
 * `POST /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/link_domains`
 *
 * Link accounts or orders, under `custom_component_object` with `domain_type` and `domains[].domain_id`.
 */
export function linkComponentObjectDomains(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectRecord>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requirePayload(payload);
    return client.sendPostRequest<ComponentObjectRecord>(urls.COMPONENT_OBJECT_LINK_DOMAINS, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        jsonBody: payload,
        dtoType: ComponentObjectRecord,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/link_domains`
 *
 * Replace the linked accounts or orders; a domain left out of `domains` is unlinked.
 */
export function updateComponentObjectDomains(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectRecord>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requirePayload(payload);
    return client.sendPatchRequest<ComponentObjectRecord>(urls.COMPONENT_OBJECT_LINK_DOMAINS, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        jsonBody: payload,
        dtoType: ComponentObjectRecord,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/unlink_domains`
 *
 * Unlink accounts or orders; a domain that is not linked is refused.
 */
export function unlinkComponentObjectDomains(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectRecord>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requirePayload(payload);
    return client.sendPostRequest<ComponentObjectRecord>(urls.COMPONENT_OBJECT_UNLINK_DOMAINS, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        jsonBody: payload,
        dtoType: ComponentObjectRecord,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/change_status`
 *
 * Move an instance through its workflow, under `custom_component_object` with `workflow_status`; runs the transition at
 * once.
 */
export function changeComponentObjectStatus(
    client: ExsitedClient,
    componentUuid: string,
    componentObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjectRecord>> {
    requireValue(componentUuid, 'component_uuid');
    requireValue(componentObjectId, 'component_object_id');
    requirePayload(payload);
    return client.sendPostRequest<ComponentObjectRecord>(urls.COMPONENT_OBJECT_CHANGE_STATUS, {
        pathParams: {component_uuid: componentUuid, component_object_id: componentObjectId},
        jsonBody: payload,
        dtoType: ComponentObjectRecord,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/component/{component_uuid}`
 *
 * Recorded status codes: 204. The same request as `customFeatures.deleteComponentById`.
 *
 * No typed view, so `.dto` is null.
 */
export function deleteComponent(
    client: ExsitedClient,
    componentUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(componentUuid, 'component_uuid');
    return client.sendDeleteRequest<never>(urls.COMPONENT_BY_UUID, {
        pathParams: {component_uuid: componentUuid},
        ...options,
    });
}
