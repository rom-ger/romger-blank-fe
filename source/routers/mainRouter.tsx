import { DynamicImport } from '@romger/react-global-module/lib/components';
import { globalStore } from '@romger/react-global-module/lib/store';
import { Provider } from 'mobx-react';
import { Provider as ReduxProvider } from 'react-redux';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../modules/Global/notFoundContainer';
import MainPageRedirect from '../modules/Main/mainPageRedirectContainer';
import CabinetWrap from '../modules/Wrappers/cabinetWrap/cabinetWrapContainer';
import MainWrap from '../modules/Wrappers/mainWrap/mainWrapComponent';
import reducerStore from '../store/store';

const stores = { globalStore };

export default class MainRouter extends React.Component<{
    history?: any;
    location?: any;
}> {
    render() {
        return (
            <ReduxProvider
                store={reducerStore().store}
            >
                <Provider
                    {...stores}
                >
                    <HashRouter>
                            <Switch>
                                <MainWrap
                                    location={this.props.location}
                                >
                                    <Switch>
                                        <Route
                                            exact={true}
                                            path="/"
                                            component={MainPageRedirect}
                                        />
                                        <Route
                                            exact={true}
                                            path="/login"
                                            component={(props: any) => <DynamicImport
                                                load={() => import('../modules/Auth/pages/login/loginContainer')}
                                                propsParent={props}
                                            />}
                                        />
                                        <Route
                                            path="/cabinet"
                                            component={CabinetWrap}
                                        />
                                        <Route
                                            component={NotFound}
                                        />
                                    </Switch>
                                </MainWrap>
                                <Route
                                    component={NotFound}
                                />
                            </Switch>
                    </HashRouter>
                </Provider>
            </ReduxProvider>
        );
    }
}
