/** Typed views over the v4 additional codes bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings additional code body, under `additional_code`. */
export class SettingsAdditionalCode extends Dto {
    static override ENVELOPE_KEY = 'additional_code';

    static override FIELDS = {
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsAdditionalCode` records, under `data`. */
export class SettingsAdditionalCodeList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsAdditionalCode),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsAdditionalCode | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsAdditionalCode: [
        'GET /api/{api_version}/settings/additional_codes',
        'GET /api/{api_version}/settings/additional_codes/{additional_code_id}',
        'POST /api/{api_version}/settings/additional_codes',
    ],
    SettingsAdditionalCodeList: ['GET /api/{api_version}/settings/additional_codes'],
};

sealDtoSchema(SettingsAdditionalCode, SettingsAdditionalCodeList);
