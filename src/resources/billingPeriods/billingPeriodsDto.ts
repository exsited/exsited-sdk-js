/** Typed views over the v4 billing periods bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings billing period body, under `billing_period`. */
export class SettingsBillingPeriod extends Dto {
    static override ENVELOPE_KEY = 'billing_period';

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
        ordering: 'int',
        period: 'string',
        status: 'string',
        timePeriod: 'string',
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
    ordering = this.declared<number | null>('ordering');
    period = this.declared<string | null>('period');
    status = this.declared<string | null>('status');
    timePeriod = this.declared<string | null>('timePeriod');
}

/** One page of `SettingsBillingPeriod` records, under `data`. */
export class SettingsBillingPeriodList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsBillingPeriod),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsBillingPeriod | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsBillingPeriod: [
        'GET /api/{api_version}/settings/billing_periods',
        'GET /api/{api_version}/settings/billing_periods/{billing_period_id}',
        'POST /api/{api_version}/settings/billing_periods',
        'PATCH /api/{api_version}/settings/billing_periods/{billing_period_id}',
    ],
    SettingsBillingPeriodList: ['GET /api/{api_version}/settings/billing_periods'],
};

sealDtoSchema(SettingsBillingPeriod, SettingsBillingPeriodList);
