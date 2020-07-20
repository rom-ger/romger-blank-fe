import { FlexBox } from '@romger/react-flex-layout';
import { RgReactBaseModal } from '@romger/react-modal-dialog';
import classnames from 'classnames';
import * as React from 'react';
import ReactSVG from 'react-svg';
import { AttachmentService } from '../../services/attachmentService';
import { AttachmentInfoInterface } from './attachmentInfoComponent';

const attachmentInfoTemplate = (
    context: AttachmentInfoInterface,
): JSX.Element | false => {
    const currentWidth = 400;
    return (
        <div
            className={classnames('attachment-info')}
        >
            <RgReactBaseModal
                show={context.props.show && !context.state.showUserInfoModal}
                closeCallback={() => context.props.closeCallback()}
                title="Свойства документа"
                currentWidth={currentWidth}
            >
                <FlexBox
                    column="start stretch"
                    className={classnames('attachment-info__wrap')}
                >
                    <FlexBox
                        row="start"
                        className={classnames('attachment-info__line-info')}
                    >
                        <div
                            className={classnames(
                                'attachment-info__title-info',
                            )}
                        >
                            Имя
                        </div>
                        <div
                            className={classnames('attachment-info__text-info')}
                        >
                            {context.props.attachment.name}
                        </div>
                    </FlexBox>
                    <FlexBox
                        row="start"
                        className={classnames('attachment-info__line-info')}
                    >
                        <div
                            className={classnames(
                                'attachment-info__title-info',
                            )}
                        >
                            Размер
                        </div>
                        <div
                            className={classnames('attachment-info__text-info')}
                        >
                            {context.props.attachment.size
                                ? AttachmentService.getSizeText(
                                      context.props.attachment.size,
                                  )
                                : ''}
                        </div>
                    </FlexBox>
                    {/* <FlexBox
                        row="start"
                        className={classnames(
                            'attachment-info__line-info'
                        )}
                    >
                        <div
                            className={classnames(
                                'attachment-info__title-info'
                            )}
                        >
                            Тип
                        </div>
                        <div
                            className={classnames(
                                'attachment-info__text-info'
                            )}
                        >
                            {context.props.attachment.name}
                        </div>
                    </FlexBox> */}
                    <FlexBox
                        row="start"
                        className={classnames('attachment-info__line-info')}
                    >
                        <div
                            className={classnames(
                                'attachment-info__title-info',
                            )}
                        >
                            Загрузил
                        </div>
                        <div
                            className={classnames(
                                'attachment-info__text-info',
                                'dictionary-list__href',
                            )}
                            onClick={() => context.updateState<boolean>(true, 'showUserInfoModal')}
                        >
                            {context.state.author}
                        </div>
                    </FlexBox>
                    {!context.props.unshowDownload && (
                        <FlexBox
                            rowWrap="end ctr"
                            className={classnames(
                                'rg-react-base-modal__button-wrap',
                            )}
                        >
                            <div />
                            <div>
                                <FlexBox
                                    row="start ctr"
                                    className={classnames(
                                        'rg-react-base-modal__button',
                                    )}
                                    onClick={() =>
                                        context.props.attachment.nodeId
                                            ? context.downloadAttachment(
                                                  context.props.attachment
                                                      .nodeId,
                                              )
                                            : null
                                    }
                                >
                                    <ReactSVG
                                        src="assets/images/svg/outline-cloud_download-24px.svg"
                                    />
                                    <span>Скачать</span>
                                </FlexBox>
                            </div>
                        </FlexBox>
                    )}
                </FlexBox>
            </RgReactBaseModal>
        </div>
    );
};

export default attachmentInfoTemplate;
