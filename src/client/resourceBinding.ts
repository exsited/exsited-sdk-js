/** Reaching an endpoint module as `client.<resource>`: a name-to-module registry plus `BoundResource`. */

import {SdkAttributeError, SdkUsageError} from '../errors.js';
import * as accounts from '../resources/accounts/accounts.js';
import * as items from '../resources/items/items.js';
import * as invoices from '../resources/invoices/invoices.js';
import * as abaFiles from '../resources/abaFiles/abaFiles.js';
import * as accountEmails from '../resources/accountEmails/accountEmails.js';
import * as accountGroups from '../resources/accountGroups/accountGroups.js';
import * as accountingCodes from '../resources/accountingCodes/accountingCodes.js';
import * as actionScripts from '../resources/actionScripts/actionScripts.js';
import * as additionalCodes from '../resources/additionalCodes/additionalCodes.js';
import * as alertResponsibilities from '../resources/alertResponsibilities/alertResponsibilities.js';
import * as alertResponsibility from '../resources/alertResponsibility/alertResponsibility.js';
import * as alerts from '../resources/alerts/alerts.js';
import * as applications from '../resources/applications/applications.js';
import * as approvalProfiles from '../resources/approvalProfiles/approvalProfiles.js';
import * as approvalUserGroups from '../resources/approvalUserGroups/approvalUserGroups.js';
import * as approvals from '../resources/approvals/approvals.js';
import * as attributeAttachments from '../resources/attributeAttachments/attributeAttachments.js';
import * as billingPeriods from '../resources/billingPeriods/billingPeriods.js';
import * as bookings from '../resources/bookings/bookings.js';
import * as chargingPeriods from '../resources/chargingPeriods/chargingPeriods.js';
import * as communicationProfiles from '../resources/communicationProfiles/communicationProfiles.js';
import * as communications from '../resources/communications/communications.js';
import * as countries from '../resources/countries/countries.js';
import * as creditNoteApplications from '../resources/creditNoteApplications/creditNoteApplications.js';
import * as creditNotes from '../resources/creditNotes/creditNotes.js';
import * as customAttributes from '../resources/customAttributes/customAttributes.js';
import * as customComponents from '../resources/customComponents/customComponents.js';
import * as customEvents from '../resources/customEvents/customEvents.js';
import * as customFeatures from '../resources/customFeatures/customFeatures.js';
import * as customFields from '../resources/customFields/customFields.js';
import * as customForms from '../resources/customForms/customForms.js';
import * as dayOfMonth from '../resources/dayOfMonth/dayOfMonth.js';
import * as departments from '../resources/departments/departments.js';
import * as designations from '../resources/designations/designations.js';
import * as documentTemplates from '../resources/documentTemplates/documentTemplates.js';
import * as emailTemplates from '../resources/emailTemplates/emailTemplates.js';
import * as employees from '../resources/employees/employees.js';
import * as events from '../resources/events/events.js';
import * as express from '../resources/express/express.js';
import * as externalDatabases from '../resources/externalDatabases/externalDatabases.js';
import * as fulfillmentProfiles from '../resources/fulfillmentProfiles/fulfillmentProfiles.js';
import * as fulfillmentTerms from '../resources/fulfillmentTerms/fulfillmentTerms.js';
import * as giftCertificates from '../resources/giftCertificates/giftCertificates.js';
import * as integrationConnections from '../resources/integrationConnections/integrationConnections.js';
import * as inventoryAdjustments from '../resources/inventoryAdjustments/inventoryAdjustments.js';
import * as invoiceTerms from '../resources/invoiceTerms/invoiceTerms.js';
import * as itemFulfillments from '../resources/itemFulfillments/itemFulfillments.js';
import * as itemReceipts from '../resources/itemReceipts/itemReceipts.js';
import * as labours from '../resources/labours/labours.js';
import * as milestones from '../resources/milestones/milestones.js';
import * as noteAttachments from '../resources/noteAttachments/noteAttachments.js';
import * as noteGroups from '../resources/noteGroups/noteGroups.js';
import * as orders from '../resources/orders/orders.js';
import * as organisation from '../resources/organisation/organisation.js';
import * as organisations from '../resources/organisations/organisations.js';
import * as payments from '../resources/payments/payments.js';
import * as portals from '../resources/portals/portals.js';
import * as pricingPeriods from '../resources/pricingPeriods/pricingPeriods.js';
import * as proformaInvoices from '../resources/proformaInvoices/proformaInvoices.js';
import * as purchaseCreditNoteApplications from '../resources/purchaseCreditNoteApplications/purchaseCreditNoteApplications.js';
import * as purchaseCreditNotes from '../resources/purchaseCreditNotes/purchaseCreditNotes.js';
import * as purchaseExpress from '../resources/purchaseExpress/purchaseExpress.js';
import * as purchaseInvoices from '../resources/purchaseInvoices/purchaseInvoices.js';
import * as purchaseOrders from '../resources/purchaseOrders/purchaseOrders.js';
import * as purchasePayments from '../resources/purchasePayments/purchasePayments.js';
import * as purchaseRefunds from '../resources/purchaseRefunds/purchaseRefunds.js';
import * as quoteOrders from '../resources/quoteOrders/quoteOrders.js';
import * as receiveTerms from '../resources/receiveTerms/receiveTerms.js';
import * as reconciliations from '../resources/reconciliations/reconciliations.js';
import * as refunds from '../resources/refunds/refunds.js';
import * as rentalAssets from '../resources/rentalAssets/rentalAssets.js';
import * as reports from '../resources/reports/reports.js';
import * as returnMerchandiseAuthorisations from '../resources/returnMerchandiseAuthorisations/returnMerchandiseAuthorisations.js';
import * as returnVendorAuthorizations from '../resources/returnVendorAuthorizations/returnVendorAuthorizations.js';
import * as roles from '../resources/roles/roles.js';
import * as salesReps from '../resources/salesReps/salesReps.js';
import * as salutations from '../resources/salutations/salutations.js';
import * as settings from '../resources/settings/settings.js';
import * as settingsWorkflows from '../resources/settingsWorkflows/settingsWorkflows.js';
import * as shippingPackages from '../resources/shippingPackages/shippingPackages.js';
import * as shippingRules from '../resources/shippingRules/shippingRules.js';
import * as systemEvents from '../resources/systemEvents/systemEvents.js';
import * as tasks from '../resources/tasks/tasks.js';
import * as teams from '../resources/teams/teams.js';
import * as timePeriods from '../resources/timePeriods/timePeriods.js';
import * as timesheets from '../resources/timesheets/timesheets.js';
import * as uom from '../resources/uom/uom.js';
import * as usages from '../resources/usages/usages.js';
import * as webhooks from '../resources/webhooks/webhooks.js';
import * as workflows from '../resources/workflows/workflows.js';
import * as zones from '../resources/zones/zones.js';

/** Name to module, seeded here rather than in the barrel, which a subpath import never evaluates. */
const RESOURCE_MODULES = new Map<string, object>([
    ['accounts', accounts],
    ['items', items],
    ['invoices', invoices],
    ['abaFiles', abaFiles],
    ['accountEmails', accountEmails],
    ['accountGroups', accountGroups],
    ['accountingCodes', accountingCodes],
    ['actionScripts', actionScripts],
    ['additionalCodes', additionalCodes],
    ['alertResponsibilities', alertResponsibilities],
    ['alertResponsibility', alertResponsibility],
    ['alerts', alerts],
    ['applications', applications],
    ['approvalProfiles', approvalProfiles],
    ['approvalUserGroups', approvalUserGroups],
    ['approvals', approvals],
    ['attributeAttachments', attributeAttachments],
    ['billingPeriods', billingPeriods],
    ['bookings', bookings],
    ['chargingPeriods', chargingPeriods],
    ['communicationProfiles', communicationProfiles],
    ['communications', communications],
    ['countries', countries],
    ['creditNoteApplications', creditNoteApplications],
    ['creditNotes', creditNotes],
    ['customAttributes', customAttributes],
    ['customComponents', customComponents],
    ['customEvents', customEvents],
    ['customFeatures', customFeatures],
    ['customFields', customFields],
    ['customForms', customForms],
    ['dayOfMonth', dayOfMonth],
    ['departments', departments],
    ['designations', designations],
    ['documentTemplates', documentTemplates],
    ['emailTemplates', emailTemplates],
    ['employees', employees],
    ['events', events],
    ['express', express],
    ['externalDatabases', externalDatabases],
    ['fulfillmentProfiles', fulfillmentProfiles],
    ['fulfillmentTerms', fulfillmentTerms],
    ['giftCertificates', giftCertificates],
    ['integrationConnections', integrationConnections],
    ['inventoryAdjustments', inventoryAdjustments],
    ['invoiceTerms', invoiceTerms],
    ['itemFulfillments', itemFulfillments],
    ['itemReceipts', itemReceipts],
    ['labours', labours],
    ['milestones', milestones],
    ['noteAttachments', noteAttachments],
    ['noteGroups', noteGroups],
    ['orders', orders],
    ['organisation', organisation],
    ['organisations', organisations],
    ['payments', payments],
    ['portals', portals],
    ['pricingPeriods', pricingPeriods],
    ['proformaInvoices', proformaInvoices],
    ['purchaseCreditNoteApplications', purchaseCreditNoteApplications],
    ['purchaseCreditNotes', purchaseCreditNotes],
    ['purchaseExpress', purchaseExpress],
    ['purchaseInvoices', purchaseInvoices],
    ['purchaseOrders', purchaseOrders],
    ['purchasePayments', purchasePayments],
    ['purchaseRefunds', purchaseRefunds],
    ['quoteOrders', quoteOrders],
    ['receiveTerms', receiveTerms],
    ['reconciliations', reconciliations],
    ['refunds', refunds],
    ['rentalAssets', rentalAssets],
    ['reports', reports],
    ['returnMerchandiseAuthorisations', returnMerchandiseAuthorisations],
    ['returnVendorAuthorizations', returnVendorAuthorizations],
    ['roles', roles],
    ['salesReps', salesReps],
    ['salutations', salutations],
    ['settings', settings],
    ['settingsWorkflows', settingsWorkflows],
    ['shippingPackages', shippingPackages],
    ['shippingRules', shippingRules],
    ['systemEvents', systemEvents],
    ['tasks', tasks],
    ['teams', teams],
    ['timePeriods', timePeriods],
    ['timesheets', timesheets],
    ['uom', uom],
    ['usages', usages],
    ['webhooks', webhooks],
    ['workflows', workflows],
    ['zones', zones],
] as Array<[string, object]>);

const JS_KEYWORDS = new Set([
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield',
    'let',
    'static',
    'enum',
    'await',
    'null',
    'true',
    'false',
]);

/** Names an `ExsitedClient` already answers, which a resource must not shadow. */
const RESERVED_CLIENT_NAMES = new Set([
    'config',
    'name',
    'sendApiRequest',
    'sendGetRequest',
    'sendPostRequest',
    'sendPutRequest',
    'sendPatchRequest',
    'sendDeleteRequest',
    'closeClient',
    'listResourceNames',
    'constructor',
    'then',
    'toString',
    'inspect',
]);

// A JavaScript identifier, so the name survives access as `client.<name>`.
const IDENTIFIER_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** Make a resource module reachable as `client.<resourceName>`, with the client pre-applied. */
export function registerResourceModule(resourceName: string, module: object): void {
    if (
        typeof resourceName !== 'string' ||
        resourceName.startsWith('_') ||
        !IDENTIFIER_PATTERN.test(resourceName) ||
        JS_KEYWORDS.has(resourceName)
    ) {
        throw new SdkUsageError(
            `cannot register resource ${JSON.stringify(resourceName)}: a resource name must be an identifier that is not a ` +
                'keyword and does not start with an underscore - pick another name',
        );
    }
    if (RESERVED_CLIENT_NAMES.has(resourceName)) {
        throw new SdkUsageError(
            `cannot register resource ${JSON.stringify(resourceName)}: ExsitedClient already has an attribute of that ` +
                'name, and it would win every lookup - pick another name',
        );
    }
    const registered = RESOURCE_MODULES.get(resourceName);
    if (registered !== undefined && registered !== module) {
        throw new SdkUsageError(
            `cannot register resource ${JSON.stringify(resourceName)} against a different module: it is already registered, ` +
                'and clients built before the change would keep the old one - pick another name',
        );
    }
    if (!module || (typeof module !== 'object' && typeof module !== 'function')) {
        throw new SdkUsageError(
            `cannot register resource ${JSON.stringify(resourceName)}: the module is not importable`,
        );
    }
    RESOURCE_MODULES.set(resourceName, module);
}

/** Every registered resource name, sorted, e.g. `['abaFiles', 'accountEmails']`. */
export function registeredResourceNames(): string[] {
    return [...RESOURCE_MODULES.keys()].sort();
}

/** The module registered under a name, or `SdkAttributeError` listing the available ones. */
export function resolveResourceModule(resourceName: string): object {
    const module = RESOURCE_MODULES.get(resourceName);
    if (module === undefined) {
        const available = registeredResourceNames().join(', ') || 'none registered yet';
        throw new SdkAttributeError(`no resource ${JSON.stringify(resourceName)}; available: ${available}`);
    }
    return module;
}

/** The endpoints a module exposes: its `ENDPOINTS` array if it has one, else every exported function. */
function publicFunctionNames(module: object): string[] {
    const record = module as Record<string, unknown>;
    const declared = record['ENDPOINTS'];
    if (Array.isArray(declared)) return declared.map((entry) => String(entry)).sort();
    return Object.keys(record)
        .filter((key) => !key.startsWith('_') && key !== 'default' && typeof record[key] === 'function')
        .sort();
}

/** The nearest name for a "did you mean", or null when nothing is close. */
function closestMatch(name: string, candidates: string[]): string | null {
    let best: string | null = null;
    let bestDistance = Infinity;
    for (const candidate of candidates) {
        const distance = levenshtein(name, candidate);
        if (distance < bestDistance) {
            bestDistance = distance;
            best = candidate;
        }
    }
    // Past ~40% of the longer name a suggestion is a red herring, not a hint.
    return best !== null && bestDistance <= Math.ceil(Math.max(name.length, best.length) * 0.4) ? best : null;
}

/** Edit distance between two names, only to rank suggestions. */
function levenshtein(a: string, b: string): number {
    let previous = Array.from({length: b.length + 1}, (_, j) => j);
    for (let i = 1; i <= a.length; i += 1) {
        const row = [i];
        for (let j = 1; j <= b.length; j += 1) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            row[j] = Math.min(
                (previous[j] as number) + 1,
                (row[j - 1] as number) + 1,
                (previous[j - 1] as number) + cost,
            );
        }
        previous = row;
    }
    return previous[b.length] as number;
}

/** A `Proxy` where `new BoundResource(client, module).fn(x)` calls `module.fn(client, x)`. */
export class BoundResource {
    readonly _client: unknown;
    readonly _module: object;

    constructor(client: unknown, module: object) {
        this._client = client;
        this._module = module;
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (typeof prop === 'symbol' || prop.startsWith('_') || prop === 'then') {
                    return Reflect.get(target, prop, receiver);
                }
                const available = publicFunctionNames(module);
                if (!available.includes(prop)) {
                    const suggestion = closestMatch(prop, available);
                    const hint = suggestion ? `; did you mean ${suggestion}?` : '';
                    throw new SdkAttributeError(`resource has no ${JSON.stringify(prop)}${hint}`);
                }
                const fn = (module as Record<string, unknown>)[prop];
                if (typeof fn !== 'function') {
                    throw new SdkAttributeError(
                        `resource lists ${JSON.stringify(prop)} but it is not callable, so it is not an endpoint`,
                    );
                }
                return (...args: unknown[]) => (fn as (...all: unknown[]) => unknown)(client, ...args);
            },
        });
    }

    [Symbol.for('nodejs.util.inspect.custom')](): string {
        return `BoundResource(${publicFunctionNames(this._module).join(', ')})`;
    }
}
