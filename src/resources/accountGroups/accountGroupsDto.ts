/** Typed views over the v4 account groups bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** A {@link SettingsAccountGroup}'s `state_rule`. */
export class SettingsAccountGroupStateRule extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** The settings account group body, under `account_group`. */
export class SettingsAccountGroup extends Dto {
    static override ENVELOPE_KEY = 'account_group';

    static override FIELDS = {
        accountingCode: 'any',
        customAttributes: dtoList('any'),
        description: 'any',
        displayName: 'string',
        href: 'string',
        id: 'string',
        invoiceAccountMedia: dtoList('string'),
        managedBy: 'any',
        name: 'string',
        object: 'string',
        pricingLevel: 'any',
        stateRule: SettingsAccountGroupStateRule,
        status: 'string',
    } as const;

    accountingCode = this.declared<unknown>('accountingCode');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    invoiceAccountMedia = this.declared<Array<string | null> | null>('invoiceAccountMedia');
    managedBy = this.declared<unknown>('managedBy');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    pricingLevel = this.declared<unknown>('pricingLevel');
    stateRule = this.declared<SettingsAccountGroupStateRule | null>('stateRule');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsAccountGroup` records, under `data`. */
export class SettingsAccountGroupList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsAccountGroup),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsAccountGroup | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsAccountGroup: [
        'GET /api/{api_version}/settings/account_groups',
        'GET /api/{api_version}/settings/account_groups/{account_group_id}',
        'POST /api/{api_version}/settings/account_groups',
    ],
    SettingsAccountGroupList: ['GET /api/{api_version}/settings/account_groups'],
};

sealDtoSchema(SettingsAccountGroupStateRule, SettingsAccountGroup, SettingsAccountGroupList);
