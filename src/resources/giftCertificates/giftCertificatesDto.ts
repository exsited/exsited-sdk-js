/** Typed views over the v4 gift certificates bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** One entry of `activity_logs` on {@link GiftCertificate}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** The `currency` block of {@link GiftCertificate}. */
export class Currency extends Dto {
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

/** The `accounting_code` block of {@link GiftCertificate}. */
export class AccountingCode extends Dto {
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

/** The `account` block of {@link Allocation}. */
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

/** One entry of `allocations` on {@link GiftCertificate}. */
export class Allocation extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        type: 'string',
        date: 'string',
        account: Account,
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    date = this.declared<string | null>('date');
    account = this.declared<Account | null>('account');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** One entry of `transactions` on {@link GiftCertificate}. */
export class Transaction extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        type: 'string',
        date: 'string',
        amount: 'string',
        currency: Currency,
        accountingCode: AccountingCode,
        reference: 'any',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    date = this.declared<string | null>('date');
    amount = this.declared<string | null>('amount');
    currency = this.declared<Currency | null>('currency');
    accountingCode = this.declared<AccountingCode | null>('accountingCode');
    reference = this.declared<unknown>('reference');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** The gift certificate body. */
export class GiftCertificate extends Dto {
    static override ENVELOPE_KEY = 'gift_certificate';

    static override FIELDS = {
        accountingCode: AccountingCode,
        activityLogs: dtoList(ActivityLog),
        allocations: dtoList(Allocation),
        amount: 'string',
        code: 'string',
        createdBy: 'any',
        createdOn: 'string',
        currency: Currency,
        expiryDate: 'string',
        href: 'string',
        id: 'string',
        issueDate: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        linkedItem: 'any',
        object: 'string',
        remainingBalance: 'string',
        status: 'string',
        transactions: dtoList(Transaction),
        usedAmount: 'string',
        version: 'int',
    } as const;

    accountingCode = this.declared<AccountingCode | null>('accountingCode');
    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
    allocations = this.declared<Array<Allocation | null> | null>('allocations');
    amount = this.declared<string | null>('amount');
    code = this.declared<string | null>('code');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    expiryDate = this.declared<string | null>('expiryDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    linkedItem = this.declared<unknown>('linkedItem');
    object = this.declared<string | null>('object');
    remainingBalance = this.declared<string | null>('remainingBalance');
    status = this.declared<string | null>('status');
    transactions = this.declared<Array<Transaction | null> | null>('transactions');
    usedAmount = this.declared<string | null>('usedAmount');
    version = this.declared<number | null>('version');
}

/** A page of GiftCertificate records. */
export class GiftCertificateList extends Dto {
    static override FIELDS = {
        data: dtoList(GiftCertificate),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<GiftCertificate | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The gift certificate transaction body. */
export class GiftCertificateTransaction extends Dto {
    static override FIELDS = {
        accountingCode: AccountingCode,
        amount: 'string',
        createdBy: 'any',
        createdOn: 'string',
        currency: Currency,
        date: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        reference: 'any',
        status: 'string',
        type: 'string',
        version: 'int',
    } as const;

    accountingCode = this.declared<AccountingCode | null>('accountingCode');
    amount = this.declared<string | null>('amount');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    date = this.declared<string | null>('date');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    reference = this.declared<unknown>('reference');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    version = this.declared<number | null>('version');
}

/** A page of GiftCertificateTransaction records. */
export class GiftCertificateTransactionList extends Dto {
    static override FIELDS = {
        data: dtoList(GiftCertificateTransaction),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<GiftCertificateTransaction | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `data` on {@link GiftCertificateAllocations}. */
export class GiftCertificateAllocation extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        type: 'string',
        date: 'string',
        account: Account,
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    date = this.declared<string | null>('date');
    account = this.declared<Account | null>('account');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** The gift certificate allocations body. */
export class GiftCertificateAllocations extends Dto {
    static override FIELDS = {
        data: dtoList(GiftCertificateAllocation),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<GiftCertificateAllocation | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** A {@link GiftCertificateAllocation}'s `account`. */
export class GiftCertificateAllocationAccount extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** One allocation, under `gift_certificate_allocation`: the fields an allocation carries in `allocations`. */
export class GiftCertificateAllocationRead extends Dto {
    static override ENVELOPE_KEY = 'gift_certificate_allocation';

    static override FIELDS = {
        account: GiftCertificateAllocationAccount,
        createdBy: 'any',
        createdOn: 'string',
        date: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        status: 'string',
        type: 'string',
        version: 'int',
    } as const;

    account = this.declared<GiftCertificateAllocationAccount | null>('account');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    date = this.declared<string | null>('date');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    version = this.declared<number | null>('version');
}

/** A {@link GiftCertificateTransaction}'s `accounting_code`. */
export class GiftCertificateTransactionAccountingCode extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link GiftCertificateTransaction}'s `currency`. */
export class GiftCertificateTransactionCurrency extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** One transaction, under `gift_certificate_transaction`: the fields a transaction carries in `transactions`. */
export class GiftCertificateTransactionRead extends Dto {
    static override ENVELOPE_KEY = 'gift_certificate_transaction';

    static override FIELDS = {
        accountingCode: GiftCertificateTransactionAccountingCode,
        amount: 'string',
        createdBy: 'any',
        createdOn: 'string',
        currency: GiftCertificateTransactionCurrency,
        date: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        reference: 'any',
        status: 'string',
        type: 'string',
        version: 'int',
    } as const;

    accountingCode = this.declared<GiftCertificateTransactionAccountingCode | null>('accountingCode');
    amount = this.declared<string | null>('amount');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<GiftCertificateTransactionCurrency | null>('currency');
    date = this.declared<string | null>('date');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    reference = this.declared<unknown>('reference');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    version = this.declared<number | null>('version');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    GiftCertificate: [
        'GET /api/{api_version}/gift_certificates',
        'GET /api/{api_version}/gift_certificates/{gc_id}',
        'POST /api/{api_version}/gift_certificates',
        'PATCH /api/{api_version}/gift_certificates/{gc_id}',
    ],
    GiftCertificateList: ['GET /api/{api_version}/gift_certificates'],
    GiftCertificateTransaction: ['GET /api/{api_version}/gift_certificates/{gc_id}/transactions'],
    GiftCertificateTransactionList: ['GET /api/{api_version}/gift_certificates/{gc_id}/transactions'],
    GiftCertificateAllocations: ['GET /api/{api_version}/gift_certificates/{gc_id}/allocations'],
    GiftCertificateAllocation: ['GET /api/{api_version}/gift_certificates/{gc_id}/allocations'],
    GiftCertificateAllocationRead: ['GET /api/{api_version}/gift_certificates/{gc_id}/allocations/{allocation_id}'],
    GiftCertificateTransactionRead: ['GET /api/{api_version}/gift_certificates/{gc_id}/transactions/{transaction_id}'],
};

sealDtoSchema(
    GiftCertificate,
    GiftCertificateList,
    GiftCertificateTransaction,
    GiftCertificateTransactionList,
    GiftCertificateAllocations,
    ActivityLog,
    Currency,
    AccountingCode,
    Account,
    Allocation,
    Transaction,
    GiftCertificateAllocation,
    GiftCertificateAllocationAccount,
    GiftCertificateAllocationRead,
    GiftCertificateTransactionAccountingCode,
    GiftCertificateTransactionCurrency,
    GiftCertificateTransactionRead,
);
