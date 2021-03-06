const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const globalConfig = require('../global.config')

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    // devtool: 'source-map',

    output: {
        path: globalConfig.buildPath,
        publicPath: globalConfig.onlinePublishPathPrefix,
        filename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].[hash].js'),
        chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'js/[id].[hash].chunk.js')
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin(path.posix.join(globalConfig.staticPublicPath, 'css/[name].[hash].css')),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});
