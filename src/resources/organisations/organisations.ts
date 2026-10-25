/** The organisations endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './organisationsUrls.js';

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

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/**
 * `GET /api/{api_version}/settings/organisations`
 *
 * List the child organisations; the root is never among them.
 */
export function getSettingsOrganisations(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendGetRequest<never>(urls.SETTINGS_ORGANISATIONS, {
        queryParams,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/organisations`
 *
 * Create a child organisation; the envelope is `organization`, with a z.
 */
export function createSettingsOrganisation(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_ORGANISATIONS, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/organisations/{organisation_id}`
 *
 * Get one organisation.
 */
export function getSettingsOrganisation(
    client: ExsitedClient,
    organisationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(organisationId, 'organisation_id');
    return client.sendGetRequest<never>(urls.SETTINGS_ORGANISATION, {
        pathParams: {organisation_id: organisationId},
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/organisations/{organisation_id}`
 *
 * Delete an organisation.
 */
export function deleteSettingsOrganisation(
    client: ExsitedClient,
    organisationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(organisationId, 'organisation_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_ORGANISATION, {
        pathParams: {organisation_id: organisationId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/organisations/{organisation_id}`
 *
 * Update an organisation.
 */
export function updateSettingsOrganisation(
    client: ExsitedClient,
    organisationId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(organisationId, 'organisation_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_ORGANISATION, {
        pathParams: {organisation_id: organisationId},
        jsonBody: payload,
        ...options,
    });
}
