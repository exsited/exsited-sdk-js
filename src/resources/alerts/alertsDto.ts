/** Typed views over the v4 alerts bodies. */

import {Dto, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The alerts body. */
export class Alerts extends Dto {
    static override FIELDS = {
        data: 'any',
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<unknown>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Alerts: [
        'GET /api/{api_version}/alerts',
        'GET /api/{api_version}/alerts/account/{account_id}',
        'GET /api/{api_version}/alerts/employee/{employee_id}',
        'GET /api/{api_version}/alerts/labour/{labour_id}',
    ],
};

sealDtoSchema(Alerts);
