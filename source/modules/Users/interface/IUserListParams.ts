import { BaseListDictionaryParamsInterface } from '../../Global/interfaces/baseListDictionaryParamsInterface';

export interface IUserListParams extends BaseListDictionaryParamsInterface {
    searchString?: string | null;
    ids?: string[];
    roles?: string[];
    enabled?: boolean | null;
    startDate?: Date | null;
    endDate?: Date | null;
}
