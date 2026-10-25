/**
 * The v4 invoice endpoints.
 *
 * One function per endpoint: the client first, then the values that identify the
 * resource, then the payload. Bodies and query parameters are plain objects and
 * go through exactly as written.
 *
 * ```ts
 * const response = await invoices.getInvoice(client, 'INV-0001');
 * console.log(response.dto?.total);   // "12.00" - a string, see below
 * ```
 *
 * **A listing here answers the same envelope the account and item families do.**
 * `{object, url, data, pagination}`, records under `data` and a **cursor** paging
 * block. The record key is the default, so `iterRecords(client, INVOICES)` needs nothing said.
 *
 * Two things about this family are unlike accounts and items, and both are
 * a silent wrong answer rather than an error:
 *
 * - **Every money field except `discount_amount` reads back as a string** -
 *   `"12.00"`, not `12.0`. Arithmetic on `invoice.total` concatenates.
 * - `version`, `discount_amount`, `price_tax_inclusive`, `created_by` and
 *   `last_updated_by` are **not** strings: the API sends `29`, `0.0`, `true` and two `{object, name}` blocks. See
 *   {@link invoicesDto}.
 *
 * Two endpoints sit under other resources because that is where the API puts
 * them: {@link getAccountInvoices} and {@link getOrderInvoices}. The second has a
 * sibling, {@link createOrderInvoice}, which is how an invoice is raised against
 * an order.
 */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './invoicesUrls.js';
import {
    Invoice,
    InvoiceKpisRead,
    InvoiceLineRead,
    InvoiceLines,
    InvoiceList,
    InvoiceNote,
    InvoiceNoteFile,
    InvoiceNoteFileList,
    InvoiceNoteList,
    InvoicePdf,
} from './invoicesDto.js';
import {ItemFulfillmentRead, ItemFulfillmentReadList} from '../itemFulfillments/itemFulfillmentsDto.js';
import {
    InvoiceReturnMerchandiseAuthorisations,
    ReturnMerchandiseAuthorisationRead,
} from '../returnMerchandiseAuthorisations/returnMerchandiseAuthorisationsDto.js';
import {CreditNoteApplicationRead} from '../creditNoteApplications/creditNoteApplicationsDto.js';

/**
 * Per-call overrides every endpoint accepts. Declared per resource module, so a
 * family can be imported alone.
 */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/**
 * The key a listing puts its records under - `data`, the same key the account and
 * item families use, so it is also `iterRecords`'s default and need not be passed.
 * `GET /api/v4/invoices` carries no `invoices` key.
 */
export const RECORD_KEY = 'data';

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

function requireNote(note: unknown): void {
    if (typeof note !== 'string' || note.trim() === '') {
        throw new SdkUsageError('note is required: the note text is the body of this request');
    }
}

/**
 * List invoices, with optional filtering and paging.
 *
 * `GET /api/{api_version}/invoices`
 *
 * Every documented filter parameter is **accepted** here, unlike on items, so
 * there is no local refusal list and no `invoiceFilterParam` helper. Use
 * `filterParam` from `queryParams`.
 *
 * Paging is by `cursor` and `limit`, not `offset`.
 */
export function getInvoices(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceList>> {
    return client.sendGetRequest<InvoiceList>(urls.INVOICES, {
        queryParams,
        dtoType: InvoiceList,
        ...options,
    });
}

/**
 * Retrieve one invoice.
 *
 * @param invoiceId the invoice's `id` as a listing returns it. **Not** the `uuid`,
 *   which the body also carries but no path accepts.
 */
export function getInvoice(
    client: ExsitedClient,
    invoiceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Invoice>> {
    return client.sendGetRequest<Invoice>(urls.INVOICE, {
        pathParams: {invoice_id: invoiceId},
        dtoType: Invoice,
        ...options,
    });
}

/** Retrieve an invoice's core information. Pairs with {@link updateInvoiceInformation}. */
export function getInvoiceInformation(
    client: ExsitedClient,
    invoiceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Invoice>> {
    return client.sendGetRequest<Invoice>(urls.INVOICE_INFORMATION, {
        pathParams: {invoice_id: invoiceId},
        dtoType: Invoice,
        ...options,
    });
}

/**
 * An invoice's KPI block, under `invoice_kpis`; the same block `getInvoice` carries as `kpis`.
 *
 * `GET /api/{api_version}/invoices/{invoice_id}/kpis`
 */
export function getInvoiceKpis(
    client: ExsitedClient,
    invoiceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceKpisRead>> {
    return client.sendGetRequest<InvoiceKpisRead>(urls.INVOICE_KPIS, {
        pathParams: {invoice_id: invoiceId},
        dtoType: InvoiceKpisRead,
        ...options,
    });
}

/**
 * An invoice's lines, under `invoice.lines`; not a paged listing.
 *
 * `GET /api/{api_version}/invoices/{invoice_id}/lines`
 */
export function getInvoiceLines(
    client: ExsitedClient,
    invoiceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceLines>> {
    return client.sendGetRequest<InvoiceLines>(urls.INVOICE_LINES, {
        pathParams: {invoice_id: invoiceId},
        dtoType: InvoiceLines,
        ...options,
    });
}

/**
 * One invoice line, under `invoice.line`. The server ignores `line_id` and answers the invoice's first line.
 *
 * `GET /api/{api_version}/invoices/{invoice_id}/lines/{line_id}`
 */
export function getInvoiceLine(
    client: ExsitedClient,
    invoiceId: string,
    lineId: string,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceLineRead>> {
    return client.sendGetRequest<InvoiceLineRead>(urls.INVOICE_LINE, {
        pathParams: {invoice_id: invoiceId, line_id: lineId},
        dtoType: InvoiceLineRead,
        ...options,
    });
}

/**
 * Get the links to an invoice's PDF.
 *
 * **Answers a JSON descriptor, not the document**: `{invoice: {pdf: {...}}}`,
 * whose `pdf` block carries the preview and download links. It reads as
 * {@link InvoicePdf}.
 */
export function getInvoicePdf(
    client: ExsitedClient,
    invoiceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<InvoicePdf>> {
    return client.sendGetRequest<InvoicePdf>(urls.INVOICE_PDF, {
        pathParams: {invoice_id: invoiceId},
        dtoType: InvoicePdf,
        ...options,
    });
}

/**
 * Create an invoice.
 *
 * `{"invoice": {"account_id": "W13ZGY", ...}}` is the envelope. To raise one
 * against an order use {@link createOrderInvoice} instead.
 *
 * @throws SdkUsageError `payload` is null or undefined.
 */
export function createInvoice(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Invoice>> {
    requirePayload(payload);
    return client.sendPostRequest<Invoice>(urls.INVOICES, {
        jsonBody: payload,
        dtoType: Invoice,
        ...options,
    });
}

/** Update an invoice's core information. A partial update: send only what changes. */
export function updateInvoiceInformation(
    client: ExsitedClient,
    invoiceId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Invoice>> {
    requirePayload(payload);
    return client.sendPatchRequest<Invoice>(urls.INVOICE_INFORMATION, {
        pathParams: {invoice_id: invoiceId},
        jsonBody: payload,
        dtoType: Invoice,
        ...options,
    });
}

/**
 * Amend an invoice.
 *
 * Answers **201**, where its two siblings answer 202. The body is optional.
 */
export function amendInvoice(
    client: ExsitedClient,
    invoiceId: string,
    payload?: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Invoice>> {
    return client.sendPostRequest<Invoice>(urls.INVOICE_AMEND, {
        pathParams: {invoice_id: invoiceId},
        ...(payload === undefined ? {} : {jsonBody: payload}),
        dtoType: Invoice,
        ...options,
    });
}

/** Cancel an invoice. Answers **202**. The body is optional. */
export function cancelInvoice(
    client: ExsitedClient,
    invoiceId: string,
    payload?: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Invoice>> {
    return client.sendPostRequest<Invoice>(urls.INVOICE_CANCEL, {
        pathParams: {invoice_id: invoiceId},
        ...(payload === undefined ? {} : {jsonBody: payload}),
        dtoType: Invoice,
        ...options,
    });
}

/** Reactivate a cancelled invoice. Answers **202**. The body is optional. */
export function reactivateInvoice(
    client: ExsitedClient,
    invoiceId: string,
    payload?: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Invoice>> {
    return client.sendPostRequest<Invoice>(urls.INVOICE_REACTIVATE, {
        pathParams: {invoice_id: invoiceId},
        ...(payload === undefined ? {} : {jsonBody: payload}),
        dtoType: Invoice,
        ...options,
    });
}

/**
 * Delete an invoice.
 *
 * Answers **200 with a body**, not the `204` an account delete returns.
 */
export function deleteInvoice(
    client: ExsitedClient,
    invoiceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendDeleteRequest<never>(urls.INVOICE, {
        pathParams: {invoice_id: invoiceId},
        ...options,
    });
}

/** List the item fulfilments recorded against an invoice. American spelling. */
export function getInvoiceItemFulfillments(
    client: ExsitedClient,
    invoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ItemFulfillmentReadList>> {
    return client.sendGetRequest<ItemFulfillmentReadList>(urls.INVOICE_ITEM_FULFILLMENTS, {
        pathParams: {invoice_id: invoiceId},
        queryParams,
        dtoType: ItemFulfillmentReadList,
        ...options,
    });
}

/** Retrieve one item fulfilment. */
export function getInvoiceItemFulfillment(
    client: ExsitedClient,
    invoiceId: string,
    fulfillmentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ItemFulfillmentRead>> {
    return client.sendGetRequest<ItemFulfillmentRead>(urls.INVOICE_ITEM_FULFILLMENT, {
        pathParams: {invoice_id: invoiceId, fulfillment_id: fulfillmentId},
        dtoType: ItemFulfillmentRead,
        ...options,
    });
}

/**
 * List an invoice's return merchandise authorisations.
 *
 * **British spelling** in the path - `authorisations`, with an `s` - beside the
 * American `item_fulfillments`. Neither is a typo.
 */
export function getInvoiceRmas(
    client: ExsitedClient,
    invoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceReturnMerchandiseAuthorisations>> {
    return client.sendGetRequest<InvoiceReturnMerchandiseAuthorisations>(urls.INVOICE_RMAS, {
        pathParams: {invoice_id: invoiceId},
        queryParams,
        dtoType: InvoiceReturnMerchandiseAuthorisations,
        ...options,
    });
}

/** Retrieve one return merchandise authorisation. */
export function getInvoiceRma(
    client: ExsitedClient,
    invoiceId: string,
    rmaId: string,
    options: CallOptions = {},
): Promise<ApiResponse<ReturnMerchandiseAuthorisationRead>> {
    return client.sendGetRequest<ReturnMerchandiseAuthorisationRead>(urls.INVOICE_RMA, {
        pathParams: {invoice_id: invoiceId, rma_id: rmaId},
        dtoType: ReturnMerchandiseAuthorisationRead,
        ...options,
    });
}

/**
 * One credit note application through an invoice; not checked against the invoice, so any application answers under any
 * invoice.
 *
 * `GET /api/{api_version}/invoices/{invoice_id}/credit_note_applications/{credit_note_application_id}`
 */
export function getInvoiceCreditNoteApplication(
    client: ExsitedClient,
    invoiceId: string,
    creditNoteApplicationId: string,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteApplicationRead>> {
    return client.sendGetRequest<CreditNoteApplicationRead>(urls.INVOICE_CREDIT_NOTE_APPLICATION, {
        pathParams: {invoice_id: invoiceId, credit_note_application_id: creditNoteApplicationId},
        dtoType: CreditNoteApplicationRead,
        ...options,
    });
}

/**
 * The custom objects defined for invoices; a paged listing, under `data`.
 *
 * `GET /api/{api_version}/invoices/{invoice_id}/custom_objects`
 */
export function getInvoiceCustomObjects(
    client: ExsitedClient,
    invoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendGetRequest<never>(urls.INVOICE_CUSTOM_OBJECTS, {
        pathParams: {invoice_id: invoiceId},
        queryParams,
        ...options,
    });
}

/**
 * One custom object with this invoice's instances of it.
 *
 * `GET /api/{api_version}/invoices/{invoice_id}/custom_objects/{custom_object_id}`
 */
export function getInvoiceCustomObject(
    client: ExsitedClient,
    invoiceId: string,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendGetRequest<never>(urls.INVOICE_CUSTOM_OBJECT, {
        pathParams: {invoice_id: invoiceId, custom_object_id: customObjectId},
        ...options,
    });
}

/**
 * One instance of a custom object on an invoice.
 *
 * `GET /api/{api_version}/invoices/{invoice_id}/custom_objects/{custom_object_id}/instances/{instance_id}`
 */
export function getInvoiceCustomObjectInstance(
    client: ExsitedClient,
    invoiceId: string,
    customObjectId: string,
    instanceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendGetRequest<never>(urls.INVOICE_CUSTOM_OBJECT_INSTANCE, {
        pathParams: {invoice_id: invoiceId, custom_object_id: customObjectId, instance_id: instanceId},
        ...options,
    });
}

/**
 * List an invoice's notes. The same `{object, url, data, pagination}` envelope as
 * the invoice listing.
 */
export function getInvoiceNotes(
    client: ExsitedClient,
    invoiceId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceNoteList>> {
    return client.sendGetRequest<InvoiceNoteList>(urls.INVOICE_NOTES, {
        pathParams: {invoice_id: invoiceId},
        queryParams,
        dtoType: InvoiceNoteList,
        ...options,
    });
}

/** Retrieve one note. */
export function getInvoiceNote(
    client: ExsitedClient,
    invoiceId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceNote>> {
    return client.sendGetRequest<InvoiceNote>(urls.INVOICE_NOTE, {
        pathParams: {invoice_id: invoiceId, note_id: noteId},
        dtoType: InvoiceNote,
        ...options,
    });
}

/**
 * Add a note to an invoice.
 *
 * **Unverified.** The API has answered `500` to it, so the path and body shape are
 * not confirmed working.
 *
 * @param options `files` attaches uploads, sent with the note as one multipart body instead of the JSON one.
 * @throws SdkUsageError `note` is missing or blank.
 */
export function createInvoiceNote(
    client: ExsitedClient,
    invoiceId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<InvoiceNote>> {
    requireNote(note);
    const {files, ...callOptions} = options;
    if (files === undefined) {
        return client.sendPostRequest<InvoiceNote>(urls.INVOICE_NOTES, {
            pathParams: {invoice_id: invoiceId},
            jsonBody: {note},
            dtoType: InvoiceNote,
            ...callOptions,
        });
    }
    return client.sendPostRequest<InvoiceNote>(urls.INVOICE_NOTES, {
        pathParams: {invoice_id: invoiceId},
        formData: {note},
        files,
        dtoType: InvoiceNote,
        ...callOptions,
    });
}

/**
 * Delete a note.
 *
 * **Unverified.** The API has answered `400` to it.
 */
export function deleteInvoiceNote(
    client: ExsitedClient,
    invoiceId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendDeleteRequest<never>(urls.INVOICE_NOTE, {
        pathParams: {invoice_id: invoiceId, note_id: noteId},
        ...options,
    });
}

/** List a note's attachments. */
export function getInvoiceNoteFiles(
    client: ExsitedClient,
    invoiceId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceNoteFileList>> {
    return client.sendGetRequest<InvoiceNoteFileList>(urls.INVOICE_NOTE_FILES, {
        pathParams: {invoice_id: invoiceId, note_id: noteId},
        dtoType: InvoiceNoteFileList,
        ...options,
    });
}

/** Retrieve one attachment's JSON descriptor, under `file`. */
export function getInvoiceNoteFile(
    client: ExsitedClient,
    invoiceId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceNoteFile>> {
    return client.sendGetRequest<InvoiceNoteFile>(urls.INVOICE_NOTE_FILE, {
        pathParams: {invoice_id: invoiceId, note_id: noteId, file_id: fileId},
        dtoType: InvoiceNoteFile,
        ...options,
    });
}

/**
 * Delete one attachment, by the attachment's `uuid`; `204`.
 *
 * `DELETE /api/{api_version}/invoices/{invoice_id}/notes/{note_id}/files/{file_id}`
 */
export function deleteInvoiceNoteFile(
    client: ExsitedClient,
    invoiceId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    return client.sendDeleteRequest<never>(urls.INVOICE_NOTE_FILE, {
        pathParams: {invoice_id: invoiceId, note_id: noteId, file_id: fileId},
        ...options,
    });
}

/** List an order's invoices. */
export function getOrderInvoices(
    client: ExsitedClient,
    orderId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceList>> {
    return client.sendGetRequest<InvoiceList>(urls.ORDER_INVOICES, {
        pathParams: {order_id: orderId},
        queryParams,
        dtoType: InvoiceList,
        ...options,
    });
}

/**
 * Raise an invoice against an order.
 *
 * The same path as {@link getOrderInvoices}, with `POST`. The body is optional -
 * the order supplies the lines.
 */
export function createOrderInvoice(
    client: ExsitedClient,
    orderId: string,
    payload?: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Invoice>> {
    return client.sendPostRequest<Invoice>(urls.ORDER_INVOICES, {
        pathParams: {order_id: orderId},
        ...(payload === undefined ? {} : {jsonBody: payload}),
        dtoType: Invoice,
        ...options,
    });
}
