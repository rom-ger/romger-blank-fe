import classnames from 'classnames';
import * as React from 'react';
import { MainPageInterface } from './mainPageContainer';

const mainPageTemplate = (context: MainPageInterface): JSX.Element => {
    return (
        <>
            <div
                className={classnames('cabinet')}
            >
                Главная страница админки
            </div>
        </>
    );
};

export default mainPageTemplate;
