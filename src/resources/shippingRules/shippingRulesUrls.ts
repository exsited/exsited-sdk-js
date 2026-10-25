/** Path templates and body keys for the shipping rule endpoints. */

export const SETTINGS_SHIPPING_RULES = '/api/{api_version}/settings/shipping_rules';
export const SETTINGS_SHIPPING_RULE = '/api/{api_version}/settings/shipping_rules/{shipping_rule_id}';
export const SETTINGS_SHIPPING_RULE_CONFIGURATION =
    '/api/{api_version}/settings/shipping_rules/{shipping_rule_id}/configuration';

/** The key a listing's records sit under. */
export const SETTINGS_SHIPPING_RULES_KEY = 'data';

/** The envelope one record arrives under. */
export const SHIPPING_RULE_KEY = 'shipping_rule';

/** The envelope a configuration is sent under. */
export const CONFIGURATION_KEY = 'configuration';
