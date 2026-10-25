/** Typed views over the v4 settings bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `accounting_code` block of {@link SettingsDiscountProfile}. */
export class SettingsDiscountProfileAccountingCode extends Dto {
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

/** The `tax_code` block of {@link SettingsDiscountProfile}. */
export class TaxCode extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The settings discount profile body. */
export class SettingsDiscountProfile extends Dto {
    static override FIELDS = {
        accountingCode: SettingsDiscountProfileAccountingCode,
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        discountType: 'string',
        displayName: 'string',
        endTime: 'string',
        fixedAmount: 'float',
        href: 'string',
        id: 'string',
        invoiceNote: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        maxUsePerAccount: 'int',
        maxUsePerOrder: 'int',
        maxUseTotal: 'int',
        name: 'string',
        object: 'string',
        ownerType: 'string',
        percentageAmount: 'float',
        priceIsInclusiveOfDiscount: 'boolean',
        priority: 'int',
        redemptionRequired: 'boolean',
        stackable: 'boolean',
        startTime: 'string',
        status: 'string',
        taxCode: TaxCode,
        version: 'int',
    } as const;

    accountingCode = this.declared<SettingsDiscountProfileAccountingCode | null>('accountingCode');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    discountType = this.declared<string | null>('discountType');
    displayName = this.declared<string | null>('displayName');
    endTime = this.declared<string | null>('endTime');
    fixedAmount = this.declared<number | null>('fixedAmount');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    invoiceNote = this.declared<string | null>('invoiceNote');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    maxUsePerAccount = this.declared<number | null>('maxUsePerAccount');
    maxUsePerOrder = this.declared<number | null>('maxUsePerOrder');
    maxUseTotal = this.declared<number | null>('maxUseTotal');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    ownerType = this.declared<string | null>('ownerType');
    percentageAmount = this.declared<number | null>('percentageAmount');
    priceIsInclusiveOfDiscount = this.declared<boolean | null>('priceIsInclusiveOfDiscount');
    priority = this.declared<number | null>('priority');
    redemptionRequired = this.declared<boolean | null>('redemptionRequired');
    stackable = this.declared<boolean | null>('stackable');
    startTime = this.declared<string | null>('startTime');
    status = this.declared<string | null>('status');
    taxCode = this.declared<TaxCode | null>('taxCode');
    version = this.declared<number | null>('version');
}

/** A page of SettingsDiscountProfile records. */
export class SettingsDiscountProfileList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsDiscountProfile),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsDiscountProfile | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `currency` block of {@link SettingsPaymentProcessor}. */
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

/** The settings payment processor body. */
export class SettingsPaymentProcessor extends Dto {
    static override FIELDS = {
        accountingCode: SettingsDiscountProfileAccountingCode,
        conversionRate: 'float',
        createdBy: 'any',
        createdOn: 'string',
        currency: Currency,
        description: 'any',
        disconnected: 'boolean',
        displayName: 'string',
        gatewayType: 'string',
        href: 'string',
        id: 'string',
        integrationState: 'string',
        isDefault: 'boolean',
        isForeignCurrency: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        provider: 'string',
        status: 'string',
        version: 'int',
    } as const;

    accountingCode = this.declared<SettingsDiscountProfileAccountingCode | null>('accountingCode');
    conversionRate = this.declared<number | null>('conversionRate');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    description = this.declared<unknown>('description');
    disconnected = this.declared<boolean | null>('disconnected');
    displayName = this.declared<string | null>('displayName');
    gatewayType = this.declared<string | null>('gatewayType');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    integrationState = this.declared<string | null>('integrationState');
    isDefault = this.declared<boolean | null>('isDefault');
    isForeignCurrency = this.declared<boolean | null>('isForeignCurrency');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    provider = this.declared<string | null>('provider');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of SettingsPaymentProcessor records. */
export class SettingsPaymentProcessorList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsPaymentProcessor),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsPaymentProcessor | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `tax_rule` block of {@link SettingsShippingProfile}. */
export class TaxRule extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** The settings shipping profile body. */
export class SettingsShippingProfile extends Dto {
    static override FIELDS = {
        accountingCode: SettingsDiscountProfileAccountingCode,
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        fixedAmount: 'float',
        href: 'string',
        id: 'string',
        integrationConnection: 'any',
        invoiceNote: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        priceTaxInclusive: 'boolean',
        salesTaxRate: 'float',
        shippingType: 'string',
        status: 'string',
        taxExempt: 'boolean',
        taxRule: TaxRule,
        version: 'int',
    } as const;

    accountingCode = this.declared<SettingsDiscountProfileAccountingCode | null>('accountingCode');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    fixedAmount = this.declared<number | null>('fixedAmount');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    integrationConnection = this.declared<unknown>('integrationConnection');
    invoiceNote = this.declared<string | null>('invoiceNote');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    salesTaxRate = this.declared<number | null>('salesTaxRate');
    shippingType = this.declared<string | null>('shippingType');
    status = this.declared<string | null>('status');
    taxExempt = this.declared<boolean | null>('taxExempt');
    taxRule = this.declared<TaxRule | null>('taxRule');
    version = this.declared<number | null>('version');
}

/** A page of SettingsShippingProfile records. */
export class SettingsShippingProfileList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsShippingProfile),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsShippingProfile | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The settings pricing level body. */
export class SettingsPricingLevel extends Dto {
    static override FIELDS = {
        builtInItem: 'any',
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        isDefault: 'any',
        isTaxInclusive: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        ordering: 'int',
        status: 'string',
        taxCode: TaxCode,
        taxExempt: 'boolean',
        taxInclusiveBasedOn: 'string',
    } as const;

    builtInItem = this.declared<unknown>('builtInItem');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isDefault = this.declared<unknown>('isDefault');
    isTaxInclusive = this.declared<boolean | null>('isTaxInclusive');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    ordering = this.declared<number | null>('ordering');
    status = this.declared<string | null>('status');
    taxCode = this.declared<TaxCode | null>('taxCode');
    taxExempt = this.declared<boolean | null>('taxExempt');
    taxInclusiveBasedOn = this.declared<string | null>('taxInclusiveBasedOn');
}

/** A page of SettingsPricingLevel records. */
export class SettingsPricingLevelList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsPricingLevel),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsPricingLevel | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The settings time zone body. */
export class SettingsTimeZone extends Dto {
    static override FIELDS = {
        code: 'string',
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        dstEnabled: 'boolean',
        hour: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        minute: 'int',
        name: 'string',
        object: 'string',
        offset: 'int',
        positive: 'boolean',
        status: 'string',
        timeZonePattern: 'string',
    } as const;

    code = this.declared<string | null>('code');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    dstEnabled = this.declared<boolean | null>('dstEnabled');
    hour = this.declared<number | null>('hour');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    minute = this.declared<number | null>('minute');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    offset = this.declared<number | null>('offset');
    positive = this.declared<boolean | null>('positive');
    status = this.declared<string | null>('status');
    timeZonePattern = this.declared<string | null>('timeZonePattern');
}

/** A page of SettingsTimeZone records. */
export class SettingsTimeZoneList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsTimeZone),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsTimeZone | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `country` block of {@link SettingsCurrency}. */
export class Country extends Dto {
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

/** The settings warehouse body. */
export class SettingsWarehouse extends Dto {
    static override FIELDS = {
        city: 'string',
        country: Country,
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        isDefault: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        postCode: 'string',
        state: 'string',
        status: 'string',
        version: 'int',
    } as const;

    city = this.declared<string | null>('city');
    country = this.declared<Country | null>('country');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isDefault = this.declared<boolean | null>('isDefault');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    postCode = this.declared<string | null>('postCode');
    state = this.declared<string | null>('state');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of SettingsWarehouse records. */
export class SettingsWarehouseList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsWarehouse),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsWarehouse | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The settings currency body. */
export class SettingsCurrency extends Dto {
    static override FIELDS = {
        cashRoundingInterval: 'float',
        code: 'string',
        conversionRate: 'float',
        country: Country,
        createdBy: 'any',
        createdOn: 'string',
        decimalPlaces: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        rounding: 'string',
        status: 'string',
        symbol: 'string',
    } as const;

    cashRoundingInterval = this.declared<number | null>('cashRoundingInterval');
    code = this.declared<string | null>('code');
    conversionRate = this.declared<number | null>('conversionRate');
    country = this.declared<Country | null>('country');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    decimalPlaces = this.declared<number | null>('decimalPlaces');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    rounding = this.declared<string | null>('rounding');
    status = this.declared<string | null>('status');
    symbol = this.declared<string | null>('symbol');
}

/** A page of SettingsCurrency records. */
export class SettingsCurrencyList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsCurrency),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsCurrency | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The settings item group body. */
export class SettingsItemGroup extends Dto {
    static override FIELDS = {
        accountingCode: SettingsDiscountProfileAccountingCode,
        code: 'string',
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        version: 'int',
    } as const;

    accountingCode = this.declared<SettingsDiscountProfileAccountingCode | null>('accountingCode');
    code = this.declared<string | null>('code');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of SettingsItemGroup records. */
export class SettingsItemGroupList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsItemGroup),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsItemGroup | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The custom object body. */
export class CustomObject extends Dto {
    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        customComponent: 'any',
        description: 'string',
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
    description = this.declared<string | null>('description');
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

/** A page of CustomObject records. */
export class CustomObjectList extends Dto {
    static override FIELDS = {
        data: dtoList(CustomObject),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<CustomObject | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `country_tax_by_states` on {@link SettingsTax}. */
export class CountryTaxByState extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        state: 'any',
        rate: 'float',
        createdOn: 'string',
        lastUpdatedOn: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    state = this.declared<unknown>('state');
    rate = this.declared<number | null>('rate');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
}

/** The settings tax body. */
export class SettingsTax extends Dto {
    static override FIELDS = {
        code: 'string',
        country: Country,
        countryTaxByStates: dtoList(CountryTaxByState),
        createdBy: 'any',
        createdOn: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        rate: 'float',
        status: 'string',
    } as const;

    code = this.declared<string | null>('code');
    country = this.declared<Country | null>('country');
    countryTaxByStates = this.declared<Array<CountryTaxByState | null> | null>('countryTaxByStates');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    rate = this.declared<number | null>('rate');
    status = this.declared<string | null>('status');
}

/** A page of SettingsTax records. */
export class SettingsTaxList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsTax),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsTax | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The settings variation body. */
export class SettingsVariation extends Dto {
    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** A page of SettingsVariation records. */
export class SettingsVariationList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsVariation),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsVariation | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `duration` block of {@link SettingsPaymentTerm}. */
export class Duration extends Dto {
    static override FIELDS = {
        period: 'string',
        count: 'int',
    } as const;

    period = this.declared<string | null>('period');
    count = this.declared<number | null>('count');
}

/** The settings payment term body. */
export class SettingsPaymentTerm extends Dto {
    static override FIELDS = {
        description: 'any',
        displayName: 'string',
        duration: Duration,
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    duration = this.declared<Duration | null>('duration');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** A page of SettingsPaymentTerm records. */
export class SettingsPaymentTermList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsPaymentTerm),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsPaymentTerm | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `accounting_code` block of {@link SettingsItemGroups}. */
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

/** The settings item groups body. */
export class SettingsItemGroups extends Dto {
    static override ENVELOPE_KEY = 'item_group';

    static override FIELDS = {
        accountingCode: AccountingCode,
        billingPreferences: 'any',
        code: 'string',
        createdBy: 'string',
        createdOn: 'string',
        customAttributes: 'any',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        imageUri: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        manager: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        uuid: 'string',
        version: 'int',
    } as const;

    accountingCode = this.declared<AccountingCode | null>('accountingCode');
    billingPreferences = this.declared<unknown>('billingPreferences');
    code = this.declared<string | null>('code');
    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    imageUri = this.declared<string | null>('imageUri');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    manager = this.declared<string | null>('manager');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** The settings custom logic script body. */
export class SettingsCustomLogicScript extends Dto {
    static override ENVELOPE_KEY = 'custom_logic_script';

    static override FIELDS = {
        actionName: 'string',
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        objectName: 'string',
        status: 'string',
        type: 'string',
    } as const;

    actionName = this.declared<string | null>('actionName');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    objectName = this.declared<string | null>('objectName');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
}

/** The settings currency read body. */
export class SettingsCurrencyRead extends Dto {
    static override ENVELOPE_KEY = 'currency';

    static override FIELDS = {
        cashRoundingInterval: 'float',
        code: 'string',
        conversionRate: 'float',
        country: Country,
        createdBy: 'any',
        createdOn: 'string',
        decimalPlaces: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        rounding: 'string',
        status: 'string',
        symbol: 'string',
    } as const;

    cashRoundingInterval = this.declared<number | null>('cashRoundingInterval');
    code = this.declared<string | null>('code');
    conversionRate = this.declared<number | null>('conversionRate');
    country = this.declared<Country | null>('country');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    decimalPlaces = this.declared<number | null>('decimalPlaces');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    rounding = this.declared<string | null>('rounding');
    status = this.declared<string | null>('status');
    symbol = this.declared<string | null>('symbol');
}

/** One entry of `attributes` on {@link Configuration}. */
export class Attribute extends Dto {
    static override FIELDS = {
        name: 'string',
        order: 'int',
    } as const;

    name = this.declared<string | null>('name');
    order = this.declared<number | null>('order');
}

/** The `configuration` block of {@link SettingsCustomObjectCustomize}. */
export class Configuration extends Dto {
    static override FIELDS = {
        attributes: dtoList(Attribute),
    } as const;

    attributes = this.declared<Array<Attribute | null> | null>('attributes');
}

/** The settings custom object customize body. */
export class SettingsCustomObjectCustomize extends Dto {
    static override ENVELOPE_KEY = 'custom_object';

    static override FIELDS = {
        configuration: Configuration,
        created: 'string',
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        relation: 'string',
        status: 'string',
        updated: 'string',
        useIn: 'string',
        uuid: 'string',
    } as const;

    configuration = this.declared<Configuration | null>('configuration');
    created = this.declared<string | null>('created');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    relation = this.declared<string | null>('relation');
    status = this.declared<string | null>('status');
    updated = this.declared<string | null>('updated');
    useIn = this.declared<string | null>('useIn');
    uuid = this.declared<string | null>('uuid');
}

/** The settings custom objects body. */
export class SettingsCustomObjects extends Dto {
    static override ENVELOPE_KEY = 'custom_object';

    static override FIELDS = {
        created: 'string',
        createdBy: 'any',
        createdOn: 'string',
        customComponent: 'any',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        relation: 'string',
        status: 'string',
        updated: 'string',
        useIn: 'string',
        uuid: 'string',
    } as const;

    created = this.declared<string | null>('created');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customComponent = this.declared<unknown>('customComponent');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    relation = this.declared<string | null>('relation');
    status = this.declared<string | null>('status');
    updated = this.declared<string | null>('updated');
    useIn = this.declared<string | null>('useIn');
    uuid = this.declared<string | null>('uuid');
}

/** The settings variations body. */
export class SettingsVariations extends Dto {
    static override ENVELOPE_KEY = 'variation';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        options: 'any',
        status: 'string',
        uuid: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    options = this.declared<unknown>('options');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
}

/** The settings time zone read body. */
export class SettingsTimeZoneRead extends Dto {
    static override ENVELOPE_KEY = 'time_zone';

    static override FIELDS = {
        code: 'string',
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        dstEnabled: 'boolean',
        hour: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        minute: 'int',
        name: 'string',
        object: 'string',
        offset: 'int',
        positive: 'boolean',
        status: 'string',
        timeZonePattern: 'string',
    } as const;

    code = this.declared<string | null>('code');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    dstEnabled = this.declared<boolean | null>('dstEnabled');
    hour = this.declared<number | null>('hour');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    minute = this.declared<number | null>('minute');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    offset = this.declared<number | null>('offset');
    positive = this.declared<boolean | null>('positive');
    status = this.declared<string | null>('status');
    timeZonePattern = this.declared<string | null>('timeZonePattern');
}

/** The settings custom logic scripts body. */
export class SettingsCustomLogicScripts extends Dto {
    static override FIELDS = {
        data: 'any',
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<unknown>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `resources` on {@link Settings}. */
export class Resource extends Dto {
    static override FIELDS = {
        name: 'string',
        href: 'string',
    } as const;

    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
}

/** The settings body. */
export class Settings extends Dto {
    static override ENVELOPE_KEY = 'settings';

    static override FIELDS = {
        object: 'string',
        resources: dtoList(Resource),
    } as const;

    object = this.declared<string | null>('object');
    resources = this.declared<Array<Resource | null> | null>('resources');
}

/** The settings field settings item body. */
export class SettingsFieldSettingsItem extends Dto {
    static override FIELDS = {
        message: 'string',
    } as const;

    message = this.declared<string | null>('message');
}

/** The `account_grouping` block of {@link Account}. */
export class AccountGrouping extends Dto {
    static override FIELDS = {
        enabled: 'string',
        defaultGroup: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    defaultGroup = this.declared<unknown>('defaultGroup');
}

/** The `creation_of_subsidiary_account` block of {@link Account}. */
export class CreationOfSubsidiaryAccount extends Dto {
    static override FIELDS = {
        enabled: 'string',
        defaultGroup: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    defaultGroup = this.declared<unknown>('defaultGroup');
}

/** The `account_management` block of {@link Account}. */
export class AccountManagement extends Dto {
    static override FIELDS = {
        enabled: 'string',
        defaultManager: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    defaultManager = this.declared<unknown>('defaultManager');
}

/** The `sales_rep_tracking_at_account_level` block of {@link Account}. */
export class SalesRepTrackingAtAccountLevel extends Dto {
    static override FIELDS = {
        enabled: 'string',
        defaultSalesRepTracking: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    defaultSalesRepTracking = this.declared<unknown>('defaultSalesRepTracking');
}

/** The `referral_tracking_at_account_level` block of {@link Account}. */
export class ReferralTrackingAtAccountLevel extends Dto {
    static override FIELDS = {
        enabled: 'string',
        defaultReferralTracking: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    defaultReferralTracking = this.declared<unknown>('defaultReferralTracking');
}

/** The `billing_contact` block of {@link Account}. */
export class BillingContact extends Dto {
    static override FIELDS = {
        enabled: 'string',
        type: 'string',
        displayName: 'string',
        requireEmailAddressForBillingContact: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    type = this.declared<string | null>('type');
    displayName = this.declared<string | null>('displayName');
    requireEmailAddressForBillingContact = this.declared<string | null>('requireEmailAddressForBillingContact');
}

/** The `shipping_contact` block of {@link Account}. */
export class ShippingContact extends Dto {
    static override FIELDS = {
        enabled: 'string',
        type: 'string',
        displayName: 'string',
        requireEmailAddressForShippingContact: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    type = this.declared<string | null>('type');
    displayName = this.declared<string | null>('displayName');
    requireEmailAddressForShippingContact = this.declared<string | null>('requireEmailAddressForShippingContact');
}

/** The `additional_contact_1` block of {@link Account}. */
export class AdditionalContact1 extends Dto {
    static override FIELDS = {
        enabled: 'string',
        type: 'string',
        displayName: 'string',
        requireEmailAddressForAdditionalContact1: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    type = this.declared<string | null>('type');
    displayName = this.declared<string | null>('displayName');
    requireEmailAddressForAdditionalContact1 = this.declared<string | null>('requireEmailAddressForAdditionalContact1');
}

/** The `additional_contact_2` block of {@link Account}. */
export class AdditionalContact2 extends Dto {
    static override FIELDS = {
        enabled: 'string',
        type: 'string',
        displayName: 'string',
        requireEmailAddressForAdditionalContact2: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    type = this.declared<string | null>('type');
    displayName = this.declared<string | null>('displayName');
    requireEmailAddressForAdditionalContact2 = this.declared<string | null>('requireEmailAddressForAdditionalContact2');
}

/** The `additional_contact_3` block of {@link Account}. */
export class AdditionalContact3 extends Dto {
    static override FIELDS = {
        enabled: 'string',
        type: 'string',
        displayName: 'string',
        requireEmailAddressForAdditionalContact3: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    type = this.declared<string | null>('type');
    displayName = this.declared<string | null>('displayName');
    requireEmailAddressForAdditionalContact3 = this.declared<string | null>('requireEmailAddressForAdditionalContact3');
}

/** The `account` block of {@link SettingsGeneralSettingsAccountUpdated}. */
export class Account extends Dto {
    static override FIELDS = {
        accountGrouping: AccountGrouping,
        creationOfSubsidiaryAccount: CreationOfSubsidiaryAccount,
        accountManagement: AccountManagement,
        salesRepTrackingAtAccountLevel: SalesRepTrackingAtAccountLevel,
        referralTrackingAtAccountLevel: ReferralTrackingAtAccountLevel,
        sendCommunicationAsGroups: 'string',
        enableWorkflowApprovalForAccount: 'string',
        requireNameToBeUnique: 'string',
        requireEmailAddressForAccount: 'string',
        uniqueEmailAddressForAccount: 'string',
        uniqueEmailAddressForContacts: 'string',
        billingContact: BillingContact,
        shippingContact: ShippingContact,
        additionalContact1: AdditionalContact1,
        additionalContact2: AdditionalContact2,
        additionalContact3: AdditionalContact3,
    } as const;

    accountGrouping = this.declared<AccountGrouping | null>('accountGrouping');
    creationOfSubsidiaryAccount = this.declared<CreationOfSubsidiaryAccount | null>('creationOfSubsidiaryAccount');
    accountManagement = this.declared<AccountManagement | null>('accountManagement');
    salesRepTrackingAtAccountLevel = this.declared<SalesRepTrackingAtAccountLevel | null>(
        'salesRepTrackingAtAccountLevel',
    );
    referralTrackingAtAccountLevel = this.declared<ReferralTrackingAtAccountLevel | null>(
        'referralTrackingAtAccountLevel',
    );
    sendCommunicationAsGroups = this.declared<string | null>('sendCommunicationAsGroups');
    enableWorkflowApprovalForAccount = this.declared<string | null>('enableWorkflowApprovalForAccount');
    requireNameToBeUnique = this.declared<string | null>('requireNameToBeUnique');
    requireEmailAddressForAccount = this.declared<string | null>('requireEmailAddressForAccount');
    uniqueEmailAddressForAccount = this.declared<string | null>('uniqueEmailAddressForAccount');
    uniqueEmailAddressForContacts = this.declared<string | null>('uniqueEmailAddressForContacts');
    billingContact = this.declared<BillingContact | null>('billingContact');
    shippingContact = this.declared<ShippingContact | null>('shippingContact');
    additionalContact1 = this.declared<AdditionalContact1 | null>('additionalContact1');
    additionalContact2 = this.declared<AdditionalContact2 | null>('additionalContact2');
    additionalContact3 = this.declared<AdditionalContact3 | null>('additionalContact3');
}

/** The settings general settings account updated body. */
export class SettingsGeneralSettingsAccountUpdated extends Dto {
    static override ENVELOPE_KEY = 'general_settings';

    static override FIELDS = {
        account: Account,
    } as const;

    account = this.declared<Account | null>('account');
}

/** One entry of `data` on {@link SettingsFieldSettingsAccountUpdated}. */
export class SettingsFieldSettingsAccount extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        entity: 'string',
        fieldName: 'string',
        displayCode: 'string',
        description: 'any',
        fieldType: 'string',
        enabled: 'boolean',
        mandatory: 'boolean',
        editable: 'any',
        globalSearch: 'boolean',
        sortOrder: 'int',
        groupKey: 'string',
        note: 'any',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    entity = this.declared<string | null>('entity');
    fieldName = this.declared<string | null>('fieldName');
    displayCode = this.declared<string | null>('displayCode');
    description = this.declared<unknown>('description');
    fieldType = this.declared<string | null>('fieldType');
    enabled = this.declared<boolean | null>('enabled');
    mandatory = this.declared<boolean | null>('mandatory');
    editable = this.declared<unknown>('editable');
    globalSearch = this.declared<boolean | null>('globalSearch');
    sortOrder = this.declared<number | null>('sortOrder');
    groupKey = this.declared<string | null>('groupKey');
    note = this.declared<unknown>('note');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    href = this.declared<string | null>('href');
}

/** A page of SettingsFieldSettingsAccount records. */
export class SettingsFieldSettingsAccountUpdated extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(SettingsFieldSettingsAccount),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<SettingsFieldSettingsAccount | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** The `available_charge_types` block of {@link Item}. */
export class AvailableChargeType extends Dto {
    static override FIELDS = {
        oneOff: 'string',
        recurring: 'string',
        metered: 'string',
    } as const;

    oneOff = this.declared<string | null>('oneOff');
    recurring = this.declared<string | null>('recurring');
    metered = this.declared<string | null>('metered');
}

/** The `available_pricing_methods` block of {@link Item}. */
export class AvailablePricingMethod extends Dto {
    static override FIELDS = {
        standard: 'string',
        discountBased: 'string',
        markupBased: 'string',
    } as const;

    standard = this.declared<string | null>('standard');
    discountBased = this.declared<string | null>('discountBased');
    markupBased = this.declared<string | null>('markupBased');
}

/** The `item_grouping` block of {@link Item}. */
export class ItemGrouping extends Dto {
    static override FIELDS = {
        enabled: 'string',
        defaultGroup: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    defaultGroup = this.declared<unknown>('defaultGroup');
}

/** The `item_management` block of {@link Item}. */
export class ItemManagement extends Dto {
    static override FIELDS = {
        enabled: 'string',
        defaultManager: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    defaultManager = this.declared<unknown>('defaultManager');
}

/** The `use_volume_pricing` block of {@link Item}. */
export class UseVolumePricing extends Dto {
    static override FIELDS = {
        enabled: 'string',
        allUnitsFixedPricing: 'string',
        incrementalFixedPricing: 'string',
        allUnitsPerUnitPricing: 'string',
        incrementalPerUnitPricing: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    allUnitsFixedPricing = this.declared<string | null>('allUnitsFixedPricing');
    incrementalFixedPricing = this.declared<string | null>('incrementalFixedPricing');
    allUnitsPerUnitPricing = this.declared<string | null>('allUnitsPerUnitPricing');
    incrementalPerUnitPricing = this.declared<string | null>('incrementalPerUnitPricing');
}

/** The `pricing_period_can_vary_from_charging_period` block of {@link Item}. */
export class PricingPeriodCanVaryFromChargingPeriod extends Dto {
    static override FIELDS = {
        enabled: 'string',
        defaultPricingPeriod: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    defaultPricingPeriod = this.declared<unknown>('defaultPricingPeriod');
}

/** The `sale_price_entered_is_inclusive_of_tax` block of {@link Item}. */
export class SalePriceEnteredIsInclusiveOfTax extends Dto {
    static override FIELDS = {
        enabled: 'string',
        taxIncludedInSalesPriceIsBasedOn: 'string',
        tax: 'any',
    } as const;

    enabled = this.declared<string | null>('enabled');
    taxIncludedInSalesPriceIsBasedOn = this.declared<string | null>('taxIncludedInSalesPriceIsBasedOn');
    tax = this.declared<unknown>('tax');
}

/** The `tax` block of {@link PurchasePriceEnteredIsInclusiveOfTax}. */
export class Tax extends Dto {
    static override FIELDS = {
        uuid: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
}

/** The `purchase_price_entered_is_inclusive_of_tax` block of {@link Item}. */
export class PurchasePriceEnteredIsInclusiveOfTax extends Dto {
    static override FIELDS = {
        enabled: 'string',
        tax: Tax,
    } as const;

    enabled = this.declared<string | null>('enabled');
    tax = this.declared<Tax | null>('tax');
}

/** The `inventory_adjustment_rules` block of {@link Item}. */
export class InventoryAdjustmentRule extends Dto {
    static override FIELDS = {
        quantityAvailableForSale: 'string',
        quantityAvailableForSaleDetermination: 'string',
    } as const;

    quantityAvailableForSale = this.declared<string | null>('quantityAvailableForSale');
    quantityAvailableForSaleDetermination = this.declared<string | null>('quantityAvailableForSaleDetermination');
}

/** The `pre_order` block of {@link Item}. */
export class PreOrder extends Dto {
    static override FIELDS = {
        enabled: 'string',
        period: 'string',
        numberOfPeriod: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    period = this.declared<string | null>('period');
    numberOfPeriod = this.declared<string | null>('numberOfPeriod');
}

/** The `item` block of {@link SettingsGeneralSettingsItemUpdated}. */
export class Item extends Dto {
    static override FIELDS = {
        enableSales: 'string',
        enablePurchase: 'string',
        enableInventoryManagement: 'string',
        requireNameToBeUnique: 'string',
        enableVariation: 'string',
        enableWorkflowApprovalForItem: 'string',
        enablePricingProfile: 'string',
        useOnSalePrice: 'string',
        useShippingProfile: 'string',
        usePricingLevel: 'string',
        useSchedulingOfFuturePricing: 'string',
        chargingPeriodCanVaryFromBillingPeriod: 'string',
        chargingStartDateCanVaryFromBillingStartDate: 'string',
        enableSupplierManagement: 'string',
        enableWarehouseManagement: 'string',
        enableSerialization: 'string',
        enableBatchTracking: 'string',
        enableInventoryCosting: 'string',
        enableBackOrder: 'string',
        enableVariationBasedItem: 'string',
        enableGiftCertificateBasedItem: 'string',
        enableBundleItem: 'string',
        enableDirectCostItem: 'string',
        enableFixedAssetItem: 'string',
        enableFamilyCostItem: 'string',
        availableChargeTypes: AvailableChargeType,
        availablePricingMethods: AvailablePricingMethod,
        itemGrouping: ItemGrouping,
        itemManagement: ItemManagement,
        useVolumePricing: UseVolumePricing,
        pricingPeriodCanVaryFromChargingPeriod: PricingPeriodCanVaryFromChargingPeriod,
        salePriceEnteredIsInclusiveOfTax: SalePriceEnteredIsInclusiveOfTax,
        purchasePriceEnteredIsInclusiveOfTax: PurchasePriceEnteredIsInclusiveOfTax,
        inventoryAdjustmentRules: InventoryAdjustmentRule,
        preOrder: PreOrder,
    } as const;

    enableSales = this.declared<string | null>('enableSales');
    enablePurchase = this.declared<string | null>('enablePurchase');
    enableInventoryManagement = this.declared<string | null>('enableInventoryManagement');
    requireNameToBeUnique = this.declared<string | null>('requireNameToBeUnique');
    enableVariation = this.declared<string | null>('enableVariation');
    enableWorkflowApprovalForItem = this.declared<string | null>('enableWorkflowApprovalForItem');
    enablePricingProfile = this.declared<string | null>('enablePricingProfile');
    useOnSalePrice = this.declared<string | null>('useOnSalePrice');
    useShippingProfile = this.declared<string | null>('useShippingProfile');
    usePricingLevel = this.declared<string | null>('usePricingLevel');
    useSchedulingOfFuturePricing = this.declared<string | null>('useSchedulingOfFuturePricing');
    chargingPeriodCanVaryFromBillingPeriod = this.declared<string | null>('chargingPeriodCanVaryFromBillingPeriod');
    chargingStartDateCanVaryFromBillingStartDate = this.declared<string | null>(
        'chargingStartDateCanVaryFromBillingStartDate',
    );
    enableSupplierManagement = this.declared<string | null>('enableSupplierManagement');
    enableWarehouseManagement = this.declared<string | null>('enableWarehouseManagement');
    enableSerialization = this.declared<string | null>('enableSerialization');
    enableBatchTracking = this.declared<string | null>('enableBatchTracking');
    enableInventoryCosting = this.declared<string | null>('enableInventoryCosting');
    enableBackOrder = this.declared<string | null>('enableBackOrder');
    enableVariationBasedItem = this.declared<string | null>('enableVariationBasedItem');
    enableGiftCertificateBasedItem = this.declared<string | null>('enableGiftCertificateBasedItem');
    enableBundleItem = this.declared<string | null>('enableBundleItem');
    enableDirectCostItem = this.declared<string | null>('enableDirectCostItem');
    enableFixedAssetItem = this.declared<string | null>('enableFixedAssetItem');
    enableFamilyCostItem = this.declared<string | null>('enableFamilyCostItem');
    availableChargeTypes = this.declared<AvailableChargeType | null>('availableChargeTypes');
    availablePricingMethods = this.declared<AvailablePricingMethod | null>('availablePricingMethods');
    itemGrouping = this.declared<ItemGrouping | null>('itemGrouping');
    itemManagement = this.declared<ItemManagement | null>('itemManagement');
    useVolumePricing = this.declared<UseVolumePricing | null>('useVolumePricing');
    pricingPeriodCanVaryFromChargingPeriod = this.declared<PricingPeriodCanVaryFromChargingPeriod | null>(
        'pricingPeriodCanVaryFromChargingPeriod',
    );
    salePriceEnteredIsInclusiveOfTax = this.declared<SalePriceEnteredIsInclusiveOfTax | null>(
        'salePriceEnteredIsInclusiveOfTax',
    );
    purchasePriceEnteredIsInclusiveOfTax = this.declared<PurchasePriceEnteredIsInclusiveOfTax | null>(
        'purchasePriceEnteredIsInclusiveOfTax',
    );
    inventoryAdjustmentRules = this.declared<InventoryAdjustmentRule | null>('inventoryAdjustmentRules');
    preOrder = this.declared<PreOrder | null>('preOrder');
}

/** The `product` block of {@link SettingsGeneralSettingsItemUpdated}. */
export class Product extends Dto {
    static override FIELDS = {
        allowProductSellMultiQuantity: 'string',
        allowPlanSellMultiQuantity: 'string',
        allowItemSellMultiQuantity: 'string',
        allowRateSellMultiQuantity: 'string',
        productQuantityUse: 'string',
        planQuantityUse: 'string',
        itemQuantityUse: 'string',
        rateQuantityUse: 'string',
    } as const;

    allowProductSellMultiQuantity = this.declared<string | null>('allowProductSellMultiQuantity');
    allowPlanSellMultiQuantity = this.declared<string | null>('allowPlanSellMultiQuantity');
    allowItemSellMultiQuantity = this.declared<string | null>('allowItemSellMultiQuantity');
    allowRateSellMultiQuantity = this.declared<string | null>('allowRateSellMultiQuantity');
    productQuantityUse = this.declared<string | null>('productQuantityUse');
    planQuantityUse = this.declared<string | null>('planQuantityUse');
    itemQuantityUse = this.declared<string | null>('itemQuantityUse');
    rateQuantityUse = this.declared<string | null>('rateQuantityUse');
}

/** The settings general settings item updated body. */
export class SettingsGeneralSettingsItemUpdated extends Dto {
    static override ENVELOPE_KEY = 'general_settings';

    static override FIELDS = {
        item: Item,
        product: Product,
    } as const;

    item = this.declared<Item | null>('item');
    product = this.declared<Product | null>('product');
}

/** One custom object definition, as `/settings/custom_objects` serves it. */
export class SettingsCustomObjectDefinition extends Dto {
    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        relation: 'string',
        status: 'string',
        useIn: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    relation = this.declared<string | null>('relation');
    status = this.declared<string | null>('status');
    useIn = this.declared<string | null>('useIn');
}

/** One page of `SettingsCustomObjectDefinition` records, under `data`; paged by cursor. */
export class SettingsCustomObjectDefinitionList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsCustomObjectDefinition),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsCustomObjectDefinition | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One custom object definition, under `custom_object`: the record the listing serves. */
export class SettingsCustomObjectDefinitionRead extends Dto {
    static override ENVELOPE_KEY = 'custom_object';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        relation: 'string',
        status: 'string',
        useIn: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    relation = this.declared<string | null>('relation');
    status = this.declared<string | null>('status');
    useIn = this.declared<string | null>('useIn');
}

/**
 * What the custom logic script writes answer, under `custom_logic_script`: the read's fields and `code`, which the
 * server does not store.
 */
export class SettingsCustomLogicScriptSaved extends Dto {
    static override ENVELOPE_KEY = 'custom_logic_script';

    static override FIELDS = {
        actionName: 'string',
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        objectName: 'string',
        status: 'string',
        type: 'string',
        code: 'any',
    } as const;

    actionName = this.declared<string | null>('actionName');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    objectName = this.declared<string | null>('objectName');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    code = this.declared<unknown>('code');
}

/** A {@link SettingsDiscountProfile}'s `tax_code`. */
export class SettingsDiscountProfileTaxCode extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** One discount profile, under `discount_profile`: the record the listing serves. */
export class SettingsDiscountProfileRead extends Dto {
    static override ENVELOPE_KEY = 'discount_profile';

    static override FIELDS = {
        accountingCode: SettingsDiscountProfileAccountingCode,
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        discountType: 'string',
        displayName: 'string',
        endTime: 'string',
        fixedAmount: 'float',
        href: 'string',
        id: 'string',
        invoiceNote: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        maxUsePerAccount: 'int',
        maxUsePerOrder: 'int',
        maxUseTotal: 'int',
        name: 'string',
        object: 'string',
        ownerType: 'string',
        percentageAmount: 'float',
        priceIsInclusiveOfDiscount: 'boolean',
        priority: 'int',
        redemptionRequired: 'boolean',
        stackable: 'boolean',
        startTime: 'string',
        status: 'string',
        taxCode: SettingsDiscountProfileTaxCode,
        version: 'int',
    } as const;

    accountingCode = this.declared<SettingsDiscountProfileAccountingCode | null>('accountingCode');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    discountType = this.declared<string | null>('discountType');
    displayName = this.declared<string | null>('displayName');
    endTime = this.declared<string | null>('endTime');
    fixedAmount = this.declared<number | null>('fixedAmount');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    invoiceNote = this.declared<string | null>('invoiceNote');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    maxUsePerAccount = this.declared<number | null>('maxUsePerAccount');
    maxUsePerOrder = this.declared<number | null>('maxUsePerOrder');
    maxUseTotal = this.declared<number | null>('maxUseTotal');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    ownerType = this.declared<string | null>('ownerType');
    percentageAmount = this.declared<number | null>('percentageAmount');
    priceIsInclusiveOfDiscount = this.declared<boolean | null>('priceIsInclusiveOfDiscount');
    priority = this.declared<number | null>('priority');
    redemptionRequired = this.declared<boolean | null>('redemptionRequired');
    stackable = this.declared<boolean | null>('stackable');
    startTime = this.declared<string | null>('startTime');
    status = this.declared<string | null>('status');
    taxCode = this.declared<SettingsDiscountProfileTaxCode | null>('taxCode');
    version = this.declared<number | null>('version');
}

/** One entry of a {@link SettingsFieldSettingsItem}'s `data`. */
export class SettingsFieldSettingsItemData extends Dto {
    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        displayCode: 'string',
        editable: 'any',
        enabled: 'boolean',
        entity: 'string',
        fieldName: 'string',
        fieldType: 'string',
        globalSearch: 'boolean',
        groupKey: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        mandatory: 'boolean',
        note: 'any',
        object: 'string',
        sortOrder: 'int',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayCode = this.declared<string | null>('displayCode');
    editable = this.declared<unknown>('editable');
    enabled = this.declared<boolean | null>('enabled');
    entity = this.declared<string | null>('entity');
    fieldName = this.declared<string | null>('fieldName');
    fieldType = this.declared<string | null>('fieldType');
    globalSearch = this.declared<boolean | null>('globalSearch');
    groupKey = this.declared<string | null>('groupKey');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    mandatory = this.declared<boolean | null>('mandatory');
    note = this.declared<unknown>('note');
    object = this.declared<string | null>('object');
    sortOrder = this.declared<number | null>('sortOrder');
}

/** One page of `SettingsFieldSettingsItemData` records, under `data`; paged by cursor. */
export class SettingsFieldSettingList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsFieldSettingsItemData),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsFieldSettingsItemData | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One field setting, under `field_setting`: the record the listing serves. */
export class SettingsFieldSettingRead extends Dto {
    static override ENVELOPE_KEY = 'field_setting';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        displayCode: 'string',
        editable: 'any',
        enabled: 'boolean',
        entity: 'string',
        fieldName: 'string',
        fieldType: 'string',
        globalSearch: 'boolean',
        groupKey: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        mandatory: 'boolean',
        note: 'any',
        object: 'string',
        sortOrder: 'int',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayCode = this.declared<string | null>('displayCode');
    editable = this.declared<unknown>('editable');
    enabled = this.declared<boolean | null>('enabled');
    entity = this.declared<string | null>('entity');
    fieldName = this.declared<string | null>('fieldName');
    fieldType = this.declared<string | null>('fieldType');
    globalSearch = this.declared<boolean | null>('globalSearch');
    groupKey = this.declared<string | null>('groupKey');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    mandatory = this.declared<boolean | null>('mandatory');
    note = this.declared<unknown>('note');
    object = this.declared<string | null>('object');
    sortOrder = this.declared<number | null>('sortOrder');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `account_grouping`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountAccountGrouping extends Dto {
    static override FIELDS = {
        defaultGroup: 'any',
        enabled: 'string',
    } as const;

    defaultGroup = this.declared<unknown>('defaultGroup');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `account_management`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountAccountManagement extends Dto {
    static override FIELDS = {
        defaultManager: 'any',
        enabled: 'string',
    } as const;

    defaultManager = this.declared<unknown>('defaultManager');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `additional_contact_1`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact1 extends Dto {
    static override FIELDS = {
        displayName: 'string',
        enabled: 'string',
        requireEmailAddressForAdditionalContact1: 'string',
        type: 'string',
    } as const;

    displayName = this.declared<string | null>('displayName');
    enabled = this.declared<string | null>('enabled');
    requireEmailAddressForAdditionalContact1 = this.declared<string | null>('requireEmailAddressForAdditionalContact1');
    type = this.declared<string | null>('type');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `additional_contact_2`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact2 extends Dto {
    static override FIELDS = {
        displayName: 'string',
        enabled: 'string',
        requireEmailAddressForAdditionalContact2: 'string',
        type: 'string',
    } as const;

    displayName = this.declared<string | null>('displayName');
    enabled = this.declared<string | null>('enabled');
    requireEmailAddressForAdditionalContact2 = this.declared<string | null>('requireEmailAddressForAdditionalContact2');
    type = this.declared<string | null>('type');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `additional_contact_3`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact3 extends Dto {
    static override FIELDS = {
        displayName: 'string',
        enabled: 'string',
        requireEmailAddressForAdditionalContact3: 'string',
        type: 'string',
    } as const;

    displayName = this.declared<string | null>('displayName');
    enabled = this.declared<string | null>('enabled');
    requireEmailAddressForAdditionalContact3 = this.declared<string | null>('requireEmailAddressForAdditionalContact3');
    type = this.declared<string | null>('type');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `billing_contact`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountBillingContact extends Dto {
    static override FIELDS = {
        displayName: 'string',
        enabled: 'string',
        requireEmailAddressForBillingContact: 'string',
        type: 'string',
    } as const;

    displayName = this.declared<string | null>('displayName');
    enabled = this.declared<string | null>('enabled');
    requireEmailAddressForBillingContact = this.declared<string | null>('requireEmailAddressForBillingContact');
    type = this.declared<string | null>('type');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `creation_of_subsidiary_account`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountCreationOfSubsidiaryAccount extends Dto {
    static override FIELDS = {
        defaultGroup: 'any',
        enabled: 'string',
    } as const;

    defaultGroup = this.declared<unknown>('defaultGroup');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `referral_tracking_at_account_level`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountReferralTrackingAtAccountLevel extends Dto {
    static override FIELDS = {
        defaultReferralTracking: 'any',
        enabled: 'string',
    } as const;

    defaultReferralTracking = this.declared<unknown>('defaultReferralTracking');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `sales_rep_tracking_at_account_level`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountSalesRepTrackingAtAccountLevel extends Dto {
    static override FIELDS = {
        defaultSalesRepTracking: 'any',
        enabled: 'string',
    } as const;

    defaultSalesRepTracking = this.declared<unknown>('defaultSalesRepTracking');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsFieldSettingsItemGeneralSettingsAccount}'s `shipping_contact`. */
export class SettingsFieldSettingsItemGeneralSettingsAccountShippingContact extends Dto {
    static override FIELDS = {
        displayName: 'string',
        enabled: 'string',
        requireEmailAddressForShippingContact: 'string',
        type: 'string',
    } as const;

    displayName = this.declared<string | null>('displayName');
    enabled = this.declared<string | null>('enabled');
    requireEmailAddressForShippingContact = this.declared<string | null>('requireEmailAddressForShippingContact');
    type = this.declared<string | null>('type');
}

/** A {@link SettingsFieldSettingsItemGeneralSettings}'s `account`. */
export class SettingsFieldSettingsItemGeneralSettingsAccount extends Dto {
    static override FIELDS = {
        accountGrouping: SettingsFieldSettingsItemGeneralSettingsAccountAccountGrouping,
        accountManagement: SettingsFieldSettingsItemGeneralSettingsAccountAccountManagement,
        additionalContact1: SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact1,
        additionalContact2: SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact2,
        additionalContact3: SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact3,
        billingContact: SettingsFieldSettingsItemGeneralSettingsAccountBillingContact,
        creationOfSubsidiaryAccount: SettingsFieldSettingsItemGeneralSettingsAccountCreationOfSubsidiaryAccount,
        enableWorkflowApprovalForAccount: 'string',
        referralTrackingAtAccountLevel: SettingsFieldSettingsItemGeneralSettingsAccountReferralTrackingAtAccountLevel,
        requireEmailAddressForAccount: 'string',
        requireNameToBeUnique: 'string',
        salesRepTrackingAtAccountLevel: SettingsFieldSettingsItemGeneralSettingsAccountSalesRepTrackingAtAccountLevel,
        sendCommunicationAsGroups: 'string',
        shippingContact: SettingsFieldSettingsItemGeneralSettingsAccountShippingContact,
        uniqueEmailAddressForAccount: 'string',
        uniqueEmailAddressForContacts: 'string',
    } as const;

    accountGrouping = this.declared<SettingsFieldSettingsItemGeneralSettingsAccountAccountGrouping | null>(
        'accountGrouping',
    );
    accountManagement = this.declared<SettingsFieldSettingsItemGeneralSettingsAccountAccountManagement | null>(
        'accountManagement',
    );
    additionalContact1 = this.declared<SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact1 | null>(
        'additionalContact1',
    );
    additionalContact2 = this.declared<SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact2 | null>(
        'additionalContact2',
    );
    additionalContact3 = this.declared<SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact3 | null>(
        'additionalContact3',
    );
    billingContact = this.declared<SettingsFieldSettingsItemGeneralSettingsAccountBillingContact | null>(
        'billingContact',
    );
    creationOfSubsidiaryAccount =
        this.declared<SettingsFieldSettingsItemGeneralSettingsAccountCreationOfSubsidiaryAccount | null>(
            'creationOfSubsidiaryAccount',
        );
    enableWorkflowApprovalForAccount = this.declared<string | null>('enableWorkflowApprovalForAccount');
    referralTrackingAtAccountLevel =
        this.declared<SettingsFieldSettingsItemGeneralSettingsAccountReferralTrackingAtAccountLevel | null>(
            'referralTrackingAtAccountLevel',
        );
    requireEmailAddressForAccount = this.declared<string | null>('requireEmailAddressForAccount');
    requireNameToBeUnique = this.declared<string | null>('requireNameToBeUnique');
    salesRepTrackingAtAccountLevel =
        this.declared<SettingsFieldSettingsItemGeneralSettingsAccountSalesRepTrackingAtAccountLevel | null>(
            'salesRepTrackingAtAccountLevel',
        );
    sendCommunicationAsGroups = this.declared<string | null>('sendCommunicationAsGroups');
    shippingContact = this.declared<SettingsFieldSettingsItemGeneralSettingsAccountShippingContact | null>(
        'shippingContact',
    );
    uniqueEmailAddressForAccount = this.declared<string | null>('uniqueEmailAddressForAccount');
    uniqueEmailAddressForContacts = this.declared<string | null>('uniqueEmailAddressForContacts');
}

/** A {@link SettingsGeneralSettings}'s `dashboard`. */
export class SettingsGeneralSettingsDashboard extends Dto {
    static override WIRE_NAMES = {
        defaultDashboard: 'defaultDashboard',
    } as const;

    static override FIELDS = {
        accounting: 'string',
        defaultDashboard: 'any',
        executive: 'string',
        finance: 'string',
        production: 'string',
        purchase: 'string',
        sales: 'string',
    } as const;

    accounting = this.declared<string | null>('accounting');
    defaultDashboard = this.declared<unknown>('defaultDashboard');
    executive = this.declared<string | null>('executive');
    finance = this.declared<string | null>('finance');
    production = this.declared<string | null>('production');
    purchase = this.declared<string | null>('purchase');
    sales = this.declared<string | null>('sales');
}

/** A {@link SettingsGeneralSettings}'s `date_and_time`. */
export class SettingsGeneralSettingsDateAndTime extends Dto {
    static override FIELDS = {
        dateFormat: 'string',
        firstDayOfWeek: 'any',
        timeFormat: 'string',
        timeZone: 'string',
    } as const;

    dateFormat = this.declared<string | null>('dateFormat');
    firstDayOfWeek = this.declared<unknown>('firstDayOfWeek');
    timeFormat = this.declared<string | null>('timeFormat');
    timeZone = this.declared<string | null>('timeZone');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `available_charge_types`. */
export class SettingsGeneralSettingsItemUpdatedDetailAvailableChargeTypes extends Dto {
    static override FIELDS = {
        metered: 'string',
        oneOff: 'string',
        recurring: 'string',
    } as const;

    metered = this.declared<string | null>('metered');
    oneOff = this.declared<string | null>('oneOff');
    recurring = this.declared<string | null>('recurring');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `available_pricing_methods`. */
export class SettingsGeneralSettingsItemUpdatedDetailAvailablePricingMethods extends Dto {
    static override FIELDS = {
        discountBased: 'string',
        markupBased: 'string',
        standard: 'string',
    } as const;

    discountBased = this.declared<string | null>('discountBased');
    markupBased = this.declared<string | null>('markupBased');
    standard = this.declared<string | null>('standard');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `inventory_adjustment_rules`. */
export class SettingsGeneralSettingsItemUpdatedDetailInventoryAdjustmentRules extends Dto {
    static override FIELDS = {
        quantityAvailableForSale: 'string',
        quantityAvailableForSaleDetermination: 'string',
    } as const;

    quantityAvailableForSale = this.declared<string | null>('quantityAvailableForSale');
    quantityAvailableForSaleDetermination = this.declared<string | null>('quantityAvailableForSaleDetermination');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `item_grouping`. */
export class SettingsGeneralSettingsItemUpdatedDetailItemGrouping extends Dto {
    static override FIELDS = {
        defaultGroup: 'any',
        enabled: 'string',
    } as const;

    defaultGroup = this.declared<unknown>('defaultGroup');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `item_management`. */
export class SettingsGeneralSettingsItemUpdatedDetailItemManagement extends Dto {
    static override FIELDS = {
        defaultManager: 'any',
        enabled: 'string',
    } as const;

    defaultManager = this.declared<unknown>('defaultManager');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `pre_order`. */
export class SettingsGeneralSettingsItemUpdatedDetailPreOrder extends Dto {
    static override FIELDS = {
        enabled: 'string',
        numberOfPeriod: 'string',
        period: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    numberOfPeriod = this.declared<string | null>('numberOfPeriod');
    period = this.declared<string | null>('period');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `pricing_period_can_vary_from_charging_period`. */
export class SettingsGeneralSettingsItemUpdatedDetailPricingPeriodCanVaryFromChargingPeriod extends Dto {
    static override FIELDS = {
        defaultPricingPeriod: 'any',
        enabled: 'string',
    } as const;

    defaultPricingPeriod = this.declared<unknown>('defaultPricingPeriod');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTax}'s `tax`. */
export class SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTaxDetail extends Dto {
    static override FIELDS = {
        uuid: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `purchase_price_entered_is_inclusive_of_tax`. */
export class SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTax extends Dto {
    static override FIELDS = {
        enabled: 'string',
        tax: SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTaxDetail,
    } as const;

    enabled = this.declared<string | null>('enabled');
    tax = this.declared<SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTaxDetail | null>(
        'tax',
    );
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `sale_price_entered_is_inclusive_of_tax`. */
export class SettingsGeneralSettingsItemUpdatedDetailSalePriceEnteredIsInclusiveOfTax extends Dto {
    static override FIELDS = {
        enabled: 'string',
        tax: 'any',
        taxIncludedInSalesPriceIsBasedOn: 'string',
    } as const;

    enabled = this.declared<string | null>('enabled');
    tax = this.declared<unknown>('tax');
    taxIncludedInSalesPriceIsBasedOn = this.declared<string | null>('taxIncludedInSalesPriceIsBasedOn');
}

/** A {@link SettingsGeneralSettingsItemUpdatedDetail}'s `use_volume_pricing`. */
export class SettingsGeneralSettingsItemUpdatedDetailUseVolumePricing extends Dto {
    static override FIELDS = {
        allUnitsFixedPricing: 'string',
        allUnitsPerUnitPricing: 'string',
        enabled: 'string',
        incrementalFixedPricing: 'string',
        incrementalPerUnitPricing: 'string',
    } as const;

    allUnitsFixedPricing = this.declared<string | null>('allUnitsFixedPricing');
    allUnitsPerUnitPricing = this.declared<string | null>('allUnitsPerUnitPricing');
    enabled = this.declared<string | null>('enabled');
    incrementalFixedPricing = this.declared<string | null>('incrementalFixedPricing');
    incrementalPerUnitPricing = this.declared<string | null>('incrementalPerUnitPricing');
}

/** A {@link SettingsGeneralSettingsItemUpdated}'s `item`. */
export class SettingsGeneralSettingsItemUpdatedDetail extends Dto {
    static override FIELDS = {
        availableChargeTypes: SettingsGeneralSettingsItemUpdatedDetailAvailableChargeTypes,
        availablePricingMethods: SettingsGeneralSettingsItemUpdatedDetailAvailablePricingMethods,
        chargingPeriodCanVaryFromBillingPeriod: 'string',
        chargingStartDateCanVaryFromBillingStartDate: 'string',
        enableBackOrder: 'string',
        enableBatchTracking: 'string',
        enableBundleItem: 'string',
        enableDirectCostItem: 'string',
        enableFamilyCostItem: 'string',
        enableFixedAssetItem: 'string',
        enableGiftCertificateBasedItem: 'string',
        enableInventoryCosting: 'string',
        enableInventoryManagement: 'string',
        enablePricingProfile: 'string',
        enablePurchase: 'string',
        enableSales: 'string',
        enableSerialization: 'string',
        enableSupplierManagement: 'string',
        enableVariation: 'string',
        enableVariationBasedItem: 'string',
        enableWarehouseManagement: 'string',
        enableWorkflowApprovalForItem: 'string',
        inventoryAdjustmentRules: SettingsGeneralSettingsItemUpdatedDetailInventoryAdjustmentRules,
        itemGrouping: SettingsGeneralSettingsItemUpdatedDetailItemGrouping,
        itemManagement: SettingsGeneralSettingsItemUpdatedDetailItemManagement,
        preOrder: SettingsGeneralSettingsItemUpdatedDetailPreOrder,
        pricingPeriodCanVaryFromChargingPeriod:
            SettingsGeneralSettingsItemUpdatedDetailPricingPeriodCanVaryFromChargingPeriod,
        purchasePriceEnteredIsInclusiveOfTax:
            SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTax,
        requireNameToBeUnique: 'string',
        salePriceEnteredIsInclusiveOfTax: SettingsGeneralSettingsItemUpdatedDetailSalePriceEnteredIsInclusiveOfTax,
        useOnSalePrice: 'string',
        usePricingLevel: 'string',
        useSchedulingOfFuturePricing: 'string',
        useShippingProfile: 'string',
        useVolumePricing: SettingsGeneralSettingsItemUpdatedDetailUseVolumePricing,
    } as const;

    availableChargeTypes = this.declared<SettingsGeneralSettingsItemUpdatedDetailAvailableChargeTypes | null>(
        'availableChargeTypes',
    );
    availablePricingMethods = this.declared<SettingsGeneralSettingsItemUpdatedDetailAvailablePricingMethods | null>(
        'availablePricingMethods',
    );
    chargingPeriodCanVaryFromBillingPeriod = this.declared<string | null>('chargingPeriodCanVaryFromBillingPeriod');
    chargingStartDateCanVaryFromBillingStartDate = this.declared<string | null>(
        'chargingStartDateCanVaryFromBillingStartDate',
    );
    enableBackOrder = this.declared<string | null>('enableBackOrder');
    enableBatchTracking = this.declared<string | null>('enableBatchTracking');
    enableBundleItem = this.declared<string | null>('enableBundleItem');
    enableDirectCostItem = this.declared<string | null>('enableDirectCostItem');
    enableFamilyCostItem = this.declared<string | null>('enableFamilyCostItem');
    enableFixedAssetItem = this.declared<string | null>('enableFixedAssetItem');
    enableGiftCertificateBasedItem = this.declared<string | null>('enableGiftCertificateBasedItem');
    enableInventoryCosting = this.declared<string | null>('enableInventoryCosting');
    enableInventoryManagement = this.declared<string | null>('enableInventoryManagement');
    enablePricingProfile = this.declared<string | null>('enablePricingProfile');
    enablePurchase = this.declared<string | null>('enablePurchase');
    enableSales = this.declared<string | null>('enableSales');
    enableSerialization = this.declared<string | null>('enableSerialization');
    enableSupplierManagement = this.declared<string | null>('enableSupplierManagement');
    enableVariation = this.declared<string | null>('enableVariation');
    enableVariationBasedItem = this.declared<string | null>('enableVariationBasedItem');
    enableWarehouseManagement = this.declared<string | null>('enableWarehouseManagement');
    enableWorkflowApprovalForItem = this.declared<string | null>('enableWorkflowApprovalForItem');
    inventoryAdjustmentRules = this.declared<SettingsGeneralSettingsItemUpdatedDetailInventoryAdjustmentRules | null>(
        'inventoryAdjustmentRules',
    );
    itemGrouping = this.declared<SettingsGeneralSettingsItemUpdatedDetailItemGrouping | null>('itemGrouping');
    itemManagement = this.declared<SettingsGeneralSettingsItemUpdatedDetailItemManagement | null>('itemManagement');
    preOrder = this.declared<SettingsGeneralSettingsItemUpdatedDetailPreOrder | null>('preOrder');
    pricingPeriodCanVaryFromChargingPeriod =
        this.declared<SettingsGeneralSettingsItemUpdatedDetailPricingPeriodCanVaryFromChargingPeriod | null>(
            'pricingPeriodCanVaryFromChargingPeriod',
        );
    purchasePriceEnteredIsInclusiveOfTax =
        this.declared<SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTax | null>(
            'purchasePriceEnteredIsInclusiveOfTax',
        );
    requireNameToBeUnique = this.declared<string | null>('requireNameToBeUnique');
    salePriceEnteredIsInclusiveOfTax =
        this.declared<SettingsGeneralSettingsItemUpdatedDetailSalePriceEnteredIsInclusiveOfTax | null>(
            'salePriceEnteredIsInclusiveOfTax',
        );
    useOnSalePrice = this.declared<string | null>('useOnSalePrice');
    usePricingLevel = this.declared<string | null>('usePricingLevel');
    useSchedulingOfFuturePricing = this.declared<string | null>('useSchedulingOfFuturePricing');
    useShippingProfile = this.declared<string | null>('useShippingProfile');
    useVolumePricing = this.declared<SettingsGeneralSettingsItemUpdatedDetailUseVolumePricing | null>(
        'useVolumePricing',
    );
}

/** A {@link SettingsGeneralSettingsItemUpdated}'s `product`. */
export class SettingsGeneralSettingsItemUpdatedProduct extends Dto {
    static override FIELDS = {
        allowItemSellMultiQuantity: 'string',
        allowPlanSellMultiQuantity: 'string',
        allowProductSellMultiQuantity: 'string',
        allowRateSellMultiQuantity: 'string',
        itemQuantityUse: 'string',
        planQuantityUse: 'string',
        productQuantityUse: 'string',
        rateQuantityUse: 'string',
    } as const;

    allowItemSellMultiQuantity = this.declared<string | null>('allowItemSellMultiQuantity');
    allowPlanSellMultiQuantity = this.declared<string | null>('allowPlanSellMultiQuantity');
    allowProductSellMultiQuantity = this.declared<string | null>('allowProductSellMultiQuantity');
    allowRateSellMultiQuantity = this.declared<string | null>('allowRateSellMultiQuantity');
    itemQuantityUse = this.declared<string | null>('itemQuantityUse');
    planQuantityUse = this.declared<string | null>('planQuantityUse');
    productQuantityUse = this.declared<string | null>('productQuantityUse');
    rateQuantityUse = this.declared<string | null>('rateQuantityUse');
}

/** A {@link SettingsGeneralSettings}'s `labour`. */
export class SettingsGeneralSettingsLabour extends Dto {
    static override FIELDS = {
        requireEmailAddressForLabour: 'string',
        uniqueEmailAddress: 'string',
        uniqueLabourName: 'string',
    } as const;

    requireEmailAddressForLabour = this.declared<string | null>('requireEmailAddressForLabour');
    uniqueEmailAddress = this.declared<string | null>('uniqueEmailAddress');
    uniqueLabourName = this.declared<string | null>('uniqueLabourName');
}

/** A {@link SettingsGeneralSettingsOrder}'s `order_management`. */
export class SettingsGeneralSettingsOrderOrderManagement extends Dto {
    static override FIELDS = {
        defaultManager: 'any',
        enabled: 'string',
    } as const;

    defaultManager = this.declared<unknown>('defaultManager');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsOrder}'s `referral_tracking_at_order_level`. */
export class SettingsGeneralSettingsOrderReferralTrackingAtOrderLevel extends Dto {
    static override FIELDS = {
        defaultReferralTracking: 'any',
        enabled: 'string',
    } as const;

    defaultReferralTracking = this.declared<unknown>('defaultReferralTracking');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsOrder}'s `sales_rep_tracking_at_order_level`. */
export class SettingsGeneralSettingsOrderSalesRepTrackingAtOrderLevel extends Dto {
    static override FIELDS = {
        defaultSalesRepTracking: 'any',
        enabled: 'string',
    } as const;

    defaultSalesRepTracking = this.declared<unknown>('defaultSalesRepTracking');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettings}'s `order`. */
export class SettingsGeneralSettingsOrder extends Dto {
    static override FIELDS = {
        allowNameToBeChangedInOrder: 'string',
        allowUnitPriceToBeChangedInOrder: 'string',
        defaultFulfillmentStatus: 'string',
        defaultShippingProfile: 'any',
        displayedPriceIsInclusiveOfTax: 'string',
        enableBooking: 'string',
        enableLastSalePriceLookUpForAnAccount: 'string',
        enableOrderBackdating: 'string',
        enableQuote: 'string',
        orderManagement: SettingsGeneralSettingsOrderOrderManagement,
        referralTrackingAtOrderLevel: SettingsGeneralSettingsOrderReferralTrackingAtOrderLevel,
        salesRepTrackingAtOrderLevel: SettingsGeneralSettingsOrderSalesRepTrackingAtOrderLevel,
        useGlobalWarehouse: 'string',
    } as const;

    allowNameToBeChangedInOrder = this.declared<string | null>('allowNameToBeChangedInOrder');
    allowUnitPriceToBeChangedInOrder = this.declared<string | null>('allowUnitPriceToBeChangedInOrder');
    defaultFulfillmentStatus = this.declared<string | null>('defaultFulfillmentStatus');
    defaultShippingProfile = this.declared<unknown>('defaultShippingProfile');
    displayedPriceIsInclusiveOfTax = this.declared<string | null>('displayedPriceIsInclusiveOfTax');
    enableBooking = this.declared<string | null>('enableBooking');
    enableLastSalePriceLookUpForAnAccount = this.declared<string | null>('enableLastSalePriceLookUpForAnAccount');
    enableOrderBackdating = this.declared<string | null>('enableOrderBackdating');
    enableQuote = this.declared<string | null>('enableQuote');
    orderManagement = this.declared<SettingsGeneralSettingsOrderOrderManagement | null>('orderManagement');
    referralTrackingAtOrderLevel = this.declared<SettingsGeneralSettingsOrderReferralTrackingAtOrderLevel | null>(
        'referralTrackingAtOrderLevel',
    );
    salesRepTrackingAtOrderLevel = this.declared<SettingsGeneralSettingsOrderSalesRepTrackingAtOrderLevel | null>(
        'salesRepTrackingAtOrderLevel',
    );
    useGlobalWarehouse = this.declared<string | null>('useGlobalWarehouse');
}

/** A {@link SettingsGeneralSettings}'s `portal`. */
export class SettingsGeneralSettingsPortal extends Dto {
    static override WIRE_NAMES = {
        enableCustomerPortal: 'enableCustomerPortal',
        enableInviteToActivePortalForContact: 'enableInviteToActivePortalForContact',
        enableSpecifyPortalPasswordForContact: 'enableSpecifyPortalPasswordForContact',
    } as const;

    static override FIELDS = {
        contacts: 'any',
        enableCustomerPortal: 'string',
        enableInviteToActivePortalForContact: 'string',
        enableSpecifyPortalPasswordForContact: 'string',
        settings: 'any',
    } as const;

    contacts = this.declared<unknown>('contacts');
    enableCustomerPortal = this.declared<string | null>('enableCustomerPortal');
    enableInviteToActivePortalForContact = this.declared<string | null>('enableInviteToActivePortalForContact');
    enableSpecifyPortalPasswordForContact = this.declared<string | null>('enableSpecifyPortalPasswordForContact');
    settings = this.declared<unknown>('settings');
}

/** A {@link SettingsGeneralSettingsPurchase}'s `allow_modification_of_following_purchase_credit_note_fields`. */
export class SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseCreditNoteFields extends Dto {
    static override FIELDS = {
        refundable: 'string',
    } as const;

    refundable = this.declared<string | null>('refundable');
}

/** A {@link SettingsGeneralSettingsPurchase}'s `allow_modification_of_following_purchase_invoice_fields`. */
export class SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseInvoiceFields extends Dto {
    static override FIELDS = {
        dueDate: 'string',
        issueDate: 'string',
    } as const;

    dueDate = this.declared<string | null>('dueDate');
    issueDate = this.declared<string | null>('issueDate');
}

/** A {@link SettingsGeneralSettingsPurchase}'s `allow_modification_of_following_purchase_payment_fields`. */
export class SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchasePaymentFields extends Dto {
    static override FIELDS = {
        paymentDate: 'string',
        paymentProcessor: 'string',
        paymentReference: 'string',
    } as const;

    paymentDate = this.declared<string | null>('paymentDate');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    paymentReference = this.declared<string | null>('paymentReference');
}

/** A {@link SettingsGeneralSettingsPurchase}'s `allow_modification_of_following_purchase_refund_fields`. */
export class SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseRefundFields extends Dto {
    static override FIELDS = {
        refundDate: 'string',
        refundReference: 'string',
    } as const;

    refundDate = this.declared<string | null>('refundDate');
    refundReference = this.declared<string | null>('refundReference');
}

/** A {@link SettingsGeneralSettings}'s `purchase`. */
export class SettingsGeneralSettingsPurchase extends Dto {
    static override FIELDS = {
        allowModificationOfFollowingPurchaseCreditNoteFields:
            SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseCreditNoteFields,
        allowModificationOfFollowingPurchaseInvoiceFields:
            SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseInvoiceFields,
        allowModificationOfFollowingPurchasePaymentFields:
            SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchasePaymentFields,
        allowModificationOfFollowingPurchaseRefundFields:
            SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseRefundFields,
        enableLastPurchasePriceLookUp: 'string',
        enablePurchaseQuote: 'string',
        enableWorkflowApprovalForPurchaseCreditNote: 'string',
        enableWorkflowApprovalForPurchaseInvoice: 'string',
        enableWorkflowApprovalForPurchaseOrder: 'string',
        enableWorkflowApprovalForPurchasePayment: 'string',
        enableWorkflowApprovalForPurchaseRefund: 'string',
        inventoryIsAdjustedWhen: 'string',
        supplierInvoiceIdShouldBeUnique: 'string',
        useGlobalWarehouse: 'string',
    } as const;

    allowModificationOfFollowingPurchaseCreditNoteFields =
        this.declared<SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseCreditNoteFields | null>(
            'allowModificationOfFollowingPurchaseCreditNoteFields',
        );
    allowModificationOfFollowingPurchaseInvoiceFields =
        this.declared<SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseInvoiceFields | null>(
            'allowModificationOfFollowingPurchaseInvoiceFields',
        );
    allowModificationOfFollowingPurchasePaymentFields =
        this.declared<SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchasePaymentFields | null>(
            'allowModificationOfFollowingPurchasePaymentFields',
        );
    allowModificationOfFollowingPurchaseRefundFields =
        this.declared<SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseRefundFields | null>(
            'allowModificationOfFollowingPurchaseRefundFields',
        );
    enableLastPurchasePriceLookUp = this.declared<string | null>('enableLastPurchasePriceLookUp');
    enablePurchaseQuote = this.declared<string | null>('enablePurchaseQuote');
    enableWorkflowApprovalForPurchaseCreditNote = this.declared<string | null>(
        'enableWorkflowApprovalForPurchaseCreditNote',
    );
    enableWorkflowApprovalForPurchaseInvoice = this.declared<string | null>('enableWorkflowApprovalForPurchaseInvoice');
    enableWorkflowApprovalForPurchaseOrder = this.declared<string | null>('enableWorkflowApprovalForPurchaseOrder');
    enableWorkflowApprovalForPurchasePayment = this.declared<string | null>('enableWorkflowApprovalForPurchasePayment');
    enableWorkflowApprovalForPurchaseRefund = this.declared<string | null>('enableWorkflowApprovalForPurchaseRefund');
    inventoryIsAdjustedWhen = this.declared<string | null>('inventoryIsAdjustedWhen');
    supplierInvoiceIdShouldBeUnique = this.declared<string | null>('supplierInvoiceIdShouldBeUnique');
    useGlobalWarehouse = this.declared<string | null>('useGlobalWarehouse');
}

/** A {@link SettingsGeneralSettings}'s `security`. */
export class SettingsGeneralSettingsSecurity extends Dto {
    static override WIRE_NAMES = {
        implementerLogin: 'implementerLogin',
    } as const;

    static override FIELDS = {
        enableForceSessionExpire: 'string',
        enableTwoFactorAuthentication: 'string',
        implementerLogin: 'string',
        sessionExpireLimitHour: 'string',
    } as const;

    enableForceSessionExpire = this.declared<string | null>('enableForceSessionExpire');
    enableTwoFactorAuthentication = this.declared<string | null>('enableTwoFactorAuthentication');
    implementerLogin = this.declared<string | null>('implementerLogin');
    sessionExpireLimitHour = this.declared<string | null>('sessionExpireLimitHour');
}

/** A {@link SettingsGeneralSettingsTransaction}'s `allow_modification_of_following_credit_note_fields`. */
export class SettingsGeneralSettingsTransactionAllowModificationOfFollowingCreditNoteFields extends Dto {
    static override FIELDS = {
        creditNoteDate: 'string',
        refundable: 'string',
    } as const;

    creditNoteDate = this.declared<string | null>('creditNoteDate');
    refundable = this.declared<string | null>('refundable');
}

/** A {@link SettingsGeneralSettingsTransaction}'s `allow_modification_of_following_invoice_fields`. */
export class SettingsGeneralSettingsTransactionAllowModificationOfFollowingInvoiceFields extends Dto {
    static override FIELDS = {
        billingPeriod: 'string',
        chargePeriod: 'string',
        dueDate: 'string',
        issueDate: 'string',
    } as const;

    billingPeriod = this.declared<string | null>('billingPeriod');
    chargePeriod = this.declared<string | null>('chargePeriod');
    dueDate = this.declared<string | null>('dueDate');
    issueDate = this.declared<string | null>('issueDate');
}

/** A {@link SettingsGeneralSettingsTransaction}'s `allow_modification_of_following_payment_fields`. */
export class SettingsGeneralSettingsTransactionAllowModificationOfFollowingPaymentFields extends Dto {
    static override FIELDS = {
        paymentDate: 'string',
        paymentProcessor: 'string',
        paymentReference: 'string',
    } as const;

    paymentDate = this.declared<string | null>('paymentDate');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    paymentReference = this.declared<string | null>('paymentReference');
}

/** A {@link SettingsGeneralSettingsTransaction}'s `allow_modification_of_following_refund_fields`. */
export class SettingsGeneralSettingsTransactionAllowModificationOfFollowingRefundFields extends Dto {
    static override FIELDS = {
        refundDate: 'string',
        refundReference: 'string',
    } as const;

    refundDate = this.declared<string | null>('refundDate');
    refundReference = this.declared<string | null>('refundReference');
}

/** A {@link SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreference}'s `email`. */
export class SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceEmail extends Dto {
    static override FIELDS = {
        default: 'string',
        enabled: 'string',
    } as const;

    default = this.declared<string | null>('default');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreference}'s `postal_mail`. */
export class SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferencePostalMail extends Dto {
    static override FIELDS = {
        default: 'string',
        enabled: 'string',
    } as const;

    default = this.declared<string | null>('default');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreference}'s `text_message`. */
export class SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceTextMessage extends Dto {
    static override FIELDS = {
        default: 'string',
        enabled: 'string',
    } as const;

    default = this.declared<string | null>('default');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreference}'s `voice_mail`. */
export class SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceVoiceMail extends Dto {
    static override FIELDS = {
        default: 'string',
        enabled: 'string',
    } as const;

    default = this.declared<string | null>('default');
    enabled = this.declared<string | null>('enabled');
}

/** A {@link SettingsGeneralSettingsTransaction}'s `available_mediums_for_communication_preference`. */
export class SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreference extends Dto {
    static override FIELDS = {
        email: SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceEmail,
        postalMail: SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferencePostalMail,
        textMessage: SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceTextMessage,
        voiceMail: SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceVoiceMail,
    } as const;

    email = this.declared<SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceEmail | null>(
        'email',
    );
    postalMail =
        this.declared<SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferencePostalMail | null>(
            'postalMail',
        );
    textMessage =
        this.declared<SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceTextMessage | null>(
            'textMessage',
        );
    voiceMail =
        this.declared<SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceVoiceMail | null>(
            'voiceMail',
        );
}

/** A {@link SettingsGeneralSettingsTransaction}'s `default_accounting_codes`. */
export class SettingsGeneralSettingsTransactionDefaultAccountingCodes extends Dto {
    static override FIELDS = {
        accountPayable: 'string',
        accountReceivable: 'string',
        cashAndCashEquivalent: 'string',
        costOfGoodsSold: 'string',
        creditNotePayable: 'string',
        deduction: 'string',
        eventCharge: 'string',
        inventory: 'string',
        paymentSurcharge: 'string',
        rounding: 'string',
        salesRevenue: 'string',
        tax: 'string',
    } as const;

    accountPayable = this.declared<string | null>('accountPayable');
    accountReceivable = this.declared<string | null>('accountReceivable');
    cashAndCashEquivalent = this.declared<string | null>('cashAndCashEquivalent');
    costOfGoodsSold = this.declared<string | null>('costOfGoodsSold');
    creditNotePayable = this.declared<string | null>('creditNotePayable');
    deduction = this.declared<string | null>('deduction');
    eventCharge = this.declared<string | null>('eventCharge');
    inventory = this.declared<string | null>('inventory');
    paymentSurcharge = this.declared<string | null>('paymentSurcharge');
    rounding = this.declared<string | null>('rounding');
    salesRevenue = this.declared<string | null>('salesRevenue');
    tax = this.declared<string | null>('tax');
}

/** A {@link SettingsGeneralSettings}'s `transaction`. */
export class SettingsGeneralSettingsTransaction extends Dto {
    static override FIELDS = {
        accountingMethod: 'any',
        allowModificationOfFollowingCreditNoteFields:
            SettingsGeneralSettingsTransactionAllowModificationOfFollowingCreditNoteFields,
        allowModificationOfFollowingInvoiceFields:
            SettingsGeneralSettingsTransactionAllowModificationOfFollowingInvoiceFields,
        allowModificationOfFollowingPaymentFields:
            SettingsGeneralSettingsTransactionAllowModificationOfFollowingPaymentFields,
        allowModificationOfFollowingRefundFields:
            SettingsGeneralSettingsTransactionAllowModificationOfFollowingRefundFields,
        availableMediumsForCommunicationPreference:
            SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreference,
        createNegativeChargeToAccommodateAdjustmentRequiredForOrderCancelOrChange: 'string',
        defaultAccountingCodes: SettingsGeneralSettingsTransactionDefaultAccountingCodes,
        defaultShippingProfile: 'any',
        disableNotificationForInvoiceWithChargesOfZeroAmount: 'string',
        displayedPriceIsInclusiveOfTax: 'string',
        enableCreationOfAutomaticPaymentSurcharge: 'string',
        enableDiscountProfile: 'string',
        updateCurrentInvoiceToIncludeChargeAdjustments: 'string',
        updateInvoiceToIncludeCurrentPaymentSurcharge: 'string',
    } as const;

    accountingMethod = this.declared<unknown>('accountingMethod');
    allowModificationOfFollowingCreditNoteFields =
        this.declared<SettingsGeneralSettingsTransactionAllowModificationOfFollowingCreditNoteFields | null>(
            'allowModificationOfFollowingCreditNoteFields',
        );
    allowModificationOfFollowingInvoiceFields =
        this.declared<SettingsGeneralSettingsTransactionAllowModificationOfFollowingInvoiceFields | null>(
            'allowModificationOfFollowingInvoiceFields',
        );
    allowModificationOfFollowingPaymentFields =
        this.declared<SettingsGeneralSettingsTransactionAllowModificationOfFollowingPaymentFields | null>(
            'allowModificationOfFollowingPaymentFields',
        );
    allowModificationOfFollowingRefundFields =
        this.declared<SettingsGeneralSettingsTransactionAllowModificationOfFollowingRefundFields | null>(
            'allowModificationOfFollowingRefundFields',
        );
    availableMediumsForCommunicationPreference =
        this.declared<SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreference | null>(
            'availableMediumsForCommunicationPreference',
        );
    createNegativeChargeToAccommodateAdjustmentRequiredForOrderCancelOrChange = this.declared<string | null>(
        'createNegativeChargeToAccommodateAdjustmentRequiredForOrderCancelOrChange',
    );
    defaultAccountingCodes = this.declared<SettingsGeneralSettingsTransactionDefaultAccountingCodes | null>(
        'defaultAccountingCodes',
    );
    defaultShippingProfile = this.declared<unknown>('defaultShippingProfile');
    disableNotificationForInvoiceWithChargesOfZeroAmount = this.declared<string | null>(
        'disableNotificationForInvoiceWithChargesOfZeroAmount',
    );
    displayedPriceIsInclusiveOfTax = this.declared<string | null>('displayedPriceIsInclusiveOfTax');
    enableCreationOfAutomaticPaymentSurcharge = this.declared<string | null>(
        'enableCreationOfAutomaticPaymentSurcharge',
    );
    enableDiscountProfile = this.declared<string | null>('enableDiscountProfile');
    updateCurrentInvoiceToIncludeChargeAdjustments = this.declared<string | null>(
        'updateCurrentInvoiceToIncludeChargeAdjustments',
    );
    updateInvoiceToIncludeCurrentPaymentSurcharge = this.declared<string | null>(
        'updateInvoiceToIncludeCurrentPaymentSurcharge',
    );
}

/**
 * One group of general settings, under `general_settings`, keyed by the group; `item` and `order` also carry `product`.
 */
export class SettingsGeneralSettings extends Dto {
    static override ENVELOPE_KEY = 'general_settings';

    static override FIELDS = {
        account: SettingsFieldSettingsItemGeneralSettingsAccount,
        dashboard: SettingsGeneralSettingsDashboard,
        dateAndTime: SettingsGeneralSettingsDateAndTime,
        display: 'any',
        general: 'any',
        item: SettingsGeneralSettingsItemUpdatedDetail,
        labour: SettingsGeneralSettingsLabour,
        order: SettingsGeneralSettingsOrder,
        portal: SettingsGeneralSettingsPortal,
        product: SettingsGeneralSettingsItemUpdatedProduct,
        purchase: SettingsGeneralSettingsPurchase,
        security: SettingsGeneralSettingsSecurity,
        transaction: SettingsGeneralSettingsTransaction,
    } as const;

    account = this.declared<SettingsFieldSettingsItemGeneralSettingsAccount | null>('account');
    dashboard = this.declared<SettingsGeneralSettingsDashboard | null>('dashboard');
    dateAndTime = this.declared<SettingsGeneralSettingsDateAndTime | null>('dateAndTime');
    display = this.declared<unknown>('display');
    general = this.declared<unknown>('general');
    item = this.declared<SettingsGeneralSettingsItemUpdatedDetail | null>('item');
    labour = this.declared<SettingsGeneralSettingsLabour | null>('labour');
    order = this.declared<SettingsGeneralSettingsOrder | null>('order');
    portal = this.declared<SettingsGeneralSettingsPortal | null>('portal');
    product = this.declared<SettingsGeneralSettingsItemUpdatedProduct | null>('product');
    purchase = this.declared<SettingsGeneralSettingsPurchase | null>('purchase');
    security = this.declared<SettingsGeneralSettingsSecurity | null>('security');
    transaction = this.declared<SettingsGeneralSettingsTransaction | null>('transaction');
}

/** A {@link SettingsPaymentProcessorSaved}'s `currency`. */
export class SettingsPaymentProcessorSavedCurrency extends Dto {
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

/**
 * What `createSettingsPaymentProcessor` answers, under `payment_processor`: `gateway_name` and `credentials` where the
 * read has `provider`.
 */
export class SettingsPaymentProcessorSaved extends Dto {
    static override ENVELOPE_KEY = 'payment_processor';

    static override FIELDS = {
        accountingCode: 'any',
        conversionRate: 'float',
        createdBy: 'any',
        createdOn: 'string',
        credentials: 'any',
        currency: SettingsPaymentProcessorSavedCurrency,
        description: 'string',
        disconnected: 'boolean',
        displayName: 'string',
        gatewayName: 'string',
        gatewayType: 'string',
        href: 'string',
        id: 'string',
        integrationState: 'string',
        isDefault: 'boolean',
        isForeignCurrency: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        provider: 'string',
        status: 'string',
        version: 'int',
    } as const;

    accountingCode = this.declared<unknown>('accountingCode');
    conversionRate = this.declared<number | null>('conversionRate');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    credentials = this.declared<unknown>('credentials');
    currency = this.declared<SettingsPaymentProcessorSavedCurrency | null>('currency');
    description = this.declared<string | null>('description');
    disconnected = this.declared<boolean | null>('disconnected');
    displayName = this.declared<string | null>('displayName');
    gatewayName = this.declared<string | null>('gatewayName');
    gatewayType = this.declared<string | null>('gatewayType');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    integrationState = this.declared<string | null>('integrationState');
    isDefault = this.declared<boolean | null>('isDefault');
    isForeignCurrency = this.declared<boolean | null>('isForeignCurrency');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    provider = this.declared<string | null>('provider');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A {@link SettingsPaymentProcessor}'s `accounting_code`. */
export class SettingsPaymentProcessorAccountingCode extends Dto {
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

/** A {@link SettingsPaymentProcessor}'s `currency`. */
export class SettingsPaymentProcessorCurrency extends Dto {
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

/** One payment processor, under `payment_processor`: the record the listing serves. */
export class SettingsPaymentProcessorRead extends Dto {
    static override ENVELOPE_KEY = 'payment_processor';

    static override FIELDS = {
        accountingCode: SettingsPaymentProcessorAccountingCode,
        conversionRate: 'float',
        createdBy: 'any',
        createdOn: 'string',
        currency: SettingsPaymentProcessorCurrency,
        description: 'any',
        disconnected: 'boolean',
        displayName: 'string',
        gatewayType: 'string',
        href: 'string',
        id: 'string',
        integrationState: 'string',
        isDefault: 'boolean',
        isForeignCurrency: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        provider: 'string',
        status: 'string',
        version: 'int',
    } as const;

    accountingCode = this.declared<SettingsPaymentProcessorAccountingCode | null>('accountingCode');
    conversionRate = this.declared<number | null>('conversionRate');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<SettingsPaymentProcessorCurrency | null>('currency');
    description = this.declared<unknown>('description');
    disconnected = this.declared<boolean | null>('disconnected');
    displayName = this.declared<string | null>('displayName');
    gatewayType = this.declared<string | null>('gatewayType');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    integrationState = this.declared<string | null>('integrationState');
    isDefault = this.declared<boolean | null>('isDefault');
    isForeignCurrency = this.declared<boolean | null>('isForeignCurrency');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    provider = this.declared<string | null>('provider');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/**
 * What `createSettingsPaymentTerm` answers, under `payment_term`: a flat `period` and `duration` where the read nests
 * them.
 */
export class SettingsPaymentTermCreated extends Dto {
    static override ENVELOPE_KEY = 'payment_term';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        displayName: 'string',
        duration: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        ordering: 'any',
        period: 'string',
        status: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    duration = this.declared<number | null>('duration');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    ordering = this.declared<unknown>('ordering');
    period = this.declared<string | null>('period');
    status = this.declared<string | null>('status');
}

/** A {@link SettingsPaymentTerm}'s `duration`. */
export class SettingsPaymentTermDuration extends Dto {
    static override FIELDS = {
        count: 'int',
        period: 'string',
    } as const;

    count = this.declared<number | null>('count');
    period = this.declared<string | null>('period');
}

/** One payment term, under `payment_term`: the record the listing serves. */
export class SettingsPaymentTermRead extends Dto {
    static override ENVELOPE_KEY = 'payment_term';

    static override FIELDS = {
        description: 'any',
        displayName: 'string',
        duration: SettingsPaymentTermDuration,
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    duration = this.declared<SettingsPaymentTermDuration | null>('duration');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** What `updateSettingsPaymentTerm` answers, under `payment_term`: the read's fields and `display_order`. */
export class SettingsPaymentTermUpdated extends Dto {
    static override ENVELOPE_KEY = 'payment_term';

    static override FIELDS = {
        description: 'any',
        displayName: 'string',
        duration: SettingsPaymentTermDuration,
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        displayOrder: 'int',
    } as const;

    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    duration = this.declared<SettingsPaymentTermDuration | null>('duration');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    displayOrder = this.declared<number | null>('displayOrder');
}

/**
 * What `createSettingsPricingLevel` answers, under `pricing_level`: `price_tax_inclusive` where the read has three tax
 * fields.
 */
export class SettingsPricingLevelCreated extends Dto {
    static override ENVELOPE_KEY = 'pricing_level';

    static override FIELDS = {
        builtInItem: 'any',
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        displayName: 'string',
        href: 'string',
        id: 'string',
        isDefault: 'any',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        ordering: 'int',
        priceTaxInclusive: 'any',
        status: 'string',
        taxExempt: 'any',
    } as const;

    builtInItem = this.declared<unknown>('builtInItem');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isDefault = this.declared<unknown>('isDefault');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    ordering = this.declared<number | null>('ordering');
    priceTaxInclusive = this.declared<unknown>('priceTaxInclusive');
    status = this.declared<string | null>('status');
    taxExempt = this.declared<unknown>('taxExempt');
}

/** A {@link SettingsPricingLevel}'s `tax_code`. */
export class SettingsPricingLevelTaxCode extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** One pricing level, under `pricing_level`: the record the listing serves. */
export class SettingsPricingLevelRead extends Dto {
    static override ENVELOPE_KEY = 'pricing_level';

    static override FIELDS = {
        builtInItem: 'any',
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        isDefault: 'any',
        isTaxInclusive: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        ordering: 'int',
        status: 'string',
        taxCode: SettingsPricingLevelTaxCode,
        taxExempt: 'boolean',
        taxInclusiveBasedOn: 'string',
    } as const;

    builtInItem = this.declared<unknown>('builtInItem');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isDefault = this.declared<unknown>('isDefault');
    isTaxInclusive = this.declared<boolean | null>('isTaxInclusive');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    ordering = this.declared<number | null>('ordering');
    status = this.declared<string | null>('status');
    taxCode = this.declared<SettingsPricingLevelTaxCode | null>('taxCode');
    taxExempt = this.declared<boolean | null>('taxExempt');
    taxInclusiveBasedOn = this.declared<string | null>('taxInclusiveBasedOn');
}

/** A {@link SettingsShippingProfile}'s `accounting_code`. */
export class SettingsShippingProfileAccountingCode extends Dto {
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

/** A {@link SettingsShippingProfile}'s `tax_rule`. */
export class SettingsShippingProfileTaxRule extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** One shipping profile, under `shipping_profile`: the record the listing serves. */
export class SettingsShippingProfileRead extends Dto {
    static override ENVELOPE_KEY = 'shipping_profile';

    static override FIELDS = {
        accountingCode: SettingsShippingProfileAccountingCode,
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        fixedAmount: 'float',
        href: 'string',
        id: 'string',
        integrationConnection: 'any',
        invoiceNote: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        priceTaxInclusive: 'boolean',
        salesTaxRate: 'float',
        shippingType: 'string',
        status: 'string',
        taxExempt: 'boolean',
        taxRule: SettingsShippingProfileTaxRule,
        version: 'int',
    } as const;

    accountingCode = this.declared<SettingsShippingProfileAccountingCode | null>('accountingCode');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    fixedAmount = this.declared<number | null>('fixedAmount');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    integrationConnection = this.declared<unknown>('integrationConnection');
    invoiceNote = this.declared<string | null>('invoiceNote');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    priceTaxInclusive = this.declared<boolean | null>('priceTaxInclusive');
    salesTaxRate = this.declared<number | null>('salesTaxRate');
    shippingType = this.declared<string | null>('shippingType');
    status = this.declared<string | null>('status');
    taxExempt = this.declared<boolean | null>('taxExempt');
    taxRule = this.declared<SettingsShippingProfileTaxRule | null>('taxRule');
    version = this.declared<number | null>('version');
}

/** A {@link SettingsWarehouse}'s `country`. */
export class SettingsWarehouseCountry extends Dto {
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

/** One warehouse, under `warehouse`: the record the listing serves. */
export class SettingsWarehouseRead extends Dto {
    static override ENVELOPE_KEY = 'warehouse';

    static override FIELDS = {
        city: 'string',
        country: SettingsWarehouseCountry,
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        isDefault: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        postCode: 'string',
        state: 'string',
        status: 'string',
        version: 'int',
    } as const;

    city = this.declared<string | null>('city');
    country = this.declared<SettingsWarehouseCountry | null>('country');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isDefault = this.declared<boolean | null>('isDefault');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    postCode = this.declared<string | null>('postCode');
    state = this.declared<string | null>('state');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A {@link SettingsTax}'s `country`. */
export class SettingsTaxCountry extends Dto {
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

/** One entry of a {@link SettingsTax}'s `country_tax_by_states`. */
export class SettingsTaxCountryTaxByState extends Dto {
    static override FIELDS = {
        createdOn: 'string',
        id: 'string',
        lastUpdatedOn: 'string',
        object: 'string',
        rate: 'float',
        state: 'any',
        status: 'string',
    } as const;

    createdOn = this.declared<string | null>('createdOn');
    id = this.declared<string | null>('id');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    rate = this.declared<number | null>('rate');
    state = this.declared<unknown>('state');
    status = this.declared<string | null>('status');
}

/** One tax, under `tax`: the record the listing serves. */
export class SettingsTaxRead extends Dto {
    static override ENVELOPE_KEY = 'tax';

    static override FIELDS = {
        code: 'string',
        country: SettingsTaxCountry,
        countryTaxByStates: dtoList(SettingsTaxCountryTaxByState),
        createdBy: 'any',
        createdOn: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        rate: 'float',
        status: 'string',
    } as const;

    code = this.declared<string | null>('code');
    country = this.declared<SettingsTaxCountry | null>('country');
    countryTaxByStates = this.declared<Array<SettingsTaxCountryTaxByState | null> | null>('countryTaxByStates');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    rate = this.declared<number | null>('rate');
    status = this.declared<string | null>('status');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsDiscountProfile: ['GET /api/{api_version}/settings/discount_profiles'],
    SettingsDiscountProfileList: ['GET /api/{api_version}/settings/discount_profiles'],
    SettingsPaymentProcessor: ['GET /api/{api_version}/settings/payment_processors'],
    SettingsPaymentProcessorList: ['GET /api/{api_version}/settings/payment_processors'],
    SettingsShippingProfile: ['GET /api/{api_version}/settings/shipping_profiles'],
    SettingsShippingProfileList: ['GET /api/{api_version}/settings/shipping_profiles'],
    SettingsPricingLevel: ['GET /api/{api_version}/settings/pricing_levels'],
    SettingsPricingLevelList: ['GET /api/{api_version}/settings/pricing_levels'],
    SettingsTimeZone: ['GET /api/{api_version}/settings/time_zones'],
    SettingsTimeZoneList: ['GET /api/{api_version}/settings/time_zones'],
    SettingsWarehouse: ['GET /api/{api_version}/settings/warehouses'],
    SettingsWarehouseList: ['GET /api/{api_version}/settings/warehouses'],
    SettingsCurrency: ['GET /api/{api_version}/settings/currencies'],
    SettingsCurrencyList: ['GET /api/{api_version}/settings/currencies'],
    SettingsItemGroup: ['GET /api/{api_version}/settings/item_groups'],
    SettingsItemGroupList: ['GET /api/{api_version}/settings/item_groups'],
    CustomObject: ['GET /api/{api_version}/custom_objects'],
    CustomObjectList: ['GET /api/{api_version}/custom_objects'],
    SettingsTax: ['GET /api/{api_version}/settings/taxes'],
    SettingsTaxList: ['GET /api/{api_version}/settings/taxes'],
    SettingsVariation: ['GET /api/{api_version}/settings/variations'],
    SettingsVariationList: ['GET /api/{api_version}/settings/variations'],
    SettingsPaymentTerm: ['GET /api/{api_version}/settings/payment_terms'],
    SettingsPaymentTermList: ['GET /api/{api_version}/settings/payment_terms'],
    SettingsItemGroups: [
        'POST /api/{api_version}/settings/item_groups',
        'GET /api/{api_version}/settings/item_groups/{item_group_id}',
        'PATCH /api/{api_version}/settings/item_groups/{item_group_id}',
        'POST /api/{api_version}/settings/item_groups/{item_group_id}/billing_preferences',
    ],
    SettingsCustomLogicScript: ['GET /api/{api_version}/settings/custom_logic_scripts/{custom_logic_script_id}'],
    SettingsCurrencyRead: ['GET /api/{api_version}/settings/currencies/{currency_id}'],
    SettingsCustomObjectCustomize: ['POST /api/{api_version}/settings/custom_objects/{custom_object_id}/customize'],
    SettingsCustomObjects: [
        'GET /api/{api_version}/custom_objects/{custom_object_id}',
        'POST /api/{api_version}/settings/custom_objects',
        'PATCH /api/{api_version}/settings/custom_objects/{custom_object_id}',
    ],
    SettingsVariations: [
        'POST /api/{api_version}/settings/variations',
        'GET /api/{api_version}/settings/variations/{variation_id}',
        'PATCH /api/{api_version}/settings/variations/{variation_id}',
    ],
    SettingsTimeZoneRead: ['GET /api/{api_version}/settings/time_zones/{time_zone_id}'],
    SettingsCustomLogicScripts: ['GET /api/{api_version}/settings/custom_logic_scripts'],
    Settings: ['GET /api/{api_version}/settings'],
    SettingsGeneralSettingsAccountUpdated: ['PATCH /api/{api_version}/settings/general_settings/account'],
    SettingsGeneralSettingsItemUpdated: ['PATCH /api/{api_version}/settings/general_settings/item'],
    SettingsFieldSettingsAccountUpdated: [
        'PATCH /api/{api_version}/settings/field_settings/account',
        'PATCH /api/{api_version}/settings/field_settings/item',
    ],
    SettingsFieldSettingsAccount: [
        'PATCH /api/{api_version}/settings/field_settings/account',
        'PATCH /api/{api_version}/settings/field_settings/item',
    ],
    SettingsCustomObjectDefinition: [
        'GET /api/{api_version}/settings/custom_objects',
        'GET /api/{api_version}/settings/custom_objects/{custom_object_id}',
    ],
    SettingsCustomObjectDefinitionList: ['GET /api/{api_version}/settings/custom_objects'],
    SettingsCustomObjectDefinitionRead: ['GET /api/{api_version}/settings/custom_objects/{custom_object_id}'],
    SettingsCustomLogicScriptSaved: [
        'POST /api/{api_version}/settings/custom_logic_scripts',
        'PATCH /api/{api_version}/settings/custom_logic_scripts/{custom_logic_script_id}',
    ],
    SettingsDiscountProfileRead: [
        'GET /api/{api_version}/settings/discount_profiles/{discount_profile_id}',
        'POST /api/{api_version}/settings/discount_profiles',
        'PATCH /api/{api_version}/settings/discount_profiles/{discount_profile_id}',
    ],
    SettingsFieldSettingList: ['GET /api/{api_version}/settings/field_settings'],
    SettingsFieldSettingRead: ['GET /api/{api_version}/settings/field_settings/{field_setting_id}'],
    SettingsGeneralSettings: ['GET /api/{api_version}/settings/general_settings/{group}'],
    SettingsPaymentProcessorSaved: [
        'POST /api/{api_version}/settings/payment_processors',
        'PATCH /api/{api_version}/settings/payment_processors/{payment_processor_id}',
    ],
    SettingsPaymentProcessorRead: ['GET /api/{api_version}/settings/payment_processors/{payment_processor_id}'],
    SettingsPaymentTermCreated: ['POST /api/{api_version}/settings/payment_terms'],
    SettingsPaymentTermRead: ['GET /api/{api_version}/settings/payment_terms/{payment_term_id}'],
    SettingsPaymentTermUpdated: ['PATCH /api/{api_version}/settings/payment_terms/{payment_term_id}'],
    SettingsPricingLevelCreated: ['POST /api/{api_version}/settings/pricing_levels'],
    SettingsPricingLevelRead: [
        'GET /api/{api_version}/settings/pricing_levels/{pricing_level_id}',
        'PATCH /api/{api_version}/settings/pricing_levels/{pricing_level_id}',
    ],
    SettingsShippingProfileRead: [
        'GET /api/{api_version}/settings/shipping_profiles/{shipping_profile_id}',
        'POST /api/{api_version}/settings/shipping_profiles',
    ],
    SettingsWarehouseRead: [
        'GET /api/{api_version}/settings/warehouses/{warehouse_id}',
        'POST /api/{api_version}/settings/warehouses',
        'PATCH /api/{api_version}/settings/warehouses/{warehouse_id}',
    ],
    SettingsTaxRead: ['GET /api/{api_version}/settings/taxes/{tax_id}'],
};

sealDtoSchema(
    SettingsDiscountProfile,
    SettingsDiscountProfileList,
    SettingsPaymentProcessor,
    SettingsPaymentProcessorList,
    SettingsShippingProfile,
    SettingsShippingProfileList,
    SettingsPricingLevel,
    SettingsPricingLevelList,
    SettingsTimeZone,
    SettingsTimeZoneList,
    SettingsWarehouse,
    SettingsWarehouseList,
    SettingsCurrency,
    SettingsCurrencyList,
    SettingsItemGroup,
    SettingsItemGroupList,
    CustomObject,
    CustomObjectList,
    SettingsTax,
    SettingsTaxList,
    SettingsVariation,
    SettingsVariationList,
    SettingsPaymentTerm,
    SettingsPaymentTermList,
    SettingsItemGroups,
    SettingsCustomLogicScript,
    SettingsCurrencyRead,
    SettingsCustomObjectCustomize,
    SettingsCustomObjects,
    SettingsVariations,
    SettingsTimeZoneRead,
    SettingsCustomLogicScripts,
    Settings,
    SettingsFieldSettingsItem,
    AccountingCode,
    AccountGrouping,
    CreationOfSubsidiaryAccount,
    AccountManagement,
    SalesRepTrackingAtAccountLevel,
    ReferralTrackingAtAccountLevel,
    BillingContact,
    ShippingContact,
    AdditionalContact1,
    AdditionalContact2,
    AdditionalContact3,
    Account,
    SettingsGeneralSettingsAccountUpdated,
    SettingsFieldSettingsAccount,
    SettingsFieldSettingsAccountUpdated,
    AvailableChargeType,
    AvailablePricingMethod,
    ItemGrouping,
    ItemManagement,
    UseVolumePricing,
    PricingPeriodCanVaryFromChargingPeriod,
    SalePriceEnteredIsInclusiveOfTax,
    Tax,
    PurchasePriceEnteredIsInclusiveOfTax,
    InventoryAdjustmentRule,
    PreOrder,
    Item,
    Product,
    SettingsGeneralSettingsItemUpdated,
    SettingsDiscountProfileAccountingCode,
    TaxCode,
    Currency,
    TaxRule,
    Country,
    CountryTaxByState,
    Duration,
    Attribute,
    Configuration,
    Resource,
    SettingsCustomObjectDefinition,
    SettingsCustomObjectDefinitionList,
    SettingsCustomObjectDefinitionRead,
    SettingsCustomLogicScriptSaved,
    SettingsDiscountProfileTaxCode,
    SettingsDiscountProfileRead,
    SettingsFieldSettingsItemData,
    SettingsFieldSettingList,
    SettingsFieldSettingRead,
    SettingsFieldSettingsItemGeneralSettingsAccountAccountGrouping,
    SettingsFieldSettingsItemGeneralSettingsAccountAccountManagement,
    SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact1,
    SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact2,
    SettingsFieldSettingsItemGeneralSettingsAccountAdditionalContact3,
    SettingsFieldSettingsItemGeneralSettingsAccountBillingContact,
    SettingsFieldSettingsItemGeneralSettingsAccountCreationOfSubsidiaryAccount,
    SettingsFieldSettingsItemGeneralSettingsAccountReferralTrackingAtAccountLevel,
    SettingsFieldSettingsItemGeneralSettingsAccountSalesRepTrackingAtAccountLevel,
    SettingsFieldSettingsItemGeneralSettingsAccountShippingContact,
    SettingsFieldSettingsItemGeneralSettingsAccount,
    SettingsGeneralSettingsDashboard,
    SettingsGeneralSettingsDateAndTime,
    SettingsGeneralSettingsItemUpdatedDetailAvailableChargeTypes,
    SettingsGeneralSettingsItemUpdatedDetailAvailablePricingMethods,
    SettingsGeneralSettingsItemUpdatedDetailInventoryAdjustmentRules,
    SettingsGeneralSettingsItemUpdatedDetailItemGrouping,
    SettingsGeneralSettingsItemUpdatedDetailItemManagement,
    SettingsGeneralSettingsItemUpdatedDetailPreOrder,
    SettingsGeneralSettingsItemUpdatedDetailPricingPeriodCanVaryFromChargingPeriod,
    SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTaxDetail,
    SettingsGeneralSettingsItemUpdatedDetailPurchasePriceEnteredIsInclusiveOfTax,
    SettingsGeneralSettingsItemUpdatedDetailSalePriceEnteredIsInclusiveOfTax,
    SettingsGeneralSettingsItemUpdatedDetailUseVolumePricing,
    SettingsGeneralSettingsItemUpdatedDetail,
    SettingsGeneralSettingsItemUpdatedProduct,
    SettingsGeneralSettingsLabour,
    SettingsGeneralSettingsOrderOrderManagement,
    SettingsGeneralSettingsOrderReferralTrackingAtOrderLevel,
    SettingsGeneralSettingsOrderSalesRepTrackingAtOrderLevel,
    SettingsGeneralSettingsOrder,
    SettingsGeneralSettingsPortal,
    SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseCreditNoteFields,
    SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseInvoiceFields,
    SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchasePaymentFields,
    SettingsGeneralSettingsPurchaseAllowModificationOfFollowingPurchaseRefundFields,
    SettingsGeneralSettingsPurchase,
    SettingsGeneralSettingsSecurity,
    SettingsGeneralSettingsTransactionAllowModificationOfFollowingCreditNoteFields,
    SettingsGeneralSettingsTransactionAllowModificationOfFollowingInvoiceFields,
    SettingsGeneralSettingsTransactionAllowModificationOfFollowingPaymentFields,
    SettingsGeneralSettingsTransactionAllowModificationOfFollowingRefundFields,
    SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceEmail,
    SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferencePostalMail,
    SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceTextMessage,
    SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreferenceVoiceMail,
    SettingsGeneralSettingsTransactionAvailableMediumsForCommunicationPreference,
    SettingsGeneralSettingsTransactionDefaultAccountingCodes,
    SettingsGeneralSettingsTransaction,
    SettingsGeneralSettings,
    SettingsPaymentProcessorSavedCurrency,
    SettingsPaymentProcessorSaved,
    SettingsPaymentProcessorAccountingCode,
    SettingsPaymentProcessorCurrency,
    SettingsPaymentProcessorRead,
    SettingsPaymentTermCreated,
    SettingsPaymentTermDuration,
    SettingsPaymentTermRead,
    SettingsPaymentTermUpdated,
    SettingsPricingLevelCreated,
    SettingsPricingLevelTaxCode,
    SettingsPricingLevelRead,
    SettingsShippingProfileAccountingCode,
    SettingsShippingProfileTaxRule,
    SettingsShippingProfileRead,
    SettingsWarehouseCountry,
    SettingsWarehouseRead,
    SettingsTaxCountry,
    SettingsTaxCountryTaxByState,
    SettingsTaxRead,
);
