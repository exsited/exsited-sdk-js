/** Typed views over the v4 purchase payments bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `account` block of {@link PurchasePayment}. */
export class PurchasePaymentAccount extends Dto {
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

/** The `currency` block of {@link PurchasePayment}. */
export class PurchasePaymentCurrency extends Dto {
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

/** The `payment_method` block of {@link PurchasePaymentPaymentMethodApplication}. */
export class PurchasePaymentPaymentMethodApplicationPaymentMethod extends Dto {
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

/** The `payment_processor` block of {@link PurchasePaymentPaymentMethodApplication}. */
export class PurchasePaymentPaymentMethodApplicationPaymentProcessor extends Dto {
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

/** One entry of `payment_method_applications` on {@link PurchasePayment}. */
export class PurchasePaymentPaymentMethodApplication extends Dto {
    static override FIELDS = {
        amount: 'string',
        reference: 'string',
        paymentMethod: PurchasePaymentPaymentMethodApplicationPaymentMethod,
        paymentProcessor: PurchasePaymentPaymentMethodApplicationPaymentProcessor,
    } as const;

    amount = this.declared<string | null>('amount');
    reference = this.declared<string | null>('reference');
    paymentMethod = this.declared<PurchasePaymentPaymentMethodApplicationPaymentMethod | null>('paymentMethod');
    paymentProcessor = this.declared<PurchasePaymentPaymentMethodApplicationPaymentProcessor | null>(
        'paymentProcessor',
    );
}

/** The `purchase_credit_note` block of {@link PurchasePaymentCreditNoteApplication}. */
export class PurchasePaymentCreditNoteApplicationPurchaseCreditNote extends Dto {
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

/** One entry of `credit_note_applications` on {@link PurchasePayment}. */
export class PurchasePaymentCreditNoteApplication extends Dto {
    static override FIELDS = {
        amount: 'string',
        purchaseCreditNote: PurchasePaymentCreditNoteApplicationPurchaseCreditNote,
    } as const;

    amount = this.declared<string | null>('amount');
    purchaseCreditNote = this.declared<PurchasePaymentCreditNoteApplicationPurchaseCreditNote | null>(
        'purchaseCreditNote',
    );
}

/** The `purchase_invoice` block of {@link PurchasePaymentPurchaseInvoiceApplication}. */
export class PurchasePaymentPurchaseInvoiceApplicationPurchaseInvoice extends Dto {
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

/** One entry of `purchase_invoice_applications` on {@link PurchasePayment}. */
export class PurchasePaymentPurchaseInvoiceApplication extends Dto {
    static override FIELDS = {
        purchaseInvoice: PurchasePaymentPurchaseInvoiceApplicationPurchaseInvoice,
        applied: 'string',
        outstanding: 'string',
        total: 'string',
        issueDate: 'string',
        dueDate: 'string',
    } as const;

    purchaseInvoice = this.declared<PurchasePaymentPurchaseInvoiceApplicationPurchaseInvoice | null>('purchaseInvoice');
    applied = this.declared<string | null>('applied');
    outstanding = this.declared<string | null>('outstanding');
    total = this.declared<string | null>('total');
    issueDate = this.declared<string | null>('issueDate');
    dueDate = this.declared<string | null>('dueDate');
}

/** The `created_by` block of {@link PurchasePayment}. */
export class PurchasePaymentCreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link PurchasePayment}. */
export class PurchasePaymentLastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The purchase payment body. */
export class PurchasePayment extends Dto {
    static override FIELDS = {
        account: PurchasePaymentAccount,
        code: 'string',
        createdBy: PurchasePaymentCreatedBy,
        createdOn: 'string',
        creditNoteApplications: dtoList(PurchasePaymentCreditNoteApplication),
        creditNoteTotal: 'string',
        currency: PurchasePaymentCurrency,
        customAttributes: 'any',
        customObjects: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: PurchasePaymentLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paidTotal: 'string',
        paymentDate: 'string',
        paymentMethodApplications: dtoList(PurchasePaymentPaymentMethodApplication),
        paymentNote: 'string',
        paymentReference: 'any',
        purchaseCreditApplied: 'any',
        purchaseInvoiceApplications: dtoList(PurchasePaymentPurchaseInvoiceApplication),
        purchaseInvoices: 'any',
        purchaseOrderId: 'string',
        purchasePaymentApplied: 'any',
        purchasePaymentDate: 'string',
        purchasePaymentNote: 'string',
        status: 'string',
        totalApplied: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<PurchasePaymentAccount | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<PurchasePaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNoteApplications = this.declared<Array<PurchasePaymentCreditNoteApplication | null> | null>(
        'creditNoteApplications',
    );
    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    currency = this.declared<PurchasePaymentCurrency | null>('currency');
    customAttributes = this.declared<unknown>('customAttributes');
    customObjects = this.declared<unknown>('customObjects');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<PurchasePaymentLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paidTotal = this.declared<string | null>('paidTotal');
    paymentDate = this.declared<string | null>('paymentDate');
    paymentMethodApplications = this.declared<Array<PurchasePaymentPaymentMethodApplication | null> | null>(
        'paymentMethodApplications',
    );
    paymentNote = this.declared<string | null>('paymentNote');
    paymentReference = this.declared<unknown>('paymentReference');
    purchaseCreditApplied = this.declared<unknown>('purchaseCreditApplied');
    purchaseInvoiceApplications = this.declared<Array<PurchasePaymentPurchaseInvoiceApplication | null> | null>(
        'purchaseInvoiceApplications',
    );
    purchaseInvoices = this.declared<unknown>('purchaseInvoices');
    purchaseOrderId = this.declared<string | null>('purchaseOrderId');
    purchasePaymentApplied = this.declared<unknown>('purchasePaymentApplied');
    purchasePaymentDate = this.declared<string | null>('purchasePaymentDate');
    purchasePaymentNote = this.declared<string | null>('purchasePaymentNote');
    status = this.declared<string | null>('status');
    totalApplied = this.declared<string | null>('totalApplied');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of PurchasePayment records. */
export class PurchasePaymentList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchasePayment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchasePayment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The purchase payment read body. */
export class PurchasePaymentRead extends Dto {
    static override ENVELOPE_KEY = 'purchase_payment';

    static override FIELDS = {
        account: PurchasePaymentAccount,
        code: 'string',
        createdBy: PurchasePaymentCreatedBy,
        createdOn: 'string',
        creditNoteApplications: dtoList(PurchasePaymentCreditNoteApplication),
        creditNoteTotal: 'string',
        currency: PurchasePaymentCurrency,
        href: 'string',
        id: 'string',
        lastUpdatedBy: PurchasePaymentLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paidTotal: 'string',
        paymentDate: 'string',
        paymentMethodApplications: dtoList(PurchasePaymentPaymentMethodApplication),
        paymentNote: 'string',
        paymentReference: 'any',
        purchaseInvoiceApplications: dtoList(PurchasePaymentPurchaseInvoiceApplication),
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<PurchasePaymentAccount | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<PurchasePaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNoteApplications = this.declared<Array<PurchasePaymentCreditNoteApplication | null> | null>(
        'creditNoteApplications',
    );
    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    currency = this.declared<PurchasePaymentCurrency | null>('currency');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<PurchasePaymentLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paidTotal = this.declared<string | null>('paidTotal');
    paymentDate = this.declared<string | null>('paymentDate');
    paymentMethodApplications = this.declared<Array<PurchasePaymentPaymentMethodApplication | null> | null>(
        'paymentMethodApplications',
    );
    paymentNote = this.declared<string | null>('paymentNote');
    paymentReference = this.declared<unknown>('paymentReference');
    purchaseInvoiceApplications = this.declared<Array<PurchasePaymentPurchaseInvoiceApplication | null> | null>(
        'purchaseInvoiceApplications',
    );
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** The `purchase_payment` block of {@link PurchasePaymentNote}. */
export class PurchasePaymentNotePurchasePayment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `attachments` on {@link PurchasePaymentNote}. */
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

/** One entry of `watchers` on {@link PurchasePaymentNote}. */
export class PurchasePaymentNoteWatcher extends Dto {
    static override FIELDS = {
        type: 'string',
        name: 'string',
        email: 'string',
    } as const;

    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    email = this.declared<string | null>('email');
}

/** The purchase payment note body. */
export class PurchasePaymentNote extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(Attachment),
        content: 'string',
        createdBy: PurchasePaymentCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        purchasePayment: PurchasePaymentNotePurchasePayment,
        user: 'any',
        version: 'int',
        watchers: dtoList(PurchasePaymentNoteWatcher),
    } as const;

    attachments = this.declared<Array<Attachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<PurchasePaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    purchasePayment = this.declared<PurchasePaymentNotePurchasePayment | null>('purchasePayment');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<PurchasePaymentNoteWatcher | null> | null>('watchers');
}

/** A page of PurchasePaymentNote records. */
export class PurchasePaymentNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchasePaymentNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchasePaymentNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `account` block of {@link PurchasePayments}. */
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

/** The `currency` block of {@link PurchasePayments}. */
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

/** One entry of `payment_method_applications` on {@link PurchasePayments}. */
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

/** The `purchase_invoice` block of {@link PurchaseInvoiceApplication}. */
export class PurchaseInvoice extends Dto {
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

/** One entry of `purchase_invoice_applications` on {@link PurchasePayments}. */
export class PurchaseInvoiceApplication extends Dto {
    static override FIELDS = {
        purchaseInvoice: PurchaseInvoice,
        applied: 'string',
        outstanding: 'string',
        total: 'string',
        issueDate: 'string',
        dueDate: 'string',
    } as const;

    purchaseInvoice = this.declared<PurchaseInvoice | null>('purchaseInvoice');
    applied = this.declared<string | null>('applied');
    outstanding = this.declared<string | null>('outstanding');
    total = this.declared<string | null>('total');
    issueDate = this.declared<string | null>('issueDate');
    dueDate = this.declared<string | null>('dueDate');
}

/** The `created_by` block of {@link PurchasePayments}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link PurchasePaymentUpdated}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The purchase payment updated body. */
export class PurchasePaymentUpdated extends Dto {
    static override ENVELOPE_KEY = 'purchase_payment';

    static override FIELDS = {
        account: Account,
        activityLogs: 'any',
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        creditNoteApplications: dtoList('any'),
        creditNoteTotal: 'string',
        currency: Currency,
        customAttributes: 'any',
        customObjects: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paidTotal: 'string',
        paymentDate: 'string',
        paymentMethodApplications: dtoList(PaymentMethodApplication),
        paymentNote: 'string',
        paymentReference: 'any',
        purchaseCreditApplied: 'any',
        purchaseInvoiceApplications: dtoList(PurchaseInvoiceApplication),
        purchaseInvoices: 'any',
        purchaseOrderId: 'string',
        purchasePaymentApplied: 'any',
        purchasePaymentDate: 'string',
        purchasePaymentNote: 'string',
        status: 'string',
        totalApplied: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    activityLogs = this.declared<unknown>('activityLogs');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNoteApplications = this.declared<Array<unknown | null> | null>('creditNoteApplications');
    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<unknown>('customAttributes');
    customObjects = this.declared<unknown>('customObjects');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
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
    purchaseCreditApplied = this.declared<unknown>('purchaseCreditApplied');
    purchaseInvoiceApplications = this.declared<Array<PurchaseInvoiceApplication | null> | null>(
        'purchaseInvoiceApplications',
    );
    purchaseInvoices = this.declared<unknown>('purchaseInvoices');
    purchaseOrderId = this.declared<string | null>('purchaseOrderId');
    purchasePaymentApplied = this.declared<unknown>('purchasePaymentApplied');
    purchasePaymentDate = this.declared<string | null>('purchasePaymentDate');
    purchasePaymentNote = this.declared<string | null>('purchasePaymentNote');
    status = this.declared<string | null>('status');
    totalApplied = this.declared<string | null>('totalApplied');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** The `purchase_credit_note` block of {@link CreditNoteApplication}. */
export class PurchaseCreditNote extends Dto {
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

/** One entry of `credit_note_applications` on {@link PurchasePayments}. */
export class CreditNoteApplication extends Dto {
    static override FIELDS = {
        amount: 'string',
        purchaseCreditNote: PurchaseCreditNote,
    } as const;

    amount = this.declared<string | null>('amount');
    purchaseCreditNote = this.declared<PurchaseCreditNote | null>('purchaseCreditNote');
}

/** One entry of `activity_logs` on {@link PurchasePayments}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** The purchase payments body. */
export class PurchasePayments extends Dto {
    static override ENVELOPE_KEY = 'purchase_payment';

    static override FIELDS = {
        account: Account,
        activityLogs: dtoList(ActivityLog),
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        creditNoteApplications: dtoList(CreditNoteApplication),
        creditNoteTotal: 'string',
        currency: Currency,
        customAttributes: 'any',
        customObjects: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paidTotal: 'string',
        paymentDate: 'string',
        paymentMethodApplications: dtoList(PaymentMethodApplication),
        paymentNote: 'string',
        paymentReference: 'any',
        purchaseCreditApplied: 'any',
        purchaseInvoiceApplications: dtoList(PurchaseInvoiceApplication),
        purchaseInvoices: 'any',
        purchaseOrderId: 'string',
        purchasePaymentApplied: 'any',
        purchasePaymentDate: 'string',
        purchasePaymentNote: 'string',
        status: 'string',
        totalApplied: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNoteApplications = this.declared<Array<CreditNoteApplication | null> | null>('creditNoteApplications');
    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<unknown>('customAttributes');
    customObjects = this.declared<unknown>('customObjects');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
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
    purchaseCreditApplied = this.declared<unknown>('purchaseCreditApplied');
    purchaseInvoiceApplications = this.declared<Array<PurchaseInvoiceApplication | null> | null>(
        'purchaseInvoiceApplications',
    );
    purchaseInvoices = this.declared<unknown>('purchaseInvoices');
    purchaseOrderId = this.declared<string | null>('purchaseOrderId');
    purchasePaymentApplied = this.declared<unknown>('purchasePaymentApplied');
    purchasePaymentDate = this.declared<string | null>('purchasePaymentDate');
    purchasePaymentNote = this.declared<string | null>('purchasePaymentNote');
    status = this.declared<string | null>('status');
    totalApplied = this.declared<string | null>('totalApplied');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** One entry of `data` on {@link AccountPurchasePayments}. */
export class AccountPurchasePayment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        code: 'string',
        origin: 'string',
        account: Account,
        currency: Currency,
        paymentDate: 'string',
        paymentNote: 'string',
        paymentReference: 'any',
        paidTotal: 'string',
        creditNoteTotal: 'string',
        paymentMethodApplications: dtoList(PaymentMethodApplication),
        creditNoteApplications: dtoList(CreditNoteApplication),
        purchaseInvoiceApplications: dtoList(PurchaseInvoiceApplication),
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: CreatedBy,
        lastUpdatedBy: LastUpdatedBy,
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    code = this.declared<string | null>('code');
    origin = this.declared<string | null>('origin');
    account = this.declared<Account | null>('account');
    currency = this.declared<Currency | null>('currency');
    paymentDate = this.declared<string | null>('paymentDate');
    paymentNote = this.declared<string | null>('paymentNote');
    paymentReference = this.declared<unknown>('paymentReference');
    paidTotal = this.declared<string | null>('paidTotal');
    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    paymentMethodApplications = this.declared<Array<PaymentMethodApplication | null> | null>(
        'paymentMethodApplications',
    );
    creditNoteApplications = this.declared<Array<CreditNoteApplication | null> | null>('creditNoteApplications');
    purchaseInvoiceApplications = this.declared<Array<PurchaseInvoiceApplication | null> | null>(
        'purchaseInvoiceApplications',
    );
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** The account purchase payments body. */
export class AccountPurchasePayments extends Dto {
    static override FIELDS = {
        data: dtoList(AccountPurchasePayment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<AccountPurchasePayment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `data` on {@link PurchasePaymentNoteFileList}. */
export class PurchasePaymentNoteFile extends Dto {
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

/** The `purchase_payment` block of {@link PurchasePaymentNotes}. */
export class PurchasePaymentNotesPurchasePayment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `watchers` on {@link PurchasePaymentNotes}. */
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

/** The purchase payment notes body. */
export class PurchasePaymentNotes extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(PurchasePaymentNoteFile),
        content: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        link: 'string',
        name: 'string',
        object: 'string',
        purchasePayment: PurchasePaymentNotesPurchasePayment,
        user: 'any',
        uuid: 'string',
        version: 'int',
        watchers: dtoList(Watcher),
    } as const;

    attachments = this.declared<Array<PurchasePaymentNoteFile | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    link = this.declared<string | null>('link');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    purchasePayment = this.declared<PurchasePaymentNotesPurchasePayment | null>('purchasePayment');
    user = this.declared<unknown>('user');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
}

/** The purchase payment note read body. */
export class PurchasePaymentNoteRead extends Dto {
    static override ENVELOPE_KEY = 'purchase_payment';

    static override FIELDS = {
        note: 'any',
    } as const;

    note = this.declared<unknown>('note');
}

/** A page of PurchasePaymentNoteFile records. */
export class PurchasePaymentNoteFileList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(PurchasePaymentNoteFile),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<PurchasePaymentNoteFile | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** One entry of a {@link PurchasePaymentNoteUpdated}'s `attachments`. */
export class PurchasePaymentNoteUpdatedAttachment extends Dto {
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

/** A {@link PurchasePaymentNoteUpdated}'s `purchase_payment`. */
export class PurchasePaymentNoteUpdatedPurchasePayment extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** A {@link PurchasePaymentNoteUpdated}'s `created_by` and `last_updated_by`. */
export class PurchasePaymentNoteUpdatedUser extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** What `updatePurchasePaymentNote` answers, under `note`. */
export class PurchasePaymentNoteUpdated extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(PurchasePaymentNoteUpdatedAttachment),
        content: 'string',
        createdBy: PurchasePaymentNoteUpdatedUser,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: PurchasePaymentNoteUpdatedUser,
        lastUpdatedOn: 'string',
        object: 'string',
        purchasePayment: PurchasePaymentNoteUpdatedPurchasePayment,
        user: 'any',
        version: 'int',
        watchers: dtoList('any'),
    } as const;

    attachments = this.declared<Array<PurchasePaymentNoteUpdatedAttachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<PurchasePaymentNoteUpdatedUser | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<PurchasePaymentNoteUpdatedUser | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    purchasePayment = this.declared<PurchasePaymentNoteUpdatedPurchasePayment | null>('purchasePayment');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<unknown | null> | null>('watchers');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    PurchasePayment: ['GET /api/{api_version}/purchase_payments'],
    PurchasePaymentList: ['GET /api/{api_version}/purchase_payments'],
    PurchasePaymentRead: [
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments',
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_payments',
        'GET /api/{api_version}/purchase_payments/{purchase_payment_id}',
    ],
    PurchasePaymentNote: [
        'GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes',
        'GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}',
    ],
    PurchasePaymentNoteList: ['GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes'],
    PurchasePaymentUpdated: ['PATCH /api/{api_version}/purchase_payments/{purchase_payment_id}'],
    PurchasePayments: [
        'POST /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments',
        'POST /api/{api_version}/purchase_payments',
    ],
    AccountPurchasePayments: ['GET /api/{api_version}/accounts/{account_id}/purchase_payments'],
    PurchasePaymentNotes: ['POST /api/{api_version}/purchase_payments/{purchase_payment_id}/notes'],
    PurchasePaymentNoteFileList: [
        'GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files',
    ],
    PurchasePaymentNoteFile: [
        'GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files',
        'GET /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files/{file_id}',
    ],
    AccountPurchasePayment: ['GET /api/{api_version}/accounts/{account_id}/purchase_payments'],
    PurchasePaymentNoteUpdated: ['PATCH /api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}'],
};

sealDtoSchema(
    PurchasePayment,
    PurchasePaymentList,
    PurchasePaymentRead,
    PurchasePaymentNote,
    PurchasePaymentNoteList,
    PurchasePaymentUpdated,
    PurchasePayments,
    AccountPurchasePayments,
    PurchasePaymentNotes,
    PurchasePaymentNoteRead,
    Account,
    Currency,
    PaymentMethod,
    PaymentProcessor,
    PaymentMethodApplication,
    PurchaseInvoice,
    PurchaseInvoiceApplication,
    CreatedBy,
    LastUpdatedBy,
    PurchaseCreditNote,
    CreditNoteApplication,
    ActivityLog,
    PurchasePaymentNoteFile,
    PurchasePaymentNotesPurchasePayment,
    Watcher,
    PurchasePaymentNoteFileList,
    PurchasePaymentAccount,
    PurchasePaymentCurrency,
    PurchasePaymentPaymentMethodApplicationPaymentMethod,
    PurchasePaymentPaymentMethodApplicationPaymentProcessor,
    PurchasePaymentPaymentMethodApplication,
    PurchasePaymentCreditNoteApplicationPurchaseCreditNote,
    PurchasePaymentCreditNoteApplication,
    PurchasePaymentPurchaseInvoiceApplicationPurchaseInvoice,
    PurchasePaymentPurchaseInvoiceApplication,
    PurchasePaymentCreatedBy,
    PurchasePaymentLastUpdatedBy,
    PurchasePaymentNotePurchasePayment,
    Attachment,
    PurchasePaymentNoteWatcher,
    AccountPurchasePayment,
    PurchasePaymentNoteUpdatedAttachment,
    PurchasePaymentNoteUpdatedPurchasePayment,
    PurchasePaymentNoteUpdatedUser,
    PurchasePaymentNoteUpdated,
);
