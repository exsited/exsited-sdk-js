/** Path templates and body keys for the external database endpoints. */

export const EXTERNAL_DATABASES = '/api/{api_version}/external_databases';
export const EXTERNAL_DATABASE = '/api/{api_version}/external_databases/{db_name}';
export const EXTERNAL_DATABASE_INSERT_RECORDS = '/api/{api_version}/external_databases/{db_name}/insert_records';
export const EXTERNAL_DATABASE_SEARCH = '/api/{api_version}/external_databases/{db_name}/search';
export const EXTERNAL_DATABASE_UPDATE_RECORDS = '/api/{api_version}/external_databases/{db_name}/update_records';
export const EXTERNAL_DATABASE_TABLE = '/api/{api_version}/external_databases/{db_name}/tables/{table_name}';

/** The key a listing's records sit under. */
export const EXTERNAL_DATABASES_KEY = 'data';
export const EXTERNAL_DATABASE_KEY = 'data';
export const EXTERNAL_DATABASE_TABLE_KEY = 'data';
