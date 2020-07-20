import { SimpleObjectInterface } from '../../Global/interfaces/simpleObject';
import { TypeService } from '../../Global/services/typeService';

export enum UserRoleEnum {
    ADMIN = 'ADMIN',
    USER = 'USER',
    OPERATOR = 'OPERATOR',
    SENIOR_OPERATOR = 'SENIOR_OPERATOR',
}

export interface UserRoleInterface {
    [value: string]: SimpleObjectInterface;
    ADMIN: SimpleObjectInterface;
    USER: SimpleObjectInterface;
    OPERATOR: SimpleObjectInterface;
    SENIOR_OPERATOR: SimpleObjectInterface;
}

export const USER_ROLE: UserRoleInterface = {
    ADMIN: {
        name: 'Администратор',
        value: 'ADMIN',
    },
    USER: {
        name: 'Пользователь',
        value: 'USER',
    },
    OPERATOR: {
        name: 'Оценщик',
        value: 'OPERATOR',
    },
    SENIOR_OPERATOR: {
        name: 'Старший оценщик',
        value: 'SENIOR_OPERATOR',
    },
};

export const UserRoleEnumType = TypeService.createEnum<UserRoleEnum>(UserRoleEnum, 'UserRoleEnum');
