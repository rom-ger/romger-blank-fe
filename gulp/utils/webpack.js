import gutil from 'gulp-util';
import path from 'path';
import webpack from 'webpack';
import config from '../config';

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const webpackSettings = (build = false, distPath = config.APPLICATION_DIST_PATH) => {
    const plugins = [
        new webpack.optimize.OccurrenceOrderPlugin,
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        // new BundleAnalyzerPlugin()
    ];

    const entry = ['@babel/polyfill', './source/app.tsx'];

    if (!build) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        entry.push('webpack-hot-middleware/client?reload=true&warn=false');
    } else {
        // plugins.push(new FriendlyErrorsWebpackPlugin());
    }

    return {
        entry: entry,
        mode: build ? 'production' : 'development',
        devtool: 'source-map',
        optimization: {
            minimize: build,
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: [/node_modules(?!\/crypto-hash)/],
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'css-loader' },
                    ],
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader',
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        'style-loader?sourceMap',
                        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                        'resolve-url-loader',
                        'sass-loader?sourceMap',
                    ],
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader?name=[path][name].[ext]',
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
            alias: {
                source: path.resolve('source/'),
            },
        },
        plugins,
        node: { fs: 'empty' },
        output: {
            filename: 'bundle.js',
            chunkFilename: '[name].[contenthash].bundle.js',
            path: path.resolve(distPath),
            pathinfo: false,
        },
    };
};

const webPackBuild = (build = false, callback = null) => {
    webpack(webpackSettings(build), (error, stats) => {
        console.log(stats.endTime - stats.startTime);
        if (error) {
            throw new gutil.PluginError('webpack', error);
        }
        if (callback) {
            callback();
        }
    });
};

export { webPackBuild, webpackSettings };
