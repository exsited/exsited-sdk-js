/** Typed views over the v4 custom attributes bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** One entry of `options` on {@link CustomAttribute}. */
export class CustomAttributeOption extends Dto {
    static override FIELDS = {
        displayOrder: 'int',
        name: 'string',
    } as const;

    displayOrder = this.declared<number | null>('displayOrder');
    name = this.declared<string | null>('name');
}

/** One entry of `use_in` on {@link CustomAttribute}. */
export class UseIn extends Dto {
    static override FIELDS = {
        resource: 'string',
        required: 'boolean',
        unique: 'boolean',
        enabled: 'boolean',
        associatedAccountGroups: dtoList('any'),
        associatedUserGroups: dtoList('any'),
        associatedItemGroups: dtoList('any'),
    } as const;

    resource = this.declared<string | null>('resource');
    required = this.declared<boolean | null>('required');
    unique = this.declared<boolean | null>('unique');
    enabled = this.declared<boolean | null>('enabled');
    associatedAccountGroups = this.declared<Array<unknown | null> | null>('associatedAccountGroups');
    associatedUserGroups = this.declared<Array<unknown | null> | null>('associatedUserGroups');
    associatedItemGroups = this.declared<Array<unknown | null> | null>('associatedItemGroups');
}

/** The custom attribute body. */
export class CustomAttribute extends Dto {
    static override ENVELOPE_KEY = 'custom_attribute';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        encryptData: 'boolean',
        href: 'string',
        id: 'string',
        includeSeconds: 'any',
        isMandatory: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        maxLength: 'int',
        maxSize: 'any',
        maxValue: 'any',
        metaData: 'any',
        minValue: 'any',
        name: 'string',
        object: 'string',
        options: dtoList(CustomAttributeOption),
        status: 'string',
        timeFormat: 'any',
        type: 'string',
        unit: 'any',
        uom: 'any',
        useIn: dtoList(UseIn),
        version: 'int',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    encryptData = this.declared<boolean | null>('encryptData');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    includeSeconds = this.declared<unknown>('includeSeconds');
    isMandatory = this.declared<boolean | null>('isMandatory');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    maxLength = this.declared<number | null>('maxLength');
    maxSize = this.declared<unknown>('maxSize');
    maxValue = this.declared<unknown>('maxValue');
    metaData = this.declared<unknown>('metaData');
    minValue = this.declared<unknown>('minValue');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    options = this.declared<Array<CustomAttributeOption | null> | null>('options');
    status = this.declared<string | null>('status');
    timeFormat = this.declared<unknown>('timeFormat');
    type = this.declared<string | null>('type');
    unit = this.declared<unknown>('unit');
    uom = this.declared<unknown>('uom');
    useIn = this.declared<Array<UseIn | null> | null>('useIn');
    version = this.declared<number | null>('version');
}

/** A page of CustomAttribute records. */
export class CustomAttributeList extends Dto {
    static override FIELDS = {
        data: dtoList(CustomAttribute),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<CustomAttribute | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `options` on {@link CustomAttributes}. */
export class CustomAttributesOption extends Dto {
    static override FIELDS = {
        displayOrder: 'int',
        name: 'string',
    } as const;

    displayOrder = this.declared<number | null>('displayOrder');
    name = this.declared<string | null>('name');
}

/** One entry of `activity_logs` on {@link CustomAttributes}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** The custom attributes body. */
export class CustomAttributes extends Dto {
    static override ENVELOPE_KEY = 'custom_attribute';

    static override FIELDS = {
        activityLogs: dtoList(ActivityLog),
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        encryptData: 'boolean',
        href: 'string',
        id: 'string',
        includeSeconds: 'any',
        isMandatory: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        maxLength: 'int',
        maxSize: 'any',
        maxValue: 'any',
        metaData: 'string',
        minValue: 'any',
        name: 'string',
        object: 'string',
        options: dtoList(CustomAttributesOption),
        status: 'string',
        timeFormat: 'any',
        type: 'string',
        unit: 'any',
        uom: 'any',
        useIn: dtoList(UseIn),
        uuid: 'string',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    encryptData = this.declared<boolean | null>('encryptData');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    includeSeconds = this.declared<unknown>('includeSeconds');
    isMandatory = this.declared<boolean | null>('isMandatory');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    maxLength = this.declared<number | null>('maxLength');
    maxSize = this.declared<unknown>('maxSize');
    maxValue = this.declared<unknown>('maxValue');
    metaData = this.declared<string | null>('metaData');
    minValue = this.declared<unknown>('minValue');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    options = this.declared<Array<CustomAttributesOption | null> | null>('options');
    status = this.declared<string | null>('status');
    timeFormat = this.declared<unknown>('timeFormat');
    type = this.declared<string | null>('type');
    unit = this.declared<unknown>('unit');
    uom = this.declared<unknown>('uom');
    useIn = this.declared<Array<UseIn | null> | null>('useIn');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    CustomAttribute: [
        'GET /api/{api_version}/custom_attributes',
        'GET /api/{api_version}/custom_attributes/{custom_attribute_id}',
        'PATCH /api/{api_version}/custom_attributes/{custom_attribute_id}',
    ],
    CustomAttributeList: ['GET /api/{api_version}/custom_attributes'],
    CustomAttributes: ['POST /api/{api_version}/custom_attributes'],
};

sealDtoSchema(
    CustomAttribute,
    CustomAttributeList,
    CustomAttributes,
    CustomAttributesOption,
    ActivityLog,
    CustomAttributeOption,
    UseIn,
);
