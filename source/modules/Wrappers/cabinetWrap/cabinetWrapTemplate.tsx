import { FlexBox } from '@romger/react-flex-layout';
import classnames from 'classnames';
import * as React from 'react';
import ReactSVG from 'react-svg';
import CabinetRouter from '../../../routers/cabinetRouter';
import { CabinetWrapInterface } from './cabinetWrapContainer';

const cabinetWrapTemplate = (context: CabinetWrapInterface): JSX.Element => {
    return (
        <FlexBox
            row="start stretch"
            className={classnames('main-wrap')}
        >
            <FlexBox
                column="start stretch"
                className={classnames('main-wrap__left-panel', {
                    'main-wrap__left-panel--settings-panel':
                        !!context.openChildMenuItems &&
                        !!context.openChildMenuItems.length &&
                        !!context.openChildMenuItems[0],
                })}
            >
                <FlexBox
                    row="ctr"
                    className={classnames('main-wrap__main-logo')}
                    onClick={() => context.goToMain()}
                >
                    <img
                        className={classnames('main-wrap__logo')}
                        src="assets/images/white_logo_36px.png"
                    />
                </FlexBox>
                {!!context.state.items &&
                    !!context.state.items.length &&
                    context.state.items.filter(item => !item.hide)
                        .map((item, key) =>
                        item.flex ? (
                            <FlexBox
                                key={key}
                                flex={true}
                            />
                        ) :
                        context.wrapTooltip((
                            <FlexBox
                                key={key}
                                row="ctr"
                                className={classnames(
                                    'main-wrap__item-menu',
                                    {
                                        'main-wrap__item-menu--selected': !!item.selected,
                                        'main-wrap__item-menu--simple': !!item.simpleVisible,
                                    },
                                )}
                                onClick={() =>
                                    context.handlerClickMainItem(key)
                                }
                            >
                                {item.showNotifyCircle && (
                                    <div
                                        className={classnames(
                                            'main-wrap__notify-circle',
                                        )}
                                    >
                                        {item.notifyCountValue}
                                    </div>
                                )}
                                {item.isIconSVG ? (
                                    <ReactSVG
                                        src={`assets/images/svg/${
                                            item.icon
                                        }.svg`}
                                    />
                                ) : (
                                    <i
                                        className={classnames('material-icons')}
                                    >
                                        {item.icon}
                                    </i>
                                )}
                            </FlexBox>
                        ),                  item.tooltip),
                    )}
            </FlexBox>
            {!!context.isOpenChildMenu &&
                !!context.openChildMenuItems &&
                !!context.openChildMenuItems.length && (
                    <FlexBox
                        className={classnames(
                            'main-wrap__left-child-panel',
                            'rg-invest-scrollbar',
                            'main-wrap__left-child-panel--settings-panel',
                        )}
                    >
                        {context.openChildMenuItems.map((child, index) =>
                            !!child.subTitle || !!child.mainTitle ? (
                                !!child.subTitle ? (
                                    <FlexBox
                                        key={index}
                                        row="start ctr"
                                        className={classnames(
                                            'main-wrap__item-child-menu-sub-title',
                                        )}
                                    >
                                        {child.title}
                                    </FlexBox>
                                ) : (
                                    <FlexBox
                                        key={index}
                                        row="start ctr"
                                        className={classnames(
                                            'main-wrap__item-child-menu-main-title',
                                        )}
                                    >
                                        {child.title}
                                    </FlexBox>
                                )
                            ) : !!child.customHTML ? (
                                <div
                                    key={index}
                                    className={classnames(
                                        'main-wrap__wrap-item-child-menu',
                                    )}
                                >
                                    {child.customHTML}
                                </div>
                            ) : child.isSeparateLine ? (
                                <div
                                    key={index}
                                    className={classnames(
                                        'main-wrap__item-child-menu',
                                        'main-wrap__item-child-menu--separate-line',
                                    )}
                                />
                            ) : (
                                <FlexBox
                                    key={index}
                                    row="start ctr"
                                    className={classnames(
                                        'main-wrap__item-child-menu',
                                        {
                                            'main-wrap__item-child-menu--selected': !!child.selected,
                                        },
                                    )}
                                    onClick={() =>
                                        context.handlerClickChildItem(index)
                                    }
                                >
                                    <div
                                        className={classnames(
                                            'main-wrap__item-child-menu--icon-wrap',
                                        )}
                                    >
                                        {child.isIconSVG ? (
                                            <ReactSVG
                                                src={`assets/images/svg/${
                                                    child.icon
                                                }.svg`}
                                            />
                                        ) : (
                                            <i
                                                className={classnames(
                                                    'material-icons',
                                                )}
                                            >
                                                {child.icon}
                                            </i>
                                        )}
                                    </div>
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
                )}

            <FlexBox
                flex={true}
                column="start"
                className={classnames('main-wrap__content')}
            >
                <div
                    className={classnames('main-wrap__container')}
                >
                    <FlexBox
                        flex={true}
                        column="start"
                        className={classnames('main-wrap__content-panel', {
                            'main-wrap__content-panel--full-width': !!context.isFullWidthState(),
                        })}
                    >
                        <CabinetRouter/>
                    </FlexBox>
                </div>
            </FlexBox>
        </FlexBox>
    );
};

export default cabinetWrapTemplate;
