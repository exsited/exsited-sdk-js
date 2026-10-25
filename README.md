# Exsited TypeScript SDK

A Node.js client for the Exsited **v4** REST API, written in TypeScript and shipped as
ESM and CommonJS from one package.

The SDK owns the parts of API integration that are tedious to get right and expensive to get
wrong: obtaining and renewing OAuth2 tokens, caching them safely across processes, replaying a
request whose token died mid-flight, backing off correctly under load, and keeping credentials out
of every log line, printed exchange and stack trace. What it deliberately does not own is your
data: request and response bodies cross the wire exactly as you wrote them. Typed views over those
bodies are available when you want them, and they are a **view**: they never rewrite the wire and
never add a value that did not arrive.

It runs on Node's own built-ins with **zero runtime dependencies**, so adding it introduces no
transitive supply chain and nothing to audit but this package.

It covers **91 resource families and 864 endpoints**, one function each, and one endpoint has a second in another family. 83 families carry typed views,
typed from the bodies the live API sends. 8 carry none, `abaFiles`, `alertResponsibilities`, `attributeAttachments`,
`communications`, `organisations`, `proformaInvoices`, `reconciliations` and `webhooks`, because none of their
endpoints has a body of known type. The SDK speaks **v4**: the token comes from
`/api/v4/oauth2/token`, and every endpoint is sent on the client's version, v4.

Every endpoint, with its request and response bodies, is documented at
[exsited.mintlify.app](https://exsited.mintlify.app/introduction).

---

## Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
    - [Types](#types)
    - [What is importable](#what-is-importable)
- [Quick start](#quick-start)
- [Configuring credentials](#configuring-credentials)
    - [One instance](#one-instance)
    - [Several instances](#several-instances)
    - [Where the token is cached](#where-the-token-is-cached)
- [Making requests](#making-requests)
    - [Two call styles](#two-call-styles)
    - [Query parameters](#query-parameters)
    - [Filtering, sorting and expand](#filtering-sorting-and-expand)
    - [Sending a body: three forms](#sending-a-body-three-forms)
    - [Reading a response: four members](#reading-a-response-four-members)
    - [Choosing the form: four tiers, highest wins](#choosing-the-form-four-tiers-highest-wins)
    - [Typed views](#typed-views)
    - [Handling failure](#handling-failure)
    - [Pagination](#pagination)
    - [Idempotency](#idempotency)
    - [File uploads and downloads](#file-uploads-and-downloads)
    - [Calling an endpoint the SDK has no method for](#calling-an-endpoint-the-sdk-has-no-method-for)
- [Accounts endpoints](#accounts-endpoints)
- [Items endpoints](#items-endpoints)
- [Invoices endpoints](#invoices-endpoints)
- [Aba files endpoints](#aba-files-endpoints)
- [Account emails endpoints](#account-emails-endpoints)
- [Account groups endpoints](#account-groups-endpoints)
- [Accounting codes endpoints](#accounting-codes-endpoints)
- [Action scripts endpoints](#action-scripts-endpoints)
- [Additional codes endpoints](#additional-codes-endpoints)
- [Alert responsibilities endpoints](#alert-responsibilities-endpoints)
- [Alert responsibility endpoints](#alert-responsibility-endpoints)
- [Alerts endpoints](#alerts-endpoints)
- [Applications endpoints](#applications-endpoints)
- [Approval profiles endpoints](#approval-profiles-endpoints)
- [Approval user groups endpoints](#approval-user-groups-endpoints)
- [Approvals endpoints](#approvals-endpoints)
- [Attribute attachments endpoints](#attribute-attachments-endpoints)
- [Billing periods endpoints](#billing-periods-endpoints)
- [Bookings endpoints](#bookings-endpoints)
- [Charging periods endpoints](#charging-periods-endpoints)
- [Communication profiles endpoints](#communication-profiles-endpoints)
- [Communications endpoints](#communications-endpoints)
- [Countries endpoints](#countries-endpoints)
- [Credit note applications endpoints](#credit-note-applications-endpoints)
- [Credit notes endpoints](#credit-notes-endpoints)
- [Custom attributes endpoints](#custom-attributes-endpoints)
- [Custom components endpoints](#custom-components-endpoints)
- [Custom events endpoints](#custom-events-endpoints)
- [Custom features endpoints](#custom-features-endpoints)
- [Custom fields endpoints](#custom-fields-endpoints)
- [Custom forms endpoints](#custom-forms-endpoints)
- [Day of month endpoints](#day-of-month-endpoints)
- [Departments endpoints](#departments-endpoints)
- [Designations endpoints](#designations-endpoints)
- [Document templates endpoints](#document-templates-endpoints)
- [Email templates endpoints](#email-templates-endpoints)
- [Employees endpoints](#employees-endpoints)
- [Events endpoints](#events-endpoints)
- [Express endpoints](#express-endpoints)
- [External databases endpoints](#external-databases-endpoints)
- [Fulfillment profiles endpoints](#fulfillment-profiles-endpoints)
- [Fulfillment terms endpoints](#fulfillment-terms-endpoints)
- [Gift certificates endpoints](#gift-certificates-endpoints)
- [Integration connections endpoints](#integration-connections-endpoints)
- [Inventory adjustments endpoints](#inventory-adjustments-endpoints)
- [Invoice terms endpoints](#invoice-terms-endpoints)
- [Item fulfillments endpoints](#item-fulfillments-endpoints)
- [Item receipts endpoints](#item-receipts-endpoints)
- [Labours endpoints](#labours-endpoints)
- [Milestones endpoints](#milestones-endpoints)
- [Note attachments endpoints](#note-attachments-endpoints)
- [Note groups endpoints](#note-groups-endpoints)
- [Orders endpoints](#orders-endpoints)
- [Organisation endpoints](#organisation-endpoints)
- [Organisations endpoints](#organisations-endpoints)
- [Payments endpoints](#payments-endpoints)
- [Portals endpoints](#portals-endpoints)
- [Pricing periods endpoints](#pricing-periods-endpoints)
- [Proforma invoices endpoints](#proforma-invoices-endpoints)
- [Purchase credit note applications endpoints](#purchase-credit-note-applications-endpoints)
- [Purchase credit notes endpoints](#purchase-credit-notes-endpoints)
- [Purchase express endpoints](#purchase-express-endpoints)
- [Purchase invoices endpoints](#purchase-invoices-endpoints)
- [Purchase orders endpoints](#purchase-orders-endpoints)
- [Purchase payments endpoints](#purchase-payments-endpoints)
- [Purchase refunds endpoints](#purchase-refunds-endpoints)
- [Quote orders endpoints](#quote-orders-endpoints)
- [Receive terms endpoints](#receive-terms-endpoints)
- [Reconciliations endpoints](#reconciliations-endpoints)
- [Refunds endpoints](#refunds-endpoints)
- [Rental assets endpoints](#rental-assets-endpoints)
- [Reports endpoints](#reports-endpoints)
- [Return merchandise authorisations endpoints](#return-merchandise-authorisations-endpoints)
- [Return vendor authorizations endpoints](#return-vendor-authorizations-endpoints)
- [Roles endpoints](#roles-endpoints)
- [Sales reps endpoints](#sales-reps-endpoints)
- [Salutations endpoints](#salutations-endpoints)
- [Settings endpoints](#settings-endpoints)
- [Settings workflows endpoints](#settings-workflows-endpoints)
- [Shipping packages endpoints](#shipping-packages-endpoints)
- [Shipping rules endpoints](#shipping-rules-endpoints)
- [System events endpoints](#system-events-endpoints)
- [Tasks endpoints](#tasks-endpoints)
- [Teams endpoints](#teams-endpoints)
- [Time periods endpoints](#time-periods-endpoints)
- [Timesheets endpoints](#timesheets-endpoints)
- [Uom endpoints](#uom-endpoints)
- [Usages endpoints](#usages-endpoints)
- [Webhooks endpoints](#webhooks-endpoints)
- [Workflows endpoints](#workflows-endpoints)
- [Zones endpoints](#zones-endpoints)
- [Configuration reference](#configuration-reference)
    - [Setting options at three levels](#setting-options-at-three-levels)
    - [Every option](#every-option)
- [Errors](#errors)
- [Logging](#logging)
- [Debugging a call](#debugging-a-call)
- [Concurrency](#concurrency)
    - [If the token expires mid-batch](#if-the-token-expires-mid-batch)
- [Security](#security)
- [Extending the SDK](#extending-the-sdk)
- [How it works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [Licence](#licence)

---

## Requirements

- **Node.js 18.17 or newer**, the floor declared in `engines.node` in `package.json`; developed
  and tested on Node 24. `npm` ships with Node. Check with `node --version`.
- ESM or CommonJS. `import` resolves `dist/esm` and `require` resolves `dist/cjs`, each with its
  own declarations.
- No runtime dependencies.

## Installation

```bash
npm install exsited
```

### Types

The type declarations ship in the package, beside each build: `dist/esm` and `dist/cjs` each carry
their own `.d.ts`, so there is nothing to add from `@types`. They are emitted from the source the
SDK is written in, compiled in strict mode with `exactOptionalPropertyTypes` and
`noUncheckedIndexedAccess`.

### What is importable

Every module of the public surface is reachable on its own subpath, and the set is enumerated in
`package.json` rather than matched by a wildcard: the package root, the 18 base modules and the 274
resource modules, each with an `import` and a `require` condition and its own `types`.

```ts
import {SdkConfig} from 'exsited/config/sdkConfig';
import {getOrders} from 'exsited/resources/orders/orders';
import {ORDERS, ORDERS_KEY} from 'exsited/resources/orders/ordersUrls';
```

The package root re-exports every base module whole, and each family as three namespaces:
`orders`, `ordersUrls` and `ordersDto`.

## Quick start

```ts
import {AuthConfig, ExsitedClient, SdkConfig} from 'exsited';

const client = new ExsitedClient(
    new SdkConfig(
        new AuthConfig({
            clientName: 'default',
            baseUrl: 'https://dev-api.exsited.com',
            clientId: process.env.EXSITED_CLIENT_ID!,
            clientSecret: process.env.EXSITED_CLIENT_SECRET!,
            redirectUri: 'https://dev.exsited.com/',
        }),
    ),
);

try {
    const response = await client.accounts.getAccounts({limit: 50});
    if (response.succeeded) {
        for (const account of response.dto?.data ?? []) {
            console.log(account?.id, account?.name);
        }
    } else {
        console.error(response.statusCode, response.errorCode, response.getErrorMessages());
    }
} finally {
    await client.closeClient();
}
```

Three things worth noticing:

1. **No token handling.** The first call fetches one, caches it, and renews it before it expires.
   You never see it.
2. **A failure is a value, not a throw.** `response.succeeded` is the branch. Set
   `raiseOnError: true` if you prefer exceptions.
3. **Always `closeClient()`.** It waits for the calls in flight, releases the connection pool and
   any log file, and latches the client closed: a call made afterwards raises `SdkUsageError`
   before any I/O. Calling it twice is harmless. Build one client and share it; do not build one
   per request.

## Configuring credentials

### One instance

`AuthConfig` takes five required fields and two optional ones. It validates at construction and
reports **every** problem at once, not just the first, and it never echoes a value back.

| Field            | Required | Notes                                                            |
| ---------------- | -------- | ---------------------------------------------------------------- |
| `clientName`     | yes      | Label for selection and logging. Usually `'default'`.            |
| `baseUrl`        | yes      | Instance origin, such as `https://dev-api.exsited.com`. No path. |
| `clientId`       | yes      |                                                                  |
| `clientSecret`   | yes      | Masked by `toString` and `toJSON`, and redacted in all output.   |
| `redirectUri`    | yes      | Sent in the `client_credentials` token request.                  |
| `grantType`      |          | Default `'client_credentials'`.                                  |
| `tokenCachePath` |          | See [below](#where-the-token-is-cached).                         |

There is no fifth credential field such as `authString`. Exsited's token endpoint takes the four
fields above and nothing else. An extra field is left out because it means nothing here, **not**
because sending it would fail: probed against dev, the four fields answer `200`, and so do the
four plus `auth_string`, plus a nonsense field, and plus a blank one.

The SDK never reads a credential from the environment. Node has a built-in `.env` loader if you
want one:

```ts
process.loadEnvFile('.env'); // Node 20.6 or newer, no dependency needed
```

A starting point, with the variable names the examples here use:

```bash
EXSITED_BASE_URL=https://dev-api.exsited.com
EXSITED_CLIENT_ID=
EXSITED_CLIENT_SECRET=
EXSITED_REDIRECT_URI=https://dev.exsited.com/
```

### Several instances

Register your instances once at start-up, then ask for one by name or position.

```ts
import {AuthConfig, buildClient, registerInstances} from 'exsited';

registerInstances([
    new AuthConfig({clientName: 'live', baseUrl: '...' /* ... */}),
    new AuthConfig({clientName: 'staging', baseUrl: '...' /* ... */}),
]);

const live = await buildClient(); // the first registered
const staging = await buildClient('staging'); // by clientName
const second = await buildClient(1); // by position; -1 is the last
const loud = await buildClient(0, {printApiInfo: true}); // with overrides
```

`buildClient(instance, settings)` is the usual way in: it selects the instance and applies any
`SdkConfig` setting beside it. Pass `credentials` in the settings to build from a list without
registering one. A block may be an `AuthConfig`, an `SdkConfig`, or a plain object of config
fields. `ClientRegistry` holds several instances open at once, builds each client on first use,
and `closeAllClients()` closes the ones it built while leaving a client passed to `addClient`
open.

### Where the token is cached

`tokenCachePath` is three-way:

| Value     | Behaviour                                         |
| --------- | ------------------------------------------------- |
| _omitted_ | The platform's per-user cache file (**default**). |
| a path    | That file.                                        |
| `null`    | Memory only, nothing on disk.                     |

The default resolves to:

```
Windows   %LOCALAPPDATA%\exsited\exsited_ts_token.json
macOS     ~/Library/Caches/exsited/exsited_ts_token.json
Linux     $XDG_CACHE_HOME/exsited/exsited_ts_token.json  (else ~/.cache/...)
```

One file is safe to share between instances and between processes: entries are keyed by a
fingerprint of the credentials, so identical credentials authenticate once and any difference gets
its own entry.

`FileTokenStore` guards the file with a sidecar `<cache path>.lock`, created exclusively so exactly
one process gets it. That is not an OS lock: nothing releases it when the holder dies, so the file
carries a **stamp** naming the holder (pid, host, timestamp and a serial), and a lock is taken over
early when the stamp names this host and that pid is gone. The pid is asked only when the host
matches, because a pid means nothing on another machine; the mtime gate at 30 seconds covers
everything the pid cannot answer. A release removes the lock only while it still carries this
holder's own stamp. The lock covers the **write**, not the grant: concurrent processes may still
mint one token each, and what they cannot do is overwrite each other's entry.

If the lock cannot be taken, the SDK carries on within this process alone rather than failing your
API call, and says so through `store.crossProcessLockingDegraded` and a one-time
`ExsitedTokenLockWarning`:

```ts
const store = new FileTokenStore(buildDefaultTokenCachePath());
// ... after a call
if (store.crossProcessLockingDegraded !== null) {
    console.warn(`token cache not coordinating: ${store.crossProcessLockingDegraded}`);
}
```

## Making requests

### Two call styles

Both work, and they are the same function:

```ts
import {accounts} from 'exsited';

await accounts.getAccount(client, 'W13ZGY'); // explicit, client first
await client.accounts.getAccount('W13ZGY'); // client pre-bound
```

`client.accounts` is a declared getter, one per family, so the pre-bound style type-checks; a
family you register yourself with `registerResourceModule` is resolved by a `Proxy` trap instead. A
misspelt family or endpoint throws `SdkAttributeError` naming the nearest real one, where you wrote
it, rather than answering `undefined` and failing later. `client.listResourceNames()` lists every
family.

### Query parameters

Pass a plain object as `queryParams`. **Names are never touched**: the SDK converts no case,
because guessing wrong is a silent `400` rather than an error.

```ts
await client.accounts.getAccounts({limit: 50, direction: 'desc'});
// GET /api/v4/accounts?limit=50&direction=desc
```

**Values** are normalised so you can pass the natural JavaScript type:

| You pass                        | On the wire                          | Note                                      |
| ------------------------------- | ------------------------------------ | ----------------------------------------- |
| `{limit: 50}`                   | `limit=50`                           | numbers pass through                      |
| `{active: true}`                | `active=true`                        | never `True`                              |
| `{since: new Date(0)}`          | `since=1970-01-01T00%3A00%3A00.000Z` | ISO 8601, then URL-encoded                |
| `{ids: [1, 2, 3]}`              | `ids=1&ids=2&ids=3`                  | the name repeats, once per entry          |
| `{ids: new Set([1, 2])}`        | `ids=1&ids=2`                        | any iterable works                        |
| `{id: 10n}`                     | `id=10`                              | a BigInt renders as its digits            |
| `{skip: null, gone: undefined}` | _nothing_                            | dropped, not sent empty                   |
| `{q: ''}`                       | `q=`                                 | an empty string is a value; `null` is not |

What is **refused**, with an `SdkUsageError` before anything is sent: a nested object or `Map` as a
value, an invalid `Date`, a sequence inside a sequence, and a value that contains itself. A `Map`
of parameters is accepted at the top level. A parameter the path already carries is refused rather
than doubled. There is no allow-list of names in the generic send, so a parameter the API adds
tomorrow can be passed today; the trade is that a typo is sent as written.

### Filtering, sorting and expand

```ts
import {accounts, filterParam, sortParam} from 'exsited';

await accounts.getAccounts(client, {
    limit: 50,
    [filterParam('status')]: 'ACTIVE', // filter_status
    [filterParam('created_on', 'gte')]: '2026-04-01', // filter_created_on_gte
    sort: sortParam('created_on', 'desc'), // -created_on
});
```

Equality carries **no** suffix (`filter_status`, never `filter_status_eq`, which the API refuses),
and that single irregularity is why `filterParam` exists. The other operators are suffixes: `neq`,
`contains`, `not_contains`, `starts_with`, `gt`, `gte`, `lt`, `lte`, the presence operators `has_value` and
`does_not_have_value`, and the list operators `in` and `nin`, whose value `filterValues` builds. A
field inside a nested block is not reachable this way at all; it takes the single `filter`
expression, which goes through as written:

```ts
{
    filter: "items/sale(pricing/latest_used_pricing_version) eq '1'";
}
```

**Sorting is spelled two ways and they are not interchangeable.** `sort` with a `-` prefix for
descending covers Account, Accounting Codes, Alert, Integration Connections and Inventory
Adjustments; `order_by` plus `direction` covers Item, Order, Usage, Purchase Order and Return
Merchandise Authorisation, and `items.sortParams('id', true)` builds that pair. Item Fulfillment is
documented with both and is unverified. Sending a family the other
spelling is **not** an error: it is accepted and silently ignored, so the listing comes back
unsorted with a `200`. `SortDirection.ASC` and `SortDirection.DESC` are exported for the direction.

`accountsUrls`, `invoicesUrls` and `itemsUrls` also export the listing's accepted query names and
filter fields, read off the SDK's endpoint definitions. `items.FILTERABLE_FIELDS` and
`items.DEPRECATED_FILTERS` are sets, and `items.itemFilterParam` refuses the 20 deprecated
nested-block filters locally.

`expand=all` on `GET /settings` is the only expand in v4, and passes straight through like any
other name.

### Sending a body: three forms

The same function takes all three:

```ts
import {accounts, accountsDto} from 'exsited';

await accounts.cancelAccount(client, 'W13ZGY', {account: {effective_date: '2026-08-31'}});
await accounts.cancelAccount(client, 'W13ZGY', '{"account": {"effective_date": "2026-08-31"}}');
await accounts.cancelAccount(client, 'W13ZGY', new accountsDto.AccountCancel({effectiveDate: '2026-08-31'}));
```

A **JSON string crosses byte for byte**: parsed only to verify it, never to rewrite it, so a body
pasted out of Postman keeps its spacing and key order all the way to the wire. Invalid JSON, or
JSON holding a bare scalar, is refused before any request goes out. A **DTO** is asked for its
object and travels the object path from there; only fields you set are sent, under their snake_case
wire names and inside the type's envelope. A write whose body is required refuses a `null` or
`undefined` payload before any I/O.

### Reading a response: four members

```ts
response.map; // ALWAYS the decoded body
response.json; // ALWAYS the API's own body text, not a re-serialisation
response.dto; // ALWAYS the typed view, when the endpoint names one
response.data; // the only one responseFormat moves; defaults to .map
```

All three are available at once, so one codebase can mix them freely. A binary body (a note
attachment, a PDF) has no text and `.json` is `null` rather than mojibake, while `.map` is the
bytes. `.dto` knows its type because the endpoint names it: `getAccounts` yields an `AccountList`,
`getAccount` an `Account`. An endpoint that names no view answers `.dto` as `null`.

Beside them: `statusCode`, `succeeded`, `errorType`, `headers`, `contentType`, `requestInfo`, and
the v4 error envelope's own accessors, `errorCode`, `requestId`, `docUrl`, `getErrorMessages()`
and `getFieldErrors()`. A body with `object: "error"` is never a success, whatever its status.

### Choosing the form: four tiers, highest wins

`responseFormat` resolves through **four tiers, highest first**: the call, the client's config, the
`EXSITED_RESPONSE_FORMAT` environment variable, then `'map'`. The environment sits _below_ code
deliberately: a project-wide variable that could override a format written at a call site would
silently change behaviour the source spells out. Case and surrounding whitespace are ignored, a
blank variable counts as unset, and an unrecognised value is refused, never quietly downgraded.

```ts
const client = await buildClient(0, {responseFormat: 'dto'});
const asDto = await client.accounts.getAccounts({limit: 1}); // data is an AccountList
const asMap = await client.accounts.getAccounts({limit: 1}, {responseFormat: 'map'}); // data is the object
```

### Typed views

Each view is a `Dto` subclass: `FIELDS` maps each camelCase property to its type, and the wire key
is its snake_case, so `createdOn` reads `created_on`.

```ts
export class Reference extends Dto {
    static override ENVELOPE_KEY = 'reference';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        createdOn: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    createdOn = this.declared<string | null>('createdOn');
}

sealDtoSchema(Reference);
```

The scalar types are `'int'`, `'float'`, `'string'`, `'boolean'` and `'any'`; `dtoList(Type)` is a
list, `dtoOneOf(a, b)` takes a key the API sends as either type, and another `Dto` subclass is a
nested block. `ENVELOPE_KEY` is unwrapped on read and put back
on write, `TOP_LEVEL` names the fields that sit beside the envelope, and `WIRE_NAMES` spells a wire
key that is not the snake_case of its name, which is how v4's camelCase `primaryId` is declared.
`Type.fromMap(body)` reads a decoded body into an instance, `new Type({...})` builds a payload and
refuses a field the type does not declare, and `Type.fields()` lists each field against its wire
key.

**A DTO converts nothing.** A value that is not the declared type reads `null` rather than being
turned into it. When a typed field reads `null` and you expected otherwise, look at `.map`, which
is the only thing that can tell an absent key from one sent as `null`. Every field's type is the type
the API sends, and a field that is always `null` is left `'any'`.

### Handling failure

Two styles. Pick per client, or per call.

```ts
// Returned value (the default)
const response = await client.accounts.getAccount('W13ZGY');
if (!response.succeeded) {
    console.error(response.statusCode, response.errorCode, response.requestId);
}

// Thrown exception
try {
    await client.accounts.getAccount('W13ZGY', {raiseOnError: true});
} catch (error) {
    if (error instanceof SdkError) {
        console.error(error.statusCode, error.errorCode, error.requestId);
        console.error(error.explain()); // structural: the shape of the failure, no values
    } else throw error;
}
```

Some failures **always** throw, because there is no response to hand back: a connection failure,
a timeout, and a rejected token request.

### Pagination

Two async generators, both lazy: `break` stops the requests too.

```ts
import {accountsUrls, filterParam, iterPages, iterRecords} from 'exsited';

for await (const page of iterPages(client, accountsUrls.ACCOUNTS, {queryParams: {limit: 100}, maxPages: 5})) {
    console.log(page.statusCode);
}

for await (const account of iterRecords(client, accountsUrls.ACCOUNTS, {
    queryParams: {limit: 100, [filterParam('status')]: 'ACTIVE'},
})) {
    console.log(account);
}
```

v4 serves **two** paging shapes, and both are read off each page rather than configured:
`has_more`/`next_cursor`, and `records`/`offset`/`next_page`. Two traps in the offset shape, both
handled:

- **`next_page` is the literal string `"NULL"`** at the end of a listing, more often than a real
  `null`. A truthiness test follows it as a link.
- **A `next_page` link can point at another path.** So the walker re-sends the request with an
  incremented `offset` rather than following the link at all.

`queryParams` is re-sent with every page, because a cursor or offset identifies a position within
one particular filtered listing, and `iterPages` owns `cursor` and `offset`: passing either is an
`SdkUsageError`. A failed page raises by default, and a server that hands back the same cursor or
offset twice raises rather than looping. `recordKey` defaults to `'data'`, which all 33 families
that export a `RECORD_KEY` use. Pass another key as the third argument or as `options.recordKey`;
giving both is an `SdkUsageError`:

```ts
for await (const account of iterRecords(client, accountsUrls.ACCOUNTS, 'data', {queryParams: {limit: 100}})) {
    console.log(account);
}
```

### Idempotency

`POST` carries an `X-Idempotency-Key` the client generates, **once per call, not per attempt**, so
the transport's retry and the `401` refresh-and-replay send the same one. A per-attempt key would
look right and do nothing. Only `POST`: the others are idempotent by definition. Pass your own in
`headers` to resume an interrupted create; it is left alone whatever its capitalisation.

### File uploads and downloads

Downloads that are not JSON stay bytes:

```ts
const response = await orders.getOrderPdf(client, 'ORD-1');
fs.writeFileSync('order.pdf', response.map as Uint8Array); // .json is null for a binary body
```

**A note can carry files.** Every note create and update takes the note text and `files` in its
options: `createAccountNote` and `updateAccountNote` in `accounts`, `createItemNote`,
`updateItemNote`, `createInvoiceNote`, `createOrderNote`, `updateOrderNote`, `createPaymentNote`,
`createPurchaseInvoiceNote`, `updatePurchaseInvoiceNote`, `createPurchaseOrderNote`,
`createPurchasePaymentNote`, `createItemFulfillmentNote` and `createTaskNote`. Without files the note
goes as a form field (`createInvoiceNote` sends JSON); with files each sends the note and the uploads
as one `multipart/form-data` body. An upload is a `Uint8Array`, an `ArrayBuffer`, a
`Blob` or a `[filename, content, contentType?]` tuple, keyed by part name in an object, a `Map` or
an array of pairs:

```ts
await items.createItemNote(client, 'ITEM-1', 'see attached', {
    files: {file: ['spec.pdf', bytes, 'application/pdf']},
});
```

The body is weighed against `maxUploadBytes` whole, framing included, before any `Blob` in it is
read, and it is encoded once per call, before the token grant, so a retry and the `401` replay
repeat the same bytes. A CR, LF or NUL in a part name, filename or content type is refused before
the grant, which is what stops a forwarded filename forging a part header.

### Calling an endpoint the SDK has no method for

The five verbs are public. Path templates use `{name}` placeholders, and `{api_version}` fills
itself from config.

```ts
const response = await client.sendGetRequest('/api/{api_version}/orders/{order_id}', {
    pathParams: {order_id: 'ORD-1'},
});

await client.sendPostRequest('/api/{api_version}/orders', {
    jsonBody: {order: {account_id: 'W13ZGY'}},
});
```

Options: `pathParams`, `queryParams`, `jsonBody`, `formData`, `files`, `headers`, `authenticated`,
`raiseOnError`, `responseFormat` and `dtoType`. `jsonBody` takes an object, an array, a raw JSON
string sent byte for byte, or a payload DTO. Path parameters are percent-encoded with an empty safe
set, so an id carrying a `/` or a `?` cannot escape its segment, and a dot-only segment is refused.

## Accounts endpoints

65 functions in `accounts`. 54 of them name a typed view from `accountsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `accountsUrls`.

| Function                                                                                              | Method | Path                                                                                                               | Typed view                       |
| ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `getAccounts(client, queryParams?, options?)`                                                         | GET    | `/api/{api_version}/accounts`                                                                                      | `AccountList`                    |
| `getAccount(client, accountId, options?)`                                                             | GET    | `/api/{api_version}/accounts/{account_id}`                                                                         | `Account`                        |
| `getAccountInformation(client, accountId, options?)`                                                  | GET    | `/api/{api_version}/accounts/{account_id}/information`                                                             | `Account`                        |
| `getAccountImage(client, accountId, options?)`                                                        | GET    | `/api/{api_version}/accounts/{account_id}/image`                                                                   | `AccountImage`                   |
| `getAccountContacts(client, accountId, options?)`                                                     | GET    | `/api/{api_version}/accounts/{account_id}/contacts`                                                                | `Account`                        |
| `getAccountAddresses(client, accountId, options?)`                                                    | GET    | `/api/{api_version}/accounts/{account_id}/addresses`                                                               | `Account`                        |
| `getAccountBillingPreferences(client, accountId, options?)`                                           | GET    | `/api/{api_version}/accounts/{account_id}/billing_preferences`                                                     | `Account`                        |
| `getAccountPaymentMethods(client, accountId, options?)`                                               | GET    | `/api/{api_version}/accounts/{account_id}/payment_methods`                                                         | `Account`                        |
| `getAccountInventories(client, accountId, options?)`                                                  | GET    | `/api/{api_version}/accounts/{account_id}/inventories`                                                             | `Account`                        |
| `getAccountQuotePartialInvoices(client, accountId, options?)`                                         | GET    | `/api/{api_version}/accounts/{account_id}/quote_partial_invoices`                                                  | `Account`                        |
| `getAccountContact(client, accountId, contactType, options?)`                                         | GET    | `/api/{api_version}/accounts/{account_id}/contacts/{contact_type}`                                                 | `AccountContact`                 |
| `getAccountAddress(client, accountId, addressId, options?)`                                           | GET    | `/api/{api_version}/accounts/{account_id}/addresses/{address_id}`                                                  | `AccountAddress`                 |
| `getAccountPaymentMethod(client, accountId, paymentMethodId, options?)`                               | GET    | `/api/{api_version}/accounts/{account_id}/payment_methods/{payment_method_id}`                                     | `Account`                        |
| `getAccountNotes(client, accountId, queryParams?, options?)`                                          | GET    | `/api/{api_version}/accounts/{account_id}/notes`                                                                   | `NoteList`                       |
| `getAccountNote(client, accountId, noteId, options?)`                                                 | GET    | `/api/{api_version}/accounts/{account_id}/notes/{note_id}`                                                         | `NoteView`                       |
| `getAccountNoteFiles(client, accountId, noteId, options?)`                                            | GET    | `/api/{api_version}/accounts/{account_id}/notes/{note_id}/files`                                                   | `NoteFileList`                   |
| `getAccountNoteFile(client, accountId, noteId, fileId, options?)`                                     | GET    | `/api/{api_version}/accounts/{account_id}/notes/{note_id}/files/{file_id}`                                         | `NoteAttachment`                 |
| `getAccountEmails(client, accountId, queryParams?, options?)`                                         | GET    | `/api/{api_version}/accounts/{account_id}/communications/emails`                                                   | `AccountCommunicationsEmailList` |
| `getAccountEmail(client, accountId, emailId, options?)`                                               | GET    | `/api/{api_version}/accounts/{account_id}/communications/emails/{email_id}`                                        | `AccountCommunicationsEmail`     |
| `getAccountOrders(client, accountId, queryParams?, options?)`                                         | GET    | `/api/{api_version}/accounts/{account_id}/orders`                                                                  | `AccountOrders`                  |
| `getAccountInvoices(client, accountId, queryParams?, options?)`                                       | GET    | `/api/{api_version}/accounts/{account_id}/invoices`                                                                | `InvoiceList`                    |
| `getAccountPayments(client, accountId, queryParams?, options?)`                                       | GET    | `/api/{api_version}/accounts/{account_id}/payments`                                                                | `AccountPayments`                |
| `getAccountRefunds(client, accountId, queryParams?, options?)`                                        | GET    | `/api/{api_version}/accounts/{account_id}/refunds`                                                                 | `AccountRefunds`                 |
| `getAccountCreditNotes(client, accountId, queryParams?, options?)`                                    | GET    | `/api/{api_version}/accounts/{account_id}/credit_notes`                                                            | `CreditNoteList`                 |
| `getAccountPurchaseOrders(client, accountId, queryParams?, options?)`                                 | GET    | `/api/{api_version}/accounts/{account_id}/purchase_orders`                                                         | `AccountPurchaseOrders`          |
| `getAccountPurchaseInvoices(client, accountId, queryParams?, options?)`                               | GET    | `/api/{api_version}/accounts/{account_id}/purchase_invoices`                                                       | `AccountPurchaseInvoices`        |
| `getAccountPurchasePayments(client, accountId, queryParams?, options?)`                               | GET    | `/api/{api_version}/accounts/{account_id}/purchase_payments`                                                       | `AccountPurchasePayments`        |
| `getAccountPurchaseRefunds(client, accountId, queryParams?, options?)`                                | GET    | `/api/{api_version}/accounts/{account_id}/purchase_refunds`                                                        | `AccountPurchaseRefunds`         |
| `getAccountCustomObjects(client, accountId, queryParams?, options?)`                                  | GET    | `/api/{api_version}/accounts/{account_id}/custom_objects`                                                          | `AccountCustomObjectList`        |
| `cancelAccount(client, accountId, payload, options?)`                                                 | POST   | `/api/{api_version}/accounts/{account_id}/cancel`                                                                  | `Account`                        |
| `setAccountPassword(client, accountId, payload, options?)`                                            | POST   | `/api/{api_version}/accounts/{account_id}/set-password`                                                            | `Account`                        |
| `updateAccountInformation(client, accountId, payload, options?)`                                      | PATCH  | `/api/{api_version}/accounts/{account_id}/information`                                                             | `Account`                        |
| `createAccountAddresses(client, accountId, payload, options?)`                                        | POST   | `/api/{api_version}/accounts/{account_id}/addresses`                                                               | `Account`                        |
| `updateAccountAddress(client, accountId, addressId, payload, options?)`                               | PATCH  | `/api/{api_version}/accounts/{account_id}/addresses/{address_id}`                                                  | `Account`                        |
| `updateAccountContact(client, accountId, contactType, payload, options?)`                             | PATCH  | `/api/{api_version}/accounts/{account_id}/contacts/{contact_type}`                                                 | `Account`                        |
| `replaceAccountContact(client, accountId, contactType, payload, options?)`                            | PUT    | `/api/{api_version}/accounts/{account_id}/contacts/{contact_type}`                                                 | `Account`                        |
| `replaceAccountBillingPreferences(client, accountId, payload, options?)`                              | PUT    | `/api/{api_version}/accounts/{account_id}/billing_preferences`                                                     | `Account`                        |
| `updateAccountPaymentMethod(client, accountId, paymentMethodId, payload, options?)`                   | PATCH  | `/api/{api_version}/accounts/{account_id}/payment_methods/{payment_method_id}`                                     | `Account`                        |
| `createAccountNote(client, accountId, note, options?)`                                                | POST   | `/api/{api_version}/accounts/{account_id}/notes`                                                                   | `NoteView`                       |
| `updateAccountNote(client, accountId, noteId, note, options?)`                                        | PATCH  | `/api/{api_version}/accounts/{account_id}/notes/{note_id}`                                                         | `NoteView`                       |
| `uploadAccountImage(client, accountId, payload, options?)`                                            | POST   | `/api/{api_version}/accounts/{account_id}/image`                                                                   | `Account`                        |
| `deleteAccount(client, accountId, options?)`                                                          | DELETE | `/api/{api_version}/accounts/{account_id}`                                                                         | -                                |
| `deleteAccountContact(client, accountId, contactType, options?)`                                      | DELETE | `/api/{api_version}/accounts/{account_id}/contacts/{contact_type}`                                                 | -                                |
| `deleteAccountAddress(client, accountId, addressId, options?)`                                        | DELETE | `/api/{api_version}/accounts/{account_id}/addresses/{address_id}`                                                  | -                                |
| `deleteAccountPaymentMethod(client, accountId, paymentMethodId, options?)`                            | DELETE | `/api/{api_version}/accounts/{account_id}/payment_methods/{payment_method_id}`                                     | -                                |
| `deleteAccountNote(client, accountId, noteId, options?)`                                              | DELETE | `/api/{api_version}/accounts/{account_id}/notes/{note_id}`                                                         | -                                |
| `deleteAccountImage(client, accountId, options?)`                                                     | DELETE | `/api/{api_version}/accounts/{account_id}/image`                                                                   | -                                |
| `getAccountKpis(client, accountId, options?)`                                                         | GET    | `/api/{api_version}/accounts/{account_id}/kpis`                                                                    | `AccountKpis`                    |
| `getAccountFinancialSummary(client, accountId, options?)`                                             | GET    | `/api/{api_version}/accounts/{account_id}/financial_summary`                                                       | `AccountFinancialSummary`        |
| `getAccountCustomObject(client, accountId, customObjectId, queryParams?, options?)`                   | GET    | `/api/{api_version}/accounts/{account_id}/custom_objects/{custom_object_id}`                                       | `AccountCustomObject`            |
| `getAccountCustomObjectInstance(client, accountId, customObjectId, customObjectInstanceId, options?)` | GET    | `/api/{api_version}/accounts/{account_id}/custom_objects/{custom_object_id}/instances/{custom_object_instance_id}` | -                                |
| `getAccountComponentObjects(client, accountId, componentId, queryParams?, options?)`                  | GET    | `/api/{api_version}/accounts/{account_id}/component/{component_id}`                                                | `ComponentObjects`               |
| `getAccountComponentObject(client, accountId, componentId, componentObjectId, options?)`              | GET    | `/api/{api_version}/accounts/{account_id}/component/{component_id}/{component_object_id}`                          | `AccountComponentObject`         |
| `createAccount(client, payload, options?)`                                                            | POST   | `/api/{api_version}/accounts`                                                                                      | `Account`                        |
| `replaceAccount(client, accountId, payload, options?)`                                                | PUT    | `/api/{api_version}/accounts/{account_id}`                                                                         | `Account`                        |
| `reactivateAccount(client, accountId, payload, options?)`                                             | POST   | `/api/{api_version}/accounts/{account_id}/reactivate`                                                              | `Account`                        |
| `createAccountContacts(client, accountId, payload, options?)`                                         | POST   | `/api/{api_version}/accounts/{account_id}/contacts`                                                                | `Account`                        |
| `replaceAccountAddress(client, accountId, addressId, payload, options?)`                              | PUT    | `/api/{api_version}/accounts/{account_id}/addresses/{address_id}`                                                  | `Account`                        |
| `createAccountPaymentMethod(client, accountId, payload, options?)`                                    | POST   | `/api/{api_version}/accounts/{account_id}/payment_methods`                                                         | `Account`                        |
| `replaceAccountPaymentMethod(client, accountId, paymentMethodId, payload, options?)`                  | PUT    | `/api/{api_version}/accounts/{account_id}/payment_methods/{payment_method_id}`                                     | `Account`                        |
| `createAccountCustomObjectInstance(client, accountId, customObjectId, payload, options?)`             | POST   | `/api/{api_version}/accounts/{account_id}/custom_objects/{custom_object_id}`                                       | -                                |
| `updateAccountCustomObjectInstance(client, accountId, customObjectInstanceId, payload, options?)`     | PATCH  | `/api/{api_version}/accounts/{account_id}/custom_objects_instances/{custom_object_instance_id}`                    | `Account`                        |
| `sendAccountEmail(client, accountId, payload, options?)`                                              | POST   | `/api/{api_version}/accounts/{account_id}/communications/emails`                                                   | -                                |
| `purgeAccount(client, accountId, options?)`                                                           | POST   | `/api/{api_version}/accounts/{account_id}/purge`                                                                   | -                                |
| `deleteAccountNoteFile(client, accountId, noteId, fileId, options?)`                                  | DELETE | `/api/{api_version}/accounts/{account_id}/notes/{note_id}/files/{file_id}`                                         | -                                |

## Items endpoints

41 functions in `items`. 36 of them name a typed view from `itemsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `itemsUrls`.

| Function                                                                      | Method | Path                                                                         | Typed view                 |
| ----------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------- | -------------------------- |
| `getItems(...)`                                                               | GET    | `/api/{api_version}/items`                                                   | `ItemList`                 |
| `getItem(client, itemId, options?)`                                           | GET    | `/api/{api_version}/items/{item_id}`                                         | `Item`                     |
| `getItemInformation(client, itemId, options?)`                                | GET    | `/api/{api_version}/items/{item_id}/information`                             | `Item`                     |
| `createItem(client, payload, options?)`                                       | POST   | `/api/{api_version}/items`                                                   | `Item`                     |
| `updateItemInformation(client, itemId, payload, options?)`                    | PATCH  | `/api/{api_version}/items/{item_id}/information`                             | `Item`                     |
| `deactivateItem(client, itemId, options?)`                                    | POST   | `/api/{api_version}/items/{item_id}/deactivate`                              | `Item`                     |
| `reactivateItem(client, itemId, options?)`                                    | POST   | `/api/{api_version}/items/{item_id}/reactivate`                              | `Item`                     |
| `deleteItem(client, itemId, options?)`                                        | DELETE | `/api/{api_version}/items/{item_id}`                                         | -                          |
| `uploadItemImage(client, itemId, payload, options?)`                          | POST   | `/api/{api_version}/items/{item_id}/image`                                   | `Item`                     |
| `getItemSale(client, itemId, options?)`                                       | GET    | `/api/{api_version}/items/{item_id}/sale`                                    | `ItemSaleView`             |
| `createItemSale(client, itemId, payload, options?)`                           | POST   | `/api/{api_version}/items/{item_id}/sale`                                    | `Item`                     |
| `updateItemSale(client, itemId, payload, options?)`                           | PATCH  | `/api/{api_version}/items/{item_id}/sale`                                    | `Item`                     |
| `getItemPurchase(client, itemId, options?)`                                   | GET    | `/api/{api_version}/items/{item_id}/purchase`                                | `ItemPurchaseView`         |
| `createItemPurchase(client, itemId, payload, options?)`                       | POST   | `/api/{api_version}/items/{item_id}/purchase`                                | `Item`                     |
| `updateItemPurchase(client, itemId, payload, options?)`                       | PATCH  | `/api/{api_version}/items/{item_id}/purchase`                                | `Item`                     |
| `getItemInventories(client, itemId, options?)`                                | GET    | `/api/{api_version}/items/{item_id}/inventories`                             | `ItemInventoriesView`      |
| `updateItemInventories(client, itemId, payload, options?)`                    | PATCH  | `/api/{api_version}/items/{item_id}/inventories`                             | `Item`                     |
| `addItemInventory(client, itemId, payload, options?)`                         | POST   | `/api/{api_version}/items/{item_id}/inventory/add`                           | `Item`                     |
| `getItemInventoryAdjustments(client, itemId, queryParams?, options?)`         | GET    | `/api/{api_version}/items/{item_id}/inventory_adjustments`                   | `InventoryAdjustmentList`  |
| `getItemWarehouseInventories(client, itemId, warehouseName, options?)`        | GET    | `/api/{api_version}/items/{item_id}/warehouses/{warehouse_name}/inventories` | `ItemWarehouseInventories` |
| `updateItemBundleDetails(client, itemId, payload, options?)`                  | PATCH  | `/api/{api_version}/items/{item_id}/bundle_details`                          | `Item`                     |
| `updateItemVariations(client, itemId, payload, options?)`                     | PATCH  | `/api/{api_version}/items/{item_id}/variations`                              | `Item`                     |
| `getItemFamilyDetails(client, itemId, options?)`                              | GET    | `/api/{api_version}/items/{item_id}/family_details`                          | `Item`                     |
| `createItemFamilyDetails(client, itemId, payload, options?)`                  | POST   | `/api/{api_version}/items/{item_id}/family_details`                          | `Item`                     |
| `getItemPackageDetails(client, itemId, options?)`                             | GET    | `/api/{api_version}/items/{item_id}/package_details`                         | `Item`                     |
| `getItemPackageDetail(client, itemId, packageDetailId, options?)`             | GET    | `/api/{api_version}/items/{item_id}/package_details/{package_detail_id}`     | `Item`                     |
| `createItemPackageDetails(client, itemId, payload, options?)`                 | POST   | `/api/{api_version}/items/{item_id}/package_details`                         | `Item`                     |
| `deleteItemPackageDetail(client, itemId, packageDetailId, options?)`          | DELETE | `/api/{api_version}/items/{item_id}/package_details/{package_detail_id}`     | -                          |
| `getItemNotes(client, itemId, queryParams?, options?)`                        | GET    | `/api/{api_version}/items/{item_id}/notes`                                   | `NoteList`                 |
| `getItemNote(client, itemId, noteId, options?)`                               | GET    | `/api/{api_version}/items/{item_id}/notes/{note_id}`                         | `NoteView`                 |
| `createItemNote(client, itemId, note, options?)`                              | POST   | `/api/{api_version}/items/{item_id}/notes`                                   | `NoteView`                 |
| `updateItemNote(client, itemId, noteId, note, options?)`                      | PATCH  | `/api/{api_version}/items/{item_id}/notes/{note_id}`                         | `NoteView`                 |
| `deleteItemNote(client, itemId, noteId, options?)`                            | DELETE | `/api/{api_version}/items/{item_id}/notes/{note_id}`                         | -                          |
| `getItemNoteFiles(client, itemId, noteId, options?)`                          | GET    | `/api/{api_version}/items/{item_id}/notes/{note_id}/files`                   | `NoteFileList`             |
| `getItemNoteFile(client, itemId, noteId, fileId, options?)`                   | GET    | `/api/{api_version}/items/{item_id}/notes/{note_id}/files/{file_id}`         | `NoteAttachment`           |
| `createItemInventories(client, itemId, payload, options?)`                    | POST   | `/api/{api_version}/items/{item_id}/inventories`                             | `Item`                     |
| `createItemInventory(client, itemId, payload, options?)`                      | POST   | `/api/{api_version}/items/{item_id}/inventory`                               | `Item`                     |
| `addItemInventories(client, itemId, payload, options?)`                       | POST   | `/api/{api_version}/items/{item_id}/inventories/add`                         | `Item`                     |
| `updateItemPackageDetail(client, itemId, packageDetailId, payload, options?)` | PATCH  | `/api/{api_version}/items/{item_id}/package_details/{package_detail_id}`     | `Item`                     |
| `deleteItemNoteFile(client, itemId, noteId, fileId, options?)`                | DELETE | `/api/{api_version}/items/{item_id}/notes/{note_id}/files/{file_id}`         | -                          |
| `getItemKpis(client, itemId, options?)`                                       | GET    | `/api/{api_version}/items/{item_id}/kpis`                                    | -                          |

## Invoices endpoints

30 functions in `invoices`. 24 of them name a typed view from `invoicesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `invoicesUrls`.

| Function                                                                                  | Method | Path                                                                                                 | Typed view                               |
| ----------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `getInvoices(client, queryParams?, options?)`                                             | GET    | `/api/{api_version}/invoices`                                                                        | `InvoiceList`                            |
| `getInvoice(client, invoiceId, options?)`                                                 | GET    | `/api/{api_version}/invoices/{invoice_id}`                                                           | `Invoice`                                |
| `getInvoiceInformation(client, invoiceId, options?)`                                      | GET    | `/api/{api_version}/invoices/{invoice_id}/information`                                               | `Invoice`                                |
| `getInvoicePdf(client, invoiceId, options?)`                                              | GET    | `/api/{api_version}/invoices/{invoice_id}/pdf`                                                       | `InvoicePdf`                             |
| `createInvoice(client, payload, options?)`                                                | POST   | `/api/{api_version}/invoices`                                                                        | `Invoice`                                |
| `updateInvoiceInformation(client, invoiceId, payload, options?)`                          | PATCH  | `/api/{api_version}/invoices/{invoice_id}/information`                                               | `Invoice`                                |
| `amendInvoice(client, invoiceId, payload?, options?)`                                     | POST   | `/api/{api_version}/invoices/{invoice_id}/amend`                                                     | `Invoice`                                |
| `cancelInvoice(client, invoiceId, payload?, options?)`                                    | POST   | `/api/{api_version}/invoices/{invoice_id}/cancel`                                                    | `Invoice`                                |
| `reactivateInvoice(client, invoiceId, payload?, options?)`                                | POST   | `/api/{api_version}/invoices/{invoice_id}/reactivate`                                                | `Invoice`                                |
| `deleteInvoice(client, invoiceId, options?)`                                              | DELETE | `/api/{api_version}/invoices/{invoice_id}`                                                           | -                                        |
| `getInvoiceItemFulfillments(client, invoiceId, queryParams?, options?)`                   | GET    | `/api/{api_version}/invoices/{invoice_id}/item_fulfillments`                                         | `ItemFulfillmentReadList`                |
| `getInvoiceItemFulfillment(client, invoiceId, fulfillmentId, options?)`                   | GET    | `/api/{api_version}/invoices/{invoice_id}/item_fulfillments/{fulfillment_id}`                        | `ItemFulfillmentRead`                    |
| `getInvoiceRmas(client, invoiceId, queryParams?, options?)`                               | GET    | `/api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations`                         | `InvoiceReturnMerchandiseAuthorisations` |
| `getInvoiceRma(client, invoiceId, rmaId, options?)`                                       | GET    | `/api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_id}`                | `ReturnMerchandiseAuthorisationRead`     |
| `getInvoiceNotes(client, invoiceId, queryParams?, options?)`                              | GET    | `/api/{api_version}/invoices/{invoice_id}/notes`                                                     | `InvoiceNoteList`                        |
| `getInvoiceNote(client, invoiceId, noteId, options?)`                                     | GET    | `/api/{api_version}/invoices/{invoice_id}/notes/{note_id}`                                           | `InvoiceNote`                            |
| `createInvoiceNote(client, invoiceId, note, options?)`                                    | POST   | `/api/{api_version}/invoices/{invoice_id}/notes`                                                     | `InvoiceNote`                            |
| `deleteInvoiceNote(client, invoiceId, noteId, options?)`                                  | DELETE | `/api/{api_version}/invoices/{invoice_id}/notes/{note_id}`                                           | -                                        |
| `getInvoiceNoteFiles(client, invoiceId, noteId, options?)`                                | GET    | `/api/{api_version}/invoices/{invoice_id}/notes/{note_id}/files`                                     | `InvoiceNoteFileList`                    |
| `getInvoiceNoteFile(client, invoiceId, noteId, fileId, options?)`                         | GET    | `/api/{api_version}/invoices/{invoice_id}/notes/{note_id}/files/{file_id}`                           | `InvoiceNoteFile`                        |
| `getOrderInvoices(client, orderId, queryParams?, options?)`                               | GET    | `/api/{api_version}/orders/{order_id}/invoices`                                                      | `InvoiceList`                            |
| `createOrderInvoice(client, orderId, payload?, options?)`                                 | POST   | `/api/{api_version}/orders/{order_id}/invoices`                                                      | `Invoice`                                |
| `getInvoiceKpis(client, invoiceId, options?)`                                             | GET    | `/api/{api_version}/invoices/{invoice_id}/kpis`                                                      | `InvoiceKpisRead`                        |
| `getInvoiceLines(client, invoiceId, options?)`                                            | GET    | `/api/{api_version}/invoices/{invoice_id}/lines`                                                     | `InvoiceLines`                           |
| `getInvoiceLine(client, invoiceId, lineId, options?)`                                     | GET    | `/api/{api_version}/invoices/{invoice_id}/lines/{line_id}`                                           | `InvoiceLineRead`                        |
| `getInvoiceCreditNoteApplication(client, invoiceId, creditNoteApplicationId, options?)`   | GET    | `/api/{api_version}/invoices/{invoice_id}/credit_note_applications/{credit_note_application_id}`     | `CreditNoteApplicationRead`              |
| `getInvoiceCustomObjects(client, invoiceId, queryParams?, options?)`                      | GET    | `/api/{api_version}/invoices/{invoice_id}/custom_objects`                                            | -                                        |
| `getInvoiceCustomObject(client, invoiceId, customObjectId, options?)`                     | GET    | `/api/{api_version}/invoices/{invoice_id}/custom_objects/{custom_object_id}`                         | -                                        |
| `getInvoiceCustomObjectInstance(client, invoiceId, customObjectId, instanceId, options?)` | GET    | `/api/{api_version}/invoices/{invoice_id}/custom_objects/{custom_object_id}/instances/{instance_id}` | -                                        |
| `deleteInvoiceNoteFile(client, invoiceId, noteId, fileId, options?)`                      | DELETE | `/api/{api_version}/invoices/{invoice_id}/notes/{note_id}/files/{file_id}`                           | -                                        |

## Aba files endpoints

1 function in `abaFiles`. None names a typed view, so `.dto` is `null` and the body is on `.map`. Paths and body keys are in `abaFilesUrls`.

| Function                                     | Method | Path                                   | Typed view |
| -------------------------------------------- | ------ | -------------------------------------- | ---------- |
| `generateAbaFile(client, payload, options?)` | POST   | `/api/{api_version}/aba_file/generate` | -          |

## Account emails endpoints

1 function in `accountEmails`. 0 of them name a typed view from `accountEmailsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `accountEmailsUrls`.

| Function                                                                   | Method | Path                                                                          | Typed view |
| -------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------- | ---------- |
| `deleteAccountCommunicationsEmail(client, accountId, emailUuid, options?)` | DELETE | `/api/{api_version}/accounts/{account_id}/communications/emails/{email_uuid}` | -          |

## Account groups endpoints

5 functions in `accountGroups`. 3 of them name a typed view from `accountGroupsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `accountGroupsUrls`.

| Function                                                                | Method | Path                                                            | Typed view                 |
| ----------------------------------------------------------------------- | ------ | --------------------------------------------------------------- | -------------------------- |
| `getSettingsAccountGroups(client, queryParams?, options?)`              | GET    | `/api/{api_version}/settings/account_groups`                    | `SettingsAccountGroupList` |
| `createSettingsAccountGroup(client, payload, options?)`                 | POST   | `/api/{api_version}/settings/account_groups`                    | `SettingsAccountGroup`     |
| `getSettingsAccountGroup(client, accountGroupId, options?)`             | GET    | `/api/{api_version}/settings/account_groups/{account_group_id}` | `SettingsAccountGroup`     |
| `deleteSettingsAccountGroup(client, accountGroupId, options?)`          | DELETE | `/api/{api_version}/settings/account_groups/{account_group_id}` | -                          |
| `updateSettingsAccountGroup(client, accountGroupId, payload, options?)` | PATCH  | `/api/{api_version}/settings/account_groups/{account_group_id}` | -                          |

## Accounting codes endpoints

5 functions in `accountingCodes`. 4 of them name a typed view from `accountingCodesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `accountingCodesUrls`.

| Function                                                                      | Method | Path                                                                | Typed view                   |
| ----------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------- | ---------------------------- |
| `getSettingsAccountingCodes(client, queryParams?, options?)`                  | GET    | `/api/{api_version}/settings/accounting_codes`                      | `SettingsAccountingCodeList` |
| `createSettingsAccountingCode(client, payload, options?)`                     | POST   | `/api/{api_version}/settings/accounting_codes`                      | `SettingsAccountingCode`     |
| `getSettingsAccountingCode(client, accountingCodeId, queryParams?, options?)` | GET    | `/api/{api_version}/settings/accounting_codes/{accounting_code_id}` | `SettingsAccountingCode`     |
| `deleteSettingsAccountingCode(client, accountingCodeId, options?)`            | DELETE | `/api/{api_version}/settings/accounting_codes/{accounting_code_id}` | -                            |
| `updateSettingsAccountingCode(client, accountingCodeId, payload, options?)`   | PATCH  | `/api/{api_version}/settings/accounting_codes/{accounting_code_id}` | `SettingsAccountingCode`     |

## Action scripts endpoints

5 functions in `actionScripts`. 4 of them name a typed view from `actionScriptsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `actionScriptsUrls`.

| Function                                                        | Method | Path                                                   | Typed view         |
| --------------------------------------------------------------- | ------ | ------------------------------------------------------ | ------------------ |
| `getActionScripts(client, queryParams?, options?)`              | GET    | `/api/{api_version}/action_scripts`                    | `ActionScriptList` |
| `getActionScript(client, actionScriptId, options?)`             | GET    | `/api/{api_version}/action_scripts/{action_script_id}` | `ActionScript`     |
| `createActionScript(client, payload, options?)`                 | POST   | `/api/{api_version}/action_scripts`                    | `ActionScript`     |
| `updateActionScript(client, actionScriptId, payload, options?)` | PATCH  | `/api/{api_version}/action_scripts/{action_script_id}` | `ActionScript`     |
| `deleteActionScript(client, actionScriptId, options?)`          | DELETE | `/api/{api_version}/action_scripts/{action_script_id}` | -                  |

## Additional codes endpoints

5 functions in `additionalCodes`. 3 of them name a typed view from `additionalCodesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `additionalCodesUrls`.

| Function                                                                    | Method | Path                                                                | Typed view                   |
| --------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------- | ---------------------------- |
| `getSettingsAdditionalCodes(client, queryParams?, options?)`                | GET    | `/api/{api_version}/settings/additional_codes`                      | `SettingsAdditionalCodeList` |
| `createSettingsAdditionalCode(client, payload, options?)`                   | POST   | `/api/{api_version}/settings/additional_codes`                      | `SettingsAdditionalCode`     |
| `getSettingsAdditionalCode(client, additionalCodeId, options?)`             | GET    | `/api/{api_version}/settings/additional_codes/{additional_code_id}` | `SettingsAdditionalCode`     |
| `deleteSettingsAdditionalCode(client, additionalCodeId, options?)`          | DELETE | `/api/{api_version}/settings/additional_codes/{additional_code_id}` | -                            |
| `updateSettingsAdditionalCode(client, additionalCodeId, payload, options?)` | PATCH  | `/api/{api_version}/settings/additional_codes/{additional_code_id}` | -                            |

## Alert responsibilities endpoints

5 functions in `alertResponsibilities`. 0 of them name a typed view from `alertResponsibilitiesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `alertResponsibilitiesUrls`.

| Function                                                                              | Method | Path                                                                           | Typed view |
| ------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------ | ---------- |
| `getSettingsAlertResponsibilities(client, queryParams?, options?)`                    | GET    | `/api/{api_version}/settings/alert_responsibilities`                           | -          |
| `createSettingsAlertResponsibility(client, payload, options?)`                        | POST   | `/api/{api_version}/settings/alert_responsibilities`                           | -          |
| `getSettingsAlertResponsibility(client, alertResponsibilityId, options?)`             | GET    | `/api/{api_version}/settings/alert_responsibilities/{alert_responsibility_id}` | -          |
| `deleteSettingsAlertResponsibility(client, alertResponsibilityId, options?)`          | DELETE | `/api/{api_version}/settings/alert_responsibilities/{alert_responsibility_id}` | -          |
| `updateSettingsAlertResponsibility(client, alertResponsibilityId, payload, options?)` | PATCH  | `/api/{api_version}/settings/alert_responsibilities/{alert_responsibility_id}` | -          |

## Alert responsibility endpoints

5 functions in `alertResponsibility`. 4 of them name a typed view from `alertResponsibilityDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `alertResponsibilityUrls`.

| Function                                                                      | Method | Path                                                                | Typed view                |
| ----------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------- | ------------------------- |
| `getAlertResponsibilities(client, queryParams?, options?)`                    | GET    | `/api/{api_version}/alert_responsibility`                           | `AlertResponsibilityList` |
| `getAlertResponsibility(client, alertResponsibilityId, options?)`             | GET    | `/api/{api_version}/alert_responsibility/{alert_responsibility_id}` | `AlertResponsibility`     |
| `createAlertResponsibility(client, payload, options?)`                        | POST   | `/api/{api_version}/alert_responsibility`                           | `AlertResponsibility`     |
| `updateAlertResponsibility(client, alertResponsibilityId, payload, options?)` | PATCH  | `/api/{api_version}/alert_responsibility/{alert_responsibility_id}` | `AlertResponsibility`     |
| `deleteAlertResponsibility(client, alertResponsibilityId, options?)`          | DELETE | `/api/{api_version}/alert_responsibility/{alert_responsibility_id}` | -                         |

## Alerts endpoints

5 functions in `alerts`. 4 of them name a typed view from `alertsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `alertsUrls`.

| Function                                                            | Method | Path                                               | Typed view |
| ------------------------------------------------------------------- | ------ | -------------------------------------------------- | ---------- |
| `getAlerts(client, queryParams?, options?)`                         | GET    | `/api/{api_version}/alerts`                        | `Alerts`   |
| `getAlert(client, alertId, queryParams?, options?)`                 | GET    | `/api/{api_version}/alerts/{alert_id}`             | -          |
| `getAlertsAccountById(client, accountId, queryParams?, options?)`   | GET    | `/api/{api_version}/alerts/account/{account_id}`   | `Alerts`   |
| `getAlertsEmployeeById(client, employeeId, queryParams?, options?)` | GET    | `/api/{api_version}/alerts/employee/{employee_id}` | `Alerts`   |
| `getAlertsLabourById(client, labourId, queryParams?, options?)`     | GET    | `/api/{api_version}/alerts/labour/{labour_id}`     | `Alerts`   |

## Applications endpoints

5 functions in `applications`. 4 of them name a typed view from `applicationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `applicationsUrls`.

| Function                                                              | Method | Path                                                        | Typed view                |
| --------------------------------------------------------------------- | ------ | ----------------------------------------------------------- | ------------------------- |
| `getSettingsApplications(client, queryParams?, options?)`             | GET    | `/api/{api_version}/settings/applications`                  | `SettingsApplicationList` |
| `createSettingsApplication(client, payload, options?)`                | POST   | `/api/{api_version}/settings/applications`                  | `SettingsApplication`     |
| `getSettingsApplication(client, applicationId, options?)`             | GET    | `/api/{api_version}/settings/applications/{application_id}` | `SettingsApplication`     |
| `deleteSettingsApplication(client, applicationId, options?)`          | DELETE | `/api/{api_version}/settings/applications/{application_id}` | -                         |
| `updateSettingsApplication(client, applicationId, payload, options?)` | PATCH  | `/api/{api_version}/settings/applications/{application_id}` | `SettingsApplication`     |

## Approval profiles endpoints

5 functions in `approvalProfiles`. 2 of them name a typed view from `approvalProfilesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `approvalProfilesUrls`.

| Function                                                                      | Method | Path                                                                  | Typed view                    |
| ----------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------- | ----------------------------- |
| `getSettingsApprovalProfiles(client, queryParams?, options?)`                 | GET    | `/api/{api_version}/settings/approval_profiles`                       | `SettingsApprovalProfileList` |
| `createSettingsApprovalProfile(client, payload, options?)`                    | POST   | `/api/{api_version}/settings/approval_profiles`                       | -                             |
| `getSettingsApprovalProfile(client, approvalProfileId, options?)`             | GET    | `/api/{api_version}/settings/approval_profiles/{approval_profile_id}` | `SettingsApprovalProfile`     |
| `deleteSettingsApprovalProfile(client, approvalProfileId, options?)`          | DELETE | `/api/{api_version}/settings/approval_profiles/{approval_profile_id}` | -                             |
| `updateSettingsApprovalProfile(client, approvalProfileId, payload, options?)` | PATCH  | `/api/{api_version}/settings/approval_profiles/{approval_profile_id}` | -                             |

## Approval user groups endpoints

5 functions in `approvalUserGroups`. 4 of them name a typed view from `approvalUserGroupsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `approvalUserGroupsUrls`.

| Function                                                                          | Method | Path                                                                        | Typed view                      |
| --------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------- | ------------------------------- |
| `getSettingsApprovalUserGroups(client, queryParams?, options?)`                   | GET    | `/api/{api_version}/settings/approval_user_groups`                          | `SettingsApprovalUserGroupList` |
| `createSettingsApprovalUserGroup(client, payload, options?)`                      | POST   | `/api/{api_version}/settings/approval_user_groups`                          | `SettingsApprovalUserGroup`     |
| `getSettingsApprovalUserGroup(client, approvalUserGroupId, options?)`             | GET    | `/api/{api_version}/settings/approval_user_groups/{approval_user_group_id}` | `SettingsApprovalUserGroup`     |
| `deleteSettingsApprovalUserGroup(client, approvalUserGroupId, options?)`          | DELETE | `/api/{api_version}/settings/approval_user_groups/{approval_user_group_id}` | -                               |
| `updateSettingsApprovalUserGroup(client, approvalUserGroupId, payload, options?)` | PATCH  | `/api/{api_version}/settings/approval_user_groups/{approval_user_group_id}` | `SettingsApprovalUserGroup`     |

## Approvals endpoints

5 functions in `approvals`. 2 of them name a typed view from `approvalsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `approvalsUrls`.

| Function                                                                 | Method | Path                                                  | Typed view             |
| ------------------------------------------------------------------------ | ------ | ----------------------------------------------------- | ---------------------- |
| `getApprovalsAccount(client, queryParams?, options?)`                    | GET    | `/api/{api_version}/approvals/account`                | `ApprovalsAccountList` |
| `getApprovalsSaleorder(client, queryParams?, options?)`                  | GET    | `/api/{api_version}/approvals/saleOrder`              | `ApprovalsSaleorder`   |
| `getApprovalsAccountByUuid(client, accountUuid, queryParams?, options?)` | GET    | `/api/{api_version}/approvals/account/{account_uuid}` | -                      |
| `approveApproval(client, payload, options?)`                             | POST   | `/api/{api_version}/approvals/approve`                | -                      |
| `rejectApproval(client, payload, options?)`                              | POST   | `/api/{api_version}/approvals/reject`                 | -                      |

## Attribute attachments endpoints

1 function in `attributeAttachments`. 0 of them name a typed view from `attributeAttachmentsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `attributeAttachmentsUrls`.

| Function                                             | Method | Path                                                  | Typed view |
| ---------------------------------------------------- | ------ | ----------------------------------------------------- | ---------- |
| `getAttributeAttachment(client, fileUuid, options?)` | GET    | `/api/{api_version}/attribute_attachment/{file_uuid}` | -          |

## Billing periods endpoints

5 functions in `billingPeriods`. 4 of them name a typed view from `billingPeriodsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `billingPeriodsUrls`.

| Function                                                                  | Method | Path                                                              | Typed view                  |
| ------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------- | --------------------------- |
| `getSettingsBillingPeriods(client, queryParams?, options?)`               | GET    | `/api/{api_version}/settings/billing_periods`                     | `SettingsBillingPeriodList` |
| `createSettingsBillingPeriod(client, payload, options?)`                  | POST   | `/api/{api_version}/settings/billing_periods`                     | `SettingsBillingPeriod`     |
| `getSettingsBillingPeriod(client, billingPeriodId, options?)`             | GET    | `/api/{api_version}/settings/billing_periods/{billing_period_id}` | `SettingsBillingPeriod`     |
| `deleteSettingsBillingPeriod(client, billingPeriodId, options?)`          | DELETE | `/api/{api_version}/settings/billing_periods/{billing_period_id}` | -                           |
| `updateSettingsBillingPeriod(client, billingPeriodId, payload, options?)` | PATCH  | `/api/{api_version}/settings/billing_periods/{billing_period_id}` | `SettingsBillingPeriod`     |

## Bookings endpoints

33 functions in `bookings`. 24 of them name a typed view from `bookingsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `bookingsUrls`.

| Function                                                                                           | Method | Path                                                                                                          | Typed view                      |
| -------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `getBooking(client, queryParams?, options?)`                                                       | GET    | `/api/{api_version}/booking`                                                                                  | `BookingList`                   |
| `getBookingById(client, bookingId, queryParams?, options?)`                                        | GET    | `/api/{api_version}/booking/{booking_id}`                                                                     | `BookingById`                   |
| `createBooking(client, payload, options?)`                                                         | POST   | `/api/{api_version}/booking`                                                                                  | -                               |
| `previewBooking(client, payload, options?)`                                                        | POST   | `/api/{api_version}/booking/preview`                                                                          | -                               |
| `deleteBooking(client, bookingId, options?)`                                                       | DELETE | `/api/{api_version}/booking/{booking_id}`                                                                     | -                               |
| `getBookingNotes(client, queryParams?, options?)`                                                  | GET    | `/api/{api_version}/booking/notes`                                                                            | `BookingNoteList`               |
| `getBookingBillingPreferences(client, bookingId, options?)`                                        | GET    | `/api/{api_version}/booking/{booking_id}/billing_preferences`                                                 | `BookingBillingPreferencesView` |
| `updateBookingBillingPreferences(client, bookingId, payload, options?)`                            | PATCH  | `/api/{api_version}/booking/{booking_id}/billing_preferences`                                                 | `BookingById`                   |
| `changeBooking(client, bookingId, payload, options?)`                                              | POST   | `/api/{api_version}/booking/{booking_id}/change`                                                              | -                               |
| `previewBookingChange(client, bookingId, payload, options?)`                                       | POST   | `/api/{api_version}/booking/{booking_id}/change/preview`                                                      | -                               |
| `getBookingInformation(client, bookingId, options?)`                                               | GET    | `/api/{api_version}/booking/{booking_id}/information`                                                         | `BookingById`                   |
| `updateBookingInformation(client, bookingId, payload, options?)`                                   | PATCH  | `/api/{api_version}/booking/{booking_id}/information`                                                         | `BookingById`                   |
| `getBookingLines(client, bookingId, queryParams?, options?)`                                       | GET    | `/api/{api_version}/booking/{booking_id}/lines`                                                               | `BookingById`                   |
| `getBookingLine(client, bookingId, lineUuid, options?)`                                            | GET    | `/api/{api_version}/booking/{booking_id}/lines/{line_uuid}`                                                   | `BookingLine`                   |
| `updateBookingLine(client, bookingId, lineUuid, payload, options?)`                                | PATCH  | `/api/{api_version}/booking/{booking_id}/lines/{line_uuid}`                                                   | `BookingById`                   |
| `updateBookingLineBillingPreferences(client, bookingId, lineUuid, payload, options?)`              | PATCH  | `/api/{api_version}/booking/{booking_id}/lines/{line_uuid}/billing_preferences`                               | `BookingById`                   |
| `getBookingCustomObjects(client, bookingId, queryParams?, options?)`                               | GET    | `/api/{api_version}/booking/{booking_id}/custom_objects`                                                      | `BookingCustomObjectList`       |
| `getBookingCustomObject(client, bookingId, customObjectId, options?)`                              | GET    | `/api/{api_version}/booking/{booking_id}/custom_objects/{custom_object_id}`                                   | `BookingCustomObject`           |
| `getBookingCustomObjectInstance(client, bookingId, customObjectId, instanceId, options?)`          | GET    | `/api/{api_version}/booking/{booking_id}/custom_objects/{custom_object_id}/instances/{instance_id}`           | -                               |
| `getBookingCustomObjectsInstances(client, bookingId, queryParams?, options?)`                      | GET    | `/api/{api_version}/booking/{booking_id}/custom_objects_instances`                                            | `BookingCustomObjectList`       |
| `getBookingCustomObjectsInstance(client, bookingId, customObjectId, options?)`                     | GET    | `/api/{api_version}/booking/{booking_id}/custom_objects_instances/{custom_object_id}`                         | `BookingCustomObject`           |
| `getBookingCustomObjectsInstanceInstance(client, bookingId, customObjectId, instanceId, options?)` | GET    | `/api/{api_version}/booking/{booking_id}/custom_objects_instances/{custom_object_id}/instances/{instance_id}` | -                               |
| `getBookingInvoices(client, bookingId, queryParams?, options?)`                                    | GET    | `/api/{api_version}/booking/{booking_id}/invoices`                                                            | `BookingInvoiceList`            |
| `getBookingItemFulfillments(client, bookingId, queryParams?, options?)`                            | GET    | `/api/{api_version}/booking/{booking_id}/item_fulfillments`                                                   | -                               |
| `getBookingItemFulfillment(client, bookingId, fulfillmentId, options?)`                            | GET    | `/api/{api_version}/booking/{booking_id}/item_fulfillments/{fulfillment_id}`                                  | `BookingItemFulfillment`        |
| `getBookingKpis(client, bookingId, options?)`                                                      | GET    | `/api/{api_version}/booking/{booking_id}/kpis`                                                                | `BookingKpis`                   |
| `getBookingPaymentMethods(client, bookingId, queryParams?, options?)`                              | GET    | `/api/{api_version}/booking/{booking_id}/payment_methods`                                                     | `BookingPaymentMethods`         |
| `getBookingPaymentMethod(client, bookingId, paymentMethodRef, options?)`                           | GET    | `/api/{api_version}/booking/{booking_id}/payment_methods/{payment_method_ref}`                                | `BookingPaymentMethod`          |
| `getBookingPayments(client, bookingId, queryParams?, options?)`                                    | GET    | `/api/{api_version}/booking/{booking_id}/payments`                                                            | `BookingPaymentList`            |
| `getBookingPayment(client, bookingId, paymentId, options?)`                                        | GET    | `/api/{api_version}/booking/{booking_id}/payments/{payment_id}`                                               | `BookingPaymentView`            |
| `getBookingPdf(client, bookingId, options?)`                                                       | GET    | `/api/{api_version}/booking/{booking_id}/pdf`                                                                 | `BookingPdf`                    |
| `getBookingQuotePartialInvoices(client, bookingId, options?)`                                      | GET    | `/api/{api_version}/booking/{booking_id}/quote_partial_invoices`                                              | `BookingQuotePartialInvoices`   |
| `getBookingShippingPdf(client, bookingId, shippingLineId, options?)`                               | GET    | `/api/{api_version}/booking/{booking_id}/shipping_pdf/{shipping_line_id}`                                     | -                               |

## Charging periods endpoints

5 functions in `chargingPeriods`. 4 of them name a typed view from `chargingPeriodsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `chargingPeriodsUrls`.

| Function                                                                    | Method | Path                                                                | Typed view                   |
| --------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------- | ---------------------------- |
| `getSettingsChargingPeriods(client, queryParams?, options?)`                | GET    | `/api/{api_version}/settings/charging_periods`                      | `SettingsChargingPeriodList` |
| `createSettingsChargingPeriod(client, payload, options?)`                   | POST   | `/api/{api_version}/settings/charging_periods`                      | `SettingsChargingPeriod`     |
| `getSettingsChargingPeriod(client, chargingPeriodId, options?)`             | GET    | `/api/{api_version}/settings/charging_periods/{charging_period_id}` | `SettingsChargingPeriod`     |
| `deleteSettingsChargingPeriod(client, chargingPeriodId, options?)`          | DELETE | `/api/{api_version}/settings/charging_periods/{charging_period_id}` | -                            |
| `updateSettingsChargingPeriod(client, chargingPeriodId, payload, options?)` | PATCH  | `/api/{api_version}/settings/charging_periods/{charging_period_id}` | `SettingsChargingPeriod`     |

## Communication profiles endpoints

5 functions in `communicationProfiles`. 2 of them name a typed view from `communicationProfilesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `communicationProfilesUrls`.

| Function                                                                                | Method | Path                                                                            | Typed view                         |
| --------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------- | ---------------------------------- |
| `getSettingsCommunicationProfiles(client, queryParams?, options?)`                      | GET    | `/api/{api_version}/settings/communication_profiles`                            | `SettingsCommunicationProfileList` |
| `createSettingsCommunicationProfile(client, payload, options?)`                         | POST   | `/api/{api_version}/settings/communication_profiles`                            | -                                  |
| `getSettingsCommunicationProfile(client, communicationProfileId, options?)`             | GET    | `/api/{api_version}/settings/communication_profiles/{communication_profile_id}` | `SettingsCommunicationProfile`     |
| `deleteSettingsCommunicationProfile(client, communicationProfileId, options?)`          | DELETE | `/api/{api_version}/settings/communication_profiles/{communication_profile_id}` | -                                  |
| `updateSettingsCommunicationProfile(client, communicationProfileId, payload, options?)` | PATCH  | `/api/{api_version}/settings/communication_profiles/{communication_profile_id}` | -                                  |

## Communications endpoints

1 function in `communications`. 0 of them name a typed view from `communicationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `communicationsUrls`.

| Function                               | Method | Path                                           | Typed view |
| -------------------------------------- | ------ | ---------------------------------------------- | ---------- |
| `sendEmail(client, payload, options?)` | POST   | `/api/{api_version}/communications/send_email` | -          |

## Countries endpoints

3 functions in `countries`. 3 of them name a typed view from `countriesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `countriesUrls`.

| Function                                                      | Method | Path                                                 | Typed view            |
| ------------------------------------------------------------- | ------ | ---------------------------------------------------- | --------------------- |
| `getSettingsCountries(client, queryParams?, options?)`        | GET    | `/api/{api_version}/settings/countries`              | `SettingsCountryList` |
| `getSettingsCountry(client, countryId, options?)`             | GET    | `/api/{api_version}/settings/countries/{country_id}` | `SettingsCountry`     |
| `updateSettingsCountry(client, countryId, payload, options?)` | PATCH  | `/api/{api_version}/settings/countries/{country_id}` | `SettingsCountry`     |

## Credit note applications endpoints

3 functions in `creditNoteApplications`. 3 of them name a typed view from `creditNoteApplicationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `creditNoteApplicationsUrls`.

| Function                                                                            | Method | Path                                                                       | Typed view                      |
| ----------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------- | ------------------------------- |
| `getCreditNoteApplications(client, queryParams?, options?)`                         | GET    | `/api/{api_version}/credit_note_applications`                              | `CreditNoteApplicationList`     |
| `getCreditNoteApplication(client, creditNoteApplicationId, queryParams?, options?)` | GET    | `/api/{api_version}/credit_note_applications/{credit_note_application_id}` | `CreditNoteApplicationRead`     |
| `getInvoiceCreditNoteApplications(client, invoiceId, queryParams?, options?)`       | GET    | `/api/{api_version}/invoices/{invoice_id}/credit_note_applications`        | `InvoiceCreditNoteApplications` |

## Credit notes endpoints

14 functions in `creditNotes`. 7 of them name a typed view from `creditNotesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `creditNotesUrls`.

| Function                                                                | Method | Path                                                                               | Typed view               |
| ----------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------- | ------------------------ |
| `getCreditNotes(client, queryParams?, options?)`                        | GET    | `/api/{api_version}/credit_notes`                                                  | `CreditNoteList`         |
| `getCreditNote(client, creditNoteId, queryParams?, options?)`           | GET    | `/api/{api_version}/credit_notes/{credit_note_id}`                                 | `CreditNoteRead`         |
| `updateCreditNote(client, creditNoteId, payload, options?)`             | PATCH  | `/api/{api_version}/credit_notes/{credit_note_id}`                                 | `CreditNoteUpdated`      |
| `createCreditNote(client, payload, options?)`                           | POST   | `/api/{api_version}/credit_notes`                                                  | -                        |
| `deleteCreditNote(client, creditNoteId, options?)`                      | DELETE | `/api/{api_version}/credit_notes/{credit_note_id}`                                 | -                        |
| `applyCreditNote(client, creditNoteId, payload, options?)`              | POST   | `/api/{api_version}/credit_notes/{credit_note_id}/apply`                           | -                        |
| `getCreditNoteItems(client, creditNoteId, options?)`                    | GET    | `/api/{api_version}/credit_notes/{credit_note_id}/items`                           | `CreditNoteItems`        |
| `getCreditNoteCreditNoteApplications(client, creditNoteId, options?)`   | GET    | `/api/{api_version}/credit_notes/{credit_note_id}/credit_note_applications`        | `CreditNoteApplications` |
| `getCreditNoteNotes(client, creditNoteId, queryParams?, options?)`      | GET    | `/api/{api_version}/credit_notes/{credit_note_id}/notes`                           | `CreditNoteNoteList`     |
| `getCreditNoteNote(client, creditNoteId, noteId, options?)`             | GET    | `/api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}`                 | `CreditNoteNote`         |
| `createCreditNoteNote(client, creditNoteId, note, options?)`            | POST   | `/api/{api_version}/credit_notes/{credit_note_id}/notes`                           | -                        |
| `deleteCreditNoteNote(client, creditNoteId, noteId, options?)`          | DELETE | `/api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}`                 | -                        |
| `getCreditNoteNoteFiles(client, creditNoteId, noteId, options?)`        | GET    | `/api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}/files`           | -                        |
| `getCreditNoteNoteFile(client, creditNoteId, noteId, fileId, options?)` | GET    | `/api/{api_version}/credit_notes/{credit_note_id}/notes/{note_id}/files/{file_id}` | -                        |

## Custom attributes endpoints

5 functions in `customAttributes`. 4 of them name a typed view from `customAttributesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `customAttributesUrls`.

| Function                                                                | Method | Path                                                         | Typed view            |
| ----------------------------------------------------------------------- | ------ | ------------------------------------------------------------ | --------------------- |
| `getCustomAttributes(client, queryParams?, options?)`                   | GET    | `/api/{api_version}/custom_attributes`                       | `CustomAttributeList` |
| `createCustomAttribute(client, payload, options?)`                      | POST   | `/api/{api_version}/custom_attributes`                       | `CustomAttributes`    |
| `deleteCustomAttribute(client, customAttributeId, options?)`            | DELETE | `/api/{api_version}/custom_attributes/{custom_attribute_id}` | -                     |
| `getCustomAttribute(client, customAttributeId, queryParams?, options?)` | GET    | `/api/{api_version}/custom_attributes/{custom_attribute_id}` | `CustomAttribute`     |
| `updateCustomAttribute(client, customAttributeId, payload, options?)`   | PATCH  | `/api/{api_version}/custom_attributes/{custom_attribute_id}` | `CustomAttribute`     |

## Custom components endpoints

39 functions in `customComponents`. 24 of them name a typed view from `customComponentsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `customComponentsUrls`.

| Function                                                                                                                             | Method | Path                                                                                                                                     | Typed view                     |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `getComponent(client, queryParams?, options?)`                                                                                       | GET    | `/api/{api_version}/component`                                                                                                           | `ComponentList`                |
| `getComponentByUuid(client, componentUuid, queryParams?, options?)`                                                                  | GET    | `/api/{api_version}/component/{component_uuid}`                                                                                          | `Component`                    |
| `createComponentByUuid(client, componentUuid, payload, options?)`                                                                    | POST   | `/api/{api_version}/component/{component_uuid}`                                                                                          | `ComponentByUuid`              |
| `deleteComponentById(client, componentUuid, componentObjectId, options?)`                                                            | DELETE | `/api/{api_version}/component/{component_uuid}/{component_object_id}`                                                                    | -                              |
| `updateComponentById(client, componentUuid, componentObjectId, payload, options?)`                                                   | PATCH  | `/api/{api_version}/component/{component_uuid}/{component_object_id}`                                                                    | `ComponentByUuid`              |
| `getComponentObjects(client, componentUuid, queryParams?, options?)`                                                                 | GET    | `/api/{api_version}/components/{component_uuid}/objects`                                                                                 | `ComponentObjects`             |
| `getComponentObject(client, componentUuid, componentObjectId, queryParams?, options?)`                                               | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}`                                                           | `ComponentObject`              |
| `getComponentObjectActivity(client, componentUuid, componentObjectId, queryParams?, options?)`                                       | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity`                                                  | `ComponentObjectActivity`      |
| `getComponentObjectCustomObjects(client, componentUuid, componentObjectId, queryParams?, options?)`                                  | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects`                                            | `ComponentObjectCustomObjects` |
| `getComponentObjectPdf(client, componentUuid, componentObjectId, queryParams?, options?)`                                            | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/pdf`                                                       | -                              |
| `createComponent(client, payload, options?)`                                                                                         | POST   | `/api/{api_version}/component`                                                                                                           | `Component`                    |
| `updateComponent(client, componentUuid, payload, options?)`                                                                          | PATCH  | `/api/{api_version}/component/{component_uuid}`                                                                                          | `Component`                    |
| `createComponentObject(client, componentUuid, payload, options?)`                                                                    | POST   | `/api/{api_version}/components/{component_uuid}/objects`                                                                                 | `ComponentObjectRecord`        |
| `updateComponentObject(client, componentUuid, componentObjectId, payload, options?)`                                                 | PATCH  | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}`                                                           | `ComponentObjectRecord`        |
| `deleteComponentObject(client, componentUuid, componentObjectId, options?)`                                                          | DELETE | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}`                                                           | -                              |
| `createComponentObjectActivity(client, componentUuid, componentObjectId, payload, options?)`                                         | POST   | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity`                                                  | `ComponentObjectActivityEntry` |
| `getComponentObjectActivityById(client, componentUuid, componentObjectId, activityId, options?)`                                     | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity/{activity_id}`                                    | `ComponentObjectActivityEntry` |
| `getComponentObjectMilestones(client, componentUuid, componentObjectId, queryParams?, options?)`                                     | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/milestones`                                                | -                              |
| `getComponentObjectMilestone(client, componentUuid, componentObjectId, milestoneId, options?)`                                       | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/milestones/{milestone_id}`                                 | -                              |
| `getComponentObjectHistory(client, componentUuid, componentObjectId, queryParams?, options?)`                                        | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/history`                                                   | -                              |
| `getComponentObjectHistoryById(client, componentUuid, componentObjectId, historyId, options?)`                                       | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/history/{history_id}`                                      | -                              |
| `getComponentObjectNotes(client, componentUuid, componentObjectId, queryParams?, options?)`                                          | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes`                                                     | `ComponentObjectNotes`         |
| `getComponentObjectNote(client, componentUuid, componentObjectId, noteId, options?)`                                                 | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}`                                           | `ComponentObjectNote`          |
| `getComponentObjectNoteFiles(client, componentUuid, componentObjectId, noteId, options?)`                                            | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files`                                     | `ComponentObjectNoteFiles`     |
| `getComponentObjectNoteFile(client, componentUuid, componentObjectId, noteId, fileId, options?)`                                     | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files/{file_id}`                           | `ComponentObjectNoteFile`      |
| `createComponentObjectNote(client, componentUuid, componentObjectId, note, options?)`                                                | POST   | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes`                                                     | `ComponentObjectNote`          |
| `updateComponentObjectNote(client, componentUuid, componentObjectId, noteId, note, options?)`                                        | PATCH  | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}`                                           | `ComponentObjectNote`          |
| `deleteComponentObjectNote(client, componentUuid, componentObjectId, noteId, options?)`                                              | DELETE | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}`                                           | -                              |
| `deleteComponentObjectNoteFile(client, componentUuid, componentObjectId, noteId, fileId, options?)`                                  | DELETE | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files/{file_id}`                           | -                              |
| `getComponentObjectCustomObject(client, componentUuid, componentObjectId, customObjectId, options?)`                                 | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}`                         | -                              |
| `createComponentObjectCustomObjectInstance(client, componentUuid, componentObjectId, customObjectId, payload, options?)`             | POST   | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}`                         | -                              |
| `getComponentObjectCustomObjectInstance(client, componentUuid, componentObjectId, customObjectId, instanceId, options?)`             | GET    | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}` | -                              |
| `updateComponentObjectCustomObjectInstance(client, componentUuid, componentObjectId, customObjectId, instanceId, payload, options?)` | PATCH  | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}` | -                              |
| `deleteComponentObjectCustomObjectInstance(client, componentUuid, componentObjectId, customObjectId, instanceId, options?)`          | DELETE | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}` | -                              |
| `linkComponentObjectDomains(client, componentUuid, componentObjectId, payload, options?)`                                            | POST   | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/link_domains`                                              | `ComponentObjectRecord`        |
| `updateComponentObjectDomains(client, componentUuid, componentObjectId, payload, options?)`                                          | PATCH  | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/link_domains`                                              | `ComponentObjectRecord`        |
| `unlinkComponentObjectDomains(client, componentUuid, componentObjectId, payload, options?)`                                          | POST   | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/unlink_domains`                                            | `ComponentObjectRecord`        |
| `changeComponentObjectStatus(client, componentUuid, componentObjectId, payload, options?)`                                           | POST   | `/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/change_status`                                             | `ComponentObjectRecord`        |
| `deleteComponent(client, componentUuid, options?)`                                                                                   | DELETE | `/api/{api_version}/component/{component_uuid}`                                                                                          | -                              |

## Custom events endpoints

5 functions in `customEvents`. 2 of them name a typed view from `customEventsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `customEventsUrls`.

| Function                                                              | Method | Path                                                          | Typed view                |
| --------------------------------------------------------------------- | ------ | ------------------------------------------------------------- | ------------------------- |
| `getSettingsCustomEvents(client, queryParams?, options?)`             | GET    | `/api/{api_version}/settings/custom_events`                   | `SettingsCustomEventList` |
| `createSettingsCustomEvent(client, payload, options?)`                | POST   | `/api/{api_version}/settings/custom_events`                   | -                         |
| `getSettingsCustomEvent(client, customEventId, options?)`             | GET    | `/api/{api_version}/settings/custom_events/{custom_event_id}` | `SettingsCustomEvent`     |
| `deleteSettingsCustomEvent(client, customEventId, options?)`          | DELETE | `/api/{api_version}/settings/custom_events/{custom_event_id}` | -                         |
| `updateSettingsCustomEvent(client, customEventId, payload, options?)` | PATCH  | `/api/{api_version}/settings/custom_events/{custom_event_id}` | -                         |

## Custom features endpoints

7 functions in `customFeatures`. 5 of them name a typed view from `customFeaturesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `customFeaturesUrls`.

| Function                                                              | Method | Path                                                    | Typed view          |
| --------------------------------------------------------------------- | ------ | ------------------------------------------------------- | ------------------- |
| `createCustomFeature(client, payload, options?)`                      | POST   | `/api/{api_version}/custom_feature`                     | `CustomFeature`     |
| `deleteComponentById(client, customFeatureId, options?)`              | DELETE | `/api/{api_version}/component/{custom_feature_id}`      | -                   |
| `updateCustomFeatureById(client, customFeatureId, payload, options?)` | PATCH  | `/api/{api_version}/custom_feature/{custom_feature_id}` | `CustomFeature`     |
| `createCustomFeatureById(client, customFeatureId, payload, options?)` | POST   | `/api/{api_version}/custom_feature/{custom_feature_id}` | `CustomFeature`     |
| `getCustomFeatures(client, queryParams?, options?)`                   | GET    | `/api/{api_version}/custom_feature`                     | `CustomFeatureList` |
| `getCustomFeatureById(client, customFeatureId, options?)`             | GET    | `/api/{api_version}/custom_feature/{custom_feature_id}` | `CustomFeature`     |
| `deleteCustomFeatureById(client, customFeatureId, options?)`          | DELETE | `/api/{api_version}/custom_feature/{custom_feature_id}` | -                   |

## Custom fields endpoints

2 functions in `customFields`. 2 of them name a typed view from `customFieldsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `customFieldsUrls`.

| Function                                                  | Method | Path                                                          | Typed view                |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------- | ------------------------- |
| `getSettingsCustomFields(client, queryParams?, options?)` | GET    | `/api/{api_version}/settings/custom_fields`                   | `SettingsCustomFieldList` |
| `getSettingsCustomField(client, customFieldId, options?)` | GET    | `/api/{api_version}/settings/custom_fields/{custom_field_id}` | `SettingsCustomField`     |

## Custom forms endpoints

5 functions in `customForms`. 4 of them name a typed view from `customFormsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `customFormsUrls`.

| Function                                                            | Method | Path                                                        | Typed view               |
| ------------------------------------------------------------------- | ------ | ----------------------------------------------------------- | ------------------------ |
| `getSettingsCustomForms(client, queryParams?, options?)`            | GET    | `/api/{api_version}/settings/custom_forms`                  | `SettingsCustomFormList` |
| `createSettingsCustomForm(client, payload, options?)`               | POST   | `/api/{api_version}/settings/custom_forms`                  | `SettingsCustomForm`     |
| `getSettingsCustomForm(client, customFormId, options?)`             | GET    | `/api/{api_version}/settings/custom_forms/{custom_form_id}` | `SettingsCustomForm`     |
| `deleteSettingsCustomForm(client, customFormId, options?)`          | DELETE | `/api/{api_version}/settings/custom_forms/{custom_form_id}` | -                        |
| `updateSettingsCustomForm(client, customFormId, payload, options?)` | PATCH  | `/api/{api_version}/settings/custom_forms/{custom_form_id}` | `SettingsCustomForm`     |

## Day of month endpoints

2 functions in `dayOfMonth`. 2 of them name a typed view from `dayOfMonthDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `dayOfMonthUrls`.

| Function                                                 | Method | Path                                                         | Typed view               |
| -------------------------------------------------------- | ------ | ------------------------------------------------------------ | ------------------------ |
| `getSettingsDaysOfMonth(client, queryParams?, options?)` | GET    | `/api/{api_version}/settings/day_of_month`                   | `SettingsDayOfMonthList` |
| `getSettingsDayOfMonth(client, dayOfMonthId, options?)`  | GET    | `/api/{api_version}/settings/day_of_month/{day_of_month_id}` | `SettingsDayOfMonth`     |

## Departments endpoints

2 functions in `departments`. 2 of them name a typed view from `departmentsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `departmentsUrls`.

| Function                                                 | Method | Path                                                      | Typed view               |
| -------------------------------------------------------- | ------ | --------------------------------------------------------- | ------------------------ |
| `getSettingsDepartments(client, queryParams?, options?)` | GET    | `/api/{api_version}/settings/departments`                 | `SettingsDepartmentList` |
| `getSettingsDepartment(client, departmentId, options?)`  | GET    | `/api/{api_version}/settings/departments/{department_id}` | `SettingsDepartment`     |

## Designations endpoints

5 functions in `designations`. 2 of them name a typed view from `designationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `designationsUrls`.

| Function                                                              | Method | Path                                                        | Typed view                |
| --------------------------------------------------------------------- | ------ | ----------------------------------------------------------- | ------------------------- |
| `getSettingsDesignations(client, queryParams?, options?)`             | GET    | `/api/{api_version}/settings/designations`                  | `SettingsDesignationList` |
| `createSettingsDesignation(client, payload, options?)`                | POST   | `/api/{api_version}/settings/designations`                  | -                         |
| `getSettingsDesignation(client, designationId, options?)`             | GET    | `/api/{api_version}/settings/designations/{designation_id}` | `SettingsDesignation`     |
| `deleteSettingsDesignation(client, designationId, options?)`          | DELETE | `/api/{api_version}/settings/designations/{designation_id}` | -                         |
| `updateSettingsDesignation(client, designationId, payload, options?)` | PATCH  | `/api/{api_version}/settings/designations/{designation_id}` | -                         |

## Document templates endpoints

5 functions in `documentTemplates`. 4 of them name a typed view from `documentTemplatesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `documentTemplatesUrls`.

| Function                                                                        | Method | Path                                                                    | Typed view                     |
| ------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------- | ------------------------------ |
| `getSettingsDocumentTemplates(client, queryParams?, options?)`                  | GET    | `/api/{api_version}/settings/document_templates`                        | `SettingsDocumentTemplateList` |
| `createSettingsDocumentTemplate(client, payload, options?)`                     | POST   | `/api/{api_version}/settings/document_templates`                        | `SettingsDocumentTemplate`     |
| `getSettingsDocumentTemplate(client, documentTemplateId, options?)`             | GET    | `/api/{api_version}/settings/document_templates/{document_template_id}` | `SettingsDocumentTemplate`     |
| `deleteSettingsDocumentTemplate(client, documentTemplateId, options?)`          | DELETE | `/api/{api_version}/settings/document_templates/{document_template_id}` | -                              |
| `updateSettingsDocumentTemplate(client, documentTemplateId, payload, options?)` | PATCH  | `/api/{api_version}/settings/document_templates/{document_template_id}` | `SettingsDocumentTemplate`     |

## Email templates endpoints

5 functions in `emailTemplates`. 4 of them name a typed view from `emailTemplatesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `emailTemplatesUrls`.

| Function                                                                  | Method | Path                                                              | Typed view                  |
| ------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------- | --------------------------- |
| `getSettingsEmailTemplates(client, queryParams?, options?)`               | GET    | `/api/{api_version}/settings/email_templates`                     | `SettingsEmailTemplateList` |
| `createSettingsEmailTemplate(client, payload, options?)`                  | POST   | `/api/{api_version}/settings/email_templates`                     | `SettingsEmailTemplate`     |
| `getSettingsEmailTemplate(client, emailTemplateId, options?)`             | GET    | `/api/{api_version}/settings/email_templates/{email_template_id}` | `SettingsEmailTemplate`     |
| `deleteSettingsEmailTemplate(client, emailTemplateId, options?)`          | DELETE | `/api/{api_version}/settings/email_templates/{email_template_id}` | -                           |
| `updateSettingsEmailTemplate(client, emailTemplateId, payload, options?)` | PATCH  | `/api/{api_version}/settings/email_templates/{email_template_id}` | `SettingsEmailTemplate`     |

## Employees endpoints

5 functions in `employees`. 4 of them name a typed view from `employeesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `employeesUrls`.

| Function                                                  | Method | Path                                         | Typed view     |
| --------------------------------------------------------- | ------ | -------------------------------------------- | -------------- |
| `getEmployees(client, queryParams?, options?)`            | GET    | `/api/{api_version}/employees`               | `EmployeeList` |
| `createEmployee(client, payload, options?)`               | POST   | `/api/{api_version}/employees`               | `Employee`     |
| `deleteEmployee(client, employeeId, options?)`            | DELETE | `/api/{api_version}/employees/{employee_id}` | -              |
| `getEmployee(client, employeeId, queryParams?, options?)` | GET    | `/api/{api_version}/employees/{employee_id}` | `Employee`     |
| `updateEmployee(client, employeeId, payload, options?)`   | PATCH  | `/api/{api_version}/employees/{employee_id}` | `Employee`     |

## Events endpoints

4 functions in `events`. 3 of them name a typed view from `eventsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `eventsUrls`.

| Function                                                   | Method | Path                                             | Typed view  |
| ---------------------------------------------------------- | ------ | ------------------------------------------------ | ----------- |
| `getEvents(client, queryParams?, options?)`                | GET    | `/api/{api_version}/events`                      | `EventList` |
| `getEvent(client, eventUuid, queryParams?, options?)`      | GET    | `/api/{api_version}/events/{event_uuid}`         | `Event`     |
| `createEventExecute(client, eventUuid, payload, options?)` | POST   | `/api/{api_version}/events/{event_uuid}/execute` | -           |
| `createEventRemove(client, eventUuid, payload, options?)`  | POST   | `/api/{api_version}/events/{event_uuid}/remove`  | `Event`     |

## Express endpoints

1 function in `express`. 1 of them name a typed view from `expressDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `expressUrls`.

| Function                                   | Method | Path                         | Typed view |
| ------------------------------------------ | ------ | ---------------------------- | ---------- |
| `createExpress(client, payload, options?)` | POST   | `/api/{api_version}/express` | `Express`  |

## External databases endpoints

7 functions in `externalDatabases`. 7 of them name a typed view from `externalDatabasesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `externalDatabasesUrls`.

| Function                                                                      | Method | Path                                                                  | Typed view                             |
| ----------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------- | -------------------------------------- |
| `getExternalDatabases(client, queryParams?, options?)`                        | GET    | `/api/{api_version}/external_databases`                               | `ExternalDatabases`                    |
| `createExternalDatabase(client, payload, options?)`                           | POST   | `/api/{api_version}/external_databases`                               | `ExternalDatabase`                     |
| `getExternalDatabase(client, dbName, queryParams?, options?)`                 | GET    | `/api/{api_version}/external_databases/{db_name}`                     | `ExternalDatabases`                    |
| `createExternalDatabaseInsertRecord(client, dbName, payload, options?)`       | POST   | `/api/{api_version}/external_databases/{db_name}/insert_records`      | `ExternalDatabaseInsertRecord`         |
| `createExternalDatabaseSearch(client, dbName, payload, options?)`             | POST   | `/api/{api_version}/external_databases/{db_name}/search`              | `ExternalDatabaseSearch`               |
| `updateExternalDatabaseUpdateRecords(client, dbName, payload, options?)`      | PATCH  | `/api/{api_version}/external_databases/{db_name}/update_records`      | `ExternalDatabaseUpdateRecordsUpdated` |
| `getExternalDatabaseTable(client, dbName, tableName, queryParams?, options?)` | GET    | `/api/{api_version}/external_databases/{db_name}/tables/{table_name}` | `ExternalDatabases`                    |

## Fulfillment profiles endpoints

5 functions in `fulfillmentProfiles`. 4 of them name a typed view from `fulfillmentProfilesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `fulfillmentProfilesUrls`.

| Function                                                                            | Method | Path                                                                        | Typed view                       |
| ----------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------- | -------------------------------- |
| `getSettingsFulfillmentProfiles(client, queryParams?, options?)`                    | GET    | `/api/{api_version}/settings/fulfillment_profiles`                          | `SettingsFulfillmentProfileList` |
| `createSettingsFulfillmentProfile(client, payload, options?)`                       | POST   | `/api/{api_version}/settings/fulfillment_profiles`                          | `SettingsFulfillmentProfile`     |
| `getSettingsFulfillmentProfile(client, fulfillmentProfileId, options?)`             | GET    | `/api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}` | `SettingsFulfillmentProfile`     |
| `deleteSettingsFulfillmentProfile(client, fulfillmentProfileId, options?)`          | DELETE | `/api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}` | -                                |
| `updateSettingsFulfillmentProfile(client, fulfillmentProfileId, payload, options?)` | PATCH  | `/api/{api_version}/settings/fulfillment_profiles/{fulfillment_profile_id}` | `SettingsFulfillmentProfile`     |

## Fulfillment terms endpoints

5 functions in `fulfillmentTerms`. 4 of them name a typed view from `fulfillmentTermsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `fulfillmentTermsUrls`.

| Function                                                                      | Method | Path                                                                  | Typed view                    |
| ----------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------- | ----------------------------- |
| `getSettingsFulfillmentTerms(client, queryParams?, options?)`                 | GET    | `/api/{api_version}/settings/fulfillment_terms`                       | `SettingsFulfillmentTermList` |
| `createSettingsFulfillmentTerm(client, payload, options?)`                    | POST   | `/api/{api_version}/settings/fulfillment_terms`                       | `SettingsFulfillmentTerm`     |
| `getSettingsFulfillmentTerm(client, fulfillmentTermId, options?)`             | GET    | `/api/{api_version}/settings/fulfillment_terms/{fulfillment_term_id}` | `SettingsFulfillmentTerm`     |
| `deleteSettingsFulfillmentTerm(client, fulfillmentTermId, options?)`          | DELETE | `/api/{api_version}/settings/fulfillment_terms/{fulfillment_term_id}` | -                             |
| `updateSettingsFulfillmentTerm(client, fulfillmentTermId, payload, options?)` | PATCH  | `/api/{api_version}/settings/fulfillment_terms/{fulfillment_term_id}` | `SettingsFulfillmentTerm`     |

## Gift certificates endpoints

12 functions in `giftCertificates`. 11 of them name a typed view from `giftCertificatesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `giftCertificatesUrls`.

| Function                                                               | Method | Path                                                                         | Typed view                       |
| ---------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------- | -------------------------------- |
| `getGiftCertificates(client, queryParams?, options?)`                  | GET    | `/api/{api_version}/gift_certificates`                                       | `GiftCertificateList`            |
| `createGiftCertificate(client, payload, options?)`                     | POST   | `/api/{api_version}/gift_certificates`                                       | `GiftCertificate`                |
| `deleteGiftCertificate(client, gcId, options?)`                        | DELETE | `/api/{api_version}/gift_certificates/{gc_id}`                               | -                                |
| `getGiftCertificate(client, gcId, queryParams?, options?)`             | GET    | `/api/{api_version}/gift_certificates/{gc_id}`                               | `GiftCertificate`                |
| `updateGiftCertificate(client, gcId, payload, options?)`               | PATCH  | `/api/{api_version}/gift_certificates/{gc_id}`                               | `GiftCertificate`                |
| `getGiftCertificateAllocations(client, gcId, queryParams?, options?)`  | GET    | `/api/{api_version}/gift_certificates/{gc_id}/allocations`                   | `GiftCertificateAllocations`     |
| `getGiftCertificateTransactions(client, gcId, queryParams?, options?)` | GET    | `/api/{api_version}/gift_certificates/{gc_id}/transactions`                  | `GiftCertificateTransactionList` |
| `amendGiftCertificate(client, gcId, payload, options?)`                | POST   | `/api/{api_version}/gift_certificates/{gc_id}/amend`                         | `GiftCertificate`                |
| `allocateGiftCertificate(client, gcId, payload, options?)`             | POST   | `/api/{api_version}/gift_certificates/{gc_id}/allocations`                   | `GiftCertificate`                |
| `deallocateGiftCertificate(client, gcId, payload, options?)`           | POST   | `/api/{api_version}/gift_certificates/{gc_id}/deallocations`                 | `GiftCertificate`                |
| `getGiftCertificateAllocation(client, gcId, allocationId, options?)`   | GET    | `/api/{api_version}/gift_certificates/{gc_id}/allocations/{allocation_id}`   | `GiftCertificateAllocationRead`  |
| `getGiftCertificateTransaction(client, gcId, transactionId, options?)` | GET    | `/api/{api_version}/gift_certificates/{gc_id}/transactions/{transaction_id}` | `GiftCertificateTransactionRead` |

## Integration connections endpoints

2 functions in `integrationConnections`. 1 of them name a typed view from `integrationConnectionsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `integrationConnectionsUrls`.

| Function                                                                            | Method | Path                                                                     | Typed view               |
| ----------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------ | ------------------------ |
| `getIntegrationConnections(client, queryParams?, options?)`                         | GET    | `/api/{api_version}/integration_connections`                             | `IntegrationConnections` |
| `getIntegrationConnection(client, integrationConnectionId, queryParams?, options?)` | GET    | `/api/{api_version}/integration_connections/{integration_connection_id}` | -                        |

## Inventory adjustments endpoints

2 functions in `inventoryAdjustments`. 2 of them name a typed view from `inventoryAdjustmentsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `inventoryAdjustmentsUrls`.

| Function                                                                        | Method | Path                                                                 | Typed view                |
| ------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- | ------------------------- |
| `getInventoryAdjustments(client, queryParams?, options?)`                       | GET    | `/api/{api_version}/inventory_adjustments`                           | `InventoryAdjustmentList` |
| `getInventoryAdjustment(client, inventoryAdjustmentId, queryParams?, options?)` | GET    | `/api/{api_version}/inventory_adjustments/{inventory_adjustment_id}` | `InventoryAdjustment`     |

## Invoice terms endpoints

5 functions in `invoiceTerms`. 4 of them name a typed view from `invoiceTermsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `invoiceTermsUrls`.

| Function                                                              | Method | Path                                                          | Typed view                 |
| --------------------------------------------------------------------- | ------ | ------------------------------------------------------------- | -------------------------- |
| `getSettingsInvoiceTerms(client, queryParams?, options?)`             | GET    | `/api/{api_version}/settings/invoice_terms`                   | `SettingsInvoiceTermList`  |
| `createSettingsInvoiceTerm(client, payload, options?)`                | POST   | `/api/{api_version}/settings/invoice_terms`                   | `SettingsInvoiceTermWrite` |
| `getSettingsInvoiceTerm(client, invoiceTermId, options?)`             | GET    | `/api/{api_version}/settings/invoice_terms/{invoice_term_id}` | `SettingsInvoiceTerm`      |
| `deleteSettingsInvoiceTerm(client, invoiceTermId, options?)`          | DELETE | `/api/{api_version}/settings/invoice_terms/{invoice_term_id}` | -                          |
| `updateSettingsInvoiceTerm(client, invoiceTermId, payload, options?)` | PATCH  | `/api/{api_version}/settings/invoice_terms/{invoice_term_id}` | `SettingsInvoiceTermWrite` |

## Item fulfillments endpoints

9 functions in `itemFulfillments`. 7 of them name a typed view from `itemFulfillmentsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `itemFulfillmentsUrls`.

| Function                                                                 | Method | Path                                                                    | Typed view                |
| ------------------------------------------------------------------------ | ------ | ----------------------------------------------------------------------- | ------------------------- |
| `getItemFulfillments(client, queryParams?, options?)`                    | GET    | `/api/{api_version}/item_fulfillments`                                  | `ItemFulfillmentList`     |
| `createItemFulfillment(client, payload, options?)`                       | POST   | `/api/{api_version}/item_fulfillments`                                  | `ItemFulfillments`        |
| `getItemFulfillment(client, fulfillmentId, queryParams?, options?)`      | GET    | `/api/{api_version}/item_fulfillments/{fulfillment_id}`                 | `ItemFulfillmentRead`     |
| `updateItemFulfillment(client, fulfillmentId, payload, options?)`        | PATCH  | `/api/{api_version}/item_fulfillments/{fulfillment_id}`                 | `ItemFulfillmentUpdated`  |
| `createItemFulfillmentNote(client, fulfillmentId, note, options?)`       | POST   | `/api/{api_version}/item_fulfillments/{fulfillment_id}/notes`           | `ItemFulfillmentNotes`    |
| `deleteItemFulfillment(client, fulfillmentId, options?)`                 | DELETE | `/api/{api_version}/item_fulfillments/{fulfillment_id}`                 | -                         |
| `getItemFulfillmentNotes(client, fulfillmentId, queryParams?, options?)` | GET    | `/api/{api_version}/item_fulfillments/{fulfillment_id}/notes`           | `ItemFulfillmentNoteList` |
| `getItemFulfillmentNote(client, fulfillmentId, noteId, options?)`        | GET    | `/api/{api_version}/item_fulfillments/{fulfillment_id}/notes/{note_id}` | `ItemFulfillmentNoteRead` |
| `deleteItemFulfillmentNote(client, fulfillmentId, noteId, options?)`     | DELETE | `/api/{api_version}/item_fulfillments/{fulfillment_id}/notes/{note_id}` | -                         |

## Item receipts endpoints

7 functions in `itemReceipts`. 5 of them name a typed view from `itemReceiptsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `itemReceiptsUrls`.

| Function                                                                        | Method | Path                                                                   | Typed view                  |
| ------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------- | --------------------------- |
| `getItemReceipts(client, queryParams?, options?)`                               | GET    | `/api/{api_version}/item_receipts`                                     | `ItemReceiptList`           |
| `createItemReceipt(client, payload, options?)`                                  | POST   | `/api/{api_version}/item_receipts`                                     | `ItemReceipts`              |
| `updateItemReceipt(client, itemReceiptId, payload, options?)`                   | PATCH  | `/api/{api_version}/item_receipts/{item_receipt_id}`                   | `ItemReceiptUpdated`        |
| `getItemReceipt(client, itemReceiptId, queryParams?, options?)`                 | GET    | `/api/{api_version}/item_receipts/{item_receipt_id}`                   | `ItemReceipt`               |
| `getPurchaseOrderItemReceipts(client, purchaseOrderId, queryParams?, options?)` | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/item_receipts` | `PurchaseOrderItemReceipts` |
| `deleteItemReceipt(client, itemReceiptId, options?)`                            | DELETE | `/api/{api_version}/item_receipts/{item_receipt_id}`                   | -                           |
| `deleteItemReceiptNote(client, itemReceiptId, noteId, options?)`                | DELETE | `/api/{api_version}/item_receipts/{item_receipt_id}/notes/{note_id}`   | -                           |

## Labours endpoints

19 functions in `labours`. 15 of them name a typed view from `laboursDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `laboursUrls`.

| Function                                                                    | Method | Path                                                                           | Typed view                 |
| --------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------ | -------------------------- |
| `getLabourAvailability(client, queryParams?, options?)`                     | GET    | `/api/{api_version}/labour_availability`                                       | `LabourAvailabilityList`   |
| `getLabourProfiles(client, queryParams?, options?)`                         | GET    | `/api/{api_version}/labour_profiles`                                           | `LabourProfileList`        |
| `createLabourProfile(client, payload, options?)`                            | POST   | `/api/{api_version}/labour_profiles`                                           | `LabourProfile`            |
| `getLabours(client, queryParams?, options?)`                                | GET    | `/api/{api_version}/labours`                                                   | `LabourList`               |
| `createLabour(client, payload, options?)`                                   | POST   | `/api/{api_version}/labours`                                                   | `Labour`                   |
| `getLabourProfile(client, labourProfileId, queryParams?, options?)`         | GET    | `/api/{api_version}/labour_profiles/{labour_profile_id}`                       | `LabourProfile`            |
| `updateLabourProfile(client, labourProfileId, payload, options?)`           | PATCH  | `/api/{api_version}/labour_profiles/{labour_profile_id}`                       | -                          |
| `deleteLabourProfile(client, labourProfileId, options?)`                    | DELETE | `/api/{api_version}/labour_profiles/{labour_profile_id}`                       | -                          |
| `getLaboursAvailableForBooking(client, queryParams?, options?)`             | GET    | `/api/{api_version}/labours/available_for_booking`                             | `LabourList`               |
| `updateLabour(client, labourUuid, payload, options?)`                       | PATCH  | `/api/{api_version}/labours/{labour_uuid}`                                     | `Labour`                   |
| `deleteLabour(client, labourUuid, options?)`                                | DELETE | `/api/{api_version}/labours/{labour_uuid}`                                     | -                          |
| `getLabour(client, labourUuid, queryParams?, options?)`                     | GET    | `/api/{api_version}/labours/{labour_uuid}`                                     | `Labour`                   |
| `cancelLabour(client, labourId, payload, options?)`                         | POST   | `/api/{api_version}/labours/{labour_id}/cancel`                                | `Labour`                   |
| `reactivateLabour(client, labourId, payload, options?)`                     | POST   | `/api/{api_version}/labours/{labour_id}/reactivate`                            | `Labour`                   |
| `getLabourOrders(client, labourUuid, queryParams?, options?)`               | GET    | `/api/{api_version}/labours/{labour_uuid}/orders`                              | `LabourOrderList`          |
| `updateLabourAvailability(client, payload, options?)`                       | PATCH  | `/api/{api_version}/labour_availability`                                       | -                          |
| `getLabourProfileSessions(client, labourProfileId, queryParams?, options?)` | GET    | `/api/{api_version}/labour_profiles/{labour_profile_id}/sessions`              | `LabourProfileSessionList` |
| `getLabourProfileSession(client, labourProfileId, sessionId, options?)`     | GET    | `/api/{api_version}/labour_profiles/{labour_profile_id}/sessions/{session_id}` | `LabourProfileSessionView` |
| `getLabourCalendar(client, labourId, queryParams?, options?)`               | GET    | `/api/{api_version}/labours/{labour_id}/availability`                          | `LabourCalendar`           |

## Milestones endpoints

5 functions in `milestones`. 4 of them name a typed view from `milestonesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `milestonesUrls`.

| Function                                                                    | Method | Path                                                     | Typed view   |
| --------------------------------------------------------------------------- | ------ | -------------------------------------------------------- | ------------ |
| `getMilestones(client, queryParams?, options?)`                             | GET    | `/api/{api_version}/milestones`                          | `Milestones` |
| `getMilestonesAccountById(client, accountId, queryParams?, options?)`       | GET    | `/api/{api_version}/milestones/account/{account_id}`     | `Milestones` |
| `getMilestonesLabourById(client, labourId, queryParams?, options?)`         | GET    | `/api/{api_version}/milestones/labour/{labour_id}`       | `Milestones` |
| `getMilestonesEmployeeByCode(client, employeeCode, queryParams?, options?)` | GET    | `/api/{api_version}/milestones/employee/{employee_code}` | `Milestones` |
| `getMilestone(client, milestoneUuid, options?)`                             | GET    | `/api/{api_version}/milestones/{milestone_uuid}`         | -            |

## Note attachments endpoints

1 function in `noteAttachments`. 1 of them name a typed view from `noteAttachmentsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `noteAttachmentsUrls`.

| Function                                              | Method | Path                                                   | Typed view       |
| ----------------------------------------------------- | ------ | ------------------------------------------------------ | ---------------- |
| `getNoteAttachment(client, attachmentUuid, options?)` | GET    | `/api/{api_version}/note_attachment/{attachment_uuid}` | `NoteAttachment` |

## Note groups endpoints

7 functions in `noteGroups`. 5 of them name a typed view from `noteGroupsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `noteGroupsUrls`.

| Function                                                                         | Method | Path                                                                    | Typed view       |
| -------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------- | ---------------- |
| `getNoteGroups(client, queryParams?, options?)`                                  | GET    | `/api/{api_version}/note_groups`                                        | `NoteGroupList`  |
| `createNoteGroup(client, payload, options?)`                                     | POST   | `/api/{api_version}/note_groups`                                        | `NoteGroup`      |
| `deleteNoteGroup(client, noteGroupId, options?)`                                 | DELETE | `/api/{api_version}/note_groups/{note_group_id}`                        | -                |
| `getNoteGroup(client, noteGroupId, queryParams?, options?)`                      | GET    | `/api/{api_version}/note_groups/{note_group_id}`                        | `NoteGroup`      |
| `updateNoteGroup(client, noteGroupId, payload, options?)`                        | PATCH  | `/api/{api_version}/note_groups/{note_group_id}`                        | `NoteGroup`      |
| `getNoteGroupNotes(client, noteGroupId, queryParams?, options?)`                 | GET    | `/api/{api_version}/note_groups/{note_group_id}/notes`                  | `NoteGroupNotes` |
| `getNoteGroupNotesByUser(client, noteGroupId, noteUser, queryParams?, options?)` | GET    | `/api/{api_version}/note_groups/{note_group_id}/notes/user/{note_user}` | -                |

## Orders endpoints

60 functions in `orders`. 41 of them name a typed view from `ordersDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `ordersUrls`.

| Function                                                                                       | Method | Path                                                                                                       | Typed view                  |
| ---------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------- | --------------------------- |
| `getOrders(client, queryParams?, options?)`                                                    | GET    | `/api/{api_version}/orders`                                                                                | `OrderList`                 |
| `createOrder(client, payload, options?)`                                                       | POST   | `/api/{api_version}/orders`                                                                                | `OrderRead`                 |
| `getOrder(client, orderId, queryParams?, options?)`                                            | GET    | `/api/{api_version}/orders/{order_id}`                                                                     | `OrderRead`                 |
| `deleteOrder(client, orderId, options?)`                                                       | DELETE | `/api/{api_version}/orders/{order_id}`                                                                     | -                           |
| `activateOrder(client, orderId, payload, options?)`                                            | POST   | `/api/{api_version}/orders/{order_id}/activate`                                                            | -                           |
| `createOrderActivateDraft(client, orderId, payload, options?)`                                 | POST   | `/api/{api_version}/orders/{order_id}/activate_draft`                                                      | `OrderRead`                 |
| `getOrderBillingPreferences(client, orderId, queryParams?, options?)`                          | GET    | `/api/{api_version}/orders/{order_id}/billing_preferences`                                                 | `OrderBillingPreferences`   |
| `updateOrderBillingPreferences(client, orderId, payload, options?)`                            | PATCH  | `/api/{api_version}/orders/{order_id}/billing_preferences`                                                 | `OrderRead`                 |
| `replaceOrderBillingPreferences(client, orderId, payload, options?)`                           | PUT    | `/api/{api_version}/orders/{order_id}/billing_preferences`                                                 | `OrderRead`                 |
| `cancelOrder(client, orderId, payload, options?)`                                              | POST   | `/api/{api_version}/orders/{order_id}/cancel`                                                              | `OrderRead`                 |
| `changeOrder(client, orderId, payload, options?)`                                              | POST   | `/api/{api_version}/orders/{order_id}/change`                                                              | `OrderRead`                 |
| `createOrderConvertToOrder(client, orderId, payload, options?)`                                | POST   | `/api/{api_version}/orders/{order_id}/convert_to_order`                                                    | `OrderRead`                 |
| `getOrderCustomObjects(client, orderId, queryParams?, options?)`                               | GET    | `/api/{api_version}/orders/{order_id}/custom_objects`                                                      | `AccountOrders`             |
| `getOrderCustomObjectsInstances(client, orderId, queryParams?, options?)`                      | GET    | `/api/{api_version}/orders/{order_id}/custom_objects_instances`                                            | `AccountOrders`             |
| `createOrderDiscardDraft(client, orderId, payload, options?)`                                  | POST   | `/api/{api_version}/orders/{order_id}/discard_draft`                                                       | `OrderDiscardDraft`         |
| `createOrderExtendTrial(client, orderId, payload, options?)`                                   | POST   | `/api/{api_version}/orders/{order_id}/extend_trial`                                                        | `OrderExtendTrial`          |
| `getOrderInformation(client, orderId, queryParams?, options?)`                                 | GET    | `/api/{api_version}/orders/{order_id}/information`                                                         | `OrderInformation`          |
| `updateOrderInformation(client, orderId, payload, options?)`                                   | PATCH  | `/api/{api_version}/orders/{order_id}/information`                                                         | `OrderRead`                 |
| `getOrderItemFulfillments(client, orderId, queryParams?, options?)`                            | GET    | `/api/{api_version}/orders/{order_id}/item_fulfillments`                                                   | `AccountOrders`             |
| `getOrderLines(client, orderId, queryParams?, options?)`                                       | GET    | `/api/{api_version}/orders/{order_id}/lines`                                                               | `OrderLines`                |
| `getOrderNotes(client, orderId, queryParams?, options?)`                                       | GET    | `/api/{api_version}/orders/{order_id}/notes`                                                               | `OrderNoteList`             |
| `createOrderNote(client, orderId, note, options?)`                                             | POST   | `/api/{api_version}/orders/{order_id}/notes`                                                               | `OrderNote`                 |
| `getOrderPaymentMethods(client, orderId, queryParams?, options?)`                              | GET    | `/api/{api_version}/orders/{order_id}/payment_methods`                                                     | `OrderPaymentMethods`       |
| `getOrderPdf(client, orderId, queryParams?, options?)`                                         | GET    | `/api/{api_version}/orders/{order_id}/pdf`                                                                 | `OrderPdf`                  |
| `reactivateOrder(client, orderId, payload, options?)`                                          | POST   | `/api/{api_version}/orders/{order_id}/reactivate`                                                          | `OrderRead`                 |
| `createOrderRelinquish(client, orderId, payload, options?)`                                    | POST   | `/api/{api_version}/orders/{order_id}/relinquish`                                                          | `OrderRead`                 |
| `updateOrderLine(client, orderId, lineUuid, payload, options?)`                                | PATCH  | `/api/{api_version}/orders/{order_id}/lines/{line_uuid}`                                                   | `OrderRead`                 |
| `getOrderLine(client, orderId, lineUuid, queryParams?, options?)`                              | GET    | `/api/{api_version}/orders/{order_id}/lines/{line_uuid}`                                                   | `OrderLine`                 |
| `deleteOrderNote(client, orderId, orderNoteId, options?)`                                      | DELETE | `/api/{api_version}/orders/{order_id}/notes/{order_note_id}`                                               | -                           |
| `getOrderNote(client, orderId, orderNoteId, queryParams?, options?)`                           | GET    | `/api/{api_version}/orders/{order_id}/notes/{order_note_id}`                                               | `OrderNote`                 |
| `updateOrderNote(client, orderId, orderNoteId, note, options?)`                                | PATCH  | `/api/{api_version}/orders/{order_id}/notes/{order_note_id}`                                               | `OrderNote`                 |
| `getOrderPaymentMethod(client, orderId, paymentMethodRef, queryParams?, options?)`             | GET    | `/api/{api_version}/orders/{order_id}/payment_methods/{payment_method_ref}`                                | `OrderPaymentMethod`        |
| `updateOrderLineBillingPreferences(client, orderId, lineUuid, payload, options?)`              | PATCH  | `/api/{api_version}/orders/{order_id}/lines/{line_uuid}/billing_preferences`                               | `OrderRead`                 |
| `replaceOrderLineBillingPreferences(client, orderId, lineUuid, payload, options?)`             | PUT    | `/api/{api_version}/orders/{order_id}/lines/{line_uuid}/billing_preferences`                               | `OrderRead`                 |
| `getOrderNoteFiles(client, orderId, orderNoteId, queryParams?, options?)`                      | GET    | `/api/{api_version}/orders/{order_id}/notes/{order_note_id}/files`                                         | `OrderNoteFileList`         |
| `getOrderNoteFile(client, orderId, orderNoteId, orderFileId, queryParams?, options?)`          | GET    | `/api/{api_version}/orders/{order_id}/notes/{order_note_id}/files/{order_file_id}`                         | `OrderNoteFile`             |
| `getOrdersNotes(client, queryParams?, options?)`                                               | GET    | `/api/{api_version}/orders/notes`                                                                          | `OrderNoteList`             |
| `previewOrder(client, payload, options?)`                                                      | POST   | `/api/{api_version}/orders/preview`                                                                        | -                           |
| `createOrderExpress(client, payload, options?)`                                                | POST   | `/api/{api_version}/orders/express`                                                                        | -                           |
| `acceptOrder(client, orderId, options?)`                                                       | POST   | `/api/{api_version}/orders/{order_id}/accept`                                                              | -                           |
| `activateOrderInvoiceFromDormant(client, orderId, invoiceUuid, payload, options?)`             | POST   | `/api/{api_version}/orders/{order_id}/activate_invoice_from_dormant/{invoice_uuid}`                        | -                           |
| `previewOrderChange(client, orderId, payload, options?)`                                       | POST   | `/api/{api_version}/orders/{order_id}/change/preview`                                                      | `OrderRead`                 |
| `changeOrderStatus(client, orderId, payload, options?)`                                        | POST   | `/api/{api_version}/orders/{order_id}/change_status`                                                       | -                           |
| `adjustOrderContract(client, orderId, payload, options?)`                                      | POST   | `/api/{api_version}/orders/{order_id}/contract_adjustment`                                                 | -                           |
| `previewOrderContractAdjustment(client, orderId, payload, options?)`                           | POST   | `/api/{api_version}/orders/{order_id}/contract_adjustment/preview`                                         | -                           |
| `downgradeOrder(client, orderId, payload, options?)`                                           | POST   | `/api/{api_version}/orders/{order_id}/downgrade`                                                           | -                           |
| `previewOrderDowngrade(client, orderId, payload, options?)`                                    | POST   | `/api/{api_version}/orders/{order_id}/downgrade/preview`                                                   | -                           |
| `upgradeOrder(client, orderId, payload, options?)`                                             | POST   | `/api/{api_version}/orders/{order_id}/upgrade`                                                             | -                           |
| `previewOrderUpgrade(client, orderId, payload, options?)`                                      | POST   | `/api/{api_version}/orders/{order_id}/upgrade/preview`                                                     | -                           |
| `terminateOrderTrial(client, orderId, options?)`                                               | POST   | `/api/{api_version}/orders/{order_id}/terminate_trial`                                                     | -                           |
| `deleteOrderNoteFile(client, orderId, orderNoteId, orderFileId, options?)`                     | DELETE | `/api/{api_version}/orders/{order_id}/notes/{order_note_id}/files/{order_file_id}`                         | -                           |
| `getOrderCustomObject(client, orderId, customObjectId, options?)`                              | GET    | `/api/{api_version}/orders/{order_id}/custom_objects/{custom_object_id}`                                   | `OrderCustomObject`         |
| `getOrderCustomObjectInstance(client, orderId, customObjectId, instanceId, options?)`          | GET    | `/api/{api_version}/orders/{order_id}/custom_objects/{custom_object_id}/instances/{instance_id}`           | -                           |
| `getOrderCustomObjectsInstance(client, orderId, customObjectId, options?)`                     | GET    | `/api/{api_version}/orders/{order_id}/custom_objects_instances/{custom_object_id}`                         | `OrderCustomObject`         |
| `getOrderCustomObjectsInstanceInstance(client, orderId, customObjectId, instanceId, options?)` | GET    | `/api/{api_version}/orders/{order_id}/custom_objects_instances/{custom_object_id}/instances/{instance_id}` | -                           |
| `getOrderItemFulfillment(client, orderId, fulfillmentId, options?)`                            | GET    | `/api/{api_version}/orders/{order_id}/item_fulfillments/{fulfillment_id}`                                  | `OrderItemFulfillment`      |
| `getOrderKpis(client, orderId, options?)`                                                      | GET    | `/api/{api_version}/orders/{order_id}/kpis`                                                                | `OrderKpis`                 |
| `getOrderPayment(client, orderId, paymentId, options?)`                                        | GET    | `/api/{api_version}/orders/{order_id}/payments/{payment_id}`                                               | `OrderPayment`              |
| `getOrderQuotePartialInvoices(client, orderId, options?)`                                      | GET    | `/api/{api_version}/orders/{order_id}/quote_partial_invoices`                                              | `OrderQuotePartialInvoices` |
| `getOrderShippingPdf(client, orderId, shippingLineId, options?)`                               | GET    | `/api/{api_version}/orders/{order_id}/shipping_pdf/{shipping_line_id}`                                     | -                           |

## Organisation endpoints

1 function in `organisation`. 1 of them name a typed view from `organisationDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `organisationUrls`.

| Function                                    | Method | Path                                       | Typed view             |
| ------------------------------------------- | ------ | ------------------------------------------ | ---------------------- |
| `getSettingsOrganisation(client, options?)` | GET    | `/api/{api_version}/settings/organisation` | `SettingsOrganisation` |

## Organisations endpoints

5 functions in `organisations`. 0 of them name a typed view from `organisationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `organisationsUrls`.

| Function                                                                | Method | Path                                                          | Typed view |
| ----------------------------------------------------------------------- | ------ | ------------------------------------------------------------- | ---------- |
| `getSettingsOrganisations(client, queryParams?, options?)`              | GET    | `/api/{api_version}/settings/organisations`                   | -          |
| `createSettingsOrganisation(client, payload, options?)`                 | POST   | `/api/{api_version}/settings/organisations`                   | -          |
| `getSettingsOrganisation(client, organisationId, options?)`             | GET    | `/api/{api_version}/settings/organisations/{organisation_id}` | -          |
| `deleteSettingsOrganisation(client, organisationId, options?)`          | DELETE | `/api/{api_version}/settings/organisations/{organisation_id}` | -          |
| `updateSettingsOrganisation(client, organisationId, payload, options?)` | PATCH  | `/api/{api_version}/settings/organisations/{organisation_id}` | -          |

## Payments endpoints

15 functions in `payments`. 13 of them name a typed view from `paymentsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `paymentsUrls`.

| Function                                                                                      | Method | Path                                                                                       | Typed view         |
| --------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------ | ------------------ |
| `getPayments(client, queryParams?, options?)`                                                 | GET    | `/api/{api_version}/payments`                                                              | `PaymentList`      |
| `getPaymentsNotes(client, queryParams?, options?)`                                            | GET    | `/api/{api_version}/payments/notes`                                                        | `PaymentsNoteList` |
| `deletePayment(client, paymentId, options?)`                                                  | DELETE | `/api/{api_version}/payments/{payment_id}`                                                 | -                  |
| `updatePayment(client, paymentId, payload, options?)`                                         | PATCH  | `/api/{api_version}/payments/{payment_id}`                                                 | `PaymentRead`      |
| `getPayment(client, paymentId, queryParams?, options?)`                                       | GET    | `/api/{api_version}/payments/{payment_id}`                                                 | `PaymentRead`      |
| `getInvoicePayments(client, invoiceId, queryParams?, options?)`                               | GET    | `/api/{api_version}/invoices/{invoice_id}/payments`                                        | `PaymentList`      |
| `getOrderPayments(client, orderId, queryParams?, options?)`                                   | GET    | `/api/{api_version}/orders/{order_id}/payments`                                            | `PaymentList`      |
| `getPaymentNotes(client, paymentId, queryParams?, options?)`                                  | GET    | `/api/{api_version}/payments/{payment_id}/notes`                                           | `PaymentNoteList`  |
| `createPaymentNote(client, paymentId, note, options?)`                                        | POST   | `/api/{api_version}/payments/{payment_id}/notes`                                           | `PaymentNoteRead`  |
| `getPaymentNote(client, paymentId, paymentNoteId, queryParams?, options?)`                    | GET    | `/api/{api_version}/payments/{payment_id}/notes/{payment_note_id}`                         | `PaymentNoteRead`  |
| `deletePaymentNote(client, paymentId, paymentNoteId, options?)`                               | DELETE | `/api/{api_version}/payments/{payment_id}/notes/{payment_note_id}`                         | -                  |
| `getPaymentNoteFile(client, paymentId, paymentNoteId, paymentFileId, queryParams?, options?)` | GET    | `/api/{api_version}/payments/{payment_id}/notes/{payment_note_id}/files/{payment_file_id}` | `PaymentNoteFile`  |
| `createPayment(client, payload, options?)`                                                    | POST   | `/api/{api_version}/payments`                                                              | `PaymentRead`      |
| `getInvoicePayment(client, invoiceId, paymentId, options?)`                                   | GET    | `/api/{api_version}/invoices/{invoice_id}/payments/{payment_id}`                           | `PaymentRead`      |
| `getPaymentNoteFiles(client, paymentId, paymentNoteId, options?)`                             | GET    | `/api/{api_version}/payments/{payment_id}/notes/{payment_note_id}/files`                   | `NoteFileList`     |

## Portals endpoints

7 functions in `portals`. 3 of them name a typed view from `portalsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `portalsUrls`.

| Function                                                | Method | Path                                        | Typed view             |
| ------------------------------------------------------- | ------ | ------------------------------------------- | ---------------------- |
| `activatePortal(client, payload, options?)`             | POST   | `/api/{api_version}/portal/activate`        | -                      |
| `createPortalChangePassword(client, payload, options?)` | POST   | `/api/{api_version}/portal/change_password` | `PortalChangePassword` |
| `createPortalLogin(client, payload, options?)`          | POST   | `/api/{api_version}/portal/login`           | `PortalLogin`          |
| `createPortalReset(client, payload, options?)`          | POST   | `/api/{api_version}/portal/reset`           | -                      |
| `createPortalResetLink(client, payload, options?)`      | POST   | `/api/{api_version}/portal/reset_link`      | `PortalResetLink`      |
| `createPortalValidate(client, payload, options?)`       | POST   | `/api/{api_version}/portal/validate`        | -                      |
| `setPortalPassword(client, payload, options?)`          | POST   | `/api/{api_version}/portal/change`          | -                      |

## Pricing periods endpoints

5 functions in `pricingPeriods`. 4 of them name a typed view from `pricingPeriodsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `pricingPeriodsUrls`.

| Function                                                                  | Method | Path                                                              | Typed view                  |
| ------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------- | --------------------------- |
| `getSettingsPricingPeriods(client, queryParams?, options?)`               | GET    | `/api/{api_version}/settings/pricing_periods`                     | `SettingsPricingPeriodList` |
| `createSettingsPricingPeriod(client, payload, options?)`                  | POST   | `/api/{api_version}/settings/pricing_periods`                     | `SettingsPricingPeriod`     |
| `getSettingsPricingPeriod(client, pricingPeriodId, options?)`             | GET    | `/api/{api_version}/settings/pricing_periods/{pricing_period_id}` | `SettingsPricingPeriod`     |
| `deleteSettingsPricingPeriod(client, pricingPeriodId, options?)`          | DELETE | `/api/{api_version}/settings/pricing_periods/{pricing_period_id}` | -                           |
| `updateSettingsPricingPeriod(client, pricingPeriodId, payload, options?)` | PATCH  | `/api/{api_version}/settings/pricing_periods/{pricing_period_id}` | `SettingsPricingPeriod`     |

## Proforma invoices endpoints

4 functions in `proformaInvoices`. 0 of them name a typed view from `proformaInvoicesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `proformaInvoicesUrls`.

| Function                                                              | Method | Path                                                          | Typed view |
| --------------------------------------------------------------------- | ------ | ------------------------------------------------------------- | ---------- |
| `getProformaInvoices(client, queryParams?, options?)`                 | GET    | `/api/{api_version}/proforma_invoices`                        | -          |
| `getProformaInvoice(client, proformaId, options?)`                    | GET    | `/api/{api_version}/proforma_invoices/{proforma_id}`          | -          |
| `deleteProformaInvoice(client, proformaId, options?)`                 | DELETE | `/api/{api_version}/proforma_invoices/{proforma_id}`          | -          |
| `createProformaInvoicePayment(client, proformaId, payload, options?)` | POST   | `/api/{api_version}/proforma_invoices/{proforma_id}/payments` | -          |

## Purchase credit note applications endpoints

2 functions in `purchaseCreditNoteApplications`. 2 of them name a typed view from `purchaseCreditNoteApplicationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `purchaseCreditNoteApplicationsUrls`.

| Function                                                                                            | Method | Path                                                                                         | Typed view                          |
| --------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------- | ----------------------------------- |
| `getPurchaseCreditNoteApplications(client, queryParams?, options?)`                                 | GET    | `/api/{api_version}/purchase_credit_note_applications`                                       | `PurchaseCreditNoteApplicationList` |
| `getPurchaseCreditNoteApplication(client, purchaseCreditNoteApplicationId, queryParams?, options?)` | GET    | `/api/{api_version}/purchase_credit_note_applications/{purchase_credit_note_application_id}` | `PurchaseCreditNoteApplicationRead` |

## Purchase credit notes endpoints

8 functions in `purchaseCreditNotes`. 5 of them name a typed view from `purchaseCreditNotesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `purchaseCreditNotesUrls`.

| Function                                                                       | Method | Path                                                                                 | Typed view                  |
| ------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------ | --------------------------- |
| `getPurchaseCreditNotes(client, queryParams?, options?)`                       | GET    | `/api/{api_version}/purchase_credit_notes`                                           | `PurchaseCreditNoteList`    |
| `getPurchaseCreditNote(client, purchaseCreditNoteId, queryParams?, options?)`  | GET    | `/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}`                 | `PurchaseCreditNoteRead`    |
| `updatePurchaseCreditNote(client, purchaseCreditNoteId, payload, options?)`    | PATCH  | `/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}`                 | `PurchaseCreditNoteUpdated` |
| `createPurchaseCreditNote(client, payload, options?)`                          | POST   | `/api/{api_version}/purchase_credit_notes`                                           | `PurchaseCreditNoteCreated` |
| `deletePurchaseCreditNote(client, purchaseCreditNoteId, options?)`             | DELETE | `/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}`                 | -                           |
| `applyPurchaseCreditNote(client, purchaseCreditNoteId, payload, options?)`     | POST   | `/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/apply`           | `PurchaseCreditNoteCreated` |
| `createPurchaseCreditNoteNote(client, purchaseCreditNoteId, note, options?)`   | POST   | `/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/notes`           | -                           |
| `deletePurchaseCreditNoteNote(client, purchaseCreditNoteId, noteId, options?)` | DELETE | `/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/notes/{note_id}` | -                           |

## Purchase express endpoints

1 function in `purchaseExpress`. 1 of them name a typed view from `purchaseExpressDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `purchaseExpressUrls`.

| Function                                           | Method | Path                                  | Typed view        |
| -------------------------------------------------- | ------ | ------------------------------------- | ----------------- |
| `createPurchaseExpress(client, payload, options?)` | POST   | `/api/{api_version}/purchase_express` | `PurchaseExpress` |

## Purchase invoices endpoints

23 functions in `purchaseInvoices`. 20 of them name a typed view from `purchaseInvoicesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `purchaseInvoicesUrls`.

| Function                                                                                              | Method | Path                                                                                                            | Typed view                           |
| ----------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `getPurchaseInvoices(client, queryParams?, options?)`                                                 | GET    | `/api/{api_version}/purchase_invoices`                                                                          | `PurchaseInvoiceList`                |
| `createPurchaseInvoice(client, payload, options?)`                                                    | POST   | `/api/{api_version}/purchase_invoices`                                                                          | `PurchaseInvoiceInformation`         |
| `getPurchaseInvoicesNotes(client, queryParams?, options?)`                                            | GET    | `/api/{api_version}/purchase_invoices/notes`                                                                    | `PurchaseInvoicesNoteList`           |
| `deletePurchaseInvoice(client, purchaseInvoiceId, options?)`                                          | DELETE | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}`                                                    | -                                    |
| `getPurchaseInvoice(client, purchaseInvoiceId, queryParams?, options?)`                               | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}`                                                    | `PurchaseInvoiceRead`                |
| `amendPurchaseInvoice(client, purchaseInvoiceId, payload, options?)`                                  | POST   | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/amend`                                              | `PurchaseInvoiceRead`                |
| `cancelPurchaseInvoice(client, purchaseInvoiceId, payload, options?)`                                 | POST   | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/cancel`                                             | `PurchaseInvoiceCancel`              |
| `getPurchaseInvoiceInformation(client, purchaseInvoiceId, queryParams?, options?)`                    | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/information`                                        | `PurchaseInvoice`                    |
| `updatePurchaseInvoiceInformation(client, purchaseInvoiceId, payload, options?)`                      | PATCH  | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/information`                                        | `PurchaseInvoiceInformation`         |
| `getPurchaseInvoiceLines(client, purchaseInvoiceId, queryParams?, options?)`                          | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/lines`                                              | `PurchaseInvoiceLines`               |
| `getPurchaseInvoiceNotes(client, purchaseInvoiceId, queryParams?, options?)`                          | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes`                                              | `PurchaseInvoiceNoteList`            |
| `createPurchaseInvoiceNote(client, purchaseInvoiceId, note, options?)`                                | POST   | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes`                                              | `PurchaseInvoiceNotes`               |
| `getPurchaseInvoicePdf(client, purchaseInvoiceId, queryParams?, options?)`                            | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/pdf`                                                | -                                    |
| `getPurchaseInvoicePurchaseCreditNoteApplications(client, purchaseInvoiceId, queryParams?, options?)` | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications`                  | `AccountPurchaseInvoices`            |
| `getPurchaseInvoicePurchasePayments(client, purchaseInvoiceId, queryParams?, options?)`               | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments`                                  | `PurchaseInvoicePurchasePaymentList` |
| `reactivatePurchaseInvoice(client, purchaseInvoiceId, payload, options?)`                             | POST   | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/reactivate`                                         | `PurchaseInvoiceInformation`         |
| `getPurchaseInvoiceLine(client, purchaseInvoiceId, purchaseInvoiceLineUuid, queryParams?, options?)`  | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/lines/{purchase_invoice_line_uuid}`                 | `PurchaseInvoiceLine`                |
| `updatePurchaseInvoiceNote(client, purchaseInvoiceId, noteId, note, options?)`                        | PATCH  | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}`                                    | `PurchaseInvoiceNote`                |
| `getPurchaseInvoiceNote(client, purchaseInvoiceId, noteId, queryParams?, options?)`                   | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}`                                    | `PurchaseInvoiceNote`                |
| `deletePurchaseInvoiceNote(client, purchaseInvoiceId, noteId, options?)`                              | DELETE | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}`                                    | -                                    |
| `getPurchaseInvoiceNoteFiles(client, purchaseInvoiceId, noteId, queryParams?, options?)`              | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files`                              | `PurchaseInvoiceNoteFileList`        |
| `getPurchaseInvoiceNoteFile(client, purchaseInvoiceId, noteId, fileId, queryParams?, options?)`       | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/notes/{note_id}/files/{file_id}`                    | `PurchaseInvoiceNoteFile`            |
| `getPurchaseInvoicePurchaseCreditNoteApplication(client, purchaseInvoiceId, applicationId, options?)` | GET    | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_credit_note_applications/{application_id}` | `PurchaseCreditNoteApplicationRead`  |

## Purchase orders endpoints

23 functions in `purchaseOrders`. 20 of them name a typed view from `purchaseOrdersDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `purchaseOrdersUrls`.

| Function                                                                                                              | Method | Path                                                                                                                   | Typed view                         |
| --------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `getPurchaseOrders(client, queryParams?, options?)`                                                                   | GET    | `/api/{api_version}/purchase_orders`                                                                                   | `PurchaseOrderList`                |
| `createPurchaseOrder(client, payload, options?)`                                                                      | POST   | `/api/{api_version}/purchase_orders`                                                                                   | `PurchaseOrders`                   |
| `getPurchaseOrdersNotes(client, queryParams?, options?)`                                                              | GET    | `/api/{api_version}/purchase_orders/notes`                                                                             | `PurchaseOrdersNoteList`           |
| `deletePurchaseOrder(client, purchaseOrderId, options?)`                                                              | DELETE | `/api/{api_version}/purchase_orders/{purchase_order_id}`                                                               | -                                  |
| `updatePurchaseOrder(client, purchaseOrderId, payload, options?)`                                                     | PATCH  | `/api/{api_version}/purchase_orders/{purchase_order_id}`                                                               | `PurchaseOrderUpdated`             |
| `getPurchaseOrder(client, purchaseOrderId, queryParams?, options?)`                                                   | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}`                                                               | `PurchaseOrderRead`                |
| `cancelPurchaseOrder(client, purchaseOrderId, payload, options?)`                                                     | POST   | `/api/{api_version}/purchase_orders/{purchase_order_id}/cancel`                                                        | `PurchaseOrderUpdated`             |
| `changePurchaseOrder(client, purchaseOrderId, payload, options?)`                                                     | POST   | `/api/{api_version}/purchase_orders/{purchase_order_id}/change`                                                        | `PurchaseOrderRead`                |
| `getPurchaseOrderInformation(client, purchaseOrderId, queryParams?, options?)`                                        | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/information`                                                   | `PurchaseOrderInformation`         |
| `getPurchaseOrderLines(client, purchaseOrderId, queryParams?, options?)`                                              | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/lines`                                                         | `PurchaseOrderLineList`            |
| `getPurchaseOrderNotes(client, purchaseOrderId, queryParams?, options?)`                                              | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/notes`                                                         | `PurchaseOrderNotes`               |
| `createPurchaseOrderNote(client, purchaseOrderId, note, options?)`                                                    | POST   | `/api/{api_version}/purchase_orders/{purchase_order_id}/notes`                                                         | `PurchaseOrdersNote`               |
| `createPurchaseOrderPurchaseInvoice(client, purchaseOrderId, payload, options?)`                                      | POST   | `/api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices`                                             | `PurchaseOrderPurchaseInvoice`     |
| `getPurchaseOrderPurchaseInvoices(client, purchaseOrderId, queryParams?, options?)`                                   | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/purchase_invoices`                                             | `PurchaseOrderPurchaseInvoiceList` |
| `getPurchaseOrderPurchasePayments(client, purchaseOrderId, queryParams?, options?)`                                   | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/purchase_payments`                                             | `PurchaseOrderPurchasePaymentList` |
| `reactivatePurchaseOrder(client, purchaseOrderId, payload, options?)`                                                 | POST   | `/api/{api_version}/purchase_orders/{purchase_order_id}/reactivate`                                                    | `PurchaseOrderUpdated`             |
| `getPurchaseOrderLine(client, purchaseOrderId, purchaseOrderLineUuid, queryParams?, options?)`                        | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/lines/{purchase_order_line_uuid}`                              | `PurchaseOrderLineRead`            |
| `deletePurchaseOrderNote(client, purchaseOrderId, purchaseOrderNoteId, options?)`                                     | DELETE | `/api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}`                                | -                                  |
| `getPurchaseOrderNote(client, purchaseOrderId, purchaseOrderNoteId, queryParams?, options?)`                          | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}`                                | `PurchaseOrdersNote`               |
| `getPurchaseOrderNoteFiles(client, purchaseOrderId, purchaseOrderNoteId, queryParams?, options?)`                     | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files`                          | `PurchaseOrderNoteFileList`        |
| `getPurchaseOrderNoteFile(client, purchaseOrderId, purchaseOrderNoteId, purchaseOrderFileId, queryParams?, options?)` | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files/{purchase_order_file_id}` | `PurchaseOrderNoteFile`            |
| `getPurchaseOrderKpis(client, purchaseOrderId, options?)`                                                             | GET    | `/api/{api_version}/purchase_orders/{purchase_order_id}/kpis`                                                          | `PurchaseOrderKpis`                |
| `deletePurchaseOrderNoteFile(client, purchaseOrderId, purchaseOrderNoteId, purchaseOrderFileId, options?)`            | DELETE | `/api/{api_version}/purchase_orders/{purchase_order_id}/notes/{purchase_order_note_id}/files/{purchase_order_file_id}` | -                                  |

## Purchase payments endpoints

15 functions in `purchasePayments`. 12 of them name a typed view from `purchasePaymentsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `purchasePaymentsUrls`.

| Function                                                                                          | Method | Path                                                                                            | Typed view                    |
| ------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------- | ----------------------------- |
| `getPurchasePayments(client, queryParams?, options?)`                                             | GET    | `/api/{api_version}/purchase_payments`                                                          | `PurchasePaymentList`         |
| `createPurchasePayment(client, payload, options?)`                                                | POST   | `/api/{api_version}/purchase_payments`                                                          | `PurchasePayments`            |
| `deletePurchasePayment(client, purchasePaymentId, options?)`                                      | DELETE | `/api/{api_version}/purchase_payments/{purchase_payment_id}`                                    | -                             |
| `getPurchasePayment(client, purchasePaymentId, queryParams?, options?)`                           | GET    | `/api/{api_version}/purchase_payments/{purchase_payment_id}`                                    | `PurchasePaymentRead`         |
| `updatePurchasePayment(client, purchasePaymentId, payload, options?)`                             | PATCH  | `/api/{api_version}/purchase_payments/{purchase_payment_id}`                                    | `PurchasePaymentUpdated`      |
| `createPurchaseInvoicePurchasePayment(client, purchaseInvoiceId, payload, options?)`              | POST   | `/api/{api_version}/purchase_invoices/{purchase_invoice_id}/purchase_payments`                  | `PurchasePayments`            |
| `getPurchasePaymentNotes(client, purchasePaymentId, queryParams?, options?)`                      | GET    | `/api/{api_version}/purchase_payments/{purchase_payment_id}/notes`                              | `PurchasePaymentNoteList`     |
| `createPurchasePaymentNote(client, purchasePaymentId, note, options?)`                            | POST   | `/api/{api_version}/purchase_payments/{purchase_payment_id}/notes`                              | `PurchasePaymentNotes`        |
| `getPurchasePaymentNote(client, purchasePaymentId, ppNoteId, queryParams?, options?)`             | GET    | `/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}`                 | `PurchasePaymentNote`         |
| `deletePurchasePaymentNote(client, purchasePaymentId, ppNoteId, options?)`                        | DELETE | `/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}`                 | -                             |
| `getPurchasePaymentNoteFiles(client, purchasePaymentId, ppNoteId, queryParams?, options?)`        | GET    | `/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files`           | `PurchasePaymentNoteFileList` |
| `getPurchasePaymentNoteFile(client, purchasePaymentId, ppNoteId, fileId, queryParams?, options?)` | GET    | `/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files/{file_id}` | `PurchasePaymentNoteFile`     |
| `getPurchasePaymentPurchaseCreditNotes(client, purchasePaymentId, queryParams?, options?)`        | GET    | `/api/{api_version}/purchase_payments/{purchase_payment_id}/purchase_credit_notes`              | `PurchaseCreditNoteList`      |
| `updatePurchasePaymentNote(client, purchasePaymentId, ppNoteId, note, options?)`                  | PATCH  | `/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}`                 | `PurchasePaymentNoteUpdated`  |
| `deletePurchasePaymentNoteFile(client, purchasePaymentId, ppNoteId, fileId, options?)`            | DELETE | `/api/{api_version}/purchase_payments/{purchase_payment_id}/notes/{pp_note_id}/files/{file_id}` | -                             |

## Purchase refunds endpoints

5 functions in `purchaseRefunds`. 4 of them name a typed view from `purchaseRefundsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `purchaseRefundsUrls`.

| Function                                                                                  | Method | Path                                                                                  | Typed view        |
| ----------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------- | ----------------- |
| `getPurchaseRefunds(client, queryParams?, options?)`                                      | GET    | `/api/{api_version}/purchase_refunds`                                                 | `PurchaseRefunds` |
| `getPurchaseRefund(client, purchaseRefundId, queryParams?, options?)`                     | GET    | `/api/{api_version}/purchase_refunds/{purchase_refund_id}`                            | `PurchaseRefund`  |
| `createPurchaseCreditNotePurchaseRefund(client, purchaseCreditNoteId, payload, options?)` | POST   | `/api/{api_version}/purchase_credit_notes/{purchase_credit_note_id}/purchase_refunds` | `PurchaseRefund`  |
| `updatePurchaseRefund(client, purchaseRefundId, payload, options?)`                       | PATCH  | `/api/{api_version}/purchase_refunds/{purchase_refund_id}`                            | `PurchaseRefund`  |
| `deletePurchaseRefund(client, purchaseRefundId, options?)`                                | DELETE | `/api/{api_version}/purchase_refunds/{purchase_refund_id}`                            | -                 |

## Quote orders endpoints

1 function in `quoteOrders`. 1 of them name a typed view from `quoteOrdersDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `quoteOrdersUrls`.

| Function                                                              | Method | Path                                                        | Typed view              |
| --------------------------------------------------------------------- | ------ | ----------------------------------------------------------- | ----------------------- |
| `getQuoteOrderInvoices(client, quoteOrderId, queryParams?, options?)` | GET    | `/api/{api_version}/quote_orders/{quote_order_id}/invoices` | `QuoteOrderInvoiceList` |

## Receive terms endpoints

5 functions in `receiveTerms`. 4 of them name a typed view from `receiveTermsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `receiveTermsUrls`.

| Function                                                              | Method | Path                                                          | Typed view                |
| --------------------------------------------------------------------- | ------ | ------------------------------------------------------------- | ------------------------- |
| `getSettingsReceiveTerms(client, queryParams?, options?)`             | GET    | `/api/{api_version}/settings/receive_terms`                   | `SettingsReceiveTermList` |
| `createSettingsReceiveTerm(client, payload, options?)`                | POST   | `/api/{api_version}/settings/receive_terms`                   | `SettingsReceiveTerm`     |
| `getSettingsReceiveTerm(client, receiveTermId, options?)`             | GET    | `/api/{api_version}/settings/receive_terms/{receive_term_id}` | `SettingsReceiveTerm`     |
| `deleteSettingsReceiveTerm(client, receiveTermId, options?)`          | DELETE | `/api/{api_version}/settings/receive_terms/{receive_term_id}` | -                         |
| `updateSettingsReceiveTerm(client, receiveTermId, payload, options?)` | PATCH  | `/api/{api_version}/settings/receive_terms/{receive_term_id}` | `SettingsReceiveTerm`     |

## Reconciliations endpoints

2 functions in `reconciliations`. 0 of them name a typed view from `reconciliationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `reconciliationsUrls`.

| Function                                                                          | Method | Path                                                                   | Typed view |
| --------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------- | ---------- |
| `getReconciliationSalePayments(client, reconciliationId, queryParams?, options?)` | GET    | `/api/{api_version}/reconciliations/{reconciliation_id}/sale_payments` | -          |
| `getReconciliationSaleRefunds(client, reconciliationId, queryParams?, options?)`  | GET    | `/api/{api_version}/reconciliations/{reconciliation_id}/sale_refunds`  | -          |

## Refunds endpoints

12 functions in `refunds`. 9 of them name a typed view from `refundsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `refundsUrls`.

| Function                                                           | Method | Path                                                                     | Typed view       |
| ------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------ | ---------------- |
| `getRefunds(client, queryParams?, options?)`                       | GET    | `/api/{api_version}/refunds`                                             | `RefundList`     |
| `deleteRefund(client, refundId, options?)`                         | DELETE | `/api/{api_version}/refunds/{refund_id}`                                 | -                |
| `getRefund(client, refundId, queryParams?, options?)`              | GET    | `/api/{api_version}/refunds/{refund_id}`                                 | `Refund`         |
| `updateRefund(client, refundId, payload, options?)`                | PATCH  | `/api/{api_version}/refunds/{refund_id}`                                 | `RefundUpdated`  |
| `createCreditNoteRefund(client, creditNoteId, payload, options?)`  | POST   | `/api/{api_version}/credit_notes/{credit_note_id}/refunds`               | `RefundUpdated`  |
| `getRefundNotes(client, refundId, queryParams?, options?)`         | GET    | `/api/{api_version}/refunds/{refund_id}/notes`                           | `RefundNoteList` |
| `getRefundNote(client, refundId, noteId, options?)`                | GET    | `/api/{api_version}/refunds/{refund_id}/notes/{note_id}`                 | `RefundNote`     |
| `createRefundNote(client, refundId, note, options?)`               | POST   | `/api/{api_version}/refunds/{refund_id}/notes`                           | `RefundNote`     |
| `deleteRefundNote(client, refundId, noteId, options?)`             | DELETE | `/api/{api_version}/refunds/{refund_id}/notes/{note_id}`                 | -                |
| `getRefundNoteFiles(client, refundId, noteId, options?)`           | GET    | `/api/{api_version}/refunds/{refund_id}/notes/{note_id}/files`           | `NoteFileList`   |
| `getRefundNoteFile(client, refundId, noteId, fileId, options?)`    | GET    | `/api/{api_version}/refunds/{refund_id}/notes/{note_id}/files/{file_id}` | `RefundNoteFile` |
| `deleteRefundNoteFile(client, refundId, noteId, fileId, options?)` | DELETE | `/api/{api_version}/refunds/{refund_id}/notes/{note_id}/files/{file_id}` | -                |

## Rental assets endpoints

14 functions in `rentalAssets`. 10 of them name a typed view from `rentalAssetsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `rentalAssetsUrls`.

| Function                                                                      | Method | Path                                                                 | Typed view                    |
| ----------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- | ----------------------------- |
| `getRentalAssetAvailability(client, queryParams?, options?)`                  | GET    | `/api/{api_version}/rental_asset_availability`                       | `RentalAssetAvailabilityList` |
| `updateRentalAssetAvailability(client, payload, options?)`                    | PATCH  | `/api/{api_version}/rental_asset_availability`                       | -                             |
| `getRentalAssetProfiles(client, queryParams?, options?)`                      | GET    | `/api/{api_version}/rental_asset_profiles`                           | `RentalAssetProfileList`      |
| `createRentalAssetProfile(client, payload, options?)`                         | POST   | `/api/{api_version}/rental_asset_profiles`                           | `RentalAssetProfile`          |
| `getRentalAssets(client, queryParams?, options?)`                             | GET    | `/api/{api_version}/rental_assets`                                   | `RentalAssetList`             |
| `createRentalAsset(client, payload, options?)`                                | POST   | `/api/{api_version}/rental_assets`                                   | `RentalAsset`                 |
| `getRentalAssetProfile(client, rentalAssetProfileId, queryParams?, options?)` | GET    | `/api/{api_version}/rental_asset_profiles/{rental_asset_profile_id}` | `RentalAssetProfile`          |
| `updateRentalAssetProfile(client, rentalAssetProfileId, payload, options?)`   | PATCH  | `/api/{api_version}/rental_asset_profiles/{rental_asset_profile_id}` | -                             |
| `deleteRentalAssetProfile(client, rentalAssetProfileId, options?)`            | DELETE | `/api/{api_version}/rental_asset_profiles/{rental_asset_profile_id}` | -                             |
| `updateRentalAsset(client, rentalAssetUuid, payload, options?)`               | PATCH  | `/api/{api_version}/rental_assets/{rental_asset_uuid}`               | `RentalAsset`                 |
| `deleteRentalAsset(client, rentalAssetUuid, options?)`                        | DELETE | `/api/{api_version}/rental_assets/{rental_asset_uuid}`               | -                             |
| `getRentalAsset(client, rentalAssetUuid, queryParams?, options?)`             | GET    | `/api/{api_version}/rental_assets/{rental_asset_uuid}`               | `RentalAsset`                 |
| `cancelRentalAsset(client, rentalAssetId, payload, options?)`                 | POST   | `/api/{api_version}/rental_assets/{rental_asset_id}/cancel`          | `RentalAsset`                 |
| `reactivateRentalAsset(client, rentalAssetId, payload, options?)`             | POST   | `/api/{api_version}/rental_assets/{rental_asset_id}/reactivate`      | `RentalAsset`                 |

## Reports endpoints

7 functions in `reports`. 7 of them name a typed view from `reportsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `reportsUrls`.

| Function                                                                                         | Method | Path                                                                                    | Typed view                                                    |
| ------------------------------------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `getReportsAccountsAccountOverview(client, queryParams?, options?)`                              | GET    | `/api/{api_version}/reports/accounts/account_overview`                                  | `ReportsAccountsAccountOverview`                              |
| `getReportsInvoicesInvoiceOverview(client, queryParams?, options?)`                              | GET    | `/api/{api_version}/reports/invoices/invoice_overview`                                  | `ReportsInvoicesInvoiceOverview`                              |
| `getReportsOrdersOrderOverview(client, queryParams?, options?)`                                  | GET    | `/api/{api_version}/reports/orders/order_overview`                                      | `ReportsOrdersOrderOverview`                                  |
| `getReportsPurchaseInvoicesPurchaseInvoiceOverview(client, queryParams?, options?)`              | GET    | `/api/{api_version}/reports/purchase_invoices/purchase_invoice_overview`                | `ReportsPurchaseInvoicesPurchaseInvoiceOverview`              |
| `getReportsPurchaseOrdersPurchaseOrderOverview(client, queryParams?, options?)`                  | GET    | `/api/{api_version}/reports/purchase_orders/purchase_order_overview`                    | `ReportsPurchaseOrdersPurchaseOrderOverview`                  |
| `getReportsPurchaseTransactionsPurchasePaymentAndRefundOverview(client, queryParams?, options?)` | GET    | `/api/{api_version}/reports/purchase_transactions/purchase_payment_and_refund_overview` | `ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview` |
| `getReportsTransactionsPaymentAndRefundOverview(client, queryParams?, options?)`                 | GET    | `/api/{api_version}/reports/transactions/payment_and_refund_overview`                   | `ReportsTransactionsPaymentAndRefundOverview`                 |

## Return merchandise authorisations endpoints

19 functions in `returnMerchandiseAuthorisations`. 11 of them name a typed view from `returnMerchandiseAuthorisationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `returnMerchandiseAuthorisationsUrls`.

| Function                                                                                                               | Method | Path                                                                                                           | Typed view                                         |
| ---------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `getReturnMerchandiseAuthorisations(client, queryParams?, options?)`                                                   | GET    | `/api/{api_version}/return_merchandise_authorisations`                                                         | `ReturnMerchandiseAuthorisationList`               |
| `createReturnMerchandiseAuthorisation(client, payload, options?)`                                                      | POST   | `/api/{api_version}/return_merchandise_authorisations`                                                         | `ReturnMerchandiseAuthorisations`                  |
| `getReturnMerchandiseAuthorisation(client, rmaId, queryParams?, options?)`                                             | GET    | `/api/{api_version}/return_merchandise_authorisations/{rma_id}`                                                | `ReturnMerchandiseAuthorisationRead`               |
| `getInvoiceReturnMerchandiseAuthorisationReceive(client, invoiceId, rmaId, queryParams?, options?)`                    | GET    | `/api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive`                | `InvoiceReturnMerchandiseAuthorisationReceiveList` |
| `getInvoiceReturnMerchandiseAuthorisationReceiveByUuid(client, invoiceId, rmaId, receiveUuid, queryParams?, options?)` | GET    | `/api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive/{receive_uuid}` | `InvoiceReturnMerchandiseAuthorisationReceive`     |
| `updateReturnMerchandiseAuthorisation(client, rmaId, payload, options?)`                                               | PATCH  | `/api/{api_version}/return_merchandise_authorisations/{rma_id}`                                                | `ReturnMerchandiseAuthorisationRead`               |
| `deleteReturnMerchandiseAuthorisation(client, rmaId, options?)`                                                        | DELETE | `/api/{api_version}/return_merchandise_authorisations/{rma_id}`                                                | -                                                  |
| `approveReturnMerchandiseAuthorisation(client, rmaId, options?)`                                                       | POST   | `/api/{api_version}/return_merchandise_authorisations/{rma_id}/approve`                                        | `ReturnMerchandiseAuthorisationRead`               |
| `rejectReturnMerchandiseAuthorisation(client, rmaId, options?)`                                                        | POST   | `/api/{api_version}/return_merchandise_authorisations/{rma_id}/reject`                                         | `ReturnMerchandiseAuthorisationRead`               |
| `receiveReturnMerchandiseAuthorisation(client, rmaId, payload, options?)`                                              | POST   | `/api/{api_version}/return_merchandise_authorisations/{rma_id}/receive`                                        | `ReturnMerchandiseAuthorisationRead`               |
| `getReturnMerchandiseAuthorisationReceive(client, rmaCode, queryParams?, options?)`                                    | GET    | `/api/{api_version}/return_merchandise_authorisations/{rma_code}/receive`                                      | `InvoiceReturnMerchandiseAuthorisationReceiveList` |
| `getReturnMerchandiseAuthorisationReceiveByUuid(client, rmaCode, receiveUuid, options?)`                               | GET    | `/api/{api_version}/return_merchandise_authorisations/{rma_code}/receive/{receive_uuid}`                       | `InvoiceReturnMerchandiseAuthorisationReceive`     |
| `createReturnMerchandiseAuthorisationNote(client, rmaId, payload, options?)`                                           | POST   | `/api/{api_version}/return_merchandise_authorisations/{rma_id}/notes`                                          | -                                                  |
| `getReturnMerchandiseAuthorisationNotes(client, rmaCode, queryParams?, options?)`                                      | GET    | `/api/{api_version}/return_merchandise_authorisations/{rma_code}/notes`                                        | -                                                  |
| `getReturnMerchandiseAuthorisationNote(client, rmaCode, noteId, options?)`                                             | GET    | `/api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}`                              | -                                                  |
| `deleteReturnMerchandiseAuthorisationNote(client, rmaId, noteId, options?)`                                            | DELETE | `/api/{api_version}/return_merchandise_authorisations/{rma_id}/notes/{note_id}`                                | -                                                  |
| `getReturnMerchandiseAuthorisationNoteFiles(client, rmaCode, noteId, options?)`                                        | GET    | `/api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}/files`                        | -                                                  |
| `getReturnMerchandiseAuthorisationNoteFile(client, rmaCode, noteId, fileId, options?)`                                 | GET    | `/api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}/files/{file_id}`              | -                                                  |
| `deleteReturnMerchandiseAuthorisationNoteFile(client, rmaId, noteId, fileId, options?)`                                | DELETE | `/api/{api_version}/return_merchandise_authorisations/{rma_id}/notes/{note_id}/files/{file_id}`                | -                                                  |

## Return vendor authorizations endpoints

7 functions in `returnVendorAuthorizations`. 4 of them name a typed view from `returnVendorAuthorizationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `returnVendorAuthorizationsUrls`.

| Function                                                                           | Method | Path                                                                                       | Typed view                      |
| ---------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------ | ------------------------------- |
| `getReturnVendorAuthorizations(client, queryParams?, options?)`                    | GET    | `/api/{api_version}/return_vendor_authorizations`                                          | `ReturnVendorAuthorizationList` |
| `createReturnVendorAuthorization(client, payload, options?)`                       | POST   | `/api/{api_version}/return_vendor_authorizations`                                          | `ReturnVendorAuthorizationView` |
| `getReturnVendorAuthorization(client, rvaId, options?)`                            | GET    | `/api/{api_version}/return_vendor_authorizations/{rva_id}`                                 | `ReturnVendorAuthorizationView` |
| `updateReturnVendorAuthorization(client, rvaId, payload, options?)`                | PATCH  | `/api/{api_version}/return_vendor_authorizations/{rva_id}`                                 | `ReturnVendorAuthorizationView` |
| `deleteReturnVendorAuthorization(client, rvaId, options?)`                         | DELETE | `/api/{api_version}/return_vendor_authorizations/{rva_id}`                                 | -                               |
| `deleteReturnVendorAuthorizationNote(client, rvaId, noteId, options?)`             | DELETE | `/api/{api_version}/return_vendor_authorizations/{rva_id}/notes/{note_id}`                 | -                               |
| `deleteReturnVendorAuthorizationNoteFile(client, rvaId, noteId, fileId, options?)` | DELETE | `/api/{api_version}/return_vendor_authorizations/{rva_id}/notes/{note_id}/files/{file_id}` | -                               |

## Roles endpoints

5 functions in `roles`. 2 of them name a typed view from `rolesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `rolesUrls`.

| Function                                                | Method | Path                                          | Typed view         |
| ------------------------------------------------------- | ------ | --------------------------------------------- | ------------------ |
| `getSettingsRoles(client, queryParams?, options?)`      | GET    | `/api/{api_version}/settings/roles`           | `SettingsRoleList` |
| `createSettingsRole(client, payload, options?)`         | POST   | `/api/{api_version}/settings/roles`           | -                  |
| `getSettingsRole(client, roleId, options?)`             | GET    | `/api/{api_version}/settings/roles/{role_id}` | `SettingsRole`     |
| `deleteSettingsRole(client, roleId, options?)`          | DELETE | `/api/{api_version}/settings/roles/{role_id}` | -                  |
| `updateSettingsRole(client, roleId, payload, options?)` | PATCH  | `/api/{api_version}/settings/roles/{role_id}` | -                  |

## Sales reps endpoints

5 functions in `salesReps`. 2 of them name a typed view from `salesRepsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `salesRepsUrls`.

| Function                                                        | Method | Path                                                    | Typed view             |
| --------------------------------------------------------------- | ------ | ------------------------------------------------------- | ---------------------- |
| `getSettingsSalesReps(client, queryParams?, options?)`          | GET    | `/api/{api_version}/settings/sales_reps`                | `SettingsSalesRepList` |
| `createSettingsSalesRep(client, payload, options?)`             | POST   | `/api/{api_version}/settings/sales_reps`                | -                      |
| `getSettingsSalesRep(client, salesRepId, options?)`             | GET    | `/api/{api_version}/settings/sales_reps/{sales_rep_id}` | `SettingsSalesRep`     |
| `deleteSettingsSalesRep(client, salesRepId, options?)`          | DELETE | `/api/{api_version}/settings/sales_reps/{sales_rep_id}` | -                      |
| `updateSettingsSalesRep(client, salesRepId, payload, options?)` | PATCH  | `/api/{api_version}/settings/sales_reps/{sales_rep_id}` | -                      |

## Salutations endpoints

5 functions in `salutations`. 4 of them name a typed view from `salutationsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `salutationsUrls`.

| Function                                                            | Method | Path                                                      | Typed view               |
| ------------------------------------------------------------------- | ------ | --------------------------------------------------------- | ------------------------ |
| `getSettingsSalutations(client, queryParams?, options?)`            | GET    | `/api/{api_version}/settings/salutations`                 | `SettingsSalutationList` |
| `createSettingsSalutation(client, payload, options?)`               | POST   | `/api/{api_version}/settings/salutations`                 | `SettingsSalutation`     |
| `getSettingsSalutation(client, salutationId, options?)`             | GET    | `/api/{api_version}/settings/salutations/{salutation_id}` | `SettingsSalutation`     |
| `deleteSettingsSalutation(client, salutationId, options?)`          | DELETE | `/api/{api_version}/settings/salutations/{salutation_id}` | -                        |
| `updateSettingsSalutation(client, salutationId, payload, options?)` | PATCH  | `/api/{api_version}/settings/salutations/{salutation_id}` | `SettingsSalutation`     |

## Settings endpoints

86 functions in `settings`. 69 of them name a typed view from `settingsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `settingsUrls`.

| Function                                                                            | Method | Path                                                                          | Typed view                              |
| ----------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------- | --------------------------------------- |
| `getCustomObjects(client, queryParams?, options?)`                                  | GET    | `/api/{api_version}/custom_objects`                                           | `CustomObjectList`                      |
| `getSettings(client, queryParams?, options?)`                                       | GET    | `/api/{api_version}/settings`                                                 | `Settings`                              |
| `getCustomObject(client, customObjectId, queryParams?, options?)`                   | GET    | `/api/{api_version}/custom_objects/{custom_object_id}`                        | `SettingsCustomObjects`                 |
| `getSettingsCurrencies(client, queryParams?, options?)`                             | GET    | `/api/{api_version}/settings/currencies`                                      | `SettingsCurrencyList`                  |
| `getSettingsCustomLogicScripts(client, queryParams?, options?)`                     | GET    | `/api/{api_version}/settings/custom_logic_scripts`                            | `SettingsCustomLogicScripts`            |
| `createSettingsCustomObject(client, payload, options?)`                             | POST   | `/api/{api_version}/settings/custom_objects`                                  | `SettingsCustomObjects`                 |
| `getSettingsDiscountProfiles(client, queryParams?, options?)`                       | GET    | `/api/{api_version}/settings/discount_profiles`                               | `SettingsDiscountProfileList`           |
| `getSettingsItemGroups(client, queryParams?, options?)`                             | GET    | `/api/{api_version}/settings/item_groups`                                     | `SettingsItemGroupList`                 |
| `createSettingsItemGroup(client, payload, options?)`                                | POST   | `/api/{api_version}/settings/item_groups`                                     | `SettingsItemGroups`                    |
| `getSettingsPaymentProcessors(client, queryParams?, options?)`                      | GET    | `/api/{api_version}/settings/payment_processors`                              | `SettingsPaymentProcessorList`          |
| `getSettingsPaymentTerms(client, queryParams?, options?)`                           | GET    | `/api/{api_version}/settings/payment_terms`                                   | `SettingsPaymentTermList`               |
| `getSettingsPricingLevels(client, queryParams?, options?)`                          | GET    | `/api/{api_version}/settings/pricing_levels`                                  | `SettingsPricingLevelList`              |
| `getSettingsShippingProfiles(client, queryParams?, options?)`                       | GET    | `/api/{api_version}/settings/shipping_profiles`                               | `SettingsShippingProfileList`           |
| `getSettingsTaxes(client, queryParams?, options?)`                                  | GET    | `/api/{api_version}/settings/taxes`                                           | `SettingsTaxList`                       |
| `getSettingsTimeZones(client, queryParams?, options?)`                              | GET    | `/api/{api_version}/settings/time_zones`                                      | `SettingsTimeZoneList`                  |
| `getSettingsVariations(client, queryParams?, options?)`                             | GET    | `/api/{api_version}/settings/variations`                                      | `SettingsVariationList`                 |
| `createSettingsVariation(client, payload, options?)`                                | POST   | `/api/{api_version}/settings/variations`                                      | `SettingsVariations`                    |
| `getSettingsWarehouses(client, queryParams?, options?)`                             | GET    | `/api/{api_version}/settings/warehouses`                                      | `SettingsWarehouseList`                 |
| `getSettingsCurrency(client, currencyId, queryParams?, options?)`                   | GET    | `/api/{api_version}/settings/currencies/{currency_id}`                        | `SettingsCurrencyRead`                  |
| `getSettingsCustomLogicScript(client, customLogicScriptId, queryParams?, options?)` | GET    | `/api/{api_version}/settings/custom_logic_scripts/{custom_logic_script_id}`   | `SettingsCustomLogicScript`             |
| `deleteSettingsCustomObject(client, customObjectId, options?)`                      | DELETE | `/api/{api_version}/settings/custom_objects/{custom_object_id}`               | -                                       |
| `updateSettingsCustomObject(client, customObjectId, payload, options?)`             | PATCH  | `/api/{api_version}/settings/custom_objects/{custom_object_id}`               | `SettingsCustomObjects`                 |
| `updateSettingsFieldSettingsAccount(client, payload, options?)`                     | PATCH  | `/api/{api_version}/settings/field_settings/account`                          | `SettingsFieldSettingsAccountUpdated`   |
| `updateSettingsFieldSettingsItem(client, payload, options?)`                        | PATCH  | `/api/{api_version}/settings/field_settings/item`                             | `SettingsFieldSettingsAccountUpdated`   |
| `updateSettingsGeneralSettingsAccount(client, payload, options?)`                   | PATCH  | `/api/{api_version}/settings/general_settings/account`                        | `SettingsGeneralSettingsAccountUpdated` |
| `updateSettingsGeneralSettingsItem(client, payload, options?)`                      | PATCH  | `/api/{api_version}/settings/general_settings/item`                           | `SettingsGeneralSettingsItemUpdated`    |
| `deleteSettingsItemGroup(client, itemGroupId, options?)`                            | DELETE | `/api/{api_version}/settings/item_groups/{item_group_id}`                     | -                                       |
| `getSettingsItemGroup(client, itemGroupId, queryParams?, options?)`                 | GET    | `/api/{api_version}/settings/item_groups/{item_group_id}`                     | `SettingsItemGroups`                    |
| `updateSettingsItemGroup(client, itemGroupId, payload, options?)`                   | PATCH  | `/api/{api_version}/settings/item_groups/{item_group_id}`                     | `SettingsItemGroups`                    |
| `getSettingsTimeZone(client, timeZoneId, queryParams?, options?)`                   | GET    | `/api/{api_version}/settings/time_zones/{time_zone_id}`                       | `SettingsTimeZoneRead`                  |
| `getSettingsVariation(client, variationId, queryParams?, options?)`                 | GET    | `/api/{api_version}/settings/variations/{variation_id}`                       | `SettingsVariations`                    |
| `updateSettingsVariation(client, variationId, payload, options?)`                   | PATCH  | `/api/{api_version}/settings/variations/{variation_id}`                       | `SettingsVariations`                    |
| `createSettingsCustomObjectCustomize(client, customObjectId, payload, options?)`    | POST   | `/api/{api_version}/settings/custom_objects/{custom_object_id}/customize`     | `SettingsCustomObjectCustomize`         |
| `createSettingsItemGroupBillingPreference(client, itemGroupId, payload, options?)`  | POST   | `/api/{api_version}/settings/item_groups/{item_group_id}/billing_preferences` | `SettingsItemGroups`                    |
| `getSettingsCustomObjects(client, queryParams?, options?)`                          | GET    | `/api/{api_version}/settings/custom_objects`                                  | `SettingsCustomObjectDefinitionList`    |
| `getSettingsCustomObject(client, customObjectId, options?)`                         | GET    | `/api/{api_version}/settings/custom_objects/{custom_object_id}`               | `SettingsCustomObjectDefinitionRead`    |
| `createCustomObject(client, payload, options?)`                                     | POST   | `/api/{api_version}/custom_objects`                                           | `SettingsCustomObjects`                 |
| `updateCustomObject(client, customObjectId, payload, options?)`                     | PATCH  | `/api/{api_version}/custom_objects/{custom_object_id}`                        | `SettingsCustomObjects`                 |
| `deleteCustomObject(client, customObjectId, options?)`                              | DELETE | `/api/{api_version}/custom_objects/{custom_object_id}`                        | -                                       |
| `createSettingsCurrency(client, payload, options?)`                                 | POST   | `/api/{api_version}/settings/currencies`                                      | -                                       |
| `updateSettingsCurrency(client, currencyId, payload, options?)`                     | PATCH  | `/api/{api_version}/settings/currencies/{currency_id}`                        | -                                       |
| `createSettingsCustomLogicScript(client, payload, options?)`                        | POST   | `/api/{api_version}/settings/custom_logic_scripts`                            | `SettingsCustomLogicScriptSaved`        |
| `updateSettingsCustomLogicScript(client, customLogicScriptId, payload, options?)`   | PATCH  | `/api/{api_version}/settings/custom_logic_scripts/{custom_logic_script_id}`   | `SettingsCustomLogicScriptSaved`        |
| `deleteSettingsCustomLogicScript(client, customLogicScriptId, options?)`            | DELETE | `/api/{api_version}/settings/custom_logic_scripts/{custom_logic_script_id}`   | -                                       |
| `createSettingsDiscountProfile(client, payload, options?)`                          | POST   | `/api/{api_version}/settings/discount_profiles`                               | `SettingsDiscountProfileRead`           |
| `getSettingsDiscountProfile(client, discountProfileId, options?)`                   | GET    | `/api/{api_version}/settings/discount_profiles/{discount_profile_id}`         | `SettingsDiscountProfileRead`           |
| `updateSettingsDiscountProfile(client, discountProfileId, payload, options?)`       | PATCH  | `/api/{api_version}/settings/discount_profiles/{discount_profile_id}`         | `SettingsDiscountProfileRead`           |
| `deleteSettingsDiscountProfile(client, discountProfileId, options?)`                | DELETE | `/api/{api_version}/settings/discount_profiles/{discount_profile_id}`         | -                                       |
| `getSettingsFieldSettings(client, queryParams?, options?)`                          | GET    | `/api/{api_version}/settings/field_settings`                                  | `SettingsFieldSettingList`              |
| `getSettingsFieldSetting(client, fieldSettingId, options?)`                         | GET    | `/api/{api_version}/settings/field_settings/{field_setting_id}`               | `SettingsFieldSettingRead`              |
| `getSettingsGeneralSettings(client, group, options?)`                               | GET    | `/api/{api_version}/settings/general_settings/{group}`                        | `SettingsGeneralSettings`               |
| `getSettingsGeneralSetting(client, group, generalSettingId, options?)`              | GET    | `/api/{api_version}/settings/general_settings/{group}/{general_setting_id}`   | -                                       |
| `updateSettingsGeneralSettingsDashboard(client, payload, options?)`                 | PATCH  | `/api/{api_version}/settings/general_settings/dashboard`                      | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsDateAndTime(client, payload, options?)`               | PATCH  | `/api/{api_version}/settings/general_settings/date_and_time`                  | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsDisplay(client, payload, options?)`                   | PATCH  | `/api/{api_version}/settings/general_settings/display`                        | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsGeneral(client, payload, options?)`                   | PATCH  | `/api/{api_version}/settings/general_settings/general`                        | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsLabour(client, payload, options?)`                    | PATCH  | `/api/{api_version}/settings/general_settings/labour`                         | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsOrder(client, payload, options?)`                     | PATCH  | `/api/{api_version}/settings/general_settings/order`                          | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsPortal(client, payload, options?)`                    | PATCH  | `/api/{api_version}/settings/general_settings/portal`                         | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsPurchase(client, payload, options?)`                  | PATCH  | `/api/{api_version}/settings/general_settings/purchase`                       | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsSecurity(client, payload, options?)`                  | PATCH  | `/api/{api_version}/settings/general_settings/security`                       | `SettingsGeneralSettings`               |
| `updateSettingsGeneralSettingsTransaction(client, payload, options?)`               | PATCH  | `/api/{api_version}/settings/general_settings/transaction`                    | `SettingsGeneralSettings`               |
| `createSettingsPaymentProcessor(client, payload, options?)`                         | POST   | `/api/{api_version}/settings/payment_processors`                              | `SettingsPaymentProcessorSaved`         |
| `getSettingsPaymentProcessor(client, paymentProcessorId, options?)`                 | GET    | `/api/{api_version}/settings/payment_processors/{payment_processor_id}`       | `SettingsPaymentProcessorRead`          |
| `updateSettingsPaymentProcessor(client, paymentProcessorId, payload, options?)`     | PATCH  | `/api/{api_version}/settings/payment_processors/{payment_processor_id}`       | `SettingsPaymentProcessorSaved`         |
| `deleteSettingsPaymentProcessor(client, paymentProcessorId, options?)`              | DELETE | `/api/{api_version}/settings/payment_processors/{payment_processor_id}`       | -                                       |
| `createSettingsPaymentTerm(client, payload, options?)`                              | POST   | `/api/{api_version}/settings/payment_terms`                                   | `SettingsPaymentTermCreated`            |
| `getSettingsPaymentTerm(client, paymentTermId, options?)`                           | GET    | `/api/{api_version}/settings/payment_terms/{payment_term_id}`                 | `SettingsPaymentTermRead`               |
| `updateSettingsPaymentTerm(client, paymentTermId, payload, options?)`               | PATCH  | `/api/{api_version}/settings/payment_terms/{payment_term_id}`                 | `SettingsPaymentTermUpdated`            |
| `deleteSettingsPaymentTerm(client, paymentTermId, options?)`                        | DELETE | `/api/{api_version}/settings/payment_terms/{payment_term_id}`                 | -                                       |
| `createSettingsPricingLevel(client, payload, options?)`                             | POST   | `/api/{api_version}/settings/pricing_levels`                                  | `SettingsPricingLevelCreated`           |
| `getSettingsPricingLevel(client, pricingLevelId, options?)`                         | GET    | `/api/{api_version}/settings/pricing_levels/{pricing_level_id}`               | `SettingsPricingLevelRead`              |
| `updateSettingsPricingLevel(client, pricingLevelId, payload, options?)`             | PATCH  | `/api/{api_version}/settings/pricing_levels/{pricing_level_id}`               | `SettingsPricingLevelRead`              |
| `deleteSettingsPricingLevel(client, pricingLevelId, options?)`                      | DELETE | `/api/{api_version}/settings/pricing_levels/{pricing_level_id}`               | -                                       |
| `createSettingsShippingProfile(client, payload, options?)`                          | POST   | `/api/{api_version}/settings/shipping_profiles`                               | `SettingsShippingProfileRead`           |
| `getSettingsShippingProfile(client, shippingProfileId, options?)`                   | GET    | `/api/{api_version}/settings/shipping_profiles/{shipping_profile_id}`         | `SettingsShippingProfileRead`           |
| `updateSettingsShippingProfile(client, shippingProfileId, payload, options?)`       | PATCH  | `/api/{api_version}/settings/shipping_profiles/{shipping_profile_id}`         | -                                       |
| `deleteSettingsShippingProfile(client, shippingProfileId, options?)`                | DELETE | `/api/{api_version}/settings/shipping_profiles/{shipping_profile_id}`         | -                                       |
| `createSettingsWarehouse(client, payload, options?)`                                | POST   | `/api/{api_version}/settings/warehouses`                                      | `SettingsWarehouseRead`                 |
| `getSettingsWarehouse(client, warehouseId, options?)`                               | GET    | `/api/{api_version}/settings/warehouses/{warehouse_id}`                       | `SettingsWarehouseRead`                 |
| `updateSettingsWarehouse(client, warehouseId, payload, options?)`                   | PATCH  | `/api/{api_version}/settings/warehouses/{warehouse_id}`                       | `SettingsWarehouseRead`                 |
| `deleteSettingsWarehouse(client, warehouseId, options?)`                            | DELETE | `/api/{api_version}/settings/warehouses/{warehouse_id}`                       | -                                       |
| `createSettingsTax(client, payload, options?)`                                      | POST   | `/api/{api_version}/settings/taxes`                                           | -                                       |
| `getSettingsTax(client, taxId, options?)`                                           | GET    | `/api/{api_version}/settings/taxes/{tax_id}`                                  | `SettingsTaxRead`                       |
| `updateSettingsTax(client, taxId, payload, options?)`                               | PATCH  | `/api/{api_version}/settings/taxes/{tax_id}`                                  | -                                       |
| `deleteSettingsVariation(client, variationId, options?)`                            | DELETE | `/api/{api_version}/settings/variations/{variation_id}`                       | -                                       |

## Settings workflows endpoints

2 functions in `settingsWorkflows`. 2 of them name a typed view from `settingsWorkflowsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `settingsWorkflowsUrls`.

| Function                                               | Method | Path                                                  | Typed view             |
| ------------------------------------------------------ | ------ | ----------------------------------------------------- | ---------------------- |
| `getSettingsWorkflows(client, queryParams?, options?)` | GET    | `/api/{api_version}/settings/workflows`               | `SettingsWorkflowList` |
| `getSettingsWorkflow(client, workflowId, options?)`    | GET    | `/api/{api_version}/settings/workflows/{workflow_id}` | `SettingsWorkflow`     |

## Shipping packages endpoints

5 functions in `shippingPackages`. 4 of them name a typed view from `shippingPackagesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `shippingPackagesUrls`.

| Function                                                                      | Method | Path                                                                  | Typed view                    |
| ----------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------- | ----------------------------- |
| `getSettingsShippingPackages(client, queryParams?, options?)`                 | GET    | `/api/{api_version}/settings/shipping_packages`                       | `SettingsShippingPackageList` |
| `createSettingsShippingPackage(client, payload, options?)`                    | POST   | `/api/{api_version}/settings/shipping_packages`                       | `SettingsShippingPackage`     |
| `getSettingsShippingPackage(client, shippingPackageId, options?)`             | GET    | `/api/{api_version}/settings/shipping_packages/{shipping_package_id}` | `SettingsShippingPackage`     |
| `deleteSettingsShippingPackage(client, shippingPackageId, options?)`          | DELETE | `/api/{api_version}/settings/shipping_packages/{shipping_package_id}` | -                             |
| `updateSettingsShippingPackage(client, shippingPackageId, payload, options?)` | PATCH  | `/api/{api_version}/settings/shipping_packages/{shipping_package_id}` | `SettingsShippingPackage`     |

## Shipping rules endpoints

6 functions in `shippingRules`. 5 of them name a typed view from `shippingRulesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `shippingRulesUrls`.

| Function                                                                             | Method | Path                                                                          | Typed view                 |
| ------------------------------------------------------------------------------------ | ------ | ----------------------------------------------------------------------------- | -------------------------- |
| `getSettingsShippingRules(client, queryParams?, options?)`                           | GET    | `/api/{api_version}/settings/shipping_rules`                                  | `SettingsShippingRuleList` |
| `createSettingsShippingRule(client, payload, options?)`                              | POST   | `/api/{api_version}/settings/shipping_rules`                                  | `SettingsShippingRule`     |
| `getSettingsShippingRule(client, shippingRuleId, options?)`                          | GET    | `/api/{api_version}/settings/shipping_rules/{shipping_rule_id}`               | `SettingsShippingRule`     |
| `deleteSettingsShippingRule(client, shippingRuleId, options?)`                       | DELETE | `/api/{api_version}/settings/shipping_rules/{shipping_rule_id}`               | -                          |
| `updateSettingsShippingRule(client, shippingRuleId, payload, options?)`              | PATCH  | `/api/{api_version}/settings/shipping_rules/{shipping_rule_id}`               | `SettingsShippingRule`     |
| `createSettingsShippingRuleConfiguration(client, shippingRuleId, payload, options?)` | POST   | `/api/{api_version}/settings/shipping_rules/{shipping_rule_id}/configuration` | `SettingsShippingRule`     |

## System events endpoints

2 functions in `systemEvents`. 2 of them name a typed view from `systemEventsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `systemEventsUrls`.

| Function                                                  | Method | Path                                                          | Typed view                |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------- | ------------------------- |
| `getSettingsSystemEvents(client, queryParams?, options?)` | GET    | `/api/{api_version}/settings/system_events`                   | `SettingsSystemEventList` |
| `getSettingsSystemEvent(client, systemEventId, options?)` | GET    | `/api/{api_version}/settings/system_events/{system_event_id}` | `SettingsSystemEvent`     |

## Tasks endpoints

18 functions in `tasks`. 9 of them name a typed view from `tasksDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `tasksUrls`.

| Function                                                                            | Method | Path                                                                   | Typed view            |
| ----------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------- | --------------------- |
| `getTasks(client, queryParams?, options?)`                                          | GET    | `/api/{api_version}/tasks`                                             | `TaskList`            |
| `deleteTask(client, taskId, options?)`                                              | DELETE | `/api/{api_version}/tasks/{task_id}`                                   | -                     |
| `getTask(client, taskId, queryParams?, options?)`                                   | GET    | `/api/{api_version}/tasks/{task_id}`                                   | `Task`                |
| `updateTask(client, taskId, payload, options?)`                                     | PATCH  | `/api/{api_version}/tasks/{task_id}`                                   | `Task`                |
| `getTaskChecklist(client, taskId, queryParams?, options?)`                          | GET    | `/api/{api_version}/tasks/{task_id}/checklist`                         | `TaskChecklist`       |
| `createTaskChecklist(client, taskId, payload, options?)`                            | POST   | `/api/{api_version}/tasks/{task_id}/checklist`                         | `Task`                |
| `getTaskNotes(client, taskId, queryParams?, options?)`                              | GET    | `/api/{api_version}/tasks/{task_code}/notes`                           | `TaskNoteList`        |
| `createTaskNote(client, taskId, note, options?)`                                    | POST   | `/api/{api_version}/tasks/{task_code}/notes`                           | -                     |
| `getTaskChecklistByUuid(client, taskId, taskChecklistUuid, queryParams?, options?)` | GET    | `/api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}`   | `TaskChecklistByUuid` |
| `deleteTaskNote(client, taskId, taskNoteId, options?)`                              | DELETE | `/api/{api_version}/tasks/{task_code}/notes/{note_id}`                 | -                     |
| `createTask(client, payload, options?)`                                             | POST   | `/api/{api_version}/tasks`                                             | `TaskView`            |
| `updateTaskChecklistByUuid(client, taskId, taskChecklistUuid, payload, options?)`   | PATCH  | `/api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}`   | `TaskView`            |
| `deleteTaskChecklistByUuid(client, taskId, taskChecklistUuid, options?)`            | DELETE | `/api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}`   | -                     |
| `getTaskNote(client, taskCode, noteId, options?)`                                   | GET    | `/api/{api_version}/tasks/{task_code}/notes/{note_id}`                 | -                     |
| `updateTaskNote(client, taskCode, noteId, note, options?)`                          | PATCH  | `/api/{api_version}/tasks/{task_code}/notes/{note_id}`                 | -                     |
| `getTaskNoteFiles(client, taskCode, noteId, options?)`                              | GET    | `/api/{api_version}/tasks/{task_code}/notes/{note_id}/files`           | -                     |
| `getTaskNoteFile(client, taskCode, noteId, fileId, options?)`                       | GET    | `/api/{api_version}/tasks/{task_code}/notes/{note_id}/files/{file_id}` | -                     |
| `deleteTaskNoteFile(client, taskCode, noteId, fileId, options?)`                    | DELETE | `/api/{api_version}/tasks/{task_code}/notes/{note_id}/files/{file_id}` | -                     |

## Teams endpoints

5 functions in `teams`. 4 of them name a typed view from `teamsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `teamsUrls`.

| Function                                                | Method | Path                                          | Typed view         |
| ------------------------------------------------------- | ------ | --------------------------------------------- | ------------------ |
| `getSettingsTeams(client, queryParams?, options?)`      | GET    | `/api/{api_version}/settings/teams`           | `SettingsTeamList` |
| `createSettingsTeam(client, payload, options?)`         | POST   | `/api/{api_version}/settings/teams`           | `SettingsTeam`     |
| `getSettingsTeam(client, teamId, options?)`             | GET    | `/api/{api_version}/settings/teams/{team_id}` | `SettingsTeam`     |
| `deleteSettingsTeam(client, teamId, options?)`          | DELETE | `/api/{api_version}/settings/teams/{team_id}` | -                  |
| `updateSettingsTeam(client, teamId, payload, options?)` | PATCH  | `/api/{api_version}/settings/teams/{team_id}` | `SettingsTeam`     |

## Time periods endpoints

5 functions in `timePeriods`. 4 of them name a typed view from `timePeriodsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `timePeriodsUrls`.

| Function                                                            | Method | Path                                                        | Typed view               |
| ------------------------------------------------------------------- | ------ | ----------------------------------------------------------- | ------------------------ |
| `getSettingsTimePeriods(client, queryParams?, options?)`            | GET    | `/api/{api_version}/settings/time_periods`                  | `SettingsTimePeriodList` |
| `createSettingsTimePeriod(client, payload, options?)`               | POST   | `/api/{api_version}/settings/time_periods`                  | `SettingsTimePeriod`     |
| `getSettingsTimePeriod(client, timePeriodId, options?)`             | GET    | `/api/{api_version}/settings/time_periods/{time_period_id}` | `SettingsTimePeriod`     |
| `deleteSettingsTimePeriod(client, timePeriodId, options?)`          | DELETE | `/api/{api_version}/settings/time_periods/{time_period_id}` | -                        |
| `updateSettingsTimePeriod(client, timePeriodId, payload, options?)` | PATCH  | `/api/{api_version}/settings/time_periods/{time_period_id}` | `SettingsTimePeriod`     |

## Timesheets endpoints

5 functions in `timesheets`. 4 of them name a typed view from `timesheetsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `timesheetsUrls`.

| Function                                                         | Method | Path                                           | Typed view      |
| ---------------------------------------------------------------- | ------ | ---------------------------------------------- | --------------- |
| `getTimesheets(client, queryParams?, options?)`                  | GET    | `/api/{api_version}/timesheets`                | `TimesheetList` |
| `createTimesheet(client, payload, options?)`                     | POST   | `/api/{api_version}/timesheets`                | `Timesheet`     |
| `deleteTimesheet(client, createdTimesheetId, options?)`          | DELETE | `/api/{api_version}/timesheets/{timesheet_id}` | -               |
| `updateTimesheet(client, createdTimesheetId, payload, options?)` | PATCH  | `/api/{api_version}/timesheets/{timesheet_id}` | `Timesheet`     |
| `getTimesheet(client, timesheetId, options?)`                    | GET    | `/api/{api_version}/timesheets/{timesheet_id}` | `Timesheets`    |

## Uom endpoints

5 functions in `uom`. 2 of them name a typed view from `uomDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `uomUrls`.

| Function                                              | Method | Path                                       | Typed view        |
| ----------------------------------------------------- | ------ | ------------------------------------------ | ----------------- |
| `getSettingsUoms(client, queryParams?, options?)`     | GET    | `/api/{api_version}/settings/uom`          | `SettingsUomList` |
| `createSettingsUom(client, payload, options?)`        | POST   | `/api/{api_version}/settings/uom`          | -                 |
| `getSettingsUom(client, uomId, options?)`             | GET    | `/api/{api_version}/settings/uom/{uom_id}` | `SettingsUom`     |
| `deleteSettingsUom(client, uomId, options?)`          | DELETE | `/api/{api_version}/settings/uom/{uom_id}` | -                 |
| `updateSettingsUom(client, uomId, payload, options?)` | PATCH  | `/api/{api_version}/settings/uom/{uom_id}` | -                 |

## Usages endpoints

6 functions in `usages`. 5 of them name a typed view from `usagesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `usagesUrls`.

| Function                                            | Method | Path                                   | Typed view     |
| --------------------------------------------------- | ------ | -------------------------------------- | -------------- |
| `getUsages(client, queryParams?, options?)`         | GET    | `/api/{api_version}/usages`            | `UsageList`    |
| `createUsage(client, payload, options?)`            | POST   | `/api/{api_version}/usages`            | `Usages`       |
| `getUsage(client, usageId, queryParams?, options?)` | GET    | `/api/{api_version}/usages/{usage_id}` | `Usage`        |
| `deleteUsage(client, usageId, options?)`            | DELETE | `/api/{api_version}/usages/{usage_id}` | -              |
| `updateUsage(client, usageId, payload, options?)`   | PATCH  | `/api/{api_version}/usages/{usage_id}` | `UsageUpdated` |
| `replaceUsage(client, usageId, payload, options?)`  | PUT    | `/api/{api_version}/usages/{usage_id}` | `UsageUpdated` |

## Webhooks endpoints

1 function in `webhooks`. 0 of them name a typed view from `webhooksDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `webhooksUrls`.

| Function                                  | Method | Path                                       | Typed view |
| ----------------------------------------- | ------ | ------------------------------------------ | ---------- |
| `getWebhook(client, webhookId, options?)` | GET    | `/api/{api_version}/webhooks/{webhook_id}` | -          |

## Workflows endpoints

17 functions in `workflows`. 6 of them name a typed view from `workflowsDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `workflowsUrls`.

| Function                                                                                                      | Method | Path                                                                                                      | Typed view              |
| ------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------- | ----------------------- |
| `deleteMilestone(client, milestoneUuid, options?)`                                                            | DELETE | `/api/{api_version}/milestones/{milestone_uuid}`                                                          | -                       |
| `updateWorkflowComponentById(client, ccId, payload, options?)`                                                | PATCH  | `/api/{api_version}/workflow/component/{cc_id}`                                                           | -                       |
| `getWorkflowMilestones(client, workflowUuid, queryParams?, options?)`                                         | GET    | `/api/{api_version}/workflows/{workflow_uuid}/milestones`                                                 | `WorkflowMilestoneList` |
| `createWorkflowComponentCcMilestone(client, ccId, payload, options?)`                                         | POST   | `/api/{api_version}/workflow/component/{cc_id}/milestone`                                                 | -                       |
| `getWorkflowComponentHistory(client, componentObjectId, queryParams?, options?)`                              | GET    | `/api/{api_version}/workflow/component/{component_object_id}/history`                                     | -                       |
| `getWorkflowComponentCcInstanceCcMilestone(client, componentUuid, componentObjectId, queryParams?, options?)` | GET    | `/api/{api_version}/workflow/component/{component_uuid}/{component_object_id}/milestone`                  | -                       |
| `getWorkflows(client, queryParams?, options?)`                                                                | GET    | `/api/{api_version}/workflows`                                                                            | `WorkflowList`          |
| `getWorkflow(client, workflowId, options?)`                                                                   | GET    | `/api/{api_version}/workflows/{workflow_id}`                                                              | `WorkflowView`          |
| `createWorkflow(client, payload, options?)`                                                                   | POST   | `/api/{api_version}/workflows`                                                                            | `WorkflowView`          |
| `updateWorkflow(client, workflowId, payload, options?)`                                                       | PATCH  | `/api/{api_version}/workflows/{workflow_id}`                                                              | `WorkflowView`          |
| `deleteWorkflow(client, workflowId, options?)`                                                                | DELETE | `/api/{api_version}/workflows/{workflow_id}`                                                              | -                       |
| `getWorkflowStages(client, workflowId, queryParams?, options?)`                                               | GET    | `/api/{api_version}/workflows/{workflow_id}/stages`                                                       | -                       |
| `getWorkflowStage(client, workflowId, stageId, options?)`                                                     | GET    | `/api/{api_version}/workflows/{workflow_id}/stages/{stage_id}`                                            | -                       |
| `getWorkflowCustomComponentHistory(client, componentUuid, objectCode, queryParams?, options?)`                | GET    | `/api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/history`                   | -                       |
| `getWorkflowCustomComponentMilestones(client, componentUuid, objectCode, queryParams?, options?)`             | GET    | `/api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/milestones`                | -                       |
| `getWorkflowCustomComponentMilestone(client, componentUuid, objectCode, milestoneId, options?)`               | GET    | `/api/{api_version}/workflows/custom_components/{component_uuid}/{object_code}/milestones/{milestone_id}` | -                       |
| `getWorkflowMilestone(client, workflowId, milestoneId, options?)`                                             | GET    | `/api/{api_version}/workflows/{workflow_id}/milestones/{milestone_id}`                                    | `WorkflowMilestoneView` |

## Zones endpoints

5 functions in `zones`. 4 of them name a typed view from `zonesDto`; the rest answer `.map` and `.json` with `.dto` `null`. Paths and body keys are in `zonesUrls`.

| Function                                                | Method | Path                                          | Typed view         |
| ------------------------------------------------------- | ------ | --------------------------------------------- | ------------------ |
| `getSettingsZones(client, queryParams?, options?)`      | GET    | `/api/{api_version}/settings/zones`           | `SettingsZoneList` |
| `createSettingsZone(client, payload, options?)`         | POST   | `/api/{api_version}/settings/zones`           | `SettingsZone`     |
| `getSettingsZone(client, zoneId, options?)`             | GET    | `/api/{api_version}/settings/zones/{zone_id}` | `SettingsZone`     |
| `deleteSettingsZone(client, zoneId, options?)`          | DELETE | `/api/{api_version}/settings/zones/{zone_id}` | -                  |
| `updateSettingsZone(client, zoneId, payload, options?)` | PATCH  | `/api/{api_version}/settings/zones/{zone_id}` | `SettingsZone`     |

## Configuration reference

### Setting options at three levels

```ts
// 1. Per client: applies to every call it makes
const client = await buildClient(0, {raiseOnError: true, printApiInfo: true});

// 2. Per config, derived: swap credentials, keep every other setting
const staging = config.withOverrides({auth: stagingAuth});

// 3. Per call: wins over both
await client.accounts.getAccount('W13ZGY', {raiseOnError: false});
```

`responseFormat` adds a fourth, `EXSITED_RESPONSE_FORMAT`, **below** all three; see
[Choosing the form](#choosing-the-form-four-tiers-highest-wins).

Option names are typed as `SdkOptions`, so an editor completes them, and an unknown or mistyped
field is refused at construction with `SdkConfigError` rather than silently ignored. Every problem
is reported at once.

### Every option

**Request**

| Option                  | Default                    | Meaning                                                                                             |
| ----------------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| `apiVersion`            | `'v4'`                     | Fills `{api_version}`. `'V4'`, `'4'` and `' 4 '` all store `'v4'`, the one version this SDK speaks. |
| `timeoutSeconds`        | `30`                       | Read deadline and hard ceiling on one attempt.                                                      |
| `connectTimeoutSeconds` | `10`                       | Deadline for opening the connection.                                                                |
| `defaultHeaders`        | `[]`                       | Added to every request. A per-call `Authorization` is never sent.                                   |
| `userAgent`             | `exsited-ts-sdk/<version>` |                                                                                                     |
| `raiseOnError`          | `false`                    | Throw on failure instead of returning it.                                                           |
| `responseFormat`        | `'map'`                    | Which form `response.data` presents: `'map'`, `'json'` or `'dto'`. Else `EXSITED_RESPONSE_FORMAT`.  |

**Retry**

| Option                     | Default                     | Meaning                                                             |
| -------------------------- | --------------------------- | ------------------------------------------------------------------- |
| `maxRetries`               | `1`                         | Total attempts including the first: `1` retries nothing.            |
| `retryableHttpCodes`       | `[429, 500, 502, 503, 504]` | Statuses retried on a safe method.                                  |
| `unsafeRetryableHttpCodes` | `[]`                        | Statuses retried on a write too; none proves a write did not apply. |
| `retryBackoffSeconds`      | `0.5`                       | Base backoff; exponential with full jitter.                         |
| `retryBackoffMaxSeconds`   | `20`                        | Ceiling on any single backoff, and on a server's `Retry-After`.     |

A write is replayed only for a status in **both** lists, and the second is empty by default: a
`500` never said whether the server committed, and a `429` or `503` can be written by a proxy in
front of an origin that already did. Which methods count as writes is decided by the `SAFE_METHODS`
allow-list (`GET`, `HEAD`, `OPTIONS`, `TRACE`), so a verb the SDK does not recognise is treated as a
write. A transport failure is retried by delivery stage: one that never reached the server for any
method, one after the request went out only for `GET`, `HEAD`, `OPTIONS`, `TRACE`, `PUT` or
`DELETE`. `401` is in neither list: it is handled above the transport, by the token refresh.

**Transport**

| Option        | Default | Meaning                                                                 |
| ------------- | ------- | ----------------------------------------------------------------------- |
| `verifySsl`   | `true`  | Verify the server certificate. Turning it off emits a warning.          |
| `caBundle`    | `null`  | Path to a CA bundle, for a private or self-signed chain.                |
| `proxyUrl`    | `null`  | `http://` or `https://` proxy for every request.                        |
| `poolMaxsize` | `10`    | Sockets kept open for reuse, not a ceiling on concurrency.              |
| `dispatcher`  | `null`  | An undici `Dispatcher` handed to an injected `fetchImpl` on every call. |
| `fetchImpl`   | `null`  | A `fetch` to send through instead of the SDK's own `node:http` backend. |

An injected `fetchImpl` is still given `redirect: 'manual'` and the abort `signal`; one that does
not honour them loses the redirect guard and the deadline.

**Ceilings**

| Option                      | Default | Meaning                                               |
| --------------------------- | ------- | ----------------------------------------------------- |
| `maxResponseBytes`          | 64 MiB  | One buffered response body. Over it is an `SdkError`. |
| `maxRequestBytes`           | 1 GiB   | The encoded request body, framing included.           |
| `maxUploadBytes`            | 1 GiB   | The source material one body is built from.           |
| `maxMultipartOverheadBytes` | 16 MiB  | Multipart framing and part headers.                   |
| `maxCaBundleBytes`          | 8 MiB   | The CA bundle read at construction.                   |

The request ceilings count **UTF-8 bytes, not characters**, because `"é".length` is 1 and its
encoding is two bytes. Over one is an `SdkUsageError` raised before any I/O.

`maxTokenCacheBytes` is not an option. The token store takes no size limit, so a field nothing
honoured would mislead; passing it is refused as an unknown config field.

**Logging and printing**

| Option                | Default     | Meaning                                                                   |
| --------------------- | ----------- | ------------------------------------------------------------------------- |
| `logLevel`            | `'WARNING'` | Lowest severity emitted.                                                  |
| `logBodies`           | `false`     | Include request and response bodies in DEBUG records, redacted.           |
| `logFile`             | `null`      | Also append records to this file, created mode `0600`.                    |
| `printApiInfo`        | `false`     | Print client, method, endpoint, url, status, attempt, timing, request id. |
| `printRequestPayload` | `false`     | Print the request body that was sent, redacted.                           |
| `printResponseBody`   | `false`     | Print the response body, with bytes summarised.                           |
| `printHeaders`        | `false`     | Print request and response headers, redacted.                             |
| `printCurl`           | `false`     | Print a POSIX `curl` reproduction, secrets removed.                       |
| `printOnlyOnError`    | `false`     | Print only the calls that failed.                                         |
| `printFormat`         | `'pretty'`  | `'pretty'`, boxed, or `'compact'`, one line per call.                     |
| `printColor`          | `false`     | ANSI colour, honouring `NO_COLOR` and whether stdout is a TTY.            |
| `printMaxChars`       | `0`         | Truncate printed bodies to this many characters; `0` is unlimited.        |

`logFile` writes records itself; `addLogSink()` hands them to your own logger. See
[Logging](#logging). The `print*` options are separate: they go to stdout, and are meant for a
human at a terminal rather than for a log pipeline.

## Errors

One base class, so a single `catch` covers everything:

```
SdkError                   carries statusCode, errorType, errorCode, requestId, docUrl, rawResponse
├── SdkConfigError         a setting is wrong; thrown before any I/O
├── SdkUsageError          the call is wrong; no request was sent
│   └── SdkAttributeError  no such family or endpoint on the client
├── SdkTokenCacheError     the token cache file is corrupt or unreadable (also exported as TokenCacheError)
├── SdkTokenLockError      the token cache lock could not be handled
└── SdkAuthError           the token request was rejected
```

**What prints by default is structural.** `String(error)` is a single line naming the class, the
status and error category, the method and the **endpoint template**, the attempt counts and the
SDK's own reason, joined with `·`:

```
SdkError · 404 not_found · GET /api/{api_version}/accounts/{account_id} · attempt 1/1 · HTTP 404 with no reported message
```

`error.explain()` is the multi-line version and withholds the same things: it prints how many query
parameters and reported messages there were, the attempt counts, the elapsed time, the v4 error
code, request id and documentation link, a hint, and the body's size in characters. None of the
content.
`error.explain({ includeSensitive: true })` adds the query values, the resolved URL, the messages
the API reported and the start of the body. That output reproduces whatever the exchange carried,
personal data included, so it is never what an uncaught error prints. Everything withheld is
reachable by name regardless: `getErrorMessages()`, `getCause()`, `fieldErrors`, `rawResponse`,
`responseHeaders`, `requestInfo`, `details`.

**The underlying failure is on `getCause()`, not on `error.cause`.** Node prints an error's `cause`
whatever the property descriptor says, and a socket failure's message carries the host, so nothing
is assigned to `cause`. `causeCategory` is the classification that prints.

The v4 error envelope, `{object: "error", code, request_id, doc_url, errors[]}`, is read into
`errorCode`, `requestId` and `docUrl`, and its per-field failures into `fieldErrors`. Quote the
request id when reporting a problem.

`InsecureTransportWarning` is emitted (not thrown) for an `http://` base URL off loopback, once per
base URL, and for `verifySsl: false`. `ExsitedTokenLockWarning` reports, once per store, a token
cache that could not take the cross-process lock.

## Logging

Node has no standard logging module for a host application to configure, so records are delivered
to **sinks** you register:

```ts
import {addLogSink} from 'exsited';

const off = addLogSink((record) => logger.log(record.levelName, record.message), {level: 'INFO'});
// ... later
off(); // unsubscribe
```

Records run under the logger `exsited.<clientName>`. Each exchange is an INFO record,
`GET /api/{api_version}/accounts -> 200 in 0.21s (attempt 1/1)`; a stale-token `401` is a WARNING,
a failure that got no response an ERROR, each attempt and retry an INFO, and with `logBodies` the
redacted payload and response a DEBUG record. Each sink has its own level and optional logger-name
filter. With no sink and no `logFile`, records are discarded: a library should be silent until
asked to speak.

`logFile` appends `<iso> <LEVEL> <logger> <message>` lines, created mode `0600` where the platform
honours it, with a missing parent directory created. A path that cannot be opened, a directory for
instance, is an `SdkConfigError` from the client constructor. Bodies are off by default because
redaction masks credentials and not the customer data around them. **A log file read back in a
terminal is still a terminal**, so every line runs the same control-character guard as the console.

## Debugging a call

Turn on the printer rather than adding `console.log`:

```ts
const client = await buildClient(0, {
    printApiInfo: true,
    printRequestPayload: true,
    printResponseBody: true,
    printCurl: true,
    printOnlyOnError: true, // only the calls that failed
});
```

`printCurl` gives you a command you can paste into a POSIX shell to reproduce the request outside
the SDK, with the token replaced by `***`. Every printed value is redacted and control-neutralised
first. What the box may draw with is decided per call: the Unicode glyphs only when stdout is a TTY
on a platform other than Windows whose `LC_ALL`, `LC_CTYPE` or `LANG` names UTF-8, and ASCII
otherwise, because ASCII renders on a Unicode console and the reverse does not.

## Concurrency

Parallel calls are supported:

```ts
const [accountList, itemList] = await Promise.all([
    client.accounts.getAccounts({limit: 50}),
    client.items.getItems({limit: 50}),
]);
```

- **One client, shared.** It owns the pool and the token. Do not build one per request.
- **Raise `poolMaxsize`** above the default 10 for sustained heavy concurrency. It is a reuse hint,
  not a limit.
- **Use `Promise.allSettled` for parallel writes**, so one failure does not discard the results of
  the others.
- **A new grant revokes the previous token.** On these client credentials the instance invalidates
  the token it issued before, so two processes that each mint one will each see the other's calls
  answered `401` until they refresh. Share a `tokenCachePath` between processes that use the same
  credentials.

### If the token expires mid-batch

Nothing is lost. Every call checks `expiresAt` minus a 60-second skew before sending, so a token
that expires by time is renewed before it is used and a `401` never happens. A `401` only happens
when the server rejects a token that still looks valid, a revocation or clock skew, and then the
call invalidates the refused token in the store (compare-and-clear, so a token another call has
already replaced is left alone), refreshes, and replays **once**. Never a loop: if the replay also
fails, you get the `401`. A `401` is read as a dead token only when its body names one, or, for a
safe method, when the body is not a JSON object; a `401` naming anything else is an authorisation
refusal and is not replayed.

## Security

- **Secrets never surface.** `clientSecret`, tokens, `Authorization`, `api_key`, `password` and
  friends are redacted in printed exchanges, log records, `RequestInfo`, `curl` output and every
  error, including URLs embedded in messages from lower layers. Matching ignores case and
  separators, so `api_key`, `api-key` and `apiKey` are one rule.
- **Redirects are never followed.** A `3xx` is returned to you.
- **Path values are escaped** with an empty safe set, and a dot-only value is refused.
- **Credentials in a `baseUrl` are refused**, and an absolute path off the configured origin is
  refused rather than sent with the bearer token.
- **`http://` and `verifySsl: false` warn**, because they expose the bearer token.
- **Nothing from outside the SDK reaches the terminal unescaped.** Every value the printer
  interpolates passes `neutraliseControls` first, because a terminal acts on an escape sequence.

## Extending the SDK

From your own code, `registerResourceModule('myFamily', myFamilyModule)` makes
`client.myFamily.<fn>()` dispatch without touching the SDK.

You can also replace whole layers: pass your own `tokenStore`, `transport`, `retryPolicy` or
`tokenProvider` to the `ExsitedClient` constructor, or a `fetchImpl` in the config.

## How it works

Roughly, in the order a request travels:

```
your call
  → resource function        turns arguments into a path + payload
  → client                   auth, headers, path templating, query normalisation, idempotency key
  → transport                encode once, retry, backoff, timeouts, decode
  → nodeFetch                node:http / node:https, TLS, proxy, pooling, multipart framing
  ← ApiResponse              status, decoded body, RequestInfo
```

- **Auth.** A token is read from the store on every call, so a refresh by any process is visible to
  all of them. The token endpoint is `/api/v4/oauth2/token`. A renewal tries the `refresh_token`
  grant first and falls back to `client_credentials`.
- **Transport.** The backend is `node:http`/`node:https`, not the global `fetch`, because `fetch`
  cannot express `caBundle`, `proxyUrl` or `poolMaxsize`, and offers one total deadline rather than
  a real connect and read pair.
- **Decoding.** JSON becomes an object, `text/*` a string, anything else stays a `Uint8Array`. A
  `204` or an empty body is `null`. The body text is kept beside the decoded value, which is what
  `response.json` hands back.
- **Typed views.** `response.dto` builds one on demand from the decoded body, using the type the
  endpoint function named. Nothing is built unless it is read.

## Troubleshooting

**`SdkConfigError: instance default: baseUrl: must not be blank; ...`**
`AuthConfig` got blanks. If you are loading a `.env`, check it was found: `process.loadEnvFile`
resolves relative to the working directory, not the file.

**`SdkAttributeError` naming a family or endpoint**
A misspelling. The message suggests the closest real name.

**A walk returns one page and reports nothing**
The listing pages by offset and `recordKey` was left at `data`. Pass the family's `RECORD_KEY`.

**Every money field reads `null`**
The view declared them as numbers. The API sends strings; a DTO converts nothing.

**A listing comes back unsorted with a `200`**
The family takes the other sorting spelling. See
[Filtering, sorting and expand](#filtering-sorting-and-expand).

**A `401` replays and fails twice**
The `401` was an authorisation refusal, not a stale token.

**Calls start answering `401` while another process runs**
A new grant on the same client credentials revoked this process's token. Share a `tokenCachePath`.

**A `503` or a `POST` is not retried**
`maxRetries` counts total attempts including the first, and the default is 1. A write also needs
the status in `unsafeRetryableHttpCodes`, which is empty by default.

**The token endpoint 404s**
The token path is `/api/v4/oauth2/token`, built from `TOKEN_API_VERSION`.

**`InsecureTransportWarning`**
Your `baseUrl` is `http://` to something other than loopback, or `verifySsl` is off. Both send the
bearer token readable by anything on the path.

**`SdkAuthError` on the very first call**
The token request itself was rejected, so there is no response to hand back and `raiseOnError`
does not apply. Check `clientId`, `clientSecret` and `redirectUri`.

## Licence

MIT. See [LICENSE](LICENSE).
