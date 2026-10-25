/** Typed views over the v4 custom forms bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings custom form body, under `custom_form`. */
export class SettingsCustomForm extends Dto {
    static override ENVELOPE_KEY = 'custom_form';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        forDefaultTemplate: 'boolean',
        href: 'string',
        id: 'string',
        isSystemTemplate: 'boolean',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    forDefaultTemplate = this.declared<boolean | null>('forDefaultTemplate');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    isSystemTemplate = this.declared<boolean | null>('isSystemTemplate');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsCustomForm` records, under `data`. */
export class SettingsCustomFormList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsCustomForm),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsCustomForm | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsCustomForm: [
        'GET /api/{api_version}/settings/custom_forms',
        'GET /api/{api_version}/settings/custom_forms/{custom_form_id}',
        'POST /api/{api_version}/settings/custom_forms',
        'PATCH /api/{api_version}/settings/custom_forms/{custom_form_id}',
    ],
    SettingsCustomFormList: ['GET /api/{api_version}/settings/custom_forms'],
};

sealDtoSchema(SettingsCustomForm, SettingsCustomFormList);
