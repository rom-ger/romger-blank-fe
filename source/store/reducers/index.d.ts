import { State as State1 } from './reducer_1';
import { State as State2 } from './reducer_2';

export type State = {
    reducer1: State1;
    reducer2: State2;
}
