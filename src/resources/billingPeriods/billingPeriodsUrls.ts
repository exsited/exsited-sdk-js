/** Path templates and body keys for the billing period endpoints. */

export const SETTINGS_BILLING_PERIODS = '/api/{api_version}/settings/billing_periods';
export const SETTINGS_BILLING_PERIOD = '/api/{api_version}/settings/billing_periods/{billing_period_id}';

/** The key a listing's records sit under. */
export const SETTINGS_BILLING_PERIODS_KEY = 'data';

/** The envelope one record arrives under. */
export const BILLING_PERIOD_KEY = 'billing_period';
