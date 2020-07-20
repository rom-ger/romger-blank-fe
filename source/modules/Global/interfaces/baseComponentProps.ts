import { History, Location } from 'history';

export interface BaseComponentProps {
    global: any;
    location: Location;
    history: History;
}
