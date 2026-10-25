/** Typed views over the v4 fulfillment profiles bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings fulfillment profile body, under `fulfillment_profile`. */
export class SettingsFulfillmentProfile extends Dto {
    static override ENVELOPE_KEY = 'fulfillment_profile';

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
        version: 'int',
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
    version = this.declared<number | null>('version');
}

/** One page of `SettingsFulfillmentProfile` records, under `data`. */
export class SettingsFulfillmentProfileList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsFulfillmentProfile),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsFulfillmentProfile | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsFulfillmentProfile: [
        'GET /api/{api_version}/settings/fulfillment_profiles',
        'GET /api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}',
        'POST /api/{api_version}/settings/fulfillment_profiles',
        'PATCH /api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}',
    ],
    SettingsFulfillmentProfileList: ['GET /api/{api_version}/settings/fulfillment_profiles'],
};

sealDtoSchema(SettingsFulfillmentProfile, SettingsFulfillmentProfileList);
