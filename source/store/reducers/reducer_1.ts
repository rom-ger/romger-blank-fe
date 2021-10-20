// @ts-expect-error
import { handleActions } from 'typed-actions/weak';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';

import {
    ACTION_1_1,
    ACTION_1_2,
    Action11Param,
    Action12Param,
} from '../actions/action_1';
import type { TypedAction } from '../../types/TypedAction';

export type State = {
    value11: string | null;
    value12: string | null;
};

type ImmutableState = ImmutableType<State>;

const actions = handleActions(
    {
        [ACTION_1_1]: (state: ImmutableState, { payload }: TypedAction<Action11Param>) => {
            return {
                ...state,
                value11: payload.value11,
            };
        },
        [ACTION_1_2]: (state: ImmutableState, { payload }: TypedAction<Action12Param>) => {
            return {
                ...state,
                value12: payload.value12,
            };
        },
    },
    Immutable.from({
        value11: null,
        value12: null,
    }),
);

export default actions;
