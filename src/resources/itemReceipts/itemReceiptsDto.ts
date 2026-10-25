/** Typed views over the v4 item receipts bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `purchase_order` block of {@link ItemReceipt}. */
export class ItemReceiptPurchaseOrder extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        code: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
}

/** The `purchase_order_line` block of {@link ItemReceiptLine}. */
export class ItemReceiptLinePurchaseOrderLine extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
}

/** The `item` block of {@link ItemReceiptLine}. */
export class ItemReceiptLineItem extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        code: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
}

/** The `uom` block of {@link ItemReceiptLine}. */
export class ItemReceiptLineUom extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
}

/** The `warehouse` block of {@link ItemReceiptLine}. */
export class ItemReceiptLineWarehouse extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
}

/** One entry of `lines` on {@link ItemReceipt}. */
export class ItemReceiptLine extends Dto {
    static override FIELDS = {
        purchaseOrderLine: ItemReceiptLinePurchaseOrderLine,
        item: ItemReceiptLineItem,
        uom: ItemReceiptLineUom,
        warehouse: ItemReceiptLineWarehouse,
        receiptQuantity: 'float',
        receivedQuantity: 'float',
        pendingReturnQuantity: 'float',
        returnedQuantity: 'float',
    } as const;

    purchaseOrderLine = this.declared<ItemReceiptLinePurchaseOrderLine | null>('purchaseOrderLine');
    item = this.declared<ItemReceiptLineItem | null>('item');
    uom = this.declared<ItemReceiptLineUom | null>('uom');
    warehouse = this.declared<ItemReceiptLineWarehouse | null>('warehouse');
    receiptQuantity = this.declared<number | null>('receiptQuantity');
    receivedQuantity = this.declared<number | null>('receivedQuantity');
    pendingReturnQuantity = this.declared<number | null>('pendingReturnQuantity');
    returnedQuantity = this.declared<number | null>('returnedQuantity');
}

/** The `created_by` block of {@link ItemReceipt}. */
export class ItemReceiptCreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link ItemReceipt}. */
export class ItemReceiptLastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The item receipt body. */
export class ItemReceipt extends Dto {
    static override ENVELOPE_KEY = 'item_receipt';

    static override FIELDS = {
        code: 'string',
        createdBy: ItemReceiptCreatedBy,
        createdOn: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: ItemReceiptLastUpdatedBy,
        lastUpdatedOn: 'string',
        lines: dtoList(ItemReceiptLine),
        object: 'string',
        purchaseOrder: ItemReceiptPurchaseOrder,
        receiptDate: 'string',
        receiptNote: 'string',
        receiptStatus: 'string',
        receiveCompleted: 'boolean',
        status: 'string',
        trackingNumber: 'string',
        version: 'int',
    } as const;

    code = this.declared<string | null>('code');
    createdBy = this.declared<ItemReceiptCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<ItemReceiptLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<Array<ItemReceiptLine | null> | null>('lines');
    object = this.declared<string | null>('object');
    purchaseOrder = this.declared<ItemReceiptPurchaseOrder | null>('purchaseOrder');
    receiptDate = this.declared<string | null>('receiptDate');
    receiptNote = this.declared<string | null>('receiptNote');
    receiptStatus = this.declared<string | null>('receiptStatus');
    receiveCompleted = this.declared<boolean | null>('receiveCompleted');
    status = this.declared<string | null>('status');
    trackingNumber = this.declared<string | null>('trackingNumber');
    version = this.declared<number | null>('version');
}

/** A page of ItemReceipt records. */
export class ItemReceiptList extends Dto {
    static override FIELDS = {
        data: dtoList(ItemReceipt),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ItemReceipt | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The item receipts body. */
export class ItemReceipts extends Dto {
    static override ENVELOPE_KEY = 'item-receipt';

    static override FIELDS = {
        activityLogs: 'any',
        createdBy: 'string',
        createdOn: 'string',
        date: 'string',
        id: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        note: 'string',
        purchaseOrderId: 'string',
        receiptStatus: 'string',
        receipts: 'any',
        trackingNumber: 'string',
        uuid: 'string',
        version: 'string',
    } as const;

    activityLogs = this.declared<unknown>('activityLogs');
    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    date = this.declared<string | null>('date');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    note = this.declared<string | null>('note');
    purchaseOrderId = this.declared<string | null>('purchaseOrderId');
    receiptStatus = this.declared<string | null>('receiptStatus');
    receipts = this.declared<unknown>('receipts');
    trackingNumber = this.declared<string | null>('trackingNumber');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<string | null>('version');
}

/** The `purchase_order` block of {@link ItemReceiptUpdated}. */
export class PurchaseOrder extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        code: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
}

/** The `purchase_order_line` block of {@link Line}. */
export class PurchaseOrderLine extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
}

/** The `item` block of {@link Line}. */
export class Item extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        code: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
}

/** The `uom` block of {@link Line}. */
export class Uom extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
}

/** The `warehouse` block of {@link Line}. */
export class Warehouse extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
}

/** One entry of `lines` on {@link ItemReceiptUpdated}. */
export class Line extends Dto {
    static override FIELDS = {
        purchaseOrderLine: PurchaseOrderLine,
        item: Item,
        uom: Uom,
        warehouse: Warehouse,
        receiptQuantity: 'float',
        receivedQuantity: 'float',
        pendingReturnQuantity: 'float',
        returnedQuantity: 'float',
    } as const;

    purchaseOrderLine = this.declared<PurchaseOrderLine | null>('purchaseOrderLine');
    item = this.declared<Item | null>('item');
    uom = this.declared<Uom | null>('uom');
    warehouse = this.declared<Warehouse | null>('warehouse');
    receiptQuantity = this.declared<number | null>('receiptQuantity');
    receivedQuantity = this.declared<number | null>('receivedQuantity');
    pendingReturnQuantity = this.declared<number | null>('pendingReturnQuantity');
    returnedQuantity = this.declared<number | null>('returnedQuantity');
}

/** The `created_by` block of {@link ItemReceiptUpdated}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link ItemReceiptUpdated}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The item receipt updated body. */
export class ItemReceiptUpdated extends Dto {
    static override ENVELOPE_KEY = 'item_receipt';

    static override FIELDS = {
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        date: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        lines: dtoList(Line),
        note: 'string',
        object: 'string',
        purchaseOrder: PurchaseOrder,
        purchaseOrderId: 'string',
        receiptDate: 'string',
        receiptNote: 'any',
        receiptStatus: 'string',
        receipts: 'any',
        receiveCompleted: 'boolean',
        status: 'string',
        trackingNumber: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    date = this.declared<string | null>('date');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<Array<Line | null> | null>('lines');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    purchaseOrder = this.declared<PurchaseOrder | null>('purchaseOrder');
    purchaseOrderId = this.declared<string | null>('purchaseOrderId');
    receiptDate = this.declared<string | null>('receiptDate');
    receiptNote = this.declared<unknown>('receiptNote');
    receiptStatus = this.declared<string | null>('receiptStatus');
    receipts = this.declared<unknown>('receipts');
    receiveCompleted = this.declared<boolean | null>('receiveCompleted');
    status = this.declared<string | null>('status');
    trackingNumber = this.declared<string | null>('trackingNumber');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** The purchase order item receipts body. */
export class PurchaseOrderItemReceipts extends Dto {
    static override ENVELOPE_KEY = 'purchase_order';

    static override FIELDS = {
        itemReceipts: 'any',
        pagination: 'any',
    } as const;

    itemReceipts = this.declared<unknown>('itemReceipts');
    pagination = this.declared<unknown>('pagination');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    ItemReceipt: ['GET /api/{api_version}/item_receipts', 'GET /api/{api_version}/item_receipts/{item_receipt_id}'],
    ItemReceiptList: ['GET /api/{api_version}/item_receipts'],
    ItemReceipts: ['POST /api/{api_version}/item_receipts'],
    ItemReceiptUpdated: ['PATCH /api/{api_version}/item_receipts/{item_receipt_id}'],
    PurchaseOrderItemReceipts: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/item_receipts'],
};

sealDtoSchema(
    ItemReceipt,
    ItemReceiptList,
    ItemReceipts,
    ItemReceiptUpdated,
    PurchaseOrderItemReceipts,
    PurchaseOrder,
    PurchaseOrderLine,
    Item,
    Uom,
    Warehouse,
    Line,
    CreatedBy,
    LastUpdatedBy,
    ItemReceiptPurchaseOrder,
    ItemReceiptLinePurchaseOrderLine,
    ItemReceiptLineItem,
    ItemReceiptLineUom,
    ItemReceiptLineWarehouse,
    ItemReceiptLine,
    ItemReceiptCreatedBy,
    ItemReceiptLastUpdatedBy,
);
