import { RgReactBaseService } from '@romger/react-base-components';
import { FlexBox } from '@romger/react-flex-layout';
import classnames from 'classnames';
import * as React from 'react';
import ReactSVG from 'react-svg';
import CabinetRouter from '../../../routers/cabinetRouter';
import { AuthService } from '../../Auth/services/authServices';
import { TopNav } from '../../Main/components/topNav/topNav';
import { CabinetWrapInterface } from './cabinetWrapContainer';

const cabinetWrapTemplate = (context: CabinetWrapInterface): JSX.Element => {
    return (
        <FlexBox
            row="start stretch"
            className={classnames('main-wrap')}
        >
            <FlexBox
                column="start stretch"
                className={classnames('main-wrap__left-panel')}
            >
                <FlexBox
                    row="ctr"
                    className={classnames('main-wrap__main-logo')}
                    onClick={() => context.goToMain()}
                >
                    <img
                        className={classnames('main-wrap__logo')}
                        src="assets/images/white_logo_36px.png"
                        alt={''}
                    />
                </FlexBox>
                {
                    context.state.items.filter(item => !item.hide)
                        .map((item, key) =>
                            item.flex
                                ?
                                (
                                    <FlexBox
                                        flex
                                        key={key}
                                    />
                                )
                                :
                                context.wrapTooltip(
                                    <FlexBox
                                        key={key}
                                        row="ctr"
                                        className={classnames(
                                            'main-wrap__item-menu',
                                            {
                                                'main-wrap__item-menu--selected': !!item.selected,
                                            },
                                        )}
                                        onClick={() => context.handlerClickMainItem(key)}
                                    >
                                        {
                                            item.isIconSVG &&
                                            item.iconPath &&
                                            <ReactSVG
                                                src={item.iconPath}
                                            />
                                        }
                                        {
                                            !item.isIconSVG &&
                                            item.icon &&
                                            <i
                                                className={classnames('material-icons')}
                                            >
                                                {item.icon}
                                            </i>
                                        }
                                    </FlexBox>,
                                    item.tooltip,
                                ),
                        )
                }
            </FlexBox>
            {
                context.isOpenChildMenu &&
                !!context.openChildMenuItems &&
                !!context.openChildMenuItems.length &&
                <FlexBox
                    className={classnames(
                        'main-wrap__left-child-panel',
                    )}
                >
                    {
                        context.openChildMenuItems.map((child, index) =>
                            (
                                <FlexBox
                                    key={index}
                                    row="start ctr"
                                    className={classnames(
                                        'main-wrap__item-child-menu',
                                        {
                                            'main-wrap__item-child-menu--selected': !!child.selected,
                                            'main-wrap__item-child-menu--only-text': !child.state && !child.onClick,
                                        },
                                    )}
                                    onClick={() => context.handlerClickChildItem(index)}
                                >
                                    {
                                        (child.iconPath || child.icon) &&
                                        <div
                                            className={classnames(
                                                'main-wrap__item-child-menu--icon-wrap',
                                            )}
                                        >
                                            {
                                                child.isIconSVG &&
                                                child.iconPath &&
                                                <ReactSVG
                                                    src={child.iconPath}
                                                />
                                            }
                                            {
                                                !child.isIconSVG &&
                                                child.icon &&
                                                <i
                                                    className={classnames(
                                                        'material-icons',
                                                    )}
                                                >
                                                    {child.icon}
                                                </i>
                                            }
                                        </div>
                                    }
                                    <div
                                        className={classnames(
                                            'main-wrap__item-child-menu--text',
                                        )}
                                    >
                                        {child.title}
                                    </div>
                                </FlexBox>
                            ),
                        )}
                </FlexBox>
            }

            <FlexBox
                flex
                column="start"
                className={classnames(
                    'main-wrap__content',
                )}
            >
                <div
                    className={classnames('main-wrap__container')}
                >
                    <TopNav
                        menuItems={context.state.items}
                        globalStore={context.props.globalStore}
                        profileBlockItems={[
                            {
                                icon: 'person',
                                title: 'Профиль',
                                onClick: () => RgReactBaseService.goToState(context.props.globalStore, '/cabinet/profile'),
                            },
                            {
                                icon: 'input',
                                title: 'Выход',
                                onClick: () => AuthService.logOut(),
                            },
                        ]}
                    />
                    <FlexBox
                        flex
                        column="start"
                        className={classnames('main-wrap__content-panel')}
                    >
                        <CabinetRouter/>
                    </FlexBox>
                </div>
            </FlexBox>
        </FlexBox>
    );
};

export default cabinetWrapTemplate;
