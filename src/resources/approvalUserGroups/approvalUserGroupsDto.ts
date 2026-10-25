/** Typed views over the v4 approval user groups bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings approval user group body, under `approval_user_group`. */
export class SettingsApprovalUserGroup extends Dto {
    static override ENVELOPE_KEY = 'approval_user_group';

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

/** One page of `SettingsApprovalUserGroup` records, under `data`. */
export class SettingsApprovalUserGroupList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsApprovalUserGroup),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsApprovalUserGroup | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsApprovalUserGroup: [
        'GET /api/{api_version}/settings/approval_user_groups',
        'GET /api/{api_version}/settings/approval_user_groups/{approval_user_group_id}',
        'POST /api/{api_version}/settings/approval_user_groups',
        'PATCH /api/{api_version}/settings/approval_user_groups/{approval_user_group_id}',
    ],
    SettingsApprovalUserGroupList: ['GET /api/{api_version}/settings/approval_user_groups'],
};

sealDtoSchema(SettingsApprovalUserGroup, SettingsApprovalUserGroupList);
