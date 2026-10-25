/**
 * Typed views over the v4 invoice bodies. Every money field except `discount_amount` arrives as a string such as
 * `"12.00"`, so it is declared a string: a DTO converts nothing, and a number declaration would read `null`. A field
 * no one type reads on every record, `kpis.outstanding` for one, is untyped; its value is in `response.map`.
 */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/**
 * An invoice's currency.
 *
 * **Not the account family's currency shape.** That one is
 * `{object, id, name, code, href}`; this is `{uuid, name, link}` - no `id`, no
 * `code`, and `link` rather than `href`. Same field name, different keys.
 */
export class InvoiceCurrency extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
        link: 'string',
        object: 'string',
        id: 'string',
        code: 'string',
        href: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
    link = this.declared<string | null>('link');
    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
}

/**
 * The custom form an invoice was created under.
 *
 * Two keys, where an item's carries four.
 */
export class InvoiceCustomForm extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The accounting code on an invoice line. */
export class AccountingCode extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
        link: 'string',
        salesRevenue: 'any',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
    link = this.declared<string | null>('link');
    salesRevenue = this.declared<unknown>('salesRevenue');
}

/**
 * The tax block on one invoice line.
 *
 * `rate` and `amount` are strings here as everywhere else in this family.
 */
export class LineTax extends Dto {
    static override FIELDS = {
        uuid: 'string',
        code: 'string',
        rate: 'float',
        amount: 'string',
        name: 'string',
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    code = this.declared<string | null>('code');
    rate = this.declared<number | null>('rate');
    amount = this.declared<string | null>('amount');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/**
 * One custom attribute.
 *
 * `value` is **untyped**: sometimes a string and sometimes an array. No declared
 * type reads both, so none is declared.
 */
export class CustomAttribute extends Dto {
    static override FIELDS = {
        name: 'string',
        value: 'any',
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<unknown>('value');
}

/** The `item` block of {@link InvoiceLine}. */
export class Item extends Dto {
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

/**
 * One line of an invoice.
 *
 * Every amount is a string, including `item_order_quantity` - quantities are not
 * numbers here either.
 */
export class InvoiceLine extends Dto {
    static override FIELDS = {
        uuid: 'string',
        version: 'int',
        itemId: 'string',
        itemUuid: 'string',
        itemName: 'string',
        itemUom: 'string',
        itemWarehouse: 'string',
        itemSerialOrBatchNumber: 'string',
        itemOrderQuantity: 'int',
        itemChargeType: 'string',
        itemCustomAttributes: 'any',
        pricingSnapshotPrice: 'float',
        pricingSnapshotUuid: 'string',
        chargingStartDate: 'string',
        chargingEndDate: 'string',
        alternateChargingStartDate: 'string',
        alternateChargingEndDate: 'string',
        subtotal: 'string',
        total: 'string',
        tax: LineTax,
        accountingCode: AccountingCode,
        object: 'string',
        id: 'string',
        item: Item,
    } as const;

    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
    itemId = this.declared<string | null>('itemId');
    itemUuid = this.declared<string | null>('itemUuid');
    itemName = this.declared<string | null>('itemName');
    itemUom = this.declared<string | null>('itemUom');
    itemWarehouse = this.declared<string | null>('itemWarehouse');
    itemSerialOrBatchNumber = this.declared<string | null>('itemSerialOrBatchNumber');
    itemOrderQuantity = this.declared<number | null>('itemOrderQuantity');
    itemChargeType = this.declared<string | null>('itemChargeType');
    itemCustomAttributes = this.declared<unknown>('itemCustomAttributes');
    pricingSnapshotPrice = this.declared<number | null>('pricingSnapshotPrice');
    pricingSnapshotUuid = this.declared<string | null>('pricingSnapshotUuid');
    chargingStartDate = this.declared<string | null>('chargingStartDate');
    chargingEndDate = this.declared<string | null>('chargingEndDate');
    alternateChargingStartDate = this.declared<string | null>('alternateChargingStartDate');
    alternateChargingEndDate = this.declared<string | null>('alternateChargingEndDate');
    subtotal = this.declared<string | null>('subtotal');
    total = this.declared<string | null>('total');
    tax = this.declared<LineTax | null>('tax');
    accountingCode = this.declared<AccountingCode | null>('accountingCode');
    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    item = this.declared<Item | null>('item');
}

/**
 * The KPI block.
 *
 * **`outstanding` and `overdue` are untyped and that is deliberate.** The API
 * sends each as a string sometimes and a number others, so there is no type that
 * reads both. Everything else here
 * is a string, money and dates alike.
 */
export class InvoiceKpis extends Dto {
    static override FIELDS = {
        creditApplied: 'string',
        creditIssued: 'string',
        paymentApplied: 'string',
        lastPaymentDate: 'string',
        lastAmendedOn: 'string',
        lastCancelledOn: 'string',
        lastReactivatedOn: 'string',
        deletedOn: 'string',
        voidedOn: 'string',
        outstanding: 'any',
        overdue: 'any',
    } as const;

    creditApplied = this.declared<string | null>('creditApplied');
    creditIssued = this.declared<string | null>('creditIssued');
    paymentApplied = this.declared<string | null>('paymentApplied');
    lastPaymentDate = this.declared<string | null>('lastPaymentDate');
    lastAmendedOn = this.declared<string | null>('lastAmendedOn');
    lastCancelledOn = this.declared<string | null>('lastCancelledOn');
    lastReactivatedOn = this.declared<string | null>('lastReactivatedOn');
    deletedOn = this.declared<string | null>('deletedOn');
    voidedOn = this.declared<string | null>('voidedOn');
    outstanding = this.declared<unknown>('outstanding');
    overdue = this.declared<unknown>('overdue');
}

/** The most recent payment against an invoice. `amount` is a string. */
export class LastPayment extends Dto {
    static override FIELDS = {
        uuid: 'string',
        id: 'string',
        date: 'string',
        amount: 'string',
        createdOn: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    id = this.declared<string | null>('id');
    date = this.declared<string | null>('date');
    amount = this.declared<string | null>('amount');
    createdOn = this.declared<string | null>('createdOn');
}

/** One entry of `data` on {@link InvoiceNoteFileList}. */
export class InvoiceNoteFile extends Dto {
    static override ENVELOPE_KEY = 'file';

    static override FIELDS = {
        uuid: 'string',
        filename: 'string',
        contentType: 'string',
        size: 'int',
        href: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    filename = this.declared<string | null>('filename');
    contentType = this.declared<string | null>('contentType');
    size = this.declared<number | null>('size');
    href = this.declared<string | null>('href');
}

/** The `invoice` block of {@link InvoiceNote}. */
export class InvoiceNoteInvoice extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `watchers` on {@link InvoiceNote}. */
export class Watcher extends Dto {
    static override FIELDS = {
        type: 'string',
        name: 'string',
        email: 'string',
    } as const;

    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    email = this.declared<string | null>('email');
}

/** The `created_by` block of {@link InvoiceNote}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/**
 * One note on an invoice.
 *
 * **`watcherList` is camelCase**, alone in this family. The wire is untouched, so
 * it is spelled that way here too rather than normalised.
 *
 * `created_by` is the same {@link CreatedBy} block as on the invoice itself. The detail read answers under `note`; a
 * listing entry arrives bare.
 */
export class InvoiceNote extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override WIRE_NAMES = {
        watcherList: 'watcherList',
    } as const;

    static override FIELDS = {
        uuid: 'string',
        version: 'int',
        content: 'string',
        createdOn: 'string',
        createdBy: CreatedBy,
        lastUpdatedOn: 'string',
        lastUpdatedBy: 'string',
        customAttributes: dtoList(CustomAttribute),
        files: 'any',
        watcherList: 'any',
        object: 'string',
        id: 'string',
        invoice: InvoiceNoteInvoice,
        group: 'any',
        user: 'any',
        attachments: dtoList(InvoiceNoteFile),
        watchers: dtoList(Watcher),
        href: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
    content = this.declared<string | null>('content');
    createdOn = this.declared<string | null>('createdOn');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    files = this.declared<unknown>('files');
    watcherList = this.declared<unknown>('watcherList');
    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    invoice = this.declared<InvoiceNoteInvoice | null>('invoice');
    group = this.declared<unknown>('group');
    user = this.declared<unknown>('user');
    attachments = this.declared<Array<InvoiceNoteFile | null> | null>('attachments');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
    href = this.declared<string | null>('href');
}

/** One item fulfilment recorded against an invoice. */
export class ItemFulfillment extends Dto {
    static override FIELDS = {
        uuid: 'string',
        id: 'string',
        version: 'string',
        invoiceId: 'string',
        orderId: 'string',
        date: 'string',
        status: 'string',
        note: 'string',
        trackingNumber: 'string',
        createdOn: 'string',
        createdBy: 'string',
        lastUpdatedOn: 'string',
        lastUpdatedBy: 'string',
        fulfillments: 'any',
    } as const;

    uuid = this.declared<string | null>('uuid');
    id = this.declared<string | null>('id');
    version = this.declared<string | null>('version');
    invoiceId = this.declared<string | null>('invoiceId');
    orderId = this.declared<string | null>('orderId');
    date = this.declared<string | null>('date');
    status = this.declared<string | null>('status');
    note = this.declared<string | null>('note');
    trackingNumber = this.declared<string | null>('trackingNumber');
    createdOn = this.declared<string | null>('createdOn');
    createdBy = this.declared<string | null>('createdBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    fulfillments = this.declared<unknown>('fulfillments');
}

/** The `account` block of {@link Invoice}. */
export class Account extends Dto {
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

/** The `order` block of {@link Invoice}. */
export class Order extends Dto {
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

/** The `last_updated_by` block of {@link Invoice}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** One entry of `activity_logs` on {@link Invoice}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/**
 * One invoice, from a `{"invoice": {...}}` body or one entry of a listing's `data`. `version`, `discount_amount`,
 * `price_tax_inclusive`, `created_by` and `last_updated_by` take the types the API sends; a value of another type
 * reads `null`.
 */
export class Invoice extends Dto {
    static override ENVELOPE_KEY = 'invoice';

    static override FIELDS = {
        id: 'string',
        uuid: 'string',
        version: 'int',
        status: 'string',
        type: 'string',
        origin: 'string',
        paymentStatus: 'string',
        accountId: 'string',
        accountName: 'string',
        orderId: 'string',
        customerPurchaseOrderId: 'string',
        invoiceNote: 'string',
        issueDate: 'string',
        dueDate: 'string',
        alternateIssueDate: 'string',
        alternateDueDate: 'string',
        billingStartDate: 'string',
        billingEndDate: 'string',
        alternateBillingStartDate: 'string',
        alternateBillingEndDate: 'string',
        subtotal: 'string',
        tax: 'string',
        taxTotal: 'string',
        total: 'string',
        due: 'string',
        paid: 'string',
        discountAmount: 'float',
        shippingCost: 'string',
        creditApplied: 'string',
        creditIssued: 'string',
        paymentApplied: 'string',
        outstanding: 'string',
        priceTaxInclusive: 'boolean',
        recurringRateCount: 'string',
        usageRateCount: 'string',
        currency: InvoiceCurrency,
        customForm: InvoiceCustomForm,
        kpis: InvoiceKpis,
        lastPayment: LastPayment,
        createdOn: 'string',
        createdBy: CreatedBy,
        lastUpdatedOn: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lines: dtoList(InvoiceLine),
        customAttributes: dtoList(CustomAttribute),
        customObjects: 'any',
        activityLogs: dtoList(ActivityLog),
        notes: dtoList(InvoiceNote),
        itemFulfillments: dtoList(ItemFulfillment),
        returnMerchandiseAuthorisations: 'any',
        object: 'string',
        account: Account,
        order: Order,
    } as const;

    id = this.declared<string | null>('id');
    uuid = this.declared<string | null>('uuid');
    /** A number; text reads `null`. */
    version = this.declared<number | null>('version');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    origin = this.declared<string | null>('origin');
    paymentStatus = this.declared<string | null>('paymentStatus');
    accountId = this.declared<string | null>('accountId');
    accountName = this.declared<string | null>('accountName');
    orderId = this.declared<string | null>('orderId');
    customerPurchaseOrderId = this.declared<string | null>('customerPurchaseOrderId');
    invoiceNote = this.declared<string | null>('invoiceNote');
    issueDate = this.declared<string | null>('issueDate');
    dueDate = this.declared<string | null>('dueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    billingStartDate = this.declared<string | null>('billingStartDate');
    billingEndDate = this.declared<string | null>('billingEndDate');
    alternateBillingStartDate = this.declared<string | null>('alternateBillingStartDate');
    alternateBillingEndDate = this.declared<string | null>('alternateBillingEndDate');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    due = this.declared<string | null>('due');
    paid = this.declared<string | null>('paid');
    /** The one money field that is a number, not text. */
    discountAmount = this.declared<number | null>('discountAmount');
    shippingCost = this.declared<string | null>('shippingCost');
    creditApplied = this.declared<string | null>('creditApplied');
    creditIssued = this.declared<string | null>('creditIssued');
    paymentApplied = this.declared<string | null>('paymentApplied');
    outstanding = this.declared<string | null>('outstanding');
    /** A real boolean, and written as one too. See {@link InvoiceCreate}. */
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    recurringRateCount = this.declared<string | null>('recurringRateCount');
    usageRateCount = this.declared<string | null>('usageRateCount');
    currency = this.declared<InvoiceCurrency | null>('currency');
    customForm = this.declared<InvoiceCustomForm | null>('customForm');
    kpis = this.declared<InvoiceKpis | null>('kpis');
    lastPayment = this.declared<LastPayment | null>('lastPayment');
    createdOn = this.declared<string | null>('createdOn');
    /** A `{object, name}` user block; a bare name string reads `null`. */
    createdBy = this.declared<CreatedBy | null>('createdBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    /** Same shape as `created_by`, or a real `null` where it is not set. */
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lines = this.declared<Array<InvoiceLine | null> | null>('lines');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    customObjects = this.declared<unknown>('customObjects');
    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
    notes = this.declared<Array<InvoiceNote | null> | null>('notes');
    itemFulfillments = this.declared<Array<ItemFulfillment | null> | null>('itemFulfillments');
    returnMerchandiseAuthorisations = this.declared<unknown>('returnMerchandiseAuthorisations');
    object = this.declared<string | null>('object');
    account = this.declared<Account | null>('account');
    order = this.declared<Order | null>('order');
}

/** One page of invoices: `{object, url, data, pagination}` like the account listing, the records under `data`. */
export class InvoiceList extends Dto {
    static override FIELDS = {
        data: dtoList(Invoice),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Invoice | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/**
 * A listing of an invoice's notes, under the ordinary list envelope:
 * `GET /api/v4/invoices/{invoice_id}/notes` answers `{object, url, data, pagination}`
 * with a cursor paging block.
 */
export class InvoiceNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(InvoiceNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<InvoiceNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/**
 * The body `createInvoice` takes.
 *
 * **`price_tax_inclusive` is a real boolean here** - `true`, not `"true"` - as
 * {@link Invoice} reads it back.
 */
export class InvoiceCreate extends Dto {
    static override ENVELOPE_KEY = 'invoice';

    static override FIELDS = {
        accountId: 'string',
        orderId: 'string',
        issueDate: 'string',
        dueDate: 'string',
        customerPurchaseOrderId: 'string',
        invoiceNote: 'string',
        priceTaxInclusive: 'boolean',
        currency: 'string',
        lines: 'any',
        customAttributes: 'any',
    } as const;

    accountId = this.declared<string | null>('accountId');
    orderId = this.declared<string | null>('orderId');
    issueDate = this.declared<string | null>('issueDate');
    dueDate = this.declared<string | null>('dueDate');
    customerPurchaseOrderId = this.declared<string | null>('customerPurchaseOrderId');
    invoiceNote = this.declared<string | null>('invoiceNote');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    currency = this.declared<string | null>('currency');
    lines = this.declared<unknown>('lines');
    customAttributes = this.declared<unknown>('customAttributes');
}

/** The body `updateInvoiceInformation` takes. A partial update. */
export class InvoiceInformationUpdate extends Dto {
    static override ENVELOPE_KEY = 'invoice';

    static override FIELDS = {
        issueDate: 'string',
        dueDate: 'string',
        customerPurchaseOrderId: 'string',
        invoiceNote: 'string',
        customAttributes: 'any',
    } as const;

    issueDate = this.declared<string | null>('issueDate');
    dueDate = this.declared<string | null>('dueDate');
    customerPurchaseOrderId = this.declared<string | null>('customerPurchaseOrderId');
    invoiceNote = this.declared<string | null>('invoiceNote');
    customAttributes = this.declared<unknown>('customAttributes');
}

/** The optional body the cancel, amend and reactivate verbs accept. */
export class InvoiceCancel extends Dto {
    static override ENVELOPE_KEY = 'invoice';

    static override FIELDS = {
        effectiveDate: 'string',
        note: 'string',
    } as const;

    effectiveDate = this.declared<string | null>('effectiveDate');
    note = this.declared<string | null>('note');
}

/** The `pdf` block of {@link InvoicePdf}. */
export class Pdf extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        previewUrl: 'string',
        downloadUrl: 'string',
        fileSize: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    previewUrl = this.declared<string | null>('previewUrl');
    downloadUrl = this.declared<string | null>('downloadUrl');
    fileSize = this.declared<number | null>('fileSize');
}

/** The invoice pdf body. */
export class InvoicePdf extends Dto {
    static override ENVELOPE_KEY = 'invoice';

    static override FIELDS = {
        pdf: Pdf,
    } as const;

    pdf = this.declared<Pdf | null>('pdf');
}

/** A page of InvoiceNoteFile records. */
export class InvoiceNoteFileList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(InvoiceNoteFile),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<InvoiceNoteFile | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/**
 * What `getInvoiceKpis` answers, under `invoice_kpis`: the block an invoice carries as `kpis`, with an `object` beside
 * it.
 */
export class InvoiceKpisRead extends Dto {
    static override ENVELOPE_KEY = 'invoice_kpis';

    static override FIELDS = {
        creditApplied: 'string',
        creditIssued: 'string',
        paymentApplied: 'string',
        lastPaymentDate: 'string',
        lastAmendedOn: 'string',
        lastCancelledOn: 'string',
        lastReactivatedOn: 'string',
        deletedOn: 'string',
        voidedOn: 'string',
        outstanding: 'any',
        overdue: 'any',
        object: 'string',
    } as const;

    creditApplied = this.declared<string | null>('creditApplied');
    creditIssued = this.declared<string | null>('creditIssued');
    paymentApplied = this.declared<string | null>('paymentApplied');
    lastPaymentDate = this.declared<string | null>('lastPaymentDate');
    lastAmendedOn = this.declared<string | null>('lastAmendedOn');
    lastCancelledOn = this.declared<string | null>('lastCancelledOn');
    lastReactivatedOn = this.declared<string | null>('lastReactivatedOn');
    deletedOn = this.declared<string | null>('deletedOn');
    voidedOn = this.declared<string | null>('voidedOn');
    outstanding = this.declared<unknown>('outstanding');
    overdue = this.declared<unknown>('overdue');
    object = this.declared<string | null>('object');
}

/** What `getInvoiceLines` answers, under `invoice`: its `object` and `lines`, and nothing else of the invoice. */
export class InvoiceLines extends Dto {
    static override ENVELOPE_KEY = 'invoice';

    static override FIELDS = {
        object: 'string',
        lines: dtoList(InvoiceLine),
    } as const;

    object = this.declared<string | null>('object');
    lines = this.declared<Array<InvoiceLine | null> | null>('lines');
}

/** What `getInvoiceLine` answers, under `invoice`: its `object` and one `line`. */
export class InvoiceLineRead extends Dto {
    static override ENVELOPE_KEY = 'invoice';

    static override FIELDS = {
        object: 'string',
        line: InvoiceLine,
    } as const;

    object = this.declared<string | null>('object');
    line = this.declared<InvoiceLine | null>('line');
}

sealDtoSchema(
    InvoiceCurrency,
    InvoiceCustomForm,
    AccountingCode,
    LineTax,
    CustomAttribute,
    InvoiceLine,
    InvoiceKpis,
    LastPayment,
    InvoiceNote,
    ItemFulfillment,
    Invoice,
    InvoiceList,
    InvoiceNoteList,
    InvoiceCreate,
    InvoiceInformationUpdate,
    InvoiceCancel,
    Item,
    InvoiceNoteFile,
    InvoiceNoteInvoice,
    Watcher,
    CreatedBy,
    Account,
    Order,
    Pdf,
    InvoicePdf,
    InvoiceNoteFileList,
    LastUpdatedBy,
    ActivityLog,
    InvoiceKpisRead,
    InvoiceLines,
    InvoiceLineRead,
);
