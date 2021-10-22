import React, { ComponentType, useContext, memo } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { map } from 'lodash';
import { compose } from 'recompose';

import { getReactRouterRoutesCollection } from './selectors';
import type { RouteName } from './';

const AppRoutesContext = React.createContext({});

export const AppRoutesProvider = AppRoutesContext.Provider;

type AppRoutesProps = {
    routeNames: RouteName[],
};

const AppRoutes = ({ routeNames }: AppRoutesProps) => {
    const routes = useSelector(getReactRouterRoutesCollection);

    const featureComponents: any = useContext(AppRoutesContext);

    const routesCopy = { ...routes };
    return (
        <Switch>
            {map(routeNames, (routeName: RouteName) => {
                const { component } = featureComponents[routeName];

                return <Route
                    key={ routeName }
                    { ...routesCopy[routeName] }
                    component={ component }
                />;
            })}
        </Switch>
    );
};

type AppRoutesEnhancedProps = {
    routeNames: string[],
};

const AppRoutesContainer = (props: any) => <AppRoutes
    {...props}
/>;

// @ts-expect-error
const EnhancedAppRoutesContainer: ComponentType<AppRoutesEnhancedProps> = compose(
    memo,
    withRouter,
)(AppRoutesContainer);

export default EnhancedAppRoutesContainer;
