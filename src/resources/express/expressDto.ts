/** Typed views over the v4 express bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
/** The `currency` block of {@link Express}. */
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

/** The `time_zone` block of {@link Express}. */
export class TimeZone extends Dto {
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

/** The `custom_form` block of {@link Express}. */
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

/** The `account` block of {@link Express}. */
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

/** The `proforma_properties` block of {@link BillingPreference}. */
export class ProformaProperty extends Dto {
    static override FIELDS = {
        acceptanceRequired: 'boolean',
        paymentRequired: 'boolean',
        acceptanceTerm: 'any',
        acceptanceDate: 'any',
        termsAndConditions: 'any',
    } as const;

    acceptanceRequired = this.declared<boolean | null>('acceptanceRequired');
    paymentRequired = this.declared<boolean | null>('paymentRequired');
    acceptanceTerm = this.declared<unknown>('acceptanceTerm');
    acceptanceDate = this.declared<unknown>('acceptanceDate');
    termsAndConditions = this.declared<unknown>('termsAndConditions');
}

/** The `billing_preferences` block of {@link Express}. */
export class BillingPreference extends Dto {
    static override FIELDS = {
        communicationProfile: 'string',
        invoiceMode: 'string',
        invoiceTerm: 'string',
        billingPeriod: 'string',
        consolidateInvoice: 'boolean',
        paymentProcessor: 'string',
        paymentMode: 'string',
        paymentTerm: 'string',
        paymentTermAlignment: 'string',
        fulfillmentMode: 'string',
        fulfillmentTerm: 'string',
        proformaProperties: ProformaProperty,
    } as const;

    communicationProfile = this.declared<string | null>('communicationProfile');
    invoiceMode = this.declared<string | null>('invoiceMode');
    invoiceTerm = this.declared<string | null>('invoiceTerm');
    billingPeriod = this.declared<string | null>('billingPeriod');
    consolidateInvoice = this.declared<boolean | null>('consolidateInvoice');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    paymentMode = this.declared<string | null>('paymentMode');
    paymentTerm = this.declared<string | null>('paymentTerm');
    paymentTermAlignment = this.declared<string | null>('paymentTermAlignment');
    fulfillmentMode = this.declared<string | null>('fulfillmentMode');
    fulfillmentTerm = this.declared<string | null>('fulfillmentTerm');
    proformaProperties = this.declared<ProformaProperty | null>('proformaProperties');
}

/** The `item` block of {@link Line}. */
export class Item extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        uuid: 'string',
        name: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    uuid = this.declared<string | null>('uuid');
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
        pricePeriod: 'string',
        pricingSchedule: 'string',
        pricingLevel: 'string',
        pricingMethod: 'string',
        warehouse: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    version = this.declared<string | null>('version');
    priceType = this.declared<string | null>('priceType');
    price = this.declared<number | null>('price');
    uom = this.declared<string | null>('uom');
    pricePeriod = this.declared<string | null>('pricePeriod');
    pricingSchedule = this.declared<string | null>('pricingSchedule');
    pricingLevel = this.declared<string | null>('pricingLevel');
    pricingMethod = this.declared<string | null>('pricingMethod');
    warehouse = this.declared<string | null>('warehouse');
}

/** The `item_price_snapshot` block of {@link Line}. */
export class ItemPriceSnapshot extends Dto {
    static override FIELDS = {
        pricingRule: PricingRule,
    } as const;

    pricingRule = this.declared<PricingRule | null>('pricingRule');
}

/** The `item_price_tax` block of {@link Line}. */
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

/** The `tax_code` block of {@link ItemSaleTaxConfiguration}. */
export class TaxCode extends Dto {
    static override FIELDS = {
        uuid: 'string',
        code: 'string',
        rate: 'string',
        link: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    code = this.declared<string | null>('code');
    rate = this.declared<string | null>('rate');
    link = this.declared<string | null>('link');
}

/** The `item_sale_tax_configuration` block of {@link Line}. */
export class ItemSaleTaxConfiguration extends Dto {
    static override FIELDS = {
        salePriceIsBasedOn: 'string',
        taxCode: TaxCode,
    } as const;

    salePriceIsBasedOn = this.declared<string | null>('salePriceIsBasedOn');
    taxCode = this.declared<TaxCode | null>('taxCode');
}

/** The `item_accounting_code` block of {@link Line}. */
export class ItemAccountingCode extends Dto {
    static override FIELDS = {
        salesRevenue: 'string',
    } as const;

    salesRevenue = this.declared<string | null>('salesRevenue');
}

/** The `pre_order_stock_details` block of {@link Line}. */
export class PreOrderStockDetail extends Dto {
    static override FIELDS = {
        pendingReserve: 'string',
        reserved: 'string',
        sold: 'string',
    } as const;

    pendingReserve = this.declared<string | null>('pendingReserve');
    reserved = this.declared<string | null>('reserved');
    sold = this.declared<string | null>('sold');
}

/** One entry of `lines` on {@link Express}. */
export class Line extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        chargeItemUuid: 'string',
        item: Item,
        itemOrderQuantity: 'int',
        itemDescription: 'string',
        itemInvoiceNote: 'string',
        shippingCost: 'float',
        itemPriceSnapshot: ItemPriceSnapshot,
        itemPriceTax: ItemPriceTax,
        itemSaleTaxConfiguration: ItemSaleTaxConfiguration,
        taxExemptWhenSold: 'boolean',
        itemType: 'string',
        itemChargeType: 'string',
        itemAccountingCode: ItemAccountingCode,
        itemCustomAttributes: dtoList('any'),
        expectedDeliveryDate: 'string',
        preOrderStockDetails: PreOrderStockDetail,
        version: 'int',
        total: 'string',
        subtotal: 'string',
        tax: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    chargeItemUuid = this.declared<string | null>('chargeItemUuid');
    item = this.declared<Item | null>('item');
    itemOrderQuantity = this.declared<number | null>('itemOrderQuantity');
    itemDescription = this.declared<string | null>('itemDescription');
    itemInvoiceNote = this.declared<string | null>('itemInvoiceNote');
    shippingCost = this.declared<number | null>('shippingCost');
    itemPriceSnapshot = this.declared<ItemPriceSnapshot | null>('itemPriceSnapshot');
    itemPriceTax = this.declared<ItemPriceTax | null>('itemPriceTax');
    itemSaleTaxConfiguration = this.declared<ItemSaleTaxConfiguration | null>('itemSaleTaxConfiguration');
    taxExemptWhenSold = this.declared<boolean | null>('taxExemptWhenSold');
    itemType = this.declared<string | null>('itemType');
    itemChargeType = this.declared<string | null>('itemChargeType');
    itemAccountingCode = this.declared<ItemAccountingCode | null>('itemAccountingCode');
    itemCustomAttributes = this.declared<Array<unknown | null> | null>('itemCustomAttributes');
    expectedDeliveryDate = this.declared<string | null>('expectedDeliveryDate');
    preOrderStockDetails = this.declared<PreOrderStockDetail | null>('preOrderStockDetails');
    version = this.declared<number | null>('version');
    total = this.declared<string | null>('total');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
}

/** The `kpis` block of {@link Express}. */
export class Kpi extends Dto {
    static override FIELDS = {
        startDate: 'any',
        estimatedTotal: 'string',
        totalRevenue: 'string',
        monthlyRecurringRevenue: 'string',
        totalCollected: 'string',
        totalOutstanding: 'string',
        totalDue: 'string',
        lastInvoiceIssueDate: 'any',
        lastInvoiceTotal: 'string',
        totalInvoice: 'int',
        nextInvoiceIssueDate: 'any',
        object: 'string',
        lastReactivatedAt: 'any',
        lastCancelledAt: 'any',
        lastChangedAt: 'any',
        deletedAt: 'any',
    } as const;

    startDate = this.declared<unknown>('startDate');
    estimatedTotal = this.declared<string | null>('estimatedTotal');
    totalRevenue = this.declared<string | null>('totalRevenue');
    monthlyRecurringRevenue = this.declared<string | null>('monthlyRecurringRevenue');
    totalCollected = this.declared<string | null>('totalCollected');
    totalOutstanding = this.declared<string | null>('totalOutstanding');
    totalDue = this.declared<string | null>('totalDue');
    lastInvoiceIssueDate = this.declared<unknown>('lastInvoiceIssueDate');
    lastInvoiceTotal = this.declared<string | null>('lastInvoiceTotal');
    totalInvoice = this.declared<number | null>('totalInvoice');
    nextInvoiceIssueDate = this.declared<unknown>('nextInvoiceIssueDate');
    object = this.declared<string | null>('object');
    lastReactivatedAt = this.declared<unknown>('lastReactivatedAt');
    lastCancelledAt = this.declared<unknown>('lastCancelledAt');
    lastChangedAt = this.declared<unknown>('lastChangedAt');
    deletedAt = this.declared<unknown>('deletedAt');
}

/** One entry of `activity_logs` on {@link Express}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** The express body. */
export class Express extends Dto {
    static override ENVELOPE_KEY = 'express';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        orderType: 'string',
        preOrder: 'boolean',
        quoteOrder: 'boolean',
        quoteConverted: 'boolean',
        name: 'string',
        displayName: 'string',
        description: 'any',
        currency: Currency,
        timeZone: TimeZone,
        customForm: CustomForm,
        manager: 'any',
        salesRep: 'any',
        shippingProfile: 'any',
        account: Account,
        referralAccount: 'any',
        discountProfile: 'any',
        customerPurchaseOrderId: 'any',
        origin: 'any',
        invoiceNote: 'any',
        shippingCost: 'float',
        priceTaxInclusive: 'boolean',
        originalTotal: 'string',
        billingStartDate: 'string',
        orderStartDate: 'string',
        nextBillingFromDate: 'string',
        billingAddress: 'any',
        shippingAddress: 'any',
        communicationPreferences: dtoList('any'),
        allowContract: 'boolean',
        billingPreferences: BillingPreference,
        customAttributes: dtoList('any'),
        createdOn: 'string',
        lastUpdatedOn: 'any',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        version: 'int',
        lines: dtoList(Line),
        total: 'string',
        subtotal: 'string',
        tax: 'string',
        kpis: Kpi,
        shippingLineItems: dtoList('any'),
        activityLogs: dtoList(ActivityLog),
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    orderType = this.declared<string | null>('orderType');
    preOrder = this.declared<boolean | null>('preOrder');
    quoteOrder = this.declared<boolean | null>('quoteOrder');
    quoteConverted = this.declared<boolean | null>('quoteConverted');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<unknown>('description');
    currency = this.declared<Currency | null>('currency');
    timeZone = this.declared<TimeZone | null>('timeZone');
    customForm = this.declared<CustomForm | null>('customForm');
    manager = this.declared<unknown>('manager');
    salesRep = this.declared<unknown>('salesRep');
    shippingProfile = this.declared<unknown>('shippingProfile');
    account = this.declared<Account | null>('account');
    referralAccount = this.declared<unknown>('referralAccount');
    discountProfile = this.declared<unknown>('discountProfile');
    customerPurchaseOrderId = this.declared<unknown>('customerPurchaseOrderId');
    origin = this.declared<unknown>('origin');
    invoiceNote = this.declared<unknown>('invoiceNote');
    shippingCost = this.declared<number | null>('shippingCost');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    originalTotal = this.declared<string | null>('originalTotal');
    billingStartDate = this.declared<string | null>('billingStartDate');
    orderStartDate = this.declared<string | null>('orderStartDate');
    nextBillingFromDate = this.declared<string | null>('nextBillingFromDate');
    billingAddress = this.declared<unknown>('billingAddress');
    shippingAddress = this.declared<unknown>('shippingAddress');
    communicationPreferences = this.declared<Array<unknown | null> | null>('communicationPreferences');
    allowContract = this.declared<boolean | null>('allowContract');
    billingPreferences = this.declared<BillingPreference | null>('billingPreferences');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    lines = this.declared<Array<Line | null> | null>('lines');
    total = this.declared<string | null>('total');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    kpis = this.declared<Kpi | null>('kpis');
    shippingLineItems = this.declared<Array<unknown | null> | null>('shippingLineItems');
    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Express: ['POST /api/{api_version}/express'],
};

sealDtoSchema(
    Currency,
    TimeZone,
    CustomForm,
    Account,
    ProformaProperty,
    BillingPreference,
    Item,
    PricingRule,
    ItemPriceSnapshot,
    ItemPriceTax,
    TaxCode,
    ItemSaleTaxConfiguration,
    ItemAccountingCode,
    PreOrderStockDetail,
    Line,
    Kpi,
    ActivityLog,
    Express,
);
