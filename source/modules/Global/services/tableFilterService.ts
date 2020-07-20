import * as queryString from 'query-string';
import { BaseIndexableEntity } from '../../Global/interfaces/baseIndexableEntity';
import BASE_TABLE_FILTER_ITEM_TYPE from '../enums/baseTableFilterItemType';
import { BaseComponentProps } from './../interfaces/baseComponentProps';
import { BaseComponentState } from './../interfaces/baseComponentState';
import { BaseTableFilterItem } from './../interfaces/baseTableFilterItem';

export class TableFilterService {
    static stringifyOptions: queryString.StringifyOptions = {
        arrayFormat: 'bracket',
    };

    /**
     * Вернуть объект стэйта с установленными фильтрами
     */
    static setCollectedFilters(
        filtersObj: BaseIndexableEntity,
        filterItems: BaseTableFilterItem[],
        stateObject: BaseComponentState,
    ): BaseComponentState {
        let stateObj: BaseComponentState = stateObject;
        if (!!filterItems) {
            filterItems.forEach((filterObj: BaseTableFilterItem) => {
                let filterValue: any;
                if (
                    filterObj.type === BASE_TABLE_FILTER_ITEM_TYPE.BASIC_VALUE
                ) {
                    if (filterObj.isNumber) {
                        let parsedNumber = parseFloat(
                            filtersObj[filterObj.filterName],
                        );
                        if (!isNaN(parsedNumber)) {
                            filterValue = parsedNumber;
                        }
                        if (!filterValue && filterObj.isPaginationNumber) {
                            filterValue = 0;
                        }
                    } else {
                        filterValue = filtersObj[filterObj.filterName]
                            ? filtersObj[filterObj.filterName]
                            : null;
                    }
                }
                if (filterObj.type === BASE_TABLE_FILTER_ITEM_TYPE.ENUM) {
                    filterValue =
                        filterObj.enum && filterObj.stateObjectItemName
                            ? filterObj.enum[filtersObj[filterObj.stateObjectItemName]]
                            : null;
                }
                if (filterObj.type === BASE_TABLE_FILTER_ITEM_TYPE.DICTIONARY) {
                    if (!!filterObj.filterValuesField) {
                        let filterValues =
                            stateObject[filterObj.filterValuesField];

                        filterValue = filterObj.objectsArray
                            ? filterValues.find((item: BaseIndexableEntity) => {
                                return !filterObj.stateObjectItemName
                                      ? false
                                      : item[filterObj.filterName] ===
                                            filtersObj[filterObj.stateObjectItemName];
                            })
                            : filterValues.find((item: BaseIndexableEntity) => {
                                return !filterObj.stateObjectItemName
                                      ? false
                                      : item ===
                                            filtersObj[filterObj.stateObjectItemName];
                            });
                    }
                }

                if (typeof filterValue === 'undefined') {
                    return;
                }

                if (filterObj.stateObjectItemName) {
                    switch (filterObj.type) {
                    case BASE_TABLE_FILTER_ITEM_TYPE.ENUM:
                    case BASE_TABLE_FILTER_ITEM_TYPE.DICTIONARY:
                        stateObj[filterObj.stateObjectItemName] = filterValue;
                        break;
                    default:
                        stateObj[filterObj.stateObjectItemName][
                                filterObj.filterName] = filterValue;
                        break;
                    }
                } else {
                    stateObj[filterObj.filterName] = filterValue;
                }
            });
        }
        return stateObj;
    }

    /**
     * Распарсить строку url в объект
     */
    static parseUrlToFiltersObject(urlString: string): object {
        return queryString.parse(
            queryString.extract(urlString),
            TableFilterService.stringifyOptions,
        );
    }

    /**
     * Получить объект с значениями фильтров
     */
    static collectFiltersToObject(stateObject: BaseComponentState): any {
        let stateObj: BaseComponentState = stateObject;
        let filtersObj: BaseIndexableEntity = {};
        if (!!stateObj.filters) {
            stateObj.filters.forEach((filterObj: BaseTableFilterItem) => {
                let objectField =
                    (filterObj.type ===
                        BASE_TABLE_FILTER_ITEM_TYPE.DICTIONARY ||
                        filterObj.type === BASE_TABLE_FILTER_ITEM_TYPE.ENUM) &&
                    filterObj.stateObjectItemName
                        ? filterObj.stateObjectItemName
                        : filterObj.filterName;
                filtersObj[objectField] = !filterObj.stateObjectItemName
                    ? stateObj[filterObj.filterName]
                    : stateObj[filterObj.stateObjectItemName]
                    ? stateObj[filterObj.stateObjectItemName][
                          filterObj.filterName
]
                    : undefined;
            });
        }
        return filtersObj;
    }

    /**
     * Обновление фильтров
     */
    static updateFilters(
        props: BaseComponentProps,
        state: BaseComponentState,
        firstPage: boolean = false,
        callback?: any,
    ): void {
        let filtersObject = TableFilterService.collectFiltersToObject(state);
        if (firstPage) {
            filtersObject.pageNo = 0;
        }
        TableFilterService.replaceHistoryState(
            props,
            props.location.pathname,
            filtersObject,
        );
        if (!!callback) {
            callback();
        }
    }

    /**
     * Заменить в истории текущий стейт
     */
    static replaceHistoryState(
        props: BaseComponentProps,
        state: string,
        stateParams?: object,
    ) {
        let stateQueryString: string = stateParams
            ? queryString.stringify(
                  stateParams,
                  TableFilterService.stringifyOptions,
              )
            : '';
        props.history.push(`${props.location.pathname}?${stateQueryString}`);
    }
}
