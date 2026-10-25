/** Typed views over the v4 teams bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings team body, under `team`. */
export class SettingsTeam extends Dto {
    static override ENVELOPE_KEY = 'team';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        managedBy: 'any',
        name: 'string',
        object: 'string',
        status: 'string',
        version: 'any',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    managedBy = this.declared<unknown>('managedBy');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    version = this.declared<unknown>('version');
}

/** One page of `SettingsTeam` records, under `data`. */
export class SettingsTeamList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsTeam),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsTeam | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsTeam: [
        'GET /api/{api_version}/settings/teams',
        'GET /api/{api_version}/settings/teams/{team_id}',
        'POST /api/{api_version}/settings/teams',
        'PATCH /api/{api_version}/settings/teams/{team_id}',
    ],
    SettingsTeamList: ['GET /api/{api_version}/settings/teams'],
};

sealDtoSchema(SettingsTeam, SettingsTeamList);
