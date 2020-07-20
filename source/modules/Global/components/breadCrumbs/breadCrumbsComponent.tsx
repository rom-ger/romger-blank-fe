import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import { inject, observer } from 'mobx-react';
import { GlobalStore } from '../../../Global/store/globalStore';
import { BreadCrumbsItems } from '../../interfaces/breadCrumbsItems';
import breadCrumbsTemplate from './breadCrumbsTemplate';

interface BreadCrumbsProps {
    globalStore?: GlobalStore;
    items: BreadCrumbsItems[];
}

export interface BreadCrumbsInterface extends RgReactBaseComponentInterface {
    props: BreadCrumbsProps;
}

@inject('globalStore')
@observer
export class BreadCrumbs extends RgReactBaseComponent<BreadCrumbsProps, {}> implements BreadCrumbsInterface {
    render(): false | JSX.Element {
        return (breadCrumbsTemplate(this));
    }
}

export default BreadCrumbs;
