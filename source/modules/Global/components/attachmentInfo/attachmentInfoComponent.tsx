import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import { inject, observer } from 'mobx-react';
import * as attachmentActions from '../../../Global/actions/attachmentActions';
import { GlobalStore } from '../../../Global/store/globalStore';
import { Attachment } from '../../models/attachmentModel';
import attachmentInfoTemplate from './attachmentInfoTemplate';

interface AttachmentInfoProps {
    globalStore?: GlobalStore;
    attachment: Attachment;
    show: boolean;
    unshowDownload?: boolean;
    closeCallback(): any;
}

interface AttachmentInfoState {
    show: boolean;
    showUserInfoModal: boolean;
    author: any;
}

export interface AttachmentInfoInterface extends RgReactBaseComponentInterface {
    state: AttachmentInfoState;
    props: AttachmentInfoProps;
    downloadAttachment(nodeId: string): void;
}

@inject('globalStore')
@observer
export class AttachmentInfo
    extends RgReactBaseComponent<AttachmentInfoProps, AttachmentInfoState>
    implements AttachmentInfoInterface {
    readonly state: AttachmentInfoState = {
        show: false,
        showUserInfoModal: false,
        author: null,
    };

    componentDidMount() {
        this.setState({
            show: this.props.show,
        });
    }

    componentWillReceiveProps(newProps: AttachmentInfoProps) {
        this.setState({
            show: newProps.show,
        });
    }

    /**
     * Скачаем вложение
     * @param nodeId
     */
    downloadAttachment(nodeId: string): void {
        attachmentActions.downloadAttachment(nodeId);
    }

    render(): false | JSX.Element {
        return (attachmentInfoTemplate(this));
    }
}

export default AttachmentInfo;
