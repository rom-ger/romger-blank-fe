import { FlexBox } from '@romger/react-flex-layout';
import { RgReactInput } from '@romger/react-input';
import classnames from 'classnames';
import * as React from 'react';
import { LoginPageInterface } from './loginContainer';

const loginTemplate = (context: LoginPageInterface): JSX.Element => {
    return (
        <FlexBox
            column="start ctr"
            className={classnames('auth-wrap')}
        >
            <FlexBox
                column="ctr"
                className={classnames(
                    'auth-wrap__content',
                    'auth-wrap__content--sign-in',
                )}
            >
                <div
                    className={classnames(
                        'auth-wrap__card',
                        'auth-wrap__card--sign-in',
                    )}
                >
                    <FlexBox
                        column="start ctr"
                        className={classnames('auth-wrap__card-content')}
                    >
                        <h1
                            className={classnames(
                                'auth-wrap__card-title',
                                'subheader-2--primary',
                            )}
                        >
                            Вход
                        </h1>
                        <RgReactInput
                            value={context.state.email}
                            placeholder="Логин"
                            onEnter={(): any => context.login()}
                            updateCallback={(e): any =>
                                context.updateState<string>(e.target.value, 'email')
                            }
                        />
                        <RgReactInput
                            type="password"
                            placeholder="Пароль"
                            value={context.state.password}
                            onEnter={(): any => context.login()}
                            updateCallback={(e): any =>
                                context.updateState<string>(e.target.value, 'password')
                            }
                        />
                        {!!context.state.errorMessage && (
                            <div
                                className={classnames('auth-wrap__error')}
                            >
                                {context.state.errorMessage}
                            </div>
                        )}
                        <FlexBox
                            row="ctr"
                            className={classnames(
                                'auth-wrap__action',
                                'label-4--white',
                                {
                                    'auth-wrap__action--disabled': !context.loginIsValid(),
                                },
                            )}
                            onClick={() =>
                                context.loginIsValid() ? context.login() : null
                            }
                        >
                            Войти
                        </FlexBox>
                    </FlexBox>
                </div>
            </FlexBox>
        </FlexBox>
    );
};

export default loginTemplate;
