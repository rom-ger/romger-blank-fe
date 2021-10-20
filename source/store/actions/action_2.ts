import { createActions, action } from 'typed-actions';

import type { TypedAction } from '../../types/TypedAction';

export const ACTION_2_1 = 'action/2/1';
export const ACTION_2_2 = 'action/2/2';

export type Action21Param = {
    value21: string | null;
};

export type Action22Param = {
    value22: string | null;
};

export type Actions = {
    [ACTION_2_1]: (params: Action21Param) => TypedAction<Action21Param>;
    [ACTION_2_2]: (params: Action22Param) => TypedAction<Action22Param>;
};

// @ts-expect-error
const actions: Actions = createActions({
    [ACTION_2_1]: payload => action(payload),
    [ACTION_2_2]: payload => action(payload),
});

export const {
    [ACTION_2_1]: action_2_1,
    [ACTION_2_2]: action_2_2,
} = actions;
