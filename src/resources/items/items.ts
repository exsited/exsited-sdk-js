/**
 * The v4 item endpoints.
 *
 * One function per endpoint: the client first, then the values that identify the
 * resource, then the payload. Bodies and query parameters are plain objects and
 * go through exactly as written.
 *
 * ```ts
 * const response = await items.getItem(client, 'ITEM-0001');
 * console.log(response.dto?.name);
 * ```
 *
 * Three envelope shapes come back:
 *
 * - a **listing** answers `{object: 'list', data: [...], pagination: {...}}` -
 *   items page by **cursor**, like accounts;
 * - a **single item** answers `{item: {...}}`;
 * - the **sale, purchase and inventories reads answer a stub** under `item` -
 *   `{item: {id: 2, name: '...', sale: {...}}}`, three keys rather than the whole
 *   item, and the sale and purchase stubs carry a **numeric** `id`. See
 *   {@link ItemSaleView}.
 *
 * Two facts shape how this module is used, and neither is visible from the
 * endpoint list:
 *
 * **Sorting is `order_by` + `direction`, not `sort`.** The account family takes a
 * single `sort` value with a `-` prefix; this one takes two parameters, and the
 * account spelling is *accepted and silently ignored* here. {@link sortParams}
 * builds the right pair; `sortParam` from `queryParams` is the wrong tool.
 *
 * **40 of the 87 documented filters are rejected.** They answer
 * `400 "Filter syntax deprecated bracket"`. Every rejected one
 * addresses a field inside a nested block (`sale`, `purchase`, `inventories`),
 * reachable instead through the separate `filter` expression parameter.
 * {@link DEPRECATED_FILTERS} names them and {@link itemFilterParam} refuses one
 * locally rather than spending a request to be told.
 */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {filterParam, type FilterOperator} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './itemsUrls.js';
import {
    InventoryAdjustmentList,
    Item,
    ItemInventoriesView,
    ItemList,
    ItemPurchaseView,
    ItemSaleView,
    ItemWarehouseInventories,
    NoteAttachment,
    NoteFileList,
    NoteList,
    NoteView,
} from './itemsDto.js';

/**
 * Per-call overrides every endpoint accepts. Declared per resource module, as the
 * account family declares its own, so a family can be imported on its own.
 */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/** {@link urls.FILTERABLE_FIELDS} as a set. */
export const FILTERABLE_FIELDS: ReadonlySet<string> = new Set(urls.FILTERABLE_FIELDS);

/** {@link urls.DEPRECATED_FILTERS} as a set; {@link itemFilterParam} refuses each one locally. */
export const DEPRECATED_FILTERS: ReadonlySet<string> = new Set(urls.DEPRECATED_FILTERS);

/**
 * Build a `filter_*` parameter name, refusing one the API rejects.
 *
 * The same construction as `filterParam` - `filter_<field>` for equality,
 * `filter_<field>_<operator>` otherwise - with one addition: a field in
 * {@link DEPRECATED_FILTERS} throws here rather than costing a request to be told
 * the syntax is deprecated.
 *
 * @throws SdkUsageError the field is one the API rejects, or the operator is not
 *   one this API knows.
 */
export function itemFilterParam(field: string, operator: FilterOperator = 'eq'): string {
    if (DEPRECATED_FILTERS.has(field)) {
        throw new SdkUsageError(
            `filter field '${field}': the API answers 400 'Filter syntax deprecated ` +
                `bracket' for this one, because it addresses a field inside a nested ` +
                `block rather than a top-level item field. Use the 'filter' expression ` +
                `parameter instead, e.g. ` +
                `{ filter: "items/sale(pricing/latest_used_pricing_version) eq '1'" } ` +
                `- see getItems.`,
        );
    }
    return filterParam(field, operator);
}

/**
 * Build this family's sort parameters.
 *
 * **Items sort with two parameters, not one.** Where an account listing takes
 * `sort: '-created_on'`, an item listing takes `order_by: 'created_on'` and
 * `direction: 'desc'`.
 *
 * @throws SdkUsageError the field is blank.
 */
export function sortParams(field: string, descending = false): Record<string, string> {
    if (typeof field !== 'string' || field.trim() === '') {
        throw new SdkUsageError(`sort field: expected a name like 'created_on', got ${JSON.stringify(field)}`);
    }
    return {order_by: field.trim(), direction: descending ? 'desc' : 'asc'};
}

function requirePayload(payload: unknown): void {
    if (payload === undefined || payload === null) {
        throw new SdkUsageError(
            'payload is required: this endpoint takes a body, and omitting it would ' +
                'send the request with no body at all',
        );
    }
}

function requireNote(note: unknown): void {
    if (note === undefined || note === null || note === '') {
        throw new SdkUsageError('note is required: the note text is the body of this request');
    }
}

/**
 * List items, with optional filtering, sorting and paging.
 *
 * `GET /api/{api_version}/items`
 *
 * Four parameters control the listing: `limit`, `cursor`, and the `order_by` +
 * `direction` pair - build the last two with {@link sortParams}. Everything else
 * is a filter: top-level fields take `filter_<field>` (build with
 * {@link itemFilterParam}); nested fields take the single `filter` expression,
 * e.g. `{ filter: "items/sale(pricing/latest_used_pricing_version) eq '1'" }`.
 */
export function getItems(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ItemList>> {
    return client.sendGetRequest<ItemList>(urls.ITEMS, {
        queryParams,
        dtoType: ItemList,
        ...options,
    });
}

/**
 * Retrieve one item.
 *
 * @param itemId the item's `id` as a listing returns it - `"ITEM-0001"`. **Not**
 *   the `uuid`, and not the numeric id the sale, purchase and inventories reads
 *   hand back.
 */
export function getItem(client: ExsitedClient, itemId: string, options: CallOptions = {}): Promise<ApiResponse<Item>> {
    return client.sendGetRequest<Item>(urls.ITEM, {
        pathParams: {item_id: itemId},
        dtoType: Item,
        ...options,
    });
}

/** Retrieve an item's core information. Pairs with {@link updateItemInformation}. */
export function getItemInformation(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    return client.sendGetRequest<Item>(urls.ITEM_INFORMATION, {
        pathParams: {item_id: itemId},
        dtoType: Item,
        ...options,
    });
}

/**
 * Create an item.
 *
 * `{"item": {"type": "STANDARD", "name": "Widget"}}` is the minimum that works;
 * the answer spells the type in lower case, as every other v4 enum.
 *
 * @throws SdkUsageError `payload` is null or undefined.
 */
export function createItem(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEMS, {
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/** Update an item's core information. A partial update: send only what changes. */
export function updateItemInformation(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPatchRequest<Item>(urls.ITEM_INFORMATION, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/** Deactivate an item. Takes no body. The API has answered 500 to it. */
export function deactivateItem(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    return client.sendPostRequest<Item>(urls.ITEM_DEACTIVATE, {
        pathParams: {item_id: itemId},
        dtoType: Item,
        ...options,
    });
}

/** Reactivate a deactivated item. Takes no body. The API has answered 500 to it. */
export function reactivateItem(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    return client.sendPostRequest<Item>(urls.ITEM_REACTIVATE, {
        pathParams: {item_id: itemId},
        dtoType: Item,
        ...options,
    });
}

/**
 * Delete an item.
 *
 * A **409** with code `internal_error` means the item is referenced - *"All Orders
 * with this Item need to be deleted"*. A business rule, not a server fault despite
 * the code, and not retryable.
 */
export function deleteItem(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<unknown>> {
    return client.sendDeleteRequest<unknown>(urls.ITEM, {
        pathParams: {item_id: itemId},
        ...options,
    });
}

/**
 * Set the item's image. `{image_base64: '...'}` at the **top level** - the one
 * write in this family with no `item` envelope. The API has answered 500 to it.
 */
export function uploadItemImage(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_IMAGE, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * Retrieve an item's sale configuration.
 *
 * **A stub, not the item**: `{item: {id: 2, name: '...', sale: {...}}}`, three
 * keys under the `item` wrapper - and `id` is a **number**, not the string code
 * the path took.
 */
export function getItemSale(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ItemSaleView>> {
    return client.sendGetRequest<ItemSaleView>(urls.ITEM_SALE, {
        pathParams: {item_id: itemId},
        dtoType: ItemSaleView,
        ...options,
    });
}

/**
 * Create an item's sale configuration.
 * `{"item": {"sale": {...}, "currencies": [...]}}`.
 *
 * Answers `409 already_exists` when the item already has one.
 */
export function createItemSale(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_SALE, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/** Update an item's sale configuration. `{"item": {"sale": {...}}}`, partial. */
export function updateItemSale(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPatchRequest<Item>(urls.ITEM_SALE, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/** Retrieve an item's purchase configuration. A **stub**, as the sale read is. */
export function getItemPurchase(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ItemPurchaseView>> {
    return client.sendGetRequest<ItemPurchaseView>(urls.ITEM_PURCHASE, {
        pathParams: {item_id: itemId},
        dtoType: ItemPurchaseView,
        ...options,
    });
}

/** Create an item's purchase configuration. Answers `409 already_exists` if one exists. */
export function createItemPurchase(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_PURCHASE, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/** Update an item's purchase configuration. */
export function updateItemPurchase(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPatchRequest<Item>(urls.ITEM_PURCHASE, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * Retrieve an item's inventory configuration and stock. A **stub** under `item`,
 * whose `id` is the string item code, unlike the sale and purchase stubs. The
 * per-warehouse quantities inside are **numbers**, each beside a `_value` twin
 * that is a string.
 */
export function getItemInventories(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ItemInventoriesView>> {
    return client.sendGetRequest<ItemInventoriesView>(urls.ITEM_INVENTORIES, {
        pathParams: {item_id: itemId},
        dtoType: ItemInventoriesView,
        ...options,
    });
}

/**
 * Update an item's inventory configuration. `{"item": {"inventories": {...}}}`.
 *
 * The write spells warehouse management `warehouse_enabled` where the read returns
 * `enable_warehouse_management`. Turning inventory off once stock exists is
 * refused with `400 "Unable to disable Inventory Management"`.
 */
export function updateItemInventories(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPatchRequest<Item>(urls.ITEM_INVENTORIES, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * Add stock to a warehouse. The path segment is `inventory`, singular.
 *
 * The warehouse is keyed `name` in the body and `warehouse` on the read side. The
 * API has answered `400 validation_error` to it.
 */
export function addItemInventory(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_INVENTORY_ADD, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * List an item's inventory movements.
 *
 * **Every quantity on these records is a string** - `"79999"`, not `79999` - the
 * opposite of what {@link getItemInventories} returns for the same names.
 */
export function getItemInventoryAdjustments(
    client: ExsitedClient,
    itemId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InventoryAdjustmentList>> {
    return client.sendGetRequest<InventoryAdjustmentList>(urls.ITEM_INVENTORY_ADJUSTMENTS, {
        pathParams: {item_id: itemId},
        queryParams,
        dtoType: InventoryAdjustmentList,
        ...options,
    });
}

/**
 * Retrieve one warehouse's stock for an item.
 *
 * @param warehouseName the warehouse **name**, not an id - the one slot in this
 *   family that takes a name. A 404 names it, e.g. *"warehouse 'BareHouse' not
 *   found"*.
 */
export function getItemWarehouseInventories(
    client: ExsitedClient,
    itemId: string,
    warehouseName: string,
    options: CallOptions = {},
): Promise<ApiResponse<ItemWarehouseInventories>> {
    return client.sendGetRequest<ItemWarehouseInventories>(urls.ITEM_WAREHOUSE_INVENTORIES, {
        pathParams: {item_id: itemId, warehouse_name: warehouseName},
        dtoType: ItemWarehouseInventories,
        ...options,
    });
}

/**
 * Set the components of a bundle item.
 * `{"item": {"bundle_details": [{id, quantity}]}}` - a **bare list**, unlike
 * `family_details`, which takes an object with an `add` key.
 */
export function updateItemBundleDetails(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPatchRequest<Item>(urls.ITEM_BUNDLE_DETAILS, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * Configure an item's variations. A parent declares `configure_variations`; a
 * child sets `parent_item_id` and `use_variations`. The API has answered 400 to
 * both, so neither form is confirmed working.
 */
export function updateItemVariations(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPatchRequest<Item>(urls.ITEM_VARIATIONS, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/** List the members of an item family. Each carries `item_id` and `item_name` only. */
export function getItemFamilyDetails(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    return client.sendGetRequest<Item>(urls.ITEM_FAMILY_DETAILS, {
        pathParams: {item_id: itemId},
        dtoType: Item,
        ...options,
    });
}

/**
 * Add members to an item family.
 * `{"item": {"family_details": {"add": ["ITEM-0002"]}}}` - an **object with an
 * `add` list**. The API has answered `405 method_not_allowed` to it.
 */
export function createItemFamilyDetails(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_FAMILY_DETAILS, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/** List an item's packages. */
export function getItemPackageDetails(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    return client.sendGetRequest<Item>(urls.ITEM_PACKAGE_DETAILS, {
        pathParams: {item_id: itemId},
        dtoType: Item,
        ...options,
    });
}

/**
 * Retrieve one package.
 *
 * @param packageDetailId the package's `uuid`, as `package_details[].uuid` carries it.
 */
export function getItemPackageDetail(
    client: ExsitedClient,
    itemId: string,
    packageDetailId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    return client.sendGetRequest<Item>(urls.ITEM_PACKAGE_DETAIL, {
        pathParams: {item_id: itemId, package_detail_id: packageDetailId},
        dtoType: Item,
        ...options,
    });
}

/** Add a package to an item. The API has answered `405 method_not_allowed` to it. */
export function createItemPackageDetails(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_PACKAGE_DETAILS, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/** Delete one package. */
export function deleteItemPackageDetail(
    client: ExsitedClient,
    itemId: string,
    packageDetailId: string,
    options: CallOptions = {},
): Promise<ApiResponse<unknown>> {
    return client.sendDeleteRequest<unknown>(urls.ITEM_PACKAGE_DETAIL, {
        pathParams: {item_id: itemId, package_detail_id: packageDetailId},
        ...options,
    });
}

/** List an item's notes. The list envelope, as on an account. */
export function getItemNotes(
    client: ExsitedClient,
    itemId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<NoteList>> {
    return client.sendGetRequest<NoteList>(urls.ITEM_NOTES, {
        pathParams: {item_id: itemId},
        queryParams,
        dtoType: NoteList,
        ...options,
    });
}

/** Retrieve one note. Answers `{"note": {...}}`. */
export function getItemNote(
    client: ExsitedClient,
    itemId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteView>> {
    return client.sendGetRequest<NoteView>(urls.ITEM_NOTE, {
        pathParams: {item_id: itemId, note_id: noteId},
        dtoType: NoteView,
        ...options,
    });
}

/**
 * Attach a note to an item.
 *
 * **Form-encoded, not JSON** - the text travels as a form field named `note`,
 * exactly as on an account, which is why this takes the text directly rather than
 * a payload object. HTML is accepted and comes back as written.
 *
 * @param options `files` attaches uploads, sent with the note as one multipart body.
 */
export function createItemNote(
    client: ExsitedClient,
    itemId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<NoteView>> {
    requireNote(note);
    return client.sendPostRequest<NoteView>(urls.ITEM_NOTES, {
        pathParams: {item_id: itemId},
        formData: {note},
        dtoType: NoteView,
        ...options,
    });
}

/**
 * Update a note's text. Form-encoded, as the create is.
 *
 * Answers `400 "Invalid UUID"` when `noteId` is not one - the message names the
 * format, not the field.
 *
 * @param options `files` attaches uploads, sent with the note as one multipart body.
 */
export function updateItemNote(
    client: ExsitedClient,
    itemId: string,
    noteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<NoteView>> {
    requireNote(note);
    return client.sendPatchRequest<NoteView>(urls.ITEM_NOTE, {
        pathParams: {item_id: itemId, note_id: noteId},
        formData: {note},
        dtoType: NoteView,
        ...options,
    });
}

/** Delete one note. Answers `400 "Invalid note_id"` when the id is not one. */
export function deleteItemNote(
    client: ExsitedClient,
    itemId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<unknown>> {
    return client.sendDeleteRequest<unknown>(urls.ITEM_NOTE, {
        pathParams: {item_id: itemId, note_id: noteId},
        ...options,
    });
}

/**
 * List a note's attachments. Unverified: the API has answered
 * `404 "note 'files' not found"` to it.
 */
export function getItemNoteFiles(
    client: ExsitedClient,
    itemId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteFileList>> {
    return client.sendGetRequest<NoteFileList>(urls.ITEM_NOTE_FILES, {
        pathParams: {item_id: itemId, note_id: noteId},
        dtoType: NoteFileList,
        ...options,
    });
}

/**
 * Retrieve one attachment's JSON descriptor, under `file`, read as
 * {@link NoteAttachment}, the row type {@link getItemNoteFiles} lists.
 */
export function getItemNoteFile(
    client: ExsitedClient,
    itemId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteAttachment>> {
    return client.sendGetRequest<NoteAttachment>(urls.ITEM_NOTE_FILE, {
        pathParams: {item_id: itemId, note_id: noteId, file_id: fileId},
        dtoType: NoteAttachment,
        ...options,
    });
}

/**
 * Create an item's inventory section, once, on a `STANDARD` item with sale or purchase on; `201` with the whole item.
 *
 * `POST /api/{api_version}/items/{item_id}/inventories`
 */
export function createItemInventories(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_INVENTORIES, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * Create an item's inventory section, `inventory` singular; the same handler as `createItemInventories`.
 *
 * `POST /api/{api_version}/items/{item_id}/inventory`
 */
export function createItemInventory(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_INVENTORY, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * Add stock to a warehouse, `inventories` plural; the same handler as `addItemInventory`.
 *
 * `POST /api/{api_version}/items/{item_id}/inventories/add`
 */
export function addItemInventories(
    client: ExsitedClient,
    itemId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPostRequest<Item>(urls.ITEM_INVENTORIES_ADD, {
        pathParams: {item_id: itemId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * Update one package, by its `uuid`; the body is `{"item": {"package_details": {...}}}`.
 *
 * `PATCH /api/{api_version}/items/{item_id}/package_details/{package_detail_id}`
 */
export function updateItemPackageDetail(
    client: ExsitedClient,
    itemId: string,
    packageDetailId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Item>> {
    requirePayload(payload);
    return client.sendPatchRequest<Item>(urls.ITEM_PACKAGE_DETAIL, {
        pathParams: {item_id: itemId, package_detail_id: packageDetailId},
        jsonBody: payload,
        dtoType: Item,
        ...options,
    });
}

/**
 * Delete one attachment, the `uuid` the note's files listing gives; any failure is answered `404`.
 *
 * `DELETE /api/{api_version}/items/{item_id}/notes/{note_id}/files/{file_id}`
 */
export function deleteItemNoteFile(
    client: ExsitedClient,
    itemId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<unknown>> {
    return client.sendDeleteRequest<unknown>(urls.ITEM_NOTE_FILE, {
        pathParams: {item_id: itemId, note_id: noteId, file_id: fileId},
        ...options,
    });
}

/**
 * Retrieve an item's KPI summary, under `item_kpis`; no typed view.
 *
 * `GET /api/{api_version}/items/{item_id}/kpis`
 */
export function getItemKpis(
    client: ExsitedClient,
    itemId: string,
    options: CallOptions = {},
): Promise<ApiResponse<unknown>> {
    return client.sendGetRequest<unknown>(urls.ITEM_KPIS, {
        pathParams: {item_id: itemId},
        ...options,
    });
}
