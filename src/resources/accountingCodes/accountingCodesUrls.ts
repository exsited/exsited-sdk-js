/** Path templates and body keys for the accounting code endpoints. */

export const SETTINGS_ACCOUNTING_CODES = '/api/{api_version}/settings/accounting_codes';
export const SETTINGS_ACCOUNTING_CODE = '/api/{api_version}/settings/accounting_codes/{accounting_code_id}';

/** The key a listing's records sit under. */
export const SETTINGS_ACCOUNTING_CODES_KEY = 'data';

/** The envelope one record arrives under. */
export const ACCOUNTING_CODE_KEY = 'accounting_code';
