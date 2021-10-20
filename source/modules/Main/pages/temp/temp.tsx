import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import useActions from '../../../../hooks/useActions';
import { action_1_1 } from '../../../../store/actions/action_1';
import { getValue11, getValue12 } from '../../../../store/selectors/selector1';
import reducer1 from '../../../../store/reducers/reducer_1';

const Temp = () => {
    const actions = useActions({ action_1_1 });
    const value11 = useSelector(getValue11);
    const value12 = useSelector(getValue12);
    useEffect(
        () => {
            actions.action_1_1({ value11: '123' });
        },
        [],
    );
    window.console.log({ value11, value12 });
    return <div>temp</div>
}

export default connect(() => ({ reducer1 }))(Temp);
