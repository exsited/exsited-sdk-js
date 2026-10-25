/** Typed views over the v4 custom components bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** One entry of `options` on {@link FirstColumnAttribute}. */
export class FirstColumnAttributeOption extends Dto {
    static override FIELDS = {
        id: 'string',
        name: 'string',
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
}

/** One entry of `firstColumnAttribute` on {@link CustomFormEntry}. */
export class FirstColumnAttribute extends Dto {
    static override WIRE_NAMES = {
        displayName: 'displayName',
        typeValue: 'typeValue',
        timeFormat: 'timeFormat',
        canEncrypt: 'canEncrypt',
        encryptData: 'encryptData',
        minLength: 'minLength',
        maxLength: 'maxLength',
        fieldRequired: 'fieldRequired',
        showInListView: 'showInListView',
        validationMessage: 'validationMessage',
        validationMessageRequired: 'validationMessageRequired',
        isRequired: 'isRequired',
        isUnique: 'isUnique',
        formMinLengthInputed: 'formMinLengthInputed',
        formMaxLengthInputed: 'formMaxLengthInputed',
        metaData: 'metaData',
    } as const;

    static override FIELDS = {
        id: 'int',
        displayName: 'string',
        name: 'string',
        description: 'string',
        enabled: 'boolean',
        typeValue: 'string',
        type: 'string',
        timeFormat: 'any',
        canEncrypt: 'boolean',
        encryptData: 'boolean',
        minLength: 'any',
        maxLength: 'any',
        options: dtoList(FirstColumnAttributeOption),
        fieldRequired: 'boolean',
        showInListView: 'boolean',
        validationMessage: 'string',
        value: 'string',
        ids: 'int',
        validationMessageRequired: 'boolean',
        isRequired: 'boolean',
        isUnique: 'boolean',
        formMinLengthInputed: 'boolean',
        formMaxLengthInputed: 'boolean',
        position: 'string',
        entity: 'any',
        metaData: 'string',
    } as const;

    id = this.declared<number | null>('id');
    displayName = this.declared<string | null>('displayName');
    name = this.declared<string | null>('name');
    description = this.declared<string | null>('description');
    enabled = this.declared<boolean | null>('enabled');
    typeValue = this.declared<string | null>('typeValue');
    type = this.declared<string | null>('type');
    timeFormat = this.declared<unknown>('timeFormat');
    canEncrypt = this.declared<boolean | null>('canEncrypt');
    encryptData = this.declared<boolean | null>('encryptData');
    minLength = this.declared<unknown>('minLength');
    maxLength = this.declared<unknown>('maxLength');
    options = this.declared<Array<FirstColumnAttributeOption | null> | null>('options');
    fieldRequired = this.declared<boolean | null>('fieldRequired');
    showInListView = this.declared<boolean | null>('showInListView');
    validationMessage = this.declared<string | null>('validationMessage');
    value = this.declared<string | null>('value');
    ids = this.declared<number | null>('ids');
    validationMessageRequired = this.declared<boolean | null>('validationMessageRequired');
    isRequired = this.declared<boolean | null>('isRequired');
    isUnique = this.declared<boolean | null>('isUnique');
    formMinLengthInputed = this.declared<boolean | null>('formMinLengthInputed');
    formMaxLengthInputed = this.declared<boolean | null>('formMaxLengthInputed');
    position = this.declared<string | null>('position');
    entity = this.declared<unknown>('entity');
    metaData = this.declared<string | null>('metaData');
}

/** The `typeActual` block of {@link SecondColumnAttribute}. */
export class TypeActual extends Dto {
    static override FIELDS = {
        key: 'string',
        value: 'string',
    } as const;

    key = this.declared<string | null>('key');
    value = this.declared<string | null>('value');
}

/** One entry of `secondColumnAttribute` on {@link CustomFormEntry}. */
export class SecondColumnAttribute extends Dto {
    static override WIRE_NAMES = {
        displayName: 'displayName',
        fieldEnabled: 'fieldEnabled',
        fieldRequired: 'fieldRequired',
        showInListView: 'showInListView',
        typeActual: 'typeActual',
        validationMessageRequired: 'validationMessageRequired',
    } as const;

    static override FIELDS = {
        displayName: 'string',
        fieldEnabled: 'boolean',
        fieldRequired: 'boolean',
        showInListView: 'boolean',
        name: 'string',
        type: 'string',
        typeActual: TypeActual,
        ids: 'int',
        validationMessageRequired: 'boolean',
    } as const;

    displayName = this.declared<string | null>('displayName');
    fieldEnabled = this.declared<boolean | null>('fieldEnabled');
    fieldRequired = this.declared<boolean | null>('fieldRequired');
    showInListView = this.declared<boolean | null>('showInListView');
    name = this.declared<string | null>('name');
    type = this.declared<string | null>('type');
    typeActual = this.declared<TypeActual | null>('typeActual');
    ids = this.declared<number | null>('ids');
    validationMessageRequired = this.declared<boolean | null>('validationMessageRequired');
}

/** The `data` block of {@link CustomForm}. */
export class CustomFormEntry extends Dto {
    static override WIRE_NAMES = {
        firstColumnAttribute: 'firstColumnAttribute',
        secondColumnAttribute: 'secondColumnAttribute',
        thirdColumnAttribute: 'thirdColumnAttribute',
    } as const;

    static override FIELDS = {
        firstColumnAttribute: dtoList(FirstColumnAttribute),
        secondColumnAttribute: dtoList(SecondColumnAttribute),
        thirdColumnAttribute: dtoList('any'),
    } as const;

    firstColumnAttribute = this.declared<Array<FirstColumnAttribute | null> | null>('firstColumnAttribute');
    secondColumnAttribute = this.declared<Array<SecondColumnAttribute | null> | null>('secondColumnAttribute');
    thirdColumnAttribute = this.declared<Array<unknown | null> | null>('thirdColumnAttribute');
}

/** One entry of `custom_forms` on {@link Component}. */
export class CustomForm extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        templateName: 'string',
        columnCount: 'int',
        data: CustomFormEntry,
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    templateName = this.declared<string | null>('templateName');
    columnCount = this.declared<number | null>('columnCount');
    data = this.declared<CustomFormEntry | null>('data');
}

/** The component body. */
export class Component extends Dto {
    static override ENVELOPE_KEY = 'component';

    static override FIELDS = {
        childCustomComponents: 'any',
        createdBy: 'any',
        createdOn: 'string',
        customComponent: 'any',
        customForms: dtoList(CustomForm),
        customObjects: 'any',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        relation: 'string',
        status: 'string',
        useIn: 'string',
        version: 'int',
    } as const;

    childCustomComponents = this.declared<unknown>('childCustomComponents');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customComponent = this.declared<unknown>('customComponent');
    customForms = this.declared<Array<CustomForm | null> | null>('customForms');
    customObjects = this.declared<unknown>('customObjects');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    relation = this.declared<string | null>('relation');
    status = this.declared<string | null>('status');
    useIn = this.declared<string | null>('useIn');
    version = this.declared<number | null>('version');
}

/** A page of Component records. */
export class ComponentList extends Dto {
    static override FIELDS = {
        data: dtoList(Component),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Component | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One entry of `parents` on {@link ComponentObjectEntry}. */
export class Parent extends Dto {
    static override FIELDS = {
        object: 'string',
        type: 'string',
        id: 'string',
        name: 'string',
        email: 'string',
        link: 'string',
    } as const;

    object = this.declared<string | null>('object');
    type = this.declared<string | null>('type');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    email = this.declared<string | null>('email');
    link = this.declared<string | null>('link');
}

/** The `custom_form` block of {@link ComponentByUuid}. */
export class ComponentByUuidCustomForm extends Dto {
    static override FIELDS = {
        uuid: 'string',
        name: 'string',
    } as const;

    uuid = this.declared<string | null>('uuid');
    name = this.declared<string | null>('name');
}

/** One entry of `attributes` on {@link ComponentByUuid}. */
export class Attribute extends Dto {
    static override FIELDS = {
        name: 'string',
        value: 'string',
    } as const;

    name = this.declared<string | null>('name');
    value = this.declared<string | null>('value');
}

/** One entry of `activity_logs` on {@link ComponentByUuid}. */
export class ActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/**
 * The component instance body, under the component's own name; the write functions hand the client a subclass that
 * unwraps it, so `ComponentByUuid.fromMap` on its own reads a record that is already unwrapped.
 */
export class ComponentByUuid extends Dto {
    static override FIELDS = {
        activityLogs: dtoList(ActivityLog),
        attributeGroups: 'any',
        attributes: dtoList(Attribute),
        createdBy: 'string',
        createdOn: 'string',
        customForm: ComponentByUuidCustomForm,
        customObjects: 'any',
        id: 'string',
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        parents: dtoList(Parent),
        restrictions: 'any',
        status: 'string',
        uuid: 'string',
        version: 'string',
    } as const;

    activityLogs = this.declared<Array<ActivityLog | null> | null>('activityLogs');
    attributeGroups = this.declared<unknown>('attributeGroups');
    attributes = this.declared<Array<Attribute | null> | null>('attributes');
    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customForm = this.declared<ComponentByUuidCustomForm | null>('customForm');
    customObjects = this.declared<unknown>('customObjects');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    parents = this.declared<Array<Parent | null> | null>('parents');
    restrictions = this.declared<unknown>('restrictions');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<string | null>('version');
}

/** The `component` block of {@link ComponentObject}. */
export class ComponentObjectComponent extends Dto {
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

/** The `custom_form` block of {@link ComponentObjectEntry}. */
export class ComponentObjectEntryCustomForm extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
}

/** The component object body. */
export class ComponentObject extends Dto {
    static override ENVELOPE_KEY = 'custom_component_object';

    static override FIELDS = {
        accounts: dtoList('any'),
        attributeGroups: 'any',
        attributes: 'any',
        code: 'string',
        component: ComponentObjectComponent,
        createdBy: 'string',
        createdOn: 'string',
        customForm: ComponentObjectEntryCustomForm,
        customObjects: 'any',
        href: 'string',
        id: 'string',
        items: dtoList('any'),
        lastUpdatedBy: 'string',
        lastUpdatedOn: 'string',
        object: 'string',
        orders: dtoList('any'),
        parents: dtoList(Parent),
        quotes: dtoList('any'),
        restrictions: 'any',
        status: 'string',
        uuid: 'string',
        version: 'int',
        workflowData: dtoList('any'),
        workflowStage: 'any',
        workflowStatus: 'any',
        workflowStatusUuid: 'any',
    } as const;

    accounts = this.declared<Array<unknown | null> | null>('accounts');
    attributeGroups = this.declared<unknown>('attributeGroups');
    attributes = this.declared<unknown>('attributes');
    code = this.declared<string | null>('code');
    component = this.declared<ComponentObjectComponent | null>('component');
    createdBy = this.declared<string | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customForm = this.declared<ComponentObjectEntryCustomForm | null>('customForm');
    customObjects = this.declared<unknown>('customObjects');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    items = this.declared<Array<unknown | null> | null>('items');
    lastUpdatedBy = this.declared<string | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    orders = this.declared<Array<unknown | null> | null>('orders');
    parents = this.declared<Array<Parent | null> | null>('parents');
    quotes = this.declared<Array<unknown | null> | null>('quotes');
    restrictions = this.declared<unknown>('restrictions');
    status = this.declared<string | null>('status');
    uuid = this.declared<string | null>('uuid');
    version = this.declared<number | null>('version');
    workflowData = this.declared<Array<unknown | null> | null>('workflowData');
    workflowStage = this.declared<unknown>('workflowStage');
    workflowStatus = this.declared<unknown>('workflowStatus');
    workflowStatusUuid = this.declared<unknown>('workflowStatusUuid');
}

/** One entry of `data` on {@link ComponentObjects}. */
export class ComponentObjectEntry extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        code: 'string',
        component: ComponentObjectComponent,
        customForm: ComponentObjectEntryCustomForm,
        attributes: dtoList('any'),
        attributeGroups: dtoList('any'),
        restrictions: dtoList('any'),
        parents: dtoList(Parent),
        workflowStatus: 'any',
        workflowStatusUuid: 'any',
        workflowStage: 'any',
        workflowData: dtoList('any'),
        customObjects: dtoList('any'),
        accounts: dtoList('any'),
        items: dtoList('any'),
        orders: dtoList('any'),
        quotes: dtoList('any'),
        createdOn: 'string',
        lastUpdatedOn: 'any',
        createdBy: 'any',
        lastUpdatedBy: 'any',
        version: 'int',
        href: 'string',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    code = this.declared<string | null>('code');
    component = this.declared<ComponentObjectComponent | null>('component');
    customForm = this.declared<ComponentObjectEntryCustomForm | null>('customForm');
    attributes = this.declared<Array<unknown | null> | null>('attributes');
    attributeGroups = this.declared<Array<unknown | null> | null>('attributeGroups');
    restrictions = this.declared<Array<unknown | null> | null>('restrictions');
    parents = this.declared<Array<Parent | null> | null>('parents');
    workflowStatus = this.declared<unknown>('workflowStatus');
    workflowStatusUuid = this.declared<unknown>('workflowStatusUuid');
    workflowStage = this.declared<unknown>('workflowStage');
    workflowData = this.declared<Array<unknown | null> | null>('workflowData');
    customObjects = this.declared<Array<unknown | null> | null>('customObjects');
    accounts = this.declared<Array<unknown | null> | null>('accounts');
    items = this.declared<Array<unknown | null> | null>('items');
    orders = this.declared<Array<unknown | null> | null>('orders');
    quotes = this.declared<Array<unknown | null> | null>('quotes');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    createdBy = this.declared<unknown>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
    href = this.declared<string | null>('href');
}

/** The component objects body. */
export class ComponentObjects extends Dto {
    static override FIELDS = {
        data: dtoList(ComponentObjectEntry),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ComponentObjectEntry | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The component object activity body. */
export class ComponentObjectActivity extends Dto {
    static override FIELDS = {
        activites: 'any',
        data: dtoList('any'),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    activites = this.declared<unknown>('activites');
    data = this.declared<Array<unknown | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The component object custom objects body. */
export class ComponentObjectCustomObjects extends Dto {
    static override FIELDS = {
        customObjects: 'any',
        data: dtoList('any'),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    customObjects = this.declared<unknown>('customObjects');
    data = this.declared<Array<unknown | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** A {@link ComponentObjectCustomComponentObject}'s `custom_form`. */
export class ComponentObjectCustomComponentObjectCustomForm extends Dto {
    static override FIELDS = {
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link ComponentObjectCustomComponentObject}'s `component`. */
export class ComponentObjectCustomComponentObjectDetail extends Dto {
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

/** One entry of a {@link ComponentObjectCustomComponentObject}'s `parents`. */
export class ComponentObjectCustomComponentObjectParent extends Dto {
    static override FIELDS = {
        email: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        type: 'string',
    } as const;

    email = this.declared<string | null>('email');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    type = this.declared<string | null>('type');
}

/** One entry of a {@link ComponentObjectRecord}'s `activity_logs`. */
export class ComponentObjectRecordActivityLog extends Dto {
    static override FIELDS = {
        activity: 'string',
    } as const;

    activity = this.declared<string | null>('activity');
}

/**
 * The component object body a v4 write answers, under `custom_component_object`: the fields a read nests there, with
 * `activity_logs` beside them.
 */
export class ComponentObjectRecord extends Dto {
    static override ENVELOPE_KEY = 'custom_component_object';

    static override FIELDS = {
        accounts: dtoList('any'),
        attributeGroups: dtoList('any'),
        attributes: dtoList('any'),
        code: 'string',
        component: ComponentObjectCustomComponentObjectDetail,
        createdBy: 'any',
        createdOn: 'string',
        customForm: ComponentObjectCustomComponentObjectCustomForm,
        customObjects: dtoList('any'),
        href: 'string',
        id: 'string',
        items: dtoList('any'),
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        object: 'string',
        orders: dtoList('any'),
        parents: dtoList(ComponentObjectCustomComponentObjectParent),
        quotes: dtoList('any'),
        restrictions: dtoList('any'),
        status: 'string',
        version: 'int',
        workflowData: dtoList('any'),
        workflowStage: 'any',
        workflowStatus: 'any',
        workflowStatusUuid: 'any',
        activityLogs: dtoList(ComponentObjectRecordActivityLog),
    } as const;

    accounts = this.declared<Array<unknown | null> | null>('accounts');
    attributeGroups = this.declared<Array<unknown | null> | null>('attributeGroups');
    attributes = this.declared<Array<unknown | null> | null>('attributes');
    code = this.declared<string | null>('code');
    component = this.declared<ComponentObjectCustomComponentObjectDetail | null>('component');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customForm = this.declared<ComponentObjectCustomComponentObjectCustomForm | null>('customForm');
    customObjects = this.declared<Array<unknown | null> | null>('customObjects');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    items = this.declared<Array<unknown | null> | null>('items');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    orders = this.declared<Array<unknown | null> | null>('orders');
    parents = this.declared<Array<ComponentObjectCustomComponentObjectParent | null> | null>('parents');
    quotes = this.declared<Array<unknown | null> | null>('quotes');
    restrictions = this.declared<Array<unknown | null> | null>('restrictions');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
    workflowData = this.declared<Array<unknown | null> | null>('workflowData');
    workflowStage = this.declared<unknown>('workflowStage');
    workflowStatus = this.declared<unknown>('workflowStatus');
    workflowStatusUuid = this.declared<unknown>('workflowStatusUuid');
    activityLogs = this.declared<Array<ComponentObjectRecordActivityLog | null> | null>('activityLogs');
}

/** One component object activity, under `custom_component_object_activity`. */
export class ComponentObjectActivityEntry extends Dto {
    static override ENVELOPE_KEY = 'custom_component_object_activity';

    static override FIELDS = {
        createdBy: 'any',
        createdOn: 'string',
        href: 'string',
        id: 'string',
        message: 'string',
        object: 'string',
        status: 'string',
        type: 'string',
        userName: 'string',
        version: 'int',
    } as const;

    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    message = this.declared<string | null>('message');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    userName = this.declared<string | null>('userName');
    version = this.declared<number | null>('version');
}

/** One entry of a {@link ComponentObjectNote}'s `attachments`; `uuid` is the file id. */
export class ComponentObjectNoteAttachment extends Dto {
    static override FIELDS = {
        contentType: 'string',
        filename: 'string',
        href: 'string',
        size: 'int',
        uuid: 'string',
    } as const;

    contentType = this.declared<string | null>('contentType');
    filename = this.declared<string | null>('filename');
    href = this.declared<string | null>('href');
    size = this.declared<number | null>('size');
    uuid = this.declared<string | null>('uuid');
}

/** A {@link ComponentObjectNote}'s `created_by`. */
export class ComponentObjectNoteCreatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link ComponentObjectNote}'s `custom_component_object`, the note's owner. */
export class ComponentObjectNoteCustomComponentObject extends Dto {
    static override FIELDS = {
        href: 'string',
        id: 'string',
        object: 'string',
    } as const;

    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
}

/** A {@link ComponentObjectNote}'s `last_updated_by`, set once the note has been updated. */
export class ComponentObjectNoteLastUpdatedBy extends Dto {
    static override FIELDS = {
        name: 'string',
        object: 'string',
    } as const;

    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A component object's note, under `note`. */
export class ComponentObjectNote extends Dto {
    static override ENVELOPE_KEY = 'note';

    static override FIELDS = {
        attachments: dtoList(ComponentObjectNoteAttachment),
        content: 'string',
        createdBy: ComponentObjectNoteCreatedBy,
        createdOn: 'string',
        customComponentObject: ComponentObjectNoteCustomComponentObject,
        group: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: ComponentObjectNoteLastUpdatedBy,
        lastUpdatedOn: 'string',
        object: 'string',
        user: 'any',
        version: 'int',
        watchers: dtoList('any'),
    } as const;

    attachments = this.declared<Array<ComponentObjectNoteAttachment | null> | null>('attachments');
    content = this.declared<string | null>('content');
    createdBy = this.declared<ComponentObjectNoteCreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customComponentObject = this.declared<ComponentObjectNoteCustomComponentObject | null>('customComponentObject');
    group = this.declared<unknown>('group');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<ComponentObjectNoteLastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    object = this.declared<string | null>('object');
    user = this.declared<unknown>('user');
    version = this.declared<number | null>('version');
    watchers = this.declared<Array<unknown | null> | null>('watchers');
}

/** One page of `ComponentObjectNote` records, under `data`. */
export class ComponentObjectNotes extends Dto {
    static override FIELDS = {
        data: dtoList(ComponentObjectNote),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ComponentObjectNote | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** A note's files, under `data`; its `pagination` carries `has_more` alone. */
export class ComponentObjectNoteFiles extends Dto {
    static override FIELDS = {
        data: dtoList(ComponentObjectNoteAttachment),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<ComponentObjectNoteAttachment | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** One file of a note, under `file`. */
export class ComponentObjectNoteFile extends Dto {
    static override ENVELOPE_KEY = 'file';

    static override FIELDS = {
        contentType: 'string',
        filename: 'string',
        href: 'string',
        size: 'int',
        uuid: 'string',
    } as const;

    contentType = this.declared<string | null>('contentType');
    filename = this.declared<string | null>('filename');
    href = this.declared<string | null>('href');
    size = this.declared<number | null>('size');
    uuid = this.declared<string | null>('uuid');
}

/** A {@link ComponentObjectsData}'s `custom_form`. */
export class ComponentObjectsDataCustomForm extends Dto {
    static override FIELDS = {
        id: 'string',
        name: 'string',
        object: 'string',
    } as const;

    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
}

/** A {@link ComponentObjectsData}'s `component`. */
export class ComponentObjectsDataDetail extends Dto {
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

/** One entry of a {@link ComponentObjectsData}'s `parents`. */
export class ComponentObjectsDataParent extends Dto {
    static override FIELDS = {
        email: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        type: 'string',
    } as const;

    email = this.declared<string | null>('email');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    type = this.declared<string | null>('type');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Component: ['GET /api/{api_version}/component', 'GET /api/{api_version}/component/{component_uuid}'],
    ComponentList: ['GET /api/{api_version}/component'],
    ComponentByUuid: [
        'POST /api/{api_version}/component/{component_uuid}',
        'PATCH /api/{api_version}/component/{component_uuid}/{component_object_id}',
    ],
    ComponentObject: ['GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}'],
    ComponentObjects: ['GET /api/{api_version}/components/{component_uuid}/objects'],
    ComponentObjectActivity: [
        'GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity',
    ],
    ComponentObjectCustomObjects: [
        'GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/custom_objects',
    ],
    ComponentObjectEntry: ['GET /api/{api_version}/components/{component_uuid}/objects'],
    ComponentObjectRecord: [
        'POST /api/{api_version}/components/{component_uuid}/objects',
        'PATCH /api/{api_version}/components/{component_uuid}/objects/{component_object_id}',
    ],
    ComponentObjectActivityEntry: [
        'POST /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity',
        'GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/activity/{activity_id}',
    ],
    ComponentObjectNote: [
        'GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes',
        'GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}',
        'POST /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes',
        'PATCH /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}',
    ],
    ComponentObjectNotes: ['GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes'],
    ComponentObjectNoteFiles: [
        'GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files',
    ],
    ComponentObjectNoteFile: [
        'GET /api/{api_version}/components/{component_uuid}/objects/{component_object_id}/notes/{note_id}/files/{file_id}',
    ],
};

sealDtoSchema(
    Component,
    ComponentList,
    ComponentByUuid,
    ComponentObject,
    ComponentObjects,
    ComponentObjectActivity,
    ComponentObjectCustomObjects,
    ComponentObjectComponent,
    FirstColumnAttributeOption,
    FirstColumnAttribute,
    TypeActual,
    SecondColumnAttribute,
    CustomFormEntry,
    CustomForm,
    Parent,
    ComponentByUuidCustomForm,
    Attribute,
    ActivityLog,
    ComponentObjectEntryCustomForm,
    ComponentObjectEntry,
    ComponentObjectCustomComponentObjectCustomForm,
    ComponentObjectCustomComponentObjectDetail,
    ComponentObjectCustomComponentObjectParent,
    ComponentObjectRecordActivityLog,
    ComponentObjectRecord,
    ComponentObjectActivityEntry,
    ComponentObjectNoteAttachment,
    ComponentObjectNoteCreatedBy,
    ComponentObjectNoteCustomComponentObject,
    ComponentObjectNoteLastUpdatedBy,
    ComponentObjectNote,
    ComponentObjectNotes,
    ComponentObjectNoteFiles,
    ComponentObjectNoteFile,
    ComponentObjectsDataCustomForm,
    ComponentObjectsDataDetail,
    ComponentObjectsDataParent,
);
