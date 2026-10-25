/** Typed views over the v4 action scripts bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** An {@link ActionScript}'s `created_by`. */
export class ActionScriptCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** An {@link ActionScript}'s `last_updated_by`, set once the script has been updated. */
export class ActionScriptLastUpdatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** The action script body, under `action_script`; `activity_logs` comes on the create answer only. */
export class ActionScript extends Dto {
    static override ENVELOPE_KEY = 'action_script';

    static override FIELDS = {
        actionName: 'any',
        activityLogs: dtoList('any'),
        createdBy: ActionScriptCreatedBy,
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: ActionScriptLastUpdatedBy,
        lastUpdatedOn: 'any',
        name: 'string',
        object: 'string',
        objectName: 'any',
        status: 'string',
    } as const;

    actionName = this.declared<unknown>('actionName');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    createdBy = this.declared<ActionScriptCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<ActionScriptLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    objectName = this.declared<unknown>('objectName');
    status = this.declared<string | null>('status');
}

/** One page of `ActionScript` records, under `data`. */
export class ActionScriptList extends Dto {
    static override FIELDS = {
        data: dtoList(ActionScript),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ActionScript | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    ActionScript: [
        'GET /api/{api_version}/action_scripts',
        'GET /api/{api_version}/action_scripts/{action_script_id}',
        'POST /api/{api_version}/action_scripts',
        'PATCH /api/{api_version}/action_scripts/{action_script_id}',
    ],
    ActionScriptList: ['GET /api/{api_version}/action_scripts'],
};

sealDtoSchema(ActionScriptCreatedBy, ActionScriptLastUpdatedBy, ActionScript, ActionScriptList);
