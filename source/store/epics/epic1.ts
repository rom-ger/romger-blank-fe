import { ofType, combineEpics } from 'redux-observable';
import { map } from 'rxjs/operators';

import type { Epic } from '../../types/Epic';
import type { State } from '../reducers';
import {
    ACTION_1_1,
    Actions,
    action_1_2 as actionAction_1_2,
} from '../actions/action_1';

export const value1ToValue2: Epic<Actions, State> = actions$ =>
    actions$.pipe(
        ofType<any>(ACTION_1_1),
        map(() => actionAction_1_2({ value12: '321' })),
    );

export default combineEpics(
    value1ToValue2,
);
