/**
 * Typed views over the v4 item bodies.
 *
 * - The sale, purchase and inventories reads answer a stub under `item`, `{id, name, sale}` and the like;
 *   the sale and purchase stubs' `id` is a number where every other endpoint sends the string item id, so
 *   the stubs have their own views.
 * - `quantity_on_hand` is a number inside `inventories.warehouses[]` and a string on an
 *   {@link InventoryAdjustment}. Neither is coerced.
 */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** A pointer to another record. On an item: `custom_form`, `manager`, `group`. */
export class Reference extends Dto {
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

/**
 * Whoever created or last updated a record.
 *
 * **Narrower than the account family's `User`.** On an item it carries
 * `{object, name}` and nothing else. The rest are declared so a richer body still
 * reads, but do not expect them.
 */
export class User extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
        id: 'string',
        email: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
    id = this.declared<string | null>('id');
    email = this.declared<string | null>('email');
    href = this.declared<string | null>('href');
}

/** The custom form an item was created under. Present on every item. */
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

/**
 * One entry of `codes`: `name` always a string, `value` a string or null - an
 * empty slot is normal.
 */
export class ItemCode extends Dto {
    static override FIELDS = {
        name: 'string',
        value: 'string',
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<string | null>('value');
}

/** One entry of `currencies`; all four flags are always boolean. */
export class ItemCurrency extends Dto {
    static override FIELDS = {
        name: 'string',
        usedForSale: 'boolean',
        defaultForSale: 'boolean',
        usedForPurchase: 'boolean',
        defaultForPurchase: 'boolean',
        suppliers: dtoList('any'),
    } as const;

    name = this.declared<string | null>('name');
    usedForSale = this.declared<boolean | null>('usedForSale');
    defaultForSale = this.declared<boolean | null>('defaultForSale');
    usedForPurchase = this.declared<boolean | null>('usedForPurchase');
    defaultForPurchase = this.declared<boolean | null>('defaultForPurchase');
    suppliers = this.declared<Array<unknown | null> | null>('suppliers');
}

/**
 * One component of a bundle. `quantity` is a **float** - `1.0`, not `1`. `uom` is
 * rarely set.
 */
export class BundleDetail extends Dto {
    static override FIELDS = {
        id: 'string',
        name: 'string',
        quantity: 'float',
        uom: 'string',
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    quantity = this.declared<number | null>('quantity');
    uom = this.declared<string | null>('uom');
}

/** One member of an item family: id and name only. */
export class FamilyDetail extends Dto {
    static override FIELDS = {
        itemId: 'string',
        itemName: 'string',
    } as const;

    itemId = this.declared<string | null>('itemId');
    itemName = this.declared<string | null>('itemName');
}

/** One entry of `values` on {@link VariationOption}. */
export class Value extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
}

/**
 * One variation axis, in `configure_variations` or `use_variations`. The element
 * shape of `values` is not known, so it stays unknown.
 */
export class VariationOption extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
        values: dtoList(Value),
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
    values = this.declared<Array<Value | null> | null>('values');
}

/** One entry of `items` on {@link PackageDetail}. */
export class PackageDetailItem extends Dto {
    static override FIELDS = {
        itemId: 'string',
        itemName: 'string',
        quantity: 'float',
        uom: 'any',
    } as const;

    itemId = this.declared<string | null>('itemId');
    itemName = this.declared<string | null>('itemName');
    quantity = this.declared<number | null>('quantity');
    uom = this.declared<unknown>('uom');
}

/** One entry of `billing_periods` on {@link PackageDetail}. */
export class BillingPeriod extends Dto {
    static override FIELDS = {
        name: 'string',
        rank: 'int',
    } as const;

    name = this.declared<string | null>('name');
    rank = this.declared<number | null>('rank');
}

/**
 * One package on an item. `last_updated_by` and `last_updated_on` are always
 * null, so both stay unknown.
 */
export class PackageDetail extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        uuid: 'string',
        name: 'string',
        displayName: 'string',
        status: 'string',
        rank: 'int',
        items: dtoList(PackageDetailItem),
        billingPeriods: dtoList(BillingPeriod),
        customAttributes: dtoList('any'),
        createdOn: 'string',
        createdBy: User,
        lastUpdatedOn: 'any',
        lastUpdatedBy: 'any',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    status = this.declared<string | null>('status');
    rank = this.declared<number | null>('rank');
    items = this.declared<Array<PackageDetailItem | null> | null>('items');
    billingPeriods = this.declared<Array<BillingPeriod | null> | null>('billingPeriods');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    createdOn = this.declared<string | null>('createdOn');
    createdBy = this.declared<User | null>('createdBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
}

/** The `tax_code` block of {@link TaxConfiguration}. */
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

/**
 * Whether a price is entered inclusive of tax.
 *
 * **The key differs by side**: the sale block carries
 * `sale_price_entered_inclusive_of_tax`, the purchase block
 * `purchase_price_entered_inclusive_of_tax`. Both are declared so one spec serves
 * both; whichever the body did not send reads null.
 */
export class TaxConfiguration extends Dto {
    static override FIELDS = {
        salePriceEnteredInclusiveOfTax: 'boolean',
        purchasePriceEnteredInclusiveOfTax: 'boolean',
        salePriceBasedOn: 'string',
        taxCode: TaxCode,
    } as const;

    salePriceEnteredInclusiveOfTax = this.declared<boolean | null>('salePriceEnteredInclusiveOfTax');
    purchasePriceEnteredInclusiveOfTax = this.declared<boolean | null>('purchasePriceEnteredInclusiveOfTax');
    salePriceBasedOn = this.declared<string | null>('salePriceBasedOn');
    taxCode = this.declared<TaxCode | null>('taxCode');
}

/** One entry of `pricing_module` on {@link Pricing}. */
export class PricingModule extends Dto {
    static override FIELDS = {
        price: 'float',
        currency: 'string',
        pricingLevel: 'string',
        lastPurchasePrice: 'any',
        averagePurchasePrice: 'any',
        unit: 'string',
        priceType: 'string',
    } as const;

    price = this.declared<number | null>('price');
    currency = this.declared<string | null>('currency');
    pricingLevel = this.declared<string | null>('pricingLevel');
    lastPurchasePrice = this.declared<unknown>('lastPurchasePrice');
    averagePurchasePrice = this.declared<unknown>('averagePurchasePrice');
    unit = this.declared<string | null>('unit');
    priceType = this.declared<string | null>('priceType');
}

/**
 * The pricing block on a sale or purchase.
 * `latest_used_pricing_version` is the field the nested `filter` expression
 * addresses - see `getItems`.
 */
export class Pricing extends Dto {
    static override FIELDS = {
        type: 'string',
        version: 'int',
        latestUsedPricingVersion: 'int',
        pricingModule: dtoList(PricingModule),
    } as const;

    type = this.declared<string | null>('type');
    version = this.declared<number | null>('version');
    latestUsedPricingVersion = this.declared<number | null>('latestUsedPricingVersion');
    pricingModule = this.declared<Array<PricingModule | null> | null>('pricingModule');
}

/** One entry of `properties` on {@link SaleCharge}. */
export class Property extends Dto {
    static override FIELDS = {
        name: 'string',
        value: 'string',
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<string | null>('value');
}

/** The charge block on a sale. */
export class SaleCharge extends Dto {
    static override FIELDS = {
        type: 'string',
        pricePeriod: 'string',
        properties: dtoList(Property),
    } as const;

    type = this.declared<string | null>('type');
    pricePeriod = this.declared<string | null>('pricePeriod');
    properties = this.declared<Array<Property | null> | null>('properties');
}

/** The `width` block of {@link ItemSale}. */
export class Width extends Dto {
    static override FIELDS = {
        uom: 'string',
        value: 'float',
    } as const;

    uom = this.declared<string | null>('uom');
    value = this.declared<number | null>('value');
}

/** The `height` block of {@link ItemSale}. */
export class Height extends Dto {
    static override FIELDS = {
        uom: 'string',
        value: 'float',
    } as const;

    uom = this.declared<string | null>('uom');
    value = this.declared<number | null>('value');
}

/** The `length` block of {@link ItemSale}. */
export class Length extends Dto {
    static override FIELDS = {
        uom: 'string',
        value: 'float',
    } as const;

    uom = this.declared<string | null>('uom');
    value = this.declared<number | null>('value');
}

/** The `weight` block of {@link ItemSale}. */
export class Weight extends Dto {
    static override FIELDS = {
        uom: 'string',
        value: 'float',
    } as const;

    uom = this.declared<string | null>('uom');
    value = this.declared<number | null>('value');
}

/** One entry of `pricing_levels` on {@link ItemSale}. */
export class PricingLevel extends Dto {
    static override FIELDS = {
        name: 'string',
        uuid: 'string',
    } as const;

    name = this.declared<string | null>('name');
    uuid = this.declared<string | null>('uuid');
}

/** One entry of `payment_properties` on {@link ItemSale}. */
export class PaymentProperty extends Dto {
    static override FIELDS = {
        name: 'string',
        value: 'string',
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<string | null>('value');
}

/**
 * An item's sale configuration. Seven fields are always null and stay unknown.
 * `default_sale_price` is a number, occasionally null.
 */
export class ItemSale extends Dto {
    static override FIELDS = {
        enabled: 'boolean',
        enableBackOrder: 'boolean',
        invoiceNote: 'string',
        defaultSalePrice: 'float',
        pricingMethod: 'string',
        salePriceVariant: 'string',
        useOnSalePrice: 'boolean',
        taxExemptWhenSold: 'boolean',
        taxConfiguration: TaxConfiguration,
        charge: SaleCharge,
        pricing: Pricing,
        pricingLevels: dtoList(PricingLevel),
        pricingSchedules: dtoList('any'),
        paymentProperties: dtoList(PaymentProperty),
        accountingCode: 'any',
        discountProfile: 'any',
        pricingProfile: 'any',
        shippingProfile: 'any',
        salePrice: 'any',
        startDate: 'any',
        endDate: 'any',
        width: Width,
        height: Height,
        length: Length,
        weight: Weight,
    } as const;

    enabled = this.declared<boolean | null>('enabled');
    enableBackOrder = this.declared<boolean | null>('enableBackOrder');
    invoiceNote = this.declared<string | null>('invoiceNote');
    defaultSalePrice = this.declared<number | null>('defaultSalePrice');
    pricingMethod = this.declared<string | null>('pricingMethod');
    salePriceVariant = this.declared<string | null>('salePriceVariant');
    useOnSalePrice = this.declared<boolean | null>('useOnSalePrice');
    taxExemptWhenSold = this.declared<boolean | null>('taxExemptWhenSold');
    taxConfiguration = this.declared<TaxConfiguration | null>('taxConfiguration');
    charge = this.declared<SaleCharge | null>('charge');
    pricing = this.declared<Pricing | null>('pricing');
    pricingLevels = this.declared<Array<PricingLevel | null> | null>('pricingLevels');
    pricingSchedules = this.declared<Array<unknown | null> | null>('pricingSchedules');
    paymentProperties = this.declared<Array<PaymentProperty | null> | null>('paymentProperties');
    accountingCode = this.declared<unknown>('accountingCode');
    discountProfile = this.declared<unknown>('discountProfile');
    pricingProfile = this.declared<unknown>('pricingProfile');
    shippingProfile = this.declared<unknown>('shippingProfile');
    salePrice = this.declared<unknown>('salePrice');
    startDate = this.declared<unknown>('startDate');
    endDate = this.declared<unknown>('endDate');
    width = this.declared<Width | null>('width');
    height = this.declared<Height | null>('height');
    length = this.declared<Length | null>('length');
    weight = this.declared<Weight | null>('weight');
}

/** One entry of `suppliers` on {@link ItemPurchase}. */
export class Supplier extends Dto {
    static override FIELDS = {
        id: 'any',
        name: 'string',
        accountingCode: 'any',
        purchaseOrderNote: 'any',
        defaultPurchasePrice: 'float',
        taxExemptWhenPurchase: 'boolean',
        taxConfiguration: TaxConfiguration,
        pricing: Pricing,
    } as const;

    id = this.declared<unknown>('id');
    name = this.declared<string | null>('name');
    accountingCode = this.declared<unknown>('accountingCode');
    purchaseOrderNote = this.declared<unknown>('purchaseOrderNote');
    defaultPurchasePrice = this.declared<number | null>('defaultPurchasePrice');
    taxExemptWhenPurchase = this.declared<boolean | null>('taxExemptWhenPurchase');
    taxConfiguration = this.declared<TaxConfiguration | null>('taxConfiguration');
    pricing = this.declared<Pricing | null>('pricing');
}

/** One entry of `purchase_properties` on {@link ItemPurchase}. */
export class PurchaseProperty extends Dto {
    static override FIELDS = {
        name: 'string',
        value: 'string',
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<string | null>('value');
}

/**
 * An item's purchase configuration. `accounting_code` and `pricing_profile` are
 * always null.
 */
export class ItemPurchase extends Dto {
    static override FIELDS = {
        enabled: 'boolean',
        supplierManagementEnabled: 'boolean',
        purchaseOrderNote: 'string',
        defaultPurchasePrice: 'float',
        taxExemptWhenPurchase: 'boolean',
        taxConfiguration: TaxConfiguration,
        pricing: Pricing,
        purchaseProperties: dtoList(PurchaseProperty),
        accountingCode: 'any',
        pricingProfile: 'any',
        suppliers: dtoList(Supplier),
    } as const;

    enabled = this.declared<boolean | null>('enabled');
    supplierManagementEnabled = this.declared<boolean | null>('supplierManagementEnabled');
    purchaseOrderNote = this.declared<string | null>('purchaseOrderNote');
    defaultPurchasePrice = this.declared<number | null>('defaultPurchasePrice');
    taxExemptWhenPurchase = this.declared<boolean | null>('taxExemptWhenPurchase');
    taxConfiguration = this.declared<TaxConfiguration | null>('taxConfiguration');
    pricing = this.declared<Pricing | null>('pricing');
    purchaseProperties = this.declared<Array<PurchaseProperty | null> | null>('purchaseProperties');
    accountingCode = this.declared<unknown>('accountingCode');
    pricingProfile = this.declared<unknown>('pricingProfile');
    suppliers = this.declared<Array<Supplier | null> | null>('suppliers');
}

/** One entry of `preorder_configuration` on {@link InventoryProperties}. */
export class PreorderConfiguration extends Dto {
    static override FIELDS = {
        name: 'string',
        endDate: 'string',
        startDate: 'string',
    } as const;

    name = this.declared<string | null>('name');
    endDate = this.declared<string | null>('endDate');
    startDate = this.declared<string | null>('startDate');
}

/**
 * The inventory settings block.
 * `quantity_available_for_sale` is a **string**.
 */
export class InventoryProperties extends Dto {
    static override FIELDS = {
        enabled: 'boolean',
        enableBatchTracking: 'boolean',
        enableSerialization: 'boolean',
        enableInventoryCosting: 'boolean',
        enableLowStockNotification: 'boolean',
        enablePreorder: 'boolean',
        enableReordering: 'boolean',
        lowStockThresholdBasedOn: 'string',
        reorderingThresholdBasedOn: 'string',
        quantityAvailableForSale: 'string',
        quantityAvailableForSaleDetermination: dtoList('string'),
        useAtpValueAsQuantityAvailableForWebhook: 'boolean',
        defaultCostPerUnit: 'any',
        preorderPeriod: 'string',
        preorderConfiguration: dtoList(PreorderConfiguration),
    } as const;

    enabled = this.declared<boolean | null>('enabled');
    enableBatchTracking = this.declared<boolean | null>('enableBatchTracking');
    enableSerialization = this.declared<boolean | null>('enableSerialization');
    enableInventoryCosting = this.declared<boolean | null>('enableInventoryCosting');
    enableLowStockNotification = this.declared<boolean | null>('enableLowStockNotification');
    enablePreorder = this.declared<boolean | null>('enablePreorder');
    enableReordering = this.declared<boolean | null>('enableReordering');
    lowStockThresholdBasedOn = this.declared<string | null>('lowStockThresholdBasedOn');
    reorderingThresholdBasedOn = this.declared<string | null>('reorderingThresholdBasedOn');
    quantityAvailableForSale = this.declared<string | null>('quantityAvailableForSale');
    quantityAvailableForSaleDetermination = this.declared<Array<string | null> | null>(
        'quantityAvailableForSaleDetermination',
    );
    useAtpValueAsQuantityAvailableForWebhook = this.declared<boolean | null>(
        'useAtpValueAsQuantityAvailableForWebhook',
    );
    defaultCostPerUnit = this.declared<unknown>('defaultCostPerUnit');
    preorderPeriod = this.declared<string | null>('preorderPeriod');
    preorderConfiguration = this.declared<Array<PreorderConfiguration | null> | null>('preorderConfiguration');
}

/** The `warehouse` block of {@link WarehouseInventory}. */
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

/**
 * One warehouse's stock line.
 *
 * **The quantities are numbers here** and each has a `_value` twin that is a
 * **string** - `quantity_on_hand: 79999` beside `quantity_on_hand_value: "0.00"`.
 * The same names on an {@link InventoryAdjustment} are strings instead. Nothing is
 * coerced either way. `warehouse` and `uom` are always null.
 */
export class WarehouseInventory extends Dto {
    static override FIELDS = {
        quantityOnHand: 'int',
        quantityOnHandValue: 'string',
        quantityAvailable: 'float',
        quantityAvailableValue: 'string',
        quantityOnOrder: 'int',
        quantityPromised: 'float',
        quantityOnReturn: 'int',
        quantityOnPurchaseReturn: 'int',
        warehouse: Warehouse,
        uom: 'string',
    } as const;

    quantityOnHand = this.declared<number | null>('quantityOnHand');
    quantityOnHandValue = this.declared<string | null>('quantityOnHandValue');
    quantityAvailable = this.declared<number | null>('quantityAvailable');
    quantityAvailableValue = this.declared<string | null>('quantityAvailableValue');
    quantityOnOrder = this.declared<number | null>('quantityOnOrder');
    quantityPromised = this.declared<number | null>('quantityPromised');
    quantityOnReturn = this.declared<number | null>('quantityOnReturn');
    quantityOnPurchaseReturn = this.declared<number | null>('quantityOnPurchaseReturn');
    warehouse = this.declared<Warehouse | null>('warehouse');
    uom = this.declared<string | null>('uom');
}

/** An item's inventory block. */
export class ItemInventories extends Dto {
    static override FIELDS = {
        enabled: 'boolean',
        enableWarehouseManagement: 'boolean',
        defaultWarehouse: 'string',
        inventoryProperties: InventoryProperties,
        warehouses: dtoList(WarehouseInventory),
    } as const;

    enabled = this.declared<boolean | null>('enabled');
    enableWarehouseManagement = this.declared<boolean | null>('enableWarehouseManagement');
    defaultWarehouse = this.declared<string | null>('defaultWarehouse');
    inventoryProperties = this.declared<InventoryProperties | null>('inventoryProperties');
    warehouses = this.declared<Array<WarehouseInventory | null> | null>('warehouses');
}

/** One file on a note. The element shape is not known. */
export class NoteAttachment extends Dto {
    static override ENVELOPE_KEY = 'file';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
        uuid: 'string',
        filename: 'string',
        contentType: 'string',
        size: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
    uuid = this.declared<string | null>('uuid');
    filename = this.declared<string | null>('filename');
    contentType = this.declared<string | null>('contentType');
    size = this.declared<number | null>('size');
}

/** One entry of `watchers` on {@link Note}. */
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

/** The `last_updated_by` block of {@link Note}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/**
 * One note on an item. `group` and `user` are always null.
 */
export class Note extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        content: 'string',
        version: 'int',
        href: 'string',
        createdOn: 'string',
        createdBy: User,
        item: Reference,
        attachments: dtoList(NoteAttachment),
        watchers: dtoList(Watcher),
        group: 'any',
        user: 'any',
        lastUpdatedOn: 'string',
        lastUpdatedBy: LastUpdatedBy,
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    content = this.declared<string | null>('content');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
    createdOn = this.declared<string | null>('createdOn');
    createdBy = this.declared<User | null>('createdBy');
    item = this.declared<Reference | null>('item');
    attachments = this.declared<Array<NoteAttachment | null> | null>('attachments');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
    group = this.declared<unknown>('group');
    user = this.declared<unknown>('user');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
}

/** One entry of `custom_attributes` on {@link Item}. */
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

/**
 * One item, as `getItem` and the listing return it.
 *
 * `id` is the operator-assigned code - `"ITEM-0001"` - and is what every path
 * takes. Declared `'string'`; the three exceptions are the sale, purchase and
 * inventories stubs, which have their own specs
 * precisely so this one keeps the check.
 *
 * `base_uom` and `image_url` are always null and are left unknown. `uoms`,
 * `custom_attributes` and `activity_logs` are present but **always empty**, so
 * their element types are unknown.
 *
 * The sub-resource fields - `sale`, `purchase`, `inventories`, `bundle_details`,
 * `package_details`, `family_details` - arrive only on the endpoint that asks for
 * them. On a plain listing they are absent, not null.
 */
export class Item extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        displayName: 'string',
        description: 'string',
        type: 'string',
        status: 'string',
        origin: 'string',
        invoiceNote: 'string',
        version: 'int',
        href: 'string',
        saleEnabled: 'boolean',
        purchaseEnabled: 'boolean',
        inventoryEnabled: 'boolean',
        variationsEnabled: 'boolean',
        parent: 'boolean',
        child: 'boolean',
        parentItemId: 'string',
        customForm: CustomForm,
        manager: Reference,
        group: Reference,
        createdOn: 'string',
        createdBy: User,
        lastUpdatedOn: 'string',
        lastUpdatedBy: User,
        codes: dtoList(ItemCode),
        currencies: dtoList(ItemCurrency),
        sale: ItemSale,
        purchase: ItemPurchase,
        inventories: ItemInventories,
        bundleDetails: dtoList(BundleDetail),
        familyDetails: dtoList(FamilyDetail),
        packageDetails: dtoList(PackageDetail),
        configureVariations: dtoList(VariationOption),
        useVariations: dtoList(VariationOption),
        customObjects: dtoList('any'),
        uoms: dtoList('any'),
        customAttributes: dtoList(CustomAttribute),
        activityLogs: dtoList('any'),
        baseUom: 'any',
        imageUrl: 'any',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<string | null>('description');
    type = this.declared<string | null>('type');
    status = this.declared<string | null>('status');
    origin = this.declared<string | null>('origin');
    invoiceNote = this.declared<string | null>('invoiceNote');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
    saleEnabled = this.declared<boolean | null>('saleEnabled');
    purchaseEnabled = this.declared<boolean | null>('purchaseEnabled');
    inventoryEnabled = this.declared<boolean | null>('inventoryEnabled');
    variationsEnabled = this.declared<boolean | null>('variationsEnabled');
    /** The **read** spelling. Written as `is_parent` / `is_child`. */
    parent = this.declared<boolean | null>('parent');
    child = this.declared<boolean | null>('child');
    parentItemId = this.declared<string | null>('parentItemId');
    customForm = this.declared<CustomForm | null>('customForm');
    manager = this.declared<Reference | null>('manager');
    /** Nearly always null. */
    group = this.declared<Reference | null>('group');
    createdOn = this.declared<string | null>('createdOn');
    createdBy = this.declared<User | null>('createdBy');
    /** Both null on an item never edited. */
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    lastUpdatedBy = this.declared<User | null>('lastUpdatedBy');
    codes = this.declared<Array<ItemCode | null> | null>('codes');
    currencies = this.declared<Array<ItemCurrency | null> | null>('currencies');
    sale = this.declared<ItemSale | null>('sale');
    purchase = this.declared<ItemPurchase | null>('purchase');
    inventories = this.declared<ItemInventories | null>('inventories');
    bundleDetails = this.declared<Array<BundleDetail | null> | null>('bundleDetails');
    familyDetails = this.declared<Array<FamilyDetail | null> | null>('familyDetails');
    packageDetails = this.declared<Array<PackageDetail | null> | null>('packageDetails');
    configureVariations = this.declared<Array<VariationOption | null> | null>('configureVariations');
    useVariations = this.declared<Array<VariationOption | null> | null>('useVariations');
    customObjects = this.declared<Array<unknown | null> | null>('customObjects');
    /** Present but always empty. */
    uoms = this.declared<Array<unknown | null> | null>('uoms');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    /** Always null. */
    baseUom = this.declared<unknown>('baseUom');
    imageUrl = this.declared<unknown>('imageUrl');
}

/**
 * The listing envelope. Items page by **cursor**, like accounts: the pagination
 * block carries `has_more`, `limit`, `links`, `next_cursor` and
 * `prev_cursor`. There is no offset shape here.
 */
export class ItemList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(Item),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<Item | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/**
 * What `getItemSale` answers: a **stub**, not the item.
 *
 * Three keys - `{id, name, sale}` - and `id` is a **number**, not the string code
 * the path took. They sit under `item`, as a whole item does. Use {@link Item}
 * for anything that returns a real item.
 */
export class ItemSaleView extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        id: 'int',
        name: 'string',
        sale: ItemSale,
    } as const;

    id = this.declared<number | null>('id');
    name = this.declared<string | null>('name');
    sale = this.declared<ItemSale | null>('sale');
}

/** `{id, name, purchase}`, `id` a number. */
export class ItemPurchaseView extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        id: 'int',
        name: 'string',
        purchase: ItemPurchase,
    } as const;

    id = this.declared<number | null>('id');
    name = this.declared<string | null>('name');
    purchase = this.declared<ItemPurchase | null>('purchase');
}

/** `{id, name, inventories}`, `id` the string item code, unlike the other two stubs. */
export class ItemInventoriesView extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        id: 'string',
        name: 'string',
        inventories: ItemInventories,
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    inventories = this.declared<ItemInventories | null>('inventories');
}

/**
 * One inventory movement.
 *
 * **Every quantity is a string here** - `"79999"`, not `79999` - the opposite of
 * {@link WarehouseInventory}, where the same names are numbers. `created_by` and
 * `last_updated_by` are always null.
 */
export class InventoryAdjustment extends Dto {
    static override ENVELOPE_KEY = 'inventory_adjustment';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        itemId: 'string',
        itemName: 'string',
        warehouseName: 'string',
        adjustmentAmount: 'string',
        adjustmentType: 'string',
        reference: 'string',
        status: 'string',
        quantityOnHand: 'string',
        quantityAvailable: 'string',
        quantityOnOrder: 'string',
        quantityPromised: 'string',
        quantityOnReturn: 'string',
        quantityOnPurchaseReturn: 'string',
        quantityOnReserve: 'string',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        href: 'string',
        createdBy: 'any',
        lastUpdatedBy: 'any',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    itemId = this.declared<string | null>('itemId');
    itemName = this.declared<string | null>('itemName');
    warehouseName = this.declared<string | null>('warehouseName');
    adjustmentAmount = this.declared<string | null>('adjustmentAmount');
    adjustmentType = this.declared<string | null>('adjustmentType');
    reference = this.declared<string | null>('reference');
    status = this.declared<string | null>('status');
    quantityOnHand = this.declared<string | null>('quantityOnHand');
    quantityAvailable = this.declared<string | null>('quantityAvailable');
    quantityOnOrder = this.declared<string | null>('quantityOnOrder');
    quantityPromised = this.declared<string | null>('quantityPromised');
    quantityOnReturn = this.declared<string | null>('quantityOnReturn');
    quantityOnPurchaseReturn = this.declared<string | null>('quantityOnPurchaseReturn');
    quantityOnReserve = this.declared<string | null>('quantityOnReserve');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    href = this.declared<string | null>('href');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
}

/** The listing envelope for inventory adjustments. */
export class InventoryAdjustmentList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(InventoryAdjustment),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<InventoryAdjustment | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** The listing envelope for an item's notes. */
export class NoteList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(Note),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<Note | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/**
 * The listing envelope for a note's attachments.
 *
 * Unverified: the API has answered 404 to it, so the element shape is the account
 * family's.
 */
export class NoteFileList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(NoteAttachment),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<NoteAttachment | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** The single-note envelope, `{"note": {...}}`. {@link Note} already unwraps it. */
export {Note as NoteView};
/**
 * The body `createItem` takes.
 *
 * `type` and `name` are the minimum that works.
 * `type` takes `"STANDARD"`, `"BUNDLE"`, `"FAMILY"` or `"VARIATION_BASED"`.
 *
 * **The family flags are written `is_parent`/`is_child` and read back as
 * `parent`/`child`.**
 *
 * `group` rejects an unknown value with `400 internal_error "Invalid group"`.
 *
 * The nested blocks are `'unknown'` rather than the read specs: the write shapes
 * differ from the read shapes (`uoms` entries
 * carry `base_uom` and `sale_conversion_rate`, which no read body has shown).
 */
export class ItemCreate extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        name: 'string',
        type: 'string',
        displayName: 'string',
        description: 'string',
        origin: 'string',
        invoiceNote: 'string',
        manager: 'string',
        customForm: 'string',
        group: 'string',
        isParent: 'boolean',
        isChild: 'boolean',
        parentItemId: 'string',
        currencies: dtoList(ItemCurrency),
        uoms: dtoList('any'),
        sale: 'any',
        purchase: 'any',
        inventories: 'any',
        bundleDetails: dtoList('any'),
    } as const;

    name = this.declared<string | null>('name');
    type = this.declared<string | null>('type');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<string | null>('description');
    origin = this.declared<string | null>('origin');
    invoiceNote = this.declared<string | null>('invoiceNote');
    manager = this.declared<string | null>('manager');
    customForm = this.declared<string | null>('customForm');
    group = this.declared<string | null>('group');
    /** The write spelling. Reads back as `parent` / `child`. */
    isParent = this.declared<boolean | null>('isParent');
    isChild = this.declared<boolean | null>('isChild');
    parentItemId = this.declared<string | null>('parentItemId');
    currencies = this.declared<Array<ItemCurrency | null> | null>('currencies');
    uoms = this.declared<Array<unknown | null> | null>('uoms');
    sale = this.declared<unknown>('sale');
    purchase = this.declared<unknown>('purchase');
    inventories = this.declared<unknown>('inventories');
    bundleDetails = this.declared<Array<unknown | null> | null>('bundleDetails');
}

/** The body `updateItemInformation` takes. Partial: send only what changes. */
export class ItemInformationUpdate extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        name: 'string',
        displayName: 'string',
        description: 'string',
        origin: 'string',
        invoiceNote: 'string',
        manager: 'string',
        customForm: 'string',
    } as const;

    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<string | null>('description');
    origin = this.declared<string | null>('origin');
    invoiceNote = this.declared<string | null>('invoiceNote');
    manager = this.declared<string | null>('manager');
    customForm = this.declared<string | null>('customForm');
}

/**
 * The body the sale create and update take:
 * `{"item": {"sale": {...}, "currencies": [...]}}` - the sale block sits *inside*
 * the item envelope, and `currencies` sits beside it rather than within it.
 *
 * `sale` is `'unknown'`: it takes partial blocks such as `{default_sale_price: 75}`
 * or `{charge: {type: "RECURRING"}}`, and no one shape is declared.
 */
export class ItemSaleWrite extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        sale: 'any',
        currencies: dtoList(ItemCurrency),
    } as const;

    sale = this.declared<unknown>('sale');
    currencies = this.declared<Array<ItemCurrency | null> | null>('currencies');
}

/** `{"item": {"purchase": {...}, "currencies": [...]}}`. */
export class ItemPurchaseWrite extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        purchase: 'any',
        currencies: dtoList(ItemCurrency),
    } as const;

    purchase = this.declared<unknown>('purchase');
    currencies = this.declared<Array<ItemCurrency | null> | null>('currencies');
}

/**
 * `{"item": {"inventories": {...}}}`.
 *
 * Turning inventory **off** is refused with `400 "Unable to disable Inventory
 * Management"` once stock exists. The write spells warehouse management
 * `warehouse_enabled` where the read returns `enable_warehouse_management`.
 */
export class ItemInventoriesWrite extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        inventories: 'any',
    } as const;

    inventories = this.declared<unknown>('inventories');
}

/**
 * `{"item": {"inventories": {"warehouses": [{name, quantity, accounting_code}]}}}`
 * - `name`, where the read side calls the same thing `warehouse`.
 */
export class InventoryAdd extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        inventories: 'any',
    } as const;

    inventories = this.declared<unknown>('inventories');
}

/**
 * The body `updateItemVariations` takes, in one of two forms: a parent declares
 * `configure_variations`; a child sets `parent_item_id` and `use_variations`. The
 * API has answered 400 to both.
 */
export class ItemVariationsWrite extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        configureVariations: dtoList('any'),
        useVariations: dtoList('any'),
        parentItemId: 'string',
    } as const;

    configureVariations = this.declared<Array<unknown | null> | null>('configureVariations');
    useVariations = this.declared<Array<unknown | null> | null>('useVariations');
    parentItemId = this.declared<string | null>('parentItemId');
}

/** `{"item": {"bundle_details": [{id, quantity}]}}` - a **bare list**. */
export class ItemBundleDetailsWrite extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        bundleDetails: dtoList('any'),
    } as const;

    bundleDetails = this.declared<Array<unknown | null> | null>('bundleDetails');
}

/**
 * `{"item": {"family_details": {"add": ["ITEM-0002"]}}}` - an **object with an
 * `add` list**, the opposite of how `bundle_details` is written. The API has
 * answered 405 to it.
 */
export class ItemFamilyDetailsWrite extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        familyDetails: 'any',
    } as const;

    familyDetails = this.declared<unknown>('familyDetails');
}

/** `{"item": {"package_details": {name, rank, rate_list}}}`. Answered 405. */
export class ItemPackageDetailsWrite extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        packageDetails: 'any',
    } as const;

    packageDetails = this.declared<unknown>('packageDetails');
}

/**
 * Base64 in a JSON body, as on an account - **not** a multipart upload, and the
 * one write in this family with no `item` envelope. The API has answered 500 to it.
 */
export class ItemImageUpload extends Dto {
    static override FIELDS = {
        image_base64: 'string',
    } as const;

    image_base64 = this.declared<string | null>('image_base64');
}

/** The item warehouse inventories body. */
export class ItemWarehouseInventories extends Dto {
    static override ENVELOPE_KEY = 'item';

    static override FIELDS = {
        id: 'string',
        name: 'string',
        inventories: ItemInventories,
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    inventories = this.declared<ItemInventories | null>('inventories');
}

sealDtoSchema(
    Reference,
    User,
    CustomForm,
    ItemCode,
    ItemCurrency,
    BundleDetail,
    FamilyDetail,
    VariationOption,
    PackageDetail,
    TaxConfiguration,
    Pricing,
    SaleCharge,
    ItemSale,
    ItemPurchase,
    InventoryProperties,
    WarehouseInventory,
    ItemInventories,
    NoteAttachment,
    Note,
    Item,
    ItemList,
    ItemSaleView,
    ItemPurchaseView,
    ItemInventoriesView,
    InventoryAdjustment,
    InventoryAdjustmentList,
    NoteList,
    NoteFileList,
    ItemCreate,
    ItemInformationUpdate,
    ItemSaleWrite,
    ItemPurchaseWrite,
    ItemInventoriesWrite,
    InventoryAdd,
    ItemVariationsWrite,
    ItemBundleDetailsWrite,
    ItemFamilyDetailsWrite,
    ItemPackageDetailsWrite,
    ItemImageUpload,
    TaxCode,
    Width,
    Height,
    Length,
    Weight,
    Supplier,
    PreorderConfiguration,
    ItemWarehouseInventories,
    Value,
    PackageDetailItem,
    BillingPeriod,
    PricingModule,
    Property,
    PricingLevel,
    PaymentProperty,
    PurchaseProperty,
    Warehouse,
    Watcher,
    LastUpdatedBy,
    CustomAttribute,
);
