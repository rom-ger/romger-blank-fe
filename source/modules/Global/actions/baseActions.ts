import { BaseActions as GlobalBaseActions } from '@romger/react-global-module/lib/actions';
import { AxiosInstance } from 'axios';
import { api } from '../../../config/api';

export class BaseActions extends GlobalBaseActions {
    static api: AxiosInstance = api;
}
