import gulp from 'gulp';
import { jsLint } from './js';
import { stylesReload } from './style';
import { tsLint } from './ts';

function watch() {
    gulp.watch('source/**/*.scss', gulp.series(stylesReload));
    gulp.watch('source/**/*.{ts,tsx,js,jsx}', gulp.parallel(tsLint, jsLint));
}

export { watch };
