var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;

var DEV_URL = require('./Settings.js').DEV_URL;
var loaders = require('./webpack/loaders');
var aliases = require('./webpack/aliases');
var deps = require('./webpack/deps.js');

module.exports = {
    context: __dirname,
    entry: [
        'webpack-dev-server/client?' + DEV_URL,
        'webpack/hot/dev-server',
        __dirname + '/App.js'
    ],
    output: {
        path: __dirname + "/../dist/",
        filename: 'App.js?[hash]'
    },
    resolve: {
        alias: aliases(__dirname)
    },
    plugins: [
        new ExtractTextPlugin("App.css?[hash]"),
        new webpack.ProvidePlugin(deps),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html',
            assets: {
                css: __dirname + "css/App.css?[hash]"
            }
        }),
        new SourceMapDevToolPlugin({
            test: /\.js/,
            filename: '[file].map?[hash]',
            columns: false,
        })
    ],
    module: {
        loaders: loaders
    },
    devServer: {
        contentBase: __dirname
    }
};
