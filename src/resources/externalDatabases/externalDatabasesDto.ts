/** Typed views over the v4 external databases bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The external databases body. */
export class ExternalDatabases extends Dto {
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

/** The external database body. */
export class ExternalDatabase extends Dto {
    static override ENVELOPE_KEY = 'external_database';

    static override FIELDS = {
        name: 'string',
        message: 'string',
        activityLogs: dtoList('any'),
    } as const;

    name = this.declared<string | null>('name');
    message = this.declared<string | null>('message');
    activityLogs = this.declared<Array<unknown | null> | null>('activityLogs');
}

/** The external database insert record body. */
export class ExternalDatabaseInsertRecord extends Dto {
    static override ENVELOPE_KEY = 'external_database';

    static override FIELDS = {
        success: 'boolean',
        message: 'string',
        insertedData: dtoList('any'),
    } as const;

    success = this.declared<boolean | null>('success');
    message = this.declared<string | null>('message');
    insertedData = this.declared<Array<unknown | null> | null>('insertedData');
}

/** The external database search body. */
export class ExternalDatabaseSearch extends Dto {
    static override ENVELOPE_KEY = 'external_database';

    static override FIELDS = {
        success: 'boolean',
        count: 'int',
        limit: 'int',
        offset: 'int',
        list: 'any',
    } as const;

    success = this.declared<boolean | null>('success');
    count = this.declared<number | null>('count');
    limit = this.declared<number | null>('limit');
    offset = this.declared<number | null>('offset');
    list = this.declared<unknown>('list');
}

/** The external database update records updated body. */
export class ExternalDatabaseUpdateRecordsUpdated extends Dto {
    static override ENVELOPE_KEY = 'external_database';

    static override FIELDS = {
        message: 'string',
    } as const;

    message = this.declared<string | null>('message');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    ExternalDatabases: [
        'GET /api/{api_version}/external_databases',
        'GET /api/{api_version}/external_databases/{db_name}',
        'GET /api/{api_version}/external_databases/{db_name}/tables/{table_name}',
    ],
    ExternalDatabase: ['POST /api/{api_version}/external_databases'],
    ExternalDatabaseInsertRecord: ['POST /api/{api_version}/external_databases/{db_name}/insert_records'],
    ExternalDatabaseSearch: ['POST /api/{api_version}/external_databases/{db_name}/search'],
    ExternalDatabaseUpdateRecordsUpdated: ['PATCH /api/{api_version}/external_databases/{db_name}/update_records'],
};

sealDtoSchema(
    ExternalDatabases,
    ExternalDatabase,
    ExternalDatabaseInsertRecord,
    ExternalDatabaseSearch,
    ExternalDatabaseUpdateRecordsUpdated,
);
