/** Path templates and body keys for the rental asset endpoints. */

export const RENTAL_ASSET_AVAILABILITY = '/api/{api_version}/rental_asset_availability';
export const RENTAL_ASSET_PROFILES = '/api/{api_version}/rental_asset_profiles';
export const RENTAL_ASSETS = '/api/{api_version}/rental_assets';
export const RENTAL_ASSET_PROFILE = '/api/{api_version}/rental_asset_profiles/{rental_asset_profile_id}';
export const RENTAL_ASSET = '/api/{api_version}/rental_assets/{rental_asset_uuid}';
export const RENTAL_ASSET_CANCEL = '/api/{api_version}/rental_assets/{rental_asset_id}/cancel';
export const RENTAL_ASSET_REACTIVATE = '/api/{api_version}/rental_assets/{rental_asset_id}/reactivate';

/** The key a listing's records sit under. */
export const RENTAL_ASSETS_KEY = 'data';
export const RENTAL_ASSET_AVAILABILITY_KEY = 'data';
export const RENTAL_ASSET_PROFILES_KEY = 'data';

/** The envelope one record arrives under. */
export const RENTAL_ASSET_KEY = 'rental_asset';
export const RENTAL_ASSET_PROFILE_KEY = 'rental_asset_profile';
