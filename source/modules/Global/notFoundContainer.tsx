import { FlexBox } from '@romger/react-flex-layout';
import * as React from 'react';

const NotFound = () => (
    <FlexBox
        row="ctr"
        className="title-page-primary not-found"
    >
        <FlexBox
            node="p"
            row="ctr"
        >
            404 страница не найдена
        </FlexBox>
    </FlexBox>
);

export default NotFound;
