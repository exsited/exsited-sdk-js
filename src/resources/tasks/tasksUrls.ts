/** Path templates and body keys for the task endpoints. */

export const TASKS = '/api/{api_version}/tasks';
export const TASK = '/api/{api_version}/tasks/{task_id}';
export const TASK_CHECKLIST = '/api/{api_version}/tasks/{task_id}/checklist';
export const TASK_NOTES = '/api/{api_version}/tasks/{task_code}/notes';
export const TASK_CHECKLIST_BY_UUID = '/api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}';
export const TASK_NOTE = '/api/{api_version}/tasks/{task_code}/notes/{note_id}';
export const TASK_NOTE_FILES = '/api/{api_version}/tasks/{task_code}/notes/{note_id}/files';
export const TASK_NOTE_FILE = '/api/{api_version}/tasks/{task_code}/notes/{note_id}/files/{file_id}';

/** The key a listing's records sit under. */
export const TASKS_KEY = 'data';
export const TASK_NOTES_KEY = 'data';
export const TASK_NOTE_FILES_KEY = 'data';

/** The envelope one record arrives under. */
export const WORK_TASK_KEY = 'work_task';
export const NOTE_KEY = 'note';
export const FILE_KEY = 'file';
