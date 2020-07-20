import { MimeIconObjectInterface } from './../interfaces/mimeIconObjectInterface';

export interface MimeIconsInterface {
    [value: string]: MimeIconObjectInterface;
    'image/jpeg': MimeIconObjectInterface;
    'image/gif': MimeIconObjectInterface;
    'application/pdf': MimeIconObjectInterface;
    'image/png': MimeIconObjectInterface;
}

const MIME_ICONS: MimeIconsInterface = {
    'image/jpeg': {
        icon: 'assets/images/mime/jpg.png',
        value: 'image/jpeg',
        isImage: true,
    },
    'image/gif': {
        icon: 'assets/images/mime/gif.png',
        value: 'image/gif',
        isImage: true,
    },
    'application/pdf': {
        icon: 'assets/images/mime/pdf.png',
        value: 'application/pdf',
        isImage: false,
    },
    'image/png': {
        icon: 'assets/images/mime/png.png',
        value: 'image/png',
        isImage: true,
    },
    'application/msword': {
        icon: 'assets/images/mime/doc.png',
        value: 'application/msword',
        isImage: false,
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        icon: 'assets/images/mime/doc.png',
        value:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        isImage: false,
    },
    'application/vnd.ms-powerpoint': {
        icon: 'assets/images/mime/ppt.png',
        value: 'application/vnd.ms-powerpoint',
        isImage: false,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
        icon: 'assets/images/mime/ppt.png',
        value:
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        isImage: false,
    },
    'application/rtf': {
        icon: 'assets/images/mime/rtf.png',
        value: 'application/rtf',
        isImage: false,
    },
    'text/plain': {
        icon: 'assets/images/mime/txt.png',
        value: 'text/plain',
        isImage: false,
    },
    'application/vnd.ms-excel': {
        icon: 'assets/images/mime/xls.png',
        value: 'application/vnd.ms-excel',
        isImage: false,
    },
    'application/vnd.ms-excel.sheet.macroenabled.12': {
        icon: 'assets/images/mime/xls.png',
        value: 'application/vnd.ms-excel.sheet.macroenabled.12',
        isImage: false,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        icon: 'assets/images/mime/xls.png',
        value:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        isImage: false,
    },
};

export default MIME_ICONS;
