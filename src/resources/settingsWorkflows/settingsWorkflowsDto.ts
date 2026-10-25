/** Typed views over the v4 settings workflows bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings workflow body, under `workflow`. */
export class SettingsWorkflow extends Dto {
    static override ENVELOPE_KEY = 'workflow';

    static override FIELDS = {
        code: 'any',
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        displayName: 'string',
        enableStage: 'boolean',
        entity: 'string',
        event: 'string',
        href: 'string',
        id: 'string',
        isPreBuilt: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    code = this.declared<unknown>('code');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    enableStage = this.declared<boolean | null>('enableStage');
    entity = this.declared<string | null>('entity');
    event = this.declared<string | null>('event');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isPreBuilt = this.declared<boolean | null>('isPreBuilt');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsWorkflow` records, under `data`. */
export class SettingsWorkflowList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsWorkflow),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsWorkflow | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsWorkflow: [
        'GET /api/{api_version}/settings/workflows',
        'GET /api/{api_version}/settings/workflows/{workflow_id}',
    ],
    SettingsWorkflowList: ['GET /api/{api_version}/settings/workflows'],
};

sealDtoSchema(SettingsWorkflow, SettingsWorkflowList);
