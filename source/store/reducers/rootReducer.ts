import { combineReducers } from 'redux';
import reducer1 from '../reducers/reducer_1';
import reducer2 from '../reducers/reducer_2';
import { routes } from '../../routers/new/reducer';

const rootReducer = combineReducers({
    reducer1,
    reducer2,
    routes,
    // @ts-expect-error
    router: {},
});

export default rootReducer;
