/** The countries endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './countriesUrls.js';
import {SettingsCountry, SettingsCountryList} from './countriesDto.js';

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
 * `GET /api/{api_version}/settings/countries`
 *
 * List the countries.
 */
export function getSettingsCountries(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCountryList>> {
    return client.sendGetRequest<SettingsCountryList>(urls.SETTINGS_COUNTRIES, {
        queryParams,
        dtoType: SettingsCountryList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/countries/{country_id}`
 *
 * Read one country by its `country_` id.
 */
export function getSettingsCountry(
    client: ExsitedClient,
    countryId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCountry>> {
    requireValue(countryId, 'country_id');
    return client.sendGetRequest<SettingsCountry>(urls.SETTINGS_COUNTRY, {
        pathParams: {country_id: countryId},
        dtoType: SettingsCountry,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/countries/{country_id}`
 *
 * Update a country's status, description or `default_*` fields; the answer is the country as it was before the write.
 */
export function updateSettingsCountry(
    client: ExsitedClient,
    countryId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCountry>> {
    requireValue(countryId, 'country_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsCountry>(urls.SETTINGS_COUNTRY, {
        pathParams: {country_id: countryId},
        jsonBody: payload,
        dtoType: SettingsCountry,
        ...options,
    });
}
