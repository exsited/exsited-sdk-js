/** Typed views over the v4 credit note applications bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `credit_note` block of {@link CreditNoteApplication}. */
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

/** The `payment` block of {@link CreditNoteApplication}. */
export class Payment extends Dto {
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

/** The `refund` block of {@link CreditNoteApplication}. */
export class Refund extends Dto {
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

/** The `created_by` block of {@link CreditNoteApplication}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
}

/** The credit note application body. */
export class CreditNoteApplication extends Dto {
    static override WIRE_NAMES = {
        primaryId: 'primaryId',
    } as const;

    static override FIELDS = {
        amount: 'float',
        createdBy: CreatedBy,
        createdOn: 'string',
        creditNote: CreditNote,
        creditNoteId: 'string',
        date: 'string',
        href: 'string',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        payment: Payment,
        paymentId: 'string',
        primaryId: 'int',
        refund: Refund,
        refundId: 'string',
        remainingBalance: 'float',
        status: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    amount = this.declared<number | null>('amount');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNote = this.declared<CreditNote | null>('creditNote');
    creditNoteId = this.declared<string | null>('creditNoteId');
    date = this.declared<string | null>('date');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    payment = this.declared<Payment | null>('payment');
    paymentId = this.declared<string | null>('paymentId');
    primaryId = this.declared<number | null>('primaryId');
    refund = this.declared<Refund | null>('refund');
    refundId = this.declared<string | null>('refundId');
    remainingBalance = this.declared<number | null>('remainingBalance');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of CreditNoteApplication records. */
export class CreditNoteApplicationList extends Dto {
    static override FIELDS = {
        data: dtoList(CreditNoteApplication),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<CreditNoteApplication | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The credit note application read body. */
export class CreditNoteApplicationRead extends Dto {
    static override ENVELOPE_KEY = 'credit_note_application';

    static override WIRE_NAMES = {
        primaryId: 'primaryId',
    } as const;

    static override FIELDS = {
        amount: 'float',
        createdBy: CreatedBy,
        createdOn: 'string',
        creditNote: CreditNote,
        href: 'string',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        payment: Payment,
        primaryId: 'int',
        refund: Refund,
        remainingBalance: 'float',
        status: 'string',
        version: 'int',
    } as const;

    amount = this.declared<number | null>('amount');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNote = this.declared<CreditNote | null>('creditNote');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    payment = this.declared<Payment | null>('payment');
    primaryId = this.declared<number | null>('primaryId');
    refund = this.declared<Refund | null>('refund');
    remainingBalance = this.declared<number | null>('remainingBalance');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** The invoice credit note applications body. */
export class InvoiceCreditNoteApplications extends Dto {
    static override FIELDS = {
        data: dtoList(CreditNoteApplication),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<CreditNoteApplication | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    CreditNoteApplication: [
        'GET /api/{api_version}/credit_note_applications',
        'GET /api/{api_version}/invoices/{invoice_id}/credit_note_applications',
    ],
    CreditNoteApplicationList: ['GET /api/{api_version}/credit_note_applications'],
    CreditNoteApplicationRead: ['GET /api/{api_version}/credit_note_applications/{credit_note_application_id}'],
    InvoiceCreditNoteApplications: ['GET /api/{api_version}/invoices/{invoice_id}/credit_note_applications'],
};

sealDtoSchema(
    CreditNoteApplication,
    CreditNoteApplicationList,
    CreditNoteApplicationRead,
    InvoiceCreditNoteApplications,
    CreditNote,
    Payment,
    Refund,
    CreatedBy,
);
