/** Typed views over the v4 labours bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `labour_profile` block of {@link LabourAvailability}. */
export class LabourAvailabilityLabourProfile extends Dto {
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

/** The `created_by` block of {@link LabourProfile}. */
export class CreatedBy extends Dto {
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

/** The `last_updated_by` block of {@link LabourProfile}. */
export class LastUpdatedBy extends Dto {
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

/** The `custom_form` block of {@link Labour}. */
export class LabourCustomForm extends Dto {
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

/** The `phone` block of {@link LabourContact}. */
export class Phone extends Dto {
    static override FIELDS = {
        countryCode: 'string',
        areaCode: 'string',
        number: 'string',
        full: 'string',
        doNotCall: 'boolean',
    } as const;

    countryCode = this.declared<string | null>('countryCode');
    areaCode = this.declared<string | null>('areaCode');
    number = this.declared<string | null>('number');
    full = this.declared<string | null>('full');
    doNotCall = this.declared<boolean | null>('doNotCall');
}

/** The `fax` block of {@link LabourContact}. */
export class Fax extends Dto {
    static override FIELDS = {
        countryCode: 'string',
        areaCode: 'string',
        number: 'string',
        full: 'string',
        doNotCall: 'boolean',
    } as const;

    countryCode = this.declared<string | null>('countryCode');
    areaCode = this.declared<string | null>('areaCode');
    number = this.declared<string | null>('number');
    full = this.declared<string | null>('full');
    doNotCall = this.declared<boolean | null>('doNotCall');
}

/** The `mobile` block of {@link LabourContact}. */
export class Mobile extends Dto {
    static override FIELDS = {
        countryCode: 'string',
        areaCode: 'string',
        number: 'string',
        full: 'string',
        doNotCall: 'boolean',
    } as const;

    countryCode = this.declared<string | null>('countryCode');
    areaCode = this.declared<string | null>('areaCode');
    number = this.declared<string | null>('number');
    full = this.declared<string | null>('full');
    doNotCall = this.declared<boolean | null>('doNotCall');
}

/** One entry of `labour_contacts` on {@link Labour}. */
export class LabourContact extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        contactType: 'string',
        salutation: 'string',
        designation: 'string',
        firstName: 'string',
        middleName: 'any',
        lastName: 'string',
        emailAddress: 'string',
        receiveEmail: 'boolean',
        phone: Phone,
        fax: Fax,
        mobile: Mobile,
        addressLine1: 'string',
        addressLine2: 'string',
        addressLine3: 'string',
        addressLine4: 'string',
        addressLine5: 'string',
        country: 'string',
        state: 'string',
        city: 'string',
        postCode: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    contactType = this.declared<string | null>('contactType');
    salutation = this.declared<string | null>('salutation');
    designation = this.declared<string | null>('designation');
    firstName = this.declared<string | null>('firstName');
    middleName = this.declared<unknown>('middleName');
    lastName = this.declared<string | null>('lastName');
    emailAddress = this.declared<string | null>('emailAddress');
    receiveEmail = this.declared<boolean | null>('receiveEmail');
    phone = this.declared<Phone | null>('phone');
    fax = this.declared<Fax | null>('fax');
    mobile = this.declared<Mobile | null>('mobile');
    addressLine1 = this.declared<string | null>('addressLine1');
    addressLine2 = this.declared<string | null>('addressLine2');
    addressLine3 = this.declared<string | null>('addressLine3');
    addressLine4 = this.declared<string | null>('addressLine4');
    addressLine5 = this.declared<string | null>('addressLine5');
    country = this.declared<string | null>('country');
    state = this.declared<string | null>('state');
    city = this.declared<string | null>('city');
    postCode = this.declared<string | null>('postCode');
}

/** One entry of `labour_custom_availability` on {@link Labour}. */
export class LabourCustomAvailability extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        preferredDay: 'string',
        startTime: 'string',
        endTime: 'string',
        available: 'boolean',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    preferredDay = this.declared<string | null>('preferredDay');
    startTime = this.declared<string | null>('startTime');
    endTime = this.declared<string | null>('endTime');
    available = this.declared<boolean | null>('available');
}

/** The labour body. */
export class Labour extends Dto {
    static override ENVELOPE_KEY = 'labour';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        customForm: LabourCustomForm,
        description: 'string',
        displayName: 'string',
        emailAddress: 'string',
        href: 'string',
        id: 'string',
        imageName: 'any',
        labourAvailability: 'any',
        labourContacts: dtoList(LabourContact),
        labourCustomAvailability: dtoList(LabourCustomAvailability),
        labourProfile: LabourAvailabilityLabourProfile,
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        useCustomAvailability: 'boolean',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customForm = this.declared<LabourCustomForm | null>('customForm');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    emailAddress = this.declared<string | null>('emailAddress');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    imageName = this.declared<unknown>('imageName');
    labourAvailability = this.declared<unknown>('labourAvailability');
    labourContacts = this.declared<Array<LabourContact | null> | null>('labourContacts');
    labourCustomAvailability = this.declared<Array<LabourCustomAvailability | null> | null>('labourCustomAvailability');
    labourProfile = this.declared<LabourAvailabilityLabourProfile | null>('labourProfile');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    useCustomAvailability = this.declared<boolean | null>('useCustomAvailability');
    version = this.declared<number | null>('version');
}

/** A page of Labour records. */
export class LabourList extends Dto {
    static override FIELDS = {
        data: dtoList(Labour),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Labour | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `currency` block of {@link LabourProfile}. */
export class LabourProfileCurrency extends Dto {
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

/** The `tax` block of {@link LabourProfile}. */
export class Tax extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `labours` on {@link LabourProfile}. */
export class LabourProfileLabour extends Dto {
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

/** The `pricing_level` block of {@link Price}. */
export class PricingLevel extends Dto {
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

/** One entry of `hours` on {@link Price}. */
export class Hour extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        startTime: 'string',
        endTime: 'string',
        price: 'float',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    startTime = this.declared<string | null>('startTime');
    endTime = this.declared<string | null>('endTime');
    price = this.declared<number | null>('price');
}

/** One entry of `prices` on {@link Session}. */
export class Price extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        priceType: 'string',
        pricingLevel: PricingLevel,
        price: 'float',
        enabledProRata: 'boolean',
        hours: dtoList(Hour),
        peakHourly: dtoList('any'),
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    priceType = this.declared<string | null>('priceType');
    pricingLevel = this.declared<PricingLevel | null>('pricingLevel');
    price = this.declared<number | null>('price');
    enabledProRata = this.declared<boolean | null>('enabledProRata');
    hours = this.declared<Array<Hour | null> | null>('hours');
    peakHourly = this.declared<Array<unknown | null> | null>('peakHourly');
}

/** One entry of `availability` on {@link Session}. */
export class Availability extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        preferredDay: 'string',
        startTime: 'string',
        endTime: 'string',
        available: 'boolean',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    preferredDay = this.declared<string | null>('preferredDay');
    startTime = this.declared<string | null>('startTime');
    endTime = this.declared<string | null>('endTime');
    available = this.declared<boolean | null>('available');
}

/** One entry of `working_hours` on {@link Session}. */
export class WorkingHour extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        startTime: 'string',
        endTime: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    startTime = this.declared<string | null>('startTime');
    endTime = this.declared<string | null>('endTime');
}

/** One entry of `sessions` on {@link LabourProfile}. */
export class Session extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        name: 'string',
        startDate: 'string',
        endDate: 'string',
        allowOvertime: 'boolean',
        prices: dtoList(Price),
        availability: dtoList(Availability),
        workingHours: dtoList(WorkingHour),
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    name = this.declared<string | null>('name');
    startDate = this.declared<string | null>('startDate');
    endDate = this.declared<string | null>('endDate');
    allowOvertime = this.declared<boolean | null>('allowOvertime');
    prices = this.declared<Array<Price | null> | null>('prices');
    availability = this.declared<Array<Availability | null> | null>('availability');
    workingHours = this.declared<Array<WorkingHour | null> | null>('workingHours');
    href = this.declared<string | null>('href');
}

/** The labour profile body. */
export class LabourProfile extends Dto {
    static override ENVELOPE_KEY = 'labour_profile';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: LabourProfileCurrency,
        displayName: 'string',
        href: 'string',
        id: 'string',
        labours: dtoList(LabourProfileLabour),
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        maxBookingLimit: 'int',
        name: 'string',
        object: 'string',
        sessions: dtoList(Session),
        status: 'string',
        tax: Tax,
        taxInclusive: 'boolean',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<LabourProfileCurrency | null>('currency');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    labours = this.declared<Array<LabourProfileLabour | null> | null>('labours');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    maxBookingLimit = this.declared<number | null>('maxBookingLimit');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    sessions = this.declared<Array<Session | null> | null>('sessions');
    status = this.declared<string | null>('status');
    tax = this.declared<Tax | null>('tax');
    taxInclusive = this.declared<boolean | null>('taxInclusive');
    version = this.declared<number | null>('version');
}

/** A page of LabourProfile records. */
export class LabourProfileList extends Dto {
    static override FIELDS = {
        data: dtoList(LabourProfile),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<LabourProfile | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `schedule_list` on {@link LabourAvailability}. */
export class ScheduleList extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        preferredDay: 'string',
        startTime: 'string',
        endTime: 'string',
        available: 'boolean',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    preferredDay = this.declared<string | null>('preferredDay');
    startTime = this.declared<string | null>('startTime');
    endTime = this.declared<string | null>('endTime');
    available = this.declared<boolean | null>('available');
}

/** One entry of `schedule_list` on {@link SessionList}. */
export class SessionListScheduleList extends Dto {
    static override FIELDS = {
        uuid: 'string',
        preferredDay: 'string',
        startTime: 'string',
        endTime: 'string',
        available: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    preferredDay = this.declared<string | null>('preferredDay');
    startTime = this.declared<string | null>('startTime');
    endTime = this.declared<string | null>('endTime');
    available = this.declared<string | null>('available');
}

/** One entry of `session_list` on {@link LabourAvailability}. */
export class SessionList extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
        startDate: 'string',
        endDate: 'string',
        scheduleList: dtoList(SessionListScheduleList),
        processedScheduleList: 'any',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
    startDate = this.declared<string | null>('startDate');
    endDate = this.declared<string | null>('endDate');
    scheduleList = this.declared<Array<SessionListScheduleList | null> | null>('scheduleList');
    processedScheduleList = this.declared<unknown>('processedScheduleList');
}

/** The labour availability body. */
export class LabourAvailability extends Dto {
    static override FIELDS = {
        availableList: 'any',
        code: 'string',
        displayName: 'string',
        emailAddress: 'string',
        id: 'string',
        labourProfile: LabourAvailabilityLabourProfile,
        name: 'string',
        object: 'string',
        processedScheduleList: 'any',
        scheduleList: dtoList(ScheduleList),
        sessionList: dtoList(SessionList),
        status: 'string',
        unavailableList: 'any',
        useCustomAvailability: 'boolean',
        version: 'int',
    } as const;

    availableList = this.declared<unknown>('availableList');
    code = this.declared<string | null>('code');
    displayName = this.declared<string | null>('displayName');
    emailAddress = this.declared<string | null>('emailAddress');
    id = this.declared<string | null>('id');
    labourProfile = this.declared<LabourAvailabilityLabourProfile | null>('labourProfile');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    processedScheduleList = this.declared<unknown>('processedScheduleList');
    scheduleList = this.declared<Array<ScheduleList | null> | null>('scheduleList');
    sessionList = this.declared<Array<SessionList | null> | null>('sessionList');
    status = this.declared<string | null>('status');
    unavailableList = this.declared<unknown>('unavailableList');
    useCustomAvailability = this.declared<boolean | null>('useCustomAvailability');
    version = this.declared<number | null>('version');
}

/** A page of LabourAvailability records. */
export class LabourAvailabilityList extends Dto {
    static override FIELDS = {
        data: dtoList(LabourAvailability),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<LabourAvailability | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `currency` block of {@link LabourOrder}. */
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

/** The `time_zone` block of {@link LabourOrder}. */
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

/** The `custom_form` block of {@link LabourOrder}. */
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

/** The `account` block of {@link LabourOrder}. */
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

/** One entry of `communication_preferences` on {@link LabourOrder}. */
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

/** The `billing_preferences` block of {@link LabourOrder}. */
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

/** One entry of `data` on {@link LabourOrderList}. */
export class LabourOrder extends Dto {
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
        originalTotal: 'any',
        billingStartDate: 'string',
        orderStartDate: 'string',
        nextBillingFromDate: 'string',
        billingAddress: 'any',
        shippingAddress: 'any',
        communicationPreferences: dtoList(CommunicationPreference),
        allowContract: 'boolean',
        billingPreferences: BillingPreference,
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        version: 'int',
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
    originalTotal = this.declared<unknown>('originalTotal');
    billingStartDate = this.declared<string | null>('billingStartDate');
    orderStartDate = this.declared<string | null>('orderStartDate');
    nextBillingFromDate = this.declared<string | null>('nextBillingFromDate');
    billingAddress = this.declared<unknown>('billingAddress');
    shippingAddress = this.declared<unknown>('shippingAddress');
    communicationPreferences = this.declared<Array<CommunicationPreference | null> | null>('communicationPreferences');
    allowContract = this.declared<boolean | null>('allowContract');
    billingPreferences = this.declared<BillingPreference | null>('billingPreferences');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
}

/** A page of LabourOrder records. */
export class LabourOrderList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(LabourOrder),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<LabourOrder | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** One entry of a {@link LabourProfileViewSession}'s `availability`. */
export class LabourProfileViewSessionAvailability extends Dto {
    static override FIELDS = {
        available: 'boolean',
        endTime: 'string',
        id: 'string',
        object: 'string',
        preferredDay: 'string',
        startTime: 'string',
        status: 'string',
    } as const;

    available = this.declared<boolean | null>('available');
    endTime = this.declared<string | null>('endTime');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    preferredDay = this.declared<string | null>('preferredDay');
    startTime = this.declared<string | null>('startTime');
    status = this.declared<string | null>('status');
}

/** One entry of a {@link LabourProfileViewSessionPrice}'s `hours`. */
export class LabourProfileViewSessionPriceHour extends Dto {
    static override FIELDS = {
        endTime: 'string',
        id: 'string',
        object: 'string',
        price: 'float',
        startTime: 'string',
        status: 'string',
    } as const;

    endTime = this.declared<string | null>('endTime');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    price = this.declared<number | null>('price');
    startTime = this.declared<string | null>('startTime');
    status = this.declared<string | null>('status');
}

/** A {@link LabourProfileViewSessionPrice}'s `pricing_level`. */
export class LabourProfileViewSessionPricePricingLevel extends Dto {
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

/** One entry of a {@link LabourProfileViewSession}'s `prices`. */
export class LabourProfileViewSessionPrice extends Dto {
    static override FIELDS = {
        enabledProRata: 'boolean',
        hours: dtoList(LabourProfileViewSessionPriceHour),
        id: 'string',
        object: 'string',
        peakHourly: dtoList('any'),
        price: 'float',
        priceType: 'string',
        pricingLevel: LabourProfileViewSessionPricePricingLevel,
        status: 'string',
    } as const;

    enabledProRata = this.declared<boolean | null>('enabledProRata');
    hours = this.declared<Array<LabourProfileViewSessionPriceHour | null> | null>('hours');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    peakHourly = this.declared<Array<unknown | null> | null>('peakHourly');
    price = this.declared<number | null>('price');
    priceType = this.declared<string | null>('priceType');
    pricingLevel = this.declared<LabourProfileViewSessionPricePricingLevel | null>('pricingLevel');
    status = this.declared<string | null>('status');
}

/** One entry of a {@link LabourProfileViewSession}'s `working_hours`. */
export class LabourProfileViewSessionWorkingHour extends Dto {
    static override FIELDS = {
        endTime: 'string',
        id: 'string',
        object: 'string',
        startTime: 'string',
        status: 'string',
    } as const;

    endTime = this.declared<string | null>('endTime');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    startTime = this.declared<string | null>('startTime');
    status = this.declared<string | null>('status');
}

/** One entry of a {@link LabourProfileView}'s `sessions`. */
export class LabourProfileViewSession extends Dto {
    static override FIELDS = {
        allowOvertime: 'boolean',
        availability: dtoList(LabourProfileViewSessionAvailability),
        endDate: 'string',
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        prices: dtoList(LabourProfileViewSessionPrice),
        startDate: 'string',
        status: 'string',
        workingHours: dtoList(LabourProfileViewSessionWorkingHour),
    } as const;

    allowOvertime = this.declared<boolean | null>('allowOvertime');
    availability = this.declared<Array<LabourProfileViewSessionAvailability | null> | null>('availability');
    endDate = this.declared<string | null>('endDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    prices = this.declared<Array<LabourProfileViewSessionPrice | null> | null>('prices');
    startDate = this.declared<string | null>('startDate');
    status = this.declared<string | null>('status');
    workingHours = this.declared<Array<LabourProfileViewSessionWorkingHour | null> | null>('workingHours');
}

/** One page of a labour profile's sessions, under `data`, each a {@link LabourProfileViewSession}. */
export class LabourProfileSessionList extends Dto {
    static override FIELDS = {
        data: dtoList(LabourProfileViewSession),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<LabourProfileViewSession | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** What `getLabourProfileSession` answers, under `labour_profile_session`. */
export class LabourProfileSessionView extends Dto {
    static override ENVELOPE_KEY = 'labour_profile_session';

    static override FIELDS = {
        allowOvertime: 'boolean',
        availability: dtoList(LabourProfileViewSessionAvailability),
        endDate: 'string',
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        prices: dtoList(LabourProfileViewSessionPrice),
        startDate: 'string',
        status: 'string',
        workingHours: dtoList(LabourProfileViewSessionWorkingHour),
    } as const;

    allowOvertime = this.declared<boolean | null>('allowOvertime');
    availability = this.declared<Array<LabourProfileViewSessionAvailability | null> | null>('availability');
    endDate = this.declared<string | null>('endDate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    prices = this.declared<Array<LabourProfileViewSessionPrice | null> | null>('prices');
    startDate = this.declared<string | null>('startDate');
    status = this.declared<string | null>('status');
    workingHours = this.declared<Array<LabourProfileViewSessionWorkingHour | null> | null>('workingHours');
}

/** One entry of a {@link LabourAvailability}'s `schedule_list`. */
export class LabourAvailabilityScheduleList extends Dto {
    static override FIELDS = {
        available: 'boolean',
        endTime: 'string',
        id: 'string',
        object: 'string',
        preferredDay: 'string',
        startTime: 'string',
    } as const;

    available = this.declared<boolean | null>('available');
    endTime = this.declared<string | null>('endTime');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    preferredDay = this.declared<string | null>('preferredDay');
    startTime = this.declared<string | null>('startTime');
}

/** One entry of a {@link LabourAvailabilitySessionList}'s `schedule_list`. */
export class LabourAvailabilitySessionListScheduleList extends Dto {
    static override FIELDS = {
        available: 'string',
        endTime: 'string',
        preferredDay: 'string',
        startTime: 'string',
        uuid: 'string',
    } as const;

    available = this.declared<string | null>('available');
    endTime = this.declared<string | null>('endTime');
    preferredDay = this.declared<string | null>('preferredDay');
    startTime = this.declared<string | null>('startTime');
    uuid = this.declared<string | null>('uuid');
}

/** One entry of a {@link LabourAvailability}'s `session_list`. */
export class LabourAvailabilitySessionList extends Dto {
    static override FIELDS = {
        endDate: 'string',
        name: 'string',
        processedScheduleList: 'any',
        scheduleList: dtoList(LabourAvailabilitySessionListScheduleList),
        startDate: 'string',
        uuid: 'string',
    } as const;

    endDate = this.declared<string | null>('endDate');
    name = this.declared<string | null>('name');
    processedScheduleList = this.declared<unknown>('processedScheduleList');
    scheduleList = this.declared<Array<LabourAvailabilitySessionListScheduleList | null> | null>('scheduleList');
    startDate = this.declared<string | null>('startDate');
    uuid = this.declared<string | null>('uuid');
}

/** What `getLabourCalendar` answers, under `labour_calendar`: a {@link LabourAvailability} record for one labour. */
export class LabourCalendar extends Dto {
    static override ENVELOPE_KEY = 'labour_calendar';

    static override FIELDS = {
        availableList: dtoList('any'),
        code: 'string',
        displayName: 'string',
        emailAddress: 'string',
        id: 'string',
        labourProfile: LabourAvailabilityLabourProfile,
        name: 'string',
        object: 'string',
        processedScheduleList: 'any',
        scheduleList: dtoList(LabourAvailabilityScheduleList),
        sessionList: dtoList(LabourAvailabilitySessionList),
        status: 'string',
        unavailableList: dtoList('any'),
        useCustomAvailability: 'boolean',
        version: 'int',
    } as const;

    availableList = this.declared<Array<unknown | null> | null>('availableList');
    code = this.declared<string | null>('code');
    displayName = this.declared<string | null>('displayName');
    emailAddress = this.declared<string | null>('emailAddress');
    id = this.declared<string | null>('id');
    labourProfile = this.declared<LabourAvailabilityLabourProfile | null>('labourProfile');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    processedScheduleList = this.declared<unknown>('processedScheduleList');
    scheduleList = this.declared<Array<LabourAvailabilityScheduleList | null> | null>('scheduleList');
    sessionList = this.declared<Array<LabourAvailabilitySessionList | null> | null>('sessionList');
    status = this.declared<string | null>('status');
    unavailableList = this.declared<Array<unknown | null> | null>('unavailableList');
    useCustomAvailability = this.declared<boolean | null>('useCustomAvailability');
    version = this.declared<number | null>('version');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Labour: [
        'GET /api/{api_version}/labours',
        'GET /api/{api_version}/labours/available_for_booking',
        'GET /api/{api_version}/labours/{labour_uuid}',
        'POST /api/{api_version}/labours',
        'PATCH /api/{api_version}/labours/{labour_uuid}',
        'POST /api/{api_version}/labours/{labour_id}/cancel',
        'POST /api/{api_version}/labours/{labour_id}/reactivate',
    ],
    LabourList: ['GET /api/{api_version}/labours', 'GET /api/{api_version}/labours/available_for_booking'],
    LabourProfile: [
        'GET /api/{api_version}/labour_profiles',
        'GET /api/{api_version}/labour_profiles/{labour_profile_id}',
        'POST /api/{api_version}/labour_profiles',
    ],
    LabourProfileList: ['GET /api/{api_version}/labour_profiles'],
    LabourAvailability: ['GET /api/{api_version}/labour_availability'],
    LabourAvailabilityList: ['GET /api/{api_version}/labour_availability'],
    LabourOrderList: ['GET /api/{api_version}/labours/{labour_uuid}/orders'],
    LabourOrder: ['GET /api/{api_version}/labours/{labour_uuid}/orders'],
    LabourProfileSessionList: ['GET /api/{api_version}/labour_profiles/{labour_profile_id}/sessions'],
    LabourProfileSessionView: ['GET /api/{api_version}/labour_profiles/{labour_profile_id}/sessions/{session_id}'],
    LabourCalendar: ['GET /api/{api_version}/labours/{labour_id}/availability'],
};

sealDtoSchema(
    Labour,
    LabourList,
    LabourProfile,
    LabourProfileList,
    LabourAvailability,
    LabourAvailabilityList,
    Currency,
    TimeZone,
    CustomForm,
    Account,
    CommunicationPreference,
    ProformaProperty,
    BillingPreference,
    LabourOrder,
    LabourOrderList,
    LabourAvailabilityLabourProfile,
    CreatedBy,
    LastUpdatedBy,
    LabourCustomForm,
    Phone,
    Fax,
    Mobile,
    LabourContact,
    LabourCustomAvailability,
    LabourProfileCurrency,
    Tax,
    LabourProfileLabour,
    PricingLevel,
    Hour,
    Price,
    Availability,
    WorkingHour,
    Session,
    ScheduleList,
    SessionListScheduleList,
    SessionList,
    LabourProfileViewSessionAvailability,
    LabourProfileViewSessionPriceHour,
    LabourProfileViewSessionPricePricingLevel,
    LabourProfileViewSessionPrice,
    LabourProfileViewSessionWorkingHour,
    LabourProfileViewSession,
    LabourProfileSessionList,
    LabourProfileSessionView,
    LabourAvailabilityScheduleList,
    LabourAvailabilitySessionListScheduleList,
    LabourAvailabilitySessionList,
    LabourCalendar,
);
