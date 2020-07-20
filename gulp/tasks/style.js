import { buildExternalStyles, buildStyles } from '../utils/styleBuild';
import browserSync from 'browser-sync';

function extStyleServe() {
    return buildExternalStyles(true);
}

function extStyle() {
    return buildExternalStyles();
}

function sassServe() {
    return buildStyles(true);
}

function sass() {
    return buildStyles();
}

function stylesReload() {
    return buildStyles()
        .pipe(browserSync.stream());
}

export { extStyleServe, extStyle, sassServe, sass, stylesReload };
