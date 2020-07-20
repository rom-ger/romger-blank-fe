import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import config from '../config';

function assetsFiles() {
    return gulp.src(config.assets.src)
        .pipe(
            imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [{ removeViewBox: false }],
            }),
        )
        .pipe(gulp.dest(config.assets.dst));
}

export { assetsFiles };
