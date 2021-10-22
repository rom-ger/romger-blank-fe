import Immutable from 'seamless-immutable';
import { getLocation } from 'connected-react-router';
import { matchPath, generatePath } from 'react-router';
import { createSelector } from 'reselect';
import { mapValues, castArray, uniqBy, sortBy, last } from 'lodash';
import queryString from 'query-string';

import type { State } from '../../store/reducers';
import type { RouteName } from './';
import type { State as RoutesCollection } from './reducer';

export const getRoutesCollectionSafe = (state: State) => state.routes;

export const getRoutesCollection = createSelector(
    getRoutesCollectionSafe,
    routesCollection => Immutable(routesCollection)
        .asMutable({ deep: true }),
);
export const getRoute = (state: State, routeName: RouteName) => getRoutesCollection(state)[routeName];

export const getPathname = createSelector(
    [getLocation],
    ({ pathname }) => pathname,
);

export const getReactRouterRoutesCollection = createSelector(
    [getRoutesCollection],
    routesCollection => mapValues(routesCollection, ({ path, exact }) => ({ path, exact })),
);

export const getRoutePathFromCollection = (routes: RoutesCollection, routeName: RouteName): string[] =>
    castArray(routes[routeName].path);

export const getRoutePath = createSelector(
    [getRoutesCollection, (state: State, routeName: RouteName) => routeName],
    getRoutePathFromCollection,
);

export const getSearch = (state: State) => getLocation(state).search;

export const getQueryParams = createSelector(
    [getSearch],
    queryString.parse,
);

export const getCurrentUrl = createSelector(
    [getLocation],
    ({ pathname, search }) => `${pathname}${search}`,
);

export const makeGetCurrentRouteNames = () =>
    createSelector(
        [getRoutesCollection, getPathname],
        (routes, pathname) =>
            Object.keys(routes)
                  .reduce(
                (acc: RouteName[], routeName: RouteName) => {
                    const currentRoute = routes[routeName];

                    const path = getRoutePathFromCollection(routes, routeName)
                        .find(curPath =>
                            matchPath(pathname, { path: curPath, exact: currentRoute.exact }),
                        );

                    if (!path) {
                        return acc;
                    }

                    return acc.concat(routeName);
                },
                [],
            ),
    );

export const getCurrentRouteNames = makeGetCurrentRouteNames();

export const getCurrentRoutes = createSelector(
    [getCurrentRouteNames, getRoutesCollection, getPathname],
    (routeNames, routesCollection, pathname) =>
        routeNames.map((routeName) => {
            const route = routesCollection[routeName];
            const paths = getRoutePathFromCollection(routesCollection, routeName);

            return {
                ...route,
                routeName,
                path: paths.find(path => matchPath(pathname, { path, exact: route.exact })),
            };
        }),
);

export const getClosestRoute = createSelector(
    [getCurrentRoutes, getPathname],
    (routes, pathname) => {
        const matchedRoutes = routes.map(({ path, exact }) =>
            matchPath(pathname, {
                path,
                exact,
            }),
        );

        // находим уникальные паттерны, сортируем по возрастанию урлы и берем самую длинную
        return last(sortBy(uniqBy(matchedRoutes, 'path'), 'url'));
    },
);

export const makeGetSomeRoutesActive = (...routeNames: RouteName[]) =>
    createSelector(
        [getCurrentRouteNames],
        currentRouteNames => routeNames.some(routeName => currentRouteNames.includes(routeName)),
    );

export const makeGetIsOnRoute = (routeName: RouteName) => {
    // этот селектор используется в операторе и в него будет попадать
    // не обязательно последний экземпляр стейта, что бы не терялась мемоизация оригинального селектора,
    // создаем свой экземпляр
    const getRouteNames = makeGetCurrentRouteNames();

    return createSelector(
        getRouteNames,
        routeNames => routeNames.includes(routeName),
    );
};

export type Params = {
    [key: string]: any,
};

export const makeGetRouteQueryParams = (...routeNames: RouteName[]) => {
    const getIsOnRoute = makeGetSomeRoutesActive(...routeNames);

    return (state: State) => (getIsOnRoute(state) ? getQueryParams(state) : ({}));
};

export const getIsAppRoutePathByRoutes = (routesCollection: RoutesCollection, routePath: string) => {
    const { url } = queryString.parseUrl(routePath);

    return Object.keys(routesCollection)
                 .some((routeName: RouteName) =>
        getRoutePathFromCollection(routesCollection, routeName)
            .some(path => matchPath(url, { path, exact: true })),
    );
};

export const getIsAppRoutePath: (state: State, routePath: string) => boolean = createSelector(
    [getRoutesCollection, (state: State, routePath: string) => routePath],
    getIsAppRoutePathByRoutes,
);

// параметры по умолчанию для переданного роута
// параметры текущих роутов, входящих в переданный
export const makeGetRouteDefaultParams = (routeName: RouteName) =>
    createSelector(
        [getRoutesCollection, getCurrentRoutes, getPathname],
        (routes, currentRoutes, pathname) => {
            const targetRoutePaths = getRoutePathFromCollection(routes, routeName);

            return currentRoutes.reduce(
                (resultParams, { path, exact }) => {
                    if (targetRoutePaths.some(targetRoutePath => targetRoutePath.startsWith(path || ''))) {
                        // @ts-expect-error
                        const { params } = matchPath(pathname, { path, exact });

                        return Object.assign(resultParams, params);
                    }

                    return resultParams;
                },
                {},
            );
        },
    );

export const getCurrentRouteParams = createSelector(
    [getCurrentRoutes, getPathname],
    (currentRoutes, pathname) =>
        currentRoutes.reduce(
            (resultParams, { path, exact }) => {
                // @ts-expect-error
                const { params } = matchPath(pathname, { path, exact });

                return {
                    ...resultParams,
                    ...params,
                };
            },
            ({}),
        ),
);

export const getPageNameByPath = createSelector(
    [getCurrentRoutes, (state: State, path: string) => path],
    (currentRoutes, path) => currentRoutes.find(el => el.path === path && el.pageName)?.pageName ?? '',
);

export const getCurrentPath = createSelector(
    [getCurrentRoutes, getPathname],
    (currentRoutes, pathname) =>
        currentRoutes
            .reduce((acc: string[], { path }) => acc.concat(path || ''), [])
            .find(path => matchPath(pathname, { path, exact: true })),
);

export const getCurrentRouteTimeout = createSelector(
    [getRoutesCollection, getCurrentRouteNames],
    (routes, currentRouteNames) =>
        currentRouteNames.reduce(
            (maximalTimeout, routeName) => {
                // @ts-expect-error
                const { timeout } = routes[routeName];

                if (timeout && timeout > maximalTimeout) {
                    return timeout;
                }

                return maximalTimeout;
            },
            0,
        ) || 3000,
);

export type GetRouteUrlParams = {
    routePath?: string,
    params?: Params,
    query?: Params,
    keepQuery?: boolean,
};

export const getRouteUrl = (state: State, { routePath, params, query = {}, keepQuery }: GetRouteUrlParams) => {
    let url = generatePath(routePath || getCurrentPath(state) || '', {
        ...getCurrentRouteParams(state),
        ...params,
    });
    let queryParams = '';
    if (keepQuery) {
        queryParams = queryString.stringify({
            ...getQueryParams(state),
            ...query,
        });
    } else {
        queryParams = queryString.stringify(query);
    }

    if (queryParams) {
        url = `${url}?${queryParams}`;
    }

    return url;
};
