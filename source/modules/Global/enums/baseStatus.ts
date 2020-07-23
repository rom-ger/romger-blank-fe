import { SimpleObjectInterface } from '@romger/react-global-module/lib/interfaces';
import { TypeService } from '../services/typeService';

export enum BaseStatusEnum {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

export interface BaseStatusInterface {
    [value: string]: SimpleObjectInterface;

    ACTIVE: SimpleObjectInterface;
    DELETED: SimpleObjectInterface;
}

const BASE_STATUS: BaseStatusInterface = {
    ACTIVE: {
        name: 'Активно',
        value: 'ACTIVE',
    },
    DELETED: {
        name: 'Скрыто',
        value: 'DELETED',
    },
};

export default BASE_STATUS;

export const BaseStatusEnumType = TypeService.createEnum<BaseStatusEnum>(BaseStatusEnum, 'BaseStatusEnum');
