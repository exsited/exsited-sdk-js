/** The rental assets endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './rentalAssetsUrls.js';
import {
    RentalAsset,
    RentalAssetAvailabilityList,
    RentalAssetList,
    RentalAssetProfile,
    RentalAssetProfileList,
} from './rentalAssetsDto.js';

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

/** `GET /api/{api_version}/rental_asset_availability` */
export function getRentalAssetAvailability(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAssetAvailabilityList>> {
    return client.sendGetRequest<RentalAssetAvailabilityList>(urls.RENTAL_ASSET_AVAILABILITY, {
        queryParams,
        dtoType: RentalAssetAvailabilityList,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/rental_asset_availability`
 *
 * No typed view, so `.dto` is null.
 */
export function updateRentalAssetAvailability(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.RENTAL_ASSET_AVAILABILITY, {
        jsonBody: payload,
        ...options,
    });
}

/** `GET /api/{api_version}/rental_asset_profiles` */
export function getRentalAssetProfiles(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAssetProfileList>> {
    return client.sendGetRequest<RentalAssetProfileList>(urls.RENTAL_ASSET_PROFILES, {
        queryParams,
        dtoType: RentalAssetProfileList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/rental_asset_profiles`
 */
export function createRentalAssetProfile(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAssetProfile>> {
    requirePayload(payload);
    return client.sendPostRequest<RentalAssetProfile>(urls.RENTAL_ASSET_PROFILES, {
        jsonBody: payload,
        dtoType: RentalAssetProfile,
        ...options,
    });
}

/** `GET /api/{api_version}/rental_assets` */
export function getRentalAssets(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAssetList>> {
    return client.sendGetRequest<RentalAssetList>(urls.RENTAL_ASSETS, {
        queryParams,
        dtoType: RentalAssetList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/rental_assets`
 */
export function createRentalAsset(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAsset>> {
    requirePayload(payload);
    return client.sendPostRequest<RentalAsset>(urls.RENTAL_ASSETS, {
        jsonBody: payload,
        dtoType: RentalAsset,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/rental_asset_profiles/{rental_asset_profile_id}`
 */
export function getRentalAssetProfile(
    client: ExsitedClient,
    rentalAssetProfileId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAssetProfile>> {
    requireValue(rentalAssetProfileId, 'rental_asset_profile_id');
    return client.sendGetRequest<RentalAssetProfile>(urls.RENTAL_ASSET_PROFILE, {
        pathParams: {rental_asset_profile_id: rentalAssetProfileId},
        queryParams,
        dtoType: RentalAssetProfile,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/rental_asset_profiles/{rental_asset_profile_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function updateRentalAssetProfile(
    client: ExsitedClient,
    rentalAssetProfileId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rentalAssetProfileId, 'rental_asset_profile_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.RENTAL_ASSET_PROFILE, {
        pathParams: {rental_asset_profile_id: rentalAssetProfileId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/rental_asset_profiles/{rental_asset_profile_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteRentalAssetProfile(
    client: ExsitedClient,
    rentalAssetProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rentalAssetProfileId, 'rental_asset_profile_id');
    return client.sendDeleteRequest<never>(urls.RENTAL_ASSET_PROFILE, {
        pathParams: {rental_asset_profile_id: rentalAssetProfileId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/rental_assets/{rental_asset_uuid}`
 */
export function updateRentalAsset(
    client: ExsitedClient,
    rentalAssetUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAsset>> {
    requireValue(rentalAssetUuid, 'rental_asset_uuid');
    requirePayload(payload);
    return client.sendPatchRequest<RentalAsset>(urls.RENTAL_ASSET, {
        pathParams: {rental_asset_uuid: rentalAssetUuid},
        jsonBody: payload,
        dtoType: RentalAsset,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/rental_assets/{rental_asset_uuid}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteRentalAsset(
    client: ExsitedClient,
    rentalAssetUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(rentalAssetUuid, 'rental_asset_uuid');
    return client.sendDeleteRequest<never>(urls.RENTAL_ASSET, {
        pathParams: {rental_asset_uuid: rentalAssetUuid},
        ...options,
    });
}

/** `GET /api/{api_version}/rental_assets/{rental_asset_uuid}` */
export function getRentalAsset(
    client: ExsitedClient,
    rentalAssetUuid: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAsset>> {
    requireValue(rentalAssetUuid, 'rental_asset_uuid');
    return client.sendGetRequest<RentalAsset>(urls.RENTAL_ASSET, {
        pathParams: {rental_asset_uuid: rentalAssetUuid},
        queryParams,
        dtoType: RentalAsset,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/rental_assets/{rental_asset_id}/cancel`
 */
export function cancelRentalAsset(
    client: ExsitedClient,
    rentalAssetId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAsset>> {
    requireValue(rentalAssetId, 'rental_asset_id');
    requirePayload(payload);
    return client.sendPostRequest<RentalAsset>(urls.RENTAL_ASSET_CANCEL, {
        pathParams: {rental_asset_id: rentalAssetId},
        jsonBody: payload,
        dtoType: RentalAsset,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/rental_assets/{rental_asset_id}/reactivate`
 */
export function reactivateRentalAsset(
    client: ExsitedClient,
    rentalAssetId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<RentalAsset>> {
    requireValue(rentalAssetId, 'rental_asset_id');
    requirePayload(payload);
    return client.sendPostRequest<RentalAsset>(urls.RENTAL_ASSET_REACTIVATE, {
        pathParams: {rental_asset_id: rentalAssetId},
        jsonBody: payload,
        dtoType: RentalAsset,
        ...options,
    });
}
