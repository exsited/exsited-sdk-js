/** Typed views over the v4 approval profiles bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings approval profile body, under `approval_profile`. */
export class SettingsApprovalProfile extends Dto {
    static override ENVELOPE_KEY = 'approval_profile';

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

/** One page of `SettingsApprovalProfile` records, under `data`. */
export class SettingsApprovalProfileList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsApprovalProfile),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsApprovalProfile | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsApprovalProfile: [
        'GET /api/{api_version}/settings/approval_profiles',
        'GET /api/{api_version}/settings/approval_profiles/{approval_profile_id}',
    ],
    SettingsApprovalProfileList: ['GET /api/{api_version}/settings/approval_profiles'],
};

sealDtoSchema(SettingsApprovalProfile, SettingsApprovalProfileList);
