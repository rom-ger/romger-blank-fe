import { RgReactBaseService } from '@romger/react-base-components';
import { FlexBox } from '@romger/react-flex-layout';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import classnames from 'classnames';
import React, { useRef, useState } from 'react';
import ReactSVG from 'react-svg';
import { IItemMenu } from '../../../Global/interfaces/IItemMenu';
import { UtilService } from '../../../Global/services/utilService';

interface ITopNavProps {
    globalStore: GlobalStore;
    menuItems: IItemMenu[];
    profileBlockItems?: ITopNavProfileBlockItem[];
}

interface ITopNavProfileBlockItem {
    icon: string;
    title: string;
    onClick: () => any;
}

export const TopNav = (props: ITopNavProps) => {
    const [showExpandedMenu, setShowExpandedMenu] = useState(false);
    const [showExpandedProfileBlock, setShowExpandedProfileBlock] = useState(false);
    const profileBlockRef = useRef<HTMLDivElement | null>(null);

    const isMenuItemHasAction = (menuItem: IItemMenu) => {
        return (!menuItem.child || (menuItem.child && !menuItem.child.length))
            && (!!menuItem.state || !!menuItem.onClick);
    };

    const menuItemClickAction = (menuItem: IItemMenu) => {
        if (!isMenuItemHasAction(menuItem)) return;

        if (!!menuItem.state) {
            RgReactBaseService.goToState(props.globalStore, menuItem.state);
        }

        if (!!menuItem.onClick) {
            menuItem.onClick();
        }

        setShowExpandedMenu(false);
    };

    const openProfileBlock = () => {
        setShowExpandedProfileBlock(true);

        if (profileBlockRef.current) {
            UtilService.handlerOutsideClick(
                profileBlockRef.current,
                () => setShowExpandedProfileBlock(false),
                true,
            );
        }
    };

    const getFilteredMenuItems = (menuItems: IItemMenu[]) =>
        menuItems.filter(item => !item.flex
            && item.title
            && !item.hide,
        );

    return (
        <>
            <FlexBox
                row={'start ctr'}
                className={classnames('top-nav')}
            >
                {
                    !!getFilteredMenuItems(props.menuItems).length &&
                    <div
                        className={classnames('top-nav__icon')}
                        onClick={() => setShowExpandedMenu(!showExpandedMenu)}
                    >
                        <ReactSVG
                            src={'assets/images/svg/ic_menu-vert_24px.svg'}
                        />
                    </div>
                }
                <div
                    className={classnames('top-nav__icon')}
                    onClick={() => RgReactBaseService.goToState(props.globalStore, '/cabinet')}
                >
                    <img
                        src={'assets/images/white_logo_36px.png'}
                    />
                </div>
                <FlexBox
                    flex
                />
                <div
                    className={classnames(
                        'top-nav__icon',
                        'top-nav__icon--without-margin',
                    )}
                    onClick={
                        () => showExpandedProfileBlock
                            ? setShowExpandedProfileBlock(false)
                            : openProfileBlock()
                    }
                >
                    <i
                        className={classnames('material-icons')}
                    >
                        person
                    </i>
                </div>
                {
                    props.profileBlockItems &&
                    <div
                        ref={profileBlockRef}
                        className={classnames(
                            'top-nav__profile-block',
                            {
                                'top-nav__profile-block--expanded': showExpandedProfileBlock,
                            },
                        )}
                    >
                        {
                            props.profileBlockItems.map((profileBlockItem: ITopNavProfileBlockItem, index: number) => (
                                <FlexBox
                                    row={'start ctr'}
                                    key={index}
                                    className={classnames('top-nav__profile-block-item')}
                                    onClick={() => profileBlockItem.onClick()}
                                >
                                    <div
                                        className={classnames('top-nav__profile-block-icon')}
                                    >
                                        <i
                                            className={classnames('material-icons')}
                                        >
                                            {profileBlockItem.icon}
                                        </i>
                                    </div>
                                    <div
                                        className={classnames('top-nav__profile-block-title')}
                                    >
                                        {profileBlockItem.title}
                                    </div>
                                </FlexBox>
                            ))
                        }
                    </div>
                }
            </FlexBox>
            <FlexBox
                className={classnames(
                    'top-nav__menu',
                    {
                        'top-nav__menu--expanded': showExpandedMenu,
                    },
                )}
            >
                <FlexBox
                    row={'start ctr'}
                    className={classnames('top-nav__menu-header')}
                >
                    <div
                        className={classnames(
                            'top-nav__icon',
                            'top-nav__icon--dark',
                        )}
                        onClick={() => setShowExpandedMenu(!showExpandedMenu)}
                    >
                        <ReactSVG
                            src={'assets/images/svg/ic_close_24px.svg'}
                        />
                    </div>
                </FlexBox>
                <div
                    className={classnames(
                        'top-nav__header-delimiter-wrapper',
                    )}
                >
                    <div
                        className={classnames(
                            'top-nav__header-delimiter',
                        )}
                    />
                </div>
                <FlexBox
                    rowWrap={'start'}
                    className={classnames(
                        'top-nav__menu-items',
                    )}
                >
                    {
                        getFilteredMenuItems(props.menuItems)
                            .map((menuItem: IItemMenu, index: number) => (
                                <FlexBox
                                    flex
                                    key={index}
                                    shrink={'0'}
                                    className={classnames(
                                        'top-nav__menu-item',
                                    )}
                                >
                                    <FlexBox
                                        row={'start'}
                                        className={classnames(
                                            'top-nav__menu-item-header',
                                            {
                                                'top-nav__menu-item-header--active': isMenuItemHasAction(menuItem),
                                            },
                                        )}
                                        onClick={() => menuItemClickAction(menuItem)}
                                    >
                                        {
                                            menuItem.isIconSVG &&
                                            menuItem.iconPath &&
                                            <ReactSVG
                                                src={menuItem.iconPath}
                                                className={classnames(
                                                    'top-nav__menu-item-icon',
                                                )}
                                            />
                                        }
                                        {
                                            !menuItem.isIconSVG &&
                                            menuItem.icon &&
                                            <div
                                                className={classnames(
                                                    'top-nav__menu-item-icon',
                                                )}
                                            >
                                                <i
                                                    className={classnames('material-icons')}
                                                >
                                                    {menuItem.icon}
                                                </i>
                                            </div>
                                        }
                                        <div
                                            className={classnames(
                                                'top-nav__menu-item-title',
                                            )}
                                        >
                                            {menuItem.title}
                                        </div>
                                    </FlexBox>
                                    {
                                        menuItem.child &&
                                        getFilteredMenuItems(menuItem.child)
                                            .map((menuItemChild: IItemMenu, i: number) => (
                                                <FlexBox
                                                    key={i}
                                                    row="start start"
                                                    className={classnames(
                                                        'top-nav__menu-item-child',
                                                        {
                                                            'top-nav__menu-item-child--active': isMenuItemHasAction(menuItemChild),
                                                        },
                                                    )}
                                                    onClick={() => menuItemClickAction(menuItemChild)}
                                                >
                                                    {
                                                        isMenuItemHasAction(menuItemChild) &&
                                                        <>
                                                            {
                                                                menuItemChild.isIconSVG &&
                                                                menuItemChild.iconPath &&
                                                                <ReactSVG
                                                                    src={menuItemChild.iconPath}
                                                                    className={classnames(
                                                                        'top-nav__menu-item-icon',
                                                                    )}
                                                                />
                                                            }
                                                            {
                                                                !menuItemChild.isIconSVG &&
                                                                menuItemChild.icon &&
                                                                <div
                                                                    className={classnames(
                                                                        'top-nav__menu-item-icon',
                                                                    )}
                                                                >
                                                                    <i
                                                                        className={classnames('material-icons')}
                                                                    >
                                                                        {menuItemChild.icon}
                                                                    </i>
                                                                </div>
                                                            }
                                                        </>
                                                    }
                                                    <span></span>{menuItemChild.title}
                                                </FlexBox>
                                            ))
                                    }
                                </FlexBox>
                            ))
                    }
                </FlexBox>
            </FlexBox>
        </>
    );
};
