import { RgReactBaseService } from '@romger/react-base-components';
import { GlobalStore } from '@romger/react-global-module/lib/store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import testHookTemplate from './testHookTemplate';

export interface ITestHookProps {
    globalStore?: GlobalStore;
    count: number | null;
}

export interface ISimple {
    name: string | null;
}

export interface ITestHookState {
    name: ISimple | null;
    simpleName: string | null;
    setName: React.Dispatch<React.SetStateAction<ISimple | null>>;
    setSimpleName: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ITestHook {
    props: ITestHookProps;
    state: ITestHookState;
    loadDictionary: () => void;
}

const TestHook = (props: ITestHookProps) => {
    const [name, setName] = React.useState<ISimple | null>(null);
    const [simpleName, setSimpleName] = React.useState<string | null>(null);
    const prevCount: number | null = RgReactBaseService.usePrevious<number | null>(props.count); // предыдущая версия значения переменной props.count в любой момент времени
    const state: ITestHookState = {
        name,
        simpleName,
        setName,
        setSimpleName,
    };

    /**
     * Загружаем что-то при первой загрузке компонента
     */
    React.useEffect(
        () => loadDictionary(),
        [],
    );

    /**
     * Что делать, если изменилось значение props.count (типа componentWillReceiveProps)
     */
    React.useEffect(
        () => {
            window.console.log(prevCount, props.count);
        },
        [props.count],
    );

    RgReactBaseService.useCallWithTimeout('name', name, () => loadDictionary());
    RgReactBaseService.useCallWithTimeout('simpleName', simpleName, () => loadDictionary());

    /**
     * Загрузить записи справочника
     */
    const loadDictionary = (): void => {
        RgReactBaseService.promiseWithLoading(
            props.globalStore,
            new Promise((resolve) => {
                window.setTimeout(() => resolve('123'), 1000);
            }),
        )
        .then((res: any) => {
            state.setSimpleName(res);
        });
    };

    const _this: ITestHook = {
        props,
        state,
        loadDictionary,
    };
    return testHookTemplate.call(_this);
};

export default inject('globalStore')(observer(TestHook));
