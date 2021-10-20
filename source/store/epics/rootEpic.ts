import { combineEpics } from 'redux-observable';

import epic1 from './epic1';

export const rootEpic = combineEpics(
    epic1,
);
