/** Typed views over the v4 accounting codes bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings accounting code body. */
export class SettingsAccountingCode extends Dto {
    static override ENVELOPE_KEY = 'accounting_code';

    static override FIELDS = {
        accountCodeType: 'string',
        createdBy: 'any',
        createdOn: 'string',
        defaultMatchKey: 'string',
        description: 'any',
        displayName: 'string',
        glAccountName: 'string',
        glAccountNumber: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        version: 'int',
    } as const;

    accountCodeType = this.declared<string | null>('accountCodeType');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    defaultMatchKey = this.declared<string | null>('defaultMatchKey');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    glAccountName = this.declared<string | null>('glAccountName');
    glAccountNumber = this.declared<string | null>('glAccountNumber');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of SettingsAccountingCode records. */
export class SettingsAccountingCodeList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsAccountingCode),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsAccountingCode | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsAccountingCode: [
        'GET /api/{api_version}/settings/accounting_codes',
        'GET /api/{api_version}/settings/accounting_codes/{accounting_code_id}',
        'POST /api/{api_version}/settings/accounting_codes',
        'PATCH /api/{api_version}/settings/accounting_codes/{accounting_code_id}',
    ],
    SettingsAccountingCodeList: ['GET /api/{api_version}/settings/accounting_codes'],
};

sealDtoSchema(SettingsAccountingCode, SettingsAccountingCodeList);
