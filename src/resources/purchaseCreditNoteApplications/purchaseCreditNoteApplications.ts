/** The purchase credit note applications endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './purchaseCreditNoteApplicationsUrls.js';
import {
    PurchaseCreditNoteApplicationList,
    PurchaseCreditNoteApplicationRead,
} from './purchaseCreditNoteApplicationsDto.js';

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

/**
 * `GET /api/{api_version}/purchase_credit_note_applications`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseCreditNoteApplications(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteApplicationList>> {
    return client.sendGetRequest<PurchaseCreditNoteApplicationList>(urls.PURCHASE_CREDIT_NOTE_APPLICATIONS, {
        queryParams,
        dtoType: PurchaseCreditNoteApplicationList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/purchase_credit_note_applications/{purchase_credit_note_application_id}`
 *
 * Recorded status codes: 200.
 */
export function getPurchaseCreditNoteApplication(
    client: ExsitedClient,
    purchaseCreditNoteApplicationId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<PurchaseCreditNoteApplicationRead>> {
    requireValue(purchaseCreditNoteApplicationId, 'purchase_credit_note_application_id');
    return client.sendGetRequest<PurchaseCreditNoteApplicationRead>(urls.PURCHASE_CREDIT_NOTE_APPLICATION, {
        pathParams: {purchase_credit_note_application_id: purchaseCreditNoteApplicationId},
        queryParams,
        dtoType: PurchaseCreditNoteApplicationRead,
        ...options,
    });
}
