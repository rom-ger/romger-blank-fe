import { createSelector, Selector } from 'reselect';

import { State } from '../reducers';
import { State as State1 } from '../reducers/reducer_1';

export const getReducer1: Selector<State, State1> = (state: State) => state.reducer1;

export const getValue11: Selector<State, string | null> = createSelector(
    [getReducer1],
    (reducer1: State1) => reducer1.value11,
);

export const getValue12: Selector<State, string | null> = createSelector(
    [getReducer1],
    (reducer1: State1) => reducer1.value12,
);
