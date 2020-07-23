import { RgReactBaseService } from '@romger/react-base-components';
import { CollectionDTOInterface } from '@romger/react-global-module/lib/interfaces';
import { api } from '../../../config/api';
import { globalConfig } from '../../../config/globalConfig';
import { BaseActions } from '../../Global/actions/baseActions';
import { IUserCreateParams } from '../interface/IUserCreateParams';
import { IUserEditParams } from '../interface/IUserEditParams';
import { IUserListParams } from '../interface/IUserListParams';
import { IUserDTO, User, UserType } from '../model/user';

export class UserActions extends BaseActions {
    static DEFAULT_URL = `${globalConfig.api}/auth-service/users/`;
    static api = api;
}

/**
 * Получение списка записей из справочника
 * @param {*} params
 */
export function list(params: IUserListParams): Promise<CollectionDTOInterface<User>> {
    return UserActions.COLLECTION_API_RESOURCE<IUserDTO, User>({
        url: 'list',
        queryParams: params,
        model: User,
        modelType: UserType,
    });
}

/**
 * Получение одной записи справочника
 * @param {*} id
 */
export function getItem(id: string): Promise<User | null> {
    return UserActions.MODEL_API_RESOURCE<IUserDTO, User>({
        url: `${id}/get`,
        model: User,
        modelType: UserType,
    });
}

/**
 * Создание нового пароля
 * @param {*} password
 * @param {*} id
 */
export function newUserPassword(newPassword: string, id: string): Promise<User | null> {
    return UserActions.MODEL_API_RESOURCE<IUserDTO, User>({
        url: `${id}/password/update`,
        method: RgReactBaseService.POST_METHOD,
        bodyParams: { newPassword },
        model: User,
        modelType: UserType,
    });
}

/**
 * Создание новой записи в справочнике
 * @param {*} params
 */
export function create(params: IUserCreateParams): Promise<User | null> {
    return UserActions.MODEL_API_RESOURCE<IUserDTO, User>({
        url: 'create',
        method: RgReactBaseService.POST_METHOD,
        bodyParams: params,
        model: User,
        modelType: UserType,
    });
}

/**
 * Редактирование записи в справочнике
 * @param {*} params
 * @param {*} id
 */
export function edit(params: IUserEditParams, id: string): Promise<User | null> {
    return UserActions.MODEL_API_RESOURCE<IUserDTO, User>({
        url: `${id}/update`,
        method: RgReactBaseService.POST_METHOD,
        bodyParams: params,
        model: User,
        modelType: UserType,
    });
}

/**
 * Активация записи в справочнике
 * @param {*} id
 */
export function activate(id: string): Promise<User | null> {
    return UserActions.MODEL_API_RESOURCE<IUserDTO, User>({
        url: `${id}/activate`,
        method: RgReactBaseService.POST_METHOD,
        model: User,
        modelType: UserType,
    });
}

/**
 * Деактивация записи в справочнике
 * @param {*} id
 */
export function deactivate(id: string): Promise<User | null> {
    return UserActions.MODEL_API_RESOURCE<IUserDTO, User>({
        url: `${id}/deactivate`,
        method: RgReactBaseService.POST_METHOD,
        model: User,
        modelType: UserType,
    });
}
