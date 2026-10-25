/** The webhooks endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './webhooksUrls.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

function requireValue(value: unknown, what: string): void {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        throw new SdkUsageError(`${what} is required: the request cannot be built without it`);
    }
}

/**
 * `GET /api/{api_version}/webhooks/{webhook_id}`
 *
 * One webhook delivery, the `whk_` id a delivery carries; no route lists them, so `.dto` is null and the body is read
 * through `.map`.
 */
export function getWebhook(
    client: ExsitedClient,
    webhookId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(webhookId, 'webhook_id');
    return client.sendGetRequest<never>(urls.WEBHOOK, {
        pathParams: {webhook_id: webhookId},
        ...options,
    });
}
