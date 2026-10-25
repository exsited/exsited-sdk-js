/** Typed views over the v4 purchase invoices bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `currency` block of {@link AccountPurchaseInvoice}. */
export class AccountPurchaseInvoiceCurrency extends Dto {
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

/** The `account` block of {@link AccountPurchaseInvoice}. */
export class AccountPurchaseInvoiceAccount extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
        code: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
    code = this.declared<string | null>('code');
}

/** The `purchase_order` block of {@link AccountPurchaseInvoice}. */
export class AccountPurchaseInvoicePurchaseOrder extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The `created_by` block of {@link AccountPurchaseInvoice}. */
export class AccountPurchaseInvoiceCreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link AccountPurchaseInvoice}. */
export class AccountPurchaseInvoiceLastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The purchase invoice body. */
export class PurchaseInvoice extends Dto {
    static override ENVELOPE_KEY = 'purchase_invoice';

    static override FIELDS = {
        account: AccountPurchaseInvoiceAccount,
        alternateDueDate: 'string',
        alternateIssueDate: 'string',
        createdBy: AccountPurchaseInvoiceCreatedBy,
        createdOn: 'string',
        currency: AccountPurchaseInvoiceCurrency,
        customForm: 'any',
        dueDate: 'string',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: AccountPurchaseInvoiceLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paymentStatus: 'string',
        priceTaxInclusive: 'boolean',
        purchaseOrder: AccountPurchaseInvoicePurchaseOrder,
        status: 'string',
        subtotal: 'string',
        tax: 'string',
        total: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<AccountPurchaseInvoiceAccount | null>('account');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    createdBy = this.declared<AccountPurchaseInvoiceCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<AccountPurchaseInvoiceCurrency | null>('currency');
    customForm = this.declared<unknown>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<AccountPurchaseInvoiceLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paymentStatus = this.declared<string | null>('paymentStatus');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    purchaseOrder = this.declared<AccountPurchaseInvoicePurchaseOrder | null>('purchaseOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    total = this.declared<string | null>('total');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of PurchaseInvoice records. */
export class PurchaseInvoiceList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseInvoice),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseInvoice | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `purchase_credit_note` block of {@link AccountPurchaseInvoice}. */
export class PurchaseCreditNote extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
        code: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
    code = this.declared<string | null>('code');
}

/** The `payment_method` block of {@link PaymentMethodApplication}. */
export class PaymentMethod extends Dto {
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

/** The `payment_processor` block of {@link PaymentMethodApplication}. */
export class PaymentProcessor extends Dto {
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

/** One entry of `payment_method_applications` on {@link PurchaseInvoicePurchasePayment}. */
export class PaymentMethodApplication extends Dto {
    static override FIELDS = {
        amount: 'string',
        reference: 'string',
        paymentMethod: PaymentMethod,
        paymentProcessor: PaymentProcessor,
    } as const;

    amount = this.declared<string | null>('amount');
    reference = this.declared<string | null>('reference');
    paymentMethod = this.declared<PaymentMethod | null>('paymentMethod');
    paymentProcessor = this.declared<PaymentProcessor | null>('paymentProcessor');
}

/** One entry of `credit_note_applications` on {@link PurchaseInvoicePurchasePayment}. */
export class CreditNoteApplication extends Dto {
    static override FIELDS = {
        amount: 'string',
        purchaseCreditNote: PurchaseCreditNote,
    } as const;

    amount = this.declared<string | null>('amount');
    purchaseCreditNote = this.declared<PurchaseCreditNote | null>('purchaseCreditNote');
}

/** The `purchase_invoice` block of {@link PurchaseInvoiceApplication}. */
export class PurchaseInvoiceApplicationPurchaseInvoice extends Dto {
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

/** One entry of `purchase_invoice_applications` on {@link PurchaseInvoicePurchasePayment}. */
export class PurchaseInvoiceApplication extends Dto {
    static override FIELDS = {
        purchaseInvoice: PurchaseInvoiceApplicationPurchaseInvoice,
        applied: 'string',
        outstanding: 'string',
        total: 'string',
        issueDate: 'string',
        dueDate: 'string',
    } as const;

    purchaseInvoice = this.declared<PurchaseInvoiceApplicationPurchaseInvoice | null>('purchaseInvoice');
    applied = this.declared<string | null>('applied');
    outstanding = this.declared<string | null>('outstanding');
    total = this.declared<string | null>('total');
    issueDate = this.declared<string | null>('issueDate');
    dueDate = this.declared<string | null>('dueDate');
}

/** The purchase invoice purchase payment body. */
export class PurchaseInvoicePurchasePayment extends Dto {
    static override FIELDS = {
        account: AccountPurchaseInvoiceAccount,
        code: 'string',
        createdBy: AccountPurchaseInvoiceCreatedBy,
        createdOn: 'string',
        creditNoteApplications: dtoList(CreditNoteApplication),
        creditNoteTotal: 'string',
        currency: AccountPurchaseInvoiceCurrency,
        href: 'string',
        id: 'string',
        lastUpdatedBy: AccountPurchaseInvoiceLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paidTotal: 'string',
        paymentDate: 'string',
        paymentMethodApplications: dtoList(PaymentMethodApplication),
        paymentNote: 'string',
        paymentReference: 'any',
        purchaseInvoiceApplications: dtoList(PurchaseInvoiceApplication),
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<AccountPurchaseInvoiceAccount | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<AccountPurchaseInvoiceCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNoteApplications = this.declared<Array<CreditNoteApplication | null> | null>('creditNoteApplications');
    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    currency = this.declared<AccountPurchaseInvoiceCurrency | null>('currency');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<AccountPurchaseInvoiceLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paidTotal = this.declared<string | null>('paidTotal');
    paymentDate = this.declared<string | null>('paymentDate');
    paymentMethodApplications = this.declared<Array<PaymentMethodApplication | null> | null>(
        'paymentMethodApplications',
    );
    paymentNote = this.declared<string | null>('paymentNote');
    paymentReference = this.declared<unknown>('paymentReference');
    purchaseInvoiceApplications = this.declared<Array<PurchaseInvoiceApplication | null> | null>(
        'purchaseInvoiceApplications',
    );
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of PurchaseInvoicePurchasePayment records. */
export class PurchaseInvoicePurchasePaymentList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseInvoicePurchasePayment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseInvoicePurchasePayment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `watchers` on {@link PurchaseInvoicesNote}. */
export class PurchaseInvoicesNoteWatcher extends Dto {
    static override FIELDS = {
        type: 'string',
        name: 'string',
        email: 'string',
    } as const;

    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    email = this.declared<string | null>('email');
}

/** One entry of `attachments` on {@link PurchaseInvoiceNote}. */
export class Attachment extends Dto {
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

/** The purchase invoice note body. */
export class PurchaseInvoiceNote extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(Attachment),
        content: 'string',
        createdBy: AccountPurchaseInvoiceCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: AccountPurchaseInvoiceLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        purchaseInvoice: PurchaseInvoiceApplicationPurchaseInvoice,
        user: 'any',
        version: 'int',
        watchers: dtoList(PurchaseInvoicesNoteWatcher),
    } as const;

    attachments = this.declared<Array<Attachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<AccountPurchaseInvoiceCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<AccountPurchaseInvoiceLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    purchaseInvoice = this.declared<PurchaseInvoiceApplicationPurchaseInvoice | null>('purchaseInvoice');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<PurchaseInvoicesNoteWatcher | null> | null>('watchers');
}

/** A page of PurchaseInvoiceNote records. */
export class PurchaseInvoiceNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseInvoiceNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseInvoiceNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The purchase invoices note body. */
export class PurchaseInvoicesNote extends Dto {
    static override FIELDS = {
        attachments: 'any',
        content: 'string',
        createdBy: AccountPurchaseInvoiceCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: AccountPurchaseInvoiceLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        user: 'any',
        version: 'int',
        watchers: dtoList(PurchaseInvoicesNoteWatcher),
    } as const;

    attachments = this.declared<unknown>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<AccountPurchaseInvoiceCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<AccountPurchaseInvoiceLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<PurchaseInvoicesNoteWatcher | null> | null>('watchers');
}

/** A page of PurchaseInvoicesNote records. */
export class PurchaseInvoicesNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseInvoicesNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseInvoicesNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `custom_attributes` on {@link PurchaseInvoiceRead}. */
export class CustomAttribute extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        type: 'string',
        name: 'string',
        value: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    value = this.declared<string | null>('value');
    href = this.declared<string | null>('href');
}

/** The `item` block of {@link PurchaseInvoiceReadLine}. */
export class PurchaseInvoiceReadLineItem extends Dto {
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

/** One entry of `lines` on {@link PurchaseInvoiceRead}. */
export class PurchaseInvoiceReadLine extends Dto {
    static override FIELDS = {
        id: 'string',
        object: 'string',
        item: PurchaseInvoiceReadLineItem,
        quantity: 'int',
        uom: 'string',
        warehouse: 'string',
        subtotal: 'string',
        total: 'string',
        tax: 'string',
        accountingCode: 'string',
        version: 'int',
    } as const;

    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    item = this.declared<PurchaseInvoiceReadLineItem | null>('item');
    quantity = this.declared<number | null>('quantity');
    uom = this.declared<string | null>('uom');
    warehouse = this.declared<string | null>('warehouse');
    subtotal = this.declared<string | null>('subtotal');
    total = this.declared<string | null>('total');
    tax = this.declared<string | null>('tax');
    accountingCode = this.declared<string | null>('accountingCode');
    version = this.declared<number | null>('version');
}

/** The `kpis` block of {@link PurchaseInvoiceRead}. */
export class PurchaseInvoiceReadKpi extends Dto {
    static override FIELDS = {
        outstanding: 'string',
        overdue: 'string',
        lastPaymentDate: 'any',
        paymentApplied: 'string',
        creditApplied: 'string',
        creditIssued: 'string',
        lastReactivatedOn: 'any',
        lastCancelledOn: 'any',
        lastAmendedOn: 'any',
        voidedOn: 'any',
        deletedOn: 'any',
        object: 'string',
    } as const;

    outstanding = this.declared<string | null>('outstanding');
    overdue = this.declared<string | null>('overdue');
    lastPaymentDate = this.declared<unknown>('lastPaymentDate');
    paymentApplied = this.declared<string | null>('paymentApplied');
    creditApplied = this.declared<string | null>('creditApplied');
    creditIssued = this.declared<string | null>('creditIssued');
    lastReactivatedOn = this.declared<unknown>('lastReactivatedOn');
    lastCancelledOn = this.declared<unknown>('lastCancelledOn');
    lastAmendedOn = this.declared<unknown>('lastAmendedOn');
    voidedOn = this.declared<unknown>('voidedOn');
    deletedOn = this.declared<unknown>('deletedOn');
    object = this.declared<string | null>('object');
}

/** The purchase invoice read body. */
export class PurchaseInvoiceRead extends Dto {
    static override ENVELOPE_KEY = 'purchase_invoice';

    static override FIELDS = {
        account: AccountPurchaseInvoiceAccount,
        alternateDueDate: 'string',
        alternateIssueDate: 'string',
        createdBy: AccountPurchaseInvoiceCreatedBy,
        createdOn: 'string',
        currency: AccountPurchaseInvoiceCurrency,
        customAttributes: dtoList(CustomAttribute),
        customForm: 'any',
        dueDate: 'string',
        id: 'string',
        issueDate: 'string',
        kpis: PurchaseInvoiceReadKpi,
        lastUpdatedBy: AccountPurchaseInvoiceLastUpdatedBy,
        lastUpdatedOn: 'string',
        lines: dtoList(PurchaseInvoiceReadLine),
        object: 'string',
        origin: 'string',
        paymentStatus: 'string',
        priceTaxInclusive: 'boolean',
        purchaseOrder: AccountPurchaseInvoicePurchaseOrder,
        status: 'string',
        subtotal: 'string',
        tax: 'string',
        total: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<AccountPurchaseInvoiceAccount | null>('account');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    createdBy = this.declared<AccountPurchaseInvoiceCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<AccountPurchaseInvoiceCurrency | null>('currency');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    customForm = this.declared<unknown>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    kpis = this.declared<PurchaseInvoiceReadKpi | null>('kpis');
    lastUpdatedBy = this.declared<AccountPurchaseInvoiceLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<Array<PurchaseInvoiceReadLine | null> | null>('lines');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paymentStatus = this.declared<string | null>('paymentStatus');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    purchaseOrder = this.declared<AccountPurchaseInvoicePurchaseOrder | null>('purchaseOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    total = this.declared<string | null>('total');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** The `purchase_payment` block of {@link AccountPurchaseInvoice}. */
export class PurchasePayment extends Dto {
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

/** One entry of `data` on {@link AccountPurchaseInvoices}. */
export class AccountPurchaseInvoice extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        origin: 'string',
        customForm: 'any',
        currency: AccountPurchaseInvoiceCurrency,
        issueDate: 'string',
        alternateIssueDate: 'string',
        dueDate: 'string',
        paymentStatus: 'string',
        alternateDueDate: 'string',
        subtotal: 'string',
        tax: 'string',
        total: 'string',
        priceTaxInclusive: 'boolean',
        account: AccountPurchaseInvoiceAccount,
        purchaseOrder: AccountPurchaseInvoicePurchaseOrder,
        createdBy: AccountPurchaseInvoiceCreatedBy,
        createdOn: 'string',
        lastUpdatedBy: AccountPurchaseInvoiceLastUpdatedBy,
        lastUpdatedOn: 'string',
        uuid: 'string',
        version: 'int',
        amount: 'string',
        remainingBalance: 'string',
        purchaseCreditNote: PurchaseCreditNote,
        purchasePayment: PurchasePayment,
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    origin = this.declared<string | null>('origin');
    customForm = this.declared<unknown>('customForm');
    currency = this.declared<AccountPurchaseInvoiceCurrency | null>('currency');
    issueDate = this.declared<string | null>('issueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    dueDate = this.declared<string | null>('dueDate');
    paymentStatus = this.declared<string | null>('paymentStatus');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    total = this.declared<string | null>('total');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    account = this.declared<AccountPurchaseInvoiceAccount | null>('account');
    purchaseOrder = this.declared<AccountPurchaseInvoicePurchaseOrder | null>('purchaseOrder');
    createdBy = this.declared<AccountPurchaseInvoiceCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedBy = this.declared<AccountPurchaseInvoiceLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
    amount = this.declared<string | null>('amount');
    remainingBalance = this.declared<string | null>('remainingBalance');
    purchaseCreditNote = this.declared<PurchaseCreditNote | null>('purchaseCreditNote');
    purchasePayment = this.declared<PurchasePayment | null>('purchasePayment');
    href = this.declared<string | null>('href');
}

/** The account purchase invoices body. */
export class AccountPurchaseInvoices extends Dto {
    static override FIELDS = {
        data: dtoList(AccountPurchaseInvoice),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<AccountPurchaseInvoice | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `currency` block of {@link PurchaseInvoiceInformation}. */
export class Currency extends Dto {
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

/** The `account` block of {@link PurchaseInvoiceInformation}. */
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

/** The `purchase_order` block of {@link PurchaseInvoiceInformation}. */
export class PurchaseOrder extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The `created_by` block of {@link PurchaseInvoiceInformation}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link PurchaseInvoiceInformation}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `item` block of {@link Line}. */
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

/** One entry of `lines` on {@link PurchaseInvoiceInformation}. */
export class Line extends Dto {
    static override FIELDS = {
        id: 'string',
        object: 'string',
        item: Item,
        quantity: 'int',
        uom: 'string',
        warehouse: 'string',
        subtotal: 'string',
        total: 'string',
        tax: 'string',
        accountingCode: 'string',
        version: 'int',
    } as const;

    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    item = this.declared<Item | null>('item');
    quantity = this.declared<number | null>('quantity');
    uom = this.declared<string | null>('uom');
    warehouse = this.declared<string | null>('warehouse');
    subtotal = this.declared<string | null>('subtotal');
    total = this.declared<string | null>('total');
    tax = this.declared<string | null>('tax');
    accountingCode = this.declared<string | null>('accountingCode');
    version = this.declared<number | null>('version');
}

/** The `kpis` block of {@link PurchaseInvoiceInformation}. */
export class Kpi extends Dto {
    static override FIELDS = {
        outstanding: 'string',
        overdue: 'string',
        lastPaymentDate: 'any',
        paymentApplied: 'string',
        creditApplied: 'string',
        creditIssued: 'string',
        lastReactivatedOn: 'any',
        lastCancelledOn: 'any',
        lastAmendedOn: 'any',
        voidedOn: 'any',
        deletedOn: 'any',
        object: 'string',
    } as const;

    outstanding = this.declared<string | null>('outstanding');
    overdue = this.declared<string | null>('overdue');
    lastPaymentDate = this.declared<unknown>('lastPaymentDate');
    paymentApplied = this.declared<string | null>('paymentApplied');
    creditApplied = this.declared<string | null>('creditApplied');
    creditIssued = this.declared<string | null>('creditIssued');
    lastReactivatedOn = this.declared<unknown>('lastReactivatedOn');
    lastCancelledOn = this.declared<unknown>('lastCancelledOn');
    lastAmendedOn = this.declared<unknown>('lastAmendedOn');
    voidedOn = this.declared<unknown>('voidedOn');
    deletedOn = this.declared<unknown>('deletedOn');
    object = this.declared<string | null>('object');
}

/** The purchase invoice information body. */
export class PurchaseInvoiceInformation extends Dto {
    static override ENVELOPE_KEY = 'purchase_invoice';

    static override FIELDS = {
        account: Account,
        activityLogs: dtoList('any'),
        alternateDueDate: 'string',
        alternateIssueDate: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: dtoList('any'),
        customForm: 'any',
        dueDate: 'string',
        id: 'string',
        invoiceNote: 'string',
        issueDate: 'string',
        kpis: Kpi,
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        lines: dtoList(Line),
        object: 'string',
        origin: 'string',
        paymentStatus: 'string',
        priceTaxInclusive: 'boolean',
        purchaseOrder: PurchaseOrder,
        status: 'string',
        subtotal: 'string',
        tax: 'string',
        total: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    customForm = this.declared<unknown>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    id = this.declared<string | null>('id');
    invoiceNote = this.declared<string | null>('invoiceNote');
    issueDate = this.declared<string | null>('issueDate');
    kpis = this.declared<Kpi | null>('kpis');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<Array<Line | null> | null>('lines');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paymentStatus = this.declared<string | null>('paymentStatus');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    purchaseOrder = this.declared<PurchaseOrder | null>('purchaseOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    total = this.declared<string | null>('total');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** The purchase invoice cancel body. */
export class PurchaseInvoiceCancel extends Dto {
    static override ENVELOPE_KEY = 'purchase_invoice';

    static override FIELDS = {
        account: Account,
        activityLogs: 'any',
        alternateDueDate: 'string',
        alternateIssueDate: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: dtoList('any'),
        customForm: 'any',
        dueDate: 'string',
        eventUuid: 'string',
        id: 'string',
        issueDate: 'string',
        kpis: Kpi,
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        lines: dtoList(Line),
        object: 'string',
        origin: 'string',
        paymentStatus: 'string',
        priceTaxInclusive: 'boolean',
        purchaseOrder: 'any',
        status: 'string',
        subtotal: 'string',
        tax: 'string',
        total: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    activityLogs = this.declared<unknown>('activityLogs');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    customForm = this.declared<unknown>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    eventUuid = this.declared<string | null>('eventUuid');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    kpis = this.declared<Kpi | null>('kpis');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<Array<Line | null> | null>('lines');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paymentStatus = this.declared<string | null>('paymentStatus');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    purchaseOrder = this.declared<unknown>('purchaseOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    total = this.declared<string | null>('total');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** One entry of `data` on {@link PurchaseInvoiceNoteFileList}. */
export class PurchaseInvoiceNoteFile extends Dto {
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

/** The `purchase_invoice` block of {@link PurchaseInvoiceNotes}. */
export class PurchaseInvoiceNotesPurchaseInvoice extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `watchers` on {@link PurchaseInvoiceNotes}. */
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

/** The purchase invoice notes body. */
export class PurchaseInvoiceNotes extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(PurchaseInvoiceNoteFile),
        content: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        externalWatchers: 'any',
        group: 'any',
        href: 'string',
        id: 'string',
        internalWatchers: 'any',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        purchaseInvoice: PurchaseInvoiceNotesPurchaseInvoice,
        user: 'any',
        version: 'int',
        watchers: dtoList(Watcher),
    } as const;

    attachments = this.declared<Array<PurchaseInvoiceNoteFile | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    externalWatchers = this.declared<unknown>('externalWatchers');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    internalWatchers = this.declared<unknown>('internalWatchers');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    purchaseInvoice = this.declared<PurchaseInvoiceNotesPurchaseInvoice | null>('purchaseInvoice');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
}

/** The purchase invoice lines body. */
export class PurchaseInvoiceLines extends Dto {
    static override ENVELOPE_KEY = 'purchase_invoice';

    static override FIELDS = {
        lines: dtoList(Line),
        object: 'string',
    } as const;

    lines = this.declared<Array<Line | null> | null>('lines');
    object = this.declared<string | null>('object');
}

/** The purchase invoice line body. */
export class PurchaseInvoiceLine extends Dto {
    static override ENVELOPE_KEY = 'purchase_invoice';

    static override FIELDS = {
        line: Line,
        object: 'string',
    } as const;

    line = this.declared<Line | null>('line');
    object = this.declared<string | null>('object');
}

/** The purchase invoice note read body. */
export class PurchaseInvoiceNoteRead extends Dto {
    static override ENVELOPE_KEY = 'purchase_invoice';

    static override FIELDS = {
        note: 'any',
    } as const;

    note = this.declared<unknown>('note');
}

/** A page of PurchaseInvoiceNoteFile records. */
export class PurchaseInvoiceNoteFileList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(PurchaseInvoiceNoteFile),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<PurchaseInvoiceNoteFile | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    PurchaseInvoice: [
        'GET /api/{api_version}/purchase_invoices',
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/information',
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices',
    ],
    PurchaseInvoiceList: [
        'GET /api/{api_version}/purchase_invoices',
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices',
    ],
    PurchaseInvoicePurchasePayment: [
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments',
    ],
    PurchaseInvoicePurchasePaymentList: [
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments',
    ],
    PurchaseInvoiceNote: [
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes',
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}',
        'PATCH /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}',
    ],
    PurchaseInvoiceNoteList: ['GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes'],
    PurchaseInvoicesNote: ['GET /api/{api_version}/purchase_invoices/notes'],
    PurchaseInvoicesNoteList: ['GET /api/{api_version}/purchase_invoices/notes'],
    PurchaseInvoiceRead: [
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}',
        'POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/amend',
    ],
    AccountPurchaseInvoices: [
        'GET /api/{api_version}/accounts/{account_id}/purchase_invoices',
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications',
    ],
    PurchaseInvoiceInformation: [
        'PATCH /api/{api_version}/purchase_invoices/{purchase_invoice_id}/information',
        'POST /api/{api_version}/purchase_invoices',
        'POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/reactivate',
        'POST /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices',
    ],
    PurchaseInvoiceCancel: ['POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/cancel'],
    PurchaseInvoiceNotes: ['POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes'],
    PurchaseInvoiceLines: ['GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/lines'],
    PurchaseInvoiceLine: [
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/lines/{purchase_invoice_line_uuid}',
    ],
    PurchaseInvoiceNoteFileList: [
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files',
    ],
    PurchaseInvoiceNoteFile: [
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files',
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files/{file_id}',
    ],
    AccountPurchaseInvoice: [
        'GET /api/{api_version}/accounts/{account_id}/purchase_invoices',
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications',
    ],
};

sealDtoSchema(
    PurchaseInvoice,
    PurchaseInvoiceList,
    PurchaseInvoicePurchasePayment,
    PurchaseInvoicePurchasePaymentList,
    PurchaseInvoiceNote,
    PurchaseInvoiceNoteList,
    PurchaseInvoicesNote,
    PurchaseInvoicesNoteList,
    PurchaseInvoiceRead,
    AccountPurchaseInvoices,
    PurchaseInvoiceInformation,
    PurchaseInvoiceCancel,
    PurchaseInvoiceNotes,
    PurchaseInvoiceLines,
    PurchaseInvoiceLine,
    PurchaseInvoiceNoteRead,
    Currency,
    Account,
    PurchaseOrder,
    CreatedBy,
    LastUpdatedBy,
    Item,
    Line,
    Kpi,
    PurchaseInvoiceNoteFile,
    PurchaseInvoiceNotesPurchaseInvoice,
    Watcher,
    PurchaseInvoiceNoteFileList,
    AccountPurchaseInvoiceCurrency,
    AccountPurchaseInvoiceAccount,
    AccountPurchaseInvoicePurchaseOrder,
    AccountPurchaseInvoiceCreatedBy,
    AccountPurchaseInvoiceLastUpdatedBy,
    PurchaseCreditNote,
    PaymentMethod,
    PaymentProcessor,
    PaymentMethodApplication,
    CreditNoteApplication,
    PurchaseInvoiceApplicationPurchaseInvoice,
    PurchaseInvoiceApplication,
    PurchaseInvoicesNoteWatcher,
    Attachment,
    CustomAttribute,
    PurchaseInvoiceReadLineItem,
    PurchaseInvoiceReadLine,
    PurchaseInvoiceReadKpi,
    PurchasePayment,
    AccountPurchaseInvoice,
);
