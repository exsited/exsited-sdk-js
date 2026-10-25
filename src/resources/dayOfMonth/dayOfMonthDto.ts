/** Typed views over the v4 day of month bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings day of month body, under `day_of_month`. */
export class SettingsDayOfMonth extends Dto {
    static override ENVELOPE_KEY = 'day_of_month';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        day: 'int',
        description: 'any',
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
    day = this.declared<number | null>('day');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsDayOfMonth` records, under `data`. */
export class SettingsDayOfMonthList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsDayOfMonth),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsDayOfMonth | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsDayOfMonth: [
        'GET /api/{api_version}/settings/day_of_month',
        'GET /api/{api_version}/settings/day_of_month/{day_of_month_id}',
    ],
    SettingsDayOfMonthList: ['GET /api/{api_version}/settings/day_of_month'],
};

sealDtoSchema(SettingsDayOfMonth, SettingsDayOfMonthList);
