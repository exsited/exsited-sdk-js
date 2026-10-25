/** Path templates and body keys for the approval endpoints. */

export const APPROVALS_ACCOUNT = '/api/{api_version}/approvals/account';
export const APPROVALS_SALEORDER = '/api/{api_version}/approvals/saleOrder';
export const APPROVALS_ACCOUNT_BY_UUID = '/api/{api_version}/approvals/account/{account_uuid}';
export const APPROVALS_APPROVE = '/api/{api_version}/approvals/approve';
export const APPROVALS_REJECT = '/api/{api_version}/approvals/reject';

/** The key a listing's records sit under. */
export const APPROVALS_ACCOUNT_KEY = 'data';
export const APPROVALS_SALEORDER_KEY = 'data';

/** The envelope one record arrives under. */
export const APPROVAL_KEY = 'approval';
