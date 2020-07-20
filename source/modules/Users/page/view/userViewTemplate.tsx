import { FlexBox } from '@romger/react-flex-layout';
import { SimpleObjectInterface } from '@romger/react-global-module/lib/interfaces';
import { RgReactInput } from '@romger/react-input';
import { RgReactBaseModal } from '@romger/react-modal-dialog';
import classnames from 'classnames';
import * as React from 'react';
import USER_ROLE from '../../../Auth/enums/userRoles';
import { IUserViewPage } from './userViewContainer';

const WIDTH_LABEL = 125;
const userViewTemplate = (context: IUserViewPage) => (
    <div
        className={classnames(
            'user-view',
        )}
    >
        <RgReactBaseModal
            title="Смена пароля"
            show={context.state.showModal}
            closeCallback={context.hideModal}
            actions={[
                {
                    isDefaultCancel: true,
                },
                {
                    title: 'Сохранить',
                    isDisabled: () => !context.isValidForm(),
                    onClick: () => context.updatePassword(),
                },
            ]}
        >
            <RgReactInput
                placeholder="Новый пароль"
                label="Новый пароль"
                type="password"
                widthLabel={WIDTH_LABEL}
                required={true}
                value={context.state.newPassword ? context.state.newPassword : ''}
                updateCallback={(e: any) => context.updateState(e && e.target && e.target.value ? e.target.value : '', 'newPassword')}
            />
            <RgReactInput
                placeholder="Подтверждение"
                label="Подтверждение"
                type="password"
                widthLabel={WIDTH_LABEL}
                required={true}
                value={context.state.repeatPassword ? context.state.repeatPassword : ''}
                updateCallback={(e: any) => context.updateState(e && e.target && e.target.value ? e.target.value : '', 'repeatPassword')}
            />
            Требования к паролю:
            <br/>
            1. Латиница.Длинна не менее 8 символов
            <br/>
            2. Должна быть хотя бы одна цифра
            <br/>
            3. Должна быть хотя бы одна прописная буква
            <br/>
            4. Должна быть хотя бы одна заглавная буква
        </RgReactBaseModal>
        <FlexBox
            row="start center"
            className={classnames(
                'user-view__title',
            )}
        >
            <h1
                className={classnames(
                    'title-primary',
                )}
            >
                Пользователь
            </h1>
            <FlexBox
                flex={true}
            >
            </FlexBox>
            <FlexBox
                row="end center"
            >
                {
                    !context.state.item?.roles.map((role: SimpleObjectInterface) => role.value === USER_ROLE.ADMIN.value)[0] &&
                    <>
                        {
                            context.state.item && context.state.item.enabled
                                ?
                                <div
                                    className={classnames(
                                        'dictionary-list__button',
                                    )}
                                    onClick={() => context.deactivateItem()}
                                >
                                    Деактивировать
                                </div>
                                :
                                <div
                                    className={classnames(
                                        'dictionary-list__button',
                                    )}
                                    onClick={() => context.activateItem()}
                                >
                                    Aктивировать
                                </div>
                        }
                        <a
                            className={classnames(
                                'dictionary-list__button',
                            )}
                            href={`#/cabinet/user/${context.props.match.params.id}/edit`}
                        >
                            Редактировать
                        </a>
                        <div
                            className={classnames(
                                'dictionary-list__button',
                            )}
                            onClick={() => context.updateState(true, 'showModal')}
                        >
                            Поменять пароль
                        </div>
                    </>
                }
                <a
                    className={classnames(
                        'dictionary-list__button',
                    )}
                    href={
                        context.props.globalStore && context.props.globalStore.prevLocation
                            ? `#${context.props.globalStore.prevLocation.pathname}${context.props.globalStore.prevLocation.search ? context.props.globalStore.prevLocation.search : ''}`
                            : '#/cabinet/users/list'
                    }
                >
                    Назад
                </a>
            </FlexBox>
        </FlexBox>
        <RgReactInput
            placeholder="Логин"
            label="Логин"
            widthLabel={WIDTH_LABEL}
            disabled={true}
            value={context.state.item && context.state.item.username ? context.state.item.username : ''}
        />
        <RgReactInput
            placeholder="Фамилия"
            label="Фамилия"
            widthLabel={WIDTH_LABEL}
            disabled={true}
            value={context.state.item && context.state.item.lastName ? context.state.item.lastName : ''}
        />
        <RgReactInput
            placeholder="Имя"
            label="Имя"
            widthLabel={WIDTH_LABEL}
            disabled={true}
            value={context.state.item && context.state.item.firstName ? context.state.item.firstName : ''}
        />
        <RgReactInput
            placeholder="Отчество"
            label="Отчество"
            widthLabel={WIDTH_LABEL}
            disabled={true}
            value={context.state.item && context.state.item.middleName ? context.state.item.middleName : ''}
        />
        <RgReactInput
            placeholder="Телефон"
            label="Телефон"
            widthLabel={WIDTH_LABEL}
            disabled={true}
            value={context.state.item && context.state.item.phone ? context.state.item.phone : ''}
        />
        <RgReactInput
            placeholder="Email"
            label="Email"
            widthLabel={WIDTH_LABEL}
            disabled={true}
            value={context.state.item && context.state.item.email ? context.state.item.email : ''}
        />
        <RgReactInput
            placeholder="Статус"
            label="Статус"
            widthLabel={WIDTH_LABEL}
            disabled={true}
            value={context.state.item && context.state.item.enabled ? 'Активный' : 'Заблокирован'}
        />
        <RgReactInput
            placeholder="Роль"
            label="Роль"
            widthLabel={WIDTH_LABEL}
            disabled={true}
            value={context.state.item && context.state.item.roles[0] ? context.state.item.roles[0].name : ''}
        />
    </div>
);

export default userViewTemplate;
