/** Typed views over the v4 approvals bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The approvals account body. */
export class ApprovalsAccount extends Dto {
    static override FIELDS = {
        createdOn: 'string',
        description: 'any',
        displayName: 'string',
        entity: 'string',
        event: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    entity = this.declared<string | null>('entity');
    event = this.declared<string | null>('event');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** A page of ApprovalsAccount records. */
export class ApprovalsAccountList extends Dto {
    static override FIELDS = {
        data: dtoList(ApprovalsAccount),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ApprovalsAccount | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The approvals saleorder body. */
export class ApprovalsSaleorder extends Dto {
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
    ApprovalsAccount: ['GET /api/{api_version}/approvals/account'],
    ApprovalsAccountList: ['GET /api/{api_version}/approvals/account'],
    ApprovalsSaleorder: ['GET /api/{api_version}/approvals/saleOrder'],
};

sealDtoSchema(ApprovalsAccount, ApprovalsAccountList, ApprovalsSaleorder);
