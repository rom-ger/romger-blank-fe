import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers/rootReducer';
import { rootEpic } from './epics/rootEpic';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const store = createStore(
        rootReducer,
        {
            reducer1: {},
            reducer2: {},
        },
        applyMiddleware(epicMiddleware),
    );

    // @ts-expect-error
    epicMiddleware.run(rootEpic);

    return store;
}
