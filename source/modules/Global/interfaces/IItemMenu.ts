export interface IItemMenu {
    flex?: boolean;
    title?: string;
    icon?: string;
    iconPath?: string;
    state?: string;
    childState?: string;
    selected?: boolean;
    tooltip?: string;
    isIconSVG?: boolean;
    notAutoGoToChild?: boolean;
    isAddMenu?: boolean;
    child?: IItemMenu[];
    onClick?: () => any;
    hide?: boolean;
}
