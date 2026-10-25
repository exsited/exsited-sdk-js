/** The external databases endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './externalDatabasesUrls.js';
import {
    ExternalDatabase,
    ExternalDatabaseInsertRecord,
    ExternalDatabaseSearch,
    ExternalDatabaseUpdateRecordsUpdated,
    ExternalDatabases,
} from './externalDatabasesDto.js';

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

/** `GET /api/{api_version}/external_databases` */
export function getExternalDatabases(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ExternalDatabases>> {
    return client.sendGetRequest<ExternalDatabases>(urls.EXTERNAL_DATABASES, {
        queryParams,
        dtoType: ExternalDatabases,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/external_databases`
 */
export function createExternalDatabase(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ExternalDatabase>> {
    requirePayload(payload);
    return client.sendPostRequest<ExternalDatabase>(urls.EXTERNAL_DATABASES, {
        jsonBody: payload,
        dtoType: ExternalDatabase,
        ...options,
    });
}

/** `GET /api/{api_version}/external_databases/{db_name}` */
export function getExternalDatabase(
    client: ExsitedClient,
    dbName: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ExternalDatabases>> {
    requireValue(dbName, 'db_name');
    return client.sendGetRequest<ExternalDatabases>(urls.EXTERNAL_DATABASE, {
        pathParams: {db_name: dbName},
        queryParams,
        dtoType: ExternalDatabases,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/external_databases/{db_name}/insert_records`
 */
export function createExternalDatabaseInsertRecord(
    client: ExsitedClient,
    dbName: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ExternalDatabaseInsertRecord>> {
    requireValue(dbName, 'db_name');
    requirePayload(payload);
    return client.sendPostRequest<ExternalDatabaseInsertRecord>(urls.EXTERNAL_DATABASE_INSERT_RECORDS, {
        pathParams: {db_name: dbName},
        jsonBody: payload,
        dtoType: ExternalDatabaseInsertRecord,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/external_databases/{db_name}/search`
 */
export function createExternalDatabaseSearch(
    client: ExsitedClient,
    dbName: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ExternalDatabaseSearch>> {
    requireValue(dbName, 'db_name');
    requirePayload(payload);
    return client.sendPostRequest<ExternalDatabaseSearch>(urls.EXTERNAL_DATABASE_SEARCH, {
        pathParams: {db_name: dbName},
        jsonBody: payload,
        dtoType: ExternalDatabaseSearch,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/external_databases/{db_name}/update_records`
 */
export function updateExternalDatabaseUpdateRecords(
    client: ExsitedClient,
    dbName: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<ExternalDatabaseUpdateRecordsUpdated>> {
    requireValue(dbName, 'db_name');
    requirePayload(payload);
    return client.sendPatchRequest<ExternalDatabaseUpdateRecordsUpdated>(urls.EXTERNAL_DATABASE_UPDATE_RECORDS, {
        pathParams: {db_name: dbName},
        jsonBody: payload,
        dtoType: ExternalDatabaseUpdateRecordsUpdated,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/external_databases/{db_name}/tables/{table_name}`
 */
export function getExternalDatabaseTable(
    client: ExsitedClient,
    dbName: string,
    tableName: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ExternalDatabases>> {
    requireValue(dbName, 'db_name');
    requireValue(tableName, 'table_name');
    return client.sendGetRequest<ExternalDatabases>(urls.EXTERNAL_DATABASE_TABLE, {
        pathParams: {db_name: dbName, table_name: tableName},
        queryParams,
        dtoType: ExternalDatabases,
        ...options,
    });
}
