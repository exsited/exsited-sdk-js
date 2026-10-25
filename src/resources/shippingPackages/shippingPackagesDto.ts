/** Typed views over the v4 shipping packages bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings shipping package body, under `shipping_package`. */
export class SettingsShippingPackage extends Dto {
    static override ENVELOPE_KEY = 'shipping_package';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        cubic: 'any',
        cubicUom: 'any',
        description: 'string',
        displayName: 'string',
        height: 'float',
        heightUom: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        length: 'float',
        lengthUom: 'any',
        name: 'string',
        object: 'string',
        status: 'string',
        weight: 'float',
        weightUom: 'any',
        width: 'float',
        widthUom: 'any',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    cubic = this.declared<unknown>('cubic');
    cubicUom = this.declared<unknown>('cubicUom');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    height = this.declared<number | null>('height');
    heightUom = this.declared<unknown>('heightUom');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    length = this.declared<number | null>('length');
    lengthUom = this.declared<unknown>('lengthUom');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    weight = this.declared<number | null>('weight');
    weightUom = this.declared<unknown>('weightUom');
    width = this.declared<number | null>('width');
    widthUom = this.declared<unknown>('widthUom');
}

/** One page of `SettingsShippingPackage` records, under `data`. */
export class SettingsShippingPackageList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsShippingPackage),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsShippingPackage | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsShippingPackage: [
        'GET /api/{api_version}/settings/shipping_packages',
        'GET /api/{api_version}/settings/shipping_packages/{shipping_package_id}',
        'POST /api/{api_version}/settings/shipping_packages',
        'PATCH /api/{api_version}/settings/shipping_packages/{shipping_package_id}',
    ],
    SettingsShippingPackageList: ['GET /api/{api_version}/settings/shipping_packages'],
};

sealDtoSchema(SettingsShippingPackage, SettingsShippingPackageList);
