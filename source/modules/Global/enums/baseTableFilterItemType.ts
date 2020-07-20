export interface BaseTableFilterItemTypeInterface {
    [value: string]: string;
    BASIC_VALUE: string;
    ENUM: string;
    DICTIONARY: string;
}

const BASE_TABLE_FILTER_ITEM_TYPE: BaseTableFilterItemTypeInterface = {
    BASIC_VALUE: 'BASIC_VALUE',
    ENUM: 'ENUM',
    DICTIONARY: 'DICTIONARY',
};

export default BASE_TABLE_FILTER_ITEM_TYPE;
