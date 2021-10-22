// @ts-expect-error
import loadable from '@loadable/component';

import { key as app } from '../../containers/App/constants';
import { key as layout } from '../../containers/Layout/constants';
import { key as temp, tempPageName } from '../../containers/Temp/constants';

import {
    homePath,
    tempPath,
} from './constants';

const routes = {
    [app]: {
        path: homePath,
        exact: false,
        pageName: null,
        component: loadable(() => import('../../containers/App')),
    },
    [layout]: {
        path: homePath,
        exact: false,
        pageName: null,
        component: loadable(() => import('../../containers/Layout')),
    },
    [temp]: {
        path: tempPath,
        pageName: tempPageName,
        exact: true,
        component: loadable(() => import('../../containers/Temp')),
    },
};

export type Routes = typeof routes;

export type RouteName = keyof typeof routes;

export type Route = typeof routes[RouteName];

export default routes;
