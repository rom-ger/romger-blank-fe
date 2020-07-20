import { FlexBox } from '@romger/react-flex-layout';
import { SimpleObjectInterface } from '@romger/react-global-module/lib/interfaces';
import { RgReactInput } from '@romger/react-input';
import { RgReactSelect } from '@romger/react-select';
import classnames from 'classnames';
import * as React from 'react';
import { UtilService } from '../../../Global/services/utilService';
import { IUserCreatePage } from './userCreateContainer';

const WIDTH_LABEL = 125;
const userCreateTemplate = function (this: IUserCreatePage): JSX.Element {
    return (
        <div
            className={classnames(
                'user-create',
            )}
        >
            <FlexBox
                row="start center"
                className={classnames(
                    'user-edit_title',
                )}
            >
                <h1
                    className={classnames(
                        'title-primary',
                    )}
                >
                    Создание пользователя
                </h1>
                <FlexBox
                    flex={true}
                >
                </FlexBox>
                <a
                    className={classnames(
                        'dictionary-list__button',
                    )}
                    href={
                        this.props.globalStore && this.props.globalStore.prevLocation
                            ? `#${this.props.globalStore.prevLocation.pathname}${this.props.globalStore.prevLocation.search ? this.props.globalStore.prevLocation.search : ''}`
                            : '#/cabinet/users/list'
                    }
                >
                    Отмена
                </a>
            </FlexBox>
            <RgReactInput
                placeholder="Логин"
                label="Логин"
                maxSize={UtilService.BASE_MAX_SIZE_INPUT}
                required={true}
                widthLabel={WIDTH_LABEL}
                value={this.state.username ? this.state.username : ''}
                updateCallback={(e: any) => this.state.setUsername(e?.target?.value ?? null)}
            />
            <RgReactInput
                placeholder="Пароль"
                label="Пароль"
                maxSize={UtilService.BASE_MAX_SIZE_INPUT}
                required={true}
                validPassword
                type="password"
                widthLabel={WIDTH_LABEL}
                value={this.state.password ? this.state.password : ''}
                updateCallback={(e: any) => this.state.setPassword(e?.target?.value ?? null)}
            />
            <RgReactInput
                placeholder="Имя"
                label="Имя"
                maxSize={UtilService.BASE_MAX_SIZE_INPUT}
                required={true}
                widthLabel={WIDTH_LABEL}
                value={this.state.firstName ? this.state.firstName : ''}
                updateCallback={(e: any) => this.state.setFirstName(e?.target?.value ?? null)}
            />
            <RgReactInput
                placeholder="Отчество"
                label="Отчество"
                maxSize={UtilService.BASE_MAX_SIZE_INPUT}
                widthLabel={WIDTH_LABEL}
                value={this.state.middleName ? this.state.middleName : ''}
                updateCallback={(e: any) => this.state.setMiddleName(e?.target?.value ?? null)}
            />
            <RgReactInput
                placeholder="Фамилия"
                label="Фамилия"
                maxSize={UtilService.BASE_MAX_SIZE_INPUT}
                required={true}
                widthLabel={WIDTH_LABEL}
                value={this.state.lastName ? this.state.lastName : ''}
                updateCallback={(e: any) => this.state.setLastName(e?.target?.value ?? null)}
            />
            <RgReactInput
                placeholder="E-mail"
                label="E-mail"
                maxSize={UtilService.BASE_MAX_SIZE_INPUT}
                required={true}
                emailValidation
                widthLabel={WIDTH_LABEL}
                value={this.state.email ? this.state.email : ''}
                updateCallback={(e: any) => this.state.setEmail(e?.target?.value ?? null)}
            />
            <RgReactInput
                placeholder="Телефон"
                label="Телефон"
                maxSize={UtilService.BASE_MAX_SIZE_INPUT}
                phoneValidation
                widthLabel={WIDTH_LABEL}
                value={this.state.phone ? this.state.phone : ''}
                updateCallback={(e: any) => this.state.setPhone(e?.target?.value ?? null)}
            />
            <RgReactSelect
                required
                label="Роль"
                placeholder="Роль"
                widthLabel={WIDTH_LABEL}
                model={this.state.role}
                updateModelHandler={(model: SimpleObjectInterface | null) => this.state.setRole(model)}
                items={(searchString?: string | null) => this.rolesForSelect}
                visibleField="name"
                modelField="value"
            />
            <FlexBox
                row="center center"
                className={classnames(
                    'rg-action',
                    {
                        'rg-action--disabled': !this.isValidForm(),
                    },
                )}
                onClick={() => this.isValidForm() ? this.updateAction() : null}
            >
                Сохранить
            </FlexBox>
        </div>
    );
};

export default userCreateTemplate;
