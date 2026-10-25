/** The integration connections endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './integrationConnectionsUrls.js';
import {IntegrationConnections} from './integrationConnectionsDto.js';

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

/**
 * `GET /api/{api_version}/integration_connections`
 *
 * Filter by status with `filter_status` (`filterParam('status')`): ACTIVE, INACTIVE or DISCONNECTED. A plain
 * `status` is ignored by v4.
 */
export function getIntegrationConnections(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<IntegrationConnections>> {
    return client.sendGetRequest<IntegrationConnections>(urls.INTEGRATION_CONNECTIONS, {
        queryParams,
        dtoType: IntegrationConnections,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/integration_connections/{integration_connection_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function getIntegrationConnection(
    client: ExsitedClient,
    integrationConnectionId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(integrationConnectionId, 'integration_connection_id');
    return client.sendGetRequest<never>(urls.INTEGRATION_CONNECTION, {
        pathParams: {integration_connection_id: integrationConnectionId},
        queryParams,
        ...options,
    });
}
