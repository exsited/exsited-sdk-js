/** Path templates and body keys for the inventory adjustment endpoints. */

export const INVENTORY_ADJUSTMENTS = '/api/{api_version}/inventory_adjustments';
export const INVENTORY_ADJUSTMENT = '/api/{api_version}/inventory_adjustments/{inventory_adjustment_id}';

/** The key a listing's records sit under. */
export const INVENTORY_ADJUSTMENTS_KEY = 'data';

/** The envelope one record arrives under. */
export const INVENTORY_ADJUSTMENT_KEY = 'inventory_adjustment';
