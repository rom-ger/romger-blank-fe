import Immutable from 'seamless-immutable';
import { handleActions } from 'redux-actions';

import type { Routes as AppRoutes } from './';

export type State = AppRoutes;

export const routes = handleActions({}, Immutable.from({}));
