import type { Action } from 'redux';

export interface TypedAction<P = {}, M = string | null | undefined> extends Action<string> {
    payload: P;
    meta: M;
}
