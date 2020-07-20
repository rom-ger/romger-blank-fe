import { SimpleObjectInterface } from '../../Global/interfaces/simpleObject';

export interface GroupTypeItemInterface extends SimpleObjectInterface {
    description?: string;
    weight: number;
}

export interface GroupTypeInterface {
    [value: string]: GroupTypeItemInterface;
    ORGANIZATION_USER_GROUP: GroupTypeItemInterface;
    ORGANIZATION_CURATOR_GROUP: GroupTypeItemInterface;
    ORGANIZATION_ADMIN_GROUP: GroupTypeItemInterface;
    PROJECT_AUTHOR_GROUP: GroupTypeItemInterface;
    PROJECT_MANAGER_GROUP: GroupTypeItemInterface;
    PROJECT_CURATOR_GROUP: GroupTypeItemInterface;
    PROJECT_COORDINATOR_GROUP: GroupTypeItemInterface;
    USER_SID: GroupTypeItemInterface;
}

const GROUP_TYPE: GroupTypeInterface = {
    ORGANIZATION_USER_GROUP: {
        name: 'Сотрудники организации',
        weight: 0,
        value: 'ORGANIZATION_USER_GROUP',
    },
    ORGANIZATION_CURATOR_GROUP: {
        name: 'Кураторы проектов организации',
        value: 'ORGANIZATION_CURATOR_GROUP',
        weight: 1,
        description:
            'Данные сотрудники имеют доступ на просмотр ко всем проектам вашей организации',
    },
    ORGANIZATION_ADMIN_GROUP: {
        name: 'Администраторы организации',
        value: 'ORGANIZATION_ADMIN_GROUP',
        weight: 0,
        description:
            'Сотрудники, включённые в эту группу, помимо доступа ко всем проектам вашей организации имеют доступ к данному разделу и могут управлять настройками кабинета',
    },
    PROJECT_AUTHOR_GROUP: {
        name: 'Команда инвестора',
        weight: 0,
        value: 'PROJECT_AUTHOR_GROUP',
    },
    PROJECT_MANAGER_GROUP: {
        name: 'Менеджер проекта',
        weight: 0,
        value: 'PROJECT_MANAGER_GROUP',
    },
    PROJECT_CURATOR_GROUP: {
        name: 'Куратор проекта',
        weight: 0,
        value: 'PROJECT_CURATOR_GROUP',
    },
    PROJECT_COORDINATOR_GROUP: {
        name: 'Координатор проекта',
        weight: 0,
        value: 'PROJECT_COORDINATOR_GROUP',
    },
    USER_SID: {
        name: 'Пользователи',
        weight: 0,
        value: 'USER_SID',
    },
};

export default GROUP_TYPE;
