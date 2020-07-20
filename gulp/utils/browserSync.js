import webpack from 'webpack';
import config from '../config';
import { requireDevDependency } from './common';
import { webpackSettings } from './webpack';

const argv = require('yargs').argv;
const browserSync = requireDevDependency('browser-sync');
const proxyMiddleware = requireDevDependency('http-proxy-middleware');
const webpackDevMiddleware = requireDevDependency('webpack-dev-middleware');
const webpackHotMiddleware = requireDevDependency('webpack-hot-middleware');

const webpackDevServerConfig = {
    publicPath: '/',
    quiet: false,
    noInfo: false,
    logLevel: 'error',
};

const browserSyncInit = (baseDir, remote, callback = null) => {
    if (!browserSync || !proxyMiddleware || !webpackDevMiddleware || !webpackHotMiddleware) {
        return;
    }

    let server = {
        baseDir: baseDir,
    };

    const target = remote ? 'http://localhost:8000' : 'http://localhost:8000';

    const bundler = webpack(webpackSettings());

    server.middleware = [
        webpackDevMiddleware(bundler, webpackDevServerConfig),
        webpackHotMiddleware(bundler),
        proxyMiddleware(['/api'], {
            target: target,
            onError: onProxyError,
            ws: true,
        }),
    ];

    // баг на macOs, корректный ответ от прокси интерпритируется как ошибочный,
    // поэтому мы сами обрабатываем ошибку
    function onProxyError(err, req, res) {
        let host = (req.headers && req.headers.host);
        console.error(`Error occured while trying to proxy to: ${host}${req.url}/n${err}`);
        res.end();
    }

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        port: argv.appPort
            ? argv.appPort
            : config.APPLICATION_BROWSERSYNC_PORT,
        browser: 'default',
    });

    if (callback) {
        callback();
    }
};

export { browserSyncInit };
