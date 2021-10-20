import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(
    rootReducer,
    {
        reducer1: {},
        reducer2: {},
    },
);

export default store;
