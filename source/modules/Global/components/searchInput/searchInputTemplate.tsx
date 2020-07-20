import { RgReactInput } from '@romger/react-input';
import classnames from 'classnames';
import * as React from 'react';
import { SearchInputInterface } from './searchInput';

const searchInputTemplate = (context: SearchInputInterface): JSX.Element | false => {
    return (
        <div
            className={classnames(
                'search-input',
            )}
        >
            <RgReactInput
                value={!!context.state.value ? context.state.value : ''}
                updateCallback={e => context.updateState<string>(e && e.target && e.target.value ? e.target.value : '', 'value', () => context.props.updateCallback(context.state.value ? context.state.value : ''))}
            />
            <div
                className={classnames(
                    'search-input__find-icon',
                )}
            >
                <i
                    className={classnames(
                        'material-icons',
                    )}
                >
                    search
                </i>
            </div>
            <div
                className={classnames(
                    'search-input__close-icon',
                )}
            >
                <i
                    className={classnames(
                        'material-icons',
                    )}
                    onClick={() => context.updateState<string>('', 'value', () => context.props.closeCallback(), 0)}
                >
                    close
                </i>
            </div>
        </div>
    );
};

export default searchInputTemplate;
