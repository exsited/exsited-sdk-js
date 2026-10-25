/** The portals endpoints. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './portalsUrls.js';
import {PortalChangePassword, PortalLogin, PortalResetLink} from './portalsDto.js';

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
 * `POST /api/{api_version}/portal/activate`
 *
 * No typed view, so `.dto` is null.
 */
export function activatePortal(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.PORTAL_ACTIVATE, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/portal/change_password`
 */
export function createPortalChangePassword(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PortalChangePassword>> {
    requirePayload(payload);
    return client.sendPostRequest<PortalChangePassword>(urls.PORTAL_CHANGE_PASSWORD, {
        jsonBody: payload,
        dtoType: PortalChangePassword,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/portal/login`
 *
 * Recorded status codes: 200.
 */
export function createPortalLogin(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PortalLogin>> {
    requirePayload(payload);
    return client.sendPostRequest<PortalLogin>(urls.PORTAL_LOGIN, {
        jsonBody: payload,
        dtoType: PortalLogin,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/portal/reset`
 *
 * No typed view, so `.dto` is null.
 */
export function createPortalReset(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.PORTAL_RESET, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/portal/reset_link`
 */
export function createPortalResetLink(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<PortalResetLink>> {
    requirePayload(payload);
    return client.sendPostRequest<PortalResetLink>(urls.PORTAL_RESET_LINK, {
        jsonBody: payload,
        dtoType: PortalResetLink,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/portal/validate`
 *
 * No typed view, so `.dto` is null.
 */
export function createPortalValidate(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.PORTAL_VALIDATE, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/portal/change`
 *
 * Set a portal password by email, `{"portal": {"email", "password"}}`; no current password is asked, and it answers
 * `202`.
 */
export function setPortalPassword(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.PORTAL_CHANGE, {
        jsonBody: payload,
        ...options,
    });
}
