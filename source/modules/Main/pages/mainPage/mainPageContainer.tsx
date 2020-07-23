import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { inject, observer } from 'mobx-react';
import { AuthService } from '../../../Auth/services/authServices';
import mainPageTemplate from './mainPageTemplate';

export interface MainPageProps {
    globalStore?: GlobalStore;
}
export interface MainPageState {
    userName: string | null;
}

export interface MainPageInterface extends RgReactBaseComponentInterface {
    state: MainPageState;
    props: MainPageProps;
}

export class MainPage extends RgReactBaseComponent<MainPageProps, MainPageState>
    implements MainPageInterface {
    readonly state: MainPageState = {
        userName: null,
    };

    componentDidMount() {
        this.getUserName();
    }

    /**
     * Получаем имя пользователя
     */
    getUserName(): void {
        if (!AuthService.getUserInfo()) {
            return;
        }
        let user = AuthService.getUserInfo();
        this.setState({
            userName: user.currentUserId,
        });
    }

    render(): false | JSX.Element {
        return (mainPageTemplate(this));
    }
}

export default inject('globalStore')(observer(MainPage));
