/** The inventory adjustments endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './inventoryAdjustmentsUrls.js';
import {InventoryAdjustment, InventoryAdjustmentList} from './inventoryAdjustmentsDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/** The key a listing puts its records under. */
export const RECORD_KEY = 'data';

function requireValue(value: unknown, what: string): void {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        throw new SdkUsageError(`${what} is required: the request cannot be built without it`);
    }
}

/** `GET /api/{api_version}/inventory_adjustments` */
export function getInventoryAdjustments(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InventoryAdjustmentList>> {
    return client.sendGetRequest<InventoryAdjustmentList>(urls.INVENTORY_ADJUSTMENTS, {
        queryParams,
        dtoType: InventoryAdjustmentList,
        ...options,
    });
}

/** `GET /api/{api_version}/inventory_adjustments/{inventory_adjustment_id}` */
export function getInventoryAdjustment(
    client: ExsitedClient,
    inventoryAdjustmentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InventoryAdjustment>> {
    requireValue(inventoryAdjustmentId, 'inventory_adjustment_id');
    return client.sendGetRequest<InventoryAdjustment>(urls.INVENTORY_ADJUSTMENT, {
        pathParams: {inventory_adjustment_id: inventoryAdjustmentId},
        queryParams,
        dtoType: InventoryAdjustment,
        ...options,
    });
}
