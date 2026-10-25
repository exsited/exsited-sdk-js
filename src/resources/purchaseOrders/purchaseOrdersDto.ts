/** Typed views over the v4 purchase orders bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `item` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineItem extends Dto {
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

/** The `uom` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineUom extends Dto {
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

/** The `warehouse` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineWarehouse extends Dto {
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

/** The `tax` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineTax extends Dto {
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

/** The `pricing_rule` block of {@link PurchaseOrderLineItemPriceSnapshot}. */
export class PurchaseOrderLineItemPriceSnapshotPricingRule extends Dto {
    static override FIELDS = {
        uuid: 'string',
        version: 'string',
        priceType: 'string',
        price: 'float',
        uom: 'string',
        pricingVersion: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    version = this.declared<string | null>('version');
    priceType = this.declared<string | null>('priceType');
    price = this.declared<number | null>('price');
    uom = this.declared<string | null>('uom');
    pricingVersion = this.declared<string | null>('pricingVersion');
}

/** The `item_price_snapshot` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineItemPriceSnapshot extends Dto {
    static override FIELDS = {
        pricingRule: PurchaseOrderLineItemPriceSnapshotPricingRule,
    } as const;

    pricingRule = this.declared<PurchaseOrderLineItemPriceSnapshotPricingRule | null>('pricingRule');
}

/** The `item_price_tax` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineItemPriceTax extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        rate: 'float',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    rate = this.declared<number | null>('rate');
    href = this.declared<string | null>('href');
}

/** The `tax_code` block of {@link PurchaseOrderLineItemPurchaseTaxConfiguration}. */
export class PurchaseOrderLineItemPurchaseTaxConfigurationTaxCode extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        rate: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    rate = this.declared<string | null>('rate');
    href = this.declared<string | null>('href');
}

/** The `item_purchase_tax_configuration` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineItemPurchaseTaxConfiguration extends Dto {
    static override FIELDS = {
        taxExemptWhenPurchase: 'boolean',
        purchasePriceIsTaxInclusive: 'boolean',
        taxCode: PurchaseOrderLineItemPurchaseTaxConfigurationTaxCode,
    } as const;

    taxExemptWhenPurchase = this.declared<boolean | null>('taxExemptWhenPurchase');
    purchasePriceIsTaxInclusive = this.declared<boolean | null>('purchasePriceIsTaxInclusive');
    taxCode = this.declared<PurchaseOrderLineItemPurchaseTaxConfigurationTaxCode | null>('taxCode');
}

/** The `item_accounting_code` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineItemAccountingCode extends Dto {
    static override FIELDS = {
        costOfGoodsSold: 'string',
    } as const;

    costOfGoodsSold = this.declared<string | null>('costOfGoodsSold');
}

/** The `item_purchase_accounting_code` block of {@link PurchaseOrderLine}. */
export class PurchaseOrderLineItemPurchaseAccountingCode extends Dto {
    static override FIELDS = {
        costOfGoodsSold: 'string',
    } as const;

    costOfGoodsSold = this.declared<string | null>('costOfGoodsSold');
}

/** The purchase order line body. */
export class PurchaseOrderLine extends Dto {
    static override FIELDS = {
        createdOn: 'string',
        flatDiscount: 'float',
        href: 'string',
        id: 'string',
        isPriceTaxInclusive: 'boolean',
        isTaxExempt: 'boolean',
        item: PurchaseOrderLineItem,
        itemAccountingCode: PurchaseOrderLineItemAccountingCode,
        itemDiscountAmount: 'float',
        itemExpectedCompletionDate: 'string',
        itemInvoiceNote: 'any',
        itemPriceSnapshot: PurchaseOrderLineItemPriceSnapshot,
        itemPriceTax: PurchaseOrderLineItemPriceTax,
        itemPriceTaxExempt: 'boolean',
        itemPurchaseAccountingCode: PurchaseOrderLineItemPurchaseAccountingCode,
        itemPurchaseTaxConfiguration: PurchaseOrderLineItemPurchaseTaxConfiguration,
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        price: 'float',
        purchaseLineNote: 'any',
        quantity: 'int',
        sortIndex: 'int',
        status: 'string',
        subtotal: 'string',
        tax: PurchaseOrderLineTax,
        taxTotal: 'string',
        total: 'string',
        uom: PurchaseOrderLineUom,
        version: 'int',
        warehouse: PurchaseOrderLineWarehouse,
    } as const;

    createdOn = this.declared<string | null>('createdOn');
    flatDiscount = this.declared<number | null>('flatDiscount');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPriceTaxInclusive = this.declared<boolean | null>('isPriceTaxInclusive');
    isTaxExempt = this.declared<boolean | null>('isTaxExempt');
    item = this.declared<PurchaseOrderLineItem | null>('item');
    itemAccountingCode = this.declared<PurchaseOrderLineItemAccountingCode | null>('itemAccountingCode');
    itemDiscountAmount = this.declared<number | null>('itemDiscountAmount');
    itemExpectedCompletionDate = this.declared<string | null>('itemExpectedCompletionDate');
    itemInvoiceNote = this.declared<unknown>('itemInvoiceNote');
    itemPriceSnapshot = this.declared<PurchaseOrderLineItemPriceSnapshot | null>('itemPriceSnapshot');
    itemPriceTax = this.declared<PurchaseOrderLineItemPriceTax | null>('itemPriceTax');
    itemPriceTaxExempt = this.declared<boolean | null>('itemPriceTaxExempt');
    itemPurchaseAccountingCode = this.declared<PurchaseOrderLineItemPurchaseAccountingCode | null>(
        'itemPurchaseAccountingCode',
    );
    itemPurchaseTaxConfiguration = this.declared<PurchaseOrderLineItemPurchaseTaxConfiguration | null>(
        'itemPurchaseTaxConfiguration',
    );
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    price = this.declared<number | null>('price');
    purchaseLineNote = this.declared<unknown>('purchaseLineNote');
    quantity = this.declared<number | null>('quantity');
    sortIndex = this.declared<number | null>('sortIndex');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<PurchaseOrderLineTax | null>('tax');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    uom = this.declared<PurchaseOrderLineUom | null>('uom');
    version = this.declared<number | null>('version');
    warehouse = this.declared<PurchaseOrderLineWarehouse | null>('warehouse');
}

/** A page of PurchaseOrderLine records. */
export class PurchaseOrderLineList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseOrderLine),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseOrderLine | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `currency` block of {@link AccountPurchaseOrder}. */
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

/** The `custom_form` block of {@link AccountPurchaseOrder}. */
export class CustomForm extends Dto {
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

/** The `account` block of {@link PurchaseOrder}. */
export class PurchaseOrderAccount extends Dto {
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

/** The `created_by` block of {@link PurchaseOrder}. */
export class PurchaseOrderCreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link PurchaseOrder}. */
export class PurchaseOrderLastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The purchase order body. */
export class PurchaseOrder extends Dto {
    static override FIELDS = {
        account: PurchaseOrderAccount,
        billTotal: 'string',
        code: 'string',
        createdBy: PurchaseOrderCreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: 'any',
        customForm: CustomForm,
        dueDate: 'string',
        dueTotal: 'string',
        expectedCompletionDate: 'string',
        href: 'string',
        id: 'string',
        isPriceTaxInclusive: 'boolean',
        issueDate: 'string',
        lastUpdatedBy: PurchaseOrderLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        operationalStatus: 'string',
        origin: 'string',
        paidAmount: 'string',
        purchaseOrderNote: 'string',
        saleOrder: 'any',
        status: 'string',
        subtotal: 'string',
        supplierInvoiceId: 'string',
        taxTotal: 'string',
        total: 'string',
        version: 'int',
        warehouse: 'any',
    } as const;

    account = this.declared<PurchaseOrderAccount | null>('account');
    billTotal = this.declared<string | null>('billTotal');
    code = this.declared<string | null>('code');
    createdBy = this.declared<PurchaseOrderCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<unknown>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    dueTotal = this.declared<string | null>('dueTotal');
    expectedCompletionDate = this.declared<string | null>('expectedCompletionDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPriceTaxInclusive = this.declared<boolean | null>('isPriceTaxInclusive');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<PurchaseOrderLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    operationalStatus = this.declared<string | null>('operationalStatus');
    origin = this.declared<string | null>('origin');
    paidAmount = this.declared<string | null>('paidAmount');
    purchaseOrderNote = this.declared<string | null>('purchaseOrderNote');
    saleOrder = this.declared<unknown>('saleOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    supplierInvoiceId = this.declared<string | null>('supplierInvoiceId');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    version = this.declared<number | null>('version');
    warehouse = this.declared<unknown>('warehouse');
}

/** A page of PurchaseOrder records. */
export class PurchaseOrderList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseOrder),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseOrder | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `item` block of {@link PurchaseOrderLineRead}. */
export class Item extends Dto {
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

/** One entry of `lines` on {@link PurchaseOrderPurchaseInvoice}. */
export class Line extends Dto {
    static override FIELDS = {
        id: 'string',
        object: 'string',
        item: Item,
        quantity: 'int',
        uom: 'string',
        warehouse: 'string',
        subtotal: 'string',
        total: 'string',
        tax: 'string',
        accountingCode: 'string',
        version: 'int',
    } as const;

    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    item = this.declared<Item | null>('item');
    quantity = this.declared<number | null>('quantity');
    uom = this.declared<string | null>('uom');
    warehouse = this.declared<string | null>('warehouse');
    subtotal = this.declared<string | null>('subtotal');
    total = this.declared<string | null>('total');
    tax = this.declared<string | null>('tax');
    accountingCode = this.declared<string | null>('accountingCode');
    version = this.declared<number | null>('version');
}

/** The `kpis` block of {@link PurchaseOrderPurchaseInvoice}. */
export class Kpi extends Dto {
    static override FIELDS = {
        outstanding: 'string',
        overdue: 'string',
        lastPaymentDate: 'any',
        paymentApplied: 'string',
        creditApplied: 'string',
        creditIssued: 'string',
        lastReactivatedOn: 'any',
        lastCancelledOn: 'any',
        lastAmendedOn: 'any',
        voidedOn: 'any',
        deletedOn: 'any',
        object: 'string',
    } as const;

    outstanding = this.declared<string | null>('outstanding');
    overdue = this.declared<string | null>('overdue');
    lastPaymentDate = this.declared<unknown>('lastPaymentDate');
    paymentApplied = this.declared<string | null>('paymentApplied');
    creditApplied = this.declared<string | null>('creditApplied');
    creditIssued = this.declared<string | null>('creditIssued');
    lastReactivatedOn = this.declared<unknown>('lastReactivatedOn');
    lastCancelledOn = this.declared<unknown>('lastCancelledOn');
    lastAmendedOn = this.declared<unknown>('lastAmendedOn');
    voidedOn = this.declared<unknown>('voidedOn');
    deletedOn = this.declared<unknown>('deletedOn');
    object = this.declared<string | null>('object');
}

/** The `purchase_order` block of {@link PurchaseOrderPurchaseInvoice}. */
export class PurchaseOrderPurchaseInvoicePurchaseOrder extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The purchase order purchase invoice body. */
export class PurchaseOrderPurchaseInvoice extends Dto {
    static override ENVELOPE_KEY = 'purchase_invoice';

    static override FIELDS = {
        account: PurchaseOrderAccount,
        activityLogs: dtoList('any'),
        alternateDueDate: 'string',
        alternateIssueDate: 'string',
        createdBy: PurchaseOrderCreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: dtoList('any'),
        customForm: 'any',
        dueDate: 'string',
        id: 'string',
        issueDate: 'string',
        kpis: Kpi,
        lastUpdatedBy: PurchaseOrderLastUpdatedBy,
        lastUpdatedOn: 'string',
        lines: dtoList(Line),
        object: 'string',
        origin: 'string',
        paymentStatus: 'string',
        priceTaxInclusive: 'boolean',
        purchaseOrder: PurchaseOrderPurchaseInvoicePurchaseOrder,
        status: 'string',
        subtotal: 'string',
        tax: 'string',
        total: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    account = this.declared<PurchaseOrderAccount | null>('account');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    createdBy = this.declared<PurchaseOrderCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    customForm = this.declared<unknown>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    kpis = this.declared<Kpi | null>('kpis');
    lastUpdatedBy = this.declared<PurchaseOrderLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<Array<Line | null> | null>('lines');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paymentStatus = this.declared<string | null>('paymentStatus');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    purchaseOrder = this.declared<PurchaseOrderPurchaseInvoicePurchaseOrder | null>('purchaseOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    total = this.declared<string | null>('total');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** A page of PurchaseOrderPurchaseInvoice records. */
export class PurchaseOrderPurchaseInvoiceList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseOrderPurchaseInvoice),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseOrderPurchaseInvoice | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `payment_method` block of {@link PaymentMethodApplication}. */
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

/** The `payment_processor` block of {@link PaymentMethodApplication}. */
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

/** One entry of `payment_method_applications` on {@link PurchaseOrderPurchasePayment}. */
export class PaymentMethodApplication extends Dto {
    static override FIELDS = {
        amount: 'string',
        reference: 'string',
        paymentMethod: PaymentMethod,
        paymentProcessor: PaymentProcessor,
    } as const;

    amount = this.declared<string | null>('amount');
    reference = this.declared<string | null>('reference');
    paymentMethod = this.declared<PaymentMethod | null>('paymentMethod');
    paymentProcessor = this.declared<PaymentProcessor | null>('paymentProcessor');
}

/** The `purchase_credit_note` block of {@link CreditNoteApplication}. */
export class PurchaseCreditNote extends Dto {
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

/** One entry of `credit_note_applications` on {@link PurchaseOrderPurchasePayment}. */
export class CreditNoteApplication extends Dto {
    static override FIELDS = {
        amount: 'string',
        purchaseCreditNote: PurchaseCreditNote,
    } as const;

    amount = this.declared<string | null>('amount');
    purchaseCreditNote = this.declared<PurchaseCreditNote | null>('purchaseCreditNote');
}

/** The `purchase_invoice` block of {@link PurchaseInvoiceApplication}. */
export class PurchaseInvoice extends Dto {
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

/** One entry of `purchase_invoice_applications` on {@link PurchaseOrderPurchasePayment}. */
export class PurchaseInvoiceApplication extends Dto {
    static override FIELDS = {
        purchaseInvoice: PurchaseInvoice,
        applied: 'string',
        outstanding: 'string',
        total: 'string',
        issueDate: 'string',
        dueDate: 'string',
    } as const;

    purchaseInvoice = this.declared<PurchaseInvoice | null>('purchaseInvoice');
    applied = this.declared<string | null>('applied');
    outstanding = this.declared<string | null>('outstanding');
    total = this.declared<string | null>('total');
    issueDate = this.declared<string | null>('issueDate');
    dueDate = this.declared<string | null>('dueDate');
}

/** The purchase order purchase payment body. */
export class PurchaseOrderPurchasePayment extends Dto {
    static override FIELDS = {
        account: PurchaseOrderAccount,
        code: 'string',
        createdBy: PurchaseOrderCreatedBy,
        createdOn: 'string',
        creditNoteApplications: dtoList(CreditNoteApplication),
        creditNoteTotal: 'string',
        currency: Currency,
        href: 'string',
        id: 'string',
        lastUpdatedBy: PurchaseOrderLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        origin: 'string',
        paidTotal: 'string',
        paymentDate: 'string',
        paymentMethodApplications: dtoList(PaymentMethodApplication),
        paymentNote: 'string',
        paymentReference: 'any',
        purchaseInvoiceApplications: dtoList(PurchaseInvoiceApplication),
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<PurchaseOrderAccount | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<PurchaseOrderCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditNoteApplications = this.declared<Array<CreditNoteApplication | null> | null>('creditNoteApplications');
    creditNoteTotal = this.declared<string | null>('creditNoteTotal');
    currency = this.declared<Currency | null>('currency');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<PurchaseOrderLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<string | null>('origin');
    paidTotal = this.declared<string | null>('paidTotal');
    paymentDate = this.declared<string | null>('paymentDate');
    paymentMethodApplications = this.declared<Array<PaymentMethodApplication | null> | null>(
        'paymentMethodApplications',
    );
    paymentNote = this.declared<string | null>('paymentNote');
    paymentReference = this.declared<unknown>('paymentReference');
    purchaseInvoiceApplications = this.declared<Array<PurchaseInvoiceApplication | null> | null>(
        'purchaseInvoiceApplications',
    );
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of PurchaseOrderPurchasePayment records. */
export class PurchaseOrderPurchasePaymentList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseOrderPurchasePayment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseOrderPurchasePayment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `purchase_order` block of {@link PurchaseOrdersNote}. */
export class PurchaseOrdersNotePurchaseOrder extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `watchers` on {@link PurchaseOrdersNote}. */
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

/** One entry of `attachments` on {@link PurchaseOrdersNote}. */
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

/** The purchase orders note body. */
export class PurchaseOrdersNote extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(Attachment),
        content: 'string',
        createdBy: PurchaseOrderCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        purchaseOrder: PurchaseOrdersNotePurchaseOrder,
        user: 'any',
        version: 'int',
        watchers: dtoList(Watcher),
    } as const;

    attachments = this.declared<Array<Attachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<PurchaseOrderCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    purchaseOrder = this.declared<PurchaseOrdersNotePurchaseOrder | null>('purchaseOrder');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
}

/** A page of PurchaseOrdersNote records. */
export class PurchaseOrdersNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseOrdersNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseOrdersNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `custom_attributes` on {@link PurchaseOrderRead}. */
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

/** The `kpis` block of {@link PurchaseOrderRead}. */
export class PurchaseOrderReadKpi extends Dto {
    static override FIELDS = {
        object: 'string',
        totalExpense: 'string',
        estimatedTotal: 'string',
        totalOutstanding: 'string',
        totalOverdue: 'string',
        lastInvoiceIssueDate: 'any',
        lastInvoiceTotal: 'string',
        totalPurchaseInvoice: 'int',
        lastReactivatedOn: 'any',
        lastCancelledOn: 'any',
        lastChangedOn: 'any',
        lastDeletedOn: 'any',
        issueDate: 'any',
    } as const;

    object = this.declared<string | null>('object');
    totalExpense = this.declared<string | null>('totalExpense');
    estimatedTotal = this.declared<string | null>('estimatedTotal');
    totalOutstanding = this.declared<string | null>('totalOutstanding');
    totalOverdue = this.declared<string | null>('totalOverdue');
    lastInvoiceIssueDate = this.declared<unknown>('lastInvoiceIssueDate');
    lastInvoiceTotal = this.declared<string | null>('lastInvoiceTotal');
    totalPurchaseInvoice = this.declared<number | null>('totalPurchaseInvoice');
    lastReactivatedOn = this.declared<unknown>('lastReactivatedOn');
    lastCancelledOn = this.declared<unknown>('lastCancelledOn');
    lastChangedOn = this.declared<unknown>('lastChangedOn');
    lastDeletedOn = this.declared<unknown>('lastDeletedOn');
    issueDate = this.declared<unknown>('issueDate');
}

/** The purchase order read body. */
export class PurchaseOrderRead extends Dto {
    static override ENVELOPE_KEY = 'purchase_order';

    static override FIELDS = {
        account: PurchaseOrderAccount,
        billTotal: 'string',
        code: 'string',
        createdBy: PurchaseOrderCreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: dtoList(CustomAttribute),
        customForm: CustomForm,
        dueDate: 'string',
        dueTotal: 'string',
        expectedCompletionDate: 'string',
        href: 'string',
        id: 'string',
        isPriceTaxInclusive: 'boolean',
        issueDate: 'string',
        kpis: PurchaseOrderReadKpi,
        lastUpdatedBy: PurchaseOrderLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        operationalStatus: 'string',
        origin: 'string',
        paidAmount: 'string',
        purchaseOrderNote: 'string',
        saleOrder: 'any',
        status: 'string',
        subtotal: 'string',
        supplierInvoiceId: 'string',
        taxTotal: 'string',
        total: 'string',
        version: 'int',
        warehouse: 'any',
    } as const;

    account = this.declared<PurchaseOrderAccount | null>('account');
    billTotal = this.declared<string | null>('billTotal');
    code = this.declared<string | null>('code');
    createdBy = this.declared<PurchaseOrderCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    dueTotal = this.declared<string | null>('dueTotal');
    expectedCompletionDate = this.declared<string | null>('expectedCompletionDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPriceTaxInclusive = this.declared<boolean | null>('isPriceTaxInclusive');
    issueDate = this.declared<string | null>('issueDate');
    kpis = this.declared<PurchaseOrderReadKpi | null>('kpis');
    lastUpdatedBy = this.declared<PurchaseOrderLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    operationalStatus = this.declared<string | null>('operationalStatus');
    origin = this.declared<string | null>('origin');
    paidAmount = this.declared<string | null>('paidAmount');
    purchaseOrderNote = this.declared<string | null>('purchaseOrderNote');
    saleOrder = this.declared<unknown>('saleOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    supplierInvoiceId = this.declared<string | null>('supplierInvoiceId');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    version = this.declared<number | null>('version');
    warehouse = this.declared<unknown>('warehouse');
}

/** The `account` block of {@link PurchaseOrders}. */
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

/** The `created_by` block of {@link PurchaseOrders}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link PurchaseOrderUpdated}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The purchase order updated body. */
export class PurchaseOrderUpdated extends Dto {
    static override ENVELOPE_KEY = 'purchase_order';

    static override FIELDS = {
        account: Account,
        accountId: 'string',
        activityLogs: 'any',
        billTotal: 'string',
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: 'any',
        customForm: CustomForm,
        customObjects: 'any',
        dueDate: 'string',
        dueTotal: 'string',
        expectedCompletionDate: 'string',
        href: 'string',
        id: 'string',
        isPriceTaxInclusive: 'any',
        issueDate: 'string',
        kpis: PurchaseOrderReadKpi,
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        lines: 'any',
        object: 'string',
        operationalStatus: 'string',
        origin: 'string',
        paidAmount: 'string',
        priceTaxInclusive: 'string',
        purchaseOrderNote: 'string',
        saleOrder: 'any',
        saleOrderId: 'string',
        status: 'string',
        subtotal: 'string',
        supplierInvoiceId: 'string',
        tax: 'string',
        taxTotal: 'string',
        total: 'string',
        uuid: 'string',
        version: 'int',
        warehouse: 'any',
    } as const;

    account = this.declared<Account | null>('account');
    accountId = this.declared<string | null>('accountId');
    activityLogs = this.declared<unknown>('activityLogs');
    billTotal = this.declared<string | null>('billTotal');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<unknown>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    customObjects = this.declared<unknown>('customObjects');
    dueDate = this.declared<string | null>('dueDate');
    dueTotal = this.declared<string | null>('dueTotal');
    expectedCompletionDate = this.declared<string | null>('expectedCompletionDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPriceTaxInclusive = this.declared<unknown>('isPriceTaxInclusive');
    issueDate = this.declared<string | null>('issueDate');
    kpis = this.declared<PurchaseOrderReadKpi | null>('kpis');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<unknown>('lines');
    object = this.declared<string | null>('object');
    operationalStatus = this.declared<string | null>('operationalStatus');
    origin = this.declared<string | null>('origin');
    paidAmount = this.declared<string | null>('paidAmount');
    priceTaxInclusive = this.declared<string | null>('priceTaxInclusive');
    purchaseOrderNote = this.declared<string | null>('purchaseOrderNote');
    saleOrder = this.declared<unknown>('saleOrder');
    saleOrderId = this.declared<string | null>('saleOrderId');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    supplierInvoiceId = this.declared<string | null>('supplierInvoiceId');
    tax = this.declared<string | null>('tax');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
    warehouse = this.declared<unknown>('warehouse');
}

/** The purchase orders body. */
export class PurchaseOrders extends Dto {
    static override ENVELOPE_KEY = 'purchase_order';

    static override FIELDS = {
        account: Account,
        accountId: 'string',
        activityLogs: 'any',
        billTotal: 'string',
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        customAttributes: 'any',
        customForm: CustomForm,
        customObjects: 'any',
        dueDate: 'string',
        dueTotal: 'string',
        expectedCompletionDate: 'string',
        href: 'string',
        id: 'string',
        isPriceTaxInclusive: 'any',
        issueDate: 'string',
        kpis: PurchaseOrderReadKpi,
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        lines: 'any',
        object: 'string',
        operationalStatus: 'string',
        origin: 'string',
        paidAmount: 'string',
        priceTaxInclusive: 'string',
        purchaseOrderNote: 'string',
        saleOrder: 'any',
        status: 'string',
        subtotal: 'string',
        supplierInvoiceId: 'string',
        tax: 'string',
        taxTotal: 'string',
        total: 'string',
        uuid: 'string',
        version: 'int',
        warehouse: 'any',
    } as const;

    account = this.declared<Account | null>('account');
    accountId = this.declared<string | null>('accountId');
    activityLogs = this.declared<unknown>('activityLogs');
    billTotal = this.declared<string | null>('billTotal');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<unknown>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    customObjects = this.declared<unknown>('customObjects');
    dueDate = this.declared<string | null>('dueDate');
    dueTotal = this.declared<string | null>('dueTotal');
    expectedCompletionDate = this.declared<string | null>('expectedCompletionDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPriceTaxInclusive = this.declared<unknown>('isPriceTaxInclusive');
    issueDate = this.declared<string | null>('issueDate');
    kpis = this.declared<PurchaseOrderReadKpi | null>('kpis');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<unknown>('lines');
    object = this.declared<string | null>('object');
    operationalStatus = this.declared<string | null>('operationalStatus');
    origin = this.declared<string | null>('origin');
    paidAmount = this.declared<string | null>('paidAmount');
    priceTaxInclusive = this.declared<string | null>('priceTaxInclusive');
    purchaseOrderNote = this.declared<string | null>('purchaseOrderNote');
    saleOrder = this.declared<unknown>('saleOrder');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    supplierInvoiceId = this.declared<string | null>('supplierInvoiceId');
    tax = this.declared<string | null>('tax');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
    warehouse = this.declared<unknown>('warehouse');
}

/** The purchase order information body. */
export class PurchaseOrderInformation extends Dto {
    static override ENVELOPE_KEY = 'purchase_order';

    static override FIELDS = {
        billTotal: 'string',
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        customAttributes: dtoList(CustomAttribute),
        customForm: CustomForm,
        dueDate: 'string',
        dueTotal: 'string',
        expectedCompletionDate: 'string',
        href: 'string',
        id: 'string',
        isPriceTaxInclusive: 'boolean',
        issueDate: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        operationalStatus: 'string',
        origin: 'string',
        paidAmount: 'string',
        purchaseOrderNote: 'string',
        status: 'string',
        subtotal: 'string',
        supplierInvoiceId: 'string',
        taxTotal: 'string',
        total: 'string',
        version: 'int',
    } as const;

    billTotal = this.declared<string | null>('billTotal');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    dueDate = this.declared<string | null>('dueDate');
    dueTotal = this.declared<string | null>('dueTotal');
    expectedCompletionDate = this.declared<string | null>('expectedCompletionDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPriceTaxInclusive = this.declared<boolean | null>('isPriceTaxInclusive');
    issueDate = this.declared<string | null>('issueDate');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    operationalStatus = this.declared<string | null>('operationalStatus');
    origin = this.declared<string | null>('origin');
    paidAmount = this.declared<string | null>('paidAmount');
    purchaseOrderNote = this.declared<string | null>('purchaseOrderNote');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    supplierInvoiceId = this.declared<string | null>('supplierInvoiceId');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    version = this.declared<number | null>('version');
}

/** One entry of `data` on {@link AccountPurchaseOrders}. */
export class AccountPurchaseOrder extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        operationalStatus: 'string',
        code: 'string',
        account: Account,
        supplierInvoiceId: 'string',
        origin: 'string',
        currency: Currency,
        warehouse: 'any',
        saleOrder: 'any',
        issueDate: 'string',
        dueDate: 'string',
        expectedCompletionDate: 'string',
        isPriceTaxInclusive: 'boolean',
        purchaseOrderNote: 'string',
        subtotal: 'string',
        taxTotal: 'string',
        total: 'string',
        dueTotal: 'string',
        paidAmount: 'string',
        billTotal: 'string',
        customAttributes: dtoList('any'),
        customForm: CustomForm,
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: CreatedBy,
        lastUpdatedBy: LastUpdatedBy,
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    operationalStatus = this.declared<string | null>('operationalStatus');
    code = this.declared<string | null>('code');
    account = this.declared<Account | null>('account');
    supplierInvoiceId = this.declared<string | null>('supplierInvoiceId');
    origin = this.declared<string | null>('origin');
    currency = this.declared<Currency | null>('currency');
    warehouse = this.declared<unknown>('warehouse');
    saleOrder = this.declared<unknown>('saleOrder');
    issueDate = this.declared<string | null>('issueDate');
    dueDate = this.declared<string | null>('dueDate');
    expectedCompletionDate = this.declared<string | null>('expectedCompletionDate');
    isPriceTaxInclusive = this.declared<boolean | null>('isPriceTaxInclusive');
    purchaseOrderNote = this.declared<string | null>('purchaseOrderNote');
    subtotal = this.declared<string | null>('subtotal');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    dueTotal = this.declared<string | null>('dueTotal');
    paidAmount = this.declared<string | null>('paidAmount');
    billTotal = this.declared<string | null>('billTotal');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** The account purchase orders body. */
export class AccountPurchaseOrders extends Dto {
    static override FIELDS = {
        data: dtoList(AccountPurchaseOrder),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<AccountPurchaseOrder | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The purchase order notes body. */
export class PurchaseOrderNotes extends Dto {
    static override FIELDS = {
        data: dtoList(PurchaseOrdersNote),
        notes: 'any',
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<PurchaseOrdersNote | null> | null>('data');
    notes = this.declared<unknown>('notes');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The purchase order note body. */
export class PurchaseOrderNote extends Dto {
    static override ENVELOPE_KEY = 'purchase_order';

    static override FIELDS = {
        note: 'any',
    } as const;

    note = this.declared<unknown>('note');
}

/** The `uom` block of {@link PurchaseOrderLineRead}. */
export class Uom extends Dto {
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

/** The `warehouse` block of {@link PurchaseOrderLineRead}. */
export class Warehouse extends Dto {
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

/** The `tax` block of {@link PurchaseOrderLineRead}. */
export class Tax extends Dto {
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

/** The `pricing_rule` block of {@link ItemPriceSnapshot}. */
export class PricingRule extends Dto {
    static override FIELDS = {
        uuid: 'string',
        version: 'string',
        priceType: 'string',
        price: 'float',
        uom: 'string',
        pricingVersion: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    version = this.declared<string | null>('version');
    priceType = this.declared<string | null>('priceType');
    price = this.declared<number | null>('price');
    uom = this.declared<string | null>('uom');
    pricingVersion = this.declared<string | null>('pricingVersion');
}

/** The `item_price_snapshot` block of {@link PurchaseOrderLineRead}. */
export class ItemPriceSnapshot extends Dto {
    static override FIELDS = {
        pricingRule: PricingRule,
    } as const;

    pricingRule = this.declared<PricingRule | null>('pricingRule');
}

/** The `item_price_tax` block of {@link PurchaseOrderLineRead}. */
export class ItemPriceTax extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        rate: 'float',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    rate = this.declared<number | null>('rate');
    href = this.declared<string | null>('href');
}

/** The `tax_code` block of {@link ItemPurchaseTaxConfiguration}. */
export class TaxCode extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        rate: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    rate = this.declared<string | null>('rate');
    href = this.declared<string | null>('href');
}

/** The `item_purchase_tax_configuration` block of {@link PurchaseOrderLineRead}. */
export class ItemPurchaseTaxConfiguration extends Dto {
    static override FIELDS = {
        taxExemptWhenPurchase: 'boolean',
        purchasePriceIsTaxInclusive: 'boolean',
        taxCode: TaxCode,
    } as const;

    taxExemptWhenPurchase = this.declared<boolean | null>('taxExemptWhenPurchase');
    purchasePriceIsTaxInclusive = this.declared<boolean | null>('purchasePriceIsTaxInclusive');
    taxCode = this.declared<TaxCode | null>('taxCode');
}

/** The `item_accounting_code` block of {@link PurchaseOrderLineRead}. */
export class ItemAccountingCode extends Dto {
    static override FIELDS = {
        costOfGoodsSold: 'string',
    } as const;

    costOfGoodsSold = this.declared<string | null>('costOfGoodsSold');
}

/** The `item_purchase_accounting_code` block of {@link PurchaseOrderLineRead}. */
export class ItemPurchaseAccountingCode extends Dto {
    static override FIELDS = {
        costOfGoodsSold: 'string',
    } as const;

    costOfGoodsSold = this.declared<string | null>('costOfGoodsSold');
}

/** The purchase order line read body. */
export class PurchaseOrderLineRead extends Dto {
    static override ENVELOPE_KEY = 'purchase_order_line';

    static override FIELDS = {
        createdOn: 'string',
        flatDiscount: 'float',
        href: 'string',
        id: 'string',
        isPriceTaxInclusive: 'boolean',
        isTaxExempt: 'boolean',
        item: Item,
        itemAccountingCode: ItemAccountingCode,
        itemDiscountAmount: 'float',
        itemExpectedCompletionDate: 'string',
        itemInvoiceNote: 'any',
        itemPriceSnapshot: ItemPriceSnapshot,
        itemPriceTax: ItemPriceTax,
        itemPriceTaxExempt: 'boolean',
        itemPurchaseAccountingCode: ItemPurchaseAccountingCode,
        itemPurchaseTaxConfiguration: ItemPurchaseTaxConfiguration,
        lastUpdatedOn: 'string',
        line: 'any',
        name: 'string',
        object: 'string',
        price: 'float',
        purchaseLineNote: 'any',
        quantity: 'int',
        sortIndex: 'int',
        status: 'string',
        subtotal: 'string',
        tax: Tax,
        taxTotal: 'string',
        total: 'string',
        uom: Uom,
        version: 'int',
        warehouse: Warehouse,
    } as const;

    createdOn = this.declared<string | null>('createdOn');
    flatDiscount = this.declared<number | null>('flatDiscount');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPriceTaxInclusive = this.declared<boolean | null>('isPriceTaxInclusive');
    isTaxExempt = this.declared<boolean | null>('isTaxExempt');
    item = this.declared<Item | null>('item');
    itemAccountingCode = this.declared<ItemAccountingCode | null>('itemAccountingCode');
    itemDiscountAmount = this.declared<number | null>('itemDiscountAmount');
    itemExpectedCompletionDate = this.declared<string | null>('itemExpectedCompletionDate');
    itemInvoiceNote = this.declared<unknown>('itemInvoiceNote');
    itemPriceSnapshot = this.declared<ItemPriceSnapshot | null>('itemPriceSnapshot');
    itemPriceTax = this.declared<ItemPriceTax | null>('itemPriceTax');
    itemPriceTaxExempt = this.declared<boolean | null>('itemPriceTaxExempt');
    itemPurchaseAccountingCode = this.declared<ItemPurchaseAccountingCode | null>('itemPurchaseAccountingCode');
    itemPurchaseTaxConfiguration = this.declared<ItemPurchaseTaxConfiguration | null>('itemPurchaseTaxConfiguration');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    line = this.declared<unknown>('line');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    price = this.declared<number | null>('price');
    purchaseLineNote = this.declared<unknown>('purchaseLineNote');
    quantity = this.declared<number | null>('quantity');
    sortIndex = this.declared<number | null>('sortIndex');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<Tax | null>('tax');
    taxTotal = this.declared<string | null>('taxTotal');
    total = this.declared<string | null>('total');
    uom = this.declared<Uom | null>('uom');
    version = this.declared<number | null>('version');
    warehouse = this.declared<Warehouse | null>('warehouse');
}

/** One entry of `data` on {@link PurchaseOrderNoteFileList}. */
export class PurchaseOrderNoteFile extends Dto {
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

/** A page of PurchaseOrderNoteFile records. */
export class PurchaseOrderNoteFileList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(PurchaseOrderNoteFile),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<PurchaseOrderNoteFile | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/**
 * What `getPurchaseOrderKpis` answers, under `purchase_order_kpis`: the block a purchase order carries as `kpis`.
 */
export class PurchaseOrderKpis extends Dto {
    static override ENVELOPE_KEY = 'purchase_order_kpis';

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

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    PurchaseOrderLine: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/lines'],
    PurchaseOrderLineList: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/lines'],
    PurchaseOrder: ['GET /api/{api_version}/purchase_orders'],
    PurchaseOrderList: ['GET /api/{api_version}/purchase_orders'],
    PurchaseOrderPurchaseInvoice: [
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices',
        'POST /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices',
    ],
    PurchaseOrderPurchaseInvoiceList: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices'],
    PurchaseOrderPurchasePayment: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_payments'],
    PurchaseOrderPurchasePaymentList: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/purchase_payments'],
    PurchaseOrdersNote: [
        'GET /api/{api_version}/purchase_orders/notes',
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes',
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}',
        'POST /api/{api_version}/purchase_orders/{purchase_order_id}/notes',
    ],
    PurchaseOrdersNoteList: ['GET /api/{api_version}/purchase_orders/notes'],
    PurchaseOrderRead: [
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}',
        'POST /api/{api_version}/purchase_orders/{purchase_order_id}/change',
    ],
    PurchaseOrderUpdated: [
        'PATCH /api/{api_version}/purchase_orders/{purchase_order_id}',
        'POST /api/{api_version}/purchase_orders/{purchase_order_id}/cancel',
        'POST /api/{api_version}/purchase_orders/{purchase_order_id}/reactivate',
    ],
    PurchaseOrders: ['POST /api/{api_version}/purchase_orders'],
    PurchaseOrderInformation: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/information'],
    AccountPurchaseOrders: ['GET /api/{api_version}/accounts/{account_id}/purchase_orders'],
    PurchaseOrderNotes: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes'],
    PurchaseOrderLineRead: [
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/lines/{purchase_order_line_uuid}',
    ],
    PurchaseOrderNoteFileList: [
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files',
    ],
    PurchaseOrderNoteFile: [
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files',
        'GET /api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files/{purchase_order_file_id}',
    ],
    AccountPurchaseOrder: ['GET /api/{api_version}/accounts/{account_id}/purchase_orders'],
    PurchaseOrderKpis: ['GET /api/{api_version}/purchase_orders/{purchase_order_id}/kpis'],
};

sealDtoSchema(
    PurchaseOrderLine,
    PurchaseOrderLineList,
    PurchaseOrder,
    PurchaseOrderList,
    PurchaseOrderPurchaseInvoice,
    PurchaseOrderPurchaseInvoiceList,
    PurchaseOrderPurchasePayment,
    PurchaseOrderPurchasePaymentList,
    PurchaseOrdersNote,
    PurchaseOrdersNoteList,
    PurchaseOrderRead,
    PurchaseOrderUpdated,
    PurchaseOrders,
    PurchaseOrderInformation,
    AccountPurchaseOrders,
    PurchaseOrderNotes,
    PurchaseOrderNote,
    PurchaseOrderLineRead,
    Item,
    Line,
    Kpi,
    PurchaseOrdersNotePurchaseOrder,
    Account,
    CreatedBy,
    LastUpdatedBy,
    Uom,
    Warehouse,
    Tax,
    PricingRule,
    ItemPriceSnapshot,
    ItemPriceTax,
    TaxCode,
    ItemPurchaseTaxConfiguration,
    ItemAccountingCode,
    ItemPurchaseAccountingCode,
    PurchaseOrderNoteFile,
    PurchaseOrderNoteFileList,
    PurchaseOrderLineItem,
    PurchaseOrderLineUom,
    PurchaseOrderLineWarehouse,
    PurchaseOrderLineTax,
    PurchaseOrderLineItemPriceSnapshotPricingRule,
    PurchaseOrderLineItemPriceSnapshot,
    PurchaseOrderLineItemPriceTax,
    PurchaseOrderLineItemPurchaseTaxConfigurationTaxCode,
    PurchaseOrderLineItemPurchaseTaxConfiguration,
    PurchaseOrderLineItemAccountingCode,
    PurchaseOrderLineItemPurchaseAccountingCode,
    Currency,
    CustomForm,
    PurchaseOrderAccount,
    PurchaseOrderCreatedBy,
    PurchaseOrderLastUpdatedBy,
    PurchaseOrderPurchaseInvoicePurchaseOrder,
    PaymentMethod,
    PaymentProcessor,
    PaymentMethodApplication,
    PurchaseCreditNote,
    CreditNoteApplication,
    PurchaseInvoice,
    PurchaseInvoiceApplication,
    Watcher,
    Attachment,
    CustomAttribute,
    PurchaseOrderReadKpi,
    AccountPurchaseOrder,
    PurchaseOrderKpis,
);
