import { combineEpics } from 'redux-observable';

import epic1 from './epic1';
import routes from '../../routers/new/epics';

export const rootEpic = combineEpics(
    epic1,
    routes,
);
