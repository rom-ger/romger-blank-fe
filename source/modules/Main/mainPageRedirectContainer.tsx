import { RgReactBaseContainer } from '@romger/react-base-components';
import * as React from 'react';
import { Redirect } from 'react-router-dom';

interface MainPageRedirectProps {
    global: any;
}
export class MainPageRedirect extends RgReactBaseContainer<
    MainPageRedirectProps,
    {}
> {
    render() {
        return <Redirect
            to="/cabinet/main"
            push={true}
        />;
    }
}

export default MainPageRedirect;
