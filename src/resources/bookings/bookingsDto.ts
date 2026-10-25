/** Typed views over the v4 bookings bodies. */

import {Dto, dtoList, dtoOneOf, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `contract_properties` block of {@link Booking}. */
export class ContractProperty extends Dto {
    static override FIELDS = {
        requireCustomerAcceptance: 'boolean',
        requiresPaymentMethod: 'boolean',
        initialContractTerm: 'string',
        renewAutomatically: 'string',
        autoRenewalEndsOn: 'string',
        autoRenewalTerm: 'string',
        autoRenewalRequireCustomerAcceptance: 'boolean',
        allowEarlyTermination: 'boolean',
        terminationAccountingCode: 'string',
        allowPostponement: 'boolean',
        allowTrial: 'boolean',
        allowDowngrade: 'boolean',
        periodBeforeDowngrade: 'string',
        allowDowngradeCharge: 'boolean',
        downgradeChargeType: 'string',
        downgradeChargeFixed: 'string',
        allowUpgrade: 'boolean',
        terminationNoticePeriod: 'string',
    } as const;

    requireCustomerAcceptance = this.declared<boolean | null>('requireCustomerAcceptance');
    requiresPaymentMethod = this.declared<boolean | null>('requiresPaymentMethod');
    initialContractTerm = this.declared<string | null>('initialContractTerm');
    renewAutomatically = this.declared<string | null>('renewAutomatically');
    autoRenewalEndsOn = this.declared<string | null>('autoRenewalEndsOn');
    autoRenewalTerm = this.declared<string | null>('autoRenewalTerm');
    autoRenewalRequireCustomerAcceptance = this.declared<boolean | null>('autoRenewalRequireCustomerAcceptance');
    allowEarlyTermination = this.declared<boolean | null>('allowEarlyTermination');
    terminationAccountingCode = this.declared<string | null>('terminationAccountingCode');
    allowPostponement = this.declared<boolean | null>('allowPostponement');
    allowTrial = this.declared<boolean | null>('allowTrial');
    allowDowngrade = this.declared<boolean | null>('allowDowngrade');
    periodBeforeDowngrade = this.declared<string | null>('periodBeforeDowngrade');
    allowDowngradeCharge = this.declared<boolean | null>('allowDowngradeCharge');
    downgradeChargeType = this.declared<string | null>('downgradeChargeType');
    downgradeChargeFixed = this.declared<string | null>('downgradeChargeFixed');
    allowUpgrade = this.declared<boolean | null>('allowUpgrade');
    terminationNoticePeriod = this.declared<string | null>('terminationNoticePeriod');
}

/** The `currency` block of {@link Booking}. */
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

/** The `time_zone` block of {@link Booking}. */
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

/** The `custom_form` block of {@link Booking}. */
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

/** The `manager` block of {@link Booking}. */
export class Manager extends Dto {
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

/** The `sales_rep` block of {@link Booking}. */
export class SalesRep extends Dto {
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

/** The `shipping_profile` block of {@link Booking}. */
export class ShippingProfile extends Dto {
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

/** The `account` block of {@link Booking}. */
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

/** The `referral_account` block of {@link Booking}. */
export class ReferralAccount extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The `discount_profile` block of {@link Booking}. */
export class DiscountProfile extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
        type: 'string',
        amount: 'string',
        redemptionCode: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
    type = this.declared<string | null>('type');
    amount = this.declared<string | null>('amount');
    redemptionCode = this.declared<string | null>('redemptionCode');
}

/** The `billing_address` block of {@link Booking}. */
export class BillingAddress extends Dto {
    static override FIELDS = {
        city: 'string',
        name: 'string',
        state: 'string',
        country: 'string',
        addressLine1: 'string',
        addressLine2: 'string',
        addressLine3: 'string',
        addressLine4: 'string',
        addressLine5: 'string',
        postalCode: 'string',
    } as const;

    city = this.declared<string | null>('city');
    name = this.declared<string | null>('name');
    state = this.declared<string | null>('state');
    country = this.declared<string | null>('country');
    addressLine1 = this.declared<string | null>('addressLine1');
    addressLine2 = this.declared<string | null>('addressLine2');
    addressLine3 = this.declared<string | null>('addressLine3');
    addressLine4 = this.declared<string | null>('addressLine4');
    addressLine5 = this.declared<string | null>('addressLine5');
    postalCode = this.declared<string | null>('postalCode');
}

/** The `shipping_address` block of {@link Booking}. */
export class ShippingAddress extends Dto {
    static override FIELDS = {
        city: 'string',
        name: 'string',
        state: 'string',
        country: 'string',
        addressLine1: 'string',
        addressLine2: 'string',
        addressLine3: 'string',
        addressLine4: 'string',
        addressLine5: 'string',
        postalCode: 'string',
    } as const;

    city = this.declared<string | null>('city');
    name = this.declared<string | null>('name');
    state = this.declared<string | null>('state');
    country = this.declared<string | null>('country');
    addressLine1 = this.declared<string | null>('addressLine1');
    addressLine2 = this.declared<string | null>('addressLine2');
    addressLine3 = this.declared<string | null>('addressLine3');
    addressLine4 = this.declared<string | null>('addressLine4');
    addressLine5 = this.declared<string | null>('addressLine5');
    postalCode = this.declared<string | null>('postalCode');
}

/** One entry of `communication_preferences` on {@link Booking}. */
export class CommunicationPreference extends Dto {
    static override FIELDS = {
        channel: 'string',
        enabled: 'boolean',
    } as const;

    channel = this.declared<string | null>('channel');
    enabled = this.declared<boolean | null>('enabled');
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

/** The `billing_preferences` block of {@link Booking}. */
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
        consolidateKey: 'string',
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
    consolidateKey = this.declared<string | null>('consolidateKey');
}

/** The booking body. */
export class Booking extends Dto {
    static override FIELDS = {
        account: Account,
        allowContract: 'boolean',
        billingAddress: BillingAddress,
        billingPreferences: BillingPreference,
        billingStartDate: 'string',
        billingStartDayOfMonth: 'string',
        communicationPreferences: dtoList(CommunicationPreference),
        contractProperties: ContractProperty,
        createdBy: 'any',
        createdOn: 'string',
        currency: Currency,
        customForm: CustomForm,
        customerPurchaseOrderId: 'string',
        description: 'string',
        discountProfile: DiscountProfile,
        displayName: 'string',
        id: 'string',
        invoiceNote: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        manager: Manager,
        name: 'string',
        nextBillingFromDate: 'string',
        nextBillingFromDateUtc: 'string',
        object: 'string',
        orderStartDate: 'string',
        orderType: 'string',
        origin: 'string',
        originalTotal: 'string',
        preOrder: 'boolean',
        priceTaxInclusive: 'boolean',
        quoteConverted: 'boolean',
        quoteOrder: 'boolean',
        referralAccount: ReferralAccount,
        salesRep: SalesRep,
        shippingAddress: ShippingAddress,
        shippingCost: 'float',
        shippingProfile: ShippingProfile,
        status: 'string',
        timeZone: TimeZone,
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    allowContract = this.declared<boolean | null>('allowContract');
    billingAddress = this.declared<BillingAddress | null>('billingAddress');
    billingPreferences = this.declared<BillingPreference | null>('billingPreferences');
    billingStartDate = this.declared<string | null>('billingStartDate');
    billingStartDayOfMonth = this.declared<string | null>('billingStartDayOfMonth');
    communicationPreferences = this.declared<Array<CommunicationPreference | null> | null>('communicationPreferences');
    contractProperties = this.declared<ContractProperty | null>('contractProperties');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customForm = this.declared<CustomForm | null>('customForm');
    customerPurchaseOrderId = this.declared<string | null>('customerPurchaseOrderId');
    description = this.declared<string | null>('description');
    discountProfile = this.declared<DiscountProfile | null>('discountProfile');
    displayName = this.declared<string | null>('displayName');
    id = this.declared<string | null>('id');
    invoiceNote = this.declared<string | null>('invoiceNote');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    manager = this.declared<Manager | null>('manager');
    name = this.declared<string | null>('name');
    nextBillingFromDate = this.declared<string | null>('nextBillingFromDate');
    nextBillingFromDateUtc = this.declared<string | null>('nextBillingFromDateUtc');
    object = this.declared<string | null>('object');
    orderStartDate = this.declared<string | null>('orderStartDate');
    orderType = this.declared<string | null>('orderType');
    origin = this.declared<string | null>('origin');
    originalTotal = this.declared<string | null>('originalTotal');
    preOrder = this.declared<boolean | null>('preOrder');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    quoteConverted = this.declared<boolean | null>('quoteConverted');
    quoteOrder = this.declared<boolean | null>('quoteOrder');
    referralAccount = this.declared<ReferralAccount | null>('referralAccount');
    salesRep = this.declared<SalesRep | null>('salesRep');
    shippingAddress = this.declared<ShippingAddress | null>('shippingAddress');
    shippingCost = this.declared<number | null>('shippingCost');
    shippingProfile = this.declared<ShippingProfile | null>('shippingProfile');
    status = this.declared<string | null>('status');
    timeZone = this.declared<TimeZone | null>('timeZone');
    version = this.declared<number | null>('version');
}

/** A page of Booking records. */
export class BookingList extends Dto {
    static override FIELDS = {
        data: dtoList(Booking),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Booking | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `custom_attributes` on {@link BookingById}. */
export class CustomAttribute extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        type: 'string',
        name: 'string',
        value: dtoOneOf('string', dtoList('string')),
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    value = this.declared<string | Array<string | null> | null>('value');
    href = this.declared<string | null>('href');
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
        href: 'string',
        rate: 'float',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
    rate = this.declared<number | null>('rate');
}

/** The `tax_code` block of {@link ItemSaleTaxConfiguration}. */
export class TaxCode extends Dto {
    static override FIELDS = {
        uuid: 'string',
        code: 'string',
        rate: dtoOneOf('string', 'float'),
        link: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    code = this.declared<string | null>('code');
    rate = this.declared<string | number | null>('rate');
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

/** The `sales_revenue` block of {@link ItemAccountingCode}. */
export class SalesRevenue extends Dto {
    static override FIELDS = {
        name: 'string',
    } as const;

    name = this.declared<string | null>('name');
}

/** The `item_accounting_code` block of {@link Line}. */
export class ItemAccountingCode extends Dto {
    static override FIELDS = {
        salesRevenue: dtoOneOf('string', SalesRevenue),
    } as const;

    salesRevenue = this.declared<string | SalesRevenue | null>('salesRevenue');
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

/** The `item_properties` block of {@link Line}. */
export class ItemProperty extends Dto {
    static override FIELDS = {
        billingMode: 'string',
        chargingStartDate: 'string',
        chargingAndBillingAlignment: 'string',
        proRataPartialPricingPeriod: 'string',
    } as const;

    billingMode = this.declared<string | null>('billingMode');
    chargingStartDate = this.declared<string | null>('chargingStartDate');
    chargingAndBillingAlignment = this.declared<string | null>('chargingAndBillingAlignment');
    proRataPartialPricingPeriod = this.declared<string | null>('proRataPartialPricingPeriod');
}

/** One entry of `lines` on {@link BookingById}. */
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
        itemProperties: ItemProperty,
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
    itemProperties = this.declared<ItemProperty | null>('itemProperties');
}

/** The `kpis` block of {@link BookingById}. */
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

/** The booking by id body. */
export class BookingById extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        account: Account,
        allowContract: 'boolean',
        billingAddress: BillingAddress,
        billingPreferences: BillingPreference,
        billingStartDate: 'string',
        communicationPreferences: dtoList(CommunicationPreference),
        createdBy: 'any',
        createdOn: 'string',
        currency: Currency,
        customAttributes: dtoList(CustomAttribute),
        customForm: CustomForm,
        customerPurchaseOrderId: 'string',
        description: 'string',
        discountProfile: 'any',
        displayName: 'string',
        id: 'string',
        invoiceNote: 'string',
        kpis: Kpi,
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        lines: dtoList(Line),
        manager: Manager,
        name: 'string',
        nextBillingFromDate: 'string',
        nextBillingFromDateUtc: 'string',
        object: 'string',
        orderStartDate: 'string',
        orderType: 'string',
        origin: 'string',
        originalTotal: 'any',
        preOrder: 'boolean',
        priceTaxInclusive: 'boolean',
        quoteConverted: 'boolean',
        quoteOrder: 'boolean',
        referralAccount: 'any',
        salesRep: 'any',
        shippingAddress: 'any',
        shippingCost: 'float',
        shippingLineItems: 'any',
        shippingProfile: 'any',
        status: 'string',
        subtotal: 'string',
        tax: 'string',
        timeZone: TimeZone,
        total: 'string',
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    allowContract = this.declared<boolean | null>('allowContract');
    billingAddress = this.declared<BillingAddress | null>('billingAddress');
    billingPreferences = this.declared<BillingPreference | null>('billingPreferences');
    billingStartDate = this.declared<string | null>('billingStartDate');
    communicationPreferences = this.declared<Array<CommunicationPreference | null> | null>('communicationPreferences');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    customerPurchaseOrderId = this.declared<string | null>('customerPurchaseOrderId');
    description = this.declared<string | null>('description');
    discountProfile = this.declared<unknown>('discountProfile');
    displayName = this.declared<string | null>('displayName');
    id = this.declared<string | null>('id');
    invoiceNote = this.declared<string | null>('invoiceNote');
    kpis = this.declared<Kpi | null>('kpis');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<Array<Line | null> | null>('lines');
    manager = this.declared<Manager | null>('manager');
    name = this.declared<string | null>('name');
    nextBillingFromDate = this.declared<string | null>('nextBillingFromDate');
    nextBillingFromDateUtc = this.declared<string | null>('nextBillingFromDateUtc');
    object = this.declared<string | null>('object');
    orderStartDate = this.declared<string | null>('orderStartDate');
    orderType = this.declared<string | null>('orderType');
    origin = this.declared<string | null>('origin');
    originalTotal = this.declared<unknown>('originalTotal');
    preOrder = this.declared<boolean | null>('preOrder');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    quoteConverted = this.declared<boolean | null>('quoteConverted');
    quoteOrder = this.declared<boolean | null>('quoteOrder');
    referralAccount = this.declared<unknown>('referralAccount');
    salesRep = this.declared<unknown>('salesRep');
    shippingAddress = this.declared<unknown>('shippingAddress');
    shippingCost = this.declared<number | null>('shippingCost');
    shippingLineItems = this.declared<unknown>('shippingLineItems');
    shippingProfile = this.declared<unknown>('shippingProfile');
    status = this.declared<string | null>('status');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    timeZone = this.declared<TimeZone | null>('timeZone');
    total = this.declared<string | null>('total');
    version = this.declared<number | null>('version');
}

/** One entry of a {@link BookingNote}'s `attachments`. */
export class BookingNoteAttachment extends Dto {
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

/** A {@link BookingNote}'s `created_by`. */
export class BookingNoteCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link BookingNote}'s `last_updated_by`. */
export class BookingNoteLastUpdatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** One entry of a {@link BookingNote}'s `watchers`. */
export class BookingNoteWatcher extends Dto {
    static override FIELDS = {
        email: 'string',
        name: 'string',
        type: 'string',
    } as const;

    email = this.declared<string | null>('email');
    name = this.declared<string | null>('name');
    type = this.declared<string | null>('type');
}

/** One entry of a {@link BookingNoteList}'s `data`. */
export class BookingNote extends Dto {
    static override FIELDS = {
        attachments: dtoList(BookingNoteAttachment),
        content: 'string',
        createdBy: BookingNoteCreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: BookingNoteLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        user: 'any',
        version: 'int',
        watchers: dtoList(BookingNoteWatcher),
    } as const;

    attachments = this.declared<Array<BookingNoteAttachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<BookingNoteCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<BookingNoteLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<BookingNoteWatcher | null> | null>('watchers');
}

/** One page of every order's notes, under `data`. */
export class BookingNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(BookingNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<BookingNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** A {@link BookingBillingPreferencesDetail}'s `proforma_properties`. */
export class BookingBillingPreferencesDetailProformaProperties extends Dto {
    static override FIELDS = {
        acceptanceDate: 'any',
        acceptanceRequired: 'boolean',
        acceptanceTerm: 'any',
        paymentRequired: 'boolean',
        termsAndConditions: 'any',
    } as const;

    acceptanceDate = this.declared<unknown>('acceptanceDate');
    acceptanceRequired = this.declared<boolean | null>('acceptanceRequired');
    acceptanceTerm = this.declared<unknown>('acceptanceTerm');
    paymentRequired = this.declared<boolean | null>('paymentRequired');
    termsAndConditions = this.declared<unknown>('termsAndConditions');
}

/** A {@link BookingBillingPreferencesView}'s `billing_preferences`. */
export class BookingBillingPreferencesDetail extends Dto {
    static override FIELDS = {
        billingPeriod: 'string',
        communicationProfile: 'string',
        consolidateInvoice: 'boolean',
        fulfillmentMode: 'string',
        fulfillmentTerm: 'string',
        invoiceMode: 'string',
        invoiceTerm: 'string',
        paymentMode: 'string',
        paymentProcessor: 'string',
        paymentTerm: 'string',
        paymentTermAlignment: 'string',
        proformaProperties: BookingBillingPreferencesDetailProformaProperties,
    } as const;

    billingPeriod = this.declared<string | null>('billingPeriod');
    communicationProfile = this.declared<string | null>('communicationProfile');
    consolidateInvoice = this.declared<boolean | null>('consolidateInvoice');
    fulfillmentMode = this.declared<string | null>('fulfillmentMode');
    fulfillmentTerm = this.declared<string | null>('fulfillmentTerm');
    invoiceMode = this.declared<string | null>('invoiceMode');
    invoiceTerm = this.declared<string | null>('invoiceTerm');
    paymentMode = this.declared<string | null>('paymentMode');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    paymentTerm = this.declared<string | null>('paymentTerm');
    paymentTermAlignment = this.declared<string | null>('paymentTermAlignment');
    proformaProperties = this.declared<BookingBillingPreferencesDetailProformaProperties | null>('proformaProperties');
}

/** What `getBookingBillingPreferences` answers, under `order`. */
export class BookingBillingPreferencesView extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        billingPreferences: BookingBillingPreferencesDetail,
        object: 'string',
    } as const;

    billingPreferences = this.declared<BookingBillingPreferencesDetail | null>('billingPreferences');
    object = this.declared<string | null>('object');
}

/** A {@link BookingLine}'s `item`. */
export class BookingLineItem extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        uuid: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    uuid = this.declared<string | null>('uuid');
}

/** A {@link BookingLine}'s `item_accounting_code`. */
export class BookingLineItemAccountingCode extends Dto {
    static override FIELDS = {
        salesRevenue: 'string',
    } as const;

    salesRevenue = this.declared<string | null>('salesRevenue');
}

/** A {@link BookingLineItemPriceSnapshot}'s `pricing_rule`. */
export class BookingLineItemPriceSnapshotPricingRule extends Dto {
    static override FIELDS = {
        price: 'float',
        pricePeriod: 'string',
        priceType: 'string',
        pricingLevel: 'string',
        pricingMethod: 'string',
        pricingSchedule: 'string',
        uom: 'string',
        uuid: 'string',
        version: 'string',
        warehouse: 'string',
    } as const;

    price = this.declared<number | null>('price');
    pricePeriod = this.declared<string | null>('pricePeriod');
    priceType = this.declared<string | null>('priceType');
    pricingLevel = this.declared<string | null>('pricingLevel');
    pricingMethod = this.declared<string | null>('pricingMethod');
    pricingSchedule = this.declared<string | null>('pricingSchedule');
    uom = this.declared<string | null>('uom');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<string | null>('version');
    warehouse = this.declared<string | null>('warehouse');
}

/** A {@link BookingLine}'s `item_price_snapshot`. */
export class BookingLineItemPriceSnapshot extends Dto {
    static override FIELDS = {
        pricingRule: BookingLineItemPriceSnapshotPricingRule,
    } as const;

    pricingRule = this.declared<BookingLineItemPriceSnapshotPricingRule | null>('pricingRule');
}

/** A {@link BookingLine}'s `item_price_tax`. */
export class BookingLineItemPriceTax extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        rate: 'float',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    rate = this.declared<number | null>('rate');
}

/** A {@link BookingLine}'s `item_properties`. */
export class BookingLineItemProperties extends Dto {
    static override FIELDS = {
        billingMode: 'string',
        chargingAndBillingAlignment: 'string',
        chargingStartDate: 'string',
        proRataPartialPricingPeriod: 'string',
    } as const;

    billingMode = this.declared<string | null>('billingMode');
    chargingAndBillingAlignment = this.declared<string | null>('chargingAndBillingAlignment');
    chargingStartDate = this.declared<string | null>('chargingStartDate');
    proRataPartialPricingPeriod = this.declared<string | null>('proRataPartialPricingPeriod');
}

/** A {@link BookingLineItemSaleTaxConfiguration}'s `tax_code`. */
export class BookingLineItemSaleTaxConfigurationTaxCode extends Dto {
    static override FIELDS = {
        code: 'string',
        link: 'string',
        rate: 'string',
        uuid: 'string',
    } as const;

    code = this.declared<string | null>('code');
    link = this.declared<string | null>('link');
    rate = this.declared<string | null>('rate');
    uuid = this.declared<string | null>('uuid');
}

/** A {@link BookingLine}'s `item_sale_tax_configuration`. */
export class BookingLineItemSaleTaxConfiguration extends Dto {
    static override FIELDS = {
        salePriceIsBasedOn: 'string',
        taxCode: BookingLineItemSaleTaxConfigurationTaxCode,
    } as const;

    salePriceIsBasedOn = this.declared<string | null>('salePriceIsBasedOn');
    taxCode = this.declared<BookingLineItemSaleTaxConfigurationTaxCode | null>('taxCode');
}

/** A {@link BookingLine}'s `pre_order_stock_details`. */
export class BookingLinePreOrderStockDetails extends Dto {
    static override FIELDS = {
        pendingReserve: 'string',
        reserved: 'string',
        sold: 'string',
    } as const;

    pendingReserve = this.declared<string | null>('pendingReserve');
    reserved = this.declared<string | null>('reserved');
    sold = this.declared<string | null>('sold');
}

/** What `getBookingLine` answers, under `order_line`. */
export class BookingLine extends Dto {
    static override ENVELOPE_KEY = 'order_line';

    static override FIELDS = {
        chargeItemUuid: 'string',
        expectedDeliveryDate: 'string',
        id: 'string',
        item: BookingLineItem,
        itemAccountingCode: BookingLineItemAccountingCode,
        itemChargeType: 'string',
        itemCustomAttributes: dtoList('any'),
        itemDescription: 'string',
        itemInvoiceNote: 'string',
        itemOrderQuantity: 'int',
        itemPriceSnapshot: BookingLineItemPriceSnapshot,
        itemPriceTax: BookingLineItemPriceTax,
        itemProperties: BookingLineItemProperties,
        itemSaleTaxConfiguration: BookingLineItemSaleTaxConfiguration,
        itemType: 'string',
        object: 'string',
        preOrderStockDetails: BookingLinePreOrderStockDetails,
        shippingCost: 'float',
        subtotal: 'string',
        tax: 'string',
        taxExemptWhenSold: 'boolean',
        total: 'string',
        version: 'int',
    } as const;

    chargeItemUuid = this.declared<string | null>('chargeItemUuid');
    expectedDeliveryDate = this.declared<string | null>('expectedDeliveryDate');
    id = this.declared<string | null>('id');
    item = this.declared<BookingLineItem | null>('item');
    itemAccountingCode = this.declared<BookingLineItemAccountingCode | null>('itemAccountingCode');
    itemChargeType = this.declared<string | null>('itemChargeType');
    itemCustomAttributes = this.declared<Array<unknown | null> | null>('itemCustomAttributes');
    itemDescription = this.declared<string | null>('itemDescription');
    itemInvoiceNote = this.declared<string | null>('itemInvoiceNote');
    itemOrderQuantity = this.declared<number | null>('itemOrderQuantity');
    itemPriceSnapshot = this.declared<BookingLineItemPriceSnapshot | null>('itemPriceSnapshot');
    itemPriceTax = this.declared<BookingLineItemPriceTax | null>('itemPriceTax');
    itemProperties = this.declared<BookingLineItemProperties | null>('itemProperties');
    itemSaleTaxConfiguration = this.declared<BookingLineItemSaleTaxConfiguration | null>('itemSaleTaxConfiguration');
    itemType = this.declared<string | null>('itemType');
    object = this.declared<string | null>('object');
    preOrderStockDetails = this.declared<BookingLinePreOrderStockDetails | null>('preOrderStockDetails');
    shippingCost = this.declared<number | null>('shippingCost');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    taxExemptWhenSold = this.declared<boolean | null>('taxExemptWhenSold');
    total = this.declared<string | null>('total');
    version = this.declared<number | null>('version');
}

/** One entry of a {@link BookingCustomObjectList}'s `data`. */
export class BookingCustomObjectEntry extends Dto {
    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        customComponent: 'any',
        description: 'any',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        relation: 'string',
        useIn: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customComponent = this.declared<unknown>('customComponent');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    relation = this.declared<string | null>('relation');
    useIn = this.declared<string | null>('useIn');
}

/** One page of the custom objects orders use, under `data`. */
export class BookingCustomObjectList extends Dto {
    static override FIELDS = {
        data: dtoList(BookingCustomObjectEntry),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<BookingCustomObjectEntry | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One custom object with the booking's instances of it, under `custom_object`. */
export class BookingCustomObject extends Dto {
    static override ENVELOPE_KEY = 'custom_object';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        customComponent: 'any',
        description: 'any',
        displayName: 'string',
        href: 'string',
        id: 'string',
        instances: dtoList('any'),
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        pagination: Pagination,
        relation: 'string',
        useIn: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customComponent = this.declared<unknown>('customComponent');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    instances = this.declared<Array<unknown | null> | null>('instances');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    relation = this.declared<string | null>('relation');
    useIn = this.declared<string | null>('useIn');
}

/** A {@link BookingInvoice}'s `account`. */
export class BookingInvoiceAccount extends Dto {
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

/** A {@link BookingInvoice}'s `created_by`. */
export class BookingInvoiceCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link BookingInvoice}'s `currency`. */
export class BookingInvoiceCurrency extends Dto {
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

/** A {@link BookingInvoice}'s `custom_form`. */
export class BookingInvoiceCustomForm extends Dto {
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

/** A {@link BookingInvoice}'s `order`. */
export class BookingInvoiceOrder extends Dto {
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

/** One entry of a {@link BookingInvoiceList}'s `data`. */
export class BookingInvoice extends Dto {
    static override FIELDS = {
        account: BookingInvoiceAccount,
        alternateBillingEndDate: 'string',
        alternateBillingStartDate: 'string',
        alternateDueDate: 'string',
        alternateIssueDate: 'string',
        billingEndDate: 'string',
        billingStartDate: 'string',
        createdBy: BookingInvoiceCreatedBy,
        createdOn: 'string',
        currency: BookingInvoiceCurrency,
        customForm: BookingInvoiceCustomForm,
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
        order: BookingInvoiceOrder,
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

    account = this.declared<BookingInvoiceAccount | null>('account');
    alternateBillingEndDate = this.declared<string | null>('alternateBillingEndDate');
    alternateBillingStartDate = this.declared<string | null>('alternateBillingStartDate');
    alternateDueDate = this.declared<string | null>('alternateDueDate');
    alternateIssueDate = this.declared<string | null>('alternateIssueDate');
    billingEndDate = this.declared<string | null>('billingEndDate');
    billingStartDate = this.declared<string | null>('billingStartDate');
    createdBy = this.declared<BookingInvoiceCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<BookingInvoiceCurrency | null>('currency');
    customForm = this.declared<BookingInvoiceCustomForm | null>('customForm');
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
    order = this.declared<BookingInvoiceOrder | null>('order');
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

/** One page of a booking's invoices, under `data`. */
export class BookingInvoiceList extends Dto {
    static override FIELDS = {
        data: dtoList(BookingInvoice),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<BookingInvoice | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** A {@link BookingItemFulfillment}'s `account`. */
export class BookingItemFulfillmentAccount extends Dto {
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

/** A {@link BookingItemFulfillment}'s `created_by`. */
export class BookingItemFulfillmentCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link BookingItemFulfillmentFulfillment}'s `item`. */
export class BookingItemFulfillmentFulfillmentItem extends Dto {
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

/** One entry of a {@link BookingItemFulfillment}'s `fulfillments`. */
export class BookingItemFulfillmentFulfillment extends Dto {
    static override FIELDS = {
        fulfillmentIndex: 'int',
        fulfillmentQty: 'float',
        fulfillmentSentQty: 'float',
        id: 'string',
        inventoryTracking: 'any',
        item: BookingItemFulfillmentFulfillmentItem,
        object: 'string',
        pendingReturn: 'float',
        returned: 'any',
        servingStatus: 'string',
        uom: 'any',
        uomPrecision: 'any',
    } as const;

    fulfillmentIndex = this.declared<number | null>('fulfillmentIndex');
    fulfillmentQty = this.declared<number | null>('fulfillmentQty');
    fulfillmentSentQty = this.declared<number | null>('fulfillmentSentQty');
    id = this.declared<string | null>('id');
    inventoryTracking = this.declared<unknown>('inventoryTracking');
    item = this.declared<BookingItemFulfillmentFulfillmentItem | null>('item');
    object = this.declared<string | null>('object');
    pendingReturn = this.declared<number | null>('pendingReturn');
    returned = this.declared<unknown>('returned');
    servingStatus = this.declared<string | null>('servingStatus');
    uom = this.declared<unknown>('uom');
    uomPrecision = this.declared<unknown>('uomPrecision');
}

/** A {@link BookingItemFulfillment}'s `invoice`. */
export class BookingItemFulfillmentInvoice extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** A {@link BookingItemFulfillment}'s `last_updated_by`. */
export class BookingItemFulfillmentLastUpdatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** What `getBookingItemFulfillment` answers, under `item_fulfillment`. */
export class BookingItemFulfillment extends Dto {
    static override ENVELOPE_KEY = 'item_fulfillment';

    static override FIELDS = {
        account: BookingItemFulfillmentAccount,
        code: 'string',
        createdBy: BookingItemFulfillmentCreatedBy,
        createdOn: 'string',
        customAttributes: 'any',
        deliveryStatus: 'any',
        fulfillmentCompleted: 'boolean',
        fulfillmentDate: 'string',
        fulfillmentNote: 'any',
        fulfillmentStatus: 'string',
        fulfillments: dtoList(BookingItemFulfillmentFulfillment),
        href: 'string',
        id: 'string',
        invoice: BookingItemFulfillmentInvoice,
        lastUpdatedBy: BookingItemFulfillmentLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        order: 'any',
        status: 'string',
        trackingNumber: 'string',
        version: 'int',
    } as const;

    account = this.declared<BookingItemFulfillmentAccount | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<BookingItemFulfillmentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    deliveryStatus = this.declared<unknown>('deliveryStatus');
    fulfillmentCompleted = this.declared<boolean | null>('fulfillmentCompleted');
    fulfillmentDate = this.declared<string | null>('fulfillmentDate');
    fulfillmentNote = this.declared<unknown>('fulfillmentNote');
    fulfillmentStatus = this.declared<string | null>('fulfillmentStatus');
    fulfillments = this.declared<Array<BookingItemFulfillmentFulfillment | null> | null>('fulfillments');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    invoice = this.declared<BookingItemFulfillmentInvoice | null>('invoice');
    lastUpdatedBy = this.declared<BookingItemFulfillmentLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    order = this.declared<unknown>('order');
    status = this.declared<string | null>('status');
    trackingNumber = this.declared<string | null>('trackingNumber');
    version = this.declared<number | null>('version');
}

/** What `getBookingKpis` answers, under `order_kpis`. */
export class BookingKpis extends Dto {
    static override ENVELOPE_KEY = 'order_kpis';

    static override FIELDS = {
        deletedAt: 'any',
        estimatedTotal: 'string',
        lastCancelledAt: 'any',
        lastChangedAt: 'any',
        lastInvoiceIssueDate: 'any',
        lastInvoiceTotal: 'string',
        lastReactivatedAt: 'any',
        monthlyRecurringRevenue: 'string',
        nextInvoiceIssueDate: 'any',
        object: 'string',
        startDate: 'any',
        totalCollected: 'string',
        totalDue: 'string',
        totalInvoice: 'int',
        totalOutstanding: 'string',
        totalRevenue: 'string',
    } as const;

    deletedAt = this.declared<unknown>('deletedAt');
    estimatedTotal = this.declared<string | null>('estimatedTotal');
    lastCancelledAt = this.declared<unknown>('lastCancelledAt');
    lastChangedAt = this.declared<unknown>('lastChangedAt');
    lastInvoiceIssueDate = this.declared<unknown>('lastInvoiceIssueDate');
    lastInvoiceTotal = this.declared<string | null>('lastInvoiceTotal');
    lastReactivatedAt = this.declared<unknown>('lastReactivatedAt');
    monthlyRecurringRevenue = this.declared<string | null>('monthlyRecurringRevenue');
    nextInvoiceIssueDate = this.declared<unknown>('nextInvoiceIssueDate');
    object = this.declared<string | null>('object');
    startDate = this.declared<unknown>('startDate');
    totalCollected = this.declared<string | null>('totalCollected');
    totalDue = this.declared<string | null>('totalDue');
    totalInvoice = this.declared<number | null>('totalInvoice');
    totalOutstanding = this.declared<string | null>('totalOutstanding');
    totalRevenue = this.declared<string | null>('totalRevenue');
}

/** A {@link BookingPaymentMethodsPaymentMethod}'s `processor`. */
export class BookingPaymentMethodsPaymentMethodProcessor extends Dto {
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

/** One entry of a {@link BookingPaymentMethods}'s `payment_methods`. */
export class BookingPaymentMethodsPaymentMethod extends Dto {
    static override FIELDS = {
        createdBy: 'string',
        createdOn: 'string',
        default: 'boolean',
        id: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        lastUsedAt: 'string',
        object: 'string',
        paymentCount: 'int',
        processor: BookingPaymentMethodsPaymentMethodProcessor,
        processorType: 'string',
        reference: 'string',
        restrictedToOrders: 'boolean',
        specifiedOrderIds: 'string',
        status: 'string',
        version: 'int',
    } as const;

    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    default = this.declared<boolean | null>('default');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lastUsedAt = this.declared<string | null>('lastUsedAt');
    object = this.declared<string | null>('object');
    paymentCount = this.declared<number | null>('paymentCount');
    processor = this.declared<BookingPaymentMethodsPaymentMethodProcessor | null>('processor');
    processorType = this.declared<string | null>('processorType');
    reference = this.declared<string | null>('reference');
    restrictedToOrders = this.declared<boolean | null>('restrictedToOrders');
    specifiedOrderIds = this.declared<string | null>('specifiedOrderIds');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** What `getBookingPaymentMethods` answers, under `order`. */
export class BookingPaymentMethods extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        paymentMethods: dtoList(BookingPaymentMethodsPaymentMethod),
    } as const;

    paymentMethods = this.declared<Array<BookingPaymentMethodsPaymentMethod | null> | null>('paymentMethods');
}

/** A {@link BookingPaymentMethodPaymentMethod}'s `processor`. */
export class BookingPaymentMethodPaymentMethodProcessor extends Dto {
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

/** A {@link BookingPaymentMethod}'s `payment_method`. */
export class BookingPaymentMethodPaymentMethod extends Dto {
    static override FIELDS = {
        createdBy: 'string',
        createdOn: 'string',
        default: 'boolean',
        id: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        lastUsedAt: 'string',
        object: 'string',
        paymentCount: 'int',
        processor: BookingPaymentMethodPaymentMethodProcessor,
        processorType: 'string',
        reference: 'string',
        restrictedToOrders: 'boolean',
        specifiedOrderIds: 'string',
        status: 'string',
        version: 'int',
    } as const;

    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    default = this.declared<boolean | null>('default');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lastUsedAt = this.declared<string | null>('lastUsedAt');
    object = this.declared<string | null>('object');
    paymentCount = this.declared<number | null>('paymentCount');
    processor = this.declared<BookingPaymentMethodPaymentMethodProcessor | null>('processor');
    processorType = this.declared<string | null>('processorType');
    reference = this.declared<string | null>('reference');
    restrictedToOrders = this.declared<boolean | null>('restrictedToOrders');
    specifiedOrderIds = this.declared<string | null>('specifiedOrderIds');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** What `getBookingPaymentMethod` answers, under `order`. */
export class BookingPaymentMethod extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        paymentMethod: BookingPaymentMethodPaymentMethod,
    } as const;

    paymentMethod = this.declared<BookingPaymentMethodPaymentMethod | null>('paymentMethod');
}

/** A {@link BookingPayment}'s `account`. */
export class BookingPaymentAccount extends Dto {
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

/** A {@link BookingPayment}'s `created_by`. */
export class BookingPaymentCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** One entry of a {@link BookingPayment}'s `invoices`. */
export class BookingPaymentInvoice extends Dto {
    static override FIELDS = {
        applied: 'string',
        dueDate: 'string',
        id: 'string',
        issueDate: 'string',
        outstanding: 'string',
        total: 'string',
    } as const;

    applied = this.declared<string | null>('applied');
    dueDate = this.declared<string | null>('dueDate');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    outstanding = this.declared<string | null>('outstanding');
    total = this.declared<string | null>('total');
}

/** One entry of a {@link BookingPayment}'s `payment_applied`. */
export class BookingPaymentPaymentApplied extends Dto {
    static override FIELDS = {
        amount: 'string',
        gatewayResponse: 'any',
        method: 'string',
        processor: 'string',
        reference: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    gatewayResponse = this.declared<unknown>('gatewayResponse');
    method = this.declared<string | null>('method');
    processor = this.declared<string | null>('processor');
    reference = this.declared<string | null>('reference');
}

/** One entry of a {@link BookingPaymentList}'s `data`. */
export class BookingPayment extends Dto {
    static override FIELDS = {
        account: BookingPaymentAccount,
        createdBy: BookingPaymentCreatedBy,
        createdOn: 'string',
        creditApplied: dtoList('any'),
        giftCertificateApplied: dtoList('any'),
        id: 'string',
        invoices: dtoList(BookingPaymentInvoice),
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        origin: 'any',
        paymentApplied: dtoList(BookingPaymentPaymentApplied),
        paymentNote: 'string',
        reconcileStatus: 'string',
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<BookingPaymentAccount | null>('account');
    createdBy = this.declared<BookingPaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditApplied = this.declared<Array<unknown | null> | null>('creditApplied');
    giftCertificateApplied = this.declared<Array<unknown | null> | null>('giftCertificateApplied');
    id = this.declared<string | null>('id');
    invoices = this.declared<Array<BookingPaymentInvoice | null> | null>('invoices');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<unknown>('origin');
    paymentApplied = this.declared<Array<BookingPaymentPaymentApplied | null> | null>('paymentApplied');
    paymentNote = this.declared<string | null>('paymentNote');
    reconcileStatus = this.declared<string | null>('reconcileStatus');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** One page of a booking's payments, under `data`. */
export class BookingPaymentList extends Dto {
    static override FIELDS = {
        data: dtoList(BookingPayment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<BookingPayment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** A {@link BookingPaymentView}'s `account`. */
export class BookingPaymentViewAccount extends Dto {
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

/** A {@link BookingPaymentView}'s `created_by`. */
export class BookingPaymentViewCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** One entry of a {@link BookingPaymentView}'s `invoices`. */
export class BookingPaymentViewInvoice extends Dto {
    static override FIELDS = {
        applied: 'string',
        dueDate: 'string',
        id: 'string',
        issueDate: 'string',
        outstanding: 'string',
        total: 'string',
    } as const;

    applied = this.declared<string | null>('applied');
    dueDate = this.declared<string | null>('dueDate');
    id = this.declared<string | null>('id');
    issueDate = this.declared<string | null>('issueDate');
    outstanding = this.declared<string | null>('outstanding');
    total = this.declared<string | null>('total');
}

/** One entry of a {@link BookingPaymentView}'s `payment_applied`. */
export class BookingPaymentViewPaymentApplied extends Dto {
    static override FIELDS = {
        amount: 'string',
        gatewayResponse: 'any',
        method: 'string',
        processor: 'string',
        reference: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    gatewayResponse = this.declared<unknown>('gatewayResponse');
    method = this.declared<string | null>('method');
    processor = this.declared<string | null>('processor');
    reference = this.declared<string | null>('reference');
}

/** What `getBookingPayment` answers, under `payment`. */
export class BookingPaymentView extends Dto {
    static override ENVELOPE_KEY = 'payment';

    static override FIELDS = {
        account: BookingPaymentViewAccount,
        createdBy: BookingPaymentViewCreatedBy,
        createdOn: 'string',
        creditApplied: dtoList('any'),
        customAttributes: dtoList('any'),
        giftCertificateApplied: dtoList('any'),
        id: 'string',
        invoices: dtoList(BookingPaymentViewInvoice),
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        origin: 'any',
        paymentApplied: dtoList(BookingPaymentViewPaymentApplied),
        paymentNote: 'string',
        reconcileStatus: 'string',
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<BookingPaymentViewAccount | null>('account');
    createdBy = this.declared<BookingPaymentViewCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditApplied = this.declared<Array<unknown | null> | null>('creditApplied');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    giftCertificateApplied = this.declared<Array<unknown | null> | null>('giftCertificateApplied');
    id = this.declared<string | null>('id');
    invoices = this.declared<Array<BookingPaymentViewInvoice | null> | null>('invoices');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<unknown>('origin');
    paymentApplied = this.declared<Array<BookingPaymentViewPaymentApplied | null> | null>('paymentApplied');
    paymentNote = this.declared<string | null>('paymentNote');
    reconcileStatus = this.declared<string | null>('reconcileStatus');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A {@link BookingPdf}'s `pdf`. */
export class BookingPdfPdf extends Dto {
    static override FIELDS = {
        downloadUrl: 'string',
        fileSize: 'int',
        id: 'string',
        object: 'string',
        previewUrl: 'string',
    } as const;

    downloadUrl = this.declared<string | null>('downloadUrl');
    fileSize = this.declared<number | null>('fileSize');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    previewUrl = this.declared<string | null>('previewUrl');
}

/** What `getBookingPdf` answers, under `order`. */
export class BookingPdf extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        pdf: BookingPdfPdf,
    } as const;

    pdf = this.declared<BookingPdfPdf | null>('pdf');
}

/** What `getBookingQuotePartialInvoices` answers, under `order`. */
export class BookingQuotePartialInvoices extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        partialInvoices: dtoList('any'),
    } as const;

    partialInvoices = this.declared<Array<unknown | null> | null>('partialInvoices');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Booking: ['GET /api/{api_version}/booking'],
    BookingList: ['GET /api/{api_version}/booking'],
    BookingById: ['GET /api/{api_version}/booking/{booking_id}'],
    BookingNoteList: ['GET /api/{api_version}/booking/notes'],
    BookingBillingPreferencesView: ['GET /api/{api_version}/booking/{booking_id}/billing_preferences'],
    BookingLine: ['GET /api/{api_version}/booking/{booking_id}/lines/{line_uuid}'],
    BookingCustomObjectList: [
        'GET /api/{api_version}/booking/{booking_id}/custom_objects',
        'GET /api/{api_version}/booking/{booking_id}/custom_objects_instances',
    ],
    BookingCustomObject: [
        'GET /api/{api_version}/booking/{booking_id}/custom_objects/{custom_object_id}',
        'GET /api/{api_version}/booking/{booking_id}/custom_objects_instances/{custom_object_id}',
    ],
    BookingInvoiceList: ['GET /api/{api_version}/booking/{booking_id}/invoices'],
    BookingItemFulfillment: ['GET /api/{api_version}/booking/{booking_id}/item_fulfillments/{fulfillment_id}'],
    BookingKpis: ['GET /api/{api_version}/booking/{booking_id}/kpis'],
    BookingPaymentMethods: ['GET /api/{api_version}/booking/{booking_id}/payment_methods'],
    BookingPaymentMethod: ['GET /api/{api_version}/booking/{booking_id}/payment_methods/{payment_method_ref}'],
    BookingPaymentList: ['GET /api/{api_version}/booking/{booking_id}/payments'],
    BookingPaymentView: ['GET /api/{api_version}/booking/{booking_id}/payments/{payment_id}'],
    BookingPdf: ['GET /api/{api_version}/booking/{booking_id}/pdf'],
    BookingQuotePartialInvoices: ['GET /api/{api_version}/booking/{booking_id}/quote_partial_invoices'],
};

sealDtoSchema(
    Booking,
    BookingList,
    BookingById,
    ContractProperty,
    Currency,
    TimeZone,
    CustomForm,
    Manager,
    SalesRep,
    ShippingProfile,
    Account,
    ReferralAccount,
    DiscountProfile,
    BillingAddress,
    ShippingAddress,
    CommunicationPreference,
    ProformaProperty,
    BillingPreference,
    CustomAttribute,
    Item,
    PricingRule,
    ItemPriceSnapshot,
    ItemPriceTax,
    TaxCode,
    ItemSaleTaxConfiguration,
    SalesRevenue,
    ItemAccountingCode,
    PreOrderStockDetail,
    ItemProperty,
    Line,
    Kpi,
    BookingNoteAttachment,
    BookingNoteCreatedBy,
    BookingNoteLastUpdatedBy,
    BookingNoteWatcher,
    BookingNote,
    BookingNoteList,
    BookingBillingPreferencesDetailProformaProperties,
    BookingBillingPreferencesDetail,
    BookingBillingPreferencesView,
    BookingLineItem,
    BookingLineItemAccountingCode,
    BookingLineItemPriceSnapshotPricingRule,
    BookingLineItemPriceSnapshot,
    BookingLineItemPriceTax,
    BookingLineItemProperties,
    BookingLineItemSaleTaxConfigurationTaxCode,
    BookingLineItemSaleTaxConfiguration,
    BookingLinePreOrderStockDetails,
    BookingLine,
    BookingCustomObjectEntry,
    BookingCustomObjectList,
    BookingCustomObject,
    BookingInvoiceAccount,
    BookingInvoiceCreatedBy,
    BookingInvoiceCurrency,
    BookingInvoiceCustomForm,
    BookingInvoiceOrder,
    BookingInvoice,
    BookingInvoiceList,
    BookingItemFulfillmentAccount,
    BookingItemFulfillmentCreatedBy,
    BookingItemFulfillmentFulfillmentItem,
    BookingItemFulfillmentFulfillment,
    BookingItemFulfillmentInvoice,
    BookingItemFulfillmentLastUpdatedBy,
    BookingItemFulfillment,
    BookingKpis,
    BookingPaymentMethodsPaymentMethodProcessor,
    BookingPaymentMethodsPaymentMethod,
    BookingPaymentMethods,
    BookingPaymentMethodPaymentMethodProcessor,
    BookingPaymentMethodPaymentMethod,
    BookingPaymentMethod,
    BookingPaymentAccount,
    BookingPaymentCreatedBy,
    BookingPaymentInvoice,
    BookingPaymentPaymentApplied,
    BookingPayment,
    BookingPaymentList,
    BookingPaymentViewAccount,
    BookingPaymentViewCreatedBy,
    BookingPaymentViewInvoice,
    BookingPaymentViewPaymentApplied,
    BookingPaymentView,
    BookingPdfPdf,
    BookingPdf,
    BookingQuotePartialInvoices,
);
