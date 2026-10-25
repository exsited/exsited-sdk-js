/** Typed views over the v4 note attachments bodies. */

import {Dto, sealDtoSchema} from '../../dto.js';

/** The note attachment body, under `note_attachment`; `base64` is the file itself. */
export class NoteAttachment extends Dto {
    static override ENVELOPE_KEY = 'note_attachment';

    static override FIELDS = {
        base64: 'string',
        id: 'string',
        name: 'string',
        object: 'string',
        size: 'int',
    } as const;

    base64 = this.declared<string | null>('base64');
    id = this.declared<string | null>('id');
    name = this.declared<string | null>('name');
    object = this.declared<string | null>('object');
    size = this.declared<number | null>('size');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    NoteAttachment: ['GET /api/{api_version}/note_attachment/{attachment_uuid}'],
};

sealDtoSchema(NoteAttachment);
