import gulp from 'gulp';
import tslint from 'gulp-tslint';
import config from '../config';

function tsLint() {
    return gulp.src(config.ts.tslintPaths)
        .pipe(
            tslint({
                program: require('tslint')
                    .Linter
                    .createProgram(config.ts.tsconfigPath),
            }),
        )
        .pipe(tslint.report({ summarizeFailureOutput: true }));
}

export { tsLint };
