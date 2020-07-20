import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { GlobalStore } from '../../../Global/store/globalStore';
import wsTabsTemplate from './wsTabsTemplate';

interface RgTabsProps {
    globalStore?: GlobalStore;
    tabs: RgTabItem[];
}

interface RgTabsState {
    selectIndex: number;
}

export interface RgTabItem {
    title: string;
    body: JSX.Element;
}

export interface RgTabsInterface extends RgReactBaseComponentInterface {
    state: RgTabsState;
    props: RgTabsProps;
    selectTab(index: number): void;
}

@inject('globalStore')
@observer
export default class RgTabs extends RgReactBaseComponent<RgTabsProps, RgTabsState> implements RgTabsInterface {
    readonly state: RgTabsState = {
        selectIndex: 0,
    };

    /**
     * Выбрать таб
     * @param index
     */
    selectTab(index: number): void {
        this.setState({
            selectIndex: index,
        });
    }

    render(): false | JSX.Element {
        return (
            <>
                {
                    wsTabsTemplate(this)
                }
            </>
        );
    }
}
