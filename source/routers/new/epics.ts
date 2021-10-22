import { map, withLatestFrom, filter, debounceTime } from 'rxjs/operators';
import { pipe, EMPTY, Observable } from 'rxjs';
import { ofType, combineEpics } from 'redux-observable';
import { push, replace } from 'connected-react-router';
import { generatePath } from 'react-router';
import { stringify } from 'query-string';
import { isEmpty } from 'lodash';

import type { Epic } from '../../types/Epic';
import { getQueryParams, getCurrentRouteParams, getClosestRoute, getIsAppRoutePath } from './selectors';

import { PUSH, redirect, SET_PARAMS, REDIRECT_TO_ROUTE, METHODS, Actions, OPEN_URL, PUSH_URL, REDIRECT } from './actions';
import { State } from '../../store/reducers';

export const setRouteParams: Epic<Actions> = (action$, state$) =>
    action$.pipe(
        ofType<any>(SET_PARAMS),
        filter(({ payload }) => !isEmpty(payload.params) || !isEmpty(payload.query)),
        withLatestFrom(state$),
        map(([{ payload }, state]) => {
            const { params, query, method } = payload;
            // @ts-expect-error
            const { params: routeParams, path } = getClosestRoute(state);
            const routeQuery = getQueryParams(state);

            const search = stringify({ ...routeQuery, ...query });
            const url = generatePath(path, { ...routeParams, ...params }) + (search && `?${search}`);

            if (method === METHODS.REPLACE) {
                return replace(url);
            }

            return push(url);
        }),
    );

export const pushRoute: Epic<Actions> = (action$, state$) =>
    action$.pipe(
        ofType<any>(PUSH),
        withLatestFrom(state$),
        map(([{ payload }, state]) => {
            const { routePath, params, query } = payload;
            const defaultParams = getCurrentRouteParams(state);
            const search = stringify(query);
            const path = generatePath(routePath, { ...defaultParams, ...params }) + (search && `?${search}`);

            return push(path);
        }),
    );

export const redirectToRoute: Epic<Actions> = action$ =>
    action$.pipe(
        ofType<any>(REDIRECT_TO_ROUTE),
        map(({ payload }) => {
            const { routePath, params, query } = payload;
            const search = stringify(query);
            const path = generatePath(routePath, params) + (search && `?${search}`);

            return redirect(path);
        }),
    );

const mapIsOnAppRoute = (state$: Observable<State>) =>
    pipe(
        withLatestFrom(state$),
        map(([url, state]: [string, State]) => [url, getIsAppRoutePath(state, url)]),
    );

const mapToPayload = map(({ payload }) => payload);

export const openUrl: Epic<Actions> = (action$) => {
    action$.pipe(ofType<any>(OPEN_URL))
            .subscribe(({ payload }) => {
                window.open(payload.url, '_blank');
            });

    return EMPTY;
};

export const pushUrl: Epic<Actions> = (action$, state$) => {
    const pushAction$ = action$.pipe(
        ofType<any>(PUSH_URL),
        mapToPayload,
        mapIsOnAppRoute(state$),
    );

    pushAction$.pipe(filter(([, isAppRoutePath]) => !isAppRoutePath))
        .subscribe(([url]: [string]) => {
            window.location.assign(url);
        });

    return pushAction$.pipe(
        filter(([, isAppRoutePath]) => Boolean(isAppRoutePath)),
        debounceTime(50),
        map(([url]: [string]) => push(url)),
    );
};

export const redirectToUrl: Epic<Actions> = (action$, state$) => {
    const redirectAction$ = action$.pipe(
        ofType<any>(REDIRECT),
        mapToPayload,
        mapIsOnAppRoute(state$),
    );

    // внешние роуты редиректим через window
    redirectAction$.pipe(filter(([, isAppRoutePath]) => !isAppRoutePath))
        .subscribe(([url]: [string]) => {
            window.location.replace(url);
        });

    // внутренние роуты редиректим через react-router
    return redirectAction$.pipe(
        filter(([, isAppRoutePath]) => Boolean(isAppRoutePath)),
        debounceTime(50),
        map(([url]: [string]) => {
            return replace(url);
        }),
    );
};

export default combineEpics(setRouteParams, pushRoute, redirectToRoute);
