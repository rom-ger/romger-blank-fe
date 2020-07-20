export interface BaseListDictionaryParamsInterface {
    pageNo: number;
    pageSize: number;
    orderBy?: string;
    orderByDirection?: string;
    status?: string | null;
}
