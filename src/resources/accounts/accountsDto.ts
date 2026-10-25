/**
 * Typed views over the v4 account bodies. Three read/write asymmetries are the API's own, not mistakes:
 *
 * - An address reads `postal_code` and is written `post_code`.
 * - A contact's name reads nested under `name` as `first`, `middle` and `last`, and is written flat as
 *   `first_name`, `middle_name` and `last_name`.
 * - The billing alignment setting is written `charging_and_billing_alignment` as a boolean, and reads back under
 *   that name as a string or as `charges_aligned_to_billing`, a boolean, so the read view declares both.
 */

import {Dto, dtoList, dtoOneOf, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';
import {
    ComponentObjectsDataCustomForm,
    ComponentObjectsDataDetail,
    ComponentObjectsDataParent,
} from '../customComponents/customComponentsDto.js';

/** v4's standard embedded pointer to another record. */
export class Reference extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        code: 'string',
        href: 'string',
        rate: 'float',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
    rate = this.declared<number | null>('rate');
}

/** Whoever created or last updated a record. */
export class User extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        email: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    email = this.declared<string | null>('email');
    href = this.declared<string | null>('href');
}

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

/** Present on every account and never null; each value is usually null. */
export class SocialLinks extends Dto {
    static override FIELDS = {
        website: 'string',
        linkedin: 'string',
        twitter: 'string',
        facebook: 'string',
    } as const;

    website = this.declared<string | null>('website');
    linkedin = this.declared<string | null>('linkedin');
    twitter = this.declared<string | null>('twitter');
    facebook = this.declared<string | null>('facebook');
}

/**
 * An address **as it reads back**. Which of its fields can be null is not known.
 */
export class Address extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        addressLine1: 'string',
        addressLine2: 'string',
        addressLine3: 'string',
        addressLine4: 'string',
        addressLine5: 'string',
        city: 'string',
        state: 'string',
        country: 'string',
        postalCode: 'string',
        defaultBilling: 'boolean',
        defaultShipping: 'boolean',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    addressLine1 = this.declared<string | null>('addressLine1');
    addressLine2 = this.declared<string | null>('addressLine2');
    addressLine3 = this.declared<string | null>('addressLine3');
    addressLine4 = this.declared<string | null>('addressLine4');
    addressLine5 = this.declared<string | null>('addressLine5');
    city = this.declared<string | null>('city');
    state = this.declared<string | null>('state');
    country = this.declared<string | null>('country');
    /** The read spelling. Written as `post_code`; see {@link AddressWrite}. */
    postalCode = this.declared<string | null>('postalCode');
    defaultBilling = this.declared<boolean | null>('defaultBilling');
    defaultShipping = this.declared<boolean | null>('defaultShipping');
    href = this.declared<string | null>('href');
}

/** A contact's name **as it reads back** - nested, and split four ways. */
export class ContactName extends Dto {
    static override FIELDS = {
        salutation: 'string',
        first: 'string',
        middle: 'string',
        last: 'string',
        designation: 'string',
    } as const;

    salutation = this.declared<string | null>('salutation');
    first = this.declared<string | null>('first');
    middle = this.declared<string | null>('middle');
    last = this.declared<string | null>('last');
    designation = this.declared<string | null>('designation');
}

export class ContactEmail extends Dto {
    static override FIELDS = {
        address: 'string',
        doNotEmail: 'boolean',
        emailOptedOut: 'boolean',
    } as const;

    address = this.declared<string | null>('address');
    doNotEmail = this.declared<boolean | null>('doNotEmail');
    emailOptedOut = this.declared<boolean | null>('emailOptedOut');
}

/** A contact's phone, mobile or fax. All three share this shape. */
export class ContactPhone extends Dto {
    static override FIELDS = {
        countryCode: 'string',
        areaCode: 'string',
        number: 'string',
        doNotCall: 'boolean',
        dialingCode: 'string',
        formatted: 'string',
        callOptedOut: 'boolean',
    } as const;

    countryCode = this.declared<string | null>('countryCode');
    areaCode = this.declared<string | null>('areaCode');
    number = this.declared<string | null>('number');
    doNotCall = this.declared<boolean | null>('doNotCall');
    dialingCode = this.declared<string | null>('dialingCode');
    formatted = this.declared<string | null>('formatted');
    callOptedOut = this.declared<boolean | null>('callOptedOut');
}

/** The `address` block of {@link Contact}. */
export class ContactAddress extends Dto {
    static override FIELDS = {
        line_1: 'string',
        line_2: 'string',
        city: 'string',
        state: 'string',
        postalCode: 'string',
        country: 'string',
        countryCode: 'any',
    } as const;

    line_1 = this.declared<string | null>('line_1');
    line_2 = this.declared<string | null>('line_2');
    city = this.declared<string | null>('city');
    state = this.declared<string | null>('state');
    postalCode = this.declared<string | null>('postalCode');
    country = this.declared<string | null>('country');
    countryCode = this.declared<unknown>('countryCode');
}

/** One entry of `custom_attributes` on {@link Contact}. */
export class CustomAttribute extends Dto {
    static override FIELDS = {
        name: 'string',
        value: dtoOneOf('string', dtoList('string')),
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<string | Array<string | null> | null>('value');
}

/** A contact **as it reads back**. */
export class Contact extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        type: 'string',
        billingContact: 'boolean',
        shippingContact: 'boolean',
        receivesBillingInformation: 'boolean',
        name: ContactName,
        email: ContactEmail,
        phone: ContactPhone,
        mobile: ContactPhone,
        fax: ContactPhone,
        address: ContactAddress,
        customAttributes: dtoList(CustomAttribute),
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: User,
        lastUpdatedBy: User,
        version: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    /** `"billing"`, `"shipping"` or `"primary"`. This is what a v4 path takes. */
    type = this.declared<string | null>('type');
    billingContact = this.declared<boolean | null>('billingContact');
    shippingContact = this.declared<boolean | null>('shippingContact');
    receivesBillingInformation = this.declared<boolean | null>('receivesBillingInformation');
    name = this.declared<ContactName | null>('name');
    email = this.declared<ContactEmail | null>('email');
    /** Sometimes null. */
    phone = this.declared<ContactPhone | null>('phone');
    /** Often null. */
    mobile = this.declared<ContactPhone | null>('mobile');
    /** Often null. */
    fax = this.declared<ContactPhone | null>('fax');
    address = this.declared<ContactAddress | null>('address');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    createdOn = this.declared<string | null>('createdOn');
    /** Set only once the contact has been edited. */
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<User | null>('createdBy');
    lastUpdatedBy = this.declared<User | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
}

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

/** A payment method **as it reads back**. */
export class PaymentMethod extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        processorType: 'string',
        status: 'string',
        default: 'boolean',
        restrictedToOrders: 'boolean',
        specifiedOrderIds: 'any',
        processor: PaymentProcessor,
        reference: 'string',
        paymentCount: 'int',
        lastUsedAt: 'string',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: User,
        lastUpdatedBy: User,
        version: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    processorType = this.declared<string | null>('processorType');
    status = this.declared<string | null>('status');
    default = this.declared<boolean | null>('default');
    restrictedToOrders = this.declared<boolean | null>('restrictedToOrders');
    /**
     * Untyped: its shape is not known. Named as though it holds a list, but
     *  nothing confirms that.
     */
    specifiedOrderIds = this.declared<unknown>('specifiedOrderIds');
    processor = this.declared<PaymentProcessor | null>('processor');
    reference = this.declared<string | null>('reference');
    paymentCount = this.declared<number | null>('paymentCount');
    /** Null on a method never charged. */
    lastUsedAt = this.declared<string | null>('lastUsedAt');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<User | null>('createdBy');
    lastUpdatedBy = this.declared<User | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
}

/**
 * Billing preferences **as they read back**.
 *
 * Field presence varies a great deal between accounts, so most of these are
 * absent rather than null on a given one, and `.map` is the only way to tell.
 */
export class BillingPreferences extends Dto {
    static override FIELDS = {
        communicationProfile: 'string',
        invoiceMode: 'string',
        invoiceTerm: 'string',
        billingPeriod: 'string',
        billingStartDate: 'string',
        billingStartDayOfMonth: 'int',
        chargesAlignedToBilling: 'boolean',
        chargingAndBillingAlignment: 'string',
        paymentProcessor: 'string',
        paymentMode: 'string',
        paymentTerm: 'string',
        paymentTermAlignment: 'string',
        consolidateInvoice: 'boolean',
        fulfillmentMode: 'string',
        fulfillmentTerm: 'string',
        proformaProperties: 'any',
        communicationGroup: 'string',
        billingMode: 'string',
        chargingPeriod: 'string',
        chargingStartDate: 'string',
        eventProfile: 'string',
    } as const;

    communicationProfile = this.declared<string | null>('communicationProfile');
    invoiceMode = this.declared<string | null>('invoiceMode');
    invoiceTerm = this.declared<string | null>('invoiceTerm');
    billingPeriod = this.declared<string | null>('billingPeriod');
    billingStartDate = this.declared<string | null>('billingStartDate');
    billingStartDayOfMonth = this.declared<number | null>('billingStartDayOfMonth');
    /**
     * One of the two names the alignment setting reads back under, as a
     *  boolean.
     */
    chargesAlignedToBilling = this.declared<boolean | null>('chargesAlignedToBilling');
    /**
     * The other, as a **string**, although the write side sends this same name
     *  as a boolean.
     */
    chargingAndBillingAlignment = this.declared<string | null>('chargingAndBillingAlignment');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    paymentMode = this.declared<string | null>('paymentMode');
    paymentTerm = this.declared<string | null>('paymentTerm');
    paymentTermAlignment = this.declared<string | null>('paymentTermAlignment');
    consolidateInvoice = this.declared<boolean | null>('consolidateInvoice');
    fulfillmentMode = this.declared<string | null>('fulfillmentMode');
    fulfillmentTerm = this.declared<string | null>('fulfillmentTerm');
    /**
     * Untyped: sometimes an object, whose keys are not known.
     */
    proformaProperties = this.declared<unknown>('proformaProperties');
    communicationGroup = this.declared<string | null>('communicationGroup');
    billingMode = this.declared<string | null>('billingMode');
    chargingPeriod = this.declared<string | null>('chargingPeriod');
    chargingStartDate = this.declared<string | null>('chargingStartDate');
    eventProfile = this.declared<string | null>('eventProfile');
}

/** Identified by `uuid` - a bare UUID, not prefixed the way a note's id is. */
export class NoteAttachment extends Dto {
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

export class Note extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        content: 'string',
        account: Reference,
        group: 'any',
        user: 'any',
        attachments: dtoList(NoteAttachment),
        watchers: dtoList(Watcher),
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: User,
        lastUpdatedBy: User,
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    /** HTML, stored and returned as written. */
    content = this.declared<string | null>('content');
    account = this.declared<Reference | null>('account');
    group = this.declared<unknown>('group');
    user = this.declared<unknown>('user');
    attachments = this.declared<Array<NoteAttachment | null> | null>('attachments');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<User | null>('createdBy');
    lastUpdatedBy = this.declared<User | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** The `accounting_code` block of {@link Account}. */
export class AccountingCode extends Dto {
    static override FIELDS = {
        accountReceivable: 'string',
    } as const;

    accountReceivable = this.declared<string | null>('accountReceivable');
}

/** One entry of `communication_preferences` on {@link Account}. */
export class CommunicationPreference extends Dto {
    static override FIELDS = {
        channel: 'string',
        enabled: 'boolean',
    } as const;

    channel = this.declared<string | null>('channel');
    enabled = this.declared<boolean | null>('enabled');
}

/** One entry of `custom_attributes` on {@link Account}. */
export class AccountCustomAttribute extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        type: 'string',
        value: dtoOneOf('string', dtoList('string')),
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    type = this.declared<string | null>('type');
    value = this.declared<string | Array<string | null> | null>('value');
    href = this.declared<string | null>('href');
}

/** One entry of `custom_objects` on {@link Account}. */
export class CustomObject extends Dto {
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
 * One account.
 *
 * The envelope is `"account"`, so this reads both a `{"account": {...}}` detail
 * body and a single entry out of a listing's `data`.
 */
export class Account extends Dto {
    static override ENVELOPE_KEY = 'account';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        status: 'string',
        type: 'string',
        displayName: 'string',
        emailAddress: 'string',
        description: 'string',
        currency: Currency,
        timeZone: TimeZone,
        tax: Reference,
        customForm: CustomForm,
        parentAccountId: 'string',
        imageUrl: 'any',
        workflowStatus: 'string',
        socialLinks: SocialLinks,
        communicationPreferences: dtoList(CommunicationPreference),
        invoiceParentAccount: 'boolean',
        portalAccess: 'boolean',
        origin: 'string',
        group: Reference,
        manager: Reference,
        salesRep: Reference,
        userTeam: Reference,
        accountingCode: AccountingCode,
        pricingLevel: Reference,
        referralTracking: 'string',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: User,
        lastUpdatedBy: User,
        version: 'int',
        href: 'string',
        addresses: dtoList(Address),
        contacts: dtoList(Contact),
        paymentMethods: dtoList(PaymentMethod),
        billingPreferences: BillingPreferences,
        customAttributes: dtoList(AccountCustomAttribute),
        customObjects: dtoList(CustomObject),
        inventories: dtoList('any'),
        partialInvoices: dtoList('any'),
        activityLogs: dtoList('any'),
        taxId: 'any',
        taxIdNumber: 'any',
        paymentMethod: PaymentMethod,
    } as const;

    object = this.declared<string | null>('object');
    /** The short code - `"W13ZGY"` - and what every path takes. Never null. */
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    displayName = this.declared<string | null>('displayName');
    /** Often null. */
    emailAddress = this.declared<string | null>('emailAddress');
    /** Often null. */
    description = this.declared<string | null>('description');
    currency = this.declared<Currency | null>('currency');
    timeZone = this.declared<TimeZone | null>('timeZone');
    /** Null on an account with no tax profile. */
    tax = this.declared<Reference | null>('tax');
    customForm = this.declared<CustomForm | null>('customForm');
    /** Usually null. */
    parentAccountId = this.declared<string | null>('parentAccountId');
    /** Untyped: always null. Use `getAccountImage` instead. */
    imageUrl = this.declared<unknown>('imageUrl');
    /** Usually null. */
    workflowStatus = this.declared<string | null>('workflowStatus');
    socialLinks = this.declared<SocialLinks | null>('socialLinks');
    communicationPreferences = this.declared<Array<CommunicationPreference | null> | null>('communicationPreferences');
    invoiceParentAccount = this.declared<boolean | null>('invoiceParentAccount');
    portalAccess = this.declared<boolean | null>('portalAccess');
    /** Often null. */
    origin = this.declared<string | null>('origin');
    group = this.declared<Reference | null>('group');
    manager = this.declared<Reference | null>('manager');
    /** Rarely set. */
    salesRep = this.declared<Reference | null>('salesRep');
    /** Rarely set. */
    userTeam = this.declared<Reference | null>('userTeam');
    accountingCode = this.declared<AccountingCode | null>('accountingCode');
    pricingLevel = this.declared<Reference | null>('pricingLevel');
    referralTracking = this.declared<string | null>('referralTracking');
    createdOn = this.declared<string | null>('createdOn');
    /** Set only once the account has been edited. */
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<User | null>('createdBy');
    lastUpdatedBy = this.declared<User | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
    addresses = this.declared<Array<Address | null> | null>('addresses');
    contacts = this.declared<Array<Contact | null> | null>('contacts');
    paymentMethods = this.declared<Array<PaymentMethod | null> | null>('paymentMethods');
    billingPreferences = this.declared<BillingPreferences | null>('billingPreferences');
    customAttributes = this.declared<Array<AccountCustomAttribute | null> | null>('customAttributes');
    customObjects = this.declared<Array<CustomObject | null> | null>('customObjects');
    inventories = this.declared<Array<unknown | null> | null>('inventories');
    /**
     * The key `getAccountQuotePartialInvoices` answers under - which does
     *  **not** match its path segment.
     */
    partialInvoices = this.declared<Array<unknown | null> | null>('partialInvoices');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    taxId = this.declared<unknown>('taxId');
    taxIdNumber = this.declared<unknown>('taxIdNumber');
    paymentMethod = this.declared<PaymentMethod | null>('paymentMethod');
}

/** A listing of accounts. The records sit under `data`, which *is* the envelope. */
export class AccountList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(Account),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<Account | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** A **URI, not image bytes**, and null when the account has no image. */
export class AccountImage extends Dto {
    static override ENVELOPE_KEY = 'account';

    static override FIELDS = {
        imageUri: 'string',
        accountId: 'string',
    } as const;

    imageUri = this.declared<string | null>('imageUri');
    accountId = this.declared<string | null>('accountId');
}

export class NoteView extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        content: 'string',
        account: Reference,
        attachments: dtoList(NoteAttachment),
        watchers: dtoList(Watcher),
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: User,
        lastUpdatedBy: User,
        version: 'int',
        group: 'any',
        user: 'any',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    content = this.declared<string | null>('content');
    account = this.declared<Reference | null>('account');
    attachments = this.declared<Array<NoteAttachment | null> | null>('attachments');
    watchers = this.declared<Array<Watcher | null> | null>('watchers');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<User | null>('createdBy');
    lastUpdatedBy = this.declared<User | null>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    group = this.declared<unknown>('group');
    user = this.declared<unknown>('user');
    href = this.declared<string | null>('href');
}

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
 * A note's attachments.
 *
 * Separate from {@link NoteList} because `data` holds {@link NoteAttachment},
 * not {@link Note}; one spec covering both would have to leave `data` untyped,
 * which is the whole value of the view.
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

export class AccountCancel extends Dto {
    static override ENVELOPE_KEY = 'account';

    static override FIELDS = {
        effectiveDate: 'string',
    } as const;

    /**
     * Required, and `YYYY-MM-DD`. Any other format is a 400 with code
     *  `invalid` - the endpoint does not parse a datetime.
     */
    effectiveDate = this.declared<string | null>('effectiveDate');
}

/**
 * **Flatter than the read.** `currency` and `time_zone` go in as plain strings
 * while {@link Account} reads them back as nested objects, so posting a read body
 * back unchanged is a 400.
 *
 * `addresses` and `communication_preference` are deliberately absent: the
 * endpoint answers 400 `not_understood` for both.
 */
export class AccountInformationUpdate extends Dto {
    static override ENVELOPE_KEY = 'account';

    static override FIELDS = {
        name: 'string',
        displayName: 'string',
        description: 'string',
        emailAddress: 'string',
        origin: 'string',
        userTeam: 'string',
        group: 'string',
        manager: 'string',
        referralTracking: 'string',
        parentAccount: 'string',
        currency: 'string',
        timeZone: 'string',
        grantPortalAccess: 'boolean',
        grantPortalPassword: 'string',
        tax: 'any',
    } as const;

    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<string | null>('description');
    emailAddress = this.declared<string | null>('emailAddress');
    origin = this.declared<string | null>('origin');
    userTeam = this.declared<string | null>('userTeam');
    group = this.declared<string | null>('group');
    manager = this.declared<string | null>('manager');
    referralTracking = this.declared<string | null>('referralTracking');
    parentAccount = this.declared<string | null>('parentAccount');
    /** The currency **code**, not the nested object the read returns. */
    currency = this.declared<string | null>('currency');
    /** The time zone **name**, not the nested object the read returns. */
    timeZone = this.declared<string | null>('timeZone');
    grantPortalAccess = this.declared<boolean | null>('grantPortalAccess');
    grantPortalPassword = this.declared<string | null>('grantPortalPassword');
    /** `{uuid, code}`. */
    tax = this.declared<unknown>('tax');
}

/** No envelope: these two sit at the **top level**, unlike {@link AccountCancel}. */
export class AccountSetPassword extends Dto {
    static override FIELDS = {
        password: 'string',
        confirmPassword: 'string',
    } as const;

    password = this.declared<string | null>('password');
    confirmPassword = this.declared<string | null>('confirmPassword');
}

/** Base64 in a JSON body, **not** a multipart upload. */
export class AccountImageUpload extends Dto {
    static override FIELDS = {
        image_base64: 'string',
    } as const;

    image_base64 = this.declared<string | null>('image_base64');
}

/** One address **as it is written**: `post_code` where the read has `postal_code`. */
export class AddressWrite extends Dto {
    static override FIELDS = {
        addressLine1: 'string',
        addressLine2: 'string',
        addressLine3: 'string',
        addressLine4: 'string',
        addressLine5: 'string',
        city: 'string',
        state: 'string',
        country: 'string',
        postCode: 'string',
        defaultBilling: 'boolean',
        defaultShipping: 'boolean',
    } as const;

    addressLine1 = this.declared<string | null>('addressLine1');
    addressLine2 = this.declared<string | null>('addressLine2');
    addressLine3 = this.declared<string | null>('addressLine3');
    addressLine4 = this.declared<string | null>('addressLine4');
    addressLine5 = this.declared<string | null>('addressLine5');
    city = this.declared<string | null>('city');
    /** The name, not an id. */
    state = this.declared<string | null>('state');
    /** The name, not an id. */
    country = this.declared<string | null>('country');
    /** The write spelling. Reads back as `postal_code`. */
    postCode = this.declared<string | null>('postCode');
    defaultBilling = this.declared<boolean | null>('defaultBilling');
    defaultShipping = this.declared<boolean | null>('defaultShipping');
}

/** A **list** under `addresses`, at the top level with no `account` envelope. */
export class AddressesCreate extends Dto {
    static override FIELDS = {
        addresses: dtoList(AddressWrite),
    } as const;

    addresses = this.declared<Array<AddressWrite | null> | null>('addresses');
}

/** One address under a **singular** key, not the plural the create takes. */
export class AddressUpdate extends Dto {
    static override ENVELOPE_KEY = 'address';

    static override FIELDS = {
        addressLine1: 'string',
        addressLine2: 'string',
        addressLine3: 'string',
        addressLine4: 'string',
        addressLine5: 'string',
        city: 'string',
        state: 'string',
        country: 'string',
        postCode: 'string',
        defaultBilling: 'boolean',
        defaultShipping: 'boolean',
    } as const;

    addressLine1 = this.declared<string | null>('addressLine1');
    addressLine2 = this.declared<string | null>('addressLine2');
    addressLine3 = this.declared<string | null>('addressLine3');
    addressLine4 = this.declared<string | null>('addressLine4');
    addressLine5 = this.declared<string | null>('addressLine5');
    city = this.declared<string | null>('city');
    state = this.declared<string | null>('state');
    country = this.declared<string | null>('country');
    postCode = this.declared<string | null>('postCode');
    defaultBilling = this.declared<boolean | null>('defaultBilling');
    defaultShipping = this.declared<boolean | null>('defaultShipping');
}

/** **Flat where the read is nested**: `first_name` against {@link ContactName}'s `first`. */
export class ContactWrite extends Dto {
    static override ENVELOPE_KEY = 'contact';

    static override FIELDS = {
        salutation: 'string',
        designation: 'string',
        firstName: 'string',
        middleName: 'string',
        lastName: 'string',
        email: ContactEmail,
        phone: ContactPhone,
        mobile: ContactPhone,
        fax: ContactPhone,
        addressLine1: 'string',
        addressLine2: 'string',
        city: 'string',
        state: 'string',
        country: 'string',
        postCode: 'string',
    } as const;

    salutation = this.declared<string | null>('salutation');
    designation = this.declared<string | null>('designation');
    firstName = this.declared<string | null>('firstName');
    middleName = this.declared<string | null>('middleName');
    lastName = this.declared<string | null>('lastName');
    email = this.declared<ContactEmail | null>('email');
    phone = this.declared<ContactPhone | null>('phone');
    mobile = this.declared<ContactPhone | null>('mobile');
    fax = this.declared<ContactPhone | null>('fax');
    addressLine1 = this.declared<string | null>('addressLine1');
    addressLine2 = this.declared<string | null>('addressLine2');
    city = this.declared<string | null>('city');
    state = this.declared<string | null>('state');
    country = this.declared<string | null>('country');
    postCode = this.declared<string | null>('postCode');
}

export class BillingPreferencesWrite extends Dto {
    static override ENVELOPE_KEY = 'billing_preferences';

    static override FIELDS = {
        invoiceMode: 'string',
        invoiceTerm: 'string',
        billingPeriod: 'string',
        billingStartDate: 'string',
        billingStartDayOfMonth: 'string',
        chargingAndBillingAlignment: 'boolean',
        paymentProcessor: 'string',
        paymentTerm: 'string',
    } as const;

    invoiceMode = this.declared<string | null>('invoiceMode');
    invoiceTerm = this.declared<string | null>('invoiceTerm');
    billingPeriod = this.declared<string | null>('billingPeriod');
    /**
     * An **enum**, not a date - `"DAY_OF_MONTH"` and the like. A calendar date
     *  is a 400 with code `matches_invalid`, which reads as a formatting
     *  complaint and is really a type one.
     */
    billingStartDate = this.declared<string | null>('billingStartDate');
    billingStartDayOfMonth = this.declared<string | null>('billingStartDayOfMonth');
    /**
     * Written as a **boolean**; reads back as a string under this same name.
     *  See {@link BillingPreferences}.
     */
    chargingAndBillingAlignment = this.declared<boolean | null>('chargingAndBillingAlignment');
    paymentProcessor = this.declared<string | null>('paymentProcessor');
    paymentTerm = this.declared<string | null>('paymentTerm');
}

export class PaymentMethodUpdate extends Dto {
    static override ENVELOPE_KEY = 'payment_method';

    static override FIELDS = {
        default: 'boolean',
        reference: 'string',
        status: 'string',
    } as const;

    default = this.declared<boolean | null>('default');
    reference = this.declared<string | null>('reference');
    status = this.declared<string | null>('status');
}

/** The account contact body. */
export class AccountContact extends Dto {
    static override ENVELOPE_KEY = 'account';

    static override FIELDS = {
        id: 'string',
        contacts: Contact,
    } as const;

    id = this.declared<string | null>('id');
    contacts = this.declared<Contact | null>('contacts');
}

/** The account address body. */
export class AccountAddress extends Dto {
    static override ENVELOPE_KEY = 'account';

    static override FIELDS = {
        id: 'string',
        addresses: Address,
    } as const;

    id = this.declared<string | null>('id');
    addresses = this.declared<Address | null>('addresses');
}

/** One entry of `data` on {@link AccountCustomObjectList}. */
export class AccountCustomObject extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        displayName: 'string',
        description: 'string',
        useIn: 'string',
        customComponent: 'any',
        relation: 'string',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<string | null>('description');
    useIn = this.declared<string | null>('useIn');
    customComponent = this.declared<unknown>('customComponent');
    relation = this.declared<string | null>('relation');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    href = this.declared<string | null>('href');
}

/** A page of AccountCustomObject records. */
export class AccountCustomObjectList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(AccountCustomObject),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<AccountCustomObject | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** What `getAccountKpis` answers, under `account_kpis`. */
export class AccountKpis extends Dto {
    static override ENVELOPE_KEY = 'account_kpis';

    static override FIELDS = {
        object: 'string',
        totalRevenue: 'string',
        monthlyRecurringRevenue: 'string',
        totalCollected: 'string',
        totalRefunded: 'string',
        totalOutstanding: 'string',
        totalOverdue: 'string',
        totalBalance: 'string',
        totalCreditBalance: 'string',
        totalOrders: 'int',
        activeOrders: 'int',
        lastReactivatedAt: 'any',
        lastCancelledAt: 'any',
        deletedAt: 'any',
        computedAt: 'string',
    } as const;

    object = this.declared<string | null>('object');
    totalRevenue = this.declared<string | null>('totalRevenue');
    monthlyRecurringRevenue = this.declared<string | null>('monthlyRecurringRevenue');
    totalCollected = this.declared<string | null>('totalCollected');
    totalRefunded = this.declared<string | null>('totalRefunded');
    totalOutstanding = this.declared<string | null>('totalOutstanding');
    totalOverdue = this.declared<string | null>('totalOverdue');
    totalBalance = this.declared<string | null>('totalBalance');
    totalCreditBalance = this.declared<string | null>('totalCreditBalance');
    totalOrders = this.declared<number | null>('totalOrders');
    activeOrders = this.declared<number | null>('activeOrders');
    lastReactivatedAt = this.declared<unknown>('lastReactivatedAt');
    lastCancelledAt = this.declared<unknown>('lastCancelledAt');
    deletedAt = this.declared<unknown>('deletedAt');
    computedAt = this.declared<string | null>('computedAt');
}

/** A {@link AccountFinancialSummary}'s `financial_summary`. */
export class AccountFinancialSummaryDetail extends Dto {
    static override FIELDS = {
        totalDue: 'string',
        totalGrand: 'string',
        totalPaid: 'string',
        invoiceCount: 'int',
        totalDueInvoiceCount: 'int',
        totalOverdueAmount: 'string',
        totalOverdueInvoiceCount: 'int',
        collectedThisMonth: 'string',
    } as const;

    totalDue = this.declared<string | null>('totalDue');
    totalGrand = this.declared<string | null>('totalGrand');
    totalPaid = this.declared<string | null>('totalPaid');
    invoiceCount = this.declared<number | null>('invoiceCount');
    totalDueInvoiceCount = this.declared<number | null>('totalDueInvoiceCount');
    totalOverdueAmount = this.declared<string | null>('totalOverdueAmount');
    totalOverdueInvoiceCount = this.declared<number | null>('totalOverdueInvoiceCount');
    collectedThisMonth = this.declared<string | null>('collectedThisMonth');
}

/** What `getAccountFinancialSummary` answers, under `account`: its `name` and the `financial_summary` itself. */
export class AccountFinancialSummary extends Dto {
    static override ENVELOPE_KEY = 'account';

    static override FIELDS = {
        name: 'string',
        financialSummary: AccountFinancialSummaryDetail,
    } as const;

    name = this.declared<string | null>('name');
    financialSummary = this.declared<AccountFinancialSummaryDetail | null>('financialSummary');
}

/**
 * What `getAccountComponentObject` answers, under `custom_component_object`: the fields of one entry of the listing
 * `getAccountComponentObjects` answers.
 */
export class AccountComponentObject extends Dto {
    static override ENVELOPE_KEY = 'custom_component_object';

    static override FIELDS = {
        accounts: dtoList('any'),
        attributeGroups: dtoList('any'),
        attributes: dtoList('any'),
        code: 'string',
        component: ComponentObjectsDataDetail,
        createdBy: 'any',
        createdOn: 'string',
        customForm: ComponentObjectsDataCustomForm,
        customObjects: dtoList('any'),
        href: 'string',
        id: 'string',
        items: dtoList('any'),
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        orders: dtoList('any'),
        parents: dtoList(ComponentObjectsDataParent),
        quotes: dtoList('any'),
        restrictions: dtoList('any'),
        status: 'string',
        version: 'int',
        workflowData: dtoList('any'),
        workflowStage: 'any',
        workflowStatus: 'any',
        workflowStatusUuid: 'any',
    } as const;

    accounts = this.declared<Array<unknown | null> | null>('accounts');
    attributeGroups = this.declared<Array<unknown | null> | null>('attributeGroups');
    attributes = this.declared<Array<unknown | null> | null>('attributes');
    code = this.declared<string | null>('code');
    component = this.declared<ComponentObjectsDataDetail | null>('component');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customForm = this.declared<ComponentObjectsDataCustomForm | null>('customForm');
    customObjects = this.declared<Array<unknown | null> | null>('customObjects');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    items = this.declared<Array<unknown | null> | null>('items');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    orders = this.declared<Array<unknown | null> | null>('orders');
    parents = this.declared<Array<ComponentObjectsDataParent | null> | null>('parents');
    quotes = this.declared<Array<unknown | null> | null>('quotes');
    restrictions = this.declared<Array<unknown | null> | null>('restrictions');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
    workflowData = this.declared<Array<unknown | null> | null>('workflowData');
    workflowStage = this.declared<unknown>('workflowStage');
    workflowStatus = this.declared<unknown>('workflowStatus');
    workflowStatusUuid = this.declared<unknown>('workflowStatusUuid');
}

sealDtoSchema(
    Reference,
    User,
    Currency,
    TimeZone,
    CustomForm,
    SocialLinks,
    Address,
    ContactName,
    ContactEmail,
    ContactPhone,
    Contact,
    PaymentProcessor,
    PaymentMethod,
    BillingPreferences,
    NoteAttachment,
    Note,
    Account,
    AccountList,
    AccountImage,
    NoteView,
    NoteList,
    NoteFileList,
    AccountCancel,
    AccountInformationUpdate,
    AccountSetPassword,
    AccountImageUpload,
    AddressWrite,
    AddressesCreate,
    AddressUpdate,
    ContactWrite,
    BillingPreferencesWrite,
    PaymentMethodUpdate,
    AccountContact,
    AccountAddress,
    AccountCustomObject,
    AccountCustomObjectList,
    ContactAddress,
    CustomAttribute,
    Watcher,
    AccountingCode,
    CommunicationPreference,
    AccountCustomAttribute,
    CustomObject,
    AccountKpis,
    AccountFinancialSummaryDetail,
    AccountFinancialSummary,
    AccountComponentObject,
);
