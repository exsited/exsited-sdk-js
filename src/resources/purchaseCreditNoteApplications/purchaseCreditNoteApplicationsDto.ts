/** Typed views over the v4 purchase credit note applications bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `purchase_credit_note` block of {@link PurchaseCreditNoteApplication}. */
export class PurchaseCreditNote extends Dto {
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

/** The `purchase_payment` block of {@link PurchaseCreditNoteApplication}. */
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

/** The `created_by` block of {@link PurchaseCreditNoteApplication}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The purchase credit note application body. */
export class PurchaseCreditNoteApplication extends Dto {
    static override FIELDS = {
        amount: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        creditNoteId: 'string',
        date: 'string',
        href: 'string',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        paymentId: 'string',
        purchaseCreditNote: PurchaseCreditNote,
        purchasePayment: PurchasePayment,
        remainingBalance: 'string',
        status: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    amount = this.declared<string | null>('amount');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNoteId = this.declared<string | null>('creditNoteId');
    date = this.declared<string | null>('date');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    paymentId = this.declared<string | null>('paymentId');
    purchaseCreditNote = this.declared<PurchaseCreditNote | null>('purchaseCreditNote');
    purchasePayment = this.declared<PurchasePayment | null>('purchasePayment');
    remainingBalance = this.declared<string | null>('remainingBalance');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of PurchaseCreditNoteApplication records. */
export class PurchaseCreditNoteApplicationList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseCreditNoteApplication),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseCreditNoteApplication | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The purchase credit note application read body. */
export class PurchaseCreditNoteApplicationRead extends Dto {
    static override ENVELOPE_KEY = 'purchase_credit_note_application';

    static override FIELDS = {
        amount: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        href: 'string',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        purchaseCreditNote: PurchaseCreditNote,
        purchasePayment: PurchasePayment,
        remainingBalance: 'string',
        status: 'string',
        version: 'int',
    } as const;

    amount = this.declared<string | null>('amount');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    purchaseCreditNote = this.declared<PurchaseCreditNote | null>('purchaseCreditNote');
    purchasePayment = this.declared<PurchasePayment | null>('purchasePayment');
    remainingBalance = this.declared<string | null>('remainingBalance');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    PurchaseCreditNoteApplication: [
        'GET /api/{api_version}/purchase_credit_note_applications',
        'GET /api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications',
    ],
    PurchaseCreditNoteApplicationList: ['GET /api/{api_version}/purchase_credit_note_applications'],
    PurchaseCreditNoteApplicationRead: [
        'GET /api/{api_version}/purchase_credit_note_applications/{purchase_credit_note_application_id}',
    ],
};

sealDtoSchema(
    PurchaseCreditNoteApplication,
    PurchaseCreditNoteApplicationList,
    PurchaseCreditNoteApplicationRead,
    PurchaseCreditNote,
    PurchasePayment,
    CreatedBy,
);
