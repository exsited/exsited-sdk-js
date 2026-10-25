/** Typed views over the v4 inventory adjustments bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The inventory adjustment body. */
export class InventoryAdjustment extends Dto {
    static override ENVELOPE_KEY = 'inventory_adjustment';

    static override FIELDS = {
        adjustmentAmount: 'string',
        adjustmentType: 'string',
        createdBy: 'any',
        createdOn: 'string',
        href: 'string',
        id: 'string',
        itemId: 'string',
        itemName: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        quantityAvailable: 'string',
        quantityOnHand: 'string',
        quantityOnOrder: 'string',
        quantityOnPurchaseReturn: 'string',
        quantityOnReserve: 'string',
        quantityOnReturn: 'string',
        quantityPromised: 'string',
        reference: 'string',
        status: 'string',
        warehouseName: 'string',
    } as const;

    adjustmentAmount = this.declared<string | null>('adjustmentAmount');
    adjustmentType = this.declared<string | null>('adjustmentType');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    itemId = this.declared<string | null>('itemId');
    itemName = this.declared<string | null>('itemName');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    quantityAvailable = this.declared<string | null>('quantityAvailable');
    quantityOnHand = this.declared<string | null>('quantityOnHand');
    quantityOnOrder = this.declared<string | null>('quantityOnOrder');
    quantityOnPurchaseReturn = this.declared<string | null>('quantityOnPurchaseReturn');
    quantityOnReserve = this.declared<string | null>('quantityOnReserve');
    quantityOnReturn = this.declared<string | null>('quantityOnReturn');
    quantityPromised = this.declared<string | null>('quantityPromised');
    reference = this.declared<string | null>('reference');
    status = this.declared<string | null>('status');
    warehouseName = this.declared<string | null>('warehouseName');
}

/** A page of InventoryAdjustment records. */
export class InventoryAdjustmentList extends Dto {
    static override FIELDS = {
        data: dtoList(InventoryAdjustment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<InventoryAdjustment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    InventoryAdjustment: [
        'GET /api/{api_version}/inventory_adjustments',
        'GET /api/{api_version}/inventory_adjustments/{inventory_adjustment_id}',
        'GET /api/{api_version}/items/{item_id}/inventory_adjustments',
    ],
    InventoryAdjustmentList: [
        'GET /api/{api_version}/inventory_adjustments',
        'GET /api/{api_version}/items/{item_id}/inventory_adjustments',
    ],
};

sealDtoSchema(InventoryAdjustment, InventoryAdjustmentList);
