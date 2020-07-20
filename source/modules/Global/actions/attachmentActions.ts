import { RgReactBaseService } from '@romger/react-base-components';
import ContentDescriptor, { ContentDescriptorDTO } from '../models/contentDescriptorModel';
import { globalConfig } from './../../../config/globalConfig';
import { BaseActions } from './baseActions';

export class AttachmentsActions extends BaseActions {
    static DEFAULT_URL = `${globalConfig.api}/cs-service/containers/`;
}

/**
 * Получить информацию по контейнеру
 */
export function getContainerInfo(
    nodeId: string,
): Promise<ContentDescriptor> {
    return AttachmentsActions.API_RESOURCE(
        `${nodeId}/info`,
        RgReactBaseService.GET_METHOD,
    )
    .then((res: ContentDescriptorDTO) => new ContentDescriptor(res));
}

/**
 * Загрузить вложение на сервер
 * @param {*} attachment
 */
export function createAttachment(attachment: any) {
    const formData = new FormData();
    formData.append('data', attachment, attachment.name);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    return AttachmentsActions.API_RESOURCE(
        'create',
        RgReactBaseService.POST_METHOD,
        formData,
        config,
    )
    .then(res => (res ? new ContentDescriptor(res) : null));
}

/**
 * Скачать вложение
 * @param {*} attachmentId
 * @param {*} format
 */
export function downloadAttachment(attachmentId: string, format: any = null) {
    let url = `${AttachmentsActions.DEFAULT_URL}${attachmentId}`;
    if (format) {
        url = `${url}?format=${format}`;
    }
    // window.open(url, 'download');
    let a: any = document.createElement('A');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/**
 * Получить вложение
 * @param {*} callback
 * @param {*} attachmentId
 */
export function getSrcAttachment(
    mimeType: string,
    attachmentId: string,
    callback: any,
    format: any = null,
) {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        let reader = new FileReader();
        reader.onloadend = () => {
            let result: string =
                !!reader && !!reader.result && typeof reader.result === 'string'
                    ? reader.result
                    : '';
            callback(
                result.substr(0, result.indexOf(':') + 1) +
                    mimeType +
                    result.substr(result.indexOf(';'), result.length - 1),
                attachmentId,
            );
        };
        reader.readAsDataURL(xhr.response);
    };
    let url = `${AttachmentsActions.DEFAULT_URL}${attachmentId}`;
    if (format) {
        url = `${url}?format=${format}`;
    }
    xhr.open('GET', `${url}`);
    xhr.responseType = 'blob';
    xhr.send();
}

/**
 * Получить ссылку на вложение
 * @param {*} callback
 * @param {*} attachmentId
 */
export function getLinkAttachment(attachmentId: string, format: any = null) {
    let url = `${AttachmentsActions.DEFAULT_URL}${attachmentId}`;
    if (format) {
        url = `${url}?format=${format}`;
    }
    return url;
}

/**
 * Скачиваем бинарный файл
 * @param {Object} res
 * @param {string} fileName
 * @private
 */
export function downloadBinary(res: any, fileName: any = null) {
    const testFileName = 'TEST.xls';
    let blob = new Blob([res.data], { type: res.headers['content-type'] });
    let url = window.URL.createObjectURL(blob);
    let a = window.document.createElement('a');
    let resFileName = fileName
        ? fileName
        : res.headers['content-disposition']
        ? res.headers['content-disposition'].split(';')[1]
        : testFileName;
    /**
     * Если мы используем замечательный браузер IE11, то для сохранения блоба нужно вызвать IE-шное api
     */
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, resFileName);
        return;
    }
    a.setAttribute('style', 'display: none');
    a.setAttribute('href', url);
    a.setAttribute('download', resFileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
