export interface SortFieldNameInterface {
    [value: string]: string;
    name: string;
    username: string;
}

const SORT_FIELD_NAME: SortFieldNameInterface = {
    name: 'name',
    username: 'username',
};

export default SORT_FIELD_NAME;
