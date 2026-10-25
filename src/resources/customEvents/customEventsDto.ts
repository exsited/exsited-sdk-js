/** Typed views over the v4 custom events bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings custom event body, under `custom_event`. */
export class SettingsCustomEvent extends Dto {
    static override ENVELOPE_KEY = 'custom_event';

    static override FIELDS = {
        baseEvent: 'boolean',
        createdBy: 'any',
        createdOn: 'string',
        description: 'string',
        displayName: 'string',
        href: 'string',
        id: 'string',
        lastUpdatedBy: 'any',
        lastUpdatedOn: 'string',
        name: 'string',
        object: 'string',
        status: 'string',
    } as const;

    baseEvent = this.declared<boolean | null>('baseEvent');
    createdBy = this.declared<unknown>('createdBy');
    createdOn = this.declared<string | null>('createdOn');
    description = this.declared<string | null>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsCustomEvent` records, under `data`. */
export class SettingsCustomEventList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsCustomEvent),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsCustomEvent | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsCustomEvent: [
        'GET /api/{api_version}/settings/custom_events',
        'GET /api/{api_version}/settings/custom_events/{custom_event_id}',
    ],
    SettingsCustomEventList: ['GET /api/{api_version}/settings/custom_events'],
};

sealDtoSchema(SettingsCustomEvent, SettingsCustomEventList);
