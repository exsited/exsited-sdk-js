/** The document templates endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './documentTemplatesUrls.js';
import {SettingsDocumentTemplate, SettingsDocumentTemplateList} from './documentTemplatesDto.js';

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
 * `GET /api/{api_version}/settings/document_templates`
 *
 * List the document templates.
 */
export function getSettingsDocumentTemplates(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDocumentTemplateList>> {
    return client.sendGetRequest<SettingsDocumentTemplateList>(urls.SETTINGS_DOCUMENT_TEMPLATES, {
        queryParams,
        dtoType: SettingsDocumentTemplateList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/document_templates`
 *
 * Create a document template; `name` and `document_template_type`, such as `PDF_DOCUMENT`, are required.
 */
export function createSettingsDocumentTemplate(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDocumentTemplate>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsDocumentTemplate>(urls.SETTINGS_DOCUMENT_TEMPLATES, {
        jsonBody: payload,
        dtoType: SettingsDocumentTemplate,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/document_templates/{document_template_id}`
 *
 * Read one document template by its `dt_` id.
 */
export function getSettingsDocumentTemplate(
    client: ExsitedClient,
    documentTemplateId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDocumentTemplate>> {
    requireValue(documentTemplateId, 'document_template_id');
    return client.sendGetRequest<SettingsDocumentTemplate>(urls.SETTINGS_DOCUMENT_TEMPLATE, {
        pathParams: {document_template_id: documentTemplateId},
        dtoType: SettingsDocumentTemplate,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/document_templates/{document_template_id}`
 *
 * Delete a document template.
 */
export function deleteSettingsDocumentTemplate(
    client: ExsitedClient,
    documentTemplateId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(documentTemplateId, 'document_template_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_DOCUMENT_TEMPLATE, {
        pathParams: {document_template_id: documentTemplateId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/document_templates/{document_template_id}`
 *
 * Update a document template's fields or its content.
 */
export function updateSettingsDocumentTemplate(
    client: ExsitedClient,
    documentTemplateId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDocumentTemplate>> {
    requireValue(documentTemplateId, 'document_template_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsDocumentTemplate>(urls.SETTINGS_DOCUMENT_TEMPLATE, {
        pathParams: {document_template_id: documentTemplateId},
        jsonBody: payload,
        dtoType: SettingsDocumentTemplate,
        ...options,
    });
}
