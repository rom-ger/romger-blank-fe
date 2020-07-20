import { FlexBox } from '@romger/react-flex-layout';
import { RgReactBaseModal } from '@romger/react-modal-dialog';
import { RgReactSpinner } from '@romger/react-spinner';
import classnames from 'classnames';
import * as React from 'react';
import ReactSVG from 'react-svg';
import { AttachmentService } from '../../services/attachmentService';
import { AttachmentUploadInterface } from './attachmentUploadComponent';

const attachmentUploadTemplate = (
    context: AttachmentUploadInterface,
): JSX.Element | false => {
    const currentWidth = 400;
    return (
        <div
            className={classnames('attachment-modal')}
        >
            <RgReactBaseModal
                title="Загрузка файла"
                closeCallback={() => context.closeModal()}
                show={context.state.openModal}
                currentWidth={currentWidth}
                actions={context.actionsModal}
            >
                {!!context.state.attachment && (
                    <div
                        className={classnames('attachment-modal__wrap')}
                    >
                        <div
                            className={classnames('attachment-modal__name')}
                        >
                            {context.state.attachment.name}
                        </div>
                        {(!!context.state.errorText ||
                            !!context.state.errorLoad) && (
                            <div
                                className={classnames(
                                    'attachment-modal__error-text',
                                )}
                            >
                                {!!context.state.errorLoad
                                    ? 'Что-то пошло не так, мы не смогли загрузить файл'
                                    : context.state.errorText}
                            </div>
                        )}
                        {!!context.state.loaded && (
                            <RgReactSpinner
                                context={{
                                    loading: true,
                                }}
                                inline={true}
                                component="BarLoader"
                                height={10}
                                color="#004cb0"
                            />
                        )}
                    </div>
                )}
            </RgReactBaseModal>
            {!!context.state.attachment && !!context.props.showSelectFile ? (
                <FlexBox
                    row="start ctr"
                    className={classnames('attachment-upload__wrap', {
                        pointer: !!context.props.disabled,
                    })}
                    onClick={() =>
                        context.props.disabled
                            ? context.downloadAttachment()
                            : null
                    }
                >
                    <ReactSVG
                        src={`assets/images/svg/mime/${
                            context.state.attachment.type_file
                                ? AttachmentService.getMimeType(
                                      context.state.attachment.type_file,
                                  )
                                : ''
                        }.svg`}
                        className={classnames('attachment-upload__icon-type')}
                    />
                    <FlexBox
                        flex={true}
                        column="ctr stretch"
                    >
                        <div
                            className={classnames(
                                'body-2--primary',
                                'text-overflow',
                                'attachment-upload__name',
                            )}
                        >
                            {context.state.attachment.name}
                        </div>
                        <div
                            className={classnames(
                                'caption-2--placeholder',
                                'attachment-upload__size',
                            )}
                        >
                            {AttachmentService.getSizeText(
                                context.state.attachment.size,
                            )}
                        </div>
                    </FlexBox>
                    {!context.props.disabled && (
                        <i
                            className={classnames(
                                'material-icons',
                                'attachment-upload__close',
                            )}
                            onClick={context.removeAttachment}
                        >
                            close
                        </i>
                    )}
                </FlexBox>
            ) : !context.props.withoutButton ? (
                <FlexBox
                    row="start ctr"
                >
                    {context.props.minIcon ? (
                        <ReactSVG
                            className={classnames(
                                'attachment-upload__min-icon',
                            )}
                            onClick={() => context.openSelectFile()}
                            src="assets/images/svg/baseline-attachment-24px.svg"
                        />
                    ) : (
                        <FlexBox
                            className={classnames('dictionary-list__button')}
                            onClick={() => context.openSelectFile()}
                            row="start ctr"
                        >
                            <ReactSVG
                                src="assets/images/svg/outline-cloud_upload-24px.svg"
                            />
                            <span>Загрузить файл</span>
                        </FlexBox>
                    )}
                </FlexBox>
            ) : null}
            {!context.state.hideInput && (
                <input
                    onChange={e => context.uploadAttachment(e)}
                    ref={node => (context.input = node)}
                    type="file"
                    style={{ display: 'none' }}
                />
            )}
        </div>
    );
};

export default attachmentUploadTemplate;
