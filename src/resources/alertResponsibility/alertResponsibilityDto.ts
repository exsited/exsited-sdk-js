/** Typed views over the v4 alert responsibility bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The alert responsibility body, under `alert_responsibility`; `activity_logs` comes on the create answer only. */
export class AlertResponsibility extends Dto {
    static override ENVELOPE_KEY = 'alert_responsibility';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `AlertResponsibility` records, under `data`. */
export class AlertResponsibilityList extends Dto {
    static override FIELDS = {
        data: dtoList(AlertResponsibility),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<AlertResponsibility | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    AlertResponsibility: [
        'GET /api/{api_version}/alert_responsibility',
        'GET /api/{api_version}/alert_responsibility/{alert_responsibility_id}',
        'POST /api/{api_version}/alert_responsibility',
        'PATCH /api/{api_version}/alert_responsibility/{alert_responsibility_id}',
    ],
    AlertResponsibilityList: ['GET /api/{api_version}/alert_responsibility'],
};

sealDtoSchema(AlertResponsibility, AlertResponsibilityList);
