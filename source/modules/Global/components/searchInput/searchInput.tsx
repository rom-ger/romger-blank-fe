import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import { inject, observer } from 'mobx-react';
import { GlobalStore } from '../../../Global/store/globalStore';
import searchInputTemplate from './searchInputTemplate';

interface SearchInputProps {
    globalStore?: GlobalStore;
    updateCallback(value: string): any;
    closeCallback(): any;
}

interface SearchInputState {
    value: string | null;
}

export interface SearchInputInterface extends RgReactBaseComponentInterface {
    state: SearchInputState;
    props: SearchInputProps;
}

@inject('globalStore')
@observer
export class SearchInput
    extends RgReactBaseComponent<SearchInputProps, SearchInputState>
    implements SearchInputInterface {
    readonly state: SearchInputState = {
        value: null,
    };

    componentDidMount() {
        window.setTimeout(
            () =>
                document
                    .getElementsByClassName('search-input')[0]
                    .getElementsByTagName('input')[0]
                    .focus(),
            0,
        );
    }

    render(): false | JSX.Element {
        return (searchInputTemplate(this));
    }
}

export default SearchInput;
