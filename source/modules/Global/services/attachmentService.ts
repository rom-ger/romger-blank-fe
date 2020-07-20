import MIME_ICONS from '../enums/mimeIcons';
import { MIME_TYPES } from './../enums/mimeTypes';

/*eslint no-magic-numbers: [2, { "ignore": [1024,1048576] }]*/

export class AttachmentService {

    static BYTE_OF_KILOBYTE = 1024;
    static BYTE_OF_MEGABYTE = 1048576;
    static LOADER_SRC = './assets/images/loader.gif';
    static DEFAULT_MIME_TYPE_ICON = 'file';

    /**
     * Получить необходимую информацию по файлу
     * @param {*} file
     */
    static getFileField(file: any) {
        let forIteration = 1;
        let doublePoint3IndexCheck = -1;
        let result: any = {};
        let doublePointIndex = file.target.result.indexOf(':');
        let doublePoint2Index = file.target.result.indexOf(';');
        let doublePoint3Index = file.target.result.indexOf(',');
        result.type_file = file.target.result.substr(doublePointIndex + forIteration, doublePoint2Index - doublePointIndex - forIteration);
        if (doublePoint3Index === doublePoint3IndexCheck) {
            doublePoint3Index = doublePoint2Index;
        }
        result.base_64 = file.target.result.substr(doublePoint3Index + forIteration, file.target.result.length - doublePoint3Index - forIteration);
        result.url_encode = encodeURIComponent(result.base_64);
        result.size = file.total;
        result.result = file.target.result;
        result.sizeText = AttachmentService.getSizeText(file.total);
        result.icon = MIME_ICONS[result.type_file] ? MIME_ICONS[result.type_file].icon : null;
        return result;
    }

    /**
     * Получить размер файла
     * @param {*} byte
     */
    static getSizeText(byte: number): string {
        let modRoundNum = 2;
        if (byte < AttachmentService.BYTE_OF_KILOBYTE) {
            return `${byte} байт`;
        } else if (byte < AttachmentService.BYTE_OF_MEGABYTE) {
            return `${this.modRound((byte / AttachmentService.BYTE_OF_KILOBYTE), modRoundNum)} КБ`;
        } else {
            return `${this.modRound((byte / AttachmentService.BYTE_OF_MEGABYTE), modRoundNum)} МБ`;
        }
    }

    /**
     * Округлить число
     * @param {*} value
     * @param {*} precision
     */
    static modRound(value: any, precision: any) {
        let powNum = 10;
        let precisionNumber = Math.pow(powNum, precision);
        return Math.round(value * precisionNumber) / precisionNumber;
    }

    /**
     * Получаем формат по mime
     * @param mimeType
     * @returns {*}
     */
    static getMimeType(mimeType: string) {
        let findMimeType = MIME_TYPES[mimeType];
        if (findMimeType) {
            return findMimeType;
        }

        return AttachmentService.DEFAULT_MIME_TYPE_ICON;
    }
}
