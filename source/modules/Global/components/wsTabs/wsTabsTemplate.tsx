import { FlexBox } from '@romger/react-flex-layout';
import classnames from 'classnames';
import * as React from 'react';
import { RgTabItem, RgTabsInterface } from './wsTabsComponent';

const wsTabsTemplate = (context: RgTabsInterface): JSX.Element => {
    return (
        <FlexBox
            className={classnames(
                'rg-tabs',
            )}
            column="start stretch"
        >
            <FlexBox
                className={classnames(
                    'rg-tabs__header',
                )}
                rowWrap="start center"
            >
                {
                    context.props.tabs.map((tab: RgTabItem, index: number) => {
                        return (
                            <FlexBox
                                key={index}
                                className={classnames(
                                    'rg-tabs__header-item',
                                    {
                                        'rg-tabs__header-item--active': context.state.selectIndex === index,
                                    },
                                )}
                                onClick={() => context.selectTab(index)}
                            >
                                {
                                    tab.title
                                }
                            </FlexBox>
                        );
                    },
                    )
                }
            </FlexBox>
            <FlexBox
                className={classnames(
                    'rg-tabs__body',
                )}
            >
                {
                    context.props.tabs[context.state.selectIndex].body
                }
            </FlexBox>
        </FlexBox>
    );
};

export default wsTabsTemplate;
