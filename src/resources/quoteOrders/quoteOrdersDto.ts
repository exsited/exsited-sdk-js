/** Typed views over the v4 quote orders bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** A {@link QuoteOrderInvoice}'s `account`. */
export class QuoteOrderInvoiceAccount extends Dto {
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

/** A {@link QuoteOrderInvoice}'s `created_by`. */
export class QuoteOrderInvoiceCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link QuoteOrderInvoice}'s `currency`. */
export class QuoteOrderInvoiceCurrency extends Dto {
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

/** A {@link QuoteOrderInvoice}'s `custom_form`. */
export class QuoteOrderInvoiceCustomForm extends Dto {
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

/** A {@link QuoteOrderInvoice}'s `order`. */
export class QuoteOrderInvoiceOrder extends Dto {
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

/** One entry of a {@link QuoteOrderInvoiceList}'s `data`. */
export class QuoteOrderInvoice extends Dto {
    static override FIELDS = {
        account: QuoteOrderInvoiceAccount,
        alternateBillingEndDate: 'string',
        alternateBillingStartDate: 'string',
        alternateDueDate: 'string',
        alternateIssueDate: 'string',
        billingEndDate: 'string',
        billingStartDate: 'string',
        createdBy: QuoteOrderInvoiceCreatedBy,
        createdOn: 'string',
        currency: QuoteOrderInvoiceCurrency,
        customForm: QuoteOrderInvoiceCustomForm,
        customerPurchaseOrderId: 'any',
        discountAmount: 'float',
        due: 'string',
        dueDate: 'string',
        id: 'string',
        invoiceNote: 'any',
        issueDate: 'string',
        lastPayment: 'any',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        order: QuoteOrderInvoiceOrder,
        origin: 'any',
        paid: 'string',
        paymentStatus: 'string',
        priceTaxInclusive: 'boolean',
        status: 'string',
        subtotal: 'string',
        tax: 'string',
        taxTotal: 'string',
        total: 'string',
        type: 'string',
        version: 'int',
    } as const;

    account = this.declared<QuoteOrderInvoiceAccount | null>('account');
    alternateBillingEndDate = this.declared<string | null>('alternateBillingEndDate');
    alternateBillingStartDate = this.declared<string | null>('alternateBillingStartDate');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    billingEndDate = this.declared<string | null>('billingEndDate');
    billingStartDate = this.declared<string | null>('billingStartDate');
    createdBy = this.declared<QuoteOrderInvoiceCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<QuoteOrderInvoiceCurrency | null>('currency');
    customForm = this.declared<QuoteOrderInvoiceCustomForm | null>('customForm');
    customerPurchaseOrderId = this.declared<unknown>('customerPurchaseOrderId');
    discountAmount = this.declared<number | null>('discountAmount');
    due = this.declared<string | null>('due');
    dueDate = this.declared<string | null>('dueDate');
    id = this.declared<string | null>('id');
    invoiceNote = this.declared<unknown>('invoiceNote');
    issueDate = this.declared<string | null>('issueDate');
    lastPayment = this.declared<unknown>('lastPayment');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    order = this.declared<QuoteOrderInvoiceOrder | null>('order');
    origin = this.declared<unknown>('origin');
    paid = this.declared<string | null>('paid');
    paymentStatus = this.declared<string | null>('paymentStatus');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    type = this.declared<string | null>('type');
    version = this.declared<number | null>('version');
}

/** One page of a quote's invoices, under `data`. */
export class QuoteOrderInvoiceList extends Dto {
    static override FIELDS = {
        data: dtoList(QuoteOrderInvoice),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<QuoteOrderInvoice | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    QuoteOrderInvoiceList: ['GET /api/{api_version}/quote_orders/{quote_order_id}/invoices'],
};

sealDtoSchema(
    QuoteOrderInvoiceAccount,
    QuoteOrderInvoiceCreatedBy,
    QuoteOrderInvoiceCurrency,
    QuoteOrderInvoiceCustomForm,
    QuoteOrderInvoiceOrder,
    QuoteOrderInvoice,
    QuoteOrderInvoiceList,
);
