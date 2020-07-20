import { SimpleObjectInterface } from '../interfaces/simpleObject';

export interface AllStatusInterface {
    [value: string]: SimpleObjectInterface;
    ALL: SimpleObjectInterface;
}

const ALL_STATUS: AllStatusInterface = {
    ALL: {
        name: 'Все',
        value: '',
    },
};

export default ALL_STATUS;
