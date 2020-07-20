import gulp from 'gulp';
import { generateAppConfig } from '../utils/appConfig';
import { assetsFiles } from './assetsFiles';
import { assetsFilesFromExternalModules } from './assetsFilesFromExternalModules';
import { clean } from './clean';
import { indexHtml } from './index';
import { extStyleServe, sassServe } from './style';
import { jsLint } from './js';
import { tsLint } from './ts';

function buildServe() {
    return gulp.series(
        clean,
        gulp.parallel(tsLint, jsLint, indexHtml, assetsFiles, assetsFilesFromExternalModules, extStyleServe, sassServe),
        callback => generateAppConfig(callback),
    );
}

export { buildServe };
