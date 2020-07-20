import * as t from 'io-ts';
import MIME_ICONS from '../enums/mimeIcons';
import { AttachmentService } from '../services/attachmentService';
import { MimeIconObjectInterface } from './../interfaces/mimeIconObjectInterface';

export const AttachmentType = t.interface({
    nodeId: t.union([t.string, t.null]),
    name: t.union([t.string, t.null]),
    size: t.union([t.number, t.null]),
    mimeType: t.union([t.string, t.null]),
});

export interface AttachmentDTO extends t.TypeOf<typeof AttachmentType> {}

class Attachment {
    nodeId: string | null;
    name: string | null;
    size: number | null;
    mimeType: MimeIconObjectInterface | null;

    constructor(params: AttachmentDTO) {
        this.nodeId = params.nodeId;
        this.name = params.name;
        this.size = params.size;
        this.mimeType = params.mimeType ? MIME_ICONS[params.mimeType] : null;
    }

    get sizeText(): string {
        return AttachmentService.getSizeText(this.size ? this.size : 0);
    }
}

export { Attachment };
