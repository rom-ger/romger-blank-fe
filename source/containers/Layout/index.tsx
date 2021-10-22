import React from 'react';

import AppRoutes from '../../routers/new/AppRoutesComponent';
import { key as tempRoute } from '../Temp/constants';

const pageRouteNames = [
    tempRoute,
];

const Layout = () => {
    return (
        <div
            className="wrap"
        >
            layout
            <AppRoutes
                routeNames={ pageRouteNames }
            />
        </div>
    );
};

export default Layout;
