/** Typed views over the v4 usages bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `charge_item` block of {@link Usage}. */
export class ChargeItem extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
}

/** One entry of `custom_attributes` on {@link Usage}. */
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

/** The `created_by` block of {@link Usage}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link Usage}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The usage body. */
export class Usage extends Dto {
    static override ENVELOPE_KEY = 'usage';

    static override FIELDS = {
        chargeItem: ChargeItem,
        chargingEndDate: 'string',
        chargingPeriod: 'string',
        chargingStartDate: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        customAttributes: dtoList(CustomAttribute),
        endTime: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        quantity: 'float',
        source: 'any',
        startTime: 'string',
        status: 'string',
        type: 'string',
        uom: 'any',
        version: 'int',
    } as const;

    chargeItem = this.declared<ChargeItem | null>('chargeItem');
    chargingEndDate = this.declared<string | null>('chargingEndDate');
    chargingPeriod = this.declared<string | null>('chargingPeriod');
    chargingStartDate = this.declared<string | null>('chargingStartDate');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<Array<CustomAttribute | null> | null>('customAttributes');
    endTime = this.declared<string | null>('endTime');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    quantity = this.declared<number | null>('quantity');
    source = this.declared<unknown>('source');
    startTime = this.declared<string | null>('startTime');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    uom = this.declared<unknown>('uom');
    version = this.declared<number | null>('version');
}

/** A page of Usage records. */
export class UsageList extends Dto {
    static override FIELDS = {
        data: dtoList(Usage),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Usage | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `success` on {@link UsageBatch}. */
export class Success extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    href = this.declared<string | null>('href');
}

/** One entry of `fields` on {@link FailedError}. */
export class Field extends Dto {
    static override FIELDS = {
        field: 'string',
        code: 'string',
        message: 'string',
        docUrl: 'string',
    } as const;

    field = this.declared<string | null>('field');
    code = this.declared<string | null>('code');
    message = this.declared<string | null>('message');
    docUrl = this.declared<string | null>('docUrl');
}

/** The `error` block of {@link Failed}. */
export class FailedError extends Dto {
    static override FIELDS = {
        code: 'string',
        message: 'string',
        fields: dtoList(Field),
    } as const;

    code = this.declared<string | null>('code');
    message = this.declared<string | null>('message');
    fields = this.declared<Array<Field | null> | null>('fields');
}

/** One entry of `failed` on {@link UsageBatch}. */
export class Failed extends Dto {
    static override FIELDS = {
        chargeItemId: 'string',
        chargingPeriod: 'string',
        error: FailedError,
    } as const;

    chargeItemId = this.declared<string | null>('chargeItemId');
    chargingPeriod = this.declared<string | null>('chargingPeriod');
    error = this.declared<FailedError | null>('error');
}

/** The `usages` block of {@link Usages}. */
export class UsageBatch extends Dto {
    static override FIELDS = {
        success: dtoList(Success),
        failed: dtoList(Failed),
        activityLogs: dtoList('any'),
    } as const;

    success = this.declared<Array<Success | null> | null>('success');
    failed = this.declared<Array<Failed | null> | null>('failed');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
}

/** The usages body. */
export class Usages extends Dto {
    static override ENVELOPE_KEY = 'usage';

    static override FIELDS = {
        activityLogs: 'any',
        chargeItemName: 'string',
        chargeItemUuid: 'string',
        chargeStatus: 'string',
        chargingPeriod: 'string',
        createdBy: 'string',
        createdOn: 'string',
        customAttributes: 'any',
        endTime: 'string',
        eventId: 'string',
        failed: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        object: 'string',
        quantity: 'string',
        source: 'string',
        startTime: 'string',
        success: 'any',
        type: 'string',
        uom: 'string',
        usages: UsageBatch,
        uuid: 'string',
        version: 'string',
    } as const;

    activityLogs = this.declared<unknown>('activityLogs');
    chargeItemName = this.declared<string | null>('chargeItemName');
    chargeItemUuid = this.declared<string | null>('chargeItemUuid');
    chargeStatus = this.declared<string | null>('chargeStatus');
    chargingPeriod = this.declared<string | null>('chargingPeriod');
    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    endTime = this.declared<string | null>('endTime');
    eventId = this.declared<string | null>('eventId');
    failed = this.declared<unknown>('failed');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    quantity = this.declared<string | null>('quantity');
    source = this.declared<string | null>('source');
    startTime = this.declared<string | null>('startTime');
    success = this.declared<unknown>('success');
    type = this.declared<string | null>('type');
    uom = this.declared<string | null>('uom');
    usages = this.declared<UsageBatch | null>('usages');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<string | null>('version');
}

/** The usage updated body. */
export class UsageUpdated extends Dto {
    static override ENVELOPE_KEY = 'usage';

    static override FIELDS = {
        href: 'string',
        id: 'string',
        note: 'string',
        object: 'string',
        status: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Usage: ['GET /api/{api_version}/usages', 'GET /api/{api_version}/usages/{usage_id}'],
    UsageList: ['GET /api/{api_version}/usages'],
    Usages: ['POST /api/{api_version}/usages'],
    UsageUpdated: ['PATCH /api/{api_version}/usages/{usage_id}', 'PUT /api/{api_version}/usages/{usage_id}'],
};

sealDtoSchema(
    Usage,
    UsageList,
    Usages,
    UsageUpdated,
    Success,
    Field,
    FailedError,
    Failed,
    UsageBatch,
    ChargeItem,
    CustomAttribute,
    CreatedBy,
    LastUpdatedBy,
);
