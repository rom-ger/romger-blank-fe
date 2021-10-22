import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { AppRoutesProvider } from './routers/new/AppRoutesComponent';
import { Provider as ReduxProvider } from 'react-redux';
import reducerStore from './store/store';
import routes from './routers/new';
import App from './containers/App';

const { store, history } = reducerStore();

export const AppConfig = () => {
    return (
        <div>
            <AppRoutesProvider
                value={ routes }
            >
                <ReduxProvider
                    store={ store }
                >
                    <ConnectedRouter
                        history={ history }
                    >
                        <App />
                    </ConnectedRouter>
                </ReduxProvider>
            </AppRoutesProvider>
        </div>
    );
};
