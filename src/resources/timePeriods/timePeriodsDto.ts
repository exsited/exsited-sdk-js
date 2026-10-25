/** Typed views over the v4 time periods bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings time period body, under `time_period`. */
export class SettingsTimePeriod extends Dto {
    static override ENVELOPE_KEY = 'time_period';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        duration: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        period: 'string',
        status: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    duration = this.declared<number | null>('duration');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    period = this.declared<string | null>('period');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsTimePeriod` records, under `data`. */
export class SettingsTimePeriodList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsTimePeriod),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsTimePeriod | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsTimePeriod: [
        'GET /api/{api_version}/settings/time_periods',
        'GET /api/{api_version}/settings/time_periods/{time_period_id}',
        'POST /api/{api_version}/settings/time_periods',
        'PATCH /api/{api_version}/settings/time_periods/{time_period_id}',
    ],
    SettingsTimePeriodList: ['GET /api/{api_version}/settings/time_periods'],
};

sealDtoSchema(SettingsTimePeriod, SettingsTimePeriodList);
