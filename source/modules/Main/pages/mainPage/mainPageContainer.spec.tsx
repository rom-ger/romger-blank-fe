import { globalStore } from '@romger/react-global-module/lib/store';
import { shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import * as React from 'react';
import MainPageContainer, { MainPage, MainPageInterface, MainPageProps, MainPageState } from './mainPageContainer';

describe('MainPage', () => {
    let mainPageContainer: React.Component<MainPageProps, MainPageState, any> | null = null;
    let mainPage: MainPageInterface | null = null;
    // let spy = null;
    const stores = { globalStore };
    // window.scrollTo = () => null;
    let createInstance: () => MainPageInterface = (pathname = '') => shallow(
        <MainPage
            globalStore={globalStore}
        />,
    )
    .instance();

    beforeEach(() => {
        mainPage = createInstance();
    });

    it('should render a main page container', () => {
        mainPageContainer = shallow(
            <Provider
                {...stores}
            >
                <MainPageContainer
                />
            </Provider>,
        );
        expect(mainPageContainer)
            .toMatchSnapshot();
    });

    it('can be initialized without an initializer', () => {
        expect(mainPage?.state.userName)
            .toEqual(null);
    });

    it('getUserName', () => {
        if (!mainPage) {
            return;
        }
        const spyGetUserName = jest.spyOn(mainPage, 'getUserName');
        mainPage.componentDidMount();
        expect(spyGetUserName)
            .toBeCalled();
    });
});
