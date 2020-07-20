import { RgReactBaseService } from '@romger/react-base-components';
import { SimpleObjectInterface } from '@romger/react-global-module/lib/interfaces';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { toast } from 'react-toastify';
import * as userActions from '../../action/userActions';
import { USER_ROLE } from '../../enums/userRole';
import { IUserCreateParams } from '../../interface/IUserCreateParams';
import { User } from '../../model/user';
import userCreateTemplate from './userCreateTemplate';

export interface IUserCreatePageProps {
    globalStore: GlobalStore;
    location: any;
}

export interface IUserCreatePageState {
    username: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
    firstName: string | null;
    setFirstName: React.Dispatch<React.SetStateAction<string | null>>;
    middleName: string | null;
    setMiddleName: React.Dispatch<React.SetStateAction<string | null>>;
    lastName: string | null;
    setLastName: React.Dispatch<React.SetStateAction<string | null>>;
    email: string | null;
    setEmail: React.Dispatch<React.SetStateAction<string | null>>;
    phone: string | null;
    setPhone: React.Dispatch<React.SetStateAction<string | null>>;
    password: string | null;
    setPassword: React.Dispatch<React.SetStateAction<string | null>>;
    role: SimpleObjectInterface | null;
    setRole: React.Dispatch<React.SetStateAction<SimpleObjectInterface | null>>;
}

export interface IUserCreatePage {
    state: IUserCreatePageState;
    props: IUserCreatePageProps;
    rolesForSelect: SimpleObjectInterface[];

    updateAction(id?: string): void;

    isValidForm(): boolean;
}

const UserCreatePage = (props: IUserCreatePageProps) => {
    const rolesForSelect: SimpleObjectInterface[] = [USER_ROLE.OPERATOR, USER_ROLE.SENIOR_OPERATOR];
    const [username, setUsername] = React.useState<string | null>(null);
    const [firstName, setFirstName] = React.useState<string | null>(null);
    const [middleName, setMiddleName] = React.useState<string | null>(null);
    const [lastName, setLastName] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState<string | null>(null);
    const [phone, setPhone] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);
    const [role, setRole] = React.useState<SimpleObjectInterface | null>(null);
    const state: IUserCreatePageState = {
        username,
        setUsername,
        firstName,
        setFirstName,
        middleName,
        setMiddleName,
        lastName,
        setLastName,
        email,
        setEmail,
        phone,
        setPhone,
        password,
        setPassword,
        role,
        setRole,
    };

    /**
     * Проверяем заполнение полей
     */
    const isValidForm = React.useCallback(
        () => !!state.username && !!state.password && !!state.firstName && !!state.lastName && !!state.email && !!state.role,
        [state.username, state.password, state.firstName, state.lastName, state.email, state.role],
    );

    /**
     * Отдаем на бэк заполненные поля
     */
    const updateAction = () => {
        if (!state.role || !state.username || !state.password || !state.firstName || !state.lastName || !state.email) {
            return;
        }
        let params: IUserCreateParams = {
            username: state.username,
            firstName: state.firstName,
            middleName: state.middleName,
            lastName: state.lastName,
            email: state.email,
            phone: state.phone,
            password: state.password,
            roles: [state.role.value],
        };
        RgReactBaseService.promiseWithLoading(
            props.globalStore,
            userActions.create(params),
        )
        .then((res: User) => {
            RgReactBaseService.showToast(toast.success('Пользователь успешно создан'));
            RgReactBaseService.goToState(props.globalStore, `/cabinet/user/${res.id}/view`);
        });
    };

    const _this: IUserCreatePage = {
        props,
        state,
        updateAction,
        isValidForm,
        rolesForSelect,
    };

    return userCreateTemplate.call(_this);
};

export default inject('globalStore')(observer(UserCreatePage));
