import React, { Fragment } from 'react';

import AppRoutes from '../../routers/new/AppRoutesComponent';
import { key as layoutRoute } from '../Layout/constants';

const routeNames = [layoutRoute];

const App = () => (
    <Fragment>
        app
        <AppRoutes
            routeNames={ routeNames }
        />
    </Fragment>
);

export default App;
