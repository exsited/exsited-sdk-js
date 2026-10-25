/** Typed views over the v4 custom features bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** One entry of `attributes` on {@link Column1}. */
export class Attribute extends Dto {
    static override FIELDS = {
        type: 'string',
        name: 'string',
        displayName: 'string',
        dataType: 'string',
        showInListView: 'boolean',
    } as const;

    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    displayName = this.declared<string | null>('displayName');
    dataType = this.declared<string | null>('dataType');
    showInListView = this.declared<boolean | null>('showInListView');
}

/** The `column_1` block of {@link Configuration}. */
export class Column1 extends Dto {
    static override FIELDS = {
        attributes: dtoList(Attribute),
    } as const;

    attributes = this.declared<Array<Attribute | null> | null>('attributes');
}

/** One entry of `attributes` on {@link Column2}. */
export class Column2Attribute extends Dto {
    static override FIELDS = {
        type: 'string',
        name: 'string',
    } as const;

    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
}

/** The `column_2` block of {@link Configuration}. */
export class Column2 extends Dto {
    static override FIELDS = {
        attributes: dtoList(Column2Attribute),
    } as const;

    attributes = this.declared<Array<Column2Attribute | null> | null>('attributes');
}

/** The `settings` block of {@link Configuration}. */
export class Setting extends Dto {
    static override FIELDS = {
        customForm: 'string',
        formLayout: 'string',
    } as const;

    customForm = this.declared<string | null>('customForm');
    formLayout = this.declared<string | null>('formLayout');
}

/** The `configuration` block of {@link CustomForm}. */
export class Configuration extends Dto {
    static override FIELDS = {
        column_1: Column1,
        column_2: Column2,
        settings: Setting,
    } as const;

    column_1 = this.declared<Column1 | null>('column_1');
    column_2 = this.declared<Column2 | null>('column_2');
    settings = this.declared<Setting | null>('settings');
}

/** One entry of `custom_forms` on {@link CustomFeature}. */
export class CustomForm extends Dto {
    static override FIELDS = {
        configuration: Configuration,
    } as const;

    configuration = this.declared<Configuration | null>('configuration');
}

/** The custom feature body. */
export class CustomFeature extends Dto {
    static override ENVELOPE_KEY = 'custom_feature';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        childCustomComponents: dtoList('any'),
        createdBy: 'any',
        createdOn: 'string',
        customComponent: 'any',
        customForms: dtoList(CustomForm),
        customObjects: dtoList('any'),
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        message: 'string',
        name: 'string',
        object: 'string',
        relation: 'string',
        status: 'string',
        useIn: 'string',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    childCustomComponents = this.declared<Array<unknown | null> | null>('childCustomComponents');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customComponent = this.declared<unknown>('customComponent');
    customForms = this.declared<Array<CustomForm | null> | null>('customForms');
    customObjects = this.declared<Array<unknown | null> | null>('customObjects');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    message = this.declared<string | null>('message');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    relation = this.declared<string | null>('relation');
    status = this.declared<string | null>('status');
    useIn = this.declared<string | null>('useIn');
    version = this.declared<number | null>('version');
}

/** One entry of a {@link CustomFeatureDetailCustomFormConfigurationColumn1}'s `attributes`. */
export class CustomFeatureDetailCustomFormConfigurationColumn1Attribute extends Dto {
    static override FIELDS = {
        dataType: 'string',
        displayName: 'string',
        name: 'string',
        showInListView: 'boolean',
        type: 'string',
    } as const;

    dataType = this.declared<string | null>('dataType');
    displayName = this.declared<string | null>('displayName');
    name = this.declared<string | null>('name');
    showInListView = this.declared<boolean | null>('showInListView');
    type = this.declared<string | null>('type');
}

/** A {@link CustomFeatureDetailCustomFormConfiguration}'s `column_1`. */
export class CustomFeatureDetailCustomFormConfigurationColumn1 extends Dto {
    static override FIELDS = {
        attributes: dtoList(CustomFeatureDetailCustomFormConfigurationColumn1Attribute),
    } as const;

    attributes = this.declared<Array<CustomFeatureDetailCustomFormConfigurationColumn1Attribute | null> | null>(
        'attributes',
    );
}

/** One entry of a {@link CustomFeatureDetailCustomFormConfigurationColumn2}'s `attributes`. */
export class CustomFeatureDetailCustomFormConfigurationColumn2Attribute extends Dto {
    static override FIELDS = {
        name: 'string',
        type: 'string',
    } as const;

    name = this.declared<string | null>('name');
    type = this.declared<string | null>('type');
}

/** A {@link CustomFeatureDetailCustomFormConfiguration}'s `column_2`. */
export class CustomFeatureDetailCustomFormConfigurationColumn2 extends Dto {
    static override FIELDS = {
        attributes: dtoList(CustomFeatureDetailCustomFormConfigurationColumn2Attribute),
    } as const;

    attributes = this.declared<Array<CustomFeatureDetailCustomFormConfigurationColumn2Attribute | null> | null>(
        'attributes',
    );
}

/** A {@link CustomFeatureDetailCustomFormConfiguration}'s `settings`. */
export class CustomFeatureDetailCustomFormConfigurationSettings extends Dto {
    static override FIELDS = {
        customForm: 'string',
        formLayout: 'string',
    } as const;

    customForm = this.declared<string | null>('customForm');
    formLayout = this.declared<string | null>('formLayout');
}

/** A {@link CustomFeatureDetailCustomForm}'s `configuration`. */
export class CustomFeatureDetailCustomFormConfiguration extends Dto {
    static override FIELDS = {
        column_1: CustomFeatureDetailCustomFormConfigurationColumn1,
        column_2: CustomFeatureDetailCustomFormConfigurationColumn2,
        settings: CustomFeatureDetailCustomFormConfigurationSettings,
    } as const;

    column_1 = this.declared<CustomFeatureDetailCustomFormConfigurationColumn1 | null>('column_1');
    column_2 = this.declared<CustomFeatureDetailCustomFormConfigurationColumn2 | null>('column_2');
    settings = this.declared<CustomFeatureDetailCustomFormConfigurationSettings | null>('settings');
}

/** One entry of a {@link CustomFeatureDetail}'s `custom_forms`. */
export class CustomFeatureDetailCustomForm extends Dto {
    static override FIELDS = {
        configuration: CustomFeatureDetailCustomFormConfiguration,
    } as const;

    configuration = this.declared<CustomFeatureDetailCustomFormConfiguration | null>('configuration');
}

/** A {@link CustomFeature}'s `custom_feature`. */
export class CustomFeatureDetail extends Dto {
    static override FIELDS = {
        activityLogs: dtoList('any'),
        childCustomComponents: dtoList('any'),
        createdBy: 'any',
        createdOn: 'string',
        customComponent: 'any',
        customForms: dtoList(CustomFeatureDetailCustomForm),
        customObjects: dtoList('any'),
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

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    childCustomComponents = this.declared<Array<unknown | null> | null>('childCustomComponents');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customComponent = this.declared<unknown>('customComponent');
    customForms = this.declared<Array<CustomFeatureDetailCustomForm | null> | null>('customForms');
    customObjects = this.declared<Array<unknown | null> | null>('customObjects');
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

/** One page of what `getCustomFeatures` lists, under `data`. */
export class CustomFeatureList extends Dto {
    static override FIELDS = {
        data: dtoList(CustomFeatureDetail),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<CustomFeatureDetail | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    CustomFeature: [
        'POST /api/{api_version}/custom_feature',
        'PATCH /api/{api_version}/custom_feature/{custom_feature_id}',
        'POST /api/{api_version}/custom_feature/{custom_feature_id}',
    ],
    CustomFeatureList: ['GET /api/{api_version}/custom_feature'],
};

sealDtoSchema(
    CustomFeature,
    Attribute,
    Column1,
    Column2Attribute,
    Column2,
    Setting,
    Configuration,
    CustomForm,
    CustomFeatureDetailCustomFormConfigurationColumn1Attribute,
    CustomFeatureDetailCustomFormConfigurationColumn1,
    CustomFeatureDetailCustomFormConfigurationColumn2Attribute,
    CustomFeatureDetailCustomFormConfigurationColumn2,
    CustomFeatureDetailCustomFormConfigurationSettings,
    CustomFeatureDetailCustomFormConfiguration,
    CustomFeatureDetailCustomForm,
    CustomFeatureDetail,
    CustomFeatureList,
);
