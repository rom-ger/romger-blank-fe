export interface IUserCreateParams {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    password: string | null;
    phone: string | null;
    roles: string[];
    username: string | null;
}
