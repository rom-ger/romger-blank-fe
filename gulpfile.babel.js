import gulp from 'gulp';
import config from './gulp/config';
import { indexHtml } from './gulp/tasks';
import { assetsFiles } from './gulp/tasks/assetsFiles';
import { assetsFilesFromExternalModules } from './gulp/tasks/assetsFilesFromExternalModules';
import { buildServe } from './gulp/tasks/build';
import { clean } from './gulp/tasks/clean';
import { js } from './gulp/tasks/js';
import { extStyle, sass } from './gulp/tasks/style';
import { watch } from './gulp/tasks/watch';
import { generateAppConfig } from './gulp/utils/appConfig';
import { browserSyncInit } from './gulp/utils/browserSync';

var jest = require('gulp-jest').default;

gulp.task('serve',
    gulp.series(
        buildServe(),
        gulp.parallel(watch, callback => {
            browserSyncInit(`${config.APPLICATION_DIST_PATH}/`, false, callback);
        }),
    ));

gulp.task('serve:remote',
    gulp.series(
        buildServe(),
        gulp.parallel(watch, callback => {
            browserSyncInit(`${config.APPLICATION_DIST_PATH}/`, true, callback);
        }),
    ));

gulp.task('build',
    gulp.series(
        clean,
        gulp.parallel(indexHtml, assetsFiles, assetsFilesFromExternalModules, extStyle, sass),
        js(),
        callback => generateAppConfig(callback),
    ),
);

gulp.task('tests',
    callback => {
        gulp.src('./source').pipe(jest());
        callback();
    },
);

gulp.task('default', gulp.series('serve:remote'));
