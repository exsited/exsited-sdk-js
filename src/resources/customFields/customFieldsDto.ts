/** Typed views over the v4 custom fields bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings custom field body, under `custom_field`. */
export class SettingsCustomField extends Dto {
    static override ENVELOPE_KEY = 'custom_field';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        isMandatory: 'boolean',
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
    isMandatory = this.declared<boolean | null>('isMandatory');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    version = this.declared<number | null>('version');
}

/** One page of `SettingsCustomField` records, under `data`. */
export class SettingsCustomFieldList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsCustomField),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsCustomField | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsCustomField: [
        'GET /api/{api_version}/settings/custom_fields',
        'GET /api/{api_version}/settings/custom_fields/{custom_field_id}',
    ],
    SettingsCustomFieldList: ['GET /api/{api_version}/settings/custom_fields'],
};

sealDtoSchema(SettingsCustomField, SettingsCustomFieldList);
