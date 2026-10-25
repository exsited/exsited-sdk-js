/** The communications endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './communicationsUrls.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/**
 * `POST /api/{api_version}/communications/send_email`
 *
 * Email a document; the body names one of `invoice`, `purchase_invoice`, `account_statement` or `payment`, each an `id`
 * beside `to`, `cc`, `bcc`, `subject`, `body` and `template`. Sends real mail.
 */
export function sendEmail(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.COMMUNICATIONS_SEND_EMAIL, {
        jsonBody: payload,
        ...options,
    });
}
