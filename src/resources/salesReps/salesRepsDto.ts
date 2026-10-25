/** Typed views over the v4 sales reps bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings sales rep body, under `sales_rep`. */
export class SettingsSalesRep extends Dto {
    static override ENVELOPE_KEY = 'sales_rep';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        emailAddress: 'string',
        firstName: 'string',
        href: 'string',
        id: 'string',
        lastName: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        version: 'int',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    emailAddress = this.declared<string | null>('emailAddress');
    firstName = this.declared<string | null>('firstName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastName = this.declared<string | null>('lastName');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** One page of `SettingsSalesRep` records, under `data`. */
export class SettingsSalesRepList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsSalesRep),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsSalesRep | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsSalesRep: [
        'GET /api/{api_version}/settings/sales_reps',
        'GET /api/{api_version}/settings/sales_reps/{sales_rep_id}',
    ],
    SettingsSalesRepList: ['GET /api/{api_version}/settings/sales_reps'],
};

sealDtoSchema(SettingsSalesRep, SettingsSalesRepList);
