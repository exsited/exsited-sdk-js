/** Path templates and body keys for the charging period endpoints. */

export const SETTINGS_CHARGING_PERIODS = '/api/{api_version}/settings/charging_periods';
export const SETTINGS_CHARGING_PERIOD = '/api/{api_version}/settings/charging_periods/{charging_period_id}';

/** The key a listing's records sit under. */
export const SETTINGS_CHARGING_PERIODS_KEY = 'data';

/** The envelope one record arrives under. */
export const CHARGING_PERIOD_KEY = 'charging_period';
