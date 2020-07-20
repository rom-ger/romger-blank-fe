import { FlexBox } from '@romger/react-flex-layout';
import { PaginationInterface, SimpleObjectInterface } from '@romger/react-global-module/lib/interfaces';
import { RgReactTable } from '@romger/react-table/lib/components';
import { FilterTypeEnum } from '@romger/react-table/lib/enums';
import classnames from 'classnames';
import * as React from 'react';
import ReactSVG from 'react-svg';
import BreadCrumbs from '../../../Global/components/breadCrumbs/breadCrumbsComponent';
import USER_FIELD_NAME from '../../enums/userFieldName';
import { USER_ROLE } from '../../enums/userRole';
import { USER_STATUS } from '../../enums/userStatus';
import { IUserList } from './userListComponent';

const userListTemplate = (context: IUserList) => (
    <FlexBox
        column="start stretch"
        className={classnames(
            'user-lest',
        )}
    >
        <BreadCrumbs
            items={context.state.breadCrumbs}
        />
        <FlexBox
            shrink="0"
            row="start center"
            className={classnames(
                'dictionary-items-list-wrap',
            )}
        >
            <h1
                className={classnames(
                    'dictionary__title',
                    'title-primary',
                )}
            >
                Список пользователей
            </h1>
            <FlexBox
                flex={true}
            />
            <FlexBox
                shrink="0"
                node="a"
                className={classnames(
                    'dictionary-list__button',
                    'dictionary-list__button--primary',
                )}
                href="#/cabinet/user/create"
            >
                Создать пользователя
            </FlexBox>
        </FlexBox>
        <RgReactTable
            minHeight="360px"
            loadingProcess={context.state.listItemsLoadingProcess}
            titleForExportedFile={'Список пользователей'}
            updatePaginationCallback={(pagination: PaginationInterface) => context.updatePagination(pagination)}
            pagination={context.state.pagination}
            checkSaveColumnConfig
            config={{
                showChangePageSize: true,
                titles: [
                    {
                        title: 'Фамилия',
                        filterField: USER_FIELD_NAME.searchString,
                    },
                    {
                        title: 'Имя',
                    },
                    {
                        title: 'Отчество',
                    },
                    {
                        title: 'Телефон',
                    },
                    {
                        title: 'Email',
                    },
                    {
                        title: 'Статус',
                        filterField: USER_FIELD_NAME.status,
                    },
                    {
                        title: 'Роль',
                        filterField: USER_FIELD_NAME.roles,
                    },
                    {
                        title: 'Дата создания',
                        filterField: USER_FIELD_NAME.dateRange,
                    },
                    {
                        title: '',
                        notExport: true,
                    },
                ],
                onDoubleClickRow: (row: any) => context.goToState(`/cabinet/user/${row.id}/view`),
                rows: context.state.items.map(item => ({
                    id: item.id,
                    items: [
                        {
                            value: item.lastName,
                            onClickItem: () => context.goToState(`/cabinet/user/${item.id}/view`),
                        },
                        {
                            value: item.firstName,
                        },
                        {
                            value: item.middleName,
                        },
                        {
                            value: item.phone,
                        },
                        {
                            value: item.email,
                        },
                        {
                            value: !!item.enabled ? USER_STATUS.ACTIVE.name : USER_STATUS.BLOCKED.name,
                        },
                        {
                            value: item.roles.map((role: any) => role.name)
                                                .join(', '),
                        },
                        {
                            value: context.moment(item.createDate ? item.createDate : '')
                                            .format('DD.MM.YYYY'),
                        },
                        {
                            customHTML:
                                !item.roles.map((role: SimpleObjectInterface) => role.value === USER_ROLE.ADMIN.value)[0] &&
                                <FlexBox
                                    row="end center"
                                >
                                    {
                                        !!item.enabled
                                            ?
                                            <i
                                                className={classnames(
                                                    'material-icons',
                                                    'dictionary__table--material-icons',
                                                )}
                                                onClick={() => context.deactivateItem(item.id)}
                                            >
                                                thumb_down
                                            </i>
                                            :
                                            <i
                                                className={classnames(
                                                    'material-icons',
                                                    'dictionary__table--material-icons',
                                                )}
                                                onClick={() => context.activateItem(item.id)}
                                            >
                                                thumb_up
                                            </i>
                                    }
                                    <FlexBox
                                        className={classnames(
                                            'dictionary__table--material-icons',
                                        )}
                                    >
                                        <div
                                            className={classnames(
                                                'dictionary__action-wrap',
                                            )}
                                            onClick={() => context.goToState(`/cabinet/user/${item.id}/edit`)}
                                        >
                                            <ReactSVG
                                                src="./assets/images/svg/ic_edit_24px.svg"
                                            />
                                        </div>
                                    </FlexBox>
                                </FlexBox>,
                        },
                    ],
                })),
            }}
            filterFields={[
                {
                    filterTitle: 'Фамилия',
                    field: USER_FIELD_NAME.searchString,
                    type: FilterTypeEnum.STRING,
                    stringValue: context.state.searchString,
                },
                {
                    filterTitle: 'Роль',
                    field: USER_FIELD_NAME.roles,
                    type: FilterTypeEnum.DICTIONARY,
                    dictionaryModelField: 'value',
                    dictionaryVisibleField: 'name',
                    dictionaryWithoutSearch: true,
                    dictionaryMultiSelect: true,
                    dictionaryValue: context.state.roles,
                    dictionaryItems: () => Object.values(USER_ROLE),
                },
                {
                    filterTitle: 'Статус',
                    field: USER_FIELD_NAME.status,
                    type: FilterTypeEnum.DICTIONARY,
                    dictionaryModelField: 'value',
                    dictionaryVisibleField: 'name',
                    dictionaryWithoutSearch: true,
                    dictionaryValue: context.state.status,
                    dictionaryItems: () => Object.values(USER_STATUS),
                },
                {
                    filterTitle: 'Даты',
                    field: USER_FIELD_NAME.dateRange,
                    type: FilterTypeEnum.DATE_RANGE,
                    dateRangeValue: context.state.dateRange,
                },
            ]}
            changeFilter={context.changeFilters}
            showSidebar
            id="spring-cloud-blank-user-list"
        />
    </FlexBox>
);

export default userListTemplate;
