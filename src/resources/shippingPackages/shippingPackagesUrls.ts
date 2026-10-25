/** Path templates and body keys for the shipping package endpoints. */

export const SETTINGS_SHIPPING_PACKAGES = '/api/{api_version}/settings/shipping_packages';
export const SETTINGS_SHIPPING_PACKAGE = '/api/{api_version}/settings/shipping_packages/{shipping_package_id}';

/** The key a listing's records sit under. */
export const SETTINGS_SHIPPING_PACKAGES_KEY = 'data';

/** The envelope one record arrives under. */
export const SHIPPING_PACKAGE_KEY = 'shipping_package';
