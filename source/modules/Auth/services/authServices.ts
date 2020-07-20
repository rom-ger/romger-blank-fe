import { globalStore } from '@romger/react-global-module/lib/store';
import { USER_ROLE } from '../../Users/enums/userRole';
import { User } from '../../Users/model/user';

export class AuthService {
    public static PROCESS_REFRESH: boolean = false;
    public static CHECK_WHOAMI: boolean = false;
    public static LOGIN_STATE: string = 'login';

    /**
     * Получаем информацию по пользователю
     * @returns {String}
     */
    public static getUserInfo(): any {
        try {
            let item = window.localStorage.getItem('RgSimpleUserInfo');
            if (!item) {
                return null;
            }
            return JSON.parse(item);
        } catch (ex) {
            return null;
        }
    }

    /**
     * Запишем информацию о пользователе
     * @param {String} userInfo
     */
    public static setUserInfo(userInfo: any): void {
        let oldUserInfo = AuthService.getUserInfo();
        let newUserInfo = oldUserInfo
            ? userInfo
                ? Object.assign(oldUserInfo, userInfo)
                : null
            : userInfo;
        window.localStorage.setItem(
            'RgSimpleUserInfo',
            JSON.stringify(newUserInfo),
        );
    }

    /**
     * Получаем информацию по последней странице перед выходом
     * @returns {String}
     */
    public static getLastPage(): any {
        try {
            let item = window.localStorage.getItem('RgSimpleLastPage');
            if (!item) {
                return null;
            }
            return JSON.parse(item);
        } catch (ex) {
            return null;
        }
    }

    /**
     * Запишем информацию о последней странице перед выходом
     * @param {String} lastPage
     */
    public static setLastPage(lastPage: any): void {
        window.localStorage.setItem(
            'RgSimpleLastPage',
            JSON.stringify(lastPage),
        );
    }

    /**
     * Выйти из учётки
     */
    public static logOut(notRememberPage: boolean = false): void {
        AuthService.CHECK_WHOAMI = false;
        if (!notRememberPage && window.location.href.indexOf(AuthService.LOGIN_STATE) === -1) {
            AuthService.setLastPage(window.location.href.split('#')[1]);
        }
        AuthService.setUserInfo(null);
        if (window.location.href.indexOf(AuthService.LOGIN_STATE) === -1) {
            globalStore.goToState(`/${AuthService.LOGIN_STATE}`, null);
        }
    }

    /**
     * Я тут самый главный
     */
    public static iAmAdmin(user?: User): boolean {
        let userInfo: any = user ? user : AuthService.getUserInfo();
        if (!userInfo || !userInfo.roles || !userInfo.roles.length) {
            return false;
        }
        return !!userInfo.roles.some((el: any) => el.value ? el.value === USER_ROLE.ADMIN.value : el === USER_ROLE.ADMIN.value);
    }

    /**
     * я всё-таки менеджер или кто?
     */
    public static iAmManager(user?: User): boolean {
        let userInfo: any = user ? user : AuthService.getUserInfo();
        if (!userInfo || !userInfo.roles || !userInfo.roles.length) {
            return false;
        }
        return !!userInfo.roles.some((el: string) => el === USER_ROLE.MANAGER.value);
    }

    /**
     * я всего лишь оператор и довольствуюсь этим
     */
    public static iAmOperator(user?: User): boolean {
        let userInfo: any = user ? user : AuthService.getUserInfo();
        if (!userInfo || !userInfo.roles || !userInfo.roles.length) {
            return false;
        }
        return !!userInfo.roles.some((el: string) => el === USER_ROLE.OPERATOR.value);
    }

    /**
     * Это моя организация
     * @param organizationId
     */
    public static isMyOrganization(organizationId: string, user?: User): boolean {
        let userInfo: any = user ? user : AuthService.getUserInfo();
        if (!userInfo || !userInfo.organizationId) {
            return false;
        }
        return userInfo.organizationId === organizationId;
    }
}
