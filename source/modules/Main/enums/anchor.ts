import { SimpleObjectInterface } from '../../Global/interfaces/simpleObject';

export interface AnchorInterface {
    [value: string]: SimpleObjectInterface;
    PROJECTS_LINK: SimpleObjectInterface;
    EXISTING_PROJECTS_LINK: SimpleObjectInterface;
}

const ANCHOR: AnchorInterface = {
    PROJECTS_LINK: {
        name: '',
        value: 'PROJECTS_LINK',
    },
    EXISTING_PROJECTS_LINK: {
        name: '',
        value: 'EXISTING_PROJECTS_LINK',
    },
};

export default ANCHOR;
