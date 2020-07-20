import { SimpleObjectInterface } from '@romger/react-global-module/lib/interfaces';
import { TypeService } from '../../Global/services/typeService';

export enum UserStatusEnum {
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED',
}

export interface UserStatusInterface {
    [value: string]: SimpleObjectInterface;
    ACTIVE: SimpleObjectInterface;
    BLOCKED: SimpleObjectInterface;
}

export const USER_STATUS: UserStatusInterface = {
    ACTIVE: {
        name: 'Активный',
        value: 'ACTIVE',
    },
    BLOCKED: {
        name: 'Заблокирован',
        value: 'BLOCKED',
    },
};

export const UserStatusEnumType = TypeService.createEnum<UserStatusEnum>(UserStatusEnum, 'UserStatusEnum');
