/** The custom attributes endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './customAttributesUrls.js';
import {CustomAttribute, CustomAttributeList, CustomAttributes} from './customAttributesDto.js';

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
 * `GET /api/{api_version}/custom_attributes`
 *
 * Recorded status codes: 200.
 */
export function getCustomAttributes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CustomAttributeList>> {
    return client.sendGetRequest<CustomAttributeList>(urls.CUSTOM_ATTRIBUTES, {
        queryParams,
        dtoType: CustomAttributeList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/custom_attributes`
 *
 * Recorded status codes: 201.
 */
export function createCustomAttribute(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<CustomAttributes>> {
    requirePayload(payload);
    return client.sendPostRequest<CustomAttributes>(urls.CUSTOM_ATTRIBUTES, {
        jsonBody: payload,
        dtoType: CustomAttributes,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/custom_attributes/{custom_attribute_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deleteCustomAttribute(
    client: ExsitedClient,
    customAttributeId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customAttributeId, 'custom_attribute_id');
    return client.sendDeleteRequest<never>(urls.CUSTOM_ATTRIBUTE, {
        pathParams: {custom_attribute_id: customAttributeId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/custom_attributes/{custom_attribute_id}`
 *
 * Recorded status codes: 200.
 */
export function getCustomAttribute(
    client: ExsitedClient,
    customAttributeId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CustomAttribute>> {
    requireValue(customAttributeId, 'custom_attribute_id');
    return client.sendGetRequest<CustomAttribute>(urls.CUSTOM_ATTRIBUTE, {
        pathParams: {custom_attribute_id: customAttributeId},
        queryParams,
        dtoType: CustomAttribute,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/custom_attributes/{custom_attribute_id}`
 */
export function updateCustomAttribute(
    client: ExsitedClient,
    customAttributeId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<CustomAttribute>> {
    requireValue(customAttributeId, 'custom_attribute_id');
    requirePayload(payload);
    return client.sendPatchRequest<CustomAttribute>(urls.CUSTOM_ATTRIBUTE, {
        pathParams: {custom_attribute_id: customAttributeId},
        jsonBody: payload,
        dtoType: CustomAttribute,
        ...options,
    });
}
