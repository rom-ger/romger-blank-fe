import { RgReactBaseComponent, RgReactBaseComponentInterface, RgReactBaseService } from '@romger/react-base-components';
import { PaginationInterface, SimpleObjectInterface } from '@romger/react-global-module/lib/interfaces';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { globalConfig } from '../../../../config/globalConfig';
import { AuthService } from '../../../Auth/services/authServices';
import BASE_STATUS from '../../../Global/enums/baseStatus';
import { BreadCrumbsItems } from '../../../Global/interfaces/breadCrumbsItems';
import * as userActions from '../../action/userActions';
import { IUserListParams } from '../../interface/IUserListParams';
import { User } from '../../model/user';
import userListTemplate from './userListTemplate';

interface UserListProps {
    globalStore?: GlobalStore;
}

interface UserListState {
    [index: string]: any;

    items: User[];
    status: SimpleObjectInterface | null;
    searchString: string | null;
    pagination: PaginationInterface;
    showCreateModal: boolean;
    showEditModal: boolean;
    showEditPasswordModal: boolean;
    editItem: User | null;
    breadCrumbs: BreadCrumbsItems[];
}

export interface IUserList extends RgReactBaseComponentInterface {
    state: UserListState;
    props: UserListProps;
    checkChangeSimple: (value: string) => boolean;

    activateItem(id: string): void;

    closeCreateModal(update: boolean): void;

    openModalCreate(): void;

    closeEditModal(update: boolean): void;

    openModalEdit(user: User): void;

    closeEditPasswordModal(update: boolean): void;

    openModalEditPassword(user: User): void;

    deactivateItem(id: string): void;

    clearFilter(): void;

    changeFilters(changeStateObject: any): void;
}

@inject('globalStore')
@observer
export default class UserList extends RgReactBaseComponent<UserListProps, UserListState> implements IUserList {
    readonly state: UserListState = {
        items: [],
        pagination: {
            pageNo: 0,
            pageSize: globalConfig.pageSize,
            totalCount: 0,
        },
        searchString: null,
        status: BASE_STATUS.ACTIVE,
        showCreateModal: false,
        showEditModal: false,
        showEditPasswordModal: false,
        editItem: null,
        breadCrumbs: [],
    };

    componentDidMount() {
        if (AuthService.iAmOperator()) {
            RgReactBaseService.showToast(toast.error('Вы не имеете доступа к этому разделу'));
            return this.goToState('/cabinet/main');
        }
        this.updateContent(true);
        this.updateBreadCrumbs();
    }

    /**
     * Чекаем изменение поля simple
     */
    checkChangeSimple = (value: string): boolean => {
        return value !== '111';
    };

    /**
     * Обновляем хлебные крошки
     */
    updateBreadCrumbs() {
        this.setState({
            breadCrumbs: [
                {
                    title: 'Главная',
                    state: '/cabinet/main',
                },
            ],
        });
    }

    /**
     * Обновляем список записей из справочника
     */
    updateContent(firstPage = false) {
        const _params: IUserListParams = {
            pageNo: firstPage ? 0 : this.state.pagination.pageNo,
            pageSize: this.state.pagination.pageSize,
            status: this.state.status ? this.state.status.value : null,
        };
        this.promiseWithLoading(userActions.list(_params))
            .then((res) => {
                const pagination = this.state.pagination;
                pagination.totalCount = res.totalCount;
                if (firstPage) {
                    pagination.pageNo = 0;
                }
                this.setState({
                    pagination,
                    items: res.items,
                });
            });
    }

    /**
     * Активировать элемент
     */
    activateItem(id: string) {
        this.showConfirmModal('Активация пользователя', 'Вы действительно хотите активировать этого пользователя?', 'Активировать', 'Отмена', () => {
            this.promiseWithLoading(userActions.activate(id))
                .then((res: User) => {
                    RgReactBaseService.showToast(toast.success('Пользователь успешно активирован'));
                    this.updateContent();
                });
        });
    }

    /**
     * Деактивировать элемент
     */
    deactivateItem(id: string) {
        this.showConfirmModal('Деактивация пользователя', 'Вы действительно хотите деактивировать этого пользователя?', 'Деактивировать', 'Отмена', () => {
            this.promiseWithLoading(userActions.deactivate(id))
                .then((res: User) => {
                    RgReactBaseService.showToast(toast.success('Пользователь успешно деактивирован'));
                    this.updateContent();
                });
        });
    }

    /**
     * Очистить фильтр
     */
    clearFilter() {
        this.setState(
            {
                searchString: null,
                status: BASE_STATUS.ACTIVE,
            },
            () => this.updateContent(true),
        );
    }

    /**
     * Открыть модалку создания пользователя
     */
    openModalCreate = (): void => {
        this.setState({
            showCreateModal: true,
        });
    };

    /**
     * Закрыть модалку создания пользователя
     * @param update
     */
    closeCreateModal(update: boolean): void {
        this.setState(
            {
                showCreateModal: false,
            },
            () => update ? this.updateContent(true) : null,
        );
    }

    /**
     * Открыть модалку редактирования роли пользователя
     */
    openModalEdit = (user: User): void => {
        this.setState({
            showEditModal: true,
            editItem: user,
        });
    };

    /**
     * Закрыть модалку редактирования роли пользователя
     * @param update
     */
    closeEditModal(update: boolean): void {
        this.setState(
            {
                showEditModal: false,
                editItem: null,
            },
            () => update ? this.updateContent() : null,
        );
    }

    /**
     * Открыть модалку редактирования пароля пользователя
     */
    openModalEditPassword = (user: User): void => {
        this.setState({
            showEditPasswordModal: true,
            editItem: user,
        });
    };

    /**
     * Закрыть модалку редактирования пароля пользователя
     * @param update
     */
    closeEditPasswordModal(update: boolean): void {
        this.setState(
            {
                showEditPasswordModal: false,
                editItem: null,
            },
            () => update ? this.updateContent() : null,
        );
    }

    /**
     * Изменение фильтров
     */
    changeFilters = (changeStateObject: any) => {
        this.setState(
            changeStateObject,
            () => this.updateContent(),
        );
    };

    render(): false | JSX.Element {
        return (userListTemplate(this));
    }
}
