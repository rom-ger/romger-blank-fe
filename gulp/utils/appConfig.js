import gulp from 'gulp';
import insert from 'gulp-insert';
import lodash from 'lodash';

const generateAppConfig = (callback = null) => {
    var argv = process.argv.slice(3);

    var index = -1;
    if (argv && argv.length) {
        index = lodash.findIndex(argv, el => el.indexOf('--ip') > -1);
    }

    var ip = null;
    if (index > -1) {
        ip = argv[index].split('=')[1];
    }

    var indexClient = -1;
    if (argv && argv.length) {
        indexClient = lodash.findIndex(argv, el => el.indexOf('--client') > -1);
    }

    var client = 'nn';
    if (indexClient > -1) {
        client = argv[indexClient].split('=')[1];
    }

    var result = gulp.src([
        './dist/assets/js/config.js',
    ]);

    if (ip) {
        result = result.pipe(insert.append(`var RG_GLOBAL_IP = '${ip}';`));
    } else {
        result = result.pipe(insert.append('var RG_GLOBAL_IP = "http://cadastr.dev.thewhite.ru/api";'));
    }

    result.pipe(gulp.dest('./dist/assets/js'));

    if (callback) {
        return callback();
    }
};

export { generateAppConfig };
