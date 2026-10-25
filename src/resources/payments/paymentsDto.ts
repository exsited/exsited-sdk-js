/** Typed views over the v4 payments bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `account` block of {@link AccountPayment}. */
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

/** One entry of `payment_applied` on {@link AccountPayment}. */
export class PaymentApplied extends Dto {
    static override FIELDS = {
        amount: 'string',
        method: 'string',
        processor: 'string',
        reference: 'string',
        gatewayResponse: 'any',
    } as const;

    amount = this.declared<string | null>('amount');
    method = this.declared<string | null>('method');
    processor = this.declared<string | null>('processor');
    reference = this.declared<string | null>('reference');
    gatewayResponse = this.declared<unknown>('gatewayResponse');
}

/** One entry of `credit_applied` on {@link AccountPayment}. */
export class CreditApplied extends Dto {
    static override FIELDS = {
        code: 'string',
        amount: 'string',
    } as const;

    code = this.declared<string | null>('code');
    amount = this.declared<string | null>('amount');
}

/** One entry of `gift_certificate_applied` on {@link AccountPayment}. */
export class GiftCertificateApplied extends Dto {
    static override FIELDS = {
        code: 'string',
        amount: 'string',
    } as const;

    code = this.declared<string | null>('code');
    amount = this.declared<string | null>('amount');
}

/** One entry of `invoices` on {@link AccountPayment}. */
export class Invoice extends Dto {
    static override FIELDS = {
        total: 'string',
        applied: 'string',
        dueDate: 'string',
        issueDate: 'string',
        outstanding: 'string',
        id: 'string',
    } as const;

    total = this.declared<string | null>('total');
    applied = this.declared<string | null>('applied');
    dueDate = this.declared<string | null>('dueDate');
    issueDate = this.declared<string | null>('issueDate');
    outstanding = this.declared<string | null>('outstanding');
    id = this.declared<string | null>('id');
}

/** The `created_by` block of {@link AccountPayment}. */
export class AccountPaymentCreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link AccountPayment}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The payment body. */
export class Payment extends Dto {
    static override FIELDS = {
        account: Account,
        createdBy: AccountPaymentCreatedBy,
        createdOn: 'string',
        creditApplied: dtoList(CreditApplied),
        giftCertificateApplied: dtoList(GiftCertificateApplied),
        id: 'string',
        invoices: dtoList(Invoice),
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paymentApplied: dtoList(PaymentApplied),
        paymentNote: 'string',
        reconcileStatus: 'string',
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    createdBy = this.declared<AccountPaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditApplied = this.declared<Array<CreditApplied | null> | null>('creditApplied');
    giftCertificateApplied = this.declared<Array<GiftCertificateApplied | null> | null>('giftCertificateApplied');
    id = this.declared<string | null>('id');
    invoices = this.declared<Array<Invoice | null> | null>('invoices');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paymentApplied = this.declared<Array<PaymentApplied | null> | null>('paymentApplied');
    paymentNote = this.declared<string | null>('paymentNote');
    reconcileStatus = this.declared<string | null>('reconcileStatus');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of Payment records. */
export class PaymentList extends Dto {
    static override FIELDS = {
        data: dtoList(Payment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Payment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `attachments` on {@link PaymentsNote}. */
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

/** One entry of `watchers` on {@link PaymentsNote}. */
export class PaymentsNoteWatcher extends Dto {
    static override FIELDS = {
        type: 'string',
        name: 'string',
        email: 'string',
    } as const;

    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    email = this.declared<string | null>('email');
}

/** The `payment` block of {@link PaymentNote}. */
export class PaymentNotePayment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The payment note body. */
export class PaymentNote extends Dto {
    static override FIELDS = {
        attachments: dtoList(Attachment),
        content: 'string',
        createdBy: AccountPaymentCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        payment: PaymentNotePayment,
        user: 'any',
        version: 'int',
        watchers: dtoList(PaymentsNoteWatcher),
    } as const;

    attachments = this.declared<Array<Attachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<AccountPaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    payment = this.declared<PaymentNotePayment | null>('payment');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<PaymentsNoteWatcher | null> | null>('watchers');
}

/** A page of PaymentNote records. */
export class PaymentNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(PaymentNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PaymentNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The payments note body. */
export class PaymentsNote extends Dto {
    static override FIELDS = {
        attachments: dtoList(Attachment),
        content: 'string',
        createdBy: AccountPaymentCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        user: 'any',
        version: 'int',
        watchers: dtoList(PaymentsNoteWatcher),
    } as const;

    attachments = this.declared<Array<Attachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<AccountPaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<PaymentsNoteWatcher | null> | null>('watchers');
}

/** A page of PaymentsNote records. */
export class PaymentsNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(PaymentsNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PaymentsNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `custom_attributes` on {@link PaymentRead}. */
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

/** The payment read body. */
export class PaymentRead extends Dto {
    static override ENVELOPE_KEY = 'payment';

    static override FIELDS = {
        account: Account,
        activityLogs: dtoList('any'),
        createdBy: AccountPaymentCreatedBy,
        createdOn: 'string',
        creditApplied: dtoList(CreditApplied),
        customAttributes: dtoList(CustomAttribute),
        giftCertificateApplied: dtoList(GiftCertificateApplied),
        id: 'string',
        invoices: dtoList(Invoice),
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paymentApplied: dtoList(PaymentApplied),
        paymentNote: 'string',
        reconcileStatus: 'string',
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    createdBy = this.declared<AccountPaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditApplied = this.declared<Array<CreditApplied | null> | null>('creditApplied');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    giftCertificateApplied = this.declared<Array<GiftCertificateApplied | null> | null>('giftCertificateApplied');
    id = this.declared<string | null>('id');
    invoices = this.declared<Array<Invoice | null> | null>('invoices');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paymentApplied = this.declared<Array<PaymentApplied | null> | null>('paymentApplied');
    paymentNote = this.declared<string | null>('paymentNote');
    reconcileStatus = this.declared<string | null>('reconcileStatus');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** One entry of `data` on {@link AccountPayments}. */
export class AccountPayment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        origin: 'string',
        reconcileStatus: 'string',
        paymentNote: 'string',
        account: Account,
        paymentApplied: dtoList(PaymentApplied),
        creditApplied: dtoList(CreditApplied),
        giftCertificateApplied: dtoList(GiftCertificateApplied),
        invoices: dtoList(Invoice),
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: AccountPaymentCreatedBy,
        lastUpdatedBy: LastUpdatedBy,
        version: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    origin = this.declared<string | null>('origin');
    reconcileStatus = this.declared<string | null>('reconcileStatus');
    paymentNote = this.declared<string | null>('paymentNote');
    account = this.declared<Account | null>('account');
    paymentApplied = this.declared<Array<PaymentApplied | null> | null>('paymentApplied');
    creditApplied = this.declared<Array<CreditApplied | null> | null>('creditApplied');
    giftCertificateApplied = this.declared<Array<GiftCertificateApplied | null> | null>('giftCertificateApplied');
    invoices = this.declared<Array<Invoice | null> | null>('invoices');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<AccountPaymentCreatedBy | null>('createdBy');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
}

/** The account payments body. */
export class AccountPayments extends Dto {
    static override FIELDS = {
        data: dtoList(AccountPayment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<AccountPayment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The payment note file body. */
export class PaymentNoteFile extends Dto {
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

/** The `payment` block of {@link PaymentNoteRead}. */
export class PaymentNoteReadPayment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `watchers` on {@link PaymentNoteRead}. */
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

/** The `created_by` block of {@link PaymentNoteRead}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The payment note read body. */
export class PaymentNoteRead extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(PaymentNoteFile),
        content: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        note: 'any',
        object: 'string',
        payment: PaymentNoteReadPayment,
        user: 'any',
        version: 'int',
        watchers: dtoList(Watcher),
    } as const;

    attachments = this.declared<Array<PaymentNoteFile | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    note = this.declared<unknown>('note');
    object = this.declared<string | null>('object');
    payment = this.declared<PaymentNoteReadPayment | null>('payment');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Payment: [
        'GET /api/{api_version}/invoices/{invoice_id}/payments',
        'GET /api/{api_version}/orders/{order_id}/payments',
        'GET /api/{api_version}/payments',
    ],
    PaymentList: [
        'GET /api/{api_version}/invoices/{invoice_id}/payments',
        'GET /api/{api_version}/orders/{order_id}/payments',
        'GET /api/{api_version}/payments',
    ],
    PaymentNote: ['GET /api/{api_version}/payments/{payment_id}/notes'],
    PaymentNoteList: ['GET /api/{api_version}/payments/{payment_id}/notes'],
    PaymentsNote: ['GET /api/{api_version}/payments/notes'],
    PaymentsNoteList: ['GET /api/{api_version}/payments/notes'],
    PaymentRead: ['GET /api/{api_version}/payments/{payment_id}', 'PATCH /api/{api_version}/payments/{payment_id}'],
    AccountPayments: ['GET /api/{api_version}/accounts/{account_id}/payments'],
    PaymentNoteRead: [
        'GET /api/{api_version}/payments/{payment_id}/notes/{payment_note_id}',
        'POST /api/{api_version}/payments/{payment_id}/notes',
    ],
    PaymentNoteFile: ['GET /api/{api_version}/payments/{payment_id}/notes/{payment_note_id}/files/{payment_file_id}'],
    AccountPayment: ['GET /api/{api_version}/accounts/{account_id}/payments'],
};

sealDtoSchema(
    Payment,
    PaymentList,
    PaymentNote,
    PaymentNoteList,
    PaymentsNote,
    PaymentsNoteList,
    PaymentRead,
    AccountPayments,
    PaymentNoteRead,
    PaymentNoteFile,
    PaymentNoteReadPayment,
    Watcher,
    CreatedBy,
    Account,
    PaymentApplied,
    CreditApplied,
    GiftCertificateApplied,
    Invoice,
    AccountPaymentCreatedBy,
    LastUpdatedBy,
    Attachment,
    PaymentsNoteWatcher,
    PaymentNotePayment,
    CustomAttribute,
    AccountPayment,
);
