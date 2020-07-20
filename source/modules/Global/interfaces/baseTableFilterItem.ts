import { BaseIndexableEntity } from './baseIndexableEntity';

export interface BaseTableFilterItem extends BaseIndexableEntity {
    filterName: string;
    filterValue: string | string[] | number | number[];
    stateObjectItemName?: string; // В каком поле объекта лежит значение фильтра
    isNumber?: boolean;
    isPaginationNumber?: boolean;
    type: string;
    /**
     * Для типа DICTIONARY
     */
    filterValuesField?: string; // Название поля с массивом возможных значений фильтра
    objectsArray?: boolean; // Массив возможных значений состоит из объектов
    /**
     * Для типа ENUM
     */
    enum?: BaseIndexableEntity;
}
