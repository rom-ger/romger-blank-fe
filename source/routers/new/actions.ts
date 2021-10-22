import { createActions, action } from 'typed-actions';

type Params = {
    [key: string]: any,
};

type RouteParams = {
    routePath: string,
    params?: Params,
    query?: Params,
};

export const METHODS = {
    PUSH: 'PUSH',
    REPLACE: 'REPLACE',
};

type Method = keyof typeof METHODS;

type SetParams = {
    params?: Params,
    query?: Params,
    method?: Method,
};

type OpenUrlParams = {
    url: string,
};

export const PUSH = 'router/PUSH';
export const PUSH_URL = 'router/PUSH_URL';
export const OPEN_URL = 'router/OPEN_URL';
export const SET_PARAMS = 'router/SET_PARAMS';
export const REDIRECT = 'router/REDIRECT';
export const REDIRECT_TO_ROUTE = 'router/REDIRECT_TO_ROUTE';

const actions = createActions({
    [OPEN_URL]: (data: OpenUrlParams) => action(data),
    [PUSH]: (data: RouteParams) => action(data),
    [REDIRECT_TO_ROUTE]: (data: RouteParams) => action(data),
    [SET_PARAMS]: (data: SetParams) => action(data),
    [REDIRECT]: (url: string) => action(url),
    [PUSH_URL]: (url: string) => action(url),
});

export type Actions = typeof actions;

export const {
    [PUSH]: push,
    [OPEN_URL]: openUrl,
    [SET_PARAMS]: setParams,
    [REDIRECT]: redirect,
    [PUSH_URL]: pushUrl,
    [REDIRECT_TO_ROUTE]: redirectToRoute,
} = actions;
