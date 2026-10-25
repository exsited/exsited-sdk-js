/** Typed views over the v4 invoice terms bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** A {@link SettingsInvoiceTerm}'s `duration`. */
export class SettingsInvoiceTermDuration extends Dto {
    static override FIELDS = {
        count: 'int',
        period: 'string',
    } as const;

    count = this.declared<number | null>('count');
    period = this.declared<string | null>('period');
}

/** The settings invoice term body, under `invoice_term`. */
export class SettingsInvoiceTerm extends Dto {
    static override ENVELOPE_KEY = 'invoice_term';

    static override FIELDS = {
        description: 'string',
        displayName: 'string',
        duration: SettingsInvoiceTermDuration,
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    duration = this.declared<SettingsInvoiceTermDuration | null>('duration');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsInvoiceTerm` records, under `data`. */
export class SettingsInvoiceTermList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsInvoiceTerm),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsInvoiceTerm | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The settings invoice term body a create or an update answers, under `invoice_term`. */
export class SettingsInvoiceTermWrite extends Dto {
    static override ENVELOPE_KEY = 'invoice_term';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        duration: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        ordering: 'int',
        period: 'string',
        status: 'string',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    duration = this.declared<number | null>('duration');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    ordering = this.declared<number | null>('ordering');
    period = this.declared<string | null>('period');
    status = this.declared<string | null>('status');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsInvoiceTerm: [
        'GET /api/{api_version}/settings/invoice_terms',
        'GET /api/{api_version}/settings/invoice_terms/{invoice_term_id}',
    ],
    SettingsInvoiceTermList: ['GET /api/{api_version}/settings/invoice_terms'],
    SettingsInvoiceTermWrite: [
        'POST /api/{api_version}/settings/invoice_terms',
        'PATCH /api/{api_version}/settings/invoice_terms/{invoice_term_id}',
    ],
};

sealDtoSchema(SettingsInvoiceTermDuration, SettingsInvoiceTerm, SettingsInvoiceTermList, SettingsInvoiceTermWrite);
