/** Typed views over the v4 return merchandise authorisations bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `account` block of {@link InvoiceReturnMerchandiseAuthorisation}. */
export class Account extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        code: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
}

/** The `sale_invoice` block of {@link InvoiceReturnMerchandiseAuthorisation}. */
export class SaleInvoice extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        code: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
}

/** The `created_by` block of {@link ReturnMerchandiseAuthorisation}. */
export class ReturnMerchandiseAuthorisationCreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The return merchandise authorisation body. */
export class ReturnMerchandiseAuthorisation extends Dto {
    static override FIELDS = {
        account: Account,
        code: 'string',
        createdBy: ReturnMerchandiseAuthorisationCreatedBy,
        createdOn: 'string',
        href: 'string',
        id: 'string',
        itemCount: 'int',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        note: 'string',
        object: 'string',
        returnStatus: 'string',
        rmaDate: 'string',
        saleInvoice: SaleInvoice,
        saleOrder: 'any',
        status: 'string',
        version: 'int',
        warehouse: 'any',
    } as const;

    account = this.declared<Account | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<ReturnMerchandiseAuthorisationCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    itemCount = this.declared<number | null>('itemCount');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    returnStatus = this.declared<string | null>('returnStatus');
    rmaDate = this.declared<string | null>('rmaDate');
    saleInvoice = this.declared<SaleInvoice | null>('saleInvoice');
    saleOrder = this.declared<unknown>('saleOrder');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
    warehouse = this.declared<unknown>('warehouse');
}

/** A page of ReturnMerchandiseAuthorisation records. */
export class ReturnMerchandiseAuthorisationList extends Dto {
    static override FIELDS = {
        data: dtoList(ReturnMerchandiseAuthorisation),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ReturnMerchandiseAuthorisation | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The `created_by` block of {@link InvoiceReturnMerchandiseAuthorisationReceiveEntry}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The invoice return merchandise authorisation receive body. */
export class InvoiceReturnMerchandiseAuthorisationReceive extends Dto {
    static override ENVELOPE_KEY = 'receive_rma';

    static override FIELDS = {
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        object: 'string',
        quantityReceived: 'float',
        receiveReturns: 'any',
        status: 'string',
        uuid: 'string',
    } as const;

    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    quantityReceived = this.declared<number | null>('quantityReceived');
    receiveReturns = this.declared<unknown>('receiveReturns');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
}

/** One entry of `data` on {@link InvoiceReturnMerchandiseAuthorisationReceiveList}. */
export class InvoiceReturnMerchandiseAuthorisationReceiveEntry extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        code: 'string',
        status: 'string',
        quantityReceived: 'float',
        createdBy: CreatedBy,
        lastUpdatedBy: 'any',
        createdOn: 'string',
        lastUpdatedOn: 'any',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    code = this.declared<string | null>('code');
    status = this.declared<string | null>('status');
    quantityReceived = this.declared<number | null>('quantityReceived');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    href = this.declared<string | null>('href');
}

/** A page of InvoiceReturnMerchandiseAuthorisationReceive records. */
export class InvoiceReturnMerchandiseAuthorisationReceiveList extends Dto {
    static override FIELDS = {
        receiveReturnMerchandiseAuthorisations: dtoList(InvoiceReturnMerchandiseAuthorisationReceive),
        pagination: Pagination,
        object: 'string',
        url: 'string',
        data: dtoList(InvoiceReturnMerchandiseAuthorisationReceiveEntry),
    } as const;

    receiveReturnMerchandiseAuthorisations =
        this.declared<Array<InvoiceReturnMerchandiseAuthorisationReceive | null> | null>(
            'receiveReturnMerchandiseAuthorisations',
        );
    pagination = this.declared<Pagination | null>('pagination');
    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<InvoiceReturnMerchandiseAuthorisationReceiveEntry | null> | null>('data');
}

/** The return merchandise authorisation read body. */
export class ReturnMerchandiseAuthorisationRead extends Dto {
    static override ENVELOPE_KEY = 'return_merchandise_authorisation';

    static override FIELDS = {
        account: Account,
        code: 'string',
        createdBy: CreatedBy,
        createdOn: 'string',
        href: 'string',
        id: 'string',
        itemCount: 'int',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        lines: 'any',
        note: 'string',
        object: 'string',
        receiveRmas: dtoList(InvoiceReturnMerchandiseAuthorisationReceive),
        returnStatus: 'string',
        rmaDate: 'string',
        saleInvoice: SaleInvoice,
        saleOrder: 'any',
        status: 'string',
        version: 'int',
        warehouse: 'any',
    } as const;

    account = this.declared<Account | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    itemCount = this.declared<number | null>('itemCount');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    lines = this.declared<unknown>('lines');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    receiveRmas = this.declared<Array<InvoiceReturnMerchandiseAuthorisationReceive | null> | null>('receiveRmas');
    returnStatus = this.declared<string | null>('returnStatus');
    rmaDate = this.declared<string | null>('rmaDate');
    saleInvoice = this.declared<SaleInvoice | null>('saleInvoice');
    saleOrder = this.declared<unknown>('saleOrder');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
    warehouse = this.declared<unknown>('warehouse');
}

/** One entry of `data` on {@link InvoiceReturnMerchandiseAuthorisations}. */
export class InvoiceReturnMerchandiseAuthorisation extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        code: 'string',
        status: 'string',
        returnStatus: 'string',
        rmaDate: 'string',
        itemCount: 'int',
        note: 'string',
        account: Account,
        saleOrder: 'any',
        saleInvoice: SaleInvoice,
        warehouse: 'any',
        createdOn: 'string',
        lastUpdatedOn: 'any',
        createdBy: CreatedBy,
        lastUpdatedBy: 'any',
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    code = this.declared<string | null>('code');
    status = this.declared<string | null>('status');
    returnStatus = this.declared<string | null>('returnStatus');
    rmaDate = this.declared<string | null>('rmaDate');
    itemCount = this.declared<number | null>('itemCount');
    note = this.declared<string | null>('note');
    account = this.declared<Account | null>('account');
    saleOrder = this.declared<unknown>('saleOrder');
    saleInvoice = this.declared<SaleInvoice | null>('saleInvoice');
    warehouse = this.declared<unknown>('warehouse');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** The invoice return merchandise authorisations body. */
export class InvoiceReturnMerchandiseAuthorisations extends Dto {
    static override FIELDS = {
        data: dtoList(InvoiceReturnMerchandiseAuthorisation),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<InvoiceReturnMerchandiseAuthorisation | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The return merchandise authorisations body. */
export class ReturnMerchandiseAuthorisations extends Dto {
    static override ENVELOPE_KEY = 'return_merchandise_authorisation';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        code: 'string',
        href: 'string',
        id: 'string',
        object: 'string',
        returnMerchandiseAuthorisation: 'any',
        status: 'string',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    returnMerchandiseAuthorisation = this.declared<unknown>('returnMerchandiseAuthorisation');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    ReturnMerchandiseAuthorisation: ['GET /api/{api_version}/return_merchandise_authorisations'],
    ReturnMerchandiseAuthorisationList: ['GET /api/{api_version}/return_merchandise_authorisations'],
    InvoiceReturnMerchandiseAuthorisationReceive: [
        'GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive',
        'GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive/{receive_uuid}',
    ],
    InvoiceReturnMerchandiseAuthorisationReceiveList: [
        'GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive',
    ],
    ReturnMerchandiseAuthorisationRead: [
        'GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_id}',
        'GET /api/{api_version}/return_merchandise_authorisations/{rma_id}',
    ],
    InvoiceReturnMerchandiseAuthorisations: [
        'GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations',
    ],
    ReturnMerchandiseAuthorisations: ['POST /api/{api_version}/return_merchandise_authorisations'],
    InvoiceReturnMerchandiseAuthorisationReceiveEntry: [
        'GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive',
    ],
    InvoiceReturnMerchandiseAuthorisation: [
        'GET /api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations',
    ],
};

sealDtoSchema(
    ReturnMerchandiseAuthorisation,
    ReturnMerchandiseAuthorisationList,
    InvoiceReturnMerchandiseAuthorisationReceive,
    InvoiceReturnMerchandiseAuthorisationReceiveList,
    ReturnMerchandiseAuthorisationRead,
    InvoiceReturnMerchandiseAuthorisations,
    ReturnMerchandiseAuthorisations,
    CreatedBy,
    InvoiceReturnMerchandiseAuthorisationReceiveEntry,
    Account,
    SaleInvoice,
    ReturnMerchandiseAuthorisationCreatedBy,
    InvoiceReturnMerchandiseAuthorisation,
);
