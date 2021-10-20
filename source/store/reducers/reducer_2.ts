// @ts-expect-error
import { handleActions } from 'typed-actions/weak';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';

import {
    ACTION_2_1,
    ACTION_2_2,
    Action21Param,
    Action22Param,
} from '../actions/action_2';
import type { TypedAction } from '../../types/TypedAction';

export type State = {
    value21: string | null;
    value22: string | null;
};

type ImmutableState = ImmutableType<State>;

const actions = handleActions(
    {
        [ACTION_2_1]: (state: ImmutableState, { payload }: TypedAction<Action21Param>) => {
            return {
                ...state,
                value21: payload.value21,
            };
        },
        [ACTION_2_2]: (state: ImmutableState, { payload }: TypedAction<Action22Param>) => {
            return {
                ...state,
                value22: payload.value22,
            };
        },
    },
    Immutable.from({
        value11: null,
        value12: null,
    }),
);

export default actions;
