import { RgReactBaseComponentInterface, RgReactBaseContainer, RgReactBaseService } from '@romger/react-base-components';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';
import * as authActions from '../../actions/authActions';
import USER_ROLE from '../../enums/userRoles';
import { AuthService } from '../../services/authServices';
import loginTemplate from './loginTemplate';

interface LoginPageProps {
    globalStore: GlobalStore;
}

interface LoginPageState {
    email: string;
    password: string;
    errorMessage: string;
}

export interface LoginPageInterface extends RgReactBaseComponentInterface {
    state: LoginPageState;
    props: LoginPageProps;
    login(): Promise<any> | undefined;
    loginIsValid(): boolean;
    whoami(): Promise<any> | undefined;
}

@inject('globalStore')
@observer
export class LoginPage extends RgReactBaseContainer<LoginPageProps, LoginPageState> implements LoginPageInterface {
    readonly state: LoginPageState = {
        email: '',
        password: '',
        errorMessage: '',
    };

    /**
     * Форма авторизации валидна
     */
    loginIsValid() {
        return !!this.state.email && !!this.state.password;
    }

    /**
     * Авторизоваться
     */
    login(): Promise<any> | undefined {
        this.setState({
            errorMessage: '',
        });
        if (!this.loginIsValid()) {
            this.setState({
                errorMessage: 'Для входа введите все данные',
            });
            return;
        }
        return this.promiseWithLoading(authActions.token(this.state.email, this.state.password))
            .then(() => this.whoami())
            .catch(() => {
                this.setState({
                    errorMessage: 'Неверный e-mail или пароль',
                });
            });
    }

    /**
     * Получить данные о пользователе
     */
    whoami(): Promise<any> | undefined {
        return this.promiseWithLoading(authActions.whoami())
            .then((res: any) => {
                if (!res || res.roles.findIndex((item: string) => item === USER_ROLE.ADMIN.value) === -1) {
                    this.setState({
                        errorMessage: 'Вы не имеете доступа в эту систему',
                    });
                    AuthService.logOut();
                    return;
                }

                RgReactBaseService.showToast(toast.success('Выполнен вход в систему'));
                AuthService.setLastPage(null);
                this.goToState('/cabinet/main');
            })
            .catch(() => {
                this.setState({
                    errorMessage: 'Не удалось получить информацию о пользователе',
                });
            });
    }

    render(): false | JSX.Element {
        return (loginTemplate(this));
    }
}

export default LoginPage;
