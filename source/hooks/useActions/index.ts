import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

type Indexable = {
    [index: string]: any;
};

/*
    Обертка над useDispatch для удобного использования с несколькими экшенами

    const {actionA, actionB, actionC} = useActions({
        actionA: importedActionA,
        actionB: importedActionB,
        actionC: importedActionC,
    });
*/
const useActions = (config: Indexable): Indexable => {
    const dispatch = useDispatch();
    const start: any = {};
    return useMemo(
        () =>
            Object.keys(config)
                  .reduce(
                      (acc, actionName) => {
                          const action = config[actionName];
                          acc[actionName] = bindActionCreators(action, dispatch);

                          return acc;
                      },
                      start,
                  ),
        [dispatch],
    );
};

export default useActions;
