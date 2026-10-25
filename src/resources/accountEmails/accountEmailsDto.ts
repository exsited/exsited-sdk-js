/** Typed views over the v4 account emails bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** One entry of `attachments` on {@link AccountCommunicationsEmail}. */
export class Attachment extends Dto {
    static override FIELDS = {
        type: 'string',
        path: 'string',
        name: 'string',
        size: 'int',
        filePath: 'string',
    } as const;

    type = this.declared<string | null>('type');
    path = this.declared<string | null>('path');
    name = this.declared<string | null>('name');
    size = this.declared<number | null>('size');
    filePath = this.declared<string | null>('filePath');
}

/** The account communications email body. */
export class AccountCommunicationsEmail extends Dto {
    static override ENVELOPE_KEY = 'email';

    static override FIELDS = {
        additionalTemplate: 'any',
        attachments: dtoList(Attachment),
        bcc: 'any',
        body: 'any',
        cc: 'any',
        createdBy: 'any',
        createdOn: 'string',
        from: 'any',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        mailType: 'string',
        messageType: 'string',
        object: 'string',
        status: 'string',
        subject: 'any',
        to: 'string',
        uuid: 'string',
    } as const;

    additionalTemplate = this.declared<unknown>('additionalTemplate');
    attachments = this.declared<Array<Attachment | null> | null>('attachments');
    bcc = this.declared<unknown>('bcc');
    body = this.declared<unknown>('body');
    cc = this.declared<unknown>('cc');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    from = this.declared<unknown>('from');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    mailType = this.declared<string | null>('mailType');
    messageType = this.declared<string | null>('messageType');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    subject = this.declared<unknown>('subject');
    to = this.declared<string | null>('to');
    uuid = this.declared<string | null>('uuid');
}

/** A page of AccountCommunicationsEmail records. */
export class AccountCommunicationsEmailList extends Dto {
    static override FIELDS = {
        data: dtoList(AccountCommunicationsEmail),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<AccountCommunicationsEmail | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    AccountCommunicationsEmail: [
        'GET /api/{api_version}/accounts/{account_id}/communications/emails',
        'GET /api/{api_version}/accounts/{account_id}/communications/emails/{email_uuid}',
    ],
    AccountCommunicationsEmailList: ['GET /api/{api_version}/accounts/{account_id}/communications/emails'],
};

sealDtoSchema(AccountCommunicationsEmail, AccountCommunicationsEmailList, Attachment);
