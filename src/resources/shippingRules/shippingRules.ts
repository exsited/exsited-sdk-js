/** The shipping rules endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './shippingRulesUrls.js';
import {SettingsShippingRule, SettingsShippingRuleList} from './shippingRulesDto.js';

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

/**
 * `GET /api/{api_version}/settings/shipping_rules`
 *
 * List shipping rules.
 */
export function getSettingsShippingRules(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingRuleList>> {
    return client.sendGetRequest<SettingsShippingRuleList>(urls.SETTINGS_SHIPPING_RULES, {
        queryParams,
        dtoType: SettingsShippingRuleList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/shipping_rules`
 *
 * Create a shipping rule.
 */
export function createSettingsShippingRule(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingRule>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsShippingRule>(urls.SETTINGS_SHIPPING_RULES, {
        jsonBody: payload,
        dtoType: SettingsShippingRule,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/shipping_rules/{shipping_rule_id}`
 *
 * Get one shipping rule.
 */
export function getSettingsShippingRule(
    client: ExsitedClient,
    shippingRuleId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingRule>> {
    requireValue(shippingRuleId, 'shipping_rule_id');
    return client.sendGetRequest<SettingsShippingRule>(urls.SETTINGS_SHIPPING_RULE, {
        pathParams: {shipping_rule_id: shippingRuleId},
        dtoType: SettingsShippingRule,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/shipping_rules/{shipping_rule_id}`
 *
 * Delete a shipping rule.
 */
export function deleteSettingsShippingRule(
    client: ExsitedClient,
    shippingRuleId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(shippingRuleId, 'shipping_rule_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_SHIPPING_RULE, {
        pathParams: {shipping_rule_id: shippingRuleId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/shipping_rules/{shipping_rule_id}`
 *
 * Update a shipping rule.
 */
export function updateSettingsShippingRule(
    client: ExsitedClient,
    shippingRuleId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingRule>> {
    requireValue(shippingRuleId, 'shipping_rule_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsShippingRule>(urls.SETTINGS_SHIPPING_RULE, {
        pathParams: {shipping_rule_id: shippingRuleId},
        jsonBody: payload,
        dtoType: SettingsShippingRule,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/shipping_rules/{shipping_rule_id}/configuration`
 *
 * Set a shipping rule's zones, rate and tiers - `POST /settings/shipping_rules/{shipping_rule_id}/configuration`; each
 * `zones[].zone` is the zone's dashed uuid, not its prefixed id, and the body sits under `configuration`.
 */
export function createSettingsShippingRuleConfiguration(
    client: ExsitedClient,
    shippingRuleId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingRule>> {
    requireValue(shippingRuleId, 'shipping_rule_id');
    requirePayload(payload);
    return client.sendPostRequest<SettingsShippingRule>(urls.SETTINGS_SHIPPING_RULE_CONFIGURATION, {
        pathParams: {shipping_rule_id: shippingRuleId},
        jsonBody: payload,
        dtoType: SettingsShippingRule,
        ...options,
    });
}
