/** Typed views over the v4 purchase express bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';

/** A {@link PurchaseExpress}'s `account`. */
export class PurchaseExpressAccount extends Dto {
    static override FIELDS = {
        code: 'string',
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link PurchaseExpress}'s `created_by`. */
export class PurchaseExpressCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link PurchaseExpress}'s `currency`. */
export class PurchaseExpressCurrency extends Dto {
    static override FIELDS = {
        code: 'string',
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link PurchaseExpress}'s `custom_form`. */
export class PurchaseExpressCustomForm extends Dto {
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

/** A {@link PurchaseExpress}'s `kpis`. */
export class PurchaseExpressKpis extends Dto {
    static override FIELDS = {
        estimatedTotal: 'string',
        issueDate: 'any',
        lastCancelledOn: 'any',
        lastChangedOn: 'any',
        lastDeletedOn: 'any',
        lastInvoiceIssueDate: 'any',
        lastInvoiceTotal: 'string',
        lastReactivatedOn: 'any',
        object: 'string',
        totalExpense: 'string',
        totalOutstanding: 'string',
        totalOverdue: 'string',
        totalPurchaseInvoice: 'int',
    } as const;

    estimatedTotal = this.declared<string | null>('estimatedTotal');
    issueDate = this.declared<unknown>('issueDate');
    lastCancelledOn = this.declared<unknown>('lastCancelledOn');
    lastChangedOn = this.declared<unknown>('lastChangedOn');
    lastDeletedOn = this.declared<unknown>('lastDeletedOn');
    lastInvoiceIssueDate = this.declared<unknown>('lastInvoiceIssueDate');
    lastInvoiceTotal = this.declared<string | null>('lastInvoiceTotal');
    lastReactivatedOn = this.declared<unknown>('lastReactivatedOn');
    object = this.declared<string | null>('object');
    totalExpense = this.declared<string | null>('totalExpense');
    totalOutstanding = this.declared<string | null>('totalOutstanding');
    totalOverdue = this.declared<string | null>('totalOverdue');
    totalPurchaseInvoice = this.declared<number | null>('totalPurchaseInvoice');
}

/** What `createPurchaseExpress` answers, under `purchase_express`. */
export class PurchaseExpress extends Dto {
    static override ENVELOPE_KEY = 'purchase_express';

    static override FIELDS = {
        account: PurchaseExpressAccount,
        activityLogs: dtoList('any'),
        billTotal: 'string',
        code: 'string',
        createdBy: PurchaseExpressCreatedBy,
        createdOn: 'string',
        currency: PurchaseExpressCurrency,
        customAttributes: dtoList('any'),
        customForm: PurchaseExpressCustomForm,
        dueDate: 'string',
        dueTotal: 'string',
        expectedCompletionDate: 'any',
        href: 'string',
        id: 'string',
        isPriceTaxInclusive: 'any',
        issueDate: 'string',
        kpis: PurchaseExpressKpis,
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        operationalStatus: 'string',
        origin: 'any',
        paidAmount: 'string',
        purchaseOrderNote: 'any',
        saleOrder: 'any',
        status: 'string',
        subtotal: 'string',
        supplierInvoiceId: 'any',
        taxTotal: 'string',
        total: 'string',
        version: 'int',
        warehouse: 'any',
    } as const;

    account = this.declared<PurchaseExpressAccount | null>('account');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    billTotal = this.declared<string | null>('billTotal');
    code = this.declared<string | null>('code');
    createdBy = this.declared<PurchaseExpressCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<PurchaseExpressCurrency | null>('currency');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    customForm = this.declared<PurchaseExpressCustomForm | null>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    dueTotal = this.declared<string | null>('dueTotal');
    expectedCompletionDate = this.declared<unknown>('expectedCompletionDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPriceTaxInclusive = this.declared<unknown>('isPriceTaxInclusive');
    issueDate = this.declared<string | null>('issueDate');
    kpis = this.declared<PurchaseExpressKpis | null>('kpis');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    operationalStatus = this.declared<string | null>('operationalStatus');
    origin = this.declared<unknown>('origin');
    paidAmount = this.declared<string | null>('paidAmount');
    purchaseOrderNote = this.declared<unknown>('purchaseOrderNote');
    saleOrder = this.declared<unknown>('saleOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    supplierInvoiceId = this.declared<unknown>('supplierInvoiceId');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    version = this.declared<number | null>('version');
    warehouse = this.declared<unknown>('warehouse');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    PurchaseExpress: ['POST /api/{api_version}/purchase_express'],
};

sealDtoSchema(
    PurchaseExpressAccount,
    PurchaseExpressCreatedBy,
    PurchaseExpressCurrency,
    PurchaseExpressCustomForm,
    PurchaseExpressKpis,
    PurchaseExpress,
);
