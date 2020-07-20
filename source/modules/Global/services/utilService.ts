export class UtilService {
    static BASE_MAX_SIZE_INPUT = 255;

    /**
     * Собираем имя пользователя вида Иванов В.В.
     * @returns {String}
     */
    public static concatPersonName(profileInfo: any | null, full?: boolean): string {
        if (!profileInfo) {
            return '';
        }
        let lastName: string | null = profileInfo.lastName ? profileInfo.lastName : null;
        let firstName: string | null = profileInfo.firstName ? profileInfo.firstName : null;
        let middleName: string | null = profileInfo.middleName ? profileInfo.middleName : null;
        if (!lastName && !firstName && !middleName) {
            return '';
        }
        if (!!lastName && !!firstName && !!middleName) {
            return full ? `${lastName} ${firstName} ${middleName}` : `${lastName} ${firstName.substr(0, 1)}.${middleName.substr(0, 1)}.`;
        }
        if (!!lastName && !!firstName && !middleName) {
            return full ? `${lastName} ${firstName}` : `${lastName} ${firstName.substr(0, 1)}.`;
        }
        if (!!lastName && !firstName && !!middleName) {
            return full ? `${lastName} ${middleName}` : `${lastName} ${middleName.substr(0, 1)}.`;
        }
        if (!lastName && !!firstName && !!middleName) {
            return full ? `${firstName} ${middleName}` : `${firstName} ${middleName.substr(0, 1)}.`;
        }
        if (!!lastName && !firstName && !middleName) {
            return `${lastName}`;
        }
        if (!lastName && !!firstName && !middleName) {
            return `${firstName}`;
        }
        if (!lastName && !firstName && !!middleName) {
            return `${middleName}`;
        }
        return '';
    }

    /**
     * Получить массив уникальных элементов из переданного массива
     * @param array
     */
    static getUniqElementsByArray(array: string[]): string[] {
        let uniqArray: string[] = [];
        array.forEach((el: any) => {
            if (!uniqArray.some(uniqArrayEl => uniqArrayEl === el)) {
                uniqArray.push(el);
            }
        });
        return uniqArray;
    }

    /**
     * Промиз с локальной загрузкой для таблицы
     * @param {*} promise
     */
    static promiseWithLoadingTable(
        promise: Promise<any>,
        setStateCallback: (params: any) => any,
    ) {
        setStateCallback({
            loadingTable: true,
        });
        return new Promise((resolve, reject) => {
            promise
                .then((res) => {
                    setStateCallback({
                        loadingTable: false,
                    });
                    return resolve(res);
                })
                .catch((error) => {
                    setStateCallback({
                        loadingTable: false,
                    });
                    return reject(error);
                });
        });
    }

    /**
     * Колбэк на клик по документу, чтобы что-нибудь сделать, если кликнули за пределы элемента
     * @param evt
     */
    static handlerOutsideClick(
        node: HTMLDivElement,
        callbackOutside: () => any,
        removeHandler?: boolean,
    ): any {
        document.addEventListener(
            'click',
            (evt: MouseEvent) => {
                let targetElement: any = evt.target;
                do {
                    if (targetElement === node || !targetElement) {
                        return;
                    }
                    targetElement = targetElement.parentNode;
                } while (targetElement);
                callbackOutside();
            },
            {
                once: !!removeHandler,
            },
        );
    }

    /**
     * Форматирование чисел
     */
    static thousandSeparator(sourceValue: number, length: number = 3): string {
        let dex = 10;
        let defaultStep = this._calculateStep(dex, length, 0);
        let roundingIndex = 2;
        let stepResult = 1;
        let prevStep = null;
        let finish = false;
        let result = '';
        let step = -1;
        while (!finish) {
            step++;
            prevStep = this._calculateStep(dex, length, step - 1);
            stepResult = Math.floor(sourceValue / prevStep);
            if (stepResult > defaultStep) {
                stepResult = stepResult % defaultStep;
                result =
                    this._toRequiredStringLength(stepResult, length) +
                    (!!result ? ' ' : '') +
                    result;
            } else {
                finish = true;
                result = stepResult + (!!result ? ' ' : '') + result;
            }
        }
        return this.getDecimal(sourceValue, roundingIndex).length
            ? result + this.getDecimal(sourceValue, roundingIndex)
            : result;
    }

    /**
     * Получение дробной части округленной до нужного разряда
     */
    static getDecimal(num: number, power: number): string {
        let baseExponent = 10;
        let decimal =
                Math.round(
                    (num - Math.floor(num)) * Math.pow(baseExponent, power),
                ) / Math.pow(baseExponent, power);
        let decimalString = `${decimal}`;
        decimalString = decimalString.length
            ? decimalString.slice(1)
            : decimalString;
        return decimalString;
    }

    /**
     * Возведение основания 10 в степень
     */
    private static _calculateStep(
        num: number,
        length: number,
        step: number,
    ): number {
        return Math.pow(num, length * (step + 1));
    }

    /**
     * Добавление нолей к строке до необходимой длинны
     */
    private static _toRequiredStringLength(
        num: number,
        reqLength: number,
    ): string {
        let zeroString = '0';
        let stringValue = `${num}`;
        let missingLength = reqLength - stringValue.length;
        if (!missingLength) {
            return stringValue;
        }
        do {
            stringValue = zeroString + stringValue;
        } while (stringValue.length < reqLength);
        return stringValue;
    }
}
