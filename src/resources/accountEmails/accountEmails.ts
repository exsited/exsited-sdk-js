/** The account emails endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './accountEmailsUrls.js';

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
 * `DELETE /api/{api_version}/accounts/{account_id}/communications/emails/{email_uuid}`
 *
 * No typed view, so `.dto` is null.
 */
export function deleteAccountCommunicationsEmail(
    client: ExsitedClient,
    accountId: string,
    emailUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(accountId, 'account_id');
    requireValue(emailUuid, 'email_uuid');
    return client.sendDeleteRequest<never>(urls.ACCOUNT_COMMUNICATIONS_EMAIL, {
        pathParams: {account_id: accountId, email_uuid: emailUuid},
        ...options,
    });
}
