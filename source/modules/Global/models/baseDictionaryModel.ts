import BASE_STATUS from '../enums/baseStatus';
import { SimpleObjectInterface } from '../interfaces/simpleObject';
import { BaseDictionaryDTO } from './../interfaces/baseDictionaryDTO';

class BaseDictionaryModel {
    id: string;
    name: string;
    npp: number;
    status: SimpleObjectInterface;

    constructor(params: BaseDictionaryDTO) {
        this.id = params.id;
        this.name = params.name;
        this.npp = params.npp;
        this.status = params.status ? BASE_STATUS[params.status] : BASE_STATUS.ACTIVE;
    }
}

export default BaseDictionaryModel;
