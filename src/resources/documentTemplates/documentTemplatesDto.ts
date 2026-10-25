/** Typed views over the v4 document templates bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings document template body, under `document_template`. */
export class SettingsDocumentTemplate extends Dto {
    static override ENVELOPE_KEY = 'document_template';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        isCustomTemplate: 'boolean',
        isDefault: 'boolean',
        isEdited: 'boolean',
        isSystemTemplate: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        type: 'string',
        version: 'int',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isCustomTemplate = this.declared<boolean | null>('isCustomTemplate');
    isDefault = this.declared<boolean | null>('isDefault');
    isEdited = this.declared<boolean | null>('isEdited');
    isSystemTemplate = this.declared<boolean | null>('isSystemTemplate');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    version = this.declared<number | null>('version');
}

/** One page of `SettingsDocumentTemplate` records, under `data`. */
export class SettingsDocumentTemplateList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsDocumentTemplate),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsDocumentTemplate | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsDocumentTemplate: [
        'GET /api/{api_version}/settings/document_templates',
        'GET /api/{api_version}/settings/document_templates/{document_template_id}',
        'POST /api/{api_version}/settings/document_templates',
        'PATCH /api/{api_version}/settings/document_templates/{document_template_id}',
    ],
    SettingsDocumentTemplateList: ['GET /api/{api_version}/settings/document_templates'],
};

sealDtoSchema(SettingsDocumentTemplate, SettingsDocumentTemplateList);
