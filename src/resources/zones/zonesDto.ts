/** Typed views over the v4 zones bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings zone body, under `zone`. */
export class SettingsZone extends Dto {
    static override ENVELOPE_KEY = 'zone';

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
}

/** One page of `SettingsZone` records, under `data`. */
export class SettingsZoneList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsZone),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsZone | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsZone: [
        'GET /api/{api_version}/settings/zones',
        'GET /api/{api_version}/settings/zones/{zone_id}',
        'POST /api/{api_version}/settings/zones',
        'PATCH /api/{api_version}/settings/zones/{zone_id}',
    ],
    SettingsZoneList: ['GET /api/{api_version}/settings/zones'],
};

sealDtoSchema(SettingsZone, SettingsZoneList);
