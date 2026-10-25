/** Typed views over the v4 rental assets bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `rental_asset_profile` block of {@link RentalAssetAvailability}. */
export class RentalAssetAvailabilityRentalAssetProfile extends Dto {
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

/** The `created_by` block of {@link RentalAssetProfile}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link RentalAssetProfile}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `custom_form` block of {@link RentalAsset}. */
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

/** One entry of `rental_asset_custom_availability` on {@link RentalAsset}. */
export class RentalAssetCustomAvailability extends Dto {
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

/** The rental asset body. */
export class RentalAsset extends Dto {
    static override ENVELOPE_KEY = 'rental_asset';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        customAttributes: 'any',
        customForm: CustomForm,
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        imageName: 'any',
        item: 'any',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        rentalAssetAvailability: 'any',
        rentalAssetCustomAvailability: dtoList(RentalAssetCustomAvailability),
        rentalAssetProfile: RentalAssetAvailabilityRentalAssetProfile,
        status: 'string',
        useCustomAvailability: 'boolean',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    imageName = this.declared<unknown>('imageName');
    item = this.declared<unknown>('item');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    rentalAssetAvailability = this.declared<unknown>('rentalAssetAvailability');
    rentalAssetCustomAvailability = this.declared<Array<RentalAssetCustomAvailability | null> | null>(
        'rentalAssetCustomAvailability',
    );
    rentalAssetProfile = this.declared<RentalAssetAvailabilityRentalAssetProfile | null>('rentalAssetProfile');
    status = this.declared<string | null>('status');
    useCustomAvailability = this.declared<boolean | null>('useCustomAvailability');
    version = this.declared<number | null>('version');
}

/** A page of RentalAsset records. */
export class RentalAssetList extends Dto {
    static override FIELDS = {
        data: dtoList(RentalAsset),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<RentalAsset | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `currency` block of {@link RentalAssetProfile}. */
export class Currency extends Dto {
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

/** One entry of `rental_assets` on {@link RentalAssetProfile}. */
export class RentalAssetProfileRentalAsset extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        name: 'string',
        displayName: 'string',
        imageName: 'any',
        useCustomAvailability: 'boolean',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    imageName = this.declared<unknown>('imageName');
    useCustomAvailability = this.declared<boolean | null>('useCustomAvailability');
    href = this.declared<string | null>('href');
}

/** One entry of `rental_asset_profile_session_prices` on {@link RentalAssetProfileSession}. */
export class RentalAssetProfileSessionPrice extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        priceType: 'string',
        price: 'float',
        isEnabledProRata: 'boolean',
        pricingLevel: 'any',
        rentalAssetProfileSessionPriceHours: dtoList('any'),
        rentalAssetProfileSessionPricePeakHourly: dtoList('any'),
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    priceType = this.declared<string | null>('priceType');
    price = this.declared<number | null>('price');
    isEnabledProRata = this.declared<boolean | null>('isEnabledProRata');
    pricingLevel = this.declared<unknown>('pricingLevel');
    rentalAssetProfileSessionPriceHours = this.declared<Array<unknown | null> | null>(
        'rentalAssetProfileSessionPriceHours',
    );
    rentalAssetProfileSessionPricePeakHourly = this.declared<Array<unknown | null> | null>(
        'rentalAssetProfileSessionPricePeakHourly',
    );
}

/** One entry of `rental_asset_profile_session_availability` on {@link RentalAssetProfileSession}. */
export class RentalAssetProfileSessionAvailability extends Dto {
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

/** One entry of `rental_asset_profile_session_working_hours` on {@link RentalAssetProfileSession}. */
export class RentalAssetProfileSessionWorkingHour extends Dto {
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

/** One entry of `rental_asset_profile_sessions` on {@link RentalAssetProfile}. */
export class RentalAssetProfileSession extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        name: 'string',
        startDate: 'string',
        endDate: 'string',
        rentalAssetProfileSessionPrices: dtoList(RentalAssetProfileSessionPrice),
        rentalAssetProfileSessionAvailability: dtoList(RentalAssetProfileSessionAvailability),
        rentalAssetProfileSessionWorkingHours: dtoList(RentalAssetProfileSessionWorkingHour),
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    name = this.declared<string | null>('name');
    startDate = this.declared<string | null>('startDate');
    endDate = this.declared<string | null>('endDate');
    rentalAssetProfileSessionPrices = this.declared<Array<RentalAssetProfileSessionPrice | null> | null>(
        'rentalAssetProfileSessionPrices',
    );
    rentalAssetProfileSessionAvailability = this.declared<Array<RentalAssetProfileSessionAvailability | null> | null>(
        'rentalAssetProfileSessionAvailability',
    );
    rentalAssetProfileSessionWorkingHours = this.declared<Array<RentalAssetProfileSessionWorkingHour | null> | null>(
        'rentalAssetProfileSessionWorkingHours',
    );
}

/** The rental asset profile body. */
export class RentalAssetProfile extends Dto {
    static override ENVELOPE_KEY = 'rental_asset_profile';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        createdBy: CreatedBy,
        createdOn: 'string',
        currency: Currency,
        displayName: 'string',
        href: 'string',
        id: 'string',
        isTaxInclusive: 'boolean',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        maxBookingLimit: 'any',
        name: 'string',
        object: 'string',
        rentalAssetProfileSessions: dtoList(RentalAssetProfileSession),
        rentalAssets: dtoList(RentalAssetProfileRentalAsset),
        status: 'string',
        tax: 'any',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    currency = this.declared<Currency | null>('currency');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isTaxInclusive = this.declared<boolean | null>('isTaxInclusive');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    maxBookingLimit = this.declared<unknown>('maxBookingLimit');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    rentalAssetProfileSessions = this.declared<Array<RentalAssetProfileSession | null> | null>(
        'rentalAssetProfileSessions',
    );
    rentalAssets = this.declared<Array<RentalAssetProfileRentalAsset | null> | null>('rentalAssets');
    status = this.declared<string | null>('status');
    tax = this.declared<unknown>('tax');
    version = this.declared<number | null>('version');
}

/** A page of RentalAssetProfile records. */
export class RentalAssetProfileList extends Dto {
    static override FIELDS = {
        data: dtoList(RentalAssetProfile),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<RentalAssetProfile | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `schedule_list` on {@link RentalAssetAvailability}. */
export class ScheduleList extends Dto {
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

/** One entry of `session_list` on {@link RentalAssetAvailability}. */
export class SessionList extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
        startDate: 'string',
        endDate: 'string',
        scheduleList: dtoList(ScheduleList),
        processedScheduleList: 'any',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
    startDate = this.declared<string | null>('startDate');
    endDate = this.declared<string | null>('endDate');
    scheduleList = this.declared<Array<ScheduleList | null> | null>('scheduleList');
    processedScheduleList = this.declared<unknown>('processedScheduleList');
}

/** The rental asset availability body. */
export class RentalAssetAvailability extends Dto {
    static override FIELDS = {
        availableList: dtoList('any'),
        code: 'string',
        displayName: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        processedScheduleList: 'any',
        rentalAssetProfile: RentalAssetAvailabilityRentalAssetProfile,
        scheduleList: dtoList(ScheduleList),
        sessionList: dtoList(SessionList),
        status: 'string',
        unavailableList: dtoList('any'),
        useCustomAvailability: 'boolean',
        version: 'int',
    } as const;

    availableList = this.declared<Array<unknown | null> | null>('availableList');
    code = this.declared<string | null>('code');
    displayName = this.declared<string | null>('displayName');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    processedScheduleList = this.declared<unknown>('processedScheduleList');
    rentalAssetProfile = this.declared<RentalAssetAvailabilityRentalAssetProfile | null>('rentalAssetProfile');
    scheduleList = this.declared<Array<ScheduleList | null> | null>('scheduleList');
    sessionList = this.declared<Array<SessionList | null> | null>('sessionList');
    status = this.declared<string | null>('status');
    unavailableList = this.declared<Array<unknown | null> | null>('unavailableList');
    useCustomAvailability = this.declared<boolean | null>('useCustomAvailability');
    version = this.declared<number | null>('version');
}

/** A page of RentalAssetAvailability records. */
export class RentalAssetAvailabilityList extends Dto {
    static override FIELDS = {
        data: dtoList(RentalAssetAvailability),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<RentalAssetAvailability | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    RentalAsset: [
        'GET /api/{api_version}/rental_assets',
        'GET /api/{api_version}/rental_assets/{rental_asset_uuid}',
        'POST /api/{api_version}/rental_assets',
        'PATCH /api/{api_version}/rental_assets/{rental_asset_uuid}',
        'POST /api/{api_version}/rental_assets/{rental_asset_id}/cancel',
        'POST /api/{api_version}/rental_assets/{rental_asset_id}/reactivate',
    ],
    RentalAssetList: ['GET /api/{api_version}/rental_assets'],
    RentalAssetProfile: [
        'GET /api/{api_version}/rental_asset_profiles',
        'GET /api/{api_version}/rental_asset_profiles/{rental_asset_profile_id}',
        'POST /api/{api_version}/rental_asset_profiles',
    ],
    RentalAssetProfileList: ['GET /api/{api_version}/rental_asset_profiles'],
    RentalAssetAvailability: ['GET /api/{api_version}/rental_asset_availability'],
    RentalAssetAvailabilityList: ['GET /api/{api_version}/rental_asset_availability'],
};

sealDtoSchema(
    RentalAsset,
    RentalAssetList,
    RentalAssetProfile,
    RentalAssetProfileList,
    RentalAssetAvailability,
    RentalAssetAvailabilityList,
    ScheduleList,
    RentalAssetAvailabilityRentalAssetProfile,
    CreatedBy,
    LastUpdatedBy,
    CustomForm,
    RentalAssetCustomAvailability,
    Currency,
    RentalAssetProfileRentalAsset,
    RentalAssetProfileSessionPrice,
    RentalAssetProfileSessionAvailability,
    RentalAssetProfileSessionWorkingHour,
    RentalAssetProfileSession,
    SessionList,
);
