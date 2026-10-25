/** Typed views over the v4 designations bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings designation body, under `designation`. */
export class SettingsDesignation extends Dto {
    static override ENVELOPE_KEY = 'designation';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
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

/** One page of `SettingsDesignation` records, under `data`. */
export class SettingsDesignationList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsDesignation),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsDesignation | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsDesignation: [
        'GET /api/{api_version}/settings/designations',
        'GET /api/{api_version}/settings/designations/{designation_id}',
    ],
    SettingsDesignationList: ['GET /api/{api_version}/settings/designations'],
};

sealDtoSchema(SettingsDesignation, SettingsDesignationList);
