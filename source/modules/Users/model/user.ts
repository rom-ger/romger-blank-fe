import { SimpleObjectInterface } from '@romger/react-global-module/lib/interfaces';
import * as t from 'io-ts';
import * as moment from 'moment';
import { USER_ROLE, UserRoleEnumType } from '../enums/userRole';

export const UserType = t.interface({
    id: t.string,
    username: t.union([t.string, t.null]),
    firstName: t.union([t.string, t.null]),
    lastName: t.union([t.string, t.null]),
    middleName: t.union([t.string, t.null]),
    enabled: t.boolean,
    email: t.union([t.string, t.null]),
    createDate: t.union([t.string, t.number, t.null]),
    phone: t.union([t.string, t.null]),
    roles: t.array(UserRoleEnumType),
});

export interface IUserDTO extends t.TypeOf<typeof UserType> {
}

class User {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    enabled: boolean;
    email: string | null;
    createDate: Date | null;
    phone: string | null;
    roles: SimpleObjectInterface[];

    constructor(params: IUserDTO) {
        this.id = params.id;
        this.username = params.username ? params.username : null;
        this.firstName = params.firstName ? params.firstName : null;
        this.lastName = params.lastName ? params.lastName : null;
        this.middleName = params.middleName ? params.middleName : null;
        this.enabled = params.enabled;
        this.email = params.email;
        this.createDate = params.createDate ? moment(params.createDate)
            .toDate() : null;
        this.phone = params.phone ? params.phone : null;
        this.roles = params.roles && params.roles.length ? params.roles.map((el: string) => USER_ROLE[el]) : [USER_ROLE.USER];
    }
}

export { User };
