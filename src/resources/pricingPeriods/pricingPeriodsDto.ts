/** Typed views over the v4 pricing periods bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** A {@link SettingsPricingPeriod}'s `time_period`. */
export class SettingsPricingPeriodTimePeriod extends Dto {
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

/** The settings pricing period body, under `pricing_period`. */
export class SettingsPricingPeriod extends Dto {
    static override ENVELOPE_KEY = 'pricing_period';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        timePeriod: SettingsPricingPeriodTimePeriod,
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    timePeriod = this.declared<SettingsPricingPeriodTimePeriod | null>('timePeriod');
}

/** One page of `SettingsPricingPeriod` records, under `data`. */
export class SettingsPricingPeriodList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsPricingPeriod),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsPricingPeriod | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsPricingPeriod: [
        'GET /api/{api_version}/settings/pricing_periods',
        'GET /api/{api_version}/settings/pricing_periods/{pricing_period_id}',
        'POST /api/{api_version}/settings/pricing_periods',
        'PATCH /api/{api_version}/settings/pricing_periods/{pricing_period_id}',
    ],
    SettingsPricingPeriodList: ['GET /api/{api_version}/settings/pricing_periods'],
};

sealDtoSchema(SettingsPricingPeriodTimePeriod, SettingsPricingPeriod, SettingsPricingPeriodList);
