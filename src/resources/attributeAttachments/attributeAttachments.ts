/** The attribute attachments endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './attributeAttachmentsUrls.js';

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
 * `GET /api/{api_version}/attribute_attachment/{file_uuid}`
 *
 * A custom attribute's file as base64, the uuid an account's file attribute links to; answered as `{"base64":...}` with
 * no envelope.
 */
export function getAttributeAttachment(
    client: ExsitedClient,
    fileUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(fileUuid, 'file_uuid');
    return client.sendGetRequest<never>(urls.ATTRIBUTE_ATTACHMENT, {
        pathParams: {file_uuid: fileUuid},
        ...options,
    });
}
