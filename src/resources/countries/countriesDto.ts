/** Typed views over the v4 countries bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings country body, under `country`. */
export class SettingsCountry extends Dto {
    static override ENVELOPE_KEY = 'country';

    static override FIELDS = {
        code: 'string',
        createdBy: 'any',
        createdOn: 'string',
        defaultAreaCode: 'any',
        defaultCity: 'string',
        defaultPostCode: 'string',
        defaultState: 'string',
        description: 'string',
        displayName: 'string',
        flagExists: 'boolean',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    code = this.declared<string | null>('code');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    defaultAreaCode = this.declared<unknown>('defaultAreaCode');
    defaultCity = this.declared<string | null>('defaultCity');
    defaultPostCode = this.declared<string | null>('defaultPostCode');
    defaultState = this.declared<string | null>('defaultState');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    flagExists = this.declared<boolean | null>('flagExists');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsCountry` records, under `data`. */
export class SettingsCountryList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsCountry),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsCountry | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsCountry: [
        'GET /api/{api_version}/settings/countries',
        'GET /api/{api_version}/settings/countries/{country_id}',
        'PATCH /api/{api_version}/settings/countries/{country_id}',
    ],
    SettingsCountryList: ['GET /api/{api_version}/settings/countries'],
};

sealDtoSchema(SettingsCountry, SettingsCountryList);
