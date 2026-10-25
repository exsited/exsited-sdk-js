/** Typed views over the v4 events bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The event body. */
export class Event extends Dto {
    static override ENVELOPE_KEY = 'event';

    static override FIELDS = {
        createdOn: 'string',
        eventName: 'string',
        executedOn: 'string',
        href: 'string',
        id: 'string',
        object: 'string',
        resourceType: 'string',
        resourceUuid: 'string',
        scheduledToExecuteOn: 'string',
        status: 'string',
    } as const;

    createdOn = this.declared<string | null>('createdOn');
    eventName = this.declared<string | null>('eventName');
    executedOn = this.declared<string | null>('executedOn');
    href = this.declared<string | null>('href');
    id = this.declared<string | null>('id');
    object = this.declared<string | null>('object');
    resourceType = this.declared<string | null>('resourceType');
    resourceUuid = this.declared<string | null>('resourceUuid');
    scheduledToExecuteOn = this.declared<string | null>('scheduledToExecuteOn');
    status = this.declared<string | null>('status');
}

/** A page of Event records. */
export class EventList extends Dto {
    static override FIELDS = {
        data: dtoList(Event),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<Event | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    Event: [
        'GET /api/{api_version}/events',
        'GET /api/{api_version}/events/{event_uuid}',
        'POST /api/{api_version}/events/{event_uuid}/remove',
    ],
    EventList: ['GET /api/{api_version}/events'],
};

sealDtoSchema(Event, EventList);
