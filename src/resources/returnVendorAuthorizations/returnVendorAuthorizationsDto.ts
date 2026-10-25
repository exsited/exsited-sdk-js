/** Typed views over the v4 return vendor authorizations bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** A {@link ReturnVendorAuthorization}'s `account`. */
export class ReturnVendorAuthorizationAccount extends Dto {
    static override FIELDS = {
        code: 'string',
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link ReturnVendorAuthorization}'s `created_by`. */
export class ReturnVendorAuthorizationCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link ReturnVendorAuthorization}'s `purchase_order`. */
export class ReturnVendorAuthorizationPurchaseOrder extends Dto {
    static override FIELDS = {
        code: 'string',
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    code = this.declared<string | null>('code');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** One return vendor authorization, as the listing returns it. */
export class ReturnVendorAuthorization extends Dto {
    static override FIELDS = {
        account: ReturnVendorAuthorizationAccount,
        code: 'string',
        createdBy: ReturnVendorAuthorizationCreatedBy,
        createdOn: 'string',
        href: 'string',
        id: 'string',
        itemCount: 'int',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        note: 'string',
        object: 'string',
        purchaseOrder: ReturnVendorAuthorizationPurchaseOrder,
        returnStatus: 'string',
        rvaDate: 'string',
        status: 'string',
        version: 'int',
    } as const;

    account = this.declared<ReturnVendorAuthorizationAccount | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<ReturnVendorAuthorizationCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    itemCount = this.declared<number | null>('itemCount');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    purchaseOrder = this.declared<ReturnVendorAuthorizationPurchaseOrder | null>('purchaseOrder');
    returnStatus = this.declared<string | null>('returnStatus');
    rvaDate = this.declared<string | null>('rvaDate');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** One page of `ReturnVendorAuthorization` records, under `data`; paged by cursor. */
export class ReturnVendorAuthorizationList extends Dto {
    static override FIELDS = {
        data: dtoList(ReturnVendorAuthorization),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ReturnVendorAuthorization | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/**
 * What `getReturnVendorAuthorization` answers, under `return_vendor_authorization`: the listing's record with its
 * `lines` and `receive_rvas`.
 */
export class ReturnVendorAuthorizationView extends Dto {
    static override ENVELOPE_KEY = 'return_vendor_authorization';

    static override FIELDS = {
        account: ReturnVendorAuthorizationAccount,
        code: 'string',
        createdBy: ReturnVendorAuthorizationCreatedBy,
        createdOn: 'string',
        href: 'string',
        id: 'string',
        itemCount: 'int',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'any',
        note: 'string',
        object: 'string',
        purchaseOrder: ReturnVendorAuthorizationPurchaseOrder,
        returnStatus: 'string',
        rvaDate: 'string',
        status: 'string',
        version: 'int',
        lines: dtoList('any'),
        receiveRvas: dtoList('any'),
    } as const;

    account = this.declared<ReturnVendorAuthorizationAccount | null>('account');
    code = this.declared<string | null>('code');
    createdBy = this.declared<ReturnVendorAuthorizationCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    itemCount = this.declared<number | null>('itemCount');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    note = this.declared<string | null>('note');
    object = this.declared<string | null>('object');
    purchaseOrder = this.declared<ReturnVendorAuthorizationPurchaseOrder | null>('purchaseOrder');
    returnStatus = this.declared<string | null>('returnStatus');
    rvaDate = this.declared<string | null>('rvaDate');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
    lines = this.declared<Array<unknown | null> | null>('lines');
    receiveRvas = this.declared<Array<unknown | null> | null>('receiveRvas');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    ReturnVendorAuthorization: ['GET /api/{api_version}/return_vendor_authorizations'],
    ReturnVendorAuthorizationList: ['GET /api/{api_version}/return_vendor_authorizations'],
    ReturnVendorAuthorizationView: ['GET /api/{api_version}/return_vendor_authorizations/{rva_id}'],
};

sealDtoSchema(
    ReturnVendorAuthorizationAccount,
    ReturnVendorAuthorizationCreatedBy,
    ReturnVendorAuthorizationPurchaseOrder,
    ReturnVendorAuthorization,
    ReturnVendorAuthorizationList,
    ReturnVendorAuthorizationView,
);
