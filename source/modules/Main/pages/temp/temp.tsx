import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import useActions from '../../../../hooks/useActions';
import { action_1_1, action_1_2 } from '../../../../store/actions/action_1';
import { State } from '../../../../store/reducers';
import { getValue11, getValue12 } from '../../../../store/selectors/selector1';

const Temp = () => {
    const actions = useActions({ action_1_1, action_1_2 });
    const value11 = useSelector(getValue11);
    const value12 = useSelector(getValue12);
    useEffect(
        () => {
            actions.action_1_1({ value11: '123' });
            actions.action_1_2({ value12: '321' });
        },
        [],
    );
    window.console.log({ value11, value12 });
    return <div>temp</div>
}

export default connect((state: State) => ({ reducer1: state.reducer1 }))(Temp);
