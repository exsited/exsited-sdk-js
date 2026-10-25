/** Typed views over the v4 refunds bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `account` block of {@link Refund}. */
export class RefundAccount extends Dto {
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

/** The `credit_note` block of {@link Refund}. */
export class RefundCreditNote extends Dto {
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

/** The refund body. */
export class Refund extends Dto {
    static override ENVELOPE_KEY = 'refund';

    static override FIELDS = {
        account: RefundAccount,
        amount: 'string',
        createdBy: 'string',
        createdOn: 'string',
        creditNote: RefundCreditNote,
        customAttributes: 'any',
        gatewayResponse: 'any',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        note: 'any',
        object: 'string',
        paymentMethod: 'string',
        paymentProcessor: 'string',
        reconcileStatus: 'string',
        reference: 'string',
        status: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<RefundAccount | null>('account');
    amount = this.declared<string | null>('amount');
    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNote = this.declared<RefundCreditNote | null>('creditNote');
    customAttributes = this.declared<unknown>('customAttributes');
    gatewayResponse = this.declared<unknown>('gatewayResponse');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    note = this.declared<unknown>('note');
    object = this.declared<string | null>('object');
    paymentMethod = this.declared<string | null>('paymentMethod');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    reconcileStatus = this.declared<string | null>('reconcileStatus');
    reference = this.declared<string | null>('reference');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of Refund records. */
export class RefundList extends Dto {
    static override FIELDS = {
        data: dtoList(Refund),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Refund | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `account` block of {@link RefundUpdated}. */
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

/** The `credit_note` block of {@link RefundUpdated}. */
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

/** The refund updated body. */
export class RefundUpdated extends Dto {
    static override ENVELOPE_KEY = 'refund';

    static override FIELDS = {
        account: Account,
        amount: 'string',
        createdBy: 'string',
        createdOn: 'string',
        creditNote: CreditNote,
        creditNoteId: 'string',
        customAttributes: 'any',
        gatewayResponse: 'string',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        note: 'string',
        object: 'string',
        paymentMethod: 'string',
        paymentProcessor: 'string',
        reconcileStatus: 'string',
        reference: 'string',
        status: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    amount = this.declared<string | null>('amount');
    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNote = this.declared<CreditNote | null>('creditNote');
    creditNoteId = this.declared<string | null>('creditNoteId');
    customAttributes = this.declared<unknown>('customAttributes');
    gatewayResponse = this.declared<string | null>('gatewayResponse');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    paymentMethod = this.declared<string | null>('paymentMethod');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    reconcileStatus = this.declared<string | null>('reconcileStatus');
    reference = this.declared<string | null>('reference');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** The account refunds body. */
export class AccountRefunds extends Dto {
    static override FIELDS = {
        data: dtoList(RefundUpdated),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<RefundUpdated | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of a {@link RefundNote}'s `attachments`. */
export class RefundNoteAttachment extends Dto {
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

/** A {@link RefundNote}'s `created_by`. */
export class RefundNoteCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link RefundNote}'s `refund`. */
export class RefundNoteDetail extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** One entry of a {@link RefundNote}'s `watchers`. */
export class RefundNoteWatcher extends Dto {
    static override FIELDS = {
        email: 'any',
        name: 'string',
        type: 'string',
    } as const;

    email = this.declared<unknown>('email');
    name = this.declared<string | null>('name');
    type = this.declared<string | null>('type');
}

/** One note on a refund, under `note`. */
export class RefundNote extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(RefundNoteAttachment),
        content: 'string',
        createdBy: RefundNoteCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        refund: RefundNoteDetail,
        user: 'any',
        version: 'int',
        watchers: dtoList(RefundNoteWatcher),
    } as const;

    attachments = this.declared<Array<RefundNoteAttachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<RefundNoteCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    refund = this.declared<RefundNoteDetail | null>('refund');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<RefundNoteWatcher | null> | null>('watchers');
}

/** One page of `RefundNote` records, under `data`. */
export class RefundNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(RefundNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<RefundNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One attachment's descriptor, under `file`. */
export class RefundNoteFile extends Dto {
    static override ENVELOPE_KEY = 'file';

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

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Refund: ['GET /api/{api_version}/refunds', 'GET /api/{api_version}/refunds/{refund_id}'],
    RefundList: ['GET /api/{api_version}/refunds'],
    RefundUpdated: [
        'POST /api/{api_version}/credit_notes/{credit_note_id}/refunds',
        'PATCH /api/{api_version}/refunds/{refund_id}',
        'GET /api/{api_version}/accounts/{account_id}/refunds',
    ],
    AccountRefunds: ['GET /api/{api_version}/accounts/{account_id}/refunds'],
    RefundNote: [
        'POST /api/{api_version}/refunds/{refund_id}/notes',
        'GET /api/{api_version}/refunds/{refund_id}/notes',
        'GET /api/{api_version}/refunds/{refund_id}/notes/{note_id}',
    ],
    RefundNoteList: ['GET /api/{api_version}/refunds/{refund_id}/notes'],
    RefundNoteFile: ['GET /api/{api_version}/refunds/{refund_id}/notes/{note_id}/files/{file_id}'],
};

sealDtoSchema(
    Refund,
    RefundList,
    RefundUpdated,
    AccountRefunds,
    Account,
    CreditNote,
    RefundAccount,
    RefundCreditNote,
    RefundNoteAttachment,
    RefundNoteCreatedBy,
    RefundNoteDetail,
    RefundNoteWatcher,
    RefundNote,
    RefundNoteList,
    RefundNoteFile,
);
