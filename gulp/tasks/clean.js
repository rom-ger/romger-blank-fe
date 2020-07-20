import del from 'del';
import config from '../config';

function clean(callback) {
    return del(config.APPLICATION_DIST_PATH, callback);
}

export { clean };
