'use strict';
require('babel-polyfill');
const path = require("path");
const extend = require('util')._extend;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './client/app.js'
    ],
    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: "/",
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    "presets": ["react", "es2015", "stage-0"],
                    "plugins": [
                        "transform-runtime",
                        "add-module-exports",
                        "transform-decorators-legacy",
                        "transform-react-display-name"
                    ]
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: webpackIsomorphicToolsPlugin.regular_expression('images'),
                loader: 'url-loader?limit=10240'
            }
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'client',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        webpackIsomorphicToolsPlugin.development(),
        new HtmlWebpackPlugin({
            template: './client/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        })
    ],
    externals: {
        config: JSON.stringify(extend(require('./config.json'), process.env.NODE_ENV === 'prod' ? require('./prod.json') : require('./dev.json')))
    }
};