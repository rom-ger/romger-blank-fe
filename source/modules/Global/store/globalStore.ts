import { action, observable } from 'mobx';

export interface RedirectInterface {
    pathname: string;
    search: any;
}

class GlobalStore {
    @observable loading: boolean;
    @observable redirect: RedirectInterface | null;
    @observable pressKeyCode: number | null;
    @observable location: any;
    KEY_CODE_CTRL: number;

    constructor() {
        this.loading = false;
        this.redirect = null;
        this.pressKeyCode = null;
        this.KEY_CODE_CTRL = 17;
    }

    /**
     * Слушаем нажатие кнопки ctrl
     */
    handlerPressControl() {
        window.addEventListener('keydown', (e: KeyboardEvent) => this.setPressKeyCode(e.keyCode));
        window.addEventListener('keyup', (e: KeyboardEvent) => this.setPressKeyCode(null));
    }

    @action('set location')
    setLocation(location: any) {
        this.location = location;
    }

    @action('set press key code')
    setPressKeyCode(keyCode: number | null) {
        this.pressKeyCode = keyCode;
    }

    @action('start loading')
    startLoading = () => {
        this.loading = true;
    }

    @action('stop loading')
    stopLoading = () => {
        this.loading = false;
    }

    @action('go to state')
    goToState = (stateName: string, params: any = null) => {
        window.scrollTo(0, 0);
        this.redirect = {
            pathname: stateName,
            search: params ? params : null,
        };
    }

    @action('clear redirect')
    clearRedirect = () => {
        this.redirect = null;
    }
}

const globalStore = new GlobalStore();

export default globalStore;
export { GlobalStore };
