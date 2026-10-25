/** Typed views over the v4 email templates bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings email template body, under `email_template`. */
export class SettingsEmailTemplate extends Dto {
    static override ENVELOPE_KEY = 'email_template';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        entity: 'any',
        href: 'string',
        id: 'string',
        isEdited: 'boolean',
        isSystemTemplate: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        replyAddress: 'any',
        richEditor: 'boolean',
        senderAddress: 'any',
        senderName: 'any',
        status: 'string',
        subject: 'string',
        trackEmailOpen: 'boolean',
        trackLinkClick: 'boolean',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    entity = this.declared<unknown>('entity');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isEdited = this.declared<boolean | null>('isEdited');
    isSystemTemplate = this.declared<boolean | null>('isSystemTemplate');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    replyAddress = this.declared<unknown>('replyAddress');
    richEditor = this.declared<boolean | null>('richEditor');
    senderAddress = this.declared<unknown>('senderAddress');
    senderName = this.declared<unknown>('senderName');
    status = this.declared<string | null>('status');
    subject = this.declared<string | null>('subject');
    trackEmailOpen = this.declared<boolean | null>('trackEmailOpen');
    trackLinkClick = this.declared<boolean | null>('trackLinkClick');
}

/** One page of `SettingsEmailTemplate` records, under `data`. */
export class SettingsEmailTemplateList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsEmailTemplate),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsEmailTemplate | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsEmailTemplate: [
        'GET /api/{api_version}/settings/email_templates',
        'GET /api/{api_version}/settings/email_templates/{email_template_id}',
        'POST /api/{api_version}/settings/email_templates',
        'PATCH /api/{api_version}/settings/email_templates/{email_template_id}',
    ],
    SettingsEmailTemplateList: ['GET /api/{api_version}/settings/email_templates'],
};

sealDtoSchema(SettingsEmailTemplate, SettingsEmailTemplateList);
