/**
 * v4 account endpoints - `/api/{api_version}/accounts*`.
 *
 * One function per endpoint: an `ExsitedClient` first, then the values that
 * identify the resource, then the payload. Bodies and query parameters are plain
 * objects, passed through exactly as written.
 *
 * ```ts
 * import { accounts } from 'exsited';
 * await accounts.getAccount(client, 'W13ZGY');
 * ```
 *
 * Every function takes an optional trailing `options` carrying `raiseOnError`
 * and `responseFormat`, each overriding the config for that one call.
 *
 * Two envelope shapes come back. A listing answers
 * `{"object":"list","url":…,"data":[…],"pagination":{…}}`. A single resource
 * answers `{"account": {...}}`, and so do most of the sub-resource reads:
 * `getAccountAddresses` returns the *account* with an `addresses` list on it, not
 * a bare list.
 */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import type {MultipartFiles} from '../../http/transport.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './accountsUrls.js';
import {
    Account,
    AccountAddress,
    AccountComponentObject,
    AccountContact,
    AccountCustomObject,
    AccountCustomObjectList,
    AccountFinancialSummary,
    AccountImage,
    AccountKpis,
    AccountList,
    NoteAttachment,
    NoteFileList,
    NoteList,
    NoteView,
} from './accountsDto.js';
import {AccountCommunicationsEmail, AccountCommunicationsEmailList} from '../accountEmails/accountEmailsDto.js';
import {InvoiceList} from '../invoices/invoicesDto.js';
import {AccountOrders} from '../orders/ordersDto.js';
import {AccountPayments} from '../payments/paymentsDto.js';
import {AccountPurchaseInvoices} from '../purchaseInvoices/purchaseInvoicesDto.js';
import {AccountPurchaseOrders} from '../purchaseOrders/purchaseOrdersDto.js';
import {AccountPurchasePayments} from '../purchasePayments/purchasePaymentsDto.js';
import {AccountPurchaseRefunds} from '../purchaseRefunds/purchaseRefundsDto.js';
import {AccountRefunds} from '../refunds/refundsDto.js';
import {CreditNoteList} from '../creditNotes/creditNotesDto.js';
import {ComponentObjects} from '../customComponents/customComponentsDto.js';

/** Per-call overrides every endpoint accepts. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
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
    if (note === undefined || note === null) {
        throw new SdkUsageError(
            'note is required: the note text is the body of this request, and omitting ' +
                'it would be encoded as the string "undefined" and stored as the note',
        );
    }
}

/**
 * List accounts, with optional filtering, sorting and paging.
 *
 * `GET /api/{api_version}/accounts`
 *
 * Three query parameters control the listing - `limit`, `cursor` and `sort` -
 * and everything else is a filter, spelled `filter_<field>` for equality and
 * `filter_<field>_<operator>` otherwise. Build the names with `filterParam` and
 * `sortParam` rather than concatenating, since equality is the irregular case
 * and takes no suffix.
 *
 * Prefer `iterRecords` over passing `cursor` by hand.
 *
 * @example
 * const response = await accounts.getAccounts(client, {
 *   limit: 50,
 *   sort: sortParam('created_on', 'desc'),
 *   [filterParam('status')]: 'ACTIVE',
 * });
 * for (const account of response.dto?.data ?? []) console.log(account?.id);
 */
export function getAccounts(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountList>> {
    return client.sendGetRequest<AccountList>(urls.ACCOUNTS, {
        queryParams,
        dtoType: AccountList,
        ...options,
    });
}

/**
 * Retrieve one account.
 *
 * `GET /api/{api_version}/accounts/{account_id}`
 *
 * @param accountId the account's `id` - the short code a response carries,
 *   `"W13ZGY"`. **Not the `uuid`**: a response carries both, only `id` addresses
 *   the record in a path, and the `uuid` answers 404. Use the `uuid` with
 *   `filter_uuid` on {@link getAccounts} instead.
 */
export function getAccount(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT, {
        pathParams: {account_id: accountId},
        dtoType: Account,
        ...options,
    });
}

/**
 * Retrieve an account's core information.
 *
 * The read that pairs with {@link updateAccountInformation}. It answers the same `{"account": {...}}` body as {@link getAccount}; it
 * exists so a read-modify-write names the same resource on both halves.
 */
export function getAccountInformation(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT_INFORMATION, {
        pathParams: {account_id: accountId},
        dtoType: Account,
        ...options,
    });
}

/**
 * Retrieve the account's profile image reference.
 *
 * `.map` is `{"account": {"image_uri", "account_id"}}` - a **URI, not image
 * bytes**, and null when the account has no image.
 */
export function getAccountImage(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<AccountImage>> {
    return client.sendGetRequest<AccountImage>(urls.ACCOUNT_IMAGE, {
        pathParams: {account_id: accountId},
        dtoType: AccountImage,
        ...options,
    });
}

/**
 * List an account's contacts.
 *
 * `.map` is the **account** envelope with the contacts on it, not the list
 * envelope and not a bare list.
 */
export function getAccountContacts(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT_CONTACTS, {
        pathParams: {account_id: accountId},
        dtoType: Account,
        ...options,
    });
}

/**
 * List an account's addresses.
 *
 * Each address carries an `"addr_…"` id - what {@link updateAccountAddress} and
 * {@link deleteAccountAddress} take - and five numbered lines.
 */
export function getAccountAddresses(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT_ADDRESSES, {
        pathParams: {account_id: accountId},
        dtoType: Account,
        ...options,
    });
}

/**
 * Retrieve an account's billing preferences.
 *
 * The alignment setting is read and written differently: see
 * `BillingPreferences` and {@link replaceAccountBillingPreferences}.
 */
export function getAccountBillingPreferences(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT_BILLING_PREFERENCES, {
        pathParams: {account_id: accountId},
        dtoType: Account,
        ...options,
    });
}

/**
 * List an account's payment methods.
 *
 * Each carries a `"pm_…"` id - what the update and delete take.
 */
export function getAccountPaymentMethods(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT_PAYMENT_METHODS, {
        pathParams: {account_id: accountId},
        dtoType: Account,
        ...options,
    });
}

/**
 * List an account's inventories.
 *
 * **Not** the list envelope, despite being a listing: unpaged, and the records
 * are one level in under `account`.
 */
export function getAccountInventories(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT_INVENTORIES, {
        pathParams: {account_id: accountId},
        dtoType: Account,
        ...options,
    });
}

/**
 * List an account's partial invoices from quotes.
 *
 * Unpaged, and the key inside does **not** match the path: `.map` is
 * `{"account": {"partial_invoices": [...]}}`.
 */
export function getAccountQuotePartialInvoices(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT_QUOTE_PARTIAL_INVOICES, {
        pathParams: {account_id: accountId},
        dtoType: Account,
        ...options,
    });
}

/**
 * The account's revenue and order counters, under `account_kpis`; the money fields are strings, `"0.00"`.
 *
 * `GET /api/{api_version}/accounts/{account_id}/kpis`
 */
export function getAccountKpis(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<AccountKpis>> {
    return client.sendGetRequest<AccountKpis>(urls.ACCOUNT_KPIS, {
        pathParams: {account_id: accountId},
        dtoType: AccountKpis,
        ...options,
    });
}

/**
 * The account's invoice totals, under `account`, beside its `name`; the money fields are strings.
 *
 * `GET /api/{api_version}/accounts/{account_id}/financial_summary`
 */
export function getAccountFinancialSummary(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse<AccountFinancialSummary>> {
    return client.sendGetRequest<AccountFinancialSummary>(urls.ACCOUNT_FINANCIAL_SUMMARY, {
        pathParams: {account_id: accountId},
        dtoType: AccountFinancialSummary,
        ...options,
    });
}

/**
 * One custom object with this account's instances of it, the `co_` id, under `custom_object`; the instances are paged
 * inside it.
 *
 * `GET /api/{api_version}/accounts/{account_id}/custom_objects/{custom_object_id}`
 */
export function getAccountCustomObject(
    client: ExsitedClient,
    accountId: string,
    customObjectId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountCustomObject>> {
    return client.sendGetRequest<AccountCustomObject>(urls.ACCOUNT_CUSTOM_OBJECT, {
        pathParams: {account_id: accountId, custom_object_id: customObjectId},
        queryParams,
        dtoType: AccountCustomObject,
        ...options,
    });
}

/**
 * One custom object instance, the `coi_` id, under `custom_object_instance`; no typed view.
 *
 * `GET /api/{api_version}/accounts/{account_id}/custom_objects/{custom_object_id}/instances/{custom_object_instance_id}`
 */
export function getAccountCustomObjectInstance(
    client: ExsitedClient,
    accountId: string,
    customObjectId: string,
    customObjectInstanceId: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendGetRequest(urls.ACCOUNT_CUSTOM_OBJECT_INSTANCE_OF, {
        pathParams: {
            account_id: accountId,
            custom_object_id: customObjectId,
            custom_object_instance_id: customObjectInstanceId,
        },
        ...options,
    });
}

/**
 * List a component's objects under an account and its child accounts, the `cmp_` id; cursor paged.
 *
 * `GET /api/{api_version}/accounts/{account_id}/component/{component_id}`
 */
export function getAccountComponentObjects(
    client: ExsitedClient,
    accountId: string,
    componentId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<ComponentObjects>> {
    return client.sendGetRequest<ComponentObjects>(urls.ACCOUNT_COMPONENT_OBJECTS, {
        pathParams: {account_id: accountId, component_id: componentId},
        queryParams,
        dtoType: ComponentObjects,
        ...options,
    });
}

/**
 * One component object under an account, the `cco_` id, under `custom_component_object`.
 *
 * `GET /api/{api_version}/accounts/{account_id}/component/{component_id}/{component_object_id}`
 */
export function getAccountComponentObject(
    client: ExsitedClient,
    accountId: string,
    componentId: string,
    componentObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<AccountComponentObject>> {
    return client.sendGetRequest<AccountComponentObject>(urls.ACCOUNT_COMPONENT_OBJECT, {
        pathParams: {account_id: accountId, component_id: componentId, component_object_id: componentObjectId},
        dtoType: AccountComponentObject,
        ...options,
    });
}

/**
 * Create an account; answered `201`, under `account`. `name` and `type` are required, and `POST /accounts/{account_id}`
 * is a `400`.
 *
 * `POST /api/{api_version}/accounts`
 */
export function createAccount(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPostRequest<Account>(urls.ACCOUNTS, {
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Replace an account, wrapped in `account`. `name` and `type` are required on every call, and a field the body omits is
 * kept, not cleared.
 *
 * `PUT /api/{api_version}/accounts/{account_id}`
 */
export function replaceAccount(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPutRequest<Account>(urls.ACCOUNT, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Retrieve one contact, addressed by its **type**.
 *
 * @param contactType `"billing"`, `"shipping"` or `"primary"` - and **not** its
 *   id. An account holds at most one contact of each type, so the type addresses
 *   it; passing the `"con_…"` id answers 404.
 *
 * `account.contacts` is one object here, not the list {@link getAccountContacts}
 * answers, so this reads as {@link AccountContact} rather than {@link Account}.
 */
export function getAccountContact(
    client: ExsitedClient,
    accountId: string,
    contactType: string,
    options: CallOptions = {},
): Promise<ApiResponse<AccountContact>> {
    return client.sendGetRequest<AccountContact>(urls.ACCOUNT_CONTACT, {
        pathParams: {account_id: accountId, contact_type: contactType},
        dtoType: AccountContact,
        ...options,
    });
}

/**
 * Retrieve one address by its `"addr_…"` id.
 *
 * `account.addresses` is one object here, not the list {@link getAccountAddresses}
 * answers, so this reads as {@link AccountAddress} rather than {@link Account}.
 */
export function getAccountAddress(
    client: ExsitedClient,
    accountId: string,
    addressId: string,
    options: CallOptions = {},
): Promise<ApiResponse<AccountAddress>> {
    return client.sendGetRequest<AccountAddress>(urls.ACCOUNT_ADDRESS, {
        pathParams: {account_id: accountId, address_id: addressId},
        dtoType: AccountAddress,
        ...options,
    });
}

/**
 * Retrieve one payment method by its `"pm_…"` id.
 *
 * This answers **200 with no `payment_methods` key at all** for a method id that does not belong to the account, rather than 404.
 * Check for the key before indexing, and prefer {@link getAccountPaymentMethods}
 * when you want a definite answer.
 */
export function getAccountPaymentMethod(
    client: ExsitedClient,
    accountId: string,
    paymentMethodId: string,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    return client.sendGetRequest<Account>(urls.ACCOUNT_PAYMENT_METHOD, {
        pathParams: {account_id: accountId, payment_method_id: paymentMethodId},
        dtoType: Account,
        ...options,
    });
}

/**
 * List an account's notes.
 *
 * Notes are the sub-resource that *does* answer the list envelope and page.
 */
export function getAccountNotes(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<NoteList>> {
    return client.sendGetRequest<NoteList>(urls.ACCOUNT_NOTES, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: NoteList,
        ...options,
    });
}

/** Retrieve one note by its `"note_…"` id. */
export function getAccountNote(
    client: ExsitedClient,
    accountId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteView>> {
    return client.sendGetRequest<NoteView>(urls.ACCOUNT_NOTE, {
        pathParams: {account_id: accountId, note_id: noteId},
        dtoType: NoteView,
        ...options,
    });
}

/** List the files attached to a note. Each entry is identified by `uuid`, not `id`. */
export function getAccountNoteFiles(
    client: ExsitedClient,
    accountId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteFileList>> {
    return client.sendGetRequest<NoteFileList>(urls.ACCOUNT_NOTE_FILES, {
        pathParams: {account_id: accountId, note_id: noteId},
        dtoType: NoteFileList,
        ...options,
    });
}

/**
 * Retrieve one file attached to a note.
 *
 * Answers the file's JSON descriptor under `file`, not its bytes, and reads as
 * {@link NoteAttachment}, the row type {@link getAccountNoteFiles} lists.
 */
export function getAccountNoteFile(
    client: ExsitedClient,
    accountId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse<NoteAttachment>> {
    return client.sendGetRequest<NoteAttachment>(urls.ACCOUNT_NOTE_FILE, {
        pathParams: {account_id: accountId, note_id: noteId, file_id: fileId},
        dtoType: NoteAttachment,
        ...options,
    });
}

/** List the emails sent to or received from an account. */
export function getAccountEmails(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountCommunicationsEmailList>> {
    return client.sendGetRequest<AccountCommunicationsEmailList>(urls.ACCOUNT_EMAILS, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountCommunicationsEmailList,
        ...options,
    });
}

/** Retrieve one email by its `uuid`. */
export function getAccountEmail(
    client: ExsitedClient,
    accountId: string,
    emailId: string,
    options: CallOptions = {},
): Promise<ApiResponse<AccountCommunicationsEmail>> {
    return client.sendGetRequest<AccountCommunicationsEmail>(urls.ACCOUNT_EMAIL, {
        pathParams: {account_id: accountId, email_id: emailId},
        dtoType: AccountCommunicationsEmail,
        ...options,
    });
}

// The related listings each narrow another resource's listing to one account and
// answer the list envelope. Each names the view the owning family reads from the
// same path; custom objects, which no family lists, read as
// AccountCustomObjectList.

/** List an account's orders. */
export function getAccountOrders(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountOrders>> {
    return client.sendGetRequest<AccountOrders>(urls.ACCOUNT_ORDERS, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountOrders,
        ...options,
    });
}

/** List an account's invoices. */
export function getAccountInvoices(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<InvoiceList>> {
    return client.sendGetRequest<InvoiceList>(urls.ACCOUNT_INVOICES, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: InvoiceList,
        ...options,
    });
}

/** List an account's payments. */
export function getAccountPayments(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountPayments>> {
    return client.sendGetRequest<AccountPayments>(urls.ACCOUNT_PAYMENTS, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountPayments,
        ...options,
    });
}

/** List an account's refunds. */
export function getAccountRefunds(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountRefunds>> {
    return client.sendGetRequest<AccountRefunds>(urls.ACCOUNT_REFUNDS, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountRefunds,
        ...options,
    });
}

/** List an account's credit notes. */
export function getAccountCreditNotes(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<CreditNoteList>> {
    return client.sendGetRequest<CreditNoteList>(urls.ACCOUNT_CREDIT_NOTES, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: CreditNoteList,
        ...options,
    });
}

/** List an account's purchase orders. */
export function getAccountPurchaseOrders(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountPurchaseOrders>> {
    return client.sendGetRequest<AccountPurchaseOrders>(urls.ACCOUNT_PURCHASE_ORDERS, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountPurchaseOrders,
        ...options,
    });
}

/** List an account's purchase invoices. */
export function getAccountPurchaseInvoices(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountPurchaseInvoices>> {
    return client.sendGetRequest<AccountPurchaseInvoices>(urls.ACCOUNT_PURCHASE_INVOICES, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountPurchaseInvoices,
        ...options,
    });
}

/** List an account's purchase payments. */
export function getAccountPurchasePayments(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountPurchasePayments>> {
    return client.sendGetRequest<AccountPurchasePayments>(urls.ACCOUNT_PURCHASE_PAYMENTS, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountPurchasePayments,
        ...options,
    });
}

/** List an account's purchase refunds. */
export function getAccountPurchaseRefunds(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountPurchaseRefunds>> {
    return client.sendGetRequest<AccountPurchaseRefunds>(urls.ACCOUNT_PURCHASE_REFUNDS, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountPurchaseRefunds,
        ...options,
    });
}

/** List an account's custom objects. */
export function getAccountCustomObjects(
    client: ExsitedClient,
    accountId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<AccountCustomObjectList>> {
    return client.sendGetRequest<AccountCustomObjectList>(urls.ACCOUNT_CUSTOM_OBJECTS, {
        pathParams: {account_id: accountId},
        queryParams,
        dtoType: AccountCustomObjectList,
        ...options,
    });
}

// Every POST here is sent with an `X-Idempotency-Key` the client generates, so a
// retry or a 401 replay collapses into the first attempt rather than creating a
// second record. To choose the key - to resume a create whose response never
// arrived - call `client.sendPostRequest` with the path constant and
// `headers: { 'X-Idempotency-Key': saved }`; a caller's own key is left alone.

/**
 * Cancel an account, effective on a date.
 *
 * `POST /api/{api_version}/accounts/{account_id}/cancel`
 *
 * @param payload `{ account: { effective_date: '2026-08-31' } }`, or the JSON
 *   string of it, or `new AccountCancel({ effectiveDate: '2026-08-31' })`.
 *   `effective_date` is `YYYY-MM-DD`; any other format is a 400 with code
 *   `invalid`, since the endpoint does not parse a datetime.
 */
export function cancelAccount(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPostRequest<Account>(urls.ACCOUNT_CANCEL, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Reactivate a cancelled account, the body `cancelAccount` takes; a null `effective_date` means now. Untested against the API.
 *
 * `POST /api/{api_version}/accounts/{account_id}/reactivate`
 */
export function reactivateAccount(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPostRequest<Account>(urls.ACCOUNT_REACTIVATE, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Set the account's portal password.
 *
 * `POST /api/{api_version}/accounts/{account_id}/set-password`
 *
 * @param payload `{ password, confirm_password }` - at the **top level**, not
 *   under an `account` envelope the way {@link cancelAccount}'s body is.
 */
export function setAccountPassword(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPostRequest<Account>(urls.ACCOUNT_SET_PASSWORD, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Update an account's core information.
 *
 * `PATCH /api/{api_version}/accounts/{account_id}/information`
 *
 * A partial update: send only the fields to change. **Writes are flatter than
 * reads** - `currency` and `time_zone` go in as plain strings while the read
 * returns nested objects, so posting a read body back unchanged is a 400.
 * `addresses` and `communication_preference` are refused with code
 * `not_understood`; use {@link createAccountAddresses} instead.
 */
export function updateAccountInformation(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPatchRequest<Account>(urls.ACCOUNT_INFORMATION, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Add contacts to an account; answered `201`. A list under `contacts`, each with its slot as `type` (`CONTACT_1`) in
 * the body.
 *
 * `POST /api/{api_version}/accounts/{account_id}/contacts`
 */
export function createAccountContacts(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPostRequest<Account>(urls.ACCOUNT_CONTACTS, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Add one or more addresses.
 *
 * `POST /api/{api_version}/accounts/{account_id}/addresses`
 *
 * @param payload a **list** under `addresses`, at the top level with no `account`
 *   envelope. `state` and `country` are names, not ids, and the write spelling is
 *   `post_code` where the read returns `postal_code`.
 */
export function createAccountAddresses(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPostRequest<Account>(urls.ACCOUNT_ADDRESSES, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Update one address.
 *
 * @param payload one address under a **singular** `address` key, not the plural
 *   `addresses` that {@link createAccountAddresses} takes.
 */
export function updateAccountAddress(
    client: ExsitedClient,
    accountId: string,
    addressId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPatchRequest<Account>(urls.ACCOUNT_ADDRESS, {
        pathParams: {account_id: accountId, address_id: addressId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Replace one address, under a singular `address`; `address_line_1` and `country` are required.
 *
 * `PUT /api/{api_version}/accounts/{account_id}/addresses/{address_id}`
 */
export function replaceAccountAddress(
    client: ExsitedClient,
    accountId: string,
    addressId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPutRequest<Account>(urls.ACCOUNT_ADDRESS, {
        pathParams: {account_id: accountId, address_id: addressId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Update one contact, leaving unsent fields alone.
 *
 * The name fields are written and read differently: this takes flat
 * `first_name`/`middle_name`/`last_name`, while the read returns them nested
 * under `name` as `first`/`middle`/`last`.
 */
export function updateAccountContact(
    client: ExsitedClient,
    accountId: string,
    contactType: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPatchRequest<Account>(urls.ACCOUNT_CONTACT, {
        pathParams: {account_id: accountId, contact_type: contactType},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Replace one contact wholesale.
 *
 * The `PUT` counterpart of {@link updateAccountContact}, with the usual
 * difference: a field the payload omits is **cleared**, not left alone.
 */
export function replaceAccountContact(
    client: ExsitedClient,
    accountId: string,
    contactType: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPutRequest<Account>(urls.ACCOUNT_CONTACT, {
        pathParams: {account_id: accountId, contact_type: contactType},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Replace an account's billing preferences.
 *
 * `billing_start_date` is an **enum**, not a date - `"DAY_OF_MONTH"` and the
 * like. A calendar date is a 400 with code `matches_invalid`, which reads as a
 * formatting complaint and is really a type one.
 */
export function replaceAccountBillingPreferences(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPutRequest<Account>(urls.ACCOUNT_BILLING_PREFERENCES, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Add one payment method; answered `201`. One object under `payment_method`, not a list; the first method becomes the
 * default.
 *
 * `POST /api/{api_version}/accounts/{account_id}/payment_methods`
 */
export function createAccountPaymentMethod(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPostRequest<Account>(urls.ACCOUNT_PAYMENT_METHODS, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/** Update one payment method. */
export function updateAccountPaymentMethod(
    client: ExsitedClient,
    accountId: string,
    paymentMethodId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPatchRequest<Account>(urls.ACCOUNT_PAYMENT_METHOD, {
        pathParams: {account_id: accountId, payment_method_id: paymentMethodId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Replace one payment method; `name` is required, and `processor_type` and `payment_processor` are refused.
 *
 * `PUT /api/{api_version}/accounts/{account_id}/payment_methods/{payment_method_id}`
 */
export function replaceAccountPaymentMethod(
    client: ExsitedClient,
    accountId: string,
    paymentMethodId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPutRequest<Account>(urls.ACCOUNT_PAYMENT_METHOD, {
        pathParams: {account_id: accountId, payment_method_id: paymentMethodId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Attach a note to an account.
 *
 * **This endpoint is form-encoded, not JSON**, as is {@link updateAccountNote};
 * no other write in the family is. The note text travels as a form field named
 * `note`, which is why this takes the text directly rather than a payload
 * object: there is no JSON envelope to build.
 *
 * @param note the content, sent as the `note` field. HTML is accepted and comes
 *   back as written.
 * @param options `files` attaches uploads, sent with the note as one multipart body.
 */
export function createAccountNote(
    client: ExsitedClient,
    accountId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<NoteView>> {
    requireNote(note);
    return client.sendPostRequest<NoteView>(urls.ACCOUNT_NOTES, {
        pathParams: {account_id: accountId},
        formData: {note},
        dtoType: NoteView,
        ...options,
    });
}

/**
 * Update a note's content. Form-encoded, like {@link createAccountNote}.
 *
 * @param options `files` attaches uploads, sent with the note as one multipart body.
 */
export function updateAccountNote(
    client: ExsitedClient,
    accountId: string,
    noteId: string,
    note: string,
    options: CallOptions & {files?: MultipartFiles | undefined} = {},
): Promise<ApiResponse<NoteView>> {
    requireNote(note);
    return client.sendPatchRequest<NoteView>(urls.ACCOUNT_NOTE, {
        pathParams: {account_id: accountId, note_id: noteId},
        formData: {note},
        dtoType: NoteView,
        ...options,
    });
}

/**
 * Set the account's profile image.
 *
 * **Base64 in a JSON body, not a multipart upload** - unlike the note endpoints.
 * Encode the bytes yourself:
 *
 * @example
 * const encoded = readFileSync('logo.png').toString('base64');
 * await accounts.uploadAccountImage(client, 'W13ZGY', { image_base64: encoded });
 */
export function uploadAccountImage(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPostRequest<Account>(urls.ACCOUNT_IMAGE, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Create a custom object instance on an account, the schema's `co_` id. Answers `custom_object_instance`, with no
 * typed view. Untested against the API.
 *
 * `POST /api/{api_version}/accounts/{account_id}/custom_objects/{custom_object_id}`
 */
export function createAccountCustomObjectInstance(
    client: ExsitedClient,
    accountId: string,
    customObjectId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse> {
    requirePayload(payload);
    return client.sendPostRequest(urls.ACCOUNT_CUSTOM_OBJECT, {
        pathParams: {account_id: accountId, custom_object_id: customObjectId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * Update a custom object instance, the instance's `coi_` id; answered with the account. Untested against the
 * API.
 *
 * `PATCH /api/{api_version}/accounts/{account_id}/custom_objects_instances/{custom_object_instance_id}`
 */
export function updateAccountCustomObjectInstance(
    client: ExsitedClient,
    accountId: string,
    customObjectInstanceId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<Account>> {
    requirePayload(payload);
    return client.sendPatchRequest<Account>(urls.ACCOUNT_CUSTOM_OBJECT_INSTANCE, {
        pathParams: {account_id: accountId, custom_object_instance_id: customObjectInstanceId},
        jsonBody: payload,
        dtoType: Account,
        ...options,
    });
}

/**
 * Send an email and log it on the account; `to`, `subject`, `body`, `cc` and `bcc` with no envelope. It sends real
 * mail; untested against the API, and no typed view.
 *
 * `POST /api/{api_version}/accounts/{account_id}/communications/emails`
 */
export function sendAccountEmail(
    client: ExsitedClient,
    accountId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse> {
    requirePayload(payload);
    return client.sendPostRequest(urls.ACCOUNT_EMAILS, {
        pathParams: {account_id: accountId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * Purge an account and its records permanently; `204`, no body sent. There is no undo. Untested against the API.
 *
 * `POST /api/{api_version}/accounts/{account_id}/purge`
 */
export function purgeAccount(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendPostRequest(urls.ACCOUNT_PURGE, {
        pathParams: {account_id: accountId},
        ...options,
    });
}

/**
 * Delete an account.
 *
 * A **409** here means the account is locked - one with orders, invoices or
 * payments against it cannot be deleted, and the API answers `"Account has been
 * locked, this action cannot be performed"` with code `internal_error`. That is a
 * business rule, not a server fault despite how the code reads: check
 * `error.errorCode` rather than treating the 409 as retryable.
 */
export function deleteAccount(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendDeleteRequest(urls.ACCOUNT, {
        pathParams: {account_id: accountId},
        ...options,
    });
}

/** Delete one contact, addressed by its type. */
export function deleteAccountContact(
    client: ExsitedClient,
    accountId: string,
    contactType: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendDeleteRequest(urls.ACCOUNT_CONTACT, {
        pathParams: {account_id: accountId, contact_type: contactType},
        ...options,
    });
}

/** Delete one address. */
export function deleteAccountAddress(
    client: ExsitedClient,
    accountId: string,
    addressId: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendDeleteRequest(urls.ACCOUNT_ADDRESS, {
        pathParams: {account_id: accountId, address_id: addressId},
        ...options,
    });
}

/** Delete one payment method. */
export function deleteAccountPaymentMethod(
    client: ExsitedClient,
    accountId: string,
    paymentMethodId: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendDeleteRequest(urls.ACCOUNT_PAYMENT_METHOD, {
        pathParams: {account_id: accountId, payment_method_id: paymentMethodId},
        ...options,
    });
}

/** Delete one note. */
export function deleteAccountNote(
    client: ExsitedClient,
    accountId: string,
    noteId: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendDeleteRequest(urls.ACCOUNT_NOTE, {
        pathParams: {account_id: accountId, note_id: noteId},
        ...options,
    });
}

/**
 * Delete one note attachment, the attachment's `uuid`.
 *
 * `DELETE /api/{api_version}/accounts/{account_id}/notes/{note_id}/files/{file_id}`
 */
export function deleteAccountNoteFile(
    client: ExsitedClient,
    accountId: string,
    noteId: string,
    fileId: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendDeleteRequest(urls.ACCOUNT_NOTE_FILE, {
        pathParams: {account_id: accountId, note_id: noteId, file_id: fileId},
        ...options,
    });
}

/** Remove the account's profile image. Answers 204, so `.map` is null. */
export function deleteAccountImage(
    client: ExsitedClient,
    accountId: string,
    options: CallOptions = {},
): Promise<ApiResponse> {
    return client.sendDeleteRequest(urls.ACCOUNT_IMAGE, {
        pathParams: {account_id: accountId},
        ...options,
    });
}
