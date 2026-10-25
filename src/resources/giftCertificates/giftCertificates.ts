/** The gift certificates endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './giftCertificatesUrls.js';
import {
    GiftCertificate,
    GiftCertificateAllocationRead,
    GiftCertificateAllocations,
    GiftCertificateList,
    GiftCertificateTransactionList,
    GiftCertificateTransactionRead,
} from './giftCertificatesDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/** The key a listing puts its records under. */
export const RECORD_KEY = 'data';

function requireValue(value: unknown, what: string): void {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        throw new SdkUsageError(`${what} is required: the request cannot be built without it`);
    }
}

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/** `GET /api/{api_version}/gift_certificates` */
export function getGiftCertificates(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificateList>> {
    return client.sendGetRequest<GiftCertificateList>(urls.GIFT_CERTIFICATES, {
        queryParams,
        dtoType: GiftCertificateList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/gift_certificates`
 */
export function createGiftCertificate(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificate>> {
    requirePayload(payload);
    return client.sendPostRequest<GiftCertificate>(urls.GIFT_CERTIFICATES, {
        jsonBody: payload,
        dtoType: GiftCertificate,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/gift_certificates/{gc_id}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteGiftCertificate(
    client: ExsitedClient,
    gcId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(gcId, 'gc_id');
    return client.sendDeleteRequest<never>(urls.GIFT_CERTIFICATE, {
        pathParams: {gc_id: gcId},
        ...options,
    });
}

/** `GET /api/{api_version}/gift_certificates/{gc_id}` */
export function getGiftCertificate(
    client: ExsitedClient,
    gcId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificate>> {
    requireValue(gcId, 'gc_id');
    return client.sendGetRequest<GiftCertificate>(urls.GIFT_CERTIFICATE, {
        pathParams: {gc_id: gcId},
        queryParams,
        dtoType: GiftCertificate,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/gift_certificates/{gc_id}`
 */
export function updateGiftCertificate(
    client: ExsitedClient,
    gcId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificate>> {
    requireValue(gcId, 'gc_id');
    requirePayload(payload);
    return client.sendPatchRequest<GiftCertificate>(urls.GIFT_CERTIFICATE, {
        pathParams: {gc_id: gcId},
        jsonBody: payload,
        dtoType: GiftCertificate,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/gift_certificates/{gc_id}/amend`
 *
 * Set a new balance, as `{"gift_certificate": {"new_balance":...}}`; a balance below the used amount is a `400`.
 */
export function amendGiftCertificate(
    client: ExsitedClient,
    gcId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificate>> {
    requireValue(gcId, 'gc_id');
    requirePayload(payload);
    return client.sendPostRequest<GiftCertificate>(urls.GIFT_CERTIFICATE_AMEND, {
        pathParams: {gc_id: gcId},
        jsonBody: payload,
        dtoType: GiftCertificate,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/gift_certificates/{gc_id}/allocations`
 *
 * Allocate to an account, as `{"gift_certificate": {"account": {"code":...}}}`; `200`, not `201`.
 */
export function allocateGiftCertificate(
    client: ExsitedClient,
    gcId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificate>> {
    requireValue(gcId, 'gc_id');
    requirePayload(payload);
    return client.sendPostRequest<GiftCertificate>(urls.GIFT_CERTIFICATE_ALLOCATIONS, {
        pathParams: {gc_id: gcId},
        jsonBody: payload,
        dtoType: GiftCertificate,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/gift_certificates/{gc_id}/deallocations`
 *
 * Take an allocation back from an account, with the same body `allocateGiftCertificate` takes.
 */
export function deallocateGiftCertificate(
    client: ExsitedClient,
    gcId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificate>> {
    requireValue(gcId, 'gc_id');
    requirePayload(payload);
    return client.sendPostRequest<GiftCertificate>(urls.GIFT_CERTIFICATE_DEALLOCATIONS, {
        pathParams: {gc_id: gcId},
        jsonBody: payload,
        dtoType: GiftCertificate,
        ...options,
    });
}

/** `GET /api/{api_version}/gift_certificates/{gc_id}/allocations` */
export function getGiftCertificateAllocations(
    client: ExsitedClient,
    gcId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificateAllocations>> {
    requireValue(gcId, 'gc_id');
    return client.sendGetRequest<GiftCertificateAllocations>(urls.GIFT_CERTIFICATE_ALLOCATIONS, {
        pathParams: {gc_id: gcId},
        queryParams,
        dtoType: GiftCertificateAllocations,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/gift_certificates/{gc_id}/allocations/{allocation_id}`
 *
 * Retrieve one allocation, under `gift_certificate_allocation`.
 */
export function getGiftCertificateAllocation(
    client: ExsitedClient,
    gcId: string,
    allocationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificateAllocationRead>> {
    requireValue(gcId, 'gc_id');
    requireValue(allocationId, 'allocation_id');
    return client.sendGetRequest<GiftCertificateAllocationRead>(urls.GIFT_CERTIFICATE_ALLOCATION, {
        pathParams: {gc_id: gcId, allocation_id: allocationId},
        dtoType: GiftCertificateAllocationRead,
        ...options,
    });
}

/** `GET /api/{api_version}/gift_certificates/{gc_id}/transactions` */
export function getGiftCertificateTransactions(
    client: ExsitedClient,
    gcId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificateTransactionList>> {
    requireValue(gcId, 'gc_id');
    return client.sendGetRequest<GiftCertificateTransactionList>(urls.GIFT_CERTIFICATE_TRANSACTIONS, {
        pathParams: {gc_id: gcId},
        queryParams,
        dtoType: GiftCertificateTransactionList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/gift_certificates/{gc_id}/transactions/{transaction_id}`
 *
 * Retrieve one transaction, under `gift_certificate_transaction`.
 */
export function getGiftCertificateTransaction(
    client: ExsitedClient,
    gcId: string,
    transactionId: string,
    options: CallOptions = {},
): Promise<ApiResponse<GiftCertificateTransactionRead>> {
    requireValue(gcId, 'gc_id');
    requireValue(transactionId, 'transaction_id');
    return client.sendGetRequest<GiftCertificateTransactionRead>(urls.GIFT_CERTIFICATE_TRANSACTION, {
        pathParams: {gc_id: gcId, transaction_id: transactionId},
        dtoType: GiftCertificateTransactionRead,
        ...options,
    });
}
