import * as moment from 'moment';
import MIME_ICONS from '../enums/mimeIcons';
import { MimeIconObjectInterface } from './../interfaces/mimeIconObjectInterface';

export interface ContentDescriptorDTO {
    nodeId: string;
    nodeName?: string;
    fileSize?: number;
    lastModified?: string;
    version?: string;
    availableFormats?: string[];
    mediaType?: string;
}

class ContentDescriptor {
    nodeId: string;
    nodeName?: string;
    size?: number;
    lastModified?: Date | null;
    version?: string;
    availableFormats?: string[];
    mimeType?: MimeIconObjectInterface | null;

    constructor(params: ContentDescriptorDTO) {
        this.nodeId = params.nodeId;
        this.nodeName = params.nodeName;
        this.size = params.fileSize;
        this.lastModified = params.lastModified ? moment(params.lastModified)
                                                        .toDate() : null;
        this.version = params.version;
        this.availableFormats = params.availableFormats ? params.availableFormats : [];
        this.mimeType = params.mediaType ? MIME_ICONS[params.mediaType] : null;
    }
}

export default ContentDescriptor;
