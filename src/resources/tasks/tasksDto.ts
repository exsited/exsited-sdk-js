/** Typed views over the v4 tasks bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** One entry of `checklist` on {@link TaskChecklist}. */
export class Checklist extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        name: 'string',
        displayName: 'string',
        description: 'string',
        sortOrder: 'int',
        completedAt: 'any',
        completedBy: 'any',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        version: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<string | null>('description');
    sortOrder = this.declared<number | null>('sortOrder');
    completedAt = this.declared<unknown>('completedAt');
    completedBy = this.declared<unknown>('completedBy');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    version = this.declared<number | null>('version');
}

/** One entry of `selected_labours` on {@link Assignee}. */
export class SelectedLabour extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
        email: 'string',
        displayOrder: 'int',
        labourCode: 'string',
        responsibility: 'any',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
    email = this.declared<string | null>('email');
    displayOrder = this.declared<number | null>('displayOrder');
    labourCode = this.declared<string | null>('labourCode');
    responsibility = this.declared<unknown>('responsibility');
}

/** One entry of `selected_employees` on {@link Assignee}. */
export class SelectedEmployee extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
        email: 'string',
        displayOrder: 'int',
        employeeCode: 'string',
        responsibility: 'any',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
    email = this.declared<string | null>('email');
    displayOrder = this.declared<number | null>('displayOrder');
    employeeCode = this.declared<string | null>('employeeCode');
    responsibility = this.declared<unknown>('responsibility');
}

/** The `assignees` block of {@link Task}. */
export class Assignee extends Dto {
    static override FIELDS = {
        selectedOperators: dtoList('any'),
        selectedAccountContacts: dtoList('any'),
        selectedLabours: dtoList(SelectedLabour),
        selectedEmployees: dtoList(SelectedEmployee),
        manuallyAddedAccountContacts: dtoList('any'),
    } as const;

    selectedOperators = this.declared<Array<unknown | null> | null>('selectedOperators');
    selectedAccountContacts = this.declared<Array<unknown | null> | null>('selectedAccountContacts');
    selectedLabours = this.declared<Array<SelectedLabour | null> | null>('selectedLabours');
    selectedEmployees = this.declared<Array<SelectedEmployee | null> | null>('selectedEmployees');
    manuallyAddedAccountContacts = this.declared<Array<unknown | null> | null>('manuallyAddedAccountContacts');
}

/** One entry of `activity_logs` on {@link Task}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** The `created_by` block of {@link Task}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `completed_by` block of {@link Task}. */
export class CompletedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The `last_updated_by` block of {@link Task}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The task body. */
export class Task extends Dto {
    static override ENVELOPE_KEY = 'work_task';

    static override FIELDS = {
        activityLogs: dtoList(ActivityLog),
        actualHours: 'any',
        alerts: dtoList('any'),
        assignees: Assignee,
        checklist: dtoList(Checklist),
        code: 'string',
        completedAt: 'string',
        completedBy: CompletedBy,
        createdBy: CreatedBy,
        createdOn: 'string',
        customAttributes: 'any',
        description: 'string',
        displayName: 'string',
        dueDate: 'string',
        estimatedHours: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        milestone: 'any',
        name: 'string',
        object: 'string',
        parentTask: 'any',
        priority: 'string',
        resource: 'any',
        sortOrder: 'int',
        startAfter: 'any',
        startDate: 'string',
        state: 'any',
        status: 'string',
        taskStatus: 'string',
        version: 'int',
        workflow: 'any',
    } as const;

    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
    actualHours = this.declared<unknown>('actualHours');
    alerts = this.declared<Array<unknown | null> | null>('alerts');
    assignees = this.declared<Assignee | null>('assignees');
    checklist = this.declared<Array<Checklist | null> | null>('checklist');
    code = this.declared<string | null>('code');
    completedAt = this.declared<string | null>('completedAt');
    completedBy = this.declared<CompletedBy | null>('completedBy');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    dueDate = this.declared<string | null>('dueDate');
    estimatedHours = this.declared<number | null>('estimatedHours');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    milestone = this.declared<unknown>('milestone');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    parentTask = this.declared<unknown>('parentTask');
    priority = this.declared<string | null>('priority');
    resource = this.declared<unknown>('resource');
    sortOrder = this.declared<number | null>('sortOrder');
    startAfter = this.declared<unknown>('startAfter');
    startDate = this.declared<string | null>('startDate');
    state = this.declared<unknown>('state');
    status = this.declared<string | null>('status');
    taskStatus = this.declared<string | null>('taskStatus');
    version = this.declared<number | null>('version');
    workflow = this.declared<unknown>('workflow');
}

/** A page of Task records. */
export class TaskList extends Dto {
    static override FIELDS = {
        data: dtoList(Task),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Task | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The task checklist body. */
export class TaskChecklist extends Dto {
    static override ENVELOPE_KEY = 'work_task';

    static override FIELDS = {
        checklist: dtoList(Checklist),
    } as const;

    checklist = this.declared<Array<Checklist | null> | null>('checklist');
}

/** A page of records. */
export class TaskNoteList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList('any'),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<unknown | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** The task checklist by uuid body. */
export class TaskChecklistByUuid extends Dto {
    static override ENVELOPE_KEY = 'work_task';

    static override FIELDS = {
        checklist: Checklist,
    } as const;

    checklist = this.declared<Checklist | null>('checklist');
}

/** One entry of a {@link TaskView}'s `activity_logs`. */
export class TaskViewActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/** One entry of a {@link TaskViewAssignees}'s `selected_employees`. */
export class TaskViewAssigneesSelectedEmployee extends Dto {
    static override FIELDS = {
        displayOrder: 'int',
        email: 'string',
        employeeCode: 'string',
        name: 'string',
        responsibility: 'any',
        uuid: 'string',
    } as const;

    displayOrder = this.declared<number | null>('displayOrder');
    email = this.declared<string | null>('email');
    employeeCode = this.declared<string | null>('employeeCode');
    name = this.declared<string | null>('name');
    responsibility = this.declared<unknown>('responsibility');
    uuid = this.declared<string | null>('uuid');
}

/** One entry of a {@link TaskViewAssignees}'s `selected_labours`. */
export class TaskViewAssigneesSelectedLabour extends Dto {
    static override FIELDS = {
        displayOrder: 'int',
        email: 'string',
        labourCode: 'string',
        name: 'string',
        responsibility: 'any',
        uuid: 'string',
    } as const;

    displayOrder = this.declared<number | null>('displayOrder');
    email = this.declared<string | null>('email');
    labourCode = this.declared<string | null>('labourCode');
    name = this.declared<string | null>('name');
    responsibility = this.declared<unknown>('responsibility');
    uuid = this.declared<string | null>('uuid');
}

/** A {@link TaskView}'s `assignees`. */
export class TaskViewAssignees extends Dto {
    static override FIELDS = {
        manuallyAddedAccountContacts: dtoList('any'),
        selectedAccountContacts: dtoList('any'),
        selectedEmployees: dtoList(TaskViewAssigneesSelectedEmployee),
        selectedLabours: dtoList(TaskViewAssigneesSelectedLabour),
        selectedOperators: dtoList('any'),
    } as const;

    manuallyAddedAccountContacts = this.declared<Array<unknown | null> | null>('manuallyAddedAccountContacts');
    selectedAccountContacts = this.declared<Array<unknown | null> | null>('selectedAccountContacts');
    selectedEmployees = this.declared<Array<TaskViewAssigneesSelectedEmployee | null> | null>('selectedEmployees');
    selectedLabours = this.declared<Array<TaskViewAssigneesSelectedLabour | null> | null>('selectedLabours');
    selectedOperators = this.declared<Array<unknown | null> | null>('selectedOperators');
}

/** A {@link TaskView}'s `completed_by`. */
export class TaskViewCompletedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link TaskView}'s `created_by`. */
export class TaskViewCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link TaskView}'s `last_updated_by`. */
export class TaskViewLastUpdatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** What `getTask` answers, under `work_task`. */
export class TaskView extends Dto {
    static override ENVELOPE_KEY = 'work_task';

    static override FIELDS = {
        activityLogs: dtoList(TaskViewActivityLog),
        actualHours: 'any',
        alerts: dtoList('any'),
        assignees: TaskViewAssignees,
        checklist: 'any',
        code: 'string',
        completedAt: 'string',
        completedBy: TaskViewCompletedBy,
        createdBy: TaskViewCreatedBy,
        createdOn: 'string',
        customAttributes: dtoList('any'),
        description: 'string',
        displayName: 'string',
        dueDate: 'string',
        estimatedHours: 'int',
        href: 'string',
        id: 'string',
        lastUpdatedBy: TaskViewLastUpdatedBy,
        lastUpdatedOn: 'string',
        milestone: 'any',
        name: 'string',
        object: 'string',
        parentTask: 'any',
        priority: 'string',
        resource: 'any',
        sortOrder: 'int',
        startAfter: 'any',
        startDate: 'string',
        state: 'any',
        status: 'string',
        taskStatus: 'string',
        version: 'int',
        workflow: 'any',
    } as const;

    activityLogs = this.declared<Array<TaskViewActivityLog | null> | null>('activityLogs');
    actualHours = this.declared<unknown>('actualHours');
    alerts = this.declared<Array<unknown | null> | null>('alerts');
    assignees = this.declared<TaskViewAssignees | null>('assignees');
    checklist = this.declared<unknown>('checklist');
    code = this.declared<string | null>('code');
    completedAt = this.declared<string | null>('completedAt');
    completedBy = this.declared<TaskViewCompletedBy | null>('completedBy');
    createdBy = this.declared<TaskViewCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<Array<unknown | null> | null>('customAttributes');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    dueDate = this.declared<string | null>('dueDate');
    estimatedHours = this.declared<number | null>('estimatedHours');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<TaskViewLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    milestone = this.declared<unknown>('milestone');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    parentTask = this.declared<unknown>('parentTask');
    priority = this.declared<string | null>('priority');
    resource = this.declared<unknown>('resource');
    sortOrder = this.declared<number | null>('sortOrder');
    startAfter = this.declared<unknown>('startAfter');
    startDate = this.declared<string | null>('startDate');
    state = this.declared<unknown>('state');
    status = this.declared<string | null>('status');
    taskStatus = this.declared<string | null>('taskStatus');
    version = this.declared<number | null>('version');
    workflow = this.declared<unknown>('workflow');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Task: [
        'GET /api/{api_version}/tasks',
        'GET /api/{api_version}/tasks/{task_id}',
        'PATCH /api/{api_version}/tasks/{task_id}',
        'POST /api/{api_version}/tasks/{task_id}/checklist',
    ],
    TaskList: ['GET /api/{api_version}/tasks'],
    TaskChecklist: ['GET /api/{api_version}/tasks/{task_id}/checklist'],
    TaskNoteList: ['GET /api/{api_version}/tasks/{task_code}/notes'],
    TaskChecklistByUuid: ['GET /api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}'],
    TaskView: [
        'GET /api/{api_version}/tasks/{task_id}',
        'GET /api/{api_version}/tasks/{task_id}/checklist',
        'GET /api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}',
        'PATCH /api/{api_version}/tasks/{task_id}',
        'POST /api/{api_version}/tasks/{task_id}/checklist',
        'POST /api/{api_version}/tasks',
        'PATCH /api/{api_version}/tasks/{task_id}/checklist/{task_checklist_uuid}',
    ],
};

sealDtoSchema(
    Task,
    TaskList,
    Checklist,
    SelectedLabour,
    SelectedEmployee,
    Assignee,
    ActivityLog,
    TaskChecklist,
    TaskNoteList,
    TaskChecklistByUuid,
    CreatedBy,
    CompletedBy,
    LastUpdatedBy,
    TaskViewActivityLog,
    TaskViewAssigneesSelectedEmployee,
    TaskViewAssigneesSelectedLabour,
    TaskViewAssignees,
    TaskViewCompletedBy,
    TaskViewCreatedBy,
    TaskViewLastUpdatedBy,
    TaskView,
);
