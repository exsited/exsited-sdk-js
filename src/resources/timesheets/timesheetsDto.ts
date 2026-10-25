/** Typed views over the v4 timesheets bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** One entry of `activity_logs` on {@link Timesheet}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** The `labour` block of {@link Timesheet}. */
export class Labour extends Dto {
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

/** The `sale_order_item` block of {@link Timesheet}. */
export class SaleOrderItem extends Dto {
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

/** The `sale_order` block of {@link Timesheet}. */
export class SaleOrder extends Dto {
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

/** The `created_by` block of {@link Timesheet}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link Timesheet}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The timesheet body. */
export class Timesheet extends Dto {
    static override ENVELOPE_KEY = 'timesheet';

    static override FIELDS = {
        activityLogs: dtoList(ActivityLog),
        createdBy: CreatedBy,
        createdOn: 'string',
        endTime: 'string',
        href: 'string',
        id: 'string',
        labour: Labour,
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        saleOrder: SaleOrder,
        saleOrderItem: SaleOrderItem,
        startTime: 'string',
        status: 'string',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    endTime = this.declared<string | null>('endTime');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    labour = this.declared<Labour | null>('labour');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    saleOrder = this.declared<SaleOrder | null>('saleOrder');
    saleOrderItem = this.declared<SaleOrderItem | null>('saleOrderItem');
    startTime = this.declared<string | null>('startTime');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of Timesheet records. */
export class TimesheetList extends Dto {
    static override FIELDS = {
        data: dtoList(Timesheet),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Timesheet | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of a {@link Timesheets}'s `activity_logs`. */
export class TimesheetsActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** A {@link Timesheets}'s `created_by`. */
export class TimesheetsCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link Timesheets}'s `labour`. */
export class TimesheetsLabour extends Dto {
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

/** A {@link Timesheets}'s `sale_order`. */
export class TimesheetsSaleOrder extends Dto {
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

/** A {@link Timesheets}'s `sale_order_item`. */
export class TimesheetsSaleOrderItem extends Dto {
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

/** What `createTimesheet` and `getTimesheet` answer, under `timesheet`. */
export class Timesheets extends Dto {
    static override ENVELOPE_KEY = 'timesheet';

    static override FIELDS = {
        activityLogs: dtoList(TimesheetsActivityLog),
        createdBy: TimesheetsCreatedBy,
        createdOn: 'string',
        endTime: 'string',
        href: 'string',
        id: 'string',
        labour: TimesheetsLabour,
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        saleOrder: TimesheetsSaleOrder,
        saleOrderItem: TimesheetsSaleOrderItem,
        startTime: 'string',
        status: 'string',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<TimesheetsActivityLog | null> | null>('activityLogs');
    createdBy = this.declared<TimesheetsCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    endTime = this.declared<string | null>('endTime');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    labour = this.declared<TimesheetsLabour | null>('labour');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    saleOrder = this.declared<TimesheetsSaleOrder | null>('saleOrder');
    saleOrderItem = this.declared<TimesheetsSaleOrderItem | null>('saleOrderItem');
    startTime = this.declared<string | null>('startTime');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Timesheet: [
        'GET /api/{api_version}/timesheets',
        'POST /api/{api_version}/timesheets',
        'PATCH /api/{api_version}/timesheets/{timesheet_id}',
    ],
    TimesheetList: ['GET /api/{api_version}/timesheets'],
    Timesheets: ['POST /api/{api_version}/timesheets', 'GET /api/{api_version}/timesheets/{timesheet_id}'],
};

sealDtoSchema(
    Timesheet,
    TimesheetList,
    ActivityLog,
    Labour,
    SaleOrderItem,
    SaleOrder,
    CreatedBy,
    LastUpdatedBy,
    TimesheetsActivityLog,
    TimesheetsCreatedBy,
    TimesheetsLabour,
    TimesheetsSaleOrder,
    TimesheetsSaleOrderItem,
    Timesheets,
);
