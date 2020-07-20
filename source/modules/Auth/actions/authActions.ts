import { RgReactBaseService } from '@romger/react-base-components';
import { api } from '../../../config/api';
import { globalConfig } from '../../../config/globalConfig';
import { AuthService } from '../services/authServices';

export const TOKEN_URL = 'oauth/token';

export interface ParamsToken {
    grant_type?: string;
    username?: string | null;
    password?: string | null;
    refresh_token?: string | null;
    client_id?: string | null;
    client_secret?: string | null;
    scope?: string | null;
}

export class AuthActions {
    public static DEFAULT_URL: string = `${globalConfig.api}/auth-service/`;
    static API_RESOURCE(url: string, method: string = RgReactBaseService.GET_METHOD, params: any = {}, config: any = {}, withoutToast: boolean = false): Promise<any> {
        if (method === RgReactBaseService.GET_METHOD) {
            let configForGet: any = RgReactBaseService.parseParamsAndConfig(method, params, config).config;
            configForGet.params = params;
            return RgReactBaseService.doPromise(api.get(`${this.DEFAULT_URL}${url}`, configForGet), withoutToast);
        }
        return RgReactBaseService.doPromise(api.post(`${this.DEFAULT_URL}${url}`, RgReactBaseService.parseParamsAndConfig(method, params, config).params, RgReactBaseService.parseParamsAndConfig(method, params, config).config), withoutToast);
    }
}

/**
 * Авторизация пользователя по паре логин / пароль
 * @param {String} login
 * @param {String} password
 */
export function token(login: string | null, password: string | null, refresh: boolean = false): Promise<any> {
    const _params: ParamsToken = {};
    if (!refresh) {
        _params.grant_type = 'password';
        _params.client_id = 'cadastral-web';
        _params.client_secret = 'ccf61cd2-60f7-4fb9-b044-1709bf90667b';
        _params.scope = 'web';
        _params.username = login;
        _params.password = password;
    } else {
        _params.grant_type = 'refresh_token';
        _params.refresh_token = AuthService.getUserInfo().refresh_token;
    }
    const config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    };
    const str: string[] = [];
    for (const [field, value] of Object.entries(_params)) {
        str.push(`${encodeURIComponent(field)}=${encodeURIComponent(value)}`);
    }
    return AuthActions.API_RESOURCE(`${TOKEN_URL}?${str.join('&')}`, RgReactBaseService.GET_METHOD, null, config, true)
        .then((res) => {
            if (res) {
                AuthService.setUserInfo(res);
            }
            AuthService.PROCESS_REFRESH = false;
            return res;
        });
}

/**
 * Whoami
 */
export function whoami(): Promise<any> {
    return AuthActions.API_RESOURCE('users/whoami', RgReactBaseService.GET_METHOD, {}, {}, true)
        .then((res) => {
            if (res) {
                AuthService.setUserInfo(res);
            }
            return res;
        });
}
