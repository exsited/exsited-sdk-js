/** Typed views over the v4 integration connections bodies. */

import {Dto, sealDtoSchema} from '../../dto.js';
import {Pagination} from '../common/paginationDto.js';

/** The integration connections body. */
export class IntegrationConnections extends Dto {
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
    IntegrationConnections: ['GET /api/{api_version}/integration_connections'],
};

sealDtoSchema(IntegrationConnections);
