/** Typed views over the v4 fulfillment terms bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings fulfillment term body, under `fulfillment_term`. */
export class SettingsFulfillmentTerm extends Dto {
    static override ENVELOPE_KEY = 'fulfillment_term';

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

/** One page of `SettingsFulfillmentTerm` records, under `data`. */
export class SettingsFulfillmentTermList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsFulfillmentTerm),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsFulfillmentTerm | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsFulfillmentTerm: [
        'GET /api/{api_version}/settings/fulfillment_terms',
        'GET /api/{api_version}/settings/fulfillment_terms/{fulfillment_term_id}',
        'POST /api/{api_version}/settings/fulfillment_terms',
        'PATCH /api/{api_version}/settings/fulfillment_terms/{fulfillment_term_id}',
    ],
    SettingsFulfillmentTermList: ['GET /api/{api_version}/settings/fulfillment_terms'],
};

sealDtoSchema(SettingsFulfillmentTerm, SettingsFulfillmentTermList);
