/** The note attachments endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './noteAttachmentsUrls.js';
import {NoteAttachment} from './noteAttachmentsDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

function requireValue(value: unknown, what: string): void {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        throw new SdkUsageError(`${what} is required: the request cannot be built without it`);
    }
}

/**
 * `GET /api/{api_version}/note_attachment/{attachment_uuid}`
 *
 * Any note's attachment as base64, the `uuid` a note's `attachments` entry carries, whatever the note is attached to.
 */
export function getNoteAttachment(
    client: ExsitedClient,
    attachmentUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteAttachment>> {
    requireValue(attachmentUuid, 'attachment_uuid');
    return client.sendGetRequest<NoteAttachment>(urls.NOTE_ATTACHMENT, {
        pathParams: {attachment_uuid: attachmentUuid},
        dtoType: NoteAttachment,
        ...options,
    });
}
