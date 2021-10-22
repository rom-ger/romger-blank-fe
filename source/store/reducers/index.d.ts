import { State as State1 } from './reducer_1';
import { State as State2 } from './reducer_2';
import { Routes } from '../../routers/new';

export type State = {
    reducer1: State1;
    reducer2: State2;
    routes: Routes;
    router: any;
}
