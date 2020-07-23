import { FlexBox } from '@romger/react-flex-layout';
import { RgReactInput } from '@romger/react-input';
import classnames from 'classnames';
import * as React from 'react';
import { UtilService } from '../../../Global/services/utilService';
import { IUserEditPage } from './userEditContainer';

const WIDTH_LABEL = 125;
const userEditTemplate = (context: IUserEditPage) => (
    <div
        className={classnames(
            'user-edit',
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
                Редактирование пользователя
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
                    context.props.globalStore && context.props.globalStore.prevLocation
                        ? `#${context.props.globalStore.prevLocation.pathname}${context.props.globalStore.prevLocation.search ? context.props.globalStore.prevLocation.search : ''}`
                        : '#/cabinet/users/list'
                }
            >
                Назад
            </a>
        </FlexBox>
        <RgReactInput
            placeholder="Логин"
            label="Логин"
            maxSize={UtilService.BASE_MAX_SIZE_INPUT}
            required={true}
            disabled={true}
            widthLabel={WIDTH_LABEL}
            value={context.state.username ? context.state.username : ''}
            updateCallback={(e: any) => context.updateState(e && e.target && e.target.value ? e.target.value : '', 'username')}
        />
        <RgReactInput
            placeholder="Имя"
            label="Имя"
            maxSize={UtilService.BASE_MAX_SIZE_INPUT}
            required={true}
            widthLabel={WIDTH_LABEL}
            value={context.state.firstName ? context.state.firstName : ''}
            updateCallback={(e: any) => context.updateState(e && e.target && e.target.value ? e.target.value : '', 'firstName')}
        />
        <RgReactInput
            placeholder="Отчество"
            label="Отчество"
            maxSize={UtilService.BASE_MAX_SIZE_INPUT}
            widthLabel={WIDTH_LABEL}
            value={context.state.middleName ? context.state.middleName : ''}
            updateCallback={(e: any) => context.updateState(e && e.target && e.target.value ? e.target.value : '', 'middleName')}
        />
        <RgReactInput
            placeholder="Фамилия"
            label="Фамилия"
            maxSize={UtilService.BASE_MAX_SIZE_INPUT}
            required={true}
            widthLabel={WIDTH_LABEL}
            value={context.state.lastName ? context.state.lastName : ''}
            updateCallback={(e: any) => context.updateState(e && e.target && e.target.value ? e.target.value : '', 'lastName')}
        />
        <RgReactInput
            placeholder="E-mail"
            label="E-mail"
            required={true}
            maxSize={UtilService.BASE_MAX_SIZE_INPUT}
            emailValidation
            widthLabel={WIDTH_LABEL}
            value={context.state.email ? context.state.email : ''}
            updateCallback={(e: any) => context.updateState(e && e.target && e.target.value ? e.target.value : '', 'email')}
        />
        <RgReactInput
            placeholder="Телефон"
            label="Телефон"
            maxSize={UtilService.BASE_MAX_SIZE_INPUT}
            phoneValidation
            widthLabel={WIDTH_LABEL}
            value={context.state.phone ? context.state.phone : ''}
            updateCallback={(e: any) => context.updateState(e && e.target && e.target.value ? e.target.value : '', 'phone')}
        />
        <FlexBox
            row="center center"
            className={classnames(
                'ws-action',
                {
                    'ws-action--disabled': !context.isValidForm(),
                },
            )}
            onClick={() => context.isValidForm() ? context.updateAction() : null}
        >
            Сохранить
        </FlexBox>
    </div>
);

export default userEditTemplate;
