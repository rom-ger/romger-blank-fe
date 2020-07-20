class AnchorService {
    /**
     * Получаем последний записанный якорь
     * @returns {String}
     */
    public static getAnchor(): any {
        try {
            let item = window.localStorage.getItem('LKInvestLastAnchor');
            if (!item) {
                return null;
            }
            return JSON.parse(item);
        } catch (ex) {
            return null;
        }
    }

    /**
     * Запишем якорь
     * @param {String} lastPage
     */
    public static setAnchor(anchor: any): void {
        window.localStorage.setItem(
            'LKInvestLastAnchor',
            JSON.stringify(anchor),
        );
    }
}

export { AnchorService };
