/** Path templates and body keys for the custom component endpoints. */

export const COMPONENT = '/api/{api_version}/component';
export const COMPONENT_BY_UUID = '/api/{api_version}/component/{component_uuid}';
export const COMPONENT_BY_ID = '/api/{api_version}/component/{component_uuid}/{component_object_id}';
export const COMPONENT_OBJECTS = '/api/{api_version}/components/{component_uuid}/objects';
export const COMPONENT_OBJECT = '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}';
export const COMPONENT_OBJECT_ACTIVITY =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity';
export const COMPONENT_OBJECT_CUSTOM_OBJECTS =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects';
export const COMPONENT_OBJECT_PDF = '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/pdf';
export const COMPONENT_OBJECT_ACTIVITY_ENTRY =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity/{activity_id}';
export const COMPONENT_OBJECT_MILESTONES =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/milestones';
export const COMPONENT_OBJECT_MILESTONE =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/milestones/{milestone_id}';
export const COMPONENT_OBJECT_HISTORY =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/history';
export const COMPONENT_OBJECT_HISTORY_ENTRY =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/history/{history_id}';
export const COMPONENT_OBJECT_NOTES =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes';
export const COMPONENT_OBJECT_NOTE =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}';
export const COMPONENT_OBJECT_NOTE_FILES =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files';
export const COMPONENT_OBJECT_NOTE_FILE =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files/{file_id}';
export const COMPONENT_OBJECT_CUSTOM_OBJECT =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}';
export const COMPONENT_OBJECT_CUSTOM_OBJECT_INSTANCE =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects/{custom_object_id}/instances/{instance_id}';
export const COMPONENT_OBJECT_LINK_DOMAINS =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/link_domains';
export const COMPONENT_OBJECT_UNLINK_DOMAINS =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/unlink_domains';
export const COMPONENT_OBJECT_CHANGE_STATUS =
    '/api/{api_version}/components/{component_uuid}/objects/{component_object_id}/change_status';

/** The key a listing's records sit under. */
export const COMPONENT_LISTING_KEY = 'data';
export const COMPONENT_OBJECTS_KEY = 'data';
export const COMPONENT_OBJECT_ACTIVITY_KEY = 'data';
export const COMPONENT_OBJECT_CUSTOM_OBJECTS_KEY = 'data';
export const COMPONENT_OBJECT_NOTES_KEY = 'data';
export const COMPONENT_OBJECT_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const ACC_CUS_COMP_KEY = 'Acc Cus Comp';
export const COMPONENT_KEY = 'component';
export const CUSTOM_COMPONENT_OBJECT_KEY = 'custom_component_object';
export const CUSTOM_COMPONENT_OBJECT_ACTIVITY_KEY = 'custom_component_object_activity';
export const NOTE_KEY = 'note';
export const FILE_KEY = 'file';

/**
 * The body a custom object instance create sends, a plural key over one instance, and the singular one the update sends
 * and both answer under.
 */
export const CUSTOM_OBJECT_INSTANCES_KEY = 'custom_object_instances';
export const CUSTOM_OBJECT_INSTANCE_KEY = 'custom_object_instance';
