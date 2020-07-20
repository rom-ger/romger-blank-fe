import * as t from 'io-ts';

export const DictionaryEntryType = t.interface({
    id: t.string,
    name: t.string,
});

export interface  DictionaryEntryDTO extends t.TypeOf<typeof  DictionaryEntryType> {}

class  DictionaryEntry {
    id: string;
    name: string;

    constructor(params: DictionaryEntryDTO) {
        this.id = params.id;
        this.name = params.name;
    }
}

export {  DictionaryEntry };
