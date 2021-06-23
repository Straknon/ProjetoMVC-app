var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('../webpack.common.js');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(commonConfig,{
    devtool: 'source-map',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath:'./'
    },
    mode:'production',
    module: {
        rules: [
            {
            test: /environment\.ts?$/,
            loader: 'file-replace-loader',
            options: {
                condition: true,
                replacement: path.resolve(__dirname,'../src/environments/environment.prod.ts'),
                async: true
            }
        }
    ]},
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.js$/,
                uglifyOptions:{
                    output:{
                        comments:false,
                    }
                }
            })
        ]
      }
});