// import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import MainRouter from './routers/mainRouter';

export const AppConfig = () => {
    return (
        <div>
            {/* {process.env.NODE_ENV === 'development' && <DevTools />} */}
            <MainRouter />
        </div>
    );
};
