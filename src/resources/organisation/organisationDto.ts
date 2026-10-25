/** Typed views over the v4 organisation bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';

/** A {@link SettingsOrganisation}'s `parent_organization`. */
export class SettingsOrganisationParentOrganization extends Dto {
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

/** The root organisation body, under `organization`. */
export class SettingsOrganisation extends Dto {
    static override ENVELOPE_KEY = 'organization';

    static override FIELDS = {
        address_line1: 'any',
        address_line2: 'any',
        address_line3: 'any',
        address_line4: 'any',
        address_line5: 'any',
        city: 'any',
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
        details: 'any',
        displayName: 'string',
        email: 'any',
        fax: 'any',
        faxAreaCode: 'any',
        faxCountryCode: 'any',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        mobile: 'any',
        mobileAreaCode: 'any',
        mobileCountryCode: 'any',
        name: 'string',
        nodes: dtoList('any'),
        object: 'string',
        parentOrganization: SettingsOrganisationParentOrganization,
        phone: 'any',
        phoneAreaCode: 'any',
        phoneCountryCode: 'any',
        postCode: 'any',
        state: 'any',
        status: 'string',
        type: 'string',
        website: 'any',
    } as const;

    address_line1 = this.declared<unknown>('address_line1');
    address_line2 = this.declared<unknown>('address_line2');
    address_line3 = this.declared<unknown>('address_line3');
    address_line4 = this.declared<unknown>('address_line4');
    address_line5 = this.declared<unknown>('address_line5');
    city = this.declared<unknown>('city');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<unknown>('description');
    details = this.declared<unknown>('details');
    displayName = this.declared<string | null>('displayName');
    email = this.declared<unknown>('email');
    fax = this.declared<unknown>('fax');
    faxAreaCode = this.declared<unknown>('faxAreaCode');
    faxCountryCode = this.declared<unknown>('faxCountryCode');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    mobile = this.declared<unknown>('mobile');
    mobileAreaCode = this.declared<unknown>('mobileAreaCode');
    mobileCountryCode = this.declared<unknown>('mobileCountryCode');
    name = this.declared<string | null>('name');
    nodes = this.declared<Array<unknown | null> | null>('nodes');
    object = this.declared<string | null>('object');
    parentOrganization = this.declared<SettingsOrganisationParentOrganization | null>('parentOrganization');
    phone = this.declared<unknown>('phone');
    phoneAreaCode = this.declared<unknown>('phoneAreaCode');
    phoneCountryCode = this.declared<unknown>('phoneCountryCode');
    postCode = this.declared<unknown>('postCode');
    state = this.declared<unknown>('state');
    status = this.declared<string | null>('status');
    type = this.declared<string | null>('type');
    website = this.declared<unknown>('website');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsOrganisation: ['GET /api/{api_version}/settings/organisation'],
};

sealDtoSchema(SettingsOrganisationParentOrganization, SettingsOrganisation);
