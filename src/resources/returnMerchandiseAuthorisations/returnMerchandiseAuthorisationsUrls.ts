/** Path templates and body keys for the return merchandise authorisation endpoints. */

export const RETURN_MERCHANDISE_AUTHORISATIONS = '/api/{api_version}/return_merchandise_authorisations';
export const RETURN_MERCHANDISE_AUTHORISATION = '/api/{api_version}/return_merchandise_authorisations/{rma_id}';
export const INVOICE_RETURN_MERCHANDISE_AUTHORISATION_RECEIVE =
    '/api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive';
export const INVOICE_RETURN_MERCHANDISE_AUTHORISATION_RECEIVE_BY_UUID =
    '/api/{api_version}/invoices/{invoice_id}/return_merchandise_authorisations/{rma_code}/receive/{receive_uuid}';
export const RETURN_MERCHANDISE_AUTHORISATION_APPROVE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_id}/approve';
export const RETURN_MERCHANDISE_AUTHORISATION_REJECT =
    '/api/{api_version}/return_merchandise_authorisations/{rma_id}/reject';
export const RETURN_MERCHANDISE_AUTHORISATION_RECEIVE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_id}/receive';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTES =
    '/api/{api_version}/return_merchandise_authorisations/{rma_id}/notes';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_id}/notes/{note_id}';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTE_FILE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_id}/notes/{note_id}/files/{file_id}';
export const RETURN_MERCHANDISE_AUTHORISATION_RECEIVE_BY_CODE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_code}/receive';
export const RETURN_MERCHANDISE_AUTHORISATION_RECEIVE_BY_UUID =
    '/api/{api_version}/return_merchandise_authorisations/{rma_code}/receive/{receive_uuid}';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTES_BY_CODE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_code}/notes';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTE_BY_CODE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTE_FILES_BY_CODE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}/files';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTE_FILE_BY_CODE =
    '/api/{api_version}/return_merchandise_authorisations/{rma_code}/notes/{note_id}/files/{file_id}';

/** The key a listing's records sit under. */
export const INVOICE_RETURN_MERCHANDISE_AUTHORISATION_RECEIVE_KEY = 'receive_return_merchandise_authorisations';
export const RETURN_MERCHANDISE_AUTHORISATIONS_KEY = 'data';
export const RETURN_MERCHANDISE_AUTHORISATION_RECEIVE_BY_CODE_KEY = 'data';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTES_BY_CODE_KEY = 'data';
export const RETURN_MERCHANDISE_AUTHORISATION_NOTE_FILES_BY_CODE_KEY = 'data';

/** The envelope one record arrives under. */
export const INVOICE_KEY = 'invoice';
export const RECEIVE_RETURN_MERCHANDISE_AUTHORISATION_KEY = 'receive_return_merchandise_authorisation';
export const RETURN_MERCHANDISE_AUTHORISATION_KEY = 'return_merchandise_authorisation';
export const RECEIVE_RMA_KEY = 'receive_rma';
export const NOTE_KEY = 'note';
export const FILE_KEY = 'file';
