/** Typed views over the v4 purchase refunds bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `account` block of {@link PurchaseRefundEntry}. */
export class PurchaseRefundEntryAccount extends Dto {
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

/** The `credit_note` block of {@link PurchaseRefundEntry}. */
export class PurchaseRefundEntryCreditNote extends Dto {
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

/** One entry of `custom_attributes` on {@link PurchaseRefundEntry}. */
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

/** The `created_by` block of {@link PurchaseRefundEntry}. */
export class PurchaseRefundEntryCreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** One entry of `data` on {@link PurchaseRefunds}. */
export class PurchaseRefundEntry extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        issueDate: 'string',
        amount: 'string',
        reference: 'string',
        note: 'string',
        paymentMethod: 'string',
        paymentProcessor: 'string',
        account: PurchaseRefundEntryAccount,
        creditNote: PurchaseRefundEntryCreditNote,
        customAttributes: dtoList(CustomAttribute),
        uuid: 'string',
        createdOn: 'string',
        lastUpdatedOn: 'any',
        createdBy: PurchaseRefundEntryCreatedBy,
        lastUpdatedBy: 'any',
        version: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    issueDate = this.declared<string | null>('issueDate');
    amount = this.declared<string | null>('amount');
    reference = this.declared<string | null>('reference');
    note = this.declared<string | null>('note');
    paymentMethod = this.declared<string | null>('paymentMethod');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    account = this.declared<PurchaseRefundEntryAccount | null>('account');
    creditNote = this.declared<PurchaseRefundEntryCreditNote | null>('creditNote');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    uuid = this.declared<string | null>('uuid');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    createdBy = this.declared<PurchaseRefundEntryCreatedBy | null>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
}

/** The purchase refunds body. */
export class PurchaseRefunds extends Dto {
    static override FIELDS = {
        alternateDate: 'string',
        amount: 'string',
        createdBy: 'string',
        createdOn: 'string',
        creditNoteId: 'string',
        customAttributes: 'any',
        data: dtoList(PurchaseRefundEntry),
        date: 'string',
        id: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        note: 'string',
        object: 'string',
        pagination: Pagination,
        paymentMethod: 'string',
        paymentProcessor: 'string',
        reference: 'string',
        status: 'string',
        url: 'string',
        uuid: 'string',
        version: 'string',
    } as const;

    alternateDate = this.declared<string | null>('alternateDate');
    amount = this.declared<string | null>('amount');
    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNoteId = this.declared<string | null>('creditNoteId');
    customAttributes = this.declared<unknown>('customAttributes');
    data = this.declared<Array<PurchaseRefundEntry | null> | null>('data');
    date = this.declared<string | null>('date');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    paymentMethod = this.declared<string | null>('paymentMethod');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    reference = this.declared<string | null>('reference');
    status = this.declared<string | null>('status');
    url = this.declared<string | null>('url');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<string | null>('version');
}

/** The `account` block of {@link PurchaseRefund}. */
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

/** The `credit_note` block of {@link PurchaseRefund}. */
export class CreditNote extends Dto {
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

/** The `created_by` block of {@link PurchaseRefund}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The purchase refund body. */
export class PurchaseRefund extends Dto {
    static override ENVELOPE_KEY = 'purchase_refund';

    static override FIELDS = {
        account: Account,
        alternateDate: 'string',
        amount: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        creditNote: CreditNote,
        creditNoteId: 'string',
        customAttributes: dtoList(CustomAttribute),
        date: 'string',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        note: 'string',
        object: 'string',
        paymentMethod: 'string',
        paymentProcessor: 'string',
        purchaseRefund: 'any',
        reference: 'string',
        status: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    alternateDate = this.declared<string | null>('alternateDate');
    amount = this.declared<string | null>('amount');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNote = this.declared<CreditNote | null>('creditNote');
    creditNoteId = this.declared<string | null>('creditNoteId');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    date = this.declared<string | null>('date');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    paymentMethod = this.declared<string | null>('paymentMethod');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    purchaseRefund = this.declared<unknown>('purchaseRefund');
    reference = this.declared<string | null>('reference');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** The account purchase refunds body. */
export class AccountPurchaseRefunds extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseRefund),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseRefund | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    PurchaseRefunds: ['GET /api/{api_version}/purchase_refunds'],
    PurchaseRefund: [
        'GET /api/{api_version}/purchase_refunds/{purchase_refund_id}',
        'GET /api/{api_version}/accounts/{account_id}/purchase_refunds',
    ],
    AccountPurchaseRefunds: ['GET /api/{api_version}/accounts/{account_id}/purchase_refunds'],
    PurchaseRefundEntry: ['GET /api/{api_version}/purchase_refunds'],
};

sealDtoSchema(
    PurchaseRefunds,
    PurchaseRefund,
    AccountPurchaseRefunds,
    Account,
    CreditNote,
    CreatedBy,
    PurchaseRefundEntryAccount,
    PurchaseRefundEntryCreditNote,
    CustomAttribute,
    PurchaseRefundEntryCreatedBy,
    PurchaseRefundEntry,
);
