import { createActions, action } from 'typed-actions';

import type { TypedAction } from '../../types/TypedAction';

export const ACTION_1_1 = 'action/1/1';
export const ACTION_1_2 = 'action/1/2';

export type Action11Param = {
    value11: string | null;
};

export type Action12Param = {
    value12: string | null;
};

export type Actions = {
    [ACTION_1_1]: (params: Action11Param) => TypedAction<Action11Param>;
    [ACTION_1_2]: (params: Action12Param) => TypedAction<Action12Param>;
};

// @ts-expect-error
const actions: Actions = createActions({
    [ACTION_1_1]: payload => action(payload),
    [ACTION_1_2]: payload => action(payload),
});

export const {
    [ACTION_1_1]: action_1_1,
    [ACTION_1_2]: action_1_2,
} = actions;
