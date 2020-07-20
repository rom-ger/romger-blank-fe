import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as Qs from 'qs';
import * as authActions from '../modules/Auth/actions/authActions';
import { AuthService } from '../modules/Auth/services/authServices';

let configAxios: AxiosRequestConfig = {};

let api: AxiosInstance = axios.create(configAxios);

api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.url) {
        return config;
    }
    try {
        let userInfo = AuthService.getUserInfo();
        let accessToken = userInfo ? userInfo.access_token : null;
        let needAuthHeader =
            config.url.indexOf('auth-service') > -1 &&
            config.url.indexOf('auth-service/auth') === -1 &&
            config.url.indexOf('auth-service/users') === -1;
        if (accessToken || needAuthHeader) {
            config.headers.Authorization = needAuthHeader
                ? 'Basic Y2FkYXN0cmFsLXdlYjpjY2Y2MWNkMi02MGY3LTRmYjktYjA0NC0xNzA5YmY5MDY2N2I='
                : `Bearer ${accessToken}`;
        }
        if (
            config.url.indexOf(authActions.TOKEN_URL) > -1 &&
            AuthService.PROCESS_REFRESH
        ) {
            return config;
        }
        if (config.url.indexOf(authActions.TOKEN_URL) > -1) {
            AuthService.PROCESS_REFRESH = true;
        }
        config.paramsSerializer = params =>
            Qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });
    } catch (error) {
        return config;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    (error) => {
        const code = 401;
        const timeout = 15;
        let originalRequest = error.config;
        if (error.response.status === code && !originalRequest._retry) {
            // если мы получили в ответ ошибку авторизации и это первый подобный запрос
            if (
                AuthService.getUserInfo() &&
                AuthService.getUserInfo().refresh_token
            ) {
                // если у нас есть сохранённый refresh_token
                if (originalRequest.url.indexOf(authActions.TOKEN_URL) === -1) {
                    // если мы ломились не на получение токена
                    if (AuthService.PROCESS_REFRESH) {
                        // если уже запущен процесс обновления токена
                        return new Promise((resolve, reject) => {
                            let interval = window.setInterval(() => {
                                if (!AuthService.PROCESS_REFRESH) {
                                    // ждём когда процесс обновления токена закончится, положим новый токен в заголовки и повторим запрос
                                    window.clearInterval(interval);
                                    originalRequest.headers.Authorization = `Bearer ${AuthService.getUserInfo().access_token}`;
                                    return resolve(api(originalRequest));
                                }
                            },                                timeout);
                        });
                    } else {
                        // если процесс обновления токена ещё не был запущен
                        originalRequest._retry = true;
                        try {
                            return authActions
                                .token(null, null, true) // просим новый токен
                                .then((res) => {
                                    // если получили новый токен, положим его в заголовки и повторим запрос
                                    originalRequest.headers.Authorization = `Bearer ${AuthService.getUserInfo().access_token}`;
                                    AuthService.PROCESS_REFRESH = false;
                                    return api(originalRequest);
                                })
                                .catch(() => {
                                    // если не получилось обновить токен, выходим из системы
                                    AuthService.PROCESS_REFRESH = false;
                                    AuthService.logOut();
                                });
                        } catch (error) {
                            // если что-то пошло не так при обновлении токена - выходим из системы
                            AuthService.PROCESS_REFRESH = false;
                            AuthService.logOut();
                        }
                    }
                } else {
                    // если мы ломились на получение токена и получили в ответ ошибку авторизации, значит выходим из системы
                    AuthService.PROCESS_REFRESH = false;
                    AuthService.logOut();
                }
            } else {
                // если у нас не было сохранённого токена для обновления - выходим из системы
                AuthService.PROCESS_REFRESH = false;
                AuthService.logOut();
            }
        }
        AuthService.PROCESS_REFRESH = false;
        // если это была ошибка не авторизации - просто возвращаем её
        return Promise.reject(error);
    },
);

export { api };
