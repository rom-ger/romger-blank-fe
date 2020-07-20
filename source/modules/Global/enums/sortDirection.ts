import { SimpleObjectInterface } from '../interfaces/simpleObject';

export interface SortDirectionInterface {
    [value: string]: SimpleObjectInterface;
    ASC: SimpleObjectInterface;
    DESC: SimpleObjectInterface;
}

const SORT_DIRECTION: SortDirectionInterface = {
    ASC: {
        name: 'По возрастанию',
        value: 'ASC',
    },
    DESC: {
        name: 'По убыванию',
        value: 'DESC',
    },
};

export default SORT_DIRECTION;
