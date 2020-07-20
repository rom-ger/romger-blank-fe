export interface MimeTypesInterface {
    [value: string]: string;
    'application/postscript': string;
    'video/x-msvideo': string;
    'text/css': string;
    'text/csv': string;
    'application/msword': string;
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': string;
    'image/vnd.dwg': string;
    'application/x-msdownload': string;
    'text/html': string;
    'image/jpeg': string;
    'application/javascript': string;
    'application/json': string;
    'video/mp4': string;
    'application/pdf': string;
    'image/png': string;
    'application/vnd.ms-powerpoint': string;
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': string;
    'image/vnd.adobe.photoshop': string;
    'application/rtf': string;
    'image/svg+xml': string;
    'text/plain': string;
    'application/vnd.ms-excel': string;
    'application/vnd.ms-excel.sheet.macroenabled.12': string;
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': string;
    'application/xml': string;
    'application/zip': string;
}

export const MIME_TYPES: MimeTypesInterface = {
    'application/postscript': 'ai',
    'video/x-msvideo': 'avi',
    'text/css': 'css',
    'text/csv': 'csv',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'doc',
    'image/vnd.dwg': 'dwg',
    'application/x-msdownload': 'exe',
    'text/html': 'html',
    'image/jpeg': 'jpg',
    'application/javascript': 'js',
    'application/json': 'json',
    'video/mp4': 'mp4',
    'application/pdf': 'pdf',
    'image/png': 'png',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        'ppt',
    'image/vnd.adobe.photoshop': 'psd',
    'application/rtf': 'rtf',
    'image/svg+xml': 'svg',
    'text/plain': 'txt',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.ms-excel.sheet.macroenabled.12': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xls',
    'application/xml': 'xml',
    'application/zip': 'zip',
};
