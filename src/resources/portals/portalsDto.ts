/** Typed views over the v4 portals bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';

/** One entry of `portals` on {@link User}. */
export class Portal extends Dto {
    static override FIELDS = {
        account: 'string',
        displayName: 'string',
        uuid: 'string',
    } as const;

    account = this.declared<string | null>('account');
    displayName = this.declared<string | null>('displayName');
    uuid = this.declared<string | null>('uuid');
}

/** The `user` block of {@link PortalLogin}. */
export class User extends Dto {
    static override FIELDS = {
        type: 'string',
        name: 'string',
        emailAddress: 'string',
        imageUri: 'string',
        grantAccessPortal: 'boolean',
        portals: dtoList(Portal),
    } as const;

    type = this.declared<string | null>('type');
    name = this.declared<string | null>('name');
    emailAddress = this.declared<string | null>('emailAddress');
    imageUri = this.declared<string | null>('imageUri');
    grantAccessPortal = this.declared<boolean | null>('grantAccessPortal');
    portals = this.declared<Array<Portal | null> | null>('portals');
}

/** The portal login body. */
export class PortalLogin extends Dto {
    static override ENVELOPE_KEY = 'portal';

    static override FIELDS = {
        user: User,
    } as const;

    user = this.declared<User | null>('user');
}

/** The portal change password body. */
export class PortalChangePassword extends Dto {
    static override ENVELOPE_KEY = 'portal';

    static override FIELDS = {
        message: 'string',
    } as const;

    message = this.declared<string | null>('message');
}

/** The portal reset link body. */
export class PortalResetLink extends Dto {
    static override FIELDS = {
        object: 'string',
        message: 'string',
    } as const;

    object = this.declared<string | null>('object');
    message = this.declared<string | null>('message');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    PortalLogin: ['POST /api/{api_version}/portal/login'],
    PortalChangePassword: ['POST /api/{api_version}/portal/change_password'],
    PortalResetLink: ['POST /api/{api_version}/portal/reset_link'],
};

sealDtoSchema(PortalLogin, PortalChangePassword, PortalResetLink, Portal, User);
