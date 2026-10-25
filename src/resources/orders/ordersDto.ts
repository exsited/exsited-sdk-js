/** Typed views over the v4 orders bodies. */

import {Dto, dtoList, dtoOneOf, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `contract_properties` block of {@link Order}. */
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

/** The `currency` block of {@link AccountOrder}. */
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

/** The `time_zone` block of {@link AccountOrder}. */
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

/** The `custom_form` block of {@link AccountOrder}. */
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

/** The `manager` block of {@link AccountOrder}. */
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

/** The `account` block of {@link AccountOrder}. */
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

/** The `discount_profile` block of {@link AccountOrder}. */
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

/** The `billing_address` block of {@link AccountOrder}. */
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

/** The `shipping_address` block of {@link AccountOrder}. */
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

/** One entry of `communication_preferences` on {@link AccountOrder}. */
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
        acceptanceTerm: 'string',
        acceptanceDate: 'any',
        termsAndConditions: 'any',
    } as const;

    acceptanceRequired = this.declared<boolean | null>('acceptanceRequired');
    paymentRequired = this.declared<boolean | null>('paymentRequired');
    acceptanceTerm = this.declared<string | null>('acceptanceTerm');
    acceptanceDate = this.declared<unknown>('acceptanceDate');
    termsAndConditions = this.declared<unknown>('termsAndConditions');
}

/** The `billing_preferences` block of {@link AccountOrder}. */
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

/** The `sales_rep` block of {@link Order}. */
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

/** The `shipping_profile` block of {@link Order}. */
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

/** The `referral_account` block of {@link Order}. */
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

/** The order body. */
export class Order extends Dto {
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

/** A page of Order records. */
export class OrderList extends Dto {
    static override FIELDS = {
        data: dtoList(Order),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Order | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `order` block of {@link OrderNote}. */
export class OrderNoteOrder extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `attachments` on {@link OrderNote}. */
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

/** One entry of `watchers` on {@link OrderNote}. */
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

/** The `created_by` block of {@link OrderNote}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link OrderNote}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The order note body. */
export class OrderNote extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(Attachment),
        content: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        order: OrderNoteOrder,
        user: 'any',
        version: 'int',
        watchers: dtoList(Watcher),
    } as const;

    attachments = this.declared<Array<Attachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    order = this.declared<OrderNoteOrder | null>('order');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
}

/** A page of OrderNote records. */
export class OrderNoteList extends Dto {
    static override FIELDS = {
        data: dtoList(OrderNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<OrderNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `activity_logs` on {@link OrderRead}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** One entry of `custom_attributes` on {@link OrderRead}. */
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

/** The `item` block of {@link OrderReadLine}. */
export class OrderReadLineItem extends Dto {
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

/** The `pricing_rule` block of {@link OrderReadLineItemPriceSnapshot}. */
export class OrderReadLineItemPriceSnapshotPricingRule extends Dto {
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

/** The `item_price_snapshot` block of {@link OrderReadLine}. */
export class OrderReadLineItemPriceSnapshot extends Dto {
    static override FIELDS = {
        pricingRule: OrderReadLineItemPriceSnapshotPricingRule,
    } as const;

    pricingRule = this.declared<OrderReadLineItemPriceSnapshotPricingRule | null>('pricingRule');
}

/** The `item_price_tax` block of {@link OrderReadLine}. */
export class OrderReadLineItemPriceTax extends Dto {
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

/** The `tax_code` block of {@link OrderReadLineItemSaleTaxConfiguration}. */
export class OrderReadLineItemSaleTaxConfigurationTaxCode extends Dto {
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

/** The `item_sale_tax_configuration` block of {@link OrderReadLine}. */
export class OrderReadLineItemSaleTaxConfiguration extends Dto {
    static override FIELDS = {
        salePriceIsBasedOn: 'string',
        taxCode: OrderReadLineItemSaleTaxConfigurationTaxCode,
    } as const;

    salePriceIsBasedOn = this.declared<string | null>('salePriceIsBasedOn');
    taxCode = this.declared<OrderReadLineItemSaleTaxConfigurationTaxCode | null>('taxCode');
}

/** The `sales_revenue` block of {@link OrderReadLineItemAccountingCode}. */
export class OrderReadLineItemAccountingCodeSalesRevenue extends Dto {
    static override FIELDS = {
        name: 'string',
    } as const;

    name = this.declared<string | null>('name');
}

/** The `item_accounting_code` block of {@link OrderReadLine}. */
export class OrderReadLineItemAccountingCode extends Dto {
    static override FIELDS = {
        salesRevenue: dtoOneOf('string', OrderReadLineItemAccountingCodeSalesRevenue),
    } as const;

    salesRevenue = this.declared<string | OrderReadLineItemAccountingCodeSalesRevenue | null>('salesRevenue');
}

/** One entry of `item_custom_attributes` on {@link OrderReadLine}. */
export class OrderReadLineItemCustomAttribute extends Dto {
    static override FIELDS = {
        name: 'string',
        value: dtoOneOf('string', dtoList('string')),
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<string | Array<string | null> | null>('value');
}

/** The `pre_order_stock_details` block of {@link OrderReadLine}. */
export class OrderReadLinePreOrderStockDetail extends Dto {
    static override FIELDS = {
        pendingReserve: 'string',
        reserved: 'string',
        sold: 'string',
    } as const;

    pendingReserve = this.declared<string | null>('pendingReserve');
    reserved = this.declared<string | null>('reserved');
    sold = this.declared<string | null>('sold');
}

/** The `item_properties` block of {@link OrderReadLine}. */
export class OrderReadLineItemProperty extends Dto {
    static override FIELDS = {
        chargingPeriod: 'string',
        chargingStartDate: 'string',
        chargingAndBillingAlignment: 'string',
        proRataPartialChargingPeriod: 'string',
        proRataPartialPricingPeriod: 'string',
        billingMode: 'string',
    } as const;

    chargingPeriod = this.declared<string | null>('chargingPeriod');
    chargingStartDate = this.declared<string | null>('chargingStartDate');
    chargingAndBillingAlignment = this.declared<string | null>('chargingAndBillingAlignment');
    proRataPartialChargingPeriod = this.declared<string | null>('proRataPartialChargingPeriod');
    proRataPartialPricingPeriod = this.declared<string | null>('proRataPartialPricingPeriod');
    billingMode = this.declared<string | null>('billingMode');
}

/** The `booking` block of {@link OrderReadLine}. */
export class Booking extends Dto {
    static override FIELDS = {
        labourUuid: 'string',
        bookingStartTime: 'string',
        bookingEndTime: 'string',
    } as const;

    labourUuid = this.declared<string | null>('labourUuid');
    bookingStartTime = this.declared<string | null>('bookingStartTime');
    bookingEndTime = this.declared<string | null>('bookingEndTime');
}

/** One entry of `lines` on {@link OrderRead}. */
export class OrderReadLine extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        chargeItemUuid: 'string',
        item: OrderReadLineItem,
        itemOrderQuantity: 'int',
        itemDescription: 'string',
        itemInvoiceNote: 'string',
        shippingCost: 'float',
        itemPriceSnapshot: OrderReadLineItemPriceSnapshot,
        itemPriceTax: OrderReadLineItemPriceTax,
        itemSaleTaxConfiguration: OrderReadLineItemSaleTaxConfiguration,
        taxExemptWhenSold: 'boolean',
        itemType: 'string',
        itemChargeType: 'string',
        itemAccountingCode: OrderReadLineItemAccountingCode,
        itemCustomAttributes: dtoList(OrderReadLineItemCustomAttribute),
        expectedDeliveryDate: 'string',
        preOrderStockDetails: OrderReadLinePreOrderStockDetail,
        version: 'int',
        total: 'string',
        subtotal: 'string',
        tax: 'string',
        itemProperties: OrderReadLineItemProperty,
        booking: Booking,
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    chargeItemUuid = this.declared<string | null>('chargeItemUuid');
    item = this.declared<OrderReadLineItem | null>('item');
    itemOrderQuantity = this.declared<number | null>('itemOrderQuantity');
    itemDescription = this.declared<string | null>('itemDescription');
    itemInvoiceNote = this.declared<string | null>('itemInvoiceNote');
    shippingCost = this.declared<number | null>('shippingCost');
    itemPriceSnapshot = this.declared<OrderReadLineItemPriceSnapshot | null>('itemPriceSnapshot');
    itemPriceTax = this.declared<OrderReadLineItemPriceTax | null>('itemPriceTax');
    itemSaleTaxConfiguration = this.declared<OrderReadLineItemSaleTaxConfiguration | null>('itemSaleTaxConfiguration');
    taxExemptWhenSold = this.declared<boolean | null>('taxExemptWhenSold');
    itemType = this.declared<string | null>('itemType');
    itemChargeType = this.declared<string | null>('itemChargeType');
    itemAccountingCode = this.declared<OrderReadLineItemAccountingCode | null>('itemAccountingCode');
    itemCustomAttributes = this.declared<Array<OrderReadLineItemCustomAttribute | null> | null>('itemCustomAttributes');
    expectedDeliveryDate = this.declared<string | null>('expectedDeliveryDate');
    preOrderStockDetails = this.declared<OrderReadLinePreOrderStockDetail | null>('preOrderStockDetails');
    version = this.declared<number | null>('version');
    total = this.declared<string | null>('total');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    itemProperties = this.declared<OrderReadLineItemProperty | null>('itemProperties');
    booking = this.declared<Booking | null>('booking');
}

/** The `kpis` block of {@link OrderRead}. */
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
        createdOn: 'any',
        lastUpdatedOn: 'any',
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
    createdOn = this.declared<unknown>('createdOn');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
}

/** The `contract_properties` block of {@link OrderRead}, sent for a contract order. */
export class OrderReadContractProperty extends Dto {
    static override FIELDS = {
        requireCustomerAcceptance: 'boolean',
        requiresPaymentMethod: 'boolean',
        initialContractTerm: 'string',
        renewAutomatically: 'string',
        allowEarlyTermination: 'boolean',
        terminationAccountingCode: 'string',
        allowPostponement: 'boolean',
        allowTrial: 'boolean',
        startContractAfterTrialEnds: 'boolean',
        trialPeriod: 'string',
        trialEndDate: 'string',
        trialRequiresPaymentMethod: 'boolean',
        allowDowngrade: 'boolean',
        allowUpgrade: 'boolean',
        terminationNoticePeriod: 'string',
        autoRenewalEndsOn: 'string',
        autoRenewalTerm: 'string',
        autoRenewalRequireCustomerAcceptance: 'boolean',
        earlyTerminationMinimumPeriod: 'string',
        applyEarlyTerminationCharge: 'boolean',
        earlyTerminationChargeType: 'string',
        terminationFixedCharge: 'string',
    } as const;

    requireCustomerAcceptance = this.declared<boolean | null>('requireCustomerAcceptance');
    requiresPaymentMethod = this.declared<boolean | null>('requiresPaymentMethod');
    initialContractTerm = this.declared<string | null>('initialContractTerm');
    renewAutomatically = this.declared<string | null>('renewAutomatically');
    allowEarlyTermination = this.declared<boolean | null>('allowEarlyTermination');
    terminationAccountingCode = this.declared<string | null>('terminationAccountingCode');
    allowPostponement = this.declared<boolean | null>('allowPostponement');
    allowTrial = this.declared<boolean | null>('allowTrial');
    startContractAfterTrialEnds = this.declared<boolean | null>('startContractAfterTrialEnds');
    trialPeriod = this.declared<string | null>('trialPeriod');
    trialEndDate = this.declared<string | null>('trialEndDate');
    trialRequiresPaymentMethod = this.declared<boolean | null>('trialRequiresPaymentMethod');
    allowDowngrade = this.declared<boolean | null>('allowDowngrade');
    allowUpgrade = this.declared<boolean | null>('allowUpgrade');
    terminationNoticePeriod = this.declared<string | null>('terminationNoticePeriod');
    autoRenewalEndsOn = this.declared<string | null>('autoRenewalEndsOn');
    autoRenewalTerm = this.declared<string | null>('autoRenewalTerm');
    autoRenewalRequireCustomerAcceptance = this.declared<boolean | null>('autoRenewalRequireCustomerAcceptance');
    earlyTerminationMinimumPeriod = this.declared<string | null>('earlyTerminationMinimumPeriod');
    applyEarlyTerminationCharge = this.declared<boolean | null>('applyEarlyTerminationCharge');
    earlyTerminationChargeType = this.declared<string | null>('earlyTerminationChargeType');
    terminationFixedCharge = this.declared<string | null>('terminationFixedCharge');
}

/** The order read body. */
export class OrderRead extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        account: Account,
        activityLogs: dtoList(ActivityLog),
        allowContract: 'boolean',
        billingAddress: BillingAddress,
        billingPreferences: BillingPreference,
        billingStartDate: 'string',
        billingStartDayOfMonth: 'string',
        communicationPreferences: dtoList(CommunicationPreference),
        contractProperties: OrderReadContractProperty,
        createdBy: 'any',
        createdOn: 'string',
        currency: Currency,
        customAttributes: dtoList(CustomAttribute),
        customForm: CustomForm,
        customerPurchaseOrderId: 'string',
        description: 'string',
        discountProfile: DiscountProfile,
        displayName: 'string',
        id: 'string',
        invoiceNote: 'string',
        kpis: Kpi,
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        lines: dtoList(OrderReadLine),
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
        referralAccount: 'any',
        salesRep: 'any',
        shippingAddress: ShippingAddress,
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
    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
    allowContract = this.declared<boolean | null>('allowContract');
    billingAddress = this.declared<BillingAddress | null>('billingAddress');
    billingPreferences = this.declared<BillingPreference | null>('billingPreferences');
    billingStartDate = this.declared<string | null>('billingStartDate');
    billingStartDayOfMonth = this.declared<string | null>('billingStartDayOfMonth');
    communicationPreferences = this.declared<Array<CommunicationPreference | null> | null>('communicationPreferences');
    contractProperties = this.declared<OrderReadContractProperty | null>('contractProperties');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    customerPurchaseOrderId = this.declared<string | null>('customerPurchaseOrderId');
    description = this.declared<string | null>('description');
    discountProfile = this.declared<DiscountProfile | null>('discountProfile');
    displayName = this.declared<string | null>('displayName');
    id = this.declared<string | null>('id');
    invoiceNote = this.declared<string | null>('invoiceNote');
    kpis = this.declared<Kpi | null>('kpis');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lines = this.declared<Array<OrderReadLine | null> | null>('lines');
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
    referralAccount = this.declared<unknown>('referralAccount');
    salesRep = this.declared<unknown>('salesRep');
    shippingAddress = this.declared<ShippingAddress | null>('shippingAddress');
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

/** The order information body. */
export class OrderInformation extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        account: Account,
        allowContract: 'boolean',
        billingAddress: BillingAddress,
        billingStartDate: 'string',
        billingStartDayOfMonth: 'string',
        communicationPreferences: dtoList(CommunicationPreference),
        createdBy: 'any',
        createdOn: 'string',
        currency: Currency,
        customForm: CustomForm,
        customerPurchaseOrderId: 'any',
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
        referralAccount: 'any',
        salesRep: 'any',
        shippingAddress: ShippingAddress,
        shippingCost: 'float',
        shippingProfile: 'any',
        status: 'string',
        timeZone: TimeZone,
        version: 'int',
    } as const;

    account = this.declared<Account | null>('account');
    allowContract = this.declared<boolean | null>('allowContract');
    billingAddress = this.declared<BillingAddress | null>('billingAddress');
    billingStartDate = this.declared<string | null>('billingStartDate');
    billingStartDayOfMonth = this.declared<string | null>('billingStartDayOfMonth');
    communicationPreferences = this.declared<Array<CommunicationPreference | null> | null>('communicationPreferences');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    customForm = this.declared<CustomForm | null>('customForm');
    customerPurchaseOrderId = this.declared<unknown>('customerPurchaseOrderId');
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
    referralAccount = this.declared<unknown>('referralAccount');
    salesRep = this.declared<unknown>('salesRep');
    shippingAddress = this.declared<ShippingAddress | null>('shippingAddress');
    shippingCost = this.declared<number | null>('shippingCost');
    shippingProfile = this.declared<unknown>('shippingProfile');
    status = this.declared<string | null>('status');
    timeZone = this.declared<TimeZone | null>('timeZone');
    version = this.declared<number | null>('version');
}

/** One entry of `data` on {@link AccountOrders}. */
export class AccountOrder extends Dto {
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
        description: 'string',
        currency: Currency,
        timeZone: TimeZone,
        customForm: CustomForm,
        manager: Manager,
        salesRep: 'any',
        shippingProfile: 'any',
        account: Account,
        referralAccount: 'any',
        discountProfile: DiscountProfile,
        customerPurchaseOrderId: 'string',
        origin: 'string',
        invoiceNote: 'string',
        shippingCost: 'float',
        priceTaxInclusive: 'boolean',
        originalTotal: 'string',
        billingStartDate: 'string',
        orderStartDate: 'string',
        nextBillingFromDate: 'string',
        billingAddress: BillingAddress,
        shippingAddress: ShippingAddress,
        communicationPreferences: dtoList(CommunicationPreference),
        allowContract: 'boolean',
        billingPreferences: BillingPreference,
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        version: 'int',
        nextBillingFromDateUtc: 'string',
        billingStartDayOfMonth: 'string',
        contractProperties: ContractProperty,
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
    description = this.declared<string | null>('description');
    currency = this.declared<Currency | null>('currency');
    timeZone = this.declared<TimeZone | null>('timeZone');
    customForm = this.declared<CustomForm | null>('customForm');
    manager = this.declared<Manager | null>('manager');
    salesRep = this.declared<unknown>('salesRep');
    shippingProfile = this.declared<unknown>('shippingProfile');
    account = this.declared<Account | null>('account');
    referralAccount = this.declared<unknown>('referralAccount');
    discountProfile = this.declared<DiscountProfile | null>('discountProfile');
    customerPurchaseOrderId = this.declared<string | null>('customerPurchaseOrderId');
    origin = this.declared<string | null>('origin');
    invoiceNote = this.declared<string | null>('invoiceNote');
    shippingCost = this.declared<number | null>('shippingCost');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    originalTotal = this.declared<string | null>('originalTotal');
    billingStartDate = this.declared<string | null>('billingStartDate');
    orderStartDate = this.declared<string | null>('orderStartDate');
    nextBillingFromDate = this.declared<string | null>('nextBillingFromDate');
    billingAddress = this.declared<BillingAddress | null>('billingAddress');
    shippingAddress = this.declared<ShippingAddress | null>('shippingAddress');
    communicationPreferences = this.declared<Array<CommunicationPreference | null> | null>('communicationPreferences');
    allowContract = this.declared<boolean | null>('allowContract');
    billingPreferences = this.declared<BillingPreference | null>('billingPreferences');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    nextBillingFromDateUtc = this.declared<string | null>('nextBillingFromDateUtc');
    billingStartDayOfMonth = this.declared<string | null>('billingStartDayOfMonth');
    contractProperties = this.declared<ContractProperty | null>('contractProperties');
}

/** The account orders body. */
export class AccountOrders extends Dto {
    static override FIELDS = {
        data: dtoList(AccountOrder),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<AccountOrder | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The order billing preferences body. */
export class OrderBillingPreferences extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        billingPreferences: BillingPreference,
        object: 'string',
    } as const;

    billingPreferences = this.declared<BillingPreference | null>('billingPreferences');
    object = this.declared<string | null>('object');
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
        salesRevenue: SalesRevenue,
    } as const;

    salesRevenue = this.declared<SalesRevenue | null>('salesRevenue');
}

/** One entry of `item_custom_attributes` on {@link Line}. */
export class ItemCustomAttribute extends Dto {
    static override FIELDS = {
        name: 'string',
        value: dtoList('string'),
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<Array<string | null> | null>('value');
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
        chargingPeriod: 'string',
        chargingStartDate: 'string',
        chargingAndBillingAlignment: 'string',
        proRataPartialChargingPeriod: 'string',
        proRataPartialPricingPeriod: 'string',
        billingMode: 'string',
    } as const;

    chargingPeriod = this.declared<string | null>('chargingPeriod');
    chargingStartDate = this.declared<string | null>('chargingStartDate');
    chargingAndBillingAlignment = this.declared<string | null>('chargingAndBillingAlignment');
    proRataPartialChargingPeriod = this.declared<string | null>('proRataPartialChargingPeriod');
    proRataPartialPricingPeriod = this.declared<string | null>('proRataPartialPricingPeriod');
    billingMode = this.declared<string | null>('billingMode');
}

/** One entry of `lines` on {@link OrderLines}. */
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
        itemCustomAttributes: dtoList(ItemCustomAttribute),
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
    itemCustomAttributes = this.declared<Array<ItemCustomAttribute | null> | null>('itemCustomAttributes');
    expectedDeliveryDate = this.declared<string | null>('expectedDeliveryDate');
    preOrderStockDetails = this.declared<PreOrderStockDetail | null>('preOrderStockDetails');
    version = this.declared<number | null>('version');
    total = this.declared<string | null>('total');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    itemProperties = this.declared<ItemProperty | null>('itemProperties');
}

/** The order lines body. */
export class OrderLines extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        object: 'string',
        lines: dtoList(Line),
        total: 'string',
        subtotal: 'string',
        tax: 'string',
        shippingLineItems: dtoList('any'),
    } as const;

    object = this.declared<string | null>('object');
    lines = this.declared<Array<Line | null> | null>('lines');
    total = this.declared<string | null>('total');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    shippingLineItems = this.declared<Array<unknown | null> | null>('shippingLineItems');
}

/** The `processor` block of {@link PaymentMethod}. */
export class Processor extends Dto {
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

/** One entry of `payment_methods` on {@link OrderPaymentMethods}. */
export class PaymentMethod extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        processorType: 'string',
        status: 'string',
        default: 'boolean',
        restrictedToOrders: 'boolean',
        specifiedOrderIds: 'string',
        processor: Processor,
        reference: 'string',
        paymentCount: 'int',
        lastUsedAt: 'any',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: 'string',
        lastUpdatedBy: 'string',
        version: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    processorType = this.declared<string | null>('processorType');
    status = this.declared<string | null>('status');
    default = this.declared<boolean | null>('default');
    restrictedToOrders = this.declared<boolean | null>('restrictedToOrders');
    specifiedOrderIds = this.declared<string | null>('specifiedOrderIds');
    processor = this.declared<Processor | null>('processor');
    reference = this.declared<string | null>('reference');
    paymentCount = this.declared<number | null>('paymentCount');
    lastUsedAt = this.declared<unknown>('lastUsedAt');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<string | null>('createdBy');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
}

/** The order payment methods body. */
export class OrderPaymentMethods extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        paymentMethods: dtoList(PaymentMethod),
    } as const;

    paymentMethods = this.declared<Array<PaymentMethod | null> | null>('paymentMethods');
}

/** The `pdf` block of {@link OrderPdf}. */
export class Pdf extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        previewUrl: 'string',
        downloadUrl: 'string',
        fileSize: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    previewUrl = this.declared<string | null>('previewUrl');
    downloadUrl = this.declared<string | null>('downloadUrl');
    fileSize = this.declared<number | null>('fileSize');
}

/** The order pdf body. */
export class OrderPdf extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        pdf: Pdf,
    } as const;

    pdf = this.declared<Pdf | null>('pdf');
}

/** The `item_accounting_code` block of {@link OrderLine}. */
export class OrderLineItemAccountingCode extends Dto {
    static override FIELDS = {
        salesRevenue: 'string',
    } as const;

    salesRevenue = this.declared<string | null>('salesRevenue');
}

/** The order line body. */
export class OrderLine extends Dto {
    static override ENVELOPE_KEY = 'order_line';

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
        itemAccountingCode: OrderLineItemAccountingCode,
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
    itemAccountingCode = this.declared<OrderLineItemAccountingCode | null>('itemAccountingCode');
    itemCustomAttributes = this.declared<Array<unknown | null> | null>('itemCustomAttributes');
    expectedDeliveryDate = this.declared<string | null>('expectedDeliveryDate');
    preOrderStockDetails = this.declared<PreOrderStockDetail | null>('preOrderStockDetails');
    version = this.declared<number | null>('version');
    total = this.declared<string | null>('total');
    subtotal = this.declared<string | null>('subtotal');
    tax = this.declared<string | null>('tax');
    itemProperties = this.declared<ItemProperty | null>('itemProperties');
}

/** The order payment method body. */
export class OrderPaymentMethod extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        paymentMethod: PaymentMethod,
    } as const;

    paymentMethod = this.declared<PaymentMethod | null>('paymentMethod');
}

/** One entry of `data` on {@link OrderNoteFileList}. */
export class OrderNoteFile extends Dto {
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

/** A page of OrderNoteFile records. */
export class OrderNoteFileList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(OrderNoteFile),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<OrderNoteFile | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** The order discard draft body. */
export class OrderDiscardDraft extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        message: 'string',
    } as const;

    message = this.declared<string | null>('message');
}

/** What `createOrderExtendTrial` answers, under `order`. */
export class OrderExtendTrial extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        message: 'string',
    } as const;

    message = this.declared<string | null>('message');
}

/** One custom object with the order's instances of it, under `custom_object`. */
export class OrderCustomObject extends Dto {
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

/** A {@link OrderItemFulfillment}'s `account`. */
export class OrderItemFulfillmentAccount extends Dto {
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

/** A {@link OrderItemFulfillment}'s `created_by`. */
export class OrderItemFulfillmentCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link OrderItemFulfillmentFulfillment}'s `item`. */
export class OrderItemFulfillmentFulfillmentItem extends Dto {
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

/** One entry of a {@link OrderItemFulfillment}'s `fulfillments`. */
export class OrderItemFulfillmentFulfillment extends Dto {
    static override FIELDS = {
        fulfillmentIndex: 'int',
        fulfillmentQty: 'float',
        fulfillmentSentQty: 'float',
        id: 'string',
        inventoryTracking: 'any',
        item: OrderItemFulfillmentFulfillmentItem,
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
    item = this.declared<OrderItemFulfillmentFulfillmentItem | null>('item');
    object = this.declared<string | null>('object');
    pendingReturn = this.declared<number | null>('pendingReturn');
    returned = this.declared<unknown>('returned');
    servingStatus = this.declared<string | null>('servingStatus');
    uom = this.declared<unknown>('uom');
    uomPrecision = this.declared<unknown>('uomPrecision');
}

/** A {@link OrderItemFulfillment}'s `invoice`. */
export class OrderItemFulfillmentInvoice extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** A {@link OrderItemFulfillment}'s `last_updated_by`. */
export class OrderItemFulfillmentLastUpdatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** What `getOrderItemFulfillment` answers, under `item_fulfillment`. */
export class OrderItemFulfillment extends Dto {
    static override ENVELOPE_KEY = 'item_fulfillment';

    static override FIELDS = {
        account: OrderItemFulfillmentAccount,
        code: 'string',
        createdBy: OrderItemFulfillmentCreatedBy,
        createdOn: 'string',
        customAttributes: 'any',
        deliveryStatus: 'any',
        fulfillmentCompleted: 'boolean',
        fulfillmentDate: 'string',
        fulfillmentNote: 'any',
        fulfillmentStatus: 'string',
        fulfillments: dtoList(OrderItemFulfillmentFulfillment),
        href: 'string',
        id: 'string',
        invoice: OrderItemFulfillmentInvoice,
        lastUpdatedBy: OrderItemFulfillmentLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        order: 'any',
        status: 'string',
        trackingNumber: 'string',
        version: 'int',
    } as const;

    account = this.declared<OrderItemFulfillmentAccount | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<OrderItemFulfillmentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    deliveryStatus = this.declared<unknown>('deliveryStatus');
    fulfillmentCompleted = this.declared<boolean | null>('fulfillmentCompleted');
    fulfillmentDate = this.declared<string | null>('fulfillmentDate');
    fulfillmentNote = this.declared<unknown>('fulfillmentNote');
    fulfillmentStatus = this.declared<string | null>('fulfillmentStatus');
    fulfillments = this.declared<Array<OrderItemFulfillmentFulfillment | null> | null>('fulfillments');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    invoice = this.declared<OrderItemFulfillmentInvoice | null>('invoice');
    lastUpdatedBy = this.declared<OrderItemFulfillmentLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    order = this.declared<unknown>('order');
    status = this.declared<string | null>('status');
    trackingNumber = this.declared<string | null>('trackingNumber');
    version = this.declared<number | null>('version');
}

/** What `getOrderKpis` answers, under `order_kpis`. */
export class OrderKpis extends Dto {
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

/** A {@link OrderPayment}'s `account`. */
export class OrderPaymentAccount extends Dto {
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

/** A {@link OrderPayment}'s `created_by`. */
export class OrderPaymentCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** One entry of a {@link OrderPayment}'s `invoices`. */
export class OrderPaymentInvoice extends Dto {
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

/** One entry of a {@link OrderPayment}'s `payment_applied`. */
export class OrderPaymentPaymentApplied extends Dto {
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

/** What `getOrderPayment` answers, under `payment`. */
export class OrderPayment extends Dto {
    static override ENVELOPE_KEY = 'payment';

    static override FIELDS = {
        account: OrderPaymentAccount,
        createdBy: OrderPaymentCreatedBy,
        createdOn: 'string',
        creditApplied: dtoList('any'),
        customAttributes: dtoList('any'),
        giftCertificateApplied: dtoList('any'),
        id: 'string',
        invoices: dtoList(OrderPaymentInvoice),
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        origin: 'any',
        paymentApplied: dtoList(OrderPaymentPaymentApplied),
        paymentNote: 'string',
        reconcileStatus: 'string',
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<OrderPaymentAccount | null>('account');
    createdBy = this.declared<OrderPaymentCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    creditApplied = this.declared<Array<unknown | null> | null>('creditApplied');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    giftCertificateApplied = this.declared<Array<unknown | null> | null>('giftCertificateApplied');
    id = this.declared<string | null>('id');
    invoices = this.declared<Array<OrderPaymentInvoice | null> | null>('invoices');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    origin = this.declared<unknown>('origin');
    paymentApplied = this.declared<Array<OrderPaymentPaymentApplied | null> | null>('paymentApplied');
    paymentNote = this.declared<string | null>('paymentNote');
    reconcileStatus = this.declared<string | null>('reconcileStatus');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** What `getOrderQuotePartialInvoices` answers, under `order`. */
export class OrderQuotePartialInvoices extends Dto {
    static override ENVELOPE_KEY = 'order';

    static override FIELDS = {
        partialInvoices: dtoList('any'),
    } as const;

    partialInvoices = this.declared<Array<unknown | null> | null>('partialInvoices');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Order: ['GET /api/{api_version}/orders'],
    OrderList: ['GET /api/{api_version}/orders'],
    OrderNote: [
        'GET /api/{api_version}/orders/{order_id}/notes',
        'GET /api/{api_version}/orders/{order_id}/notes/{order_note_id}',
        'POST /api/{api_version}/orders/{order_id}/notes',
        'PATCH /api/{api_version}/orders/{order_id}/notes/{order_note_id}',
    ],
    OrderNoteList: ['GET /api/{api_version}/orders/{order_id}/notes'],
    OrderRead: [
        'GET /api/{api_version}/orders/{order_id}',
        'POST /api/{api_version}/orders',
        'POST /api/{api_version}/orders/{order_id}/activate_draft',
        'PATCH /api/{api_version}/orders/{order_id}/billing_preferences',
        'PUT /api/{api_version}/orders/{order_id}/billing_preferences',
        'POST /api/{api_version}/orders/{order_id}/cancel',
        'POST /api/{api_version}/orders/{order_id}/change',
        'POST /api/{api_version}/orders/{order_id}/convert_to_order',
        'PATCH /api/{api_version}/orders/{order_id}/information',
        'POST /api/{api_version}/orders/{order_id}/reactivate',
        'POST /api/{api_version}/orders/{order_id}/relinquish',
        'PATCH /api/{api_version}/orders/{order_id}/lines/{line_uuid}',
        'PATCH /api/{api_version}/orders/{order_id}/lines/{line_uuid}/billing_preferences',
        'PUT /api/{api_version}/orders/{order_id}/lines/{line_uuid}/billing_preferences',
    ],
    OrderInformation: ['GET /api/{api_version}/orders/{order_id}/information'],
    AccountOrders: [
        'GET /api/{api_version}/accounts/{account_id}/orders',
        'GET /api/{api_version}/orders/{order_id}/custom_objects',
        'GET /api/{api_version}/orders/{order_id}/custom_objects_instances',
        'GET /api/{api_version}/orders/{order_id}/item_fulfillments',
    ],
    OrderBillingPreferences: ['GET /api/{api_version}/orders/{order_id}/billing_preferences'],
    OrderLines: ['GET /api/{api_version}/orders/{order_id}/lines'],
    OrderPaymentMethods: ['GET /api/{api_version}/orders/{order_id}/payment_methods'],
    OrderPdf: ['GET /api/{api_version}/orders/{order_id}/pdf'],
    OrderLine: ['GET /api/{api_version}/orders/{order_id}/lines/{line_uuid}'],
    OrderPaymentMethod: ['GET /api/{api_version}/orders/{order_id}/payment_methods/{payment_method_ref}'],
    OrderNoteFileList: ['GET /api/{api_version}/orders/{order_id}/notes/{order_note_id}/files'],
    OrderNoteFile: [
        'GET /api/{api_version}/orders/{order_id}/notes/{order_note_id}/files',
        'GET /api/{api_version}/orders/{order_id}/notes/{order_note_id}/files/{order_file_id}',
    ],
    OrderDiscardDraft: ['POST /api/{api_version}/orders/{order_id}/discard_draft'],
    OrderExtendTrial: ['POST /api/{api_version}/orders/{order_id}/extend_trial'],
    AccountOrder: [
        'GET /api/{api_version}/accounts/{account_id}/orders',
        'GET /api/{api_version}/orders/{order_id}/custom_objects',
        'GET /api/{api_version}/orders/{order_id}/custom_objects_instances',
        'GET /api/{api_version}/orders/{order_id}/item_fulfillments',
    ],
    OrderCustomObject: [
        'GET /api/{api_version}/orders/{order_id}/custom_objects/{custom_object_id}',
        'GET /api/{api_version}/orders/{order_id}/custom_objects_instances/{custom_object_id}',
    ],
    OrderItemFulfillment: ['GET /api/{api_version}/orders/{order_id}/item_fulfillments/{fulfillment_id}'],
    OrderKpis: ['GET /api/{api_version}/orders/{order_id}/kpis'],
    OrderPayment: ['GET /api/{api_version}/orders/{order_id}/payments/{payment_id}'],
    OrderQuotePartialInvoices: ['GET /api/{api_version}/orders/{order_id}/quote_partial_invoices'],
};

sealDtoSchema(
    Order,
    OrderList,
    OrderNote,
    OrderNoteList,
    OrderRead,
    OrderInformation,
    AccountOrders,
    OrderBillingPreferences,
    ContractProperty,
    ActivityLog,
    Item,
    PricingRule,
    ItemPriceSnapshot,
    ItemPriceTax,
    TaxCode,
    ItemSaleTaxConfiguration,
    SalesRevenue,
    ItemAccountingCode,
    ItemCustomAttribute,
    PreOrderStockDetail,
    ItemProperty,
    Line,
    OrderLines,
    Processor,
    PaymentMethod,
    OrderPaymentMethods,
    Pdf,
    OrderPdf,
    OrderLineItemAccountingCode,
    OrderLine,
    OrderPaymentMethod,
    OrderNoteFile,
    OrderNoteFileList,
    OrderDiscardDraft,
    OrderExtendTrial,
    Currency,
    TimeZone,
    CustomForm,
    Manager,
    Account,
    DiscountProfile,
    BillingAddress,
    ShippingAddress,
    CommunicationPreference,
    ProformaProperty,
    BillingPreference,
    SalesRep,
    ShippingProfile,
    ReferralAccount,
    OrderNoteOrder,
    Attachment,
    Watcher,
    CreatedBy,
    LastUpdatedBy,
    CustomAttribute,
    OrderReadLineItem,
    OrderReadLineItemPriceSnapshotPricingRule,
    OrderReadLineItemPriceSnapshot,
    OrderReadLineItemPriceTax,
    OrderReadLineItemSaleTaxConfigurationTaxCode,
    OrderReadLineItemSaleTaxConfiguration,
    OrderReadLineItemAccountingCodeSalesRevenue,
    OrderReadLineItemAccountingCode,
    OrderReadLineItemCustomAttribute,
    OrderReadLinePreOrderStockDetail,
    OrderReadLineItemProperty,
    Booking,
    OrderReadLine,
    Kpi,
    AccountOrder,
    OrderReadContractProperty,
    OrderCustomObject,
    OrderItemFulfillmentAccount,
    OrderItemFulfillmentCreatedBy,
    OrderItemFulfillmentFulfillmentItem,
    OrderItemFulfillmentFulfillment,
    OrderItemFulfillmentInvoice,
    OrderItemFulfillmentLastUpdatedBy,
    OrderItemFulfillment,
    OrderKpis,
    OrderPaymentAccount,
    OrderPaymentCreatedBy,
    OrderPaymentInvoice,
    OrderPaymentPaymentApplied,
    OrderPayment,
    OrderQuotePartialInvoices,
);
