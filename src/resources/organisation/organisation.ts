/** The organisation endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import * as urls from './organisationUrls.js';
import {SettingsOrganisation} from './organisationDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/**
 * `GET /api/{api_version}/settings/organisation`
 *
 * Get the root organisation; read only, a PATCH here answers 405.
 */
export function getSettingsOrganisation(
    client: ExsitedClient,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsOrganisation>> {
    return client.sendGetRequest<SettingsOrganisation>(urls.SETTINGS_ORGANISATION, {
        dtoType: SettingsOrganisation,
        ...options,
    });
}
