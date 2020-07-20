import { DynamicImport } from '@romger/react-global-module/lib/components';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../modules/Global/notFoundContainer';

export default class CabinetRouter extends React.Component<{
    history?: any;
    location?: any;
}> {
    render() {
        const parentUrl = '/cabinet';
        return (
            <Switch>
                <Route
                    exact={true}
                    path={`${parentUrl}/main`}
                    component={(props: any) => <DynamicImport
                        load={() => import('../modules/Main/pages/mainPage/mainPageContainer')}
                        propsParent={props}
                    />}
                />
                <Route
                    exact={true}
                    path={`${parentUrl}/users/list`}
                    component={(props: any) => <DynamicImport
                        load={() => import('../modules/Users/page/list/userListComponent')}
                        propsParent={props}
                    />}
                />
                <Route
                    exact={true}
                    path={`${parentUrl}/user/:id/view`}
                    component={(props: any) => <DynamicImport
                        load={() => import('../modules/Users/page/view/userViewContainer')}
                        propsParent={props}
                    />}
                />
                <Route
                    exact={true}
                    path={`${parentUrl}/user/:id/edit`}
                    component={(props: any) => <DynamicImport
                        load={() => import('../modules/Users/page/edit/userEditContainer')}
                        propsParent={props}
                    />}
                />
                <Route
                    exact={true}
                    path={`${parentUrl}/user/create`}
                    component={(props: any) => <DynamicImport
                        load={() => import('../modules/Users/page/create/userCreateContainer')}
                        propsParent={props}
                    />}
                />
                <Route
                    component={NotFound}
                />
            </Switch>
        );
    }
}
