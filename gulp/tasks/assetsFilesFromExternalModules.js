import gulp from 'gulp';
import config from '../config';

function assetsFilesFromExternalModules() {
    return gulp.src(config.assets.fromExternalModules)
        .pipe(gulp.dest(config.assets.dst));
}

export { assetsFilesFromExternalModules };
