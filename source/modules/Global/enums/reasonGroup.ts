import { SimpleObjectInterface } from '../interfaces/simpleObject';

export interface ReasonGroupInterface {
    [value: string]: SimpleObjectInterface;
    MANUAL: SimpleObjectInterface;
    AUTO: SimpleObjectInterface;
}

const REASON_GROUP: ReasonGroupInterface = {
    MANUAL: {
        name: 'Вручную',
        value: 'MANUAL',
    },
    AUTO: {
        name: 'Автоматически',
        value: 'AUTO',
    },
};

export default REASON_GROUP;
