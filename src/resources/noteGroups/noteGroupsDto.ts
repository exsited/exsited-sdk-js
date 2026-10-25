/** Typed views over the v4 note groups bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The note group body. */
export class NoteGroup extends Dto {
    static override ENVELOPE_KEY = 'note_group';

    static override FIELDS = {
        activityLogs: dtoList('any'),
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
        version: 'int',
    } as const;

    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
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
    version = this.declared<number | null>('version');
}

/** A page of NoteGroup records. */
export class NoteGroupList extends Dto {
    static override FIELDS = {
        data: dtoList(NoteGroup),
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<Array<NoteGroup | null> | null>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** The note group notes body. */
export class NoteGroupNotes extends Dto {
    static override FIELDS = {
        data: 'any',
        object: 'string',
        pagination: Pagination,
        url: 'string',
    } as const;

    data = this.declared<unknown>('data');
    object = this.declared<string | null>('object');
    pagination = this.declared<Pagination | null>('pagination');
    url = this.declared<string | null>('url');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    NoteGroup: [
        'GET /api/{api_version}/note_groups',
        'GET /api/{api_version}/note_groups/{note_group_id}',
        'POST /api/{api_version}/note_groups',
        'PATCH /api/{api_version}/note_groups/{note_group_id}',
    ],
    NoteGroupList: ['GET /api/{api_version}/note_groups'],
    NoteGroupNotes: ['GET /api/{api_version}/note_groups/{note_group_id}/notes'],
};

sealDtoSchema(NoteGroup, NoteGroupList, NoteGroupNotes);
