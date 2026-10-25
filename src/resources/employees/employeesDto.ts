/** Typed views over the v4 employees bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The `custom_form` block of {@link Employee}. */
export class CustomForm extends Dto {
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

/** The `name` block of {@link Contact}. */
export class Name extends Dto {
    static override FIELDS = {
        salutation: 'any',
        first: 'string',
        middle: 'any',
        last: 'string',
        designation: 'any',
    } as const;

    salutation = this.declared<unknown>('salutation');
    first = this.declared<string | null>('first');
    middle = this.declared<unknown>('middle');
    last = this.declared<string | null>('last');
    designation = this.declared<unknown>('designation');
}

/** The `email` block of {@link Contact}. */
export class Email extends Dto {
    static override FIELDS = {
        address: 'string',
        emailOptedOut: 'boolean',
    } as const;

    address = this.declared<string | null>('address');
    emailOptedOut = this.declared<boolean | null>('emailOptedOut');
}

/** The `created_by` block of {@link Contact}. */
export class CreatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** One entry of `contacts` on {@link Employee}. */
export class Contact extends Dto {
    static override FIELDS = {
        object: 'string',
        id: 'string',
        status: 'string',
        type: 'string',
        name: Name,
        email: Email,
        phone: 'any',
        fax: 'any',
        mobile: 'any',
        address: 'any',
        createdOn: 'string',
        lastUpdatedOn: 'any',
        createdBy: CreatedBy,
        lastUpdatedBy: 'any',
        version: 'int',
    } as const;

    object = this.declared<string | null>('object');
    id = this.declared<string | null>('id');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    name = this.declared<Name | null>('name');
    email = this.declared<Email | null>('email');
    phone = this.declared<unknown>('phone');
    fax = this.declared<unknown>('fax');
    mobile = this.declared<unknown>('mobile');
    address = this.declared<unknown>('address');
    createdOn = this.declared<string | null>('createdOn');
    lastUpdatedOn = this.declared<unknown>('lastUpdatedOn');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    version = this.declared<number | null>('version');
}

/** The `last_updated_by` block of {@link Employee}. */
export class LastUpdatedBy extends Dto {
    static override FIELDS = {
        object: 'string',
        name: 'string',
    } as const;

    object = this.declared<string | null>('object');
    name = this.declared<string | null>('name');
}

/** The employee body. */
export class Employee extends Dto {
    static override ENVELOPE_KEY = 'employee';

    static override FIELDS = {
        activityLogs: dtoList('any'),
        code: 'string',
        contacts: dtoList(Contact),
        createdBy: CreatedBy,
        createdOn: 'string',
        customAttributes: 'any',
        customForm: CustomForm,
        description: 'string',
        displayName: 'string',
        emailAddress: 'string',
        href: 'string',
        id: 'string',
        imageUuid: 'any',
        lastUpdatedBy: LastUpdatedBy,
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
    code = this.declared<string | null>('code');
    contacts = this.declared<Array<Contact | null> | null>('contacts');
    createdBy = this.declared<CreatedBy | null>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    customAttributes = this.declared<unknown>('customAttributes');
    customForm = this.declared<CustomForm | null>('customForm');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    emailAddress = this.declared<string | null>('emailAddress');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    imageUuid = this.declared<unknown>('imageUuid');
    lastUpdatedBy = this.declared<LastUpdatedBy | null>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
    version = this.declared<number | null>('version');
}

/** A page of Employee records. */
export class EmployeeList extends Dto {
    static override FIELDS = {
        data: dtoList(Employee),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Employee | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Employee: [
        'GET /api/{api_version}/employees',
        'GET /api/{api_version}/employees/{employee_id}',
        'POST /api/{api_version}/employees',
        'PATCH /api/{api_version}/employees/{employee_id}',
    ],
    EmployeeList: ['GET /api/{api_version}/employees'],
};

sealDtoSchema(Employee, EmployeeList, CustomForm, Name, Email, CreatedBy, Contact, LastUpdatedBy);
