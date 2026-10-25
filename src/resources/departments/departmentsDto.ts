/** Typed views over the v4 departments bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** A {@link SettingsDepartment}'s `division`. */
export class SettingsDepartmentDivision extends Dto {
    static override FIELDS = {
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** The settings department body, under `department`. */
export class SettingsDepartment extends Dto {
    static override ENVELOPE_KEY = 'department';

    static override FIELDS = {
        code: 'string',
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        division: SettingsDepartmentDivision,
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        version: 'int',
    } as const;

    code = this.declared<string | null>('code');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    division = this.declared<SettingsDepartmentDivision | null>('division');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** One page of `SettingsDepartment` records, under `data`. */
export class SettingsDepartmentList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsDepartment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsDepartment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsDepartment: [
        'GET /api/{api_version}/settings/departments',
        'GET /api/{api_version}/settings/departments/{department_id}',
    ],
    SettingsDepartmentList: ['GET /api/{api_version}/settings/departments'],
};

sealDtoSchema(SettingsDepartmentDivision, SettingsDepartment, SettingsDepartmentList);
