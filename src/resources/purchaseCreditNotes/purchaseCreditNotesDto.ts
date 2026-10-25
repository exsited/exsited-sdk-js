/** Typed views over the v4 purchase credit notes bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `account` block of {@link PurchaseCreditNote}. */
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

/** The `currency` block of {@link PurchaseCreditNote}. */
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

/** The `purchase_payment` block of {@link PurchaseCreditNote}. */
export class PurchasePayment extends Dto {
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

/** The `payment_method` block of {@link PurchaseCreditNoteRow}. */
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

/** The `payment_processor` block of {@link PurchaseCreditNoteRow}. */
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

/** One entry of `purchase_credit_note_rows` on {@link PurchaseCreditNote}. */
export class PurchaseCreditNoteRow extends Dto {
    static override FIELDS = {
        creditNoteTotal: 'string',
        creditNoteFromPaymentMethod: 'string',
        creditNoteFromCreditNote: 'string',
        creditNoteFromBlankMethod: 'string',
        refundTotal: 'string',
        refundFromPaymentMethod: 'string',
        refundFromCreditNote: 'string',
        refundFromBlankMethod: 'string',
        paymentMethod: PaymentMethod,
        paymentProcessor: PaymentProcessor,
    } as const;

    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    creditNoteFromPaymentMethod = this.declared<string | null>('creditNoteFromPaymentMethod');
    creditNoteFromCreditNote = this.declared<string | null>('creditNoteFromCreditNote');
    creditNoteFromBlankMethod = this.declared<string | null>('creditNoteFromBlankMethod');
    refundTotal = this.declared<string | null>('refundTotal');
    refundFromPaymentMethod = this.declared<string | null>('refundFromPaymentMethod');
    refundFromCreditNote = this.declared<string | null>('refundFromCreditNote');
    refundFromBlankMethod = this.declared<string | null>('refundFromBlankMethod');
    paymentMethod = this.declared<PaymentMethod | null>('paymentMethod');
    paymentProcessor = this.declared<PaymentProcessor | null>('paymentProcessor');
}

/** The `created_by` block of {@link PurchaseCreditNote}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link PurchaseCreditNote}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The purchase credit note body. */
export class PurchaseCreditNote extends Dto {
    static override FIELDS = {
        account: Account,
        amount: 'string',
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: 'any',
        date: 'string',
        href: 'string',
        id: 'string',
        initialAmount: 'string',
        issueDate: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        paymentId: 'string',
        purchaseCreditNoteRows: dtoList(PurchaseCreditNoteRow),
        purchasePayment: PurchasePayment,
        refundAmount: 'string',
        refundable: 'boolean',
        remainingAmount: 'string',
        remainingBalance: 'string',
        status: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    amount = this.declared<string | null>('amount');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<unknown>('customAttributes');
    date = this.declared<string | null>('date');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    initialAmount = this.declared<string | null>('initialAmount');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    paymentId = this.declared<string | null>('paymentId');
    purchaseCreditNoteRows = this.declared<Array<PurchaseCreditNoteRow | null> | null>('purchaseCreditNoteRows');
    purchasePayment = this.declared<PurchasePayment | null>('purchasePayment');
    refundAmount = this.declared<string | null>('refundAmount');
    refundable = this.declared<boolean | null>('refundable');
    remainingAmount = this.declared<string | null>('remainingAmount');
    remainingBalance = this.declared<string | null>('remainingBalance');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of PurchaseCreditNote records. */
export class PurchaseCreditNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseCreditNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseCreditNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The purchase credit note read body. */
export class PurchaseCreditNoteRead extends Dto {
    static override ENVELOPE_KEY = 'purchase_credit_note';

    static override FIELDS = {
        account: Account,
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        href: 'string',
        id: 'string',
        initialAmount: 'string',
        issueDate: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        purchaseCreditNoteRows: dtoList(PurchaseCreditNoteRow),
        purchasePayment: PurchasePayment,
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
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    initialAmount = this.declared<string | null>('initialAmount');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    purchaseCreditNoteRows = this.declared<Array<PurchaseCreditNoteRow | null> | null>('purchaseCreditNoteRows');
    purchasePayment = this.declared<PurchasePayment | null>('purchasePayment');
    refundAmount = this.declared<string | null>('refundAmount');
    refundable = this.declared<boolean | null>('refundable');
    remainingAmount = this.declared<string | null>('remainingAmount');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** The `status` block of {@link PurchaseCreditNoteUpdated}. */
export class Status extends Dto {
    static override FIELDS = {
        key: 'string',
        value: 'string',
    } as const;

    key = this.declared<string | null>('key');
    value = this.declared<string | null>('value');
}

/** The purchase credit note updated body. */
export class PurchaseCreditNoteUpdated extends Dto {
    static override ENVELOPE_KEY = 'purchase_credit_note';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: Status,
        code: 'string',
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<Status | null>('status');
    code = this.declared<string | null>('code');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** A {@link PurchaseCreditNoteCreated}'s `status`. */
export class PurchaseCreditNoteCreatedStatus extends Dto {
    static override FIELDS = {
        key: 'string',
        value: 'string',
    } as const;

    key = this.declared<string | null>('key');
    value = this.declared<string | null>('value');
}

/**
 * What `createPurchaseCreditNote` answers, under `purchase_credit_note`: a shorter body than the reads, and `status` an
 * object where they send a string.
 */
export class PurchaseCreditNoteCreated extends Dto {
    static override ENVELOPE_KEY = 'purchase_credit_note';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        code: 'string',
        href: 'string',
        id: 'string',
        initialAmount: 'string',
        issueDate: 'string',
        object: 'string',
        remainingAmount: 'string',
        status: PurchaseCreditNoteCreatedStatus,
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    initialAmount = this.declared<string | null>('initialAmount');
    issueDate = this.declared<string | null>('issueDate');
    object = this.declared<string | null>('object');
    remainingAmount = this.declared<string | null>('remainingAmount');
    status = this.declared<PurchaseCreditNoteCreatedStatus | null>('status');
    version = this.declared<number | null>('version');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    PurchaseCreditNote: ['GET /api/{api_version}/purchase_credit_notes'],
    PurchaseCreditNoteList: ['GET /api/{api_version}/purchase_credit_notes'],
    PurchaseCreditNoteRead: ['GET /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}'],
    PurchaseCreditNoteUpdated: ['PATCH /api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}'],
    PurchaseCreditNoteCreated: ['POST /api/{api_version}/purchase_credit_notes'],
};

sealDtoSchema(
    PurchaseCreditNote,
    PurchaseCreditNoteList,
    PurchaseCreditNoteRead,
    Status,
    PurchaseCreditNoteUpdated,
    Account,
    Currency,
    PurchasePayment,
    PaymentMethod,
    PaymentProcessor,
    PurchaseCreditNoteRow,
    CreatedBy,
    LastUpdatedBy,
    PurchaseCreditNoteCreatedStatus,
    PurchaseCreditNoteCreated,
);
