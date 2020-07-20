import { BaseIndexableEntity } from './baseIndexableEntity';
import { BaseTableFilterItem } from './baseTableFilterItem';

export interface BaseComponentState extends BaseIndexableEntity {
    filters?: BaseTableFilterItem[];
}
