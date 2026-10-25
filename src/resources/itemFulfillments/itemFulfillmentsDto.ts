/** Typed views over the v4 item fulfillments bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `account` block of {@link ItemFulfillmentRead}. */
export class Account extends Dto {
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

/** The `invoice` block of {@link ItemFulfillmentRead}. */
export class Invoice extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The `item` block of {@link Fulfillment}. */
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

/** One entry of `fulfillments` on {@link ItemFulfillmentRead}. */
export class Fulfillment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        fulfillmentIndex: 'int',
        servingStatus: 'string',
        inventoryTracking: 'any',
        fulfillmentQty: 'float',
        fulfillmentSentQty: 'float',
        pendingReturn: 'float',
        returned: 'float',
        item: Item,
        uom: 'string',
        uomPrecision: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    fulfillmentIndex = this.declared<number | null>('fulfillmentIndex');
    servingStatus = this.declared<string | null>('servingStatus');
    inventoryTracking = this.declared<unknown>('inventoryTracking');
    fulfillmentQty = this.declared<number | null>('fulfillmentQty');
    fulfillmentSentQty = this.declared<number | null>('fulfillmentSentQty');
    pendingReturn = this.declared<number | null>('pendingReturn');
    returned = this.declared<number | null>('returned');
    item = this.declared<Item | null>('item');
    uom = this.declared<string | null>('uom');
    uomPrecision = this.declared<number | null>('uomPrecision');
}

/** The `created_by` block of {@link ItemFulfillmentRead}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link ItemFulfillmentRead}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The item fulfillment body. */
export class ItemFulfillment extends Dto {
    static override FIELDS = {
        account: Account,
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        customAttributes: 'any',
        date: 'string',
        deliveryStatus: 'any',
        fulfillmentCompleted: 'boolean',
        fulfillmentDate: 'string',
        fulfillmentNote: 'string',
        fulfillmentStatus: 'string',
        fulfillments: dtoList(Fulfillment),
        href: 'string',
        id: 'string',
        invoice: Invoice,
        invoiceId: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        note: 'string',
        object: 'string',
        order: 'any',
        orderId: 'string',
        status: 'string',
        trackingNumber: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    date = this.declared<string | null>('date');
    deliveryStatus = this.declared<unknown>('deliveryStatus');
    fulfillmentCompleted = this.declared<boolean | null>('fulfillmentCompleted');
    fulfillmentDate = this.declared<string | null>('fulfillmentDate');
    fulfillmentNote = this.declared<string | null>('fulfillmentNote');
    fulfillmentStatus = this.declared<string | null>('fulfillmentStatus');
    fulfillments = this.declared<Array<Fulfillment | null> | null>('fulfillments');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    invoice = this.declared<Invoice | null>('invoice');
    invoiceId = this.declared<string | null>('invoiceId');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    order = this.declared<unknown>('order');
    orderId = this.declared<string | null>('orderId');
    status = this.declared<string | null>('status');
    trackingNumber = this.declared<string | null>('trackingNumber');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of ItemFulfillment records. */
export class ItemFulfillmentList extends Dto {
    static override FIELDS = {
        data: dtoList(ItemFulfillment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ItemFulfillment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The item fulfillment read body. */
export class ItemFulfillmentRead extends Dto {
    static override ENVELOPE_KEY = 'item_fulfillment';

    static override FIELDS = {
        account: Account,
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        customAttributes: 'any',
        deliveryStatus: 'any',
        fulfillmentCompleted: 'boolean',
        fulfillmentDate: 'string',
        fulfillmentNote: 'string',
        fulfillmentStatus: 'string',
        fulfillments: dtoList(Fulfillment),
        href: 'string',
        id: 'string',
        invoice: Invoice,
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        order: 'any',
        status: 'string',
        trackingNumber: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    deliveryStatus = this.declared<unknown>('deliveryStatus');
    fulfillmentCompleted = this.declared<boolean | null>('fulfillmentCompleted');
    fulfillmentDate = this.declared<string | null>('fulfillmentDate');
    fulfillmentNote = this.declared<string | null>('fulfillmentNote');
    fulfillmentStatus = this.declared<string | null>('fulfillmentStatus');
    fulfillments = this.declared<Array<Fulfillment | null> | null>('fulfillments');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    invoice = this.declared<Invoice | null>('invoice');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    order = this.declared<unknown>('order');
    status = this.declared<string | null>('status');
    trackingNumber = this.declared<string | null>('trackingNumber');
    version = this.declared<number | null>('version');
}

/** A page of ItemFulfillmentRead records. */
export class ItemFulfillmentReadList extends Dto {
    static override FIELDS = {
        data: dtoList(ItemFulfillmentRead),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ItemFulfillmentRead | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The item fulfillments body. */
export class ItemFulfillments extends Dto {
    static override ENVELOPE_KEY = 'item_fulfillment';

    static override FIELDS = {
        activityLogs: 'any',
        code: 'string',
        fulfillmentDate: 'string',
        fulfillmentNote: 'any',
        fulfillmentStatus: 'string',
        href: 'string',
        id: 'string',
        itemFulfillment: 'any',
        object: 'string',
        status: 'string',
        version: 'int',
    } as const;

    activityLogs = this.declared<unknown>('activityLogs');
    code = this.declared<string | null>('code');
    fulfillmentDate = this.declared<string | null>('fulfillmentDate');
    fulfillmentNote = this.declared<unknown>('fulfillmentNote');
    fulfillmentStatus = this.declared<string | null>('fulfillmentStatus');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    itemFulfillment = this.declared<unknown>('itemFulfillment');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** The item fulfillment updated body. */
export class ItemFulfillmentUpdated extends Dto {
    static override ENVELOPE_KEY = 'item_fulfillment';

    static override FIELDS = {
        code: 'string',
        href: 'string',
        id: 'string',
        note: 'string',
        object: 'string',
        status: 'string',
        version: 'int',
    } as const;

    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** The `item_fulfillment` block of {@link ItemFulfillmentNotes}. */
export class ItemFulfillmentNotesItemFulfillment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The item fulfillment notes body. */
export class ItemFulfillmentNotes extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        itemFulfillment: ItemFulfillmentNotesItemFulfillment,
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    itemFulfillment = this.declared<ItemFulfillmentNotesItemFulfillment | null>('itemFulfillment');
    href = this.declared<string | null>('href');
}

/** A {@link ItemFulfillment}'s `created_by`. */
export class ItemFulfillmentCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** One entry of a {@link ItemFulfillmentNote}'s `attachments`. */
export class ItemFulfillmentNoteAttachment extends Dto {
    static override FIELDS = {
        contentType: 'string',
        filename: 'string',
        href: 'string',
        size: 'int',
        uuid: 'string',
    } as const;

    contentType = this.declared<string | null>('contentType');
    filename = this.declared<string | null>('filename');
    href = this.declared<string | null>('href');
    size = this.declared<number | null>('size');
    uuid = this.declared<string | null>('uuid');
}

/** One entry of a {@link ItemFulfillmentNote}'s `watchers`. */
export class ItemFulfillmentNoteWatcher extends Dto {
    static override FIELDS = {
        email: 'string',
        name: 'string',
        type: 'string',
    } as const;

    email = this.declared<string | null>('email');
    name = this.declared<string | null>('name');
    type = this.declared<string | null>('type');
}

/** A {@link ItemFulfillmentNotes}'s `item_fulfillment`. */
export class ItemFulfillmentNotesDetail extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/**
 * One fulfillment note as the notes listing and read answer it; the note is stored on the fulfillment's sale invoice.
 */
export class ItemFulfillmentNote extends Dto {
    static override FIELDS = {
        attachments: dtoList(ItemFulfillmentNoteAttachment),
        content: 'string',
        createdBy: ItemFulfillmentCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        itemFulfillment: ItemFulfillmentNotesDetail,
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        user: 'any',
        version: 'int',
        watchers: dtoList(ItemFulfillmentNoteWatcher),
    } as const;

    attachments = this.declared<Array<ItemFulfillmentNoteAttachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<ItemFulfillmentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    itemFulfillment = this.declared<ItemFulfillmentNotesDetail | null>('itemFulfillment');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<ItemFulfillmentNoteWatcher | null> | null>('watchers');
}

/** One page of `ItemFulfillmentNote` records, under `data`. */
export class ItemFulfillmentNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(ItemFulfillmentNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ItemFulfillmentNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** What `getItemFulfillmentNote` answers: the note under `item_fulfillment.note`. */
export class ItemFulfillmentNoteRead extends Dto {
    static override ENVELOPE_KEY = 'item_fulfillment';

    static override FIELDS = {
        note: ItemFulfillmentNote,
    } as const;

    note = this.declared<ItemFulfillmentNote | null>('note');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    ItemFulfillment: ['GET /api/{api_version}/item_fulfillments'],
    ItemFulfillmentList: ['GET /api/{api_version}/item_fulfillments'],
    ItemFulfillmentRead: [
        'GET /api/{api_version}/invoices/{invoice_id}/item_fulfillments',
        'GET /api/{api_version}/invoices/{invoice_id}/item_fulfillments/{fulfillment_id}',
        'GET /api/{api_version}/item_fulfillments/{fulfillment_id}',
    ],
    ItemFulfillmentReadList: ['GET /api/{api_version}/invoices/{invoice_id}/item_fulfillments'],
    ItemFulfillments: ['POST /api/{api_version}/item_fulfillments'],
    ItemFulfillmentUpdated: ['PATCH /api/{api_version}/item_fulfillments/{fulfillment_id}'],
    ItemFulfillmentNotes: ['POST /api/{api_version}/item_fulfillments/{fulfillment_id}/notes'],
    ItemFulfillmentNoteList: ['GET /api/{api_version}/item_fulfillments/{fulfillment_id}/notes'],
    ItemFulfillmentNoteRead: ['GET /api/{api_version}/item_fulfillments/{fulfillment_id}/notes/{note_id}'],
};

sealDtoSchema(
    ItemFulfillment,
    ItemFulfillmentList,
    ItemFulfillmentRead,
    ItemFulfillmentReadList,
    ItemFulfillments,
    ItemFulfillmentUpdated,
    ItemFulfillmentNotesItemFulfillment,
    ItemFulfillmentNotes,
    Account,
    Invoice,
    Item,
    Fulfillment,
    CreatedBy,
    LastUpdatedBy,
    ItemFulfillmentCreatedBy,
    ItemFulfillmentNoteAttachment,
    ItemFulfillmentNoteWatcher,
    ItemFulfillmentNotesDetail,
    ItemFulfillmentNote,
    ItemFulfillmentNoteList,
    ItemFulfillmentNoteRead,
);
