/** The shipping packages endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './shippingPackagesUrls.js';
import {SettingsShippingPackage, SettingsShippingPackageList} from './shippingPackagesDto.js';

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
 * `GET /api/{api_version}/settings/shipping_packages`
 *
 * List shipping packages.
 */
export function getSettingsShippingPackages(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingPackageList>> {
    return client.sendGetRequest<SettingsShippingPackageList>(urls.SETTINGS_SHIPPING_PACKAGES, {
        queryParams,
        dtoType: SettingsShippingPackageList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/shipping_packages`
 *
 * Create a shipping package; a `*_uom` is the unit's bare uuid, not its prefixed id.
 */
export function createSettingsShippingPackage(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingPackage>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsShippingPackage>(urls.SETTINGS_SHIPPING_PACKAGES, {
        jsonBody: payload,
        dtoType: SettingsShippingPackage,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/shipping_packages/{shipping_package_id}`
 *
 * Get one shipping package.
 */
export function getSettingsShippingPackage(
    client: ExsitedClient,
    shippingPackageId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingPackage>> {
    requireValue(shippingPackageId, 'shipping_package_id');
    return client.sendGetRequest<SettingsShippingPackage>(urls.SETTINGS_SHIPPING_PACKAGE, {
        pathParams: {shipping_package_id: shippingPackageId},
        dtoType: SettingsShippingPackage,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/shipping_packages/{shipping_package_id}`
 *
 * Delete a shipping package.
 */
export function deleteSettingsShippingPackage(
    client: ExsitedClient,
    shippingPackageId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(shippingPackageId, 'shipping_package_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_SHIPPING_PACKAGE, {
        pathParams: {shipping_package_id: shippingPackageId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/shipping_packages/{shipping_package_id}`
 *
 * Update a shipping package.
 */
export function updateSettingsShippingPackage(
    client: ExsitedClient,
    shippingPackageId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingPackage>> {
    requireValue(shippingPackageId, 'shipping_package_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsShippingPackage>(urls.SETTINGS_SHIPPING_PACKAGE, {
        pathParams: {shipping_package_id: shippingPackageId},
        jsonBody: payload,
        dtoType: SettingsShippingPackage,
        ...options,
    });
}
