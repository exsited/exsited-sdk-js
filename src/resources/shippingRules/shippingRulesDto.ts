/** Typed views over the v4 shipping rules bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** A {@link SettingsShippingRule}'s `configuration`. */
export class SettingsShippingRuleConfiguration extends Dto {
    static override FIELDS = {
        rate: 'any',
        zones: dtoList('any'),
    } as const;

    rate = this.declared<unknown>('rate');
    zones = this.declared<Array<unknown | null> | null>('zones');
}

/** The settings shipping rule body, under `shipping_rule`. */
export class SettingsShippingRule extends Dto {
    static override ENVELOPE_KEY = 'shipping_rule';

    static override FIELDS = {
        configuration: SettingsShippingRuleConfiguration,
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        shippingClass: 'any',
        status: 'string',
        version: 'int',
    } as const;

    configuration = this.declared<SettingsShippingRuleConfiguration | null>('configuration');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    shippingClass = this.declared<unknown>('shippingClass');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** One page of `SettingsShippingRule` records, under `data`. */
export class SettingsShippingRuleList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsShippingRule),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsShippingRule | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsShippingRule: [
        'GET /api/{api_version}/settings/shipping_rules',
        'GET /api/{api_version}/settings/shipping_rules/{shipping_rule_id}',
        'POST /api/{api_version}/settings/shipping_rules',
        'PATCH /api/{api_version}/settings/shipping_rules/{shipping_rule_id}',
    ],
    SettingsShippingRuleList: ['GET /api/{api_version}/settings/shipping_rules'],
};

sealDtoSchema(SettingsShippingRuleConfiguration, SettingsShippingRule, SettingsShippingRuleList);
