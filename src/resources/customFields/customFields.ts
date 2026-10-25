/** The custom fields endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './customFieldsUrls.js';
import {SettingsCustomField, SettingsCustomFieldList} from './customFieldsDto.js';

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

/**
 * `GET /api/{api_version}/settings/custom_fields`
 *
 * List the custom fields.
 */
export function getSettingsCustomFields(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomFieldList>> {
    return client.sendGetRequest<SettingsCustomFieldList>(urls.SETTINGS_CUSTOM_FIELDS, {
        queryParams,
        dtoType: SettingsCustomFieldList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/custom_fields/{custom_field_id}`
 *
 * Read one custom field by its `cfld_` id.
 */
export function getSettingsCustomField(
    client: ExsitedClient,
    customFieldId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomField>> {
    requireValue(customFieldId, 'custom_field_id');
    return client.sendGetRequest<SettingsCustomField>(urls.SETTINGS_CUSTOM_FIELD, {
        pathParams: {custom_field_id: customFieldId},
        dtoType: SettingsCustomField,
        ...options,
    });
}
