/** The custom features endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './customFeaturesUrls.js';
import {CustomFeature, CustomFeatureList} from './customFeaturesDto.js';

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
 * `GET /api/{api_version}/custom_feature`
 *
 * List custom features, cursor paged, the active ones only.
 */
export function getCustomFeatures(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CustomFeatureList>> {
    return client.sendGetRequest<CustomFeatureList>(urls.CUSTOM_FEATURE, {
        queryParams,
        dtoType: CustomFeatureList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/custom_feature/{custom_feature_id}`
 *
 * Retrieve custom feature, the `cmp_` id, under `custom_feature`; a deleted one is `404`.
 */
export function getCustomFeatureById(
    client: ExsitedClient,
    customFeatureId: string,
    options: CallOptions = {},
): Promise<ApiResponse<CustomFeature>> {
    requireValue(customFeatureId, 'custom_feature_id');
    return client.sendGetRequest<CustomFeature>(urls.CUSTOM_FEATURE_BY_ID, {
        pathParams: {custom_feature_id: customFeatureId},
        dtoType: CustomFeature,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/custom_feature`
 *
 * Recorded status codes: 201.
 */
export function createCustomFeature(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<CustomFeature>> {
    requirePayload(payload);
    return client.sendPostRequest<CustomFeature>(urls.CUSTOM_FEATURE, {
        jsonBody: payload,
        dtoType: CustomFeature,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/custom_feature/{custom_feature_id}`
 *
 * Delete custom feature, the `cmp_` id; answered `204`.
 */
export function deleteCustomFeatureById(
    client: ExsitedClient,
    customFeatureId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customFeatureId, 'custom_feature_id');
    return client.sendDeleteRequest<never>(urls.CUSTOM_FEATURE_BY_ID, {
        pathParams: {custom_feature_id: customFeatureId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/component/{custom_feature_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deleteComponentById(
    client: ExsitedClient,
    customFeatureId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customFeatureId, 'custom_feature_id');
    return client.sendDeleteRequest<never>(urls.COMPONENT_BY_ID, {
        pathParams: {custom_feature_id: customFeatureId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/custom_feature/{custom_feature_id}`
 *
 * Recorded status codes: 202.
 */
export function updateCustomFeatureById(
    client: ExsitedClient,
    customFeatureId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<CustomFeature>> {
    requireValue(customFeatureId, 'custom_feature_id');
    requirePayload(payload);
    return client.sendPatchRequest<CustomFeature>(urls.CUSTOM_FEATURE_BY_ID, {
        pathParams: {custom_feature_id: customFeatureId},
        jsonBody: payload,
        dtoType: CustomFeature,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/custom_feature/{custom_feature_id}`
 *
 * Recorded status codes: 201.
 */
export function createCustomFeatureById(
    client: ExsitedClient,
    customFeatureId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<CustomFeature>> {
    requireValue(customFeatureId, 'custom_feature_id');
    requirePayload(payload);
    return client.sendPostRequest<CustomFeature>(urls.CUSTOM_FEATURE_BY_ID, {
        pathParams: {custom_feature_id: customFeatureId},
        jsonBody: payload,
        dtoType: CustomFeature,
        ...options,
    });
}
