import { Observable } from 'rxjs';
import { State } from '../store/reducers';

export type Epic<Actions = null, S = State> = (
    action$: Observable<Actions>,
    state$: Observable<S>,
    dependencies: any,
// @ts-expect-error
) => Observable;
