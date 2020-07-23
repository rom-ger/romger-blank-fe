import { RgReactBaseComponentInterface, RgReactBaseContainer } from '@romger/react-base-components';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { RgReactSpinner } from '@romger/react-spinner';
import isEqual from 'lodash.isequal';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import { Redirect } from 'react-router-dom';
import { ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MainWrapProps {
    children: any;
    globalStore?: GlobalStore;
    location: any;
}

export interface MainWrapInterface extends RgReactBaseComponentInterface {
    props: MainWrapProps;
    startRedirect: boolean;
}

@inject('globalStore')
@observer
export class MainWrap extends RgReactBaseContainer<MainWrapProps, {}> implements MainWrapInterface {
    startRedirect: boolean = false;

    constructor(props: MainWrapProps) {
        super(props);
        if (this.props.globalStore) {
            this.props.globalStore.handlerPressControl();
        }
    }

    componentDidMount() {
        if (this.props.globalStore) {
            this.props.globalStore.setLocation(this.props.location);
        }
    }

    componentWillReceiveProps(newProps: MainWrapProps) {
        if (!isEqual(newProps.location, this.props.location) && !!this.props.globalStore) {
            this.props.globalStore.setLocation(newProps.location);
        }
    }

    render(): false | JSX.Element {
        if (!!this.props.globalStore && !!this.props.globalStore.redirect && !this.startRedirect) {
            this.startRedirect = true;
        } else if (!!this.startRedirect && !!this.props.globalStore) {
            this.startRedirect = false;
            this.props.globalStore.clearRedirect();
        }
        return (
            <>
                {
                    this.props.globalStore && this.props.globalStore.loading &&
                    <RgReactSpinner
                        context={{ loading: true }}
                        component="BeatLoader"
                        size={16}
                        margin="6px"
                        color="#004cb0"
                    />
                }
                {
                    !!this.props.globalStore && !!this.props.globalStore.redirect && !!this.startRedirect
                        ?
                        <Redirect
                            to={this.props.globalStore.redirect}
                            push={true}
                        />
                        :
                        this.props.children
                }
                <ToastContainer
                    toastClassName="global-toast"
                    position={ToastPosition.BOTTOM_RIGHT}
                />
            </>
        );
    }
}

export default MainWrap;
