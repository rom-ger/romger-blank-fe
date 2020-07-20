import { RgReactBaseComponentInterface, RgReactBaseContainer, RgReactBaseService } from '@romger/react-base-components';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { inject, observer } from 'mobx-react';
import { match } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as userActions from '../../action/userActions';
import { User } from '../../model/user';
import userEditTemplate from './userEditTemplate';

interface UserEditPageProps {
    match: match<IUserEditPageRouteParams>;
    globalStore: GlobalStore;
    location: any;
}

interface IUserEditPageRouteParams {
    id: string;
}

interface UserEditPageState {
    username: string | null;
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
}

export interface IUserEditPage extends RgReactBaseComponentInterface {
    state: UserEditPageState;
    props: UserEditPageProps;

    updateState(value: any, field: string, callback?: () => any, timeout?: number): void;

    updateAction(id?: string): void;

    isValidForm(): boolean;
}

@inject('globalStore')
@observer
export default class UserEditPage extends RgReactBaseContainer<UserEditPageProps, UserEditPageState> implements IUserEditPage {
    readonly state: UserEditPageState = {
        username: null,
        firstName: null,
        lastName: null,
        middleName: null,
        email: null,
        phone: null,
    };

    componentDidMount() {
        this.updateEntity(this.props.match.params.id);
    }

    componentWillReceiveProps(newProps: UserEditPageProps) {
        if (newProps.match.params.id !== this.props.match.params.id) {
            this.updateEntity(newProps.match.params.id);
        }
    }

    updateEntity(id: string) {
        this.promiseWithLoading(userActions.getItem(id))
            .then((res: User) => {
                this.setState({
                    username: res.username,
                    middleName: res.middleName,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    phone: res.phone,
                });
            });
    }

    /**
     * Проверяем заполнение полей
     */
    isValidForm() {
        return !!this.state.username && !!this.state.firstName && !!this.state.lastName && !!this.state.email;
    }

    /**
     * Отдаем на бэк заполненные поля
     */
    updateAction(id = this.props.match.params.id) {
        let params = {
            username: this.state.username,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
        };
        this.promiseWithLoading(userActions.edit(params, id))
            .then(() => {
                RgReactBaseService.showToast(toast.success('Пользователь успешно обновлён'));
                this.goToState('/cabinet/users/list');
            });
    }

    render(): false | JSX.Element {
        return (userEditTemplate(this));
    }
}
