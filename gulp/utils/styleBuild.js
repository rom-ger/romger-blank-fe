import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import sassGlob from 'gulp-sass-glob';
import gutil from 'gulp-util';
import config from '../config';

const lazyLoad = require('gulp-load-plugins')();

const buildExternalStyles = (serve = false) => {
    let result = gulp.src(config.styles.externalCssPaths);
    if (!serve) {
        result = result.pipe(
            cleanCSS({
                compatibility: 'ie9',
                rebase: false,
            }),
        );
    }
    result = result.pipe(concat('external.css'))
        .pipe(gulp.dest(config.APPLICATION_DIST_PATH));
    return result;
};

const buildStyles = (serve = false) => {
    let result = gulp.src(config.styles.mainStylesPaths)
        .pipe(
            sassGlob({
                ignorePaths: [
                    '**/*.modules.scss',
                ],
            }),
        )
        .pipe(lazyLoad.sourcemaps.init())
        .pipe(lazyLoad.sass({ style: 'expanded' }))
        .on('error', errorHandler('Sass'))
        .pipe(lazyLoad.autoprefixer())
        .on('error', errorHandler('Autoprefixer'));

    if (!serve) {
        result = result.pipe(
            cleanCSS({
                compatibility: 'ie9',
                rebase: false,
            }),
        );
    }
    result = result.pipe(lazyLoad.sourcemaps.write())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(`${config.APPLICATION_DIST_PATH}`));
    return result;
};

const errorHandler = title => {
    return err => {
        gutil.log(gutil.colors.red(`[${title}]`), err.toString());
        this.emit('end');
    };
};

export { buildExternalStyles, buildStyles };
