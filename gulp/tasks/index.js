import gulp from 'gulp';
import gcb from 'gulp-callback';
import config from '../config';
import { addVersion } from '../utils/fileVersion';

function indexHtml() {
    return gulp.src(config.indexHtmlPath)
        .pipe(gulp.dest(config.APPLICATION_DIST_PATH))
        .pipe(gcb(() => addVersion()));
}

export { indexHtml };
