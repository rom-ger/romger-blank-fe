export interface IUserFieldName {
    [value: string]: string;
    searchString: string;
    roles: string;
    dateRange: string;
    status: string;
}

const USER_FIELD_NAME: IUserFieldName = {
    searchString: 'searchString',
    roles: 'roles',
    dateRange: 'dateRange',
    status: 'status',
};

export default USER_FIELD_NAME;
