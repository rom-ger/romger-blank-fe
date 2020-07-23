import { RgReactBaseComponentInterface, RgReactBaseContainer } from '@romger/react-base-components';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { RgReactTooltip } from '@romger/react-tooltip';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import * as authActions from '../../Auth/actions/authActions';
import { AuthService } from '../../Auth/services/authServices';
import { IItemMenu } from '../../Global/interfaces/IItemMenu';
import cabinetWrapTemplate from './cabinetWrapTemplate';

interface CabinetWrapProps {
    children: any;
    location?: any;
    globalStore: GlobalStore;
}

interface CabinetWrapState {
    items: IItemMenu[];
}

export interface CabinetWrapInterface extends RgReactBaseComponentInterface {
    state: CabinetWrapState;
    props: CabinetWrapProps;
    isOpenChildMenu: boolean;
    openChildMenuItems: IItemMenu[] | undefined;

    initItems(clearAll?: boolean, chatUpdateTime?: number | null): void;

    goToMain(): void;

    handlerClickMainItem(index: number): void;

    handlerClickChildItem(index: number): void;

    isFullWidthState(): boolean;

    wrapTooltip(content: JSX.Element, tooltip?: string | null): JSX.Element;
}

@inject('globalStore')
@observer
export class CabinetWrap extends RgReactBaseContainer<CabinetWrapProps, CabinetWrapState> implements CabinetWrapInterface {
    readonly state: CabinetWrapState = {
        items: [],
    };

    get userInfo(): any {
        return AuthService.getUserInfo();
    }

    get isOpenChildMenu(): boolean {
        return !!Object.values(this.state.items)
            .filter(item => !!item.selected)
            .length;
    }

    get openChildMenuItems(): IItemMenu[] {
        if (!this.isOpenChildMenu) {
            return [];
        }
        let selectedMainItem: IItemMenu | undefined | null = Object.values(this.state.items)
            .filter(item => !!item.selected)[0];
        return !!selectedMainItem && selectedMainItem.child
            ? selectedMainItem.child
            : [];
    }

    componentDidMount(): void {
        this.initItems();
        this.whoami();
    }

    /**
     * Перейти на главную страницу
     */
    goToMain(): void {
        this.goToState('/cabinet/main');
        this.initItems(true);
    }

    /**
     * Это стейт, где контент на всю ширину
     */
    isFullWidthState(): boolean {
        return false;
    }

    /**
     * Инициализировать меню
     */
    initItems(clearAll: boolean = false): void {
        let array = [
            {
                iconPath: 'assets/images/svg/outline-group-24px.svg',
                isIconSVG: true,
                title: 'Пользователи',
                isSetting: true,
                tooltip: 'Пользователи',
                state: '/cabinet/users/list',
                hide: AuthService.iAmOperator(),
            },
            {
                flex: true,
            },
            {
                icon: 'person',
                childState: '/profile/',
                child: [
                    {
                        title: AuthService.getUserInfo() ? AuthService.getUserInfo().username : '',
                        mainTitle: true,
                        isSetting: true,
                    },
                    {
                        icon: 'input',
                        title: 'Выйти',
                        onClick: () => AuthService.logOut(),
                        isSetting: true,
                    },
                ],
                selected: false,
                isSetting: true,
                simpleVisible: true,
                tooltip: 'Профиль',
            },
        ];

        this.updateSelectable(clearAll, null, array);
    }

    /**
     * Обновить выбраные пункты
     */
    updateSelectable(clearAll: boolean = false, callback?: (() => any) | null, items: IItemMenu[] = this.state.items) {
        this.setState(
            {
                items: items
                    .filter(item => !item.hide)
                    .map((item: IItemMenu) => {
                        item.selected = clearAll
                            ? false
                            : this.addConditionForSelect(item);
                        if (item.child && item.child.length) {
                            item.child.forEach((child) => {
                                child.selected = clearAll
                                    ? false
                                    : this.addConditionForSelect(child);
                            });
                        }
                        item.child = !!item.child
                            ? item.child.filter(child => !child.hide)
                            : [];
                        return item;
                    }),
            },
            () => (callback ? callback() : null),
        );
    }

    /**
     * Дополнительные условия для выделения пункта меню
     * @param {*} item
     */
    addConditionForSelect(item: IItemMenu): boolean {
        let find = false;
        if (!item) {
            return find;
        }
        if (!item.state) {
            if (item.child && item.child.length) {
                item.child.forEach((child) => {
                    if (this.addConditionForSelect(child)) {
                        find = true;
                    }
                });
            }
            return find;
        }
        find = this.props.location && this.props.location.pathname.indexOf(item.state) > -1;
        if (!find && item.child && item.child.length) {
            item.child.forEach((child) => {
                if (this.addConditionForSelect(child)) {
                    find = true;
                }
            });
        }
        if (!find && item.childState && this.addConditionForSelect({ state: item.childState })) {
            find = true;
        }
        return find;
    }

    /**
     * Что делать при клике на элемент в левом меню
     * @param index
     */
    handlerClickMainItem(index: number): void {
        let items = [...this.state.items];
        items.forEach((item, i) => {
            if (!items[index].isAddMenu) {
                item.selected = i === index ? !item.selected : false;
            }
            if (i === index && !!item.onClick) {
                item.onClick();
            }
            if (i === index && !!item.state) {
                return this.goToState(item.state);
            }
            if (!!item.notAutoGoToChild) {
                return;
            }
            let itemChild = !!item.child && !!item.child.length ? item.child[0] : null;
            let childState = !!itemChild && !!itemChild.state ? itemChild.state : null;
            if (i === index && !!itemChild && !item.state && !!childState) {
                return this.goToState(childState);
            }
        });
        this.setState({
            items,
        });
    }

    /**
     * Что делать при клике на элемент в дочернем меню
     * @param index
     */
    handlerClickChildItem(index: number): void {
        let items = this.state.items;
        items.forEach((item) => {
            if (!!item.selected && item.child) {
                item.child.forEach((child, i) => {
                    child.selected = i === index;
                    if (i === index && !!child.onClick) {
                        child.onClick();
                    }
                    if (i === index && child.state) {
                        return this.goToState(child.state);
                    }
                });
            }
        });
    }

    /**
     * Получить данные о пользователе
     */
    whoami(): Promise<void> | void {
        if (AuthService.CHECK_WHOAMI) {
            return;
        }
        return authActions.whoami()
            .then((res: any) => {
                if (!res) {
                    return this.logout();
                }
                AuthService.CHECK_WHOAMI = true;
            })
            .catch(() => this.logout());
    }

    /**
     * Выйти из системы
     */
    logout(): void {
        AuthService.logOut();
    }

    /**
     * Оборачиваем в тултип, если надо
     * @param content
     * @param hasTooltip
     */
    wrapTooltip(content: JSX.Element, tooltip?: string | null): JSX.Element {
        if (!tooltip) {
            return content;
        }
        return <RgReactTooltip
            tooltip={tooltip}
        >
            {content}
        </RgReactTooltip>;
    }

    render(): false | JSX.Element {
        return !!this.userInfo && cabinetWrapTemplate(this);
    }
}

export default CabinetWrap;
