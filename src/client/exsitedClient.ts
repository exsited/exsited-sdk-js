/** The client: config in, `ApiResponse` out, with no case conversion in either direction. */

import {randomUUID} from 'node:crypto';

import {TokenProvider} from '../auth/tokenProvider.js';
import {buildDefaultTokenCachePath, FileTokenStore, MemoryTokenStore, type TokenStore} from '../auth/tokenStore.js';
import {
    type ResponseFormat,
    SdkConfig,
    type SdkOptions,
    unsendableHeaderReason,
    VALID_RESPONSE_FORMATS,
} from '../config/sdkConfig.js';
import {type CredentialsBlock, getRegisteredInstances} from '../config/selectCredentials.js';
import {dtoMapOf} from '../dto.js';
import {InsecureTransportWarning, SdkError, SdkUsageError} from '../errors.js';
import {buildQueryParams, type QueryParams} from '../http/queryParams.js';
import {type RetryPolicy, SAFE_METHODS} from '../http/retryPolicy.js';
import {
    bufferPayloadStreams,
    encodeRequestBody,
    type FormFields,
    headerValueText,
    type MultipartFiles,
    refuseUnsendableMultipartLabels,
    requestCeilings,
    snapshotPayload,
    Transport,
} from '../http/transport.js';
import {buildUrl, findPathParamNames, substitutePathParams} from '../http/urlBuilder.js';
import {redactMapping, redactValue} from '../redaction.js';
import {ApiResponse, classifyErrorType, type DtoTypeLike, pathTemplateOf, RequestInfo} from './apiResponse.js';
import {type RenderableExchange, renderExchange, renderJsonValue, summarisePayload} from './console.js';
import {warnAboutPlaintextBaseUrl} from './insecureBaseUrl.js';
import {
    attachLogFile,
    detachLogFile,
    emitLogRecord,
    LOG_LEVELS,
    type LogFileHandle,
    levelName,
    resolveLevel,
    writeLogFileRecord,
} from './logging.js';
import {
    BoundResource,
    registeredResourceNames,
    registerResourceModule,
    resolveResourceModule,
} from './resourceBinding.js';
import type * as accountsModule from '../resources/accounts/accounts.js';
import type * as itemsModule from '../resources/items/items.js';
import type * as invoicesModule from '../resources/invoices/invoices.js';
import type * as abaFilesModule from '../resources/abaFiles/abaFiles.js';
import type * as accountEmailsModule from '../resources/accountEmails/accountEmails.js';
import type * as accountGroupsModule from '../resources/accountGroups/accountGroups.js';
import type * as accountingCodesModule from '../resources/accountingCodes/accountingCodes.js';
import type * as actionScriptsModule from '../resources/actionScripts/actionScripts.js';
import type * as additionalCodesModule from '../resources/additionalCodes/additionalCodes.js';
import type * as alertResponsibilitiesModule from '../resources/alertResponsibilities/alertResponsibilities.js';
import type * as alertResponsibilityModule from '../resources/alertResponsibility/alertResponsibility.js';
import type * as alertsModule from '../resources/alerts/alerts.js';
import type * as applicationsModule from '../resources/applications/applications.js';
import type * as approvalProfilesModule from '../resources/approvalProfiles/approvalProfiles.js';
import type * as approvalUserGroupsModule from '../resources/approvalUserGroups/approvalUserGroups.js';
import type * as approvalsModule from '../resources/approvals/approvals.js';
import type * as attributeAttachmentsModule from '../resources/attributeAttachments/attributeAttachments.js';
import type * as billingPeriodsModule from '../resources/billingPeriods/billingPeriods.js';
import type * as bookingsModule from '../resources/bookings/bookings.js';
import type * as chargingPeriodsModule from '../resources/chargingPeriods/chargingPeriods.js';
import type * as communicationProfilesModule from '../resources/communicationProfiles/communicationProfiles.js';
import type * as communicationsModule from '../resources/communications/communications.js';
import type * as countriesModule from '../resources/countries/countries.js';
import type * as creditNoteApplicationsModule from '../resources/creditNoteApplications/creditNoteApplications.js';
import type * as creditNotesModule from '../resources/creditNotes/creditNotes.js';
import type * as customAttributesModule from '../resources/customAttributes/customAttributes.js';
import type * as customComponentsModule from '../resources/customComponents/customComponents.js';
import type * as customEventsModule from '../resources/customEvents/customEvents.js';
import type * as customFeaturesModule from '../resources/customFeatures/customFeatures.js';
import type * as customFieldsModule from '../resources/customFields/customFields.js';
import type * as customFormsModule from '../resources/customForms/customForms.js';
import type * as dayOfMonthModule from '../resources/dayOfMonth/dayOfMonth.js';
import type * as departmentsModule from '../resources/departments/departments.js';
import type * as designationsModule from '../resources/designations/designations.js';
import type * as documentTemplatesModule from '../resources/documentTemplates/documentTemplates.js';
import type * as emailTemplatesModule from '../resources/emailTemplates/emailTemplates.js';
import type * as employeesModule from '../resources/employees/employees.js';
import type * as eventsModule from '../resources/events/events.js';
import type * as expressModule from '../resources/express/express.js';
import type * as externalDatabasesModule from '../resources/externalDatabases/externalDatabases.js';
import type * as fulfillmentProfilesModule from '../resources/fulfillmentProfiles/fulfillmentProfiles.js';
import type * as fulfillmentTermsModule from '../resources/fulfillmentTerms/fulfillmentTerms.js';
import type * as giftCertificatesModule from '../resources/giftCertificates/giftCertificates.js';
import type * as integrationConnectionsModule from '../resources/integrationConnections/integrationConnections.js';
import type * as inventoryAdjustmentsModule from '../resources/inventoryAdjustments/inventoryAdjustments.js';
import type * as invoiceTermsModule from '../resources/invoiceTerms/invoiceTerms.js';
import type * as itemFulfillmentsModule from '../resources/itemFulfillments/itemFulfillments.js';
import type * as itemReceiptsModule from '../resources/itemReceipts/itemReceipts.js';
import type * as laboursModule from '../resources/labours/labours.js';
import type * as milestonesModule from '../resources/milestones/milestones.js';
import type * as noteAttachmentsModule from '../resources/noteAttachments/noteAttachments.js';
import type * as noteGroupsModule from '../resources/noteGroups/noteGroups.js';
import type * as ordersModule from '../resources/orders/orders.js';
import type * as organisationModule from '../resources/organisation/organisation.js';
import type * as organisationsModule from '../resources/organisations/organisations.js';
import type * as paymentsModule from '../resources/payments/payments.js';
import type * as portalsModule from '../resources/portals/portals.js';
import type * as pricingPeriodsModule from '../resources/pricingPeriods/pricingPeriods.js';
import type * as proformaInvoicesModule from '../resources/proformaInvoices/proformaInvoices.js';
import type * as purchaseCreditNoteApplicationsModule from '../resources/purchaseCreditNoteApplications/purchaseCreditNoteApplications.js';
import type * as purchaseCreditNotesModule from '../resources/purchaseCreditNotes/purchaseCreditNotes.js';
import type * as purchaseExpressModule from '../resources/purchaseExpress/purchaseExpress.js';
import type * as purchaseInvoicesModule from '../resources/purchaseInvoices/purchaseInvoices.js';
import type * as purchaseOrdersModule from '../resources/purchaseOrders/purchaseOrders.js';
import type * as purchasePaymentsModule from '../resources/purchasePayments/purchasePayments.js';
import type * as purchaseRefundsModule from '../resources/purchaseRefunds/purchaseRefunds.js';
import type * as quoteOrdersModule from '../resources/quoteOrders/quoteOrders.js';
import type * as receiveTermsModule from '../resources/receiveTerms/receiveTerms.js';
import type * as reconciliationsModule from '../resources/reconciliations/reconciliations.js';
import type * as refundsModule from '../resources/refunds/refunds.js';
import type * as rentalAssetsModule from '../resources/rentalAssets/rentalAssets.js';
import type * as reportsModule from '../resources/reports/reports.js';
import type * as returnMerchandiseAuthorisationsModule from '../resources/returnMerchandiseAuthorisations/returnMerchandiseAuthorisations.js';
import type * as returnVendorAuthorizationsModule from '../resources/returnVendorAuthorizations/returnVendorAuthorizations.js';
import type * as rolesModule from '../resources/roles/roles.js';
import type * as salesRepsModule from '../resources/salesReps/salesReps.js';
import type * as salutationsModule from '../resources/salutations/salutations.js';
import type * as settingsModule from '../resources/settings/settings.js';
import type * as settingsWorkflowsModule from '../resources/settingsWorkflows/settingsWorkflows.js';
import type * as shippingPackagesModule from '../resources/shippingPackages/shippingPackages.js';
import type * as shippingRulesModule from '../resources/shippingRules/shippingRules.js';
import type * as systemEventsModule from '../resources/systemEvents/systemEvents.js';
import type * as tasksModule from '../resources/tasks/tasks.js';
import type * as teamsModule from '../resources/teams/teams.js';
import type * as timePeriodsModule from '../resources/timePeriods/timePeriods.js';
import type * as timesheetsModule from '../resources/timesheets/timesheets.js';
import type * as uomModule from '../resources/uom/uom.js';
import type * as usagesModule from '../resources/usages/usages.js';
import type * as webhooksModule from '../resources/webhooks/webhooks.js';
import type * as workflowsModule from '../resources/workflows/workflows.js';
import type * as zonesModule from '../resources/zones/zones.js';

export {registerResourceModule};

/** One module's endpoint functions with the leading `client` argument already supplied. */
export type BoundModule<T> = {
    [K in keyof T]: T[K] extends (client: ExsitedClient, ...rest: infer R) => infer O ? (...rest: R) => O : never;
};

const API_VERSION_PARAM = 'api_version';

/** The header v4 uses to collapse a repeated create into one. */
export const IDEMPOTENCY_HEADER = 'X-Idempotency-Key';

/** The methods the SDK generates an {@link IDEMPOTENCY_HEADER} for: `POST`, the one a replay would duplicate. */
export const IDEMPOTENCY_KEY_METHODS: ReadonlySet<string> = Object.freeze(new Set(['POST']));

/**
 * What a `401` body says when the access token is dead:
 * `{"code": "unauthorized", "message": "Unauthorized access"}`. Matched as whole words, never substrings.
 */
export const TOKEN_FAILURE_MARKERS: ReadonlySet<string> = new Set([
    'unauthorized',
    'invalid_access_token',
    'invalid_token',
    'expired_token',
    'invalid_request',
]);

/** The keys of a `401` body that may carry a marker, read independently, never as a `??` chain. */
export const TOKEN_FAILURE_KEYS: readonly string[] = ['code', 'error', 'message'];

export interface SendOptions {
    pathParams?: Record<string, unknown> | undefined;
    queryParams?: QueryParams | undefined;
    /** An object, an array, a raw JSON string or a payload DTO. */
    jsonBody?: unknown;
    formData?: FormFields | undefined;
    /** Uploads; with them, `formData` becomes the plain fields of one multipart body. */
    files?: MultipartFiles | undefined;
    headers?: Readonly<Record<string, string | Uint8Array>> | undefined;
    authenticated?: boolean | undefined;
    raiseOnError?: boolean | null | undefined;
    /** Highest of the four tiers; omit to defer to `config.responseFormat`. */
    responseFormat?: ResponseFormat | string | null | undefined;
    /** The type `.dto` builds: a `Dto` subclass or a spec. Endpoint functions pass their own. */
    dtoType?: DtoTypeLike | null | undefined;
}

export interface ClientOptions {
    tokenStore?: TokenStore | undefined;
    transport?: Transport | undefined;
    retryPolicy?: RetryPolicy | undefined;
    tokenProvider?: TokenProvider | undefined;
}

/** An HTTP method token, per RFC 9110. The same grammar the transport applies. */
const HTTP_METHOD_TOKEN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

function normaliseHttpMethod(httpMethod: unknown): string {
    if (typeof httpMethod !== 'string') throw new SdkUsageError(`httpMethod must be text, got ${typeof httpMethod}`);
    const normalised = httpMethod.trim().toUpperCase();
    if (!normalised) throw new SdkUsageError(`httpMethod must name a verb, got ${JSON.stringify(httpMethod)}`);
    if (!HTTP_METHOD_TOKEN.test(normalised)) {
        throw new SdkUsageError(
            `httpMethod: ${JSON.stringify(httpMethod)} is not an HTTP method - a method is one token of ` +
                'letters, digits and the punctuation RFC 9110 allows, with no spaces or control characters',
        );
    }
    return normalised;
}

function validatePath(p: unknown): string {
    if (typeof p !== 'string') throw new SdkUsageError(`path must be text, got ${typeof p}`);
    if (!p.trim()) {
        throw new SdkUsageError(
            `path must name an endpoint, got ${JSON.stringify(p)} - an empty path requests the API root`,
        );
    }
    return p;
}

/** Verify a text `jsonBody`; parsed only to verify, never to rewrite. */
function checkJsonBodyText(jsonBody: string): void {
    let decoded: unknown;
    try {
        decoded = JSON.parse(jsonBody);
    } catch (error) {
        throw new SdkUsageError(`jsonBody: not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
    if (decoded === null || typeof decoded !== 'object') {
        throw new SdkUsageError(
            `jsonBody: a JSON string must hold an object or an array, got ${decoded === null ? 'null' : typeof decoded}`,
        );
    }
}

function rejectDuplicatedQueryParams(url: string, params: Readonly<Record<string, unknown>>): void {
    if (!params || !Object.keys(params).length) return;
    let existing: Set<string>;
    try {
        existing = new Set([...new URL(url).searchParams.keys()]);
    } catch {
        return;
    }
    const clash = Object.keys(params)
        .filter((name) => existing.has(name))
        .sort();
    if (clash.length) {
        throw new SdkUsageError(
            `queryParams ${clash.join(', ')} already appear in the path's own query string, so each would be sent twice with two values and the API chooses - pass them once, in one place`,
        );
    }
}

/** The per-call header values read down to text once, so the header validated is the header sent. */
function materialiseHeaderValues(
    headers: Readonly<Record<string, unknown>> | undefined,
): Readonly<Record<string, string | null>> {
    // No prototype while it is filled: on a `{}`, `materialised['__proto__'] = v` sets one.
    const materialised = Object.create(null) as Record<string, string | null>;
    for (const [name, value] of Object.entries(headers || {})) materialised[name] = headerValueText(value);
    return Object.freeze(Object.setPrototypeOf(materialised, Object.prototype) as Record<string, string | null>);
}

/** Freeze a normalised query map and its lists, so the transport and every `RequestInfo` agree. */
function freezeQueryParams(params: Record<string, unknown>): Readonly<Record<string, unknown>> {
    for (const value of Object.values(params)) if (Array.isArray(value)) Object.freeze(value);
    return Object.freeze(params);
}

/** A request that never produced a response, for the console. */
class FailedExchange implements RenderableExchange {
    readonly succeeded = false;
    readonly data = null;
    // The console reads `map`, so this shape has to carry one too.
    readonly map = null;
    readonly statusCode = 'no response';
    readonly headers: Readonly<Record<string, string>> = Object.freeze({});
    readonly requestInfo: RequestInfo | null;

    constructor(error: SdkError) {
        this.requestInfo = error.requestInfo as RequestInfo | null;
    }
}

/** Authenticated access to one Exsited instance. */
export class ExsitedClient {
    readonly #config: SdkConfig;
    readonly #loggerName: string;
    readonly #logLevel: number;
    #logFile: LogFileHandle | null = null;
    #closed = false;
    /** Accepted calls not yet finished; `closeClient` waits for them. */
    readonly #inFlight = new Set<Promise<unknown>>();
    /** The single teardown, so two `closeClient()` callers wait for one. */
    #closing: Promise<void> | null = null;
    readonly #ownsTransport: boolean;
    readonly #transport: Transport;
    readonly #tokenStore: TokenStore;
    readonly #tokenProvider: TokenProvider;
    readonly #resourceCache = new Map<string, BoundResource>();

    constructor(config: SdkConfig, options: ClientOptions = {}) {
        if (options.transport != null && options.retryPolicy != null) {
            throw new SdkUsageError(
                'pass transport or retryPolicy, not both - an injected transport already carries its own policy',
            );
        }
        this.#config = config;
        this.#loggerName = `exsited.${loggerSafe(config.clientName)}`;
        this.#logLevel = resolveLevel(config.logLevel);
        if (config.logFile) {
            this.#logFile = attachLogFile(this.#loggerName, config.clientName, config.logFile, this.#logLevel);
        }

        try {
            if (!config.verifySsl) {
                const message = 'TLS verification is disabled (verifySsl=false); responses cannot be trusted';
                this.#log(LOG_LEVELS.WARNING, message);
                process.emitWarning(message, {type: 'InsecureTransportWarning', ctor: InsecureTransportWarning});
            }
            const plaintext = warnAboutPlaintextBaseUrl(config.baseUrl);
            if (plaintext !== null) this.#log(LOG_LEVELS.WARNING, plaintext);

            // Caller-supplied: its lifetime is theirs, so `closeClient` leaves it open.
            this.#ownsTransport = !options.transport;
            this.#transport =
                options.transport ||
                new Transport(config, {
                    retryPolicy: options.retryPolicy,
                    onProgress: (message) => this.#reportProgress(message),
                });
            this.#tokenStore = options.tokenStore || buildTokenStore(config);
            this.#tokenProvider = options.tokenProvider || new TokenProvider(config, this.#tokenStore);
        } catch (error) {
            this.#detachLogFile();
            throw error;
        }

        const proxy = new Proxy(this, {
            get(target, prop) {
                if (typeof prop === 'symbol' || prop.startsWith('_') || prop in target) {
                    const value: unknown = Reflect.get(target, prop, target);
                    // Bound to the real instance, so private fields work through the proxy.
                    return typeof value === 'function'
                        ? (value as (...args: unknown[]) => unknown).bind(target)
                        : value;
                }
                if (prop === 'then') return undefined;
                // A name registered at runtime; both branches end in the same cache.
                return target.#boundResource(prop);
            },
        });
        return proxy;
    }

    /** The frozen config this client was built from. */
    get config(): SdkConfig {
        return this.#config;
    }

    /** The instance label, i.e. `config.clientName`. */
    get name(): string {
        return this.#config.clientName;
    }

    /** Send one request and return the response; refuses once `closeClient` has been called. */
    async sendApiRequest<T = unknown>(
        httpMethod: string,
        requestPath: string,
        options: SendOptions = {},
    ): Promise<ApiResponse<T>> {
        // Accept then register with no await between, so a call is either refused or in the set `closeClient` drains.
        this.#refuseWhenClosed();
        const running = this.#performApiRequest<T>(httpMethod, requestPath, options);
        this.#inFlight.add(running);
        try {
            return await running;
        } finally {
            this.#inFlight.delete(running);
        }
    }

    async #performApiRequest<T>(
        httpMethod: string,
        requestPath: string,
        options: SendOptions,
    ): Promise<ApiResponse<T>> {
        // Read once: `options` is the caller's object and could answer differently across the awaits below.
        const {
            pathParams,
            queryParams,
            jsonBody: suppliedJsonBody,
            formData: suppliedFormData,
            files: suppliedFiles,
            headers: suppliedHeaders,
            authenticated,
            raiseOnError,
            responseFormat: perCallResponseFormat,
            dtoType,
        } = options;
        const authenticate = authenticated !== false;
        const shouldRaise = raiseOnError == null ? this.#config.raiseOnError : raiseOnError;
        const dtoTypeForCall = (dtoType ?? null) as DtoTypeLike<T> | null;

        const method = normaliseHttpMethod(httpMethod);
        const path_ = validatePath(requestPath);
        const responseFormat = this.#resolveResponseFormat(perCallResponseFormat);
        const perCallHeaders = this.#withIdempotencyKey(method, materialiseHeaderValues(suppliedHeaders));
        // Refused before the grant: a caller mistake must not cost a token request.
        this.#refuseUnsendableHeaders(perCallHeaders);

        // Settled before the payload is read, whose `toJSON` or `toMap` is the caller's code and could rewrite them.
        const endpoint = pathTemplateOf(path_);
        const resolvedPath = substitutePathParams(path_, this.#seedApiVersion(path_, pathParams));
        const url = buildUrl(this.#config.baseUrl, resolvedPath);
        const normalisedParams = freezeQueryParams(buildQueryParams(queryParams));
        rejectDuplicatedQueryParams(url, normalisedParams);
        const baseHeaders = Object.freeze(this.#buildRequestHeaders(perCallHeaders));

        const jsonBody = dtoMapOf(suppliedJsonBody);
        const jsonBodyText = this.#materialiseJsonBody(jsonBody, suppliedFormData, suppliedFiles);

        // The last read of the caller's payload, settled as wire text, so what is judged is what is sent.
        const [payloadFiles, payloadForm] = snapshotPayload(suppliedFiles, suppliedFormData);
        refuseUnsendableMultipartLabels(payloadFiles, payloadForm);

        // Diagnostics from the snapshot and the serialised text, not the caller's live objects.
        const reportedBody: unknown = jsonBodyText === null ? payloadForm : JSON.parse(jsonBodyText);
        const requestBodySummary = redactValue(summarisePayload(reportedBody, payloadFiles));
        const formEncoded = jsonBodyText === null && payloadForm != null;

        // Settled before the token grant, the first await; a retry and a refresh-and-replay reuse these bytes.
        const ceilings = requestCeilings(this.#config);
        const [files, formData] = await bufferPayloadStreams(payloadFiles, payloadForm, ceilings);
        const wireBody = await encodeRequestBody(jsonBodyText, formData, files, ceilings);

        let accessToken: string | null = authenticate ? await this.#tokenProvider.getAccessToken() : null;

        const sendOnce = async (token: string | null): Promise<ApiResponse<T>> => {
            const requestHeaders: Record<string, string> = token
                ? {...baseHeaders, Authorization: `Bearer ${token}`}
                : {...baseHeaders};
            let parts;
            try {
                parts = await this.#transport.sendHttpRequest({
                    method,
                    url,
                    endpoint,
                    params: normalisedParams,
                    body: wireBody,
                    headers: requestHeaders,
                });
            } catch (error) {
                if (error instanceof SdkError && error.requestInfo != null) {
                    this.#reportExchange(
                        new FailedExchange(error),
                        reportedBody,
                        payloadFiles,
                        LOG_LEVELS.ERROR,
                        formEncoded,
                    );
                }
                throw error;
            }
            return new ApiResponse<T>({
                statusCode: parts.statusCode,
                data: parts.data,
                bodyText: parts.bodyText,
                responseFormat,
                dtoType: dtoTypeForCall,
                headers: parts.headers,
                contentType: parts.contentType,
                errorType: classifyErrorType(parts.statusCode),
                requestInfo: new RequestInfo({
                    clientName: this.#config.clientName,
                    apiVersion: this.#config.apiVersion,
                    httpMethod: method,
                    url,
                    // Kept privately: the pagination walk tells pages apart by query values the printed `url` redacts.
                    resolvedUrl: parts.resolvedUrl,
                    endpoint,
                    queryParams: normalisedParams,
                    headers: redactMapping(requestHeaders),
                    body: requestBodySummary,
                    attemptCount: parts.attemptCount,
                    maxAttempts: parts.maxAttempts,
                    elapsedSeconds: parts.elapsedSeconds,
                }),
            });
        };

        let response = await sendOnce(accessToken);

        if (authenticate && response.statusCode === 401 && meansExpiredToken(response.map, method)) {
            this.#reportExchange(response, reportedBody, payloadFiles, LOG_LEVELS.WARNING, formEncoded);
            // The refresh runs on the 401 itself: the refused token must not survive in a cache other processes read.
            try {
                accessToken = await this.#tokenProvider.refreshAccessToken(accessToken);
            } catch (error) {
                // Evicted compare-and-clear, so a token some other worker minted meanwhile survives.
                await this.#tokenProvider.invalidateAccessToken(accessToken);
                throw error;
            }
            // The same request under the same frozen headers and bytes; only the bearer token differs.
            response = await sendOnce(accessToken);
        }

        this.#reportExchange(response, reportedBody, payloadFiles, LOG_LEVELS.INFO, formEncoded);

        if (shouldRaise) response.raiseForStatus();
        return response;
    }

    /** `GET` one path. Retried on a transport error or a retryable status. */
    sendGetRequest<T = unknown>(p: string, opts: SendOptions = {}): Promise<ApiResponse<T>> {
        return this.sendApiRequest<T>('GET', p, opts);
    }

    /** `POST` one path; not retried on a `500` unless `unsafeRetryableHttpCodes` names it. */
    sendPostRequest<T = unknown>(p: string, opts: SendOptions = {}): Promise<ApiResponse<T>> {
        return this.sendApiRequest<T>('POST', p, opts);
    }

    /** `PUT` one path: a full replace. */
    sendPutRequest<T = unknown>(p: string, opts: SendOptions = {}): Promise<ApiResponse<T>> {
        return this.sendApiRequest<T>('PUT', p, opts);
    }

    /** `PATCH` one path: send only the fields being changed. */
    sendPatchRequest<T = unknown>(p: string, opts: SendOptions = {}): Promise<ApiResponse<T>> {
        return this.sendApiRequest<T>('PATCH', p, opts);
    }

    /** `DELETE` one path; a `204` carries no body, so `response.data` is `null`. */
    sendDeleteRequest<T = unknown>(p: string, opts: SendOptions = {}): Promise<ApiResponse<T>> {
        return this.sendApiRequest<T>('DELETE', p, opts);
    }

    /** Release the pool and the log file this client holds, and latch closed; later requests raise. */
    async closeClient(): Promise<void> {
        if (this.#closing) return this.#closing;
        // Latched before anything is awaited, so from here a call is either refused or drained.
        this.#closed = true;
        this.#closing = (async () => {
            try {
                // Settled, not resolved: a call that fails has still finished with the resources.
                while (this.#inFlight.size) await Promise.allSettled([...this.#inFlight]);
                if (this.#ownsTransport) await this.#transport.closeTransport();
            } finally {
                this.#resourceCache.clear();
                this.#detachLogFile();
            }
        })();
        return this.#closing;
    }

    get accounts(): BoundModule<typeof accountsModule> {
        return this.#boundResource('accounts') as unknown as BoundModule<typeof accountsModule>;
    }

    get items(): BoundModule<typeof itemsModule> {
        return this.#boundResource('items') as unknown as BoundModule<typeof itemsModule>;
    }

    get invoices(): BoundModule<typeof invoicesModule> {
        return this.#boundResource('invoices') as unknown as BoundModule<typeof invoicesModule>;
    }

    get abaFiles(): BoundModule<typeof abaFilesModule> {
        return this.#boundResource('abaFiles') as unknown as BoundModule<typeof abaFilesModule>;
    }

    get accountEmails(): BoundModule<typeof accountEmailsModule> {
        return this.#boundResource('accountEmails') as unknown as BoundModule<typeof accountEmailsModule>;
    }

    get accountGroups(): BoundModule<typeof accountGroupsModule> {
        return this.#boundResource('accountGroups') as unknown as BoundModule<typeof accountGroupsModule>;
    }

    get accountingCodes(): BoundModule<typeof accountingCodesModule> {
        return this.#boundResource('accountingCodes') as unknown as BoundModule<typeof accountingCodesModule>;
    }

    get actionScripts(): BoundModule<typeof actionScriptsModule> {
        return this.#boundResource('actionScripts') as unknown as BoundModule<typeof actionScriptsModule>;
    }

    get additionalCodes(): BoundModule<typeof additionalCodesModule> {
        return this.#boundResource('additionalCodes') as unknown as BoundModule<typeof additionalCodesModule>;
    }

    get alertResponsibilities(): BoundModule<typeof alertResponsibilitiesModule> {
        return this.#boundResource('alertResponsibilities') as unknown as BoundModule<
            typeof alertResponsibilitiesModule
        >;
    }

    get alertResponsibility(): BoundModule<typeof alertResponsibilityModule> {
        return this.#boundResource('alertResponsibility') as unknown as BoundModule<typeof alertResponsibilityModule>;
    }

    get alerts(): BoundModule<typeof alertsModule> {
        return this.#boundResource('alerts') as unknown as BoundModule<typeof alertsModule>;
    }

    get applications(): BoundModule<typeof applicationsModule> {
        return this.#boundResource('applications') as unknown as BoundModule<typeof applicationsModule>;
    }

    get approvalProfiles(): BoundModule<typeof approvalProfilesModule> {
        return this.#boundResource('approvalProfiles') as unknown as BoundModule<typeof approvalProfilesModule>;
    }

    get approvalUserGroups(): BoundModule<typeof approvalUserGroupsModule> {
        return this.#boundResource('approvalUserGroups') as unknown as BoundModule<typeof approvalUserGroupsModule>;
    }

    get approvals(): BoundModule<typeof approvalsModule> {
        return this.#boundResource('approvals') as unknown as BoundModule<typeof approvalsModule>;
    }

    get attributeAttachments(): BoundModule<typeof attributeAttachmentsModule> {
        return this.#boundResource('attributeAttachments') as unknown as BoundModule<typeof attributeAttachmentsModule>;
    }

    get billingPeriods(): BoundModule<typeof billingPeriodsModule> {
        return this.#boundResource('billingPeriods') as unknown as BoundModule<typeof billingPeriodsModule>;
    }

    get bookings(): BoundModule<typeof bookingsModule> {
        return this.#boundResource('bookings') as unknown as BoundModule<typeof bookingsModule>;
    }

    get chargingPeriods(): BoundModule<typeof chargingPeriodsModule> {
        return this.#boundResource('chargingPeriods') as unknown as BoundModule<typeof chargingPeriodsModule>;
    }

    get communicationProfiles(): BoundModule<typeof communicationProfilesModule> {
        return this.#boundResource('communicationProfiles') as unknown as BoundModule<
            typeof communicationProfilesModule
        >;
    }

    get communications(): BoundModule<typeof communicationsModule> {
        return this.#boundResource('communications') as unknown as BoundModule<typeof communicationsModule>;
    }

    get countries(): BoundModule<typeof countriesModule> {
        return this.#boundResource('countries') as unknown as BoundModule<typeof countriesModule>;
    }

    get creditNoteApplications(): BoundModule<typeof creditNoteApplicationsModule> {
        return this.#boundResource('creditNoteApplications') as unknown as BoundModule<
            typeof creditNoteApplicationsModule
        >;
    }

    get creditNotes(): BoundModule<typeof creditNotesModule> {
        return this.#boundResource('creditNotes') as unknown as BoundModule<typeof creditNotesModule>;
    }

    get customAttributes(): BoundModule<typeof customAttributesModule> {
        return this.#boundResource('customAttributes') as unknown as BoundModule<typeof customAttributesModule>;
    }

    get customComponents(): BoundModule<typeof customComponentsModule> {
        return this.#boundResource('customComponents') as unknown as BoundModule<typeof customComponentsModule>;
    }

    get customEvents(): BoundModule<typeof customEventsModule> {
        return this.#boundResource('customEvents') as unknown as BoundModule<typeof customEventsModule>;
    }

    get customFeatures(): BoundModule<typeof customFeaturesModule> {
        return this.#boundResource('customFeatures') as unknown as BoundModule<typeof customFeaturesModule>;
    }

    get customFields(): BoundModule<typeof customFieldsModule> {
        return this.#boundResource('customFields') as unknown as BoundModule<typeof customFieldsModule>;
    }

    get customForms(): BoundModule<typeof customFormsModule> {
        return this.#boundResource('customForms') as unknown as BoundModule<typeof customFormsModule>;
    }

    get dayOfMonth(): BoundModule<typeof dayOfMonthModule> {
        return this.#boundResource('dayOfMonth') as unknown as BoundModule<typeof dayOfMonthModule>;
    }

    get departments(): BoundModule<typeof departmentsModule> {
        return this.#boundResource('departments') as unknown as BoundModule<typeof departmentsModule>;
    }

    get designations(): BoundModule<typeof designationsModule> {
        return this.#boundResource('designations') as unknown as BoundModule<typeof designationsModule>;
    }

    get documentTemplates(): BoundModule<typeof documentTemplatesModule> {
        return this.#boundResource('documentTemplates') as unknown as BoundModule<typeof documentTemplatesModule>;
    }

    get emailTemplates(): BoundModule<typeof emailTemplatesModule> {
        return this.#boundResource('emailTemplates') as unknown as BoundModule<typeof emailTemplatesModule>;
    }

    get employees(): BoundModule<typeof employeesModule> {
        return this.#boundResource('employees') as unknown as BoundModule<typeof employeesModule>;
    }

    get events(): BoundModule<typeof eventsModule> {
        return this.#boundResource('events') as unknown as BoundModule<typeof eventsModule>;
    }

    get express(): BoundModule<typeof expressModule> {
        return this.#boundResource('express') as unknown as BoundModule<typeof expressModule>;
    }

    get externalDatabases(): BoundModule<typeof externalDatabasesModule> {
        return this.#boundResource('externalDatabases') as unknown as BoundModule<typeof externalDatabasesModule>;
    }

    get fulfillmentProfiles(): BoundModule<typeof fulfillmentProfilesModule> {
        return this.#boundResource('fulfillmentProfiles') as unknown as BoundModule<typeof fulfillmentProfilesModule>;
    }

    get fulfillmentTerms(): BoundModule<typeof fulfillmentTermsModule> {
        return this.#boundResource('fulfillmentTerms') as unknown as BoundModule<typeof fulfillmentTermsModule>;
    }

    get giftCertificates(): BoundModule<typeof giftCertificatesModule> {
        return this.#boundResource('giftCertificates') as unknown as BoundModule<typeof giftCertificatesModule>;
    }

    get integrationConnections(): BoundModule<typeof integrationConnectionsModule> {
        return this.#boundResource('integrationConnections') as unknown as BoundModule<
            typeof integrationConnectionsModule
        >;
    }

    get inventoryAdjustments(): BoundModule<typeof inventoryAdjustmentsModule> {
        return this.#boundResource('inventoryAdjustments') as unknown as BoundModule<typeof inventoryAdjustmentsModule>;
    }

    get invoiceTerms(): BoundModule<typeof invoiceTermsModule> {
        return this.#boundResource('invoiceTerms') as unknown as BoundModule<typeof invoiceTermsModule>;
    }

    get itemFulfillments(): BoundModule<typeof itemFulfillmentsModule> {
        return this.#boundResource('itemFulfillments') as unknown as BoundModule<typeof itemFulfillmentsModule>;
    }

    get itemReceipts(): BoundModule<typeof itemReceiptsModule> {
        return this.#boundResource('itemReceipts') as unknown as BoundModule<typeof itemReceiptsModule>;
    }

    get labours(): BoundModule<typeof laboursModule> {
        return this.#boundResource('labours') as unknown as BoundModule<typeof laboursModule>;
    }

    get milestones(): BoundModule<typeof milestonesModule> {
        return this.#boundResource('milestones') as unknown as BoundModule<typeof milestonesModule>;
    }

    get noteAttachments(): BoundModule<typeof noteAttachmentsModule> {
        return this.#boundResource('noteAttachments') as unknown as BoundModule<typeof noteAttachmentsModule>;
    }

    get noteGroups(): BoundModule<typeof noteGroupsModule> {
        return this.#boundResource('noteGroups') as unknown as BoundModule<typeof noteGroupsModule>;
    }

    get orders(): BoundModule<typeof ordersModule> {
        return this.#boundResource('orders') as unknown as BoundModule<typeof ordersModule>;
    }

    get organisation(): BoundModule<typeof organisationModule> {
        return this.#boundResource('organisation') as unknown as BoundModule<typeof organisationModule>;
    }

    get organisations(): BoundModule<typeof organisationsModule> {
        return this.#boundResource('organisations') as unknown as BoundModule<typeof organisationsModule>;
    }

    get payments(): BoundModule<typeof paymentsModule> {
        return this.#boundResource('payments') as unknown as BoundModule<typeof paymentsModule>;
    }

    get portals(): BoundModule<typeof portalsModule> {
        return this.#boundResource('portals') as unknown as BoundModule<typeof portalsModule>;
    }

    get pricingPeriods(): BoundModule<typeof pricingPeriodsModule> {
        return this.#boundResource('pricingPeriods') as unknown as BoundModule<typeof pricingPeriodsModule>;
    }

    get proformaInvoices(): BoundModule<typeof proformaInvoicesModule> {
        return this.#boundResource('proformaInvoices') as unknown as BoundModule<typeof proformaInvoicesModule>;
    }

    get purchaseCreditNoteApplications(): BoundModule<typeof purchaseCreditNoteApplicationsModule> {
        return this.#boundResource('purchaseCreditNoteApplications') as unknown as BoundModule<
            typeof purchaseCreditNoteApplicationsModule
        >;
    }

    get purchaseCreditNotes(): BoundModule<typeof purchaseCreditNotesModule> {
        return this.#boundResource('purchaseCreditNotes') as unknown as BoundModule<typeof purchaseCreditNotesModule>;
    }

    get purchaseExpress(): BoundModule<typeof purchaseExpressModule> {
        return this.#boundResource('purchaseExpress') as unknown as BoundModule<typeof purchaseExpressModule>;
    }

    get purchaseInvoices(): BoundModule<typeof purchaseInvoicesModule> {
        return this.#boundResource('purchaseInvoices') as unknown as BoundModule<typeof purchaseInvoicesModule>;
    }

    get purchaseOrders(): BoundModule<typeof purchaseOrdersModule> {
        return this.#boundResource('purchaseOrders') as unknown as BoundModule<typeof purchaseOrdersModule>;
    }

    get purchasePayments(): BoundModule<typeof purchasePaymentsModule> {
        return this.#boundResource('purchasePayments') as unknown as BoundModule<typeof purchasePaymentsModule>;
    }

    get purchaseRefunds(): BoundModule<typeof purchaseRefundsModule> {
        return this.#boundResource('purchaseRefunds') as unknown as BoundModule<typeof purchaseRefundsModule>;
    }

    get quoteOrders(): BoundModule<typeof quoteOrdersModule> {
        return this.#boundResource('quoteOrders') as unknown as BoundModule<typeof quoteOrdersModule>;
    }

    get receiveTerms(): BoundModule<typeof receiveTermsModule> {
        return this.#boundResource('receiveTerms') as unknown as BoundModule<typeof receiveTermsModule>;
    }

    get reconciliations(): BoundModule<typeof reconciliationsModule> {
        return this.#boundResource('reconciliations') as unknown as BoundModule<typeof reconciliationsModule>;
    }

    get refunds(): BoundModule<typeof refundsModule> {
        return this.#boundResource('refunds') as unknown as BoundModule<typeof refundsModule>;
    }

    get rentalAssets(): BoundModule<typeof rentalAssetsModule> {
        return this.#boundResource('rentalAssets') as unknown as BoundModule<typeof rentalAssetsModule>;
    }

    get reports(): BoundModule<typeof reportsModule> {
        return this.#boundResource('reports') as unknown as BoundModule<typeof reportsModule>;
    }

    get returnMerchandiseAuthorisations(): BoundModule<typeof returnMerchandiseAuthorisationsModule> {
        return this.#boundResource('returnMerchandiseAuthorisations') as unknown as BoundModule<
            typeof returnMerchandiseAuthorisationsModule
        >;
    }

    get returnVendorAuthorizations(): BoundModule<typeof returnVendorAuthorizationsModule> {
        return this.#boundResource('returnVendorAuthorizations') as unknown as BoundModule<
            typeof returnVendorAuthorizationsModule
        >;
    }

    get roles(): BoundModule<typeof rolesModule> {
        return this.#boundResource('roles') as unknown as BoundModule<typeof rolesModule>;
    }

    get salesReps(): BoundModule<typeof salesRepsModule> {
        return this.#boundResource('salesReps') as unknown as BoundModule<typeof salesRepsModule>;
    }

    get salutations(): BoundModule<typeof salutationsModule> {
        return this.#boundResource('salutations') as unknown as BoundModule<typeof salutationsModule>;
    }

    get settings(): BoundModule<typeof settingsModule> {
        return this.#boundResource('settings') as unknown as BoundModule<typeof settingsModule>;
    }

    get settingsWorkflows(): BoundModule<typeof settingsWorkflowsModule> {
        return this.#boundResource('settingsWorkflows') as unknown as BoundModule<typeof settingsWorkflowsModule>;
    }

    get shippingPackages(): BoundModule<typeof shippingPackagesModule> {
        return this.#boundResource('shippingPackages') as unknown as BoundModule<typeof shippingPackagesModule>;
    }

    get shippingRules(): BoundModule<typeof shippingRulesModule> {
        return this.#boundResource('shippingRules') as unknown as BoundModule<typeof shippingRulesModule>;
    }

    get systemEvents(): BoundModule<typeof systemEventsModule> {
        return this.#boundResource('systemEvents') as unknown as BoundModule<typeof systemEventsModule>;
    }

    get tasks(): BoundModule<typeof tasksModule> {
        return this.#boundResource('tasks') as unknown as BoundModule<typeof tasksModule>;
    }

    get teams(): BoundModule<typeof teamsModule> {
        return this.#boundResource('teams') as unknown as BoundModule<typeof teamsModule>;
    }

    get timePeriods(): BoundModule<typeof timePeriodsModule> {
        return this.#boundResource('timePeriods') as unknown as BoundModule<typeof timePeriodsModule>;
    }

    get timesheets(): BoundModule<typeof timesheetsModule> {
        return this.#boundResource('timesheets') as unknown as BoundModule<typeof timesheetsModule>;
    }

    get uom(): BoundModule<typeof uomModule> {
        return this.#boundResource('uom') as unknown as BoundModule<typeof uomModule>;
    }

    get usages(): BoundModule<typeof usagesModule> {
        return this.#boundResource('usages') as unknown as BoundModule<typeof usagesModule>;
    }

    get webhooks(): BoundModule<typeof webhooksModule> {
        return this.#boundResource('webhooks') as unknown as BoundModule<typeof webhooksModule>;
    }

    get workflows(): BoundModule<typeof workflowsModule> {
        return this.#boundResource('workflows') as unknown as BoundModule<typeof workflowsModule>;
    }

    get zones(): BoundModule<typeof zonesModule> {
        return this.#boundResource('zones') as unknown as BoundModule<typeof zonesModule>;
    }

    #boundResource(name: string): BoundResource {
        const cached = this.#resourceCache.get(name);
        if (cached) return cached;
        const bound = new BoundResource(this, resolveResourceModule(name));
        this.#resourceCache.set(name, bound);
        return bound;
    }

    /** Every registered resource name, e.g. `['abaFiles', 'accountEmails']`. */
    listResourceNames(): string[] {
        return registeredResourceNames();
    }

    /** Refuse a request on a closed client, named so a process holding several says which. */
    #refuseWhenClosed(): void {
        if (!this.#closed) return;
        throw new SdkUsageError(
            `client ${JSON.stringify(this.#config.clientName)} is closed: closeClient() latched it shut, ` +
                'so it cannot send this request - build a new client with buildClient() rather than reusing a closed one',
        );
    }

    /** The form `data` will present: the per-call value if given, else the client's. */
    #resolveResponseFormat(perCall: unknown): ResponseFormat {
        if (perCall == null) return this.#config.responseFormat;
        if (
            typeof perCall !== 'string' ||
            !(VALID_RESPONSE_FORMATS as readonly string[]).includes(perCall.trim().toLowerCase())
        ) {
            throw new SdkUsageError(
                `responseFormat: expected one of ${VALID_RESPONSE_FORMATS.join(', ')}, got ${JSON.stringify(perCall)}`,
            );
        }
        return perCall.trim().toLowerCase() as ResponseFormat;
    }

    /** Fill `{api_version}` from the config when the caller did not name it. */
    #seedApiVersion(p: string, pathParams: Record<string, unknown> | undefined): Record<string, unknown> {
        const resolved: Record<string, unknown> = {...(pathParams || {})};
        if (findPathParamNames(p).includes(API_VERSION_PARAM) && !(API_VERSION_PARAM in resolved)) {
            resolved[API_VERSION_PARAM] = this.#config.apiVersion;
        }
        return resolved;
    }

    /**
     * Add a v4 idempotency key to a `POST` that carries none, once per call, so a retry and the 401 replay
     * collapse into the first attempt. A caller's own key, in any spelling, wins.
     */
    #withIdempotencyKey(
        method: string,
        headers: Readonly<Record<string, string | null>>,
    ): Readonly<Record<string, string | null>> {
        if (!IDEMPOTENCY_KEY_METHODS.has(method)) return headers;
        const lowered = IDEMPOTENCY_HEADER.toLowerCase();
        if (Object.keys(headers).some((key) => key.toLowerCase() === lowered)) return headers;
        return Object.freeze({...headers, [IDEMPOTENCY_HEADER]: randomUUID()});
    }

    /** Refuse a per-call header the wire cannot carry, before the token grant. */
    #refuseUnsendableHeaders(headers: Readonly<Record<string, string | null>>): void {
        for (const [name, value] of Object.entries(headers)) {
            const unsendable = unsendableHeaderReason(name, value);
            if (unsendable !== null) throw new SdkUsageError(unsendable);
        }
    }

    /**
     * Merge SDK, `defaultHeaders` and per-call headers, last wins, case-insensitive. A per-call `Authorization` is
     * dropped; the per-call headers have already passed `#refuseUnsendableHeaders`.
     */
    #buildRequestHeaders(headers: Readonly<Record<string, string | null>>): Record<string, string> {
        const merged = new Map<string, [string, string]>();
        const own: Record<string, string> = {Accept: 'application/json', 'User-Agent': this.#config.userAgent};
        const setPair = (name: string, value: string): void => {
            merged.set(name.toLowerCase(), [name, value]);
        };
        for (const [name, value] of Object.entries(own)) setPair(name, value);
        for (const [name, value] of Object.entries(this.#config.defaultHeadersDict)) setPair(name, value);
        for (const [name, valueText] of Object.entries(headers)) {
            if (name.toLowerCase() === 'authorization') continue;
            setPair(name, valueText as string);
        }

        // Prototype-less: a literal would answer a function for a lower-cased `'constructor'`.
        const canonical = Object.assign(Object.create(null) as Record<string, string>, {
            authorization: 'Authorization',
            accept: 'Accept',
            'user-agent': 'User-Agent',
        });
        const out = Object.create(null) as Record<string, string>;
        for (const [lower, [name, value]] of merged) {
            out[canonical[lower] || name] = value;
        }
        return Object.setPrototypeOf(out, Object.prototype) as Record<string, string>;
    }

    /** Refuse two payloads or a body JSON cannot carry, then serialise once, so the text validated is the text sent. */
    #materialiseJsonBody(jsonBody: unknown, formData: unknown, files: unknown): string | null {
        if (jsonBody != null && formData != null) {
            throw new SdkUsageError(
                'pass jsonBody or formData, not both - they are different content types and only one can be sent',
            );
        }
        if (jsonBody != null && files != null) {
            throw new SdkUsageError(
                'pass jsonBody or files, not both - a multipart body replaces the JSON one, so the JSON would be discarded unsent',
            );
        }
        if (jsonBody == null) return null;
        if (typeof jsonBody === 'string') {
            checkJsonBodyText(jsonBody);
            return jsonBody;
        }
        if (typeof jsonBody !== 'object') {
            throw new SdkUsageError(`jsonBody must be an object, an array or a JSON string, got ${typeof jsonBody}`);
        }
        let text: string | undefined;
        try {
            text = JSON.stringify(jsonBody);
        } catch (error) {
            throw new SdkUsageError(
                `jsonBody is not JSON-serialisable: ${error instanceof Error ? error.message : String(error)}`,
            );
        }
        if (typeof text !== 'string') {
            // `JSON.stringify` gives undefined for a value with no JSON form, which would send `undefined`.
            throw new SdkUsageError(
                'jsonBody has no JSON form: it serialised to nothing at all, so there would be no body to send',
            );
        }
        return text;
    }

    /** Release this client's claim on the shared log-file handler. */
    #detachLogFile(): void {
        detachLogFile(this.#logFile);
        this.#logFile = null;
    }

    #reportProgress(message: string): void {
        this.#log(LOG_LEVELS.INFO, message);
    }

    #log(level: number, message: string): void {
        if (level < this.#logLevel) return;
        // Frozen: every sink reads this one object, so one subscriber's edit would change what the others see.
        const record = Object.freeze({
            loggerName: this.#loggerName,
            clientName: this.#config.clientName,
            level,
            levelName: levelName(level),
            message,
            timestamp: new Date(),
        });
        writeLogFileRecord(this.#logFile, record);
        emitLogRecord(record);
    }

    /** Print the exchange if the `print*` flags ask for it, and log one line either way. */
    #reportExchange(
        response: RenderableExchange,
        body: unknown,
        files: unknown,
        level: number,
        formEncoded: boolean,
    ): void {
        const config = this.#config;
        const wantsPrint =
            config.printApiInfo ||
            config.printRequestPayload ||
            config.printResponseBody ||
            config.printHeaders ||
            config.printCurl;
        if (wantsPrint && !(config.printOnlyOnError && response.succeeded)) {
            console.log(renderExchange(response, body, files, config, {formEncoded}));
        }
        const info = response.requestInfo;
        if (info) {
            this.#log(
                level,
                `${info.httpMethod} ${info.endpoint ?? ''} -> ${response.statusCode} in ${info.elapsedSeconds}s (attempt ${info.attemptCount}/${info.maxAttempts})`,
            );
        }
        if (config.logBodies) {
            this.#log(
                LOG_LEVELS.DEBUG,
                `payload=${renderJsonValue(redactValue(body), {compact: true})} response=${renderJsonValue(redactValue(response.map), {compact: true})}`,
            );
        }
    }
}

/** `buildClient`'s options: any `SdkConfig` setting, plus `credentials` to bypass the registration. */
export type BuildClientOptions = SdkOptions & {credentials?: Iterable<CredentialsBlock> | undefined};

/** Build a client for one instance: a position, a `clientName`, or null for the first registered. */
export async function buildClient(
    instance: number | string | null = null,
    options: BuildClientOptions = {},
): Promise<ExsitedClient> {
    const {credentials, ...overrides} = options;
    const blocks = credentials === undefined ? getRegisteredInstances() : credentials;
    return new ExsitedClient(SdkConfig.fromCredentials(blocks, {instance, ...overrides}));
}

function buildTokenStore(config: SdkConfig): TokenStore {
    const path = config.auth.tokenCachePath;
    if (path === null) return new MemoryTokenStore();
    return new FileTokenStore(path ?? buildDefaultTokenCachePath());
}

function loggerSafe(clientName: string): string {
    return encodeURIComponent(clientName).replace(/\./g, '%2E');
}

/**
 * Whether a `401` means a stale access token rather than a business rejection such as
 * `{"message": "Invalid Current Credential"}`. A body that is not JSON says nothing about the token, so it is
 * read as stale only for a method on the {@link SAFE_METHODS} allow-list, never for a write a proxy may have
 * forwarded.
 */
export function meansExpiredToken(body: unknown, method: string): boolean {
    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
        return SAFE_METHODS.has(String(method).trim().toUpperCase());
    }
    const record = body as Record<string, unknown>;
    return TOKEN_FAILURE_KEYS.some((key) => namesATokenFailure(record[key]));
}

/** Whether one string field of a `401` body names a dead token, as its whole value or one of its words. */
function namesATokenFailure(value: unknown): boolean {
    if (typeof value !== 'string') return false;
    const text = value.trim().toLowerCase();
    if (text === '') return false;
    if (TOKEN_FAILURE_MARKERS.has(text)) return true;
    return text.split(/\s+/).some((word) => TOKEN_FAILURE_MARKERS.has(word));
}
