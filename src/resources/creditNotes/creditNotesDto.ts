/** Typed views over the v4 credit notes bodies. */

import {Dto, dtoList, dtoOneOf, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `account` block of {@link CreditNote}. */
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

/** The `currency` block of {@link CreditNote}. */
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

/** The `payment` block of {@link CreditNote}. */
export class Payment extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `invoices` on {@link CreditNote}. */
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

/** One entry of `custom_attributes` on {@link CreditNote}. */
export class CustomAttribute extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        type: 'string',
        name: 'string',
        value: dtoOneOf('string', dtoList('string')),
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    value = this.declared<string | Array<string | null> | null>('value');
    href = this.declared<string | null>('href');
}

/** The `created_by` block of {@link CreditNote}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link CreditNote}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The credit note body. */
export class CreditNote extends Dto {
    static override FIELDS = {
        account: Account,
        accountId: 'string',
        amount: 'string',
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: dtoList(CustomAttribute),
        customObjects: 'any',
        date: 'string',
        href: 'string',
        id: 'string',
        initialAmount: 'string',
        invoiceId: 'string',
        invoices: dtoList(Invoice),
        issueDate: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        payment: Payment,
        paymentId: 'string',
        refundAmount: 'string',
        refundable: 'boolean',
        remainingAmount: 'string',
        remainingBalance: 'string',
        status: 'string',
        updatedBy: 'string',
        updatedOn: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    accountId = this.declared<string | null>('accountId');
    amount = this.declared<string | null>('amount');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    customObjects = this.declared<unknown>('customObjects');
    date = this.declared<string | null>('date');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    initialAmount = this.declared<string | null>('initialAmount');
    invoiceId = this.declared<string | null>('invoiceId');
    invoices = this.declared<Array<Invoice | null> | null>('invoices');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    payment = this.declared<Payment | null>('payment');
    paymentId = this.declared<string | null>('paymentId');
    refundAmount = this.declared<string | null>('refundAmount');
    refundable = this.declared<boolean | null>('refundable');
    remainingAmount = this.declared<string | null>('remainingAmount');
    remainingBalance = this.declared<string | null>('remainingBalance');
    status = this.declared<string | null>('status');
    updatedBy = this.declared<string | null>('updatedBy');
    updatedOn = this.declared<string | null>('updatedOn');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of CreditNote records. */
export class CreditNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(CreditNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<CreditNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The credit note read body. */
export class CreditNoteRead extends Dto {
    static override ENVELOPE_KEY = 'credit_note';

    static override FIELDS = {
        account: Account,
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: dtoList(CustomAttribute),
        href: 'string',
        id: 'string',
        initialAmount: 'string',
        invoices: dtoList(Invoice),
        issueDate: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        payment: Payment,
        refundAmount: 'string',
        refundable: 'boolean',
        remainingAmount: 'string',
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    initialAmount = this.declared<string | null>('initialAmount');
    invoices = this.declared<Array<Invoice | null> | null>('invoices');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    payment = this.declared<Payment | null>('payment');
    refundAmount = this.declared<string | null>('refundAmount');
    refundable = this.declared<boolean | null>('refundable');
    remainingAmount = this.declared<string | null>('remainingAmount');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** The credit note updated body. */
export class CreditNoteUpdated extends Dto {
    static override ENVELOPE_KEY = 'credit_note';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        code: 'string',
        issueDate: 'string',
        refundable: 'boolean',
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    code = this.declared<string | null>('code');
    issueDate = this.declared<string | null>('issueDate');
    refundable = this.declared<boolean | null>('refundable');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/**
 * One entry of a {@link CreditNoteItems}'s `items`: what was credited and refunded, by source, each amount a string.
 */
export class CreditNoteItem extends Dto {
    static override FIELDS = {
        creditNoteFromBlankMethod: 'string',
        creditNoteFromCreditNote: 'string',
        creditNoteFromGiftCertificate: 'string',
        creditNoteFromInvoiceCredit: 'string',
        creditNoteFromPaymentMethod: 'string',
        creditNoteTotal: 'string',
        invoice: 'any',
        object: 'string',
        refundFromBlankMethod: 'string',
        refundFromCreditNote: 'string',
        refundFromGiftCertificate: 'string',
        refundFromInvoiceCredit: 'string',
        refundFromPaymentMethod: 'string',
        refundTotal: 'string',
    } as const;

    creditNoteFromBlankMethod = this.declared<string | null>('creditNoteFromBlankMethod');
    creditNoteFromCreditNote = this.declared<string | null>('creditNoteFromCreditNote');
    creditNoteFromGiftCertificate = this.declared<string | null>('creditNoteFromGiftCertificate');
    creditNoteFromInvoiceCredit = this.declared<string | null>('creditNoteFromInvoiceCredit');
    creditNoteFromPaymentMethod = this.declared<string | null>('creditNoteFromPaymentMethod');
    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    invoice = this.declared<unknown>('invoice');
    object = this.declared<string | null>('object');
    refundFromBlankMethod = this.declared<string | null>('refundFromBlankMethod');
    refundFromCreditNote = this.declared<string | null>('refundFromCreditNote');
    refundFromGiftCertificate = this.declared<string | null>('refundFromGiftCertificate');
    refundFromInvoiceCredit = this.declared<string | null>('refundFromInvoiceCredit');
    refundFromPaymentMethod = this.declared<string | null>('refundFromPaymentMethod');
    refundTotal = this.declared<string | null>('refundTotal');
}

/** A credit note's balance rows, under `credit_note`. */
export class CreditNoteItems extends Dto {
    static override ENVELOPE_KEY = 'credit_note';

    static override FIELDS = {
        href: 'string',
        items: dtoList(CreditNoteItem),
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    items = this.declared<Array<CreditNoteItem | null> | null>('items');
    object = this.declared<string | null>('object');
}

/** A credit note's applications, under `credit_note`. */
export class CreditNoteApplications extends Dto {
    static override ENVELOPE_KEY = 'credit_note';

    static override FIELDS = {
        applications: dtoList('any'),
        href: 'string',
        object: 'string',
    } as const;

    applications = this.declared<Array<unknown | null> | null>('applications');
    href = this.declared<string | null>('href');
    object = this.declared<string | null>('object');
}

/** A {@link CreditNoteNote}'s `created_by`. */
export class CreditNoteNoteCreatedBy extends Dto {
    static override FIELDS = {
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link CreditNoteNote}'s `credit_note`. */
export class CreditNoteNoteDetail extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** One note on a credit note, under `note`. */
export class CreditNoteNote extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList('any'),
        content: 'string',
        createdBy: CreditNoteNoteCreatedBy,
        createdOn: 'string',
        creditNote: CreditNoteNoteDetail,
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        user: 'any',
        version: 'int',
        watchers: dtoList('any'),
    } as const;

    attachments = this.declared<Array<unknown | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<CreditNoteNoteCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNote = this.declared<CreditNoteNoteDetail | null>('creditNote');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<unknown | null> | null>('watchers');
}

/** One page of `CreditNoteNote` records, under `data`. */
export class CreditNoteNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(CreditNoteNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<CreditNoteNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    CreditNote: ['GET /api/{api_version}/credit_notes'],
    CreditNoteList: ['GET /api/{api_version}/credit_notes'],
    CreditNoteRead: ['GET /api/{api_version}/credit_notes/{credit_note_id}'],
    CreditNoteUpdated: ['PATCH /api/{api_version}/credit_notes/{credit_note_id}'],
    CreditNoteItems: ['GET /api/{api_version}/credit_notes/{credit_note_id}/items'],
    CreditNoteApplications: ['GET /api/{api_version}/credit_notes/{credit_note_id}/credit_note_applications'],
    CreditNoteNote: [
        'GET /api/{api_version}/credit_notes/{credit_note_id}/notes',
        'GET /api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}',
    ],
    CreditNoteNoteList: ['GET /api/{api_version}/credit_notes/{credit_note_id}/notes'],
};

sealDtoSchema(
    CreditNote,
    CreditNoteList,
    CreditNoteRead,
    CreditNoteUpdated,
    Account,
    Currency,
    Payment,
    Invoice,
    CustomAttribute,
    CreatedBy,
    LastUpdatedBy,
    CreditNoteItem,
    CreditNoteItems,
    CreditNoteApplications,
    CreditNoteNoteCreatedBy,
    CreditNoteNoteDetail,
    CreditNoteNote,
    CreditNoteNoteList,
);
