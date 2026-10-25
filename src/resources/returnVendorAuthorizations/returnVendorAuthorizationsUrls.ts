/** Path templates and body keys for the return vendor authorization endpoints. */

export const RETURN_VENDOR_AUTHORIZATIONS = '/api/{api_version}/return_vendor_authorizations';
export const RETURN_VENDOR_AUTHORIZATION = '/api/{api_version}/return_vendor_authorizations/{rva_id}';

/** No route lists or creates an RVA's notes, so these two can only remove one known already. */
export const RETURN_VENDOR_AUTHORIZATION_NOTE =
    '/api/{api_version}/return_vendor_authorizations/{rva_id}/notes/{note_id}';
export const RETURN_VENDOR_AUTHORIZATION_NOTE_FILE =
    '/api/{api_version}/return_vendor_authorizations/{rva_id}/notes/{note_id}/files/{file_id}';

/** The key a listing's records sit under. */
export const RETURN_VENDOR_AUTHORIZATIONS_KEY = 'data';

/** The envelope one record arrives under. */
export const RETURN_VENDOR_AUTHORIZATION_KEY = 'return_vendor_authorization';
