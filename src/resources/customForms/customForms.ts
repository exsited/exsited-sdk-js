/** The custom forms endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './customFormsUrls.js';
import {SettingsCustomForm, SettingsCustomFormList} from './customFormsDto.js';

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
 * `GET /api/{api_version}/settings/custom_forms`
 *
 * List the custom forms.
 */
export function getSettingsCustomForms(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomFormList>> {
    return client.sendGetRequest<SettingsCustomFormList>(urls.SETTINGS_CUSTOM_FORMS, {
        queryParams,
        dtoType: SettingsCustomFormList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/custom_forms`
 *
 * Create a custom form; `name` and `setting_group`, a setting group name such as `ACCOUNT`, are required.
 */
export function createSettingsCustomForm(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomForm>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsCustomForm>(urls.SETTINGS_CUSTOM_FORMS, {
        jsonBody: payload,
        dtoType: SettingsCustomForm,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/custom_forms/{custom_form_id}`
 *
 * Read one custom form by its `cf_` id.
 */
export function getSettingsCustomForm(
    client: ExsitedClient,
    customFormId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomForm>> {
    requireValue(customFormId, 'custom_form_id');
    return client.sendGetRequest<SettingsCustomForm>(urls.SETTINGS_CUSTOM_FORM, {
        pathParams: {custom_form_id: customFormId},
        dtoType: SettingsCustomForm,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/custom_forms/{custom_form_id}`
 *
 * Delete a custom form that is not system generated.
 */
export function deleteSettingsCustomForm(
    client: ExsitedClient,
    customFormId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customFormId, 'custom_form_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_CUSTOM_FORM, {
        pathParams: {custom_form_id: customFormId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/custom_forms/{custom_form_id}`
 *
 * Update a custom form's name, display name, description or users.
 */
export function updateSettingsCustomForm(
    client: ExsitedClient,
    customFormId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomForm>> {
    requireValue(customFormId, 'custom_form_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsCustomForm>(urls.SETTINGS_CUSTOM_FORM, {
        pathParams: {custom_form_id: customFormId},
        jsonBody: payload,
        dtoType: SettingsCustomForm,
        ...options,
    });
}
