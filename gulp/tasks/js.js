import gulp from 'gulp';
import eslint from 'gulp-eslint';
import config from '../config';
import { webPackBuild } from '../utils/webpack';
import { tsLint } from './ts';

function jsLint() {
    return gulp.src(config.js.eslintPaths)
        .pipe(eslint())
        .pipe(eslint.format());
}

function js() {
    return gulp.series(
        gulp.parallel(tsLint, jsLint),
        callback => webPackBuild(true, callback),
    );
}

export { js, jsLint };
