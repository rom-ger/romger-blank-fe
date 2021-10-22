import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers/rootReducer';
import { rootEpic } from './epics/rootEpic';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const history = createBrowserHistory();

    const store = createStore(
        rootReducer,
        {
            reducer1: {},
            reducer2: {},
            router: connectRouter(history),
            // @ts-expect-error
            routes: {},
        },
        applyMiddleware(routerMiddleware(history), epicMiddleware),
    );

    epicMiddleware.run(rootEpic);

    return { store, history };
}
