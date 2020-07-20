import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import * as React from 'react';
import * as attachmentsActions from '../../actions/attachmentActions';
import { Attachment } from '../../models/attachmentModel';
import ContentDescriptor from '../../models/contentDescriptorModel';
import { AttachmentService } from '../../services/attachmentService';
import attachmentUploadTemplate from './attachmentUploadTemplate';

interface AttachmentUploadProps {
    disabled?: boolean;
    showSelectFile?: boolean;
    clearSelectAttachment?: {
        date: number;
        flag: boolean;
    };
    minIcon?: boolean;
    withoutButton?: boolean;
    label?: string;
    selectAttachment?: Attachment | null;
    updateCallback?(file: ContentDescriptor | null): any;
    removeCallback?(id: string): any;
    callbackBefore?(): Promise<any>;
}

interface AttachmentUploadState {
    attachment: any | null;
    errorText: string | null;
    errorLoad: boolean;
    openModal: boolean;
    loaded: boolean;
    hideInput: boolean;
}

export interface AttachmentUploadInterface extends RgReactBaseComponentInterface {
    props: AttachmentUploadProps;
    state: AttachmentUploadState;
    input: any;
    actionsModal: any[];
    removeAttachment: () => any;
    uploadAttachment(event: React.ChangeEvent<HTMLInputElement>): any;
    checkLoadedFile(): any;
    finishLoadAttachment(): any;
    showError(errorText: string): any;
    hideError(): any;
    closeModal(): any;
    openSelectFile(): any;
    downloadAttachment(): any;
}

/**
 * Компонент загрузки файлов на бек
 */
class AttachmentUpload
    extends RgReactBaseComponent<AttachmentUploadProps, AttachmentUploadState>
    implements AttachmentUploadInterface {
    input: any;
    readonly state: AttachmentUploadState = {
        attachment: null,
        errorText: null,
        openModal: false,
        loaded: false,
        errorLoad: false,
        hideInput: false,
    };

    componentDidMount() {
        if (!!this.props.selectAttachment) {
            this.updateSelectAttachment(this.props.selectAttachment);
        }
    }

    componentWillReceiveProps(newProps: AttachmentUploadProps) {
        if (
            !!this.props.clearSelectAttachment &&
            !!newProps.clearSelectAttachment &&
            this.props.clearSelectAttachment.date !==
                newProps.clearSelectAttachment.date &&
            !!newProps.clearSelectAttachment.flag
        ) {
            this.setState({
                attachment: this.props.showSelectFile
                    ? null
                    : this.state.attachment,
            });
        }
        if (!!newProps.selectAttachment) {
            this.updateSelectAttachment(newProps.selectAttachment);
        }
    }

    get actionsModal() {
        let array: any[] = [
            {
                isDefault: true,
                title: 'Отменить загрузку',
                onClick: () => this.closeModal(),
            },
        ];
        if (!this.state.loaded && !!this.state.errorText) {
            array.push({
                title: 'Выбрать файл',
                onClick: () => {
                    this.closeModal();
                    this.input.click();
                },
            });
        }
        if (!this.state.loaded && !!this.state.errorLoad) {
            array.push({
                title: 'Повторить',
                onClick: () => this.finishLoadAttachment(),
            });
        }
        return array;
    }

    /**
     * Закинуть в стейт вложение, если его передали через пропсы
     * @param attachment
     */
    updateSelectAttachment(attachment: Attachment) {
        this.setState({
            attachment: {
                type_file: attachment.mimeType ? attachment.mimeType.value : '',
                name: attachment.name,
                size: attachment.size,
                id: attachment.nodeId,
            },
        });
    }

    /**
     * Загрузить файл
     */
    uploadAttachment(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event || !event.target || !event.target.files) {
            return;
        }
        this.hideError();
        let file = event.target.files[0];
        if (this.input.files && this.input.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let fileInfo = AttachmentService.getFileField(e);
                fileInfo.name = this.input.files[0].name;
                fileInfo.multiPartFile = file;
                this.setState(
                    {
                        attachment: fileInfo,
                        hideInput: true,
                    },
                    () => {
                        this.checkLoadedFile();
                    },
                );
            };

            this.setState(
                {
                    openModal: true,
                    loaded: true,
                },
                () => reader.readAsDataURL(this.input.files[0]),
            );
        }
    }

    /**
     * Проверить загружаемый файл
     */
    checkLoadedFile() {
        if (!this.state.attachment) {
            return;
        }
        const MAX_SIZE_MEGABYTE = 20;
        if (
            this.state.attachment &&
            this.state.attachment.size &&
            this.state.attachment.size >
                AttachmentService.BYTE_OF_MEGABYTE * MAX_SIZE_MEGABYTE
        ) {
            this.showError(
                'Файл слишком большой! выберите файл размером меньше 20 МБ',
            );
            return this.setState({
                loaded: false,
            });
        }
        if (!this.state.attachment.icon) {
            this.showError('Недопустимое расширение файла');
            return this.setState({
                loaded: false,
            });
        }
        this.finishLoadAttachment();
    }

    /**
     * Загрузить файл на бек
     */
    finishLoadAttachment() {
        this.setState(
            {
                errorLoad: false,
                errorText: null,
                loaded: true,
            },
            () =>
                attachmentsActions
                    .createAttachment(this.state.attachment.multiPartFile)
                    .then((res: ContentDescriptor | null) => {
                        if (res) {
                            this.setState({
                                attachment: this.props.showSelectFile
                                    ? this.state.attachment
                                    : null,
                                openModal: false,
                                loaded: false,
                                errorLoad: false,
                                errorText: null,
                            });
                            if (this.props.updateCallback) {
                                this.props.updateCallback(res);
                            }
                        }
                    })
                    .catch(() => {
                        this.setState({
                            errorLoad: true,
                            loaded: false,
                            errorText: null,
                        });
                    }),
        );
    }

    /**
     * Показать ошибку
     */
    showError(errorText: string) {
        this.setState({
            errorText,
        });
    }

    /**
     * Скрыть ошибку
     */
    hideError() {
        this.setState({
            errorText: null,
        });
    }

    /**
     * Закрыть модалку
     */
    closeModal(): any {
        this.setState({
            errorLoad: false,
            loaded: false,
            errorText: null,
            attachment: null,
            openModal: false,
        });
    }

    /**
     * Открыть выбор файла
     */
    openSelectFile(): any {
        if (!this.props.callbackBefore) {
            return this.setState({ hideInput: false }, () =>
                this.input.click(),
            );
        }
        return this.props
            .callbackBefore()
            .then(() =>
                this.setState({ hideInput: false }, () => this.input.click()),
            );
    }

    /**
     * Удалить вложение
     */
    removeAttachment = () => {
        if (!this.state.attachment) {
            return;
        }
        let id: string = this.state.attachment.id;
        this.setState(
            {
                attachment: null,
            },
            () => {
                if (this.props.updateCallback) {
                    this.props.updateCallback(null);
                }
                if (!!id && !!this.props.removeCallback) {
                    this.props.removeCallback(id);
                }
            },
        );
    }

    /**
     * Скачать вложение
     */
    downloadAttachment() {
        if (!this.state.attachment || !this.state.attachment.id) {
            return;
        }
        attachmentsActions.downloadAttachment(this.state.attachment.id);
    }

    render(): false | JSX.Element {
        return (attachmentUploadTemplate(this));
    }
}

export default AttachmentUpload;
