import gulp from 'gulp';
import replace from 'gulp-replace';
import config from '../config';

const addVersion = () => {
    let currentTime = new Date().getTime();

    return gulp.src(`${config.APPLICATION_DIST_PATH}/index.html`)
        .pipe(replace(new RegExp('.js"', 'g'), `.js?v=${currentTime}"`))
        .pipe(replace(new RegExp('.css"', 'g'), `.css?v=${currentTime}"`))
        .pipe(gulp.dest(`${config.APPLICATION_DIST_PATH}/`));
};

export { addVersion };
