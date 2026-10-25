/** The email templates endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './emailTemplatesUrls.js';
import {SettingsEmailTemplate, SettingsEmailTemplateList} from './emailTemplatesDto.js';

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
 * `GET /api/{api_version}/settings/email_templates`
 *
 * List the email templates shared across the instance.
 */
export function getSettingsEmailTemplates(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsEmailTemplateList>> {
    return client.sendGetRequest<SettingsEmailTemplateList>(urls.SETTINGS_EMAIL_TEMPLATES, {
        queryParams,
        dtoType: SettingsEmailTemplateList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/email_templates`
 *
 * Create an email template; `name` is required, and `cc` and `bcc` are lists of addresses.
 */
export function createSettingsEmailTemplate(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsEmailTemplate>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsEmailTemplate>(urls.SETTINGS_EMAIL_TEMPLATES, {
        jsonBody: payload,
        dtoType: SettingsEmailTemplate,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/email_templates/{email_template_id}`
 *
 * Read one email template by its `et_` id.
 */
export function getSettingsEmailTemplate(
    client: ExsitedClient,
    emailTemplateId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsEmailTemplate>> {
    requireValue(emailTemplateId, 'email_template_id');
    return client.sendGetRequest<SettingsEmailTemplate>(urls.SETTINGS_EMAIL_TEMPLATE, {
        pathParams: {email_template_id: emailTemplateId},
        dtoType: SettingsEmailTemplate,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/email_templates/{email_template_id}`
 *
 * Delete an email template.
 */
export function deleteSettingsEmailTemplate(
    client: ExsitedClient,
    emailTemplateId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(emailTemplateId, 'email_template_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_EMAIL_TEMPLATE, {
        pathParams: {email_template_id: emailTemplateId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/email_templates/{email_template_id}`
 *
 * Update an email template's fields or its content.
 */
export function updateSettingsEmailTemplate(
    client: ExsitedClient,
    emailTemplateId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsEmailTemplate>> {
    requireValue(emailTemplateId, 'email_template_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsEmailTemplate>(urls.SETTINGS_EMAIL_TEMPLATE, {
        pathParams: {email_template_id: emailTemplateId},
        jsonBody: payload,
        dtoType: SettingsEmailTemplate,
        ...options,
    });
}
