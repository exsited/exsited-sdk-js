/** Typed views over the v4 roles bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings role body, under `role`. */
export class SettingsRole extends Dto {
    static override ENVELOPE_KEY = 'role';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        displayName: 'string',
        href: 'string',
        id: 'string',
        isSystemRole: 'boolean',
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
    isSystemRole = this.declared<boolean | null>('isSystemRole');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsRole` records, under `data`. */
export class SettingsRoleList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsRole),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsRole | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsRole: ['GET /api/{api_version}/settings/roles', 'GET /api/{api_version}/settings/roles/{role_id}'],
    SettingsRoleList: ['GET /api/{api_version}/settings/roles'],
};

sealDtoSchema(SettingsRole, SettingsRoleList);
