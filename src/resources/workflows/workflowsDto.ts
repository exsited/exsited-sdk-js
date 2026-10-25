/** Typed views over the v4 workflows bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';
/** The `workflow` block of {@link WorkflowMilestone}. */
export class Workflow extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    href = this.declared<string | null>('href');
}

/** The `activity_definition` block of {@link WorkflowMilestone}. */
export class ActivityDefinition extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
}

/** The `workflow_version` block of {@link WorkflowMilestone}. */
export class WorkflowVersion extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
}

/** One entry of `data` on {@link WorkflowMilestoneList}. */
export class WorkflowMilestone extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        name: 'string',
        displayName: 'string',
        description: 'any',
        icon: 'any',
        priority: 'string',
        sortOrder: 'any',
        autoCreate: 'any',
        estimatedHours: 'any',
        workflow: Workflow,
        activityDefinition: ActivityDefinition,
        workflowVersion: WorkflowVersion,
        createdOn: 'string',
        lastUpdatedOn: 'string',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<unknown>('description');
    icon = this.declared<unknown>('icon');
    priority = this.declared<string | null>('priority');
    sortOrder = this.declared<unknown>('sortOrder');
    autoCreate = this.declared<unknown>('autoCreate');
    estimatedHours = this.declared<unknown>('estimatedHours');
    workflow = this.declared<Workflow | null>('workflow');
    activityDefinition = this.declared<ActivityDefinition | null>('activityDefinition');
    workflowVersion = this.declared<WorkflowVersion | null>('workflowVersion');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    href = this.declared<string | null>('href');
}

/** A page of WorkflowMilestone records. */
export class WorkflowMilestoneList extends Dto {
    static override FIELDS = {
        object: 'string',
        url: 'string',
        data: dtoList(WorkflowMilestone),
        pagination: Pagination,
    } as const;

    object = this.declared<string | null>('object');
    url = this.declared<string | null>('url');
    data = this.declared<Array<WorkflowMilestone | null> | null>('data');
    pagination = this.declared<Pagination | null>('pagination');
}

/** One page of what `getWorkflows` lists, under `data`. */
export class WorkflowList extends Dto {
    static override FIELDS = {
        data: dtoList(Workflow),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Workflow | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** A {@link Workflow}'s `created_by`. */
export class WorkflowCreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** A {@link Workflow}'s `current_version`. */
export class WorkflowCurrentVersion extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
}

/** A {@link Workflow}'s `last_updated_by`. */
export class WorkflowLastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/**
 * One workflow, under `workflow`: what `getWorkflow` answers, and the create and the update, which the handler answers
 * through the same read.
 */
export class WorkflowView extends Dto {
    static override ENVELOPE_KEY = 'workflow';

    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        code: 'any',
        name: 'string',
        displayName: 'string',
        description: 'any',
        entity: 'string',
        entityId: 'int',
        event: 'string',
        isPreBuilt: 'boolean',
        enableStage: 'boolean',
        currentVersion: WorkflowCurrentVersion,
        customForm: 'any',
        createdOn: 'string',
        lastUpdatedOn: 'string',
        createdBy: WorkflowCreatedBy,
        lastUpdatedBy: WorkflowLastUpdatedBy,
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    code = this.declared<unknown>('code');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    description = this.declared<unknown>('description');
    entity = this.declared<string | null>('entity');
    entityId = this.declared<number | null>('entityId');
    event = this.declared<string | null>('event');
    isPreBuilt = this.declared<boolean | null>('isPreBuilt');
    enableStage = this.declared<boolean | null>('enableStage');
    currentVersion = this.declared<WorkflowCurrentVersion | null>('currentVersion');
    customForm = this.declared<unknown>('customForm');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    createdBy = this.declared<WorkflowCreatedBy | null>('createdBy');
    lastUpdatedBy = this.declared<WorkflowLastUpdatedBy | null>('lastUpdatedBy');
    href = this.declared<string | null>('href');
}

/** A {@link WorkflowMilestone}'s `activity_definition`. */
export class WorkflowMilestoneActivityDefinition extends Dto {
    static override FIELDS = {
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link WorkflowMilestone}'s `workflow`. */
export class WorkflowMilestoneDetail extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link WorkflowMilestone}'s `workflow_version`. */
export class WorkflowMilestoneWorkflowVersion extends Dto {
    static override FIELDS = {
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/**
 * One milestone definition, under `workflow_milestone`: what `getWorkflowMilestone` answers, the same fields as a
 * listed one.
 */
export class WorkflowMilestoneView extends Dto {
    static override ENVELOPE_KEY = 'workflow_milestone';

    static override FIELDS = {
        activityDefinition: WorkflowMilestoneActivityDefinition,
        autoCreate: 'any',
        createdOn: 'string',
        description: 'any',
        displayName: 'string',
        estimatedHours: 'any',
        href: 'string',
        icon: 'any',
        id: 'string',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        priority: 'string',
        sortOrder: 'any',
        status: 'string',
        workflow: WorkflowMilestoneDetail,
        workflowVersion: WorkflowMilestoneWorkflowVersion,
    } as const;

    activityDefinition = this.declared<WorkflowMilestoneActivityDefinition | null>('activityDefinition');
    autoCreate = this.declared<unknown>('autoCreate');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    estimatedHours = this.declared<unknown>('estimatedHours');
    href = this.declared<string | null>('href');
    icon = this.declared<unknown>('icon');
    id = this.declared<string | null>('id');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    priority = this.declared<string | null>('priority');
    sortOrder = this.declared<unknown>('sortOrder');
    status = this.declared<string | null>('status');
    workflow = this.declared<WorkflowMilestoneDetail | null>('workflow');
    workflowVersion = this.declared<WorkflowMilestoneWorkflowVersion | null>('workflowVersion');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    WorkflowMilestoneList: ['GET /api/{api_version}/workflows/{workflow_uuid}/milestones'],
    WorkflowMilestone: ['GET /api/{api_version}/workflows/{workflow_uuid}/milestones'],
    WorkflowList: ['GET /api/{api_version}/workflows'],
    WorkflowView: ['GET /api/{api_version}/workflows/{workflow_id}'],
    WorkflowMilestoneView: ['GET /api/{api_version}/workflows/{workflow_id}/milestones/{milestone_id}'],
};

sealDtoSchema(
    Workflow,
    ActivityDefinition,
    WorkflowVersion,
    WorkflowMilestone,
    WorkflowMilestoneList,
    WorkflowList,
    WorkflowCreatedBy,
    WorkflowCurrentVersion,
    WorkflowLastUpdatedBy,
    WorkflowView,
    WorkflowMilestoneActivityDefinition,
    WorkflowMilestoneDetail,
    WorkflowMilestoneWorkflowVersion,
    WorkflowMilestoneView,
);
