import { RgReactBaseComponentInterface, RgReactBaseContainer, RgReactBaseService } from '@romger/react-base-components';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { inject, observer } from 'mobx-react';
import { match } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as userActions from '../../action/userActions';
import { User } from '../../model/user';
import userViewTemplate from './userViewTemplate';

interface UserViewPageProps {
    match: match<IUserViewPageRouteParams>;
    globalStore: GlobalStore;
    location: any;
}

interface IUserViewPageRouteParams {
    id: string;
}

interface UserViewPageState {
    item: User | null;
    showModal: boolean;
    newPassword: string | null;
    repeatPassword: string | null;
}

export interface IUserViewPage extends RgReactBaseComponentInterface {
    state: UserViewPageState;
    props: UserViewPageProps;

    updateState(value: any, field: string, callback?: () => any, timeout?: number): void;

    updateView(id?: string): void;

    activateItem(): void;

    deactivateItem(): void;

    showModal(): void;

    hideModal(): void;

    updatePassword(): void;

    isValidForm(): boolean;
}

@inject('globalStore')
@observer
export default class UserViewPage extends RgReactBaseContainer<UserViewPageProps, UserViewPageState> implements IUserViewPage {
    readonly state: UserViewPageState = {
        item: null,
        showModal: false,
        newPassword: null,
        repeatPassword: null,
    };

    componentDidMount() {
        this.updateView(this.props.match.params.id);
    }

    componentWillReceiveProps(newProps: UserViewPageProps) {
        this.updateView(newProps.match.params.id);
    }

    updateView = (id = this.props.match.params.id) => {
        this.promiseWithLoading(userActions.getItem(id))
            .then((res: User) => {
                this.setState({
                    item: res,
                });
            });
    }

    /**
     * Проверяем заполнение полей
     */
    isValidForm(): boolean {
        return !!this.state && !!this.state.newPassword && !!this.state.repeatPassword && this.state.newPassword === this.state.repeatPassword;
    }

    /**
     * Активировать пользователя
     */
    activateItem() {
        this.showConfirmModal('Активация пользователя', 'Вы действительно хотите активировать этого пользователя?', 'Активировать', 'Отмена', () => {
            userActions.activate(this.props.match.params.id)
                .then(() => {
                    RgReactBaseService.showToast(toast.success('Пользователь успешно активирован'));
                    this.updateView();
                });
        });
    }

    /**
     * Деактивировать пользователя
     */
    deactivateItem() {
        this.showConfirmModal('Деактивация пользователя', 'Вы действительно хотите деактивировать этого пользователя?', 'Деактивировать', 'Отмена', () => {
            userActions.deactivate(this.props.match.params.id)
                .then(() => {
                    RgReactBaseService.showToast(toast.success('Пользователь успешно деактивирован'));
                    this.updateView();
                });
        });
    }

    /**
     * Показать модалку
     */
    showModal() {
        this.setState({
            showModal: true,
        });
    }

    /**
     * Скрыть модалку
     */
    hideModal = () => {
        this.setState({
            showModal: false,
            newPassword: null,
            repeatPassword: null,
        });
    }

    /**
     * Сохранить новый пароль
     */
    updatePassword = () => {
        if (!this.state.newPassword || !(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/.test(this.state.newPassword))) {
            RgReactBaseService.showToast(toast.error('Пароль не соответствует требованиям'));
            return;
        }
        this.promiseWithLoading(userActions.newUserPassword(this.state.newPassword, this.state.item ? this.state.item.id : ''))
            .then((res: User) => {
                RgReactBaseService.showToast(toast.success('Пароль успешно изменён'));
                this.hideModal();
            });
    }

    render(): false | JSX.Element {
        return (userViewTemplate(this));
    }
}
