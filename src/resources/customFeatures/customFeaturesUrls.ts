/** Path templates and body keys for the custom feature endpoints. */

export const CUSTOM_FEATURE = '/api/{api_version}/custom_feature';
export const COMPONENT_BY_ID = '/api/{api_version}/component/{custom_feature_id}';
export const CUSTOM_FEATURE_BY_ID = '/api/{api_version}/custom_feature/{custom_feature_id}';

/** The envelope one record arrives under. */
export const COMPONENT_KEY = 'component';
export const CUSTOM_FEATURE_KEY = 'custom_feature';

/** The key the listing's records sit under. */
export const CUSTOM_FEATURE_LIST_KEY = 'data';
