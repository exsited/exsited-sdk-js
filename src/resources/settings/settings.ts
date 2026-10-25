/** The settings endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './settingsUrls.js';
import {
    CustomObjectList,
    Settings,
    SettingsCurrencyList,
    SettingsCurrencyRead,
    SettingsCustomLogicScript,
    SettingsCustomLogicScriptSaved,
    SettingsCustomLogicScripts,
    SettingsCustomObjectCustomize,
    SettingsCustomObjectDefinitionList,
    SettingsCustomObjectDefinitionRead,
    SettingsCustomObjects,
    SettingsDiscountProfileList,
    SettingsDiscountProfileRead,
    SettingsFieldSettingList,
    SettingsFieldSettingRead,
    SettingsFieldSettingsAccountUpdated,
    SettingsGeneralSettings,
    SettingsGeneralSettingsAccountUpdated,
    SettingsGeneralSettingsItemUpdated,
    SettingsItemGroupList,
    SettingsItemGroups,
    SettingsPaymentProcessorList,
    SettingsPaymentProcessorRead,
    SettingsPaymentProcessorSaved,
    SettingsPaymentTermCreated,
    SettingsPaymentTermList,
    SettingsPaymentTermRead,
    SettingsPaymentTermUpdated,
    SettingsPricingLevelCreated,
    SettingsPricingLevelList,
    SettingsPricingLevelRead,
    SettingsShippingProfileList,
    SettingsShippingProfileRead,
    SettingsTaxList,
    SettingsTaxRead,
    SettingsTimeZoneList,
    SettingsTimeZoneRead,
    SettingsVariationList,
    SettingsVariations,
    SettingsWarehouseList,
    SettingsWarehouseRead,
} from './settingsDto.js';

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
 * `GET /api/{api_version}/custom_objects`
 *
 * Recorded status codes: 200.
 */
export function getCustomObjects(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CustomObjectList>> {
    return client.sendGetRequest<CustomObjectList>(urls.CUSTOM_OBJECTS, {
        queryParams,
        dtoType: CustomObjectList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings`
 *
 * Recorded status codes: 200.
 */
export function getSettings(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<Settings>> {
    return client.sendGetRequest<Settings>(urls.SETTINGS, {
        queryParams,
        dtoType: Settings,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/custom_objects/{custom_object_id}`
 *
 * Recorded status codes: 200.
 */
export function getCustomObject(
    client: ExsitedClient,
    customObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomObjects>> {
    requireValue(customObjectId, 'custom_object_id');
    return client.sendGetRequest<SettingsCustomObjects>(urls.CUSTOM_OBJECT, {
        pathParams: {custom_object_id: customObjectId},
        queryParams,
        dtoType: SettingsCustomObjects,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/currencies`
 *
 * Recorded status codes: 200.
 */
export function getSettingsCurrencies(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCurrencyList>> {
    return client.sendGetRequest<SettingsCurrencyList>(urls.SETTINGS_CURRENCIES, {
        queryParams,
        dtoType: SettingsCurrencyList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/custom_logic_scripts`
 *
 * Recorded status codes: 200.
 */
export function getSettingsCustomLogicScripts(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomLogicScripts>> {
    return client.sendGetRequest<SettingsCustomLogicScripts>(urls.SETTINGS_CUSTOM_LOGIC_SCRIPTS, {
        queryParams,
        dtoType: SettingsCustomLogicScripts,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/custom_objects`
 *
 * Recorded status codes: 201.
 */
export function createSettingsCustomObject(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomObjects>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsCustomObjects>(urls.SETTINGS_CUSTOM_OBJECTS, {
        jsonBody: payload,
        dtoType: SettingsCustomObjects,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/discount_profiles`
 *
 * Recorded status codes: 200.
 */
export function getSettingsDiscountProfiles(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDiscountProfileList>> {
    return client.sendGetRequest<SettingsDiscountProfileList>(urls.SETTINGS_DISCOUNT_PROFILES, {
        queryParams,
        dtoType: SettingsDiscountProfileList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/item_groups`
 *
 * Recorded status codes: 200.
 */
export function getSettingsItemGroups(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsItemGroupList>> {
    return client.sendGetRequest<SettingsItemGroupList>(urls.SETTINGS_ITEM_GROUPS, {
        queryParams,
        dtoType: SettingsItemGroupList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/item_groups`
 *
 * Recorded status codes: 201.
 */
export function createSettingsItemGroup(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsItemGroups>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsItemGroups>(urls.SETTINGS_ITEM_GROUPS, {
        jsonBody: payload,
        dtoType: SettingsItemGroups,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/payment_processors`
 *
 * Recorded status codes: 200.
 */
export function getSettingsPaymentProcessors(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPaymentProcessorList>> {
    return client.sendGetRequest<SettingsPaymentProcessorList>(urls.SETTINGS_PAYMENT_PROCESSORS, {
        queryParams,
        dtoType: SettingsPaymentProcessorList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/payment_terms`
 *
 * Recorded status codes: 200.
 */
export function getSettingsPaymentTerms(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPaymentTermList>> {
    return client.sendGetRequest<SettingsPaymentTermList>(urls.SETTINGS_PAYMENT_TERMS, {
        queryParams,
        dtoType: SettingsPaymentTermList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/pricing_levels`
 *
 * Recorded status codes: 200.
 */
export function getSettingsPricingLevels(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPricingLevelList>> {
    return client.sendGetRequest<SettingsPricingLevelList>(urls.SETTINGS_PRICING_LEVELS, {
        queryParams,
        dtoType: SettingsPricingLevelList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/shipping_profiles`
 *
 * Recorded status codes: 200.
 */
export function getSettingsShippingProfiles(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingProfileList>> {
    return client.sendGetRequest<SettingsShippingProfileList>(urls.SETTINGS_SHIPPING_PROFILES, {
        queryParams,
        dtoType: SettingsShippingProfileList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/taxes`
 *
 * Recorded status codes: 200.
 */
export function getSettingsTaxes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTaxList>> {
    return client.sendGetRequest<SettingsTaxList>(urls.SETTINGS_TAXES, {
        queryParams,
        dtoType: SettingsTaxList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/time_zones`
 *
 * Recorded status codes: 200.
 */
export function getSettingsTimeZones(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTimeZoneList>> {
    return client.sendGetRequest<SettingsTimeZoneList>(urls.SETTINGS_TIME_ZONES, {
        queryParams,
        dtoType: SettingsTimeZoneList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/variations`
 *
 * Recorded status codes: 200.
 */
export function getSettingsVariations(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsVariationList>> {
    return client.sendGetRequest<SettingsVariationList>(urls.SETTINGS_VARIATIONS, {
        queryParams,
        dtoType: SettingsVariationList,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/variations`
 *
 * Recorded status codes: 201.
 */
export function createSettingsVariation(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsVariations>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsVariations>(urls.SETTINGS_VARIATIONS, {
        jsonBody: payload,
        dtoType: SettingsVariations,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/warehouses`
 *
 * Recorded status codes: 200.
 */
export function getSettingsWarehouses(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsWarehouseList>> {
    return client.sendGetRequest<SettingsWarehouseList>(urls.SETTINGS_WAREHOUSES, {
        queryParams,
        dtoType: SettingsWarehouseList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/currencies/{currency_id}`
 *
 * Recorded status codes: 200.
 */
export function getSettingsCurrency(
    client: ExsitedClient,
    currencyId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCurrencyRead>> {
    requireValue(currencyId, 'currency_id');
    return client.sendGetRequest<SettingsCurrencyRead>(urls.SETTINGS_CURRENCY, {
        pathParams: {currency_id: currencyId},
        queryParams,
        dtoType: SettingsCurrencyRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/custom_logic_scripts/{custom_logic_script_id}`
 *
 * Recorded status codes: 200.
 */
export function getSettingsCustomLogicScript(
    client: ExsitedClient,
    customLogicScriptId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomLogicScript>> {
    requireValue(customLogicScriptId, 'custom_logic_script_id');
    return client.sendGetRequest<SettingsCustomLogicScript>(urls.SETTINGS_CUSTOM_LOGIC_SCRIPT, {
        pathParams: {custom_logic_script_id: customLogicScriptId},
        queryParams,
        dtoType: SettingsCustomLogicScript,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/custom_objects/{custom_object_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deleteSettingsCustomObject(
    client: ExsitedClient,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customObjectId, 'custom_object_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_CUSTOM_OBJECT, {
        pathParams: {custom_object_id: customObjectId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/custom_objects/{custom_object_id}`
 *
 * Recorded status codes: 202.
 */
export function updateSettingsCustomObject(
    client: ExsitedClient,
    customObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomObjects>> {
    requireValue(customObjectId, 'custom_object_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsCustomObjects>(urls.SETTINGS_CUSTOM_OBJECT, {
        pathParams: {custom_object_id: customObjectId},
        jsonBody: payload,
        dtoType: SettingsCustomObjects,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/field_settings/account`
 *
 * Recorded status codes: 200.
 */
export function updateSettingsFieldSettingsAccount(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFieldSettingsAccountUpdated>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsFieldSettingsAccountUpdated>(urls.SETTINGS_FIELD_SETTINGS_ACCOUNT, {
        jsonBody: payload,
        dtoType: SettingsFieldSettingsAccountUpdated,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/field_settings/item`
 *
 * Recorded status codes: 200.
 */
export function updateSettingsFieldSettingsItem(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFieldSettingsAccountUpdated>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsFieldSettingsAccountUpdated>(urls.SETTINGS_FIELD_SETTINGS_ITEM, {
        jsonBody: payload,
        dtoType: SettingsFieldSettingsAccountUpdated,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/account`
 *
 * Recorded status codes: 200.
 */
export function updateSettingsGeneralSettingsAccount(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettingsAccountUpdated>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettingsAccountUpdated>(urls.SETTINGS_GENERAL_SETTINGS_ACCOUNT, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettingsAccountUpdated,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/item`
 */
export function updateSettingsGeneralSettingsItem(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettingsItemUpdated>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettingsItemUpdated>(urls.SETTINGS_GENERAL_SETTINGS_ITEM, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettingsItemUpdated,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/item_groups/{item_group_id}`
 *
 * Recorded status codes: 204.
 *
 * No typed view, so `.dto` is null.
 */
export function deleteSettingsItemGroup(
    client: ExsitedClient,
    itemGroupId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(itemGroupId, 'item_group_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_ITEM_GROUP, {
        pathParams: {item_group_id: itemGroupId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/item_groups/{item_group_id}`
 *
 * Recorded status codes: 200.
 */
export function getSettingsItemGroup(
    client: ExsitedClient,
    itemGroupId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsItemGroups>> {
    requireValue(itemGroupId, 'item_group_id');
    return client.sendGetRequest<SettingsItemGroups>(urls.SETTINGS_ITEM_GROUP, {
        pathParams: {item_group_id: itemGroupId},
        queryParams,
        dtoType: SettingsItemGroups,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/item_groups/{item_group_id}`
 *
 * Recorded status codes: 202.
 */
export function updateSettingsItemGroup(
    client: ExsitedClient,
    itemGroupId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsItemGroups>> {
    requireValue(itemGroupId, 'item_group_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsItemGroups>(urls.SETTINGS_ITEM_GROUP, {
        pathParams: {item_group_id: itemGroupId},
        jsonBody: payload,
        dtoType: SettingsItemGroups,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/time_zones/{time_zone_id}`
 *
 * Recorded status codes: 200.
 */
export function getSettingsTimeZone(
    client: ExsitedClient,
    timeZoneId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTimeZoneRead>> {
    requireValue(timeZoneId, 'time_zone_id');
    return client.sendGetRequest<SettingsTimeZoneRead>(urls.SETTINGS_TIME_ZONE, {
        pathParams: {time_zone_id: timeZoneId},
        queryParams,
        dtoType: SettingsTimeZoneRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/variations/{variation_id}`
 *
 * Recorded status codes: 200.
 */
export function getSettingsVariation(
    client: ExsitedClient,
    variationId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsVariations>> {
    requireValue(variationId, 'variation_id');
    return client.sendGetRequest<SettingsVariations>(urls.SETTINGS_VARIATION, {
        pathParams: {variation_id: variationId},
        queryParams,
        dtoType: SettingsVariations,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/variations/{variation_id}`
 *
 * Recorded status codes: 202.
 */
export function updateSettingsVariation(
    client: ExsitedClient,
    variationId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsVariations>> {
    requireValue(variationId, 'variation_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsVariations>(urls.SETTINGS_VARIATION, {
        pathParams: {variation_id: variationId},
        jsonBody: payload,
        dtoType: SettingsVariations,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/custom_objects/{custom_object_id}/customize`
 *
 * Recorded status codes: 201.
 */
export function createSettingsCustomObjectCustomize(
    client: ExsitedClient,
    customObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomObjectCustomize>> {
    requireValue(customObjectId, 'custom_object_id');
    requirePayload(payload);
    return client.sendPostRequest<SettingsCustomObjectCustomize>(urls.SETTINGS_CUSTOM_OBJECT_CUSTOMIZE, {
        pathParams: {custom_object_id: customObjectId},
        jsonBody: payload,
        dtoType: SettingsCustomObjectCustomize,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/item_groups/{item_group_id}/billing_preferences`
 *
 * Recorded status codes: 201.
 */
export function createSettingsItemGroupBillingPreference(
    client: ExsitedClient,
    itemGroupId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsItemGroups>> {
    requireValue(itemGroupId, 'item_group_id');
    requirePayload(payload);
    return client.sendPostRequest<SettingsItemGroups>(urls.SETTINGS_ITEM_GROUP_BILLING_PREFERENCES, {
        pathParams: {item_group_id: itemGroupId},
        jsonBody: payload,
        dtoType: SettingsItemGroups,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/custom_objects`
 *
 * List custom object definitions; enabled definitions only.
 */
export function getSettingsCustomObjects(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomObjectDefinitionList>> {
    return client.sendGetRequest<SettingsCustomObjectDefinitionList>(urls.SETTINGS_CUSTOM_OBJECTS, {
        queryParams,
        dtoType: SettingsCustomObjectDefinitionList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/custom_objects/{custom_object_id}`
 *
 * Get one custom object definition, under `custom_object`.
 */
export function getSettingsCustomObject(
    client: ExsitedClient,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomObjectDefinitionRead>> {
    requireValue(customObjectId, 'custom_object_id');
    return client.sendGetRequest<SettingsCustomObjectDefinitionRead>(urls.SETTINGS_CUSTOM_OBJECT, {
        pathParams: {custom_object_id: customObjectId},
        dtoType: SettingsCustomObjectDefinitionRead,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/custom_objects`
 *
 * Create a custom object schema; answered `201`, under `custom_object`. `name` is required and must be unused.
 */
export function createCustomObject(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomObjects>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsCustomObjects>(urls.CUSTOM_OBJECTS, {
        jsonBody: payload,
        dtoType: SettingsCustomObjects,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/custom_objects/{custom_object_id}`
 *
 * Update a custom object schema, under `custom_object`. `use_in`, `relation` and `custom_component` are refused.
 */
export function updateCustomObject(
    client: ExsitedClient,
    customObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomObjects>> {
    requireValue(customObjectId, 'custom_object_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsCustomObjects>(urls.CUSTOM_OBJECT, {
        pathParams: {custom_object_id: customObjectId},
        jsonBody: payload,
        dtoType: SettingsCustomObjects,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/custom_objects/{custom_object_id}`
 *
 * Delete a custom object schema; answered `204`.
 */
export function deleteCustomObject(
    client: ExsitedClient,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customObjectId, 'custom_object_id');
    return client.sendDeleteRequest<never>(urls.CUSTOM_OBJECT, {
        pathParams: {custom_object_id: customObjectId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/currencies`
 *
 * Create a currency; answered `201`, under `currency`. `code` and `country` are required, and v4 has no route that
 * deletes a currency.
 */
export function createSettingsCurrency(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_CURRENCIES, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/currencies/{currency_id}`
 *
 * Update a currency, under `currency`. Only `rounding`, `cash_rounding_interval`, `conversion_rate` and `status` are
 * accepted.
 */
export function updateSettingsCurrency(
    client: ExsitedClient,
    currencyId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(currencyId, 'currency_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_CURRENCY, {
        pathParams: {currency_id: currencyId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/custom_logic_scripts`
 *
 * Create a custom logic script; answered `201`. `name`, `type` and `code` are required, and `code` is validated but not
 * stored.
 */
export function createSettingsCustomLogicScript(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomLogicScriptSaved>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsCustomLogicScriptSaved>(urls.SETTINGS_CUSTOM_LOGIC_SCRIPTS, {
        jsonBody: payload,
        dtoType: SettingsCustomLogicScriptSaved,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/custom_logic_scripts/{custom_logic_script_id}`
 *
 * Update a custom logic script; `code` is refused.
 */
export function updateSettingsCustomLogicScript(
    client: ExsitedClient,
    customLogicScriptId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsCustomLogicScriptSaved>> {
    requireValue(customLogicScriptId, 'custom_logic_script_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsCustomLogicScriptSaved>(urls.SETTINGS_CUSTOM_LOGIC_SCRIPT, {
        pathParams: {custom_logic_script_id: customLogicScriptId},
        jsonBody: payload,
        dtoType: SettingsCustomLogicScriptSaved,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/custom_logic_scripts/{custom_logic_script_id}`
 *
 * Soft-delete a custom logic script; `204`.
 */
export function deleteSettingsCustomLogicScript(
    client: ExsitedClient,
    customLogicScriptId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(customLogicScriptId, 'custom_logic_script_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_CUSTOM_LOGIC_SCRIPT, {
        pathParams: {custom_logic_script_id: customLogicScriptId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/discount_profiles`
 *
 * Create a discount profile; `201`. Times go as `YYYY-MM-DD HH:mm` and the accounting code must be a discount one, or
 * it is a `500`.
 */
export function createSettingsDiscountProfile(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDiscountProfileRead>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsDiscountProfileRead>(urls.SETTINGS_DISCOUNT_PROFILES, {
        jsonBody: payload,
        dtoType: SettingsDiscountProfileRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/discount_profiles/{discount_profile_id}`
 *
 * Get one discount profile, under `discount_profile`.
 */
export function getSettingsDiscountProfile(
    client: ExsitedClient,
    discountProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDiscountProfileRead>> {
    requireValue(discountProfileId, 'discount_profile_id');
    return client.sendGetRequest<SettingsDiscountProfileRead>(urls.SETTINGS_DISCOUNT_PROFILE, {
        pathParams: {discount_profile_id: discountProfileId},
        dtoType: SettingsDiscountProfileRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/discount_profiles/{discount_profile_id}`
 *
 * Update a discount profile, under `discount_profile`.
 */
export function updateSettingsDiscountProfile(
    client: ExsitedClient,
    discountProfileId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsDiscountProfileRead>> {
    requireValue(discountProfileId, 'discount_profile_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsDiscountProfileRead>(urls.SETTINGS_DISCOUNT_PROFILE, {
        pathParams: {discount_profile_id: discountProfileId},
        jsonBody: payload,
        dtoType: SettingsDiscountProfileRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/discount_profiles/{discount_profile_id}`
 *
 * Delete a discount profile; answered `204`.
 */
export function deleteSettingsDiscountProfile(
    client: ExsitedClient,
    discountProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(discountProfileId, 'discount_profile_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_DISCOUNT_PROFILE, {
        pathParams: {discount_profile_id: discountProfileId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/field_settings`
 *
 * List field settings; paged by cursor, and `include_total=true` is refused.
 */
export function getSettingsFieldSettings(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFieldSettingList>> {
    return client.sendGetRequest<SettingsFieldSettingList>(urls.SETTINGS_FIELD_SETTINGS, {
        queryParams,
        dtoType: SettingsFieldSettingList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/field_settings/{field_setting_id}`
 *
 * Get one field setting, under `field_setting`.
 */
export function getSettingsFieldSetting(
    client: ExsitedClient,
    fieldSettingId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsFieldSettingRead>> {
    requireValue(fieldSettingId, 'field_setting_id');
    return client.sendGetRequest<SettingsFieldSettingRead>(urls.SETTINGS_FIELD_SETTING, {
        pathParams: {field_setting_id: fieldSettingId},
        dtoType: SettingsFieldSettingRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/general_settings/{group}`
 *
 * Read one group of general settings, under `general_settings`; `group` is one of the twelve the server names, any
 * case.
 */
export function getSettingsGeneralSettings(
    client: ExsitedClient,
    group: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requireValue(group, 'group');
    return client.sendGetRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_GROUP, {
        pathParams: {group: group},
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/general_settings/{group}/{general_setting_id}`
 *
 * One general setting row; no v4 answer carries a `gs_` id.
 */
export function getSettingsGeneralSetting(
    client: ExsitedClient,
    group: string,
    generalSettingId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(group, 'group');
    requireValue(generalSettingId, 'general_setting_id');
    return client.sendGetRequest<never>(urls.SETTINGS_GENERAL_SETTING, {
        pathParams: {group: group, general_setting_id: generalSettingId},
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/dashboard`
 *
 * Update the dashboard group. Flags are stored as `"1"`/`"0"` and read back raw, so a `"true"` cannot be restored.
 */
export function updateSettingsGeneralSettingsDashboard(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_DASHBOARD, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/date_and_time`
 *
 * Update the date and time group; the save also pushes the organisation to the catalogue processor.
 */
export function updateSettingsGeneralSettingsDateAndTime(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_DATE_AND_TIME, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/display`
 *
 * Update the display group. Column lists sent as the strings the read serves are ignored: the save reads arrays.
 */
export function updateSettingsGeneralSettingsDisplay(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_DISPLAY, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/general`
 *
 * Update the general group. It also resets `accountingPeriod`, `fiscalYear` and six more settings no route can write
 * back.
 */
export function updateSettingsGeneralSettingsGeneral(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_GENERAL, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/labour`
 *
 * Update the labour general settings; answers the group as `GET` reads it, under `general_settings`.
 */
export function updateSettingsGeneralSettingsLabour(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_LABOUR, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/order`
 *
 * Update the order group, which reads `order` and `product` from `general_settings`.
 */
export function updateSettingsGeneralSettingsOrder(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_ORDER, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/portal`
 *
 * Update the portal group. With `enableCustomerPortal` off, any write also turns every portal login off.
 */
export function updateSettingsGeneralSettingsPortal(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_PORTAL, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/purchase`
 *
 * Update the purchase general settings; answers the group as `GET` reads it, under `general_settings`.
 */
export function updateSettingsGeneralSettingsPurchase(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_PURCHASE, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/security`
 *
 * Update the security group. Send flags as `"1"`/`"0"`: the `"true"` the read serves is stored as false.
 */
export function updateSettingsGeneralSettingsSecurity(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_SECURITY, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/general_settings/transaction`
 *
 * Update the transaction general settings; answers the group as `GET` reads it, under `general_settings`.
 */
export function updateSettingsGeneralSettingsTransaction(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsGeneralSettings>> {
    requirePayload(payload);
    return client.sendPatchRequest<SettingsGeneralSettings>(urls.SETTINGS_GENERAL_SETTINGS_TRANSACTION, {
        jsonBody: payload,
        dtoType: SettingsGeneralSettings,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/payment_processors`
 *
 * Create an offline payment processor; `201`. Refused unless `credentials.maximumRetryOnFailure` is `"0"` or `"1"`.
 */
export function createSettingsPaymentProcessor(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPaymentProcessorSaved>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsPaymentProcessorSaved>(urls.SETTINGS_PAYMENT_PROCESSORS, {
        jsonBody: payload,
        dtoType: SettingsPaymentProcessorSaved,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/payment_processors/{payment_processor_id}`
 *
 * Get one payment processor, under `payment_processor`.
 */
export function getSettingsPaymentProcessor(
    client: ExsitedClient,
    paymentProcessorId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPaymentProcessorRead>> {
    requireValue(paymentProcessorId, 'payment_processor_id');
    return client.sendGetRequest<SettingsPaymentProcessorRead>(urls.SETTINGS_PAYMENT_PROCESSOR, {
        pathParams: {payment_processor_id: paymentProcessorId},
        dtoType: SettingsPaymentProcessorRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/payment_processors/{payment_processor_id}`
 *
 * Update a payment processor; refused, like the create, without `credentials.maximumRetryOnFailure`.
 */
export function updateSettingsPaymentProcessor(
    client: ExsitedClient,
    paymentProcessorId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPaymentProcessorSaved>> {
    requireValue(paymentProcessorId, 'payment_processor_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsPaymentProcessorSaved>(urls.SETTINGS_PAYMENT_PROCESSOR, {
        pathParams: {payment_processor_id: paymentProcessorId},
        jsonBody: payload,
        dtoType: SettingsPaymentProcessorSaved,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/payment_processors/{payment_processor_id}`
 *
 * Delete a payment processor; answered `204`. The default processor is refused.
 */
export function deleteSettingsPaymentProcessor(
    client: ExsitedClient,
    paymentProcessorId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(paymentProcessorId, 'payment_processor_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_PAYMENT_PROCESSOR, {
        pathParams: {payment_processor_id: paymentProcessorId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/payment_terms`
 *
 * Create a payment term; answered `201` with a flat `period` and `duration` where the read nests them. A sent `status`
 * is not applied.
 */
export function createSettingsPaymentTerm(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPaymentTermCreated>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsPaymentTermCreated>(urls.SETTINGS_PAYMENT_TERMS, {
        jsonBody: payload,
        dtoType: SettingsPaymentTermCreated,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/payment_terms/{payment_term_id}`
 *
 * Get one payment term, under `payment_term`.
 */
export function getSettingsPaymentTerm(
    client: ExsitedClient,
    paymentTermId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPaymentTermRead>> {
    requireValue(paymentTermId, 'payment_term_id');
    return client.sendGetRequest<SettingsPaymentTermRead>(urls.SETTINGS_PAYMENT_TERM, {
        pathParams: {payment_term_id: paymentTermId},
        dtoType: SettingsPaymentTermRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/payment_terms/{payment_term_id}`
 *
 * Update a payment term, under `payment_term`; the answer adds `display_order` to the read's fields.
 */
export function updateSettingsPaymentTerm(
    client: ExsitedClient,
    paymentTermId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPaymentTermUpdated>> {
    requireValue(paymentTermId, 'payment_term_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsPaymentTermUpdated>(urls.SETTINGS_PAYMENT_TERM, {
        pathParams: {payment_term_id: paymentTermId},
        jsonBody: payload,
        dtoType: SettingsPaymentTermUpdated,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/payment_terms/{payment_term_id}`
 *
 * Delete a payment term; answered `204`.
 */
export function deleteSettingsPaymentTerm(
    client: ExsitedClient,
    paymentTermId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(paymentTermId, 'payment_term_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_PAYMENT_TERM, {
        pathParams: {payment_term_id: paymentTermId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/pricing_levels`
 *
 * Create a pricing level; answered `201`, under `pricing_level`. `name` is required, and a sent `status` is not
 * applied.
 */
export function createSettingsPricingLevel(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPricingLevelCreated>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsPricingLevelCreated>(urls.SETTINGS_PRICING_LEVELS, {
        jsonBody: payload,
        dtoType: SettingsPricingLevelCreated,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/pricing_levels/{pricing_level_id}`
 *
 * Get one pricing level, under `pricing_level`.
 */
export function getSettingsPricingLevel(
    client: ExsitedClient,
    pricingLevelId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPricingLevelRead>> {
    requireValue(pricingLevelId, 'pricing_level_id');
    return client.sendGetRequest<SettingsPricingLevelRead>(urls.SETTINGS_PRICING_LEVEL, {
        pathParams: {pricing_level_id: pricingLevelId},
        dtoType: SettingsPricingLevelRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/pricing_levels/{pricing_level_id}`
 *
 * Update a pricing level, under `pricing_level`.
 */
export function updateSettingsPricingLevel(
    client: ExsitedClient,
    pricingLevelId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsPricingLevelRead>> {
    requireValue(pricingLevelId, 'pricing_level_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsPricingLevelRead>(urls.SETTINGS_PRICING_LEVEL, {
        pathParams: {pricing_level_id: pricingLevelId},
        jsonBody: payload,
        dtoType: SettingsPricingLevelRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/pricing_levels/{pricing_level_id}`
 *
 * Delete a pricing level; answered `204`. The default level is refused.
 */
export function deleteSettingsPricingLevel(
    client: ExsitedClient,
    pricingLevelId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(pricingLevelId, 'pricing_level_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_PRICING_LEVEL, {
        pathParams: {pricing_level_id: pricingLevelId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/shipping_profiles`
 *
 * Create a shipping profile; `201`. `name` and `shipping_type` are required, and `FIXED` needs `fixed_amount`.
 */
export function createSettingsShippingProfile(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingProfileRead>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsShippingProfileRead>(urls.SETTINGS_SHIPPING_PROFILES, {
        jsonBody: payload,
        dtoType: SettingsShippingProfileRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/shipping_profiles/{shipping_profile_id}`
 *
 * Get one shipping profile, under `shipping_profile`.
 */
export function getSettingsShippingProfile(
    client: ExsitedClient,
    shippingProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsShippingProfileRead>> {
    requireValue(shippingProfileId, 'shipping_profile_id');
    return client.sendGetRequest<SettingsShippingProfileRead>(urls.SETTINGS_SHIPPING_PROFILE, {
        pathParams: {shipping_profile_id: shippingProfileId},
        dtoType: SettingsShippingProfileRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/shipping_profiles/{shipping_profile_id}`
 *
 * Update a shipping profile. Answers `500`, even for a valid body, so it names no view.
 */
export function updateSettingsShippingProfile(
    client: ExsitedClient,
    shippingProfileId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(shippingProfileId, 'shipping_profile_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_SHIPPING_PROFILE, {
        pathParams: {shipping_profile_id: shippingProfileId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/shipping_profiles/{shipping_profile_id}`
 *
 * Delete a shipping profile; answered `204`.
 */
export function deleteSettingsShippingProfile(
    client: ExsitedClient,
    shippingProfileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(shippingProfileId, 'shipping_profile_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_SHIPPING_PROFILE, {
        pathParams: {shipping_profile_id: shippingProfileId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/warehouses`
 *
 * Create a warehouse; answered `201`. `name` and `country` are required, and the answer's `country` reads null although
 * it was stored.
 */
export function createSettingsWarehouse(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsWarehouseRead>> {
    requirePayload(payload);
    return client.sendPostRequest<SettingsWarehouseRead>(urls.SETTINGS_WAREHOUSES, {
        jsonBody: payload,
        dtoType: SettingsWarehouseRead,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/warehouses/{warehouse_id}`
 *
 * Get one warehouse, under `warehouse`.
 */
export function getSettingsWarehouse(
    client: ExsitedClient,
    warehouseId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsWarehouseRead>> {
    requireValue(warehouseId, 'warehouse_id');
    return client.sendGetRequest<SettingsWarehouseRead>(urls.SETTINGS_WAREHOUSE, {
        pathParams: {warehouse_id: warehouseId},
        dtoType: SettingsWarehouseRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/warehouses/{warehouse_id}`
 *
 * Update a warehouse, under `warehouse`; the answer's `country` reads null although the record has one.
 */
export function updateSettingsWarehouse(
    client: ExsitedClient,
    warehouseId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsWarehouseRead>> {
    requireValue(warehouseId, 'warehouse_id');
    requirePayload(payload);
    return client.sendPatchRequest<SettingsWarehouseRead>(urls.SETTINGS_WAREHOUSE, {
        pathParams: {warehouse_id: warehouseId},
        jsonBody: payload,
        dtoType: SettingsWarehouseRead,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/warehouses/{warehouse_id}`
 *
 * Delete a warehouse; answered `204`.
 */
export function deleteSettingsWarehouse(
    client: ExsitedClient,
    warehouseId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(warehouseId, 'warehouse_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_WAREHOUSE, {
        pathParams: {warehouse_id: warehouseId},
        ...options,
    });
}

/**
 * `POST /api/{api_version}/settings/taxes`
 *
 * Create a country tax; answered `201`, under `tax`. `code` and `country` are required, and v4 has no route that
 * deletes a tax.
 */
export function createSettingsTax(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.SETTINGS_TAXES, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/settings/taxes/{tax_id}`
 *
 * Get one tax, under `tax`.
 */
export function getSettingsTax(
    client: ExsitedClient,
    taxId: string,
    options: CallOptions = {},
): Promise<ApiResponse<SettingsTaxRead>> {
    requireValue(taxId, 'tax_id');
    return client.sendGetRequest<SettingsTaxRead>(urls.SETTINGS_TAX, {
        pathParams: {tax_id: taxId},
        dtoType: SettingsTaxRead,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/settings/taxes/{tax_id}`
 *
 * Update, enable or disable a tax, under `tax`.
 */
export function updateSettingsTax(
    client: ExsitedClient,
    taxId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(taxId, 'tax_id');
    requirePayload(payload);
    return client.sendPatchRequest<never>(urls.SETTINGS_TAX, {
        pathParams: {tax_id: taxId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/settings/variations/{variation_id}`
 *
 * Delete a variation; answered `204`.
 */
export function deleteSettingsVariation(
    client: ExsitedClient,
    variationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(variationId, 'variation_id');
    return client.sendDeleteRequest<never>(urls.SETTINGS_VARIATION, {
        pathParams: {variation_id: variationId},
        ...options,
    });
}
