/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/01/2017
 */

"use strict";

const path = require('path');
const extend = require('util')._extend;
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'dev';

module.exports = {
    context: path.resolve(__dirname, '..'),
    devtool: IS_DEV ? 'eval' : 'source-map',
    entry: {
        app: ['babel-polyfill', './client/index.js']
    },
    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /jquery\..*\.js/,
                loader: "imports?$=jquery,jQuery=jquery,this=>window"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": ['es2015', 'react', 'stage-0']
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                use: [
                    {
                        loader: 'json-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'client/images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['style-loader', 'css-loader']
                })
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: {
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }
            },
            {
                test: /config\/(config|version)\.js$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'client/js/[name].[ext]'
                        }
                    }
                ]
            }
        ],
        noParse: [
            /\.min\.js/
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    resolve: {
        modules: [
            'node_modules',
            'client'
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new ExtractTextPlugin({
            filename: 'client/css/[name].css',
            disable: IS_DEV
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(__dirname, '..', 'favicon.png'),
            prefix: 'client/favicons/',
            persistentCache: true,
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: './client/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: !IS_DEV
        })
    ],
    externals: {
        config: JSON.stringify(extend(require('./config.json'), require(`./${process.env.NODE_ENV}.json`)))
    }
};