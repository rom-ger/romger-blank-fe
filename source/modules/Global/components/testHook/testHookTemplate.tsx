import { FlexBox } from '@romger/react-flex-layout';
import { RgReactInput } from '@romger/react-input';
import classnames from 'classnames';
import * as React from 'react';
import { ITestHook } from './testHook';

const testHookTemplate = function (this: ITestHook): JSX.Element {
    return (
        <FlexBox
            className={classnames(
                'test-hook',
            )}
            column="start stretch"
        >
            <RgReactInput
                value={this.state.name?.name ?? ''}
                label="Название"
                updateCallback={(e: any) => this.state.setName(e?.target?.value ? { name: e?.target?.value } : null)}
            />
            <RgReactInput
                value={this.state.simpleName ?? ''}
                label="простое Название"
                updateCallback={(e: any) => this.state.setSimpleName(e?.target?.value ?? null)}
            />
            {
                this.props.globalStore?.loading ? 'yes' : 'no'
            }
        </FlexBox>
    );
};

export default testHookTemplate;
