/** Path templates and body keys for the gift certificate endpoints. */

export const GIFT_CERTIFICATES = '/api/{api_version}/gift_certificates';
export const GIFT_CERTIFICATE = '/api/{api_version}/gift_certificates/{gc_id}';
export const GIFT_CERTIFICATE_ALLOCATIONS = '/api/{api_version}/gift_certificates/{gc_id}/allocations';
export const GIFT_CERTIFICATE_TRANSACTIONS = '/api/{api_version}/gift_certificates/{gc_id}/transactions';
export const GIFT_CERTIFICATE_ALLOCATION = '/api/{api_version}/gift_certificates/{gc_id}/allocations/{allocation_id}';
export const GIFT_CERTIFICATE_TRANSACTION =
    '/api/{api_version}/gift_certificates/{gc_id}/transactions/{transaction_id}';
export const GIFT_CERTIFICATE_AMEND = '/api/{api_version}/gift_certificates/{gc_id}/amend';
export const GIFT_CERTIFICATE_DEALLOCATIONS = '/api/{api_version}/gift_certificates/{gc_id}/deallocations';

/** The key a listing's records sit under. */
export const GIFT_CERTIFICATES_KEY = 'data';
export const GIFT_CERTIFICATE_ALLOCATIONS_KEY = 'data';
export const GIFT_CERTIFICATE_TRANSACTIONS_KEY = 'data';

/** The envelope one record arrives under. */
export const GIFT_CERTIFICATE_KEY = 'gift_certificate';
export const GIFT_CERTIFICATE_ALLOCATION_KEY = 'gift_certificate_allocation';
export const GIFT_CERTIFICATE_TRANSACTION_KEY = 'gift_certificate_transaction';

/** The one key `amendGiftCertificate` takes under `gift_certificate`. */
export const GIFT_CERTIFICATE_AMEND_KEYS = Object.freeze(['new_balance']);

/**
 * The one key the allocation writes take under `gift_certificate`: `account`, as `{"code": <account id>}` or `{"id":
 * "acc_<uuid>"}`.
 */
export const GIFT_CERTIFICATE_ALLOCATE_KEYS = Object.freeze(['account']);
