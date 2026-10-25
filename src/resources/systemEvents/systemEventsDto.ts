/** Typed views over the v4 system events bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The settings system event body, under `system_event`. */
export class SettingsSystemEvent extends Dto {
    static override ENVELOPE_KEY = 'system_event';

    static override FIELDS = {
        baseEvent: 'boolean',
        createdBy: 'any',
        createdOn: 'string',
        description: 'any',
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
    description = this.declared<unknown>('description');
    displayName = this.declared<string | null>('displayName');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    lastUpdatedBy = this.declared<unknown>('lastUpdatedBy');
    lastUpdatedOn = this.declared<string | null>('lastUpdatedOn');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    status = this.declared<string | null>('status');
}

/** One page of `SettingsSystemEvent` records, under `data`. */
export class SettingsSystemEventList extends Dto {
    static override FIELDS = {
        data: dtoList(SettingsSystemEvent),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<SettingsSystemEvent | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    SettingsSystemEvent: [
        'GET /api/{api_version}/settings/system_events',
        'GET /api/{api_version}/settings/system_events/{system_event_id}',
    ],
    SettingsSystemEventList: ['GET /api/{api_version}/settings/system_events'],
};

sealDtoSchema(SettingsSystemEvent, SettingsSystemEventList);
