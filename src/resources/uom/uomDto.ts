/** Typed views over the v4 uom bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings unit of measurement body, under `uom`. */
export class SettingsUom extends Dto {
    static override ENVELOPE_KEY = 'uom';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        customType: 'any',
        decimalPlaces: 'int',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        rounding: 'string',
        status: 'string',
        type: 'string',
        typeDisplayText: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customType = this.declared<unknown>('customType');
    decimalPlaces = this.declared<number | null>('decimalPlaces');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    rounding = this.declared<string | null>('rounding');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    typeDisplayText = this.declared<string | null>('typeDisplayText');
}

/** One page of `SettingsUom` records, under `data`. */
export class SettingsUomList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsUom),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsUom | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsUom: ['GET /api/{api_version}/settings/uom', 'GET /api/{api_version}/settings/uom/{uom_id}'],
    SettingsUomList: ['GET /api/{api_version}/settings/uom'],
};

sealDtoSchema(SettingsUom, SettingsUomList);
