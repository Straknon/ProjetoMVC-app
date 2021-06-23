var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('../webpack.common.js');
const path = require('path');


module.exports = webpackMerge(commonConfig,{
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath:'./'
    },    
    mode:'development',
    module: {
        rules: [
            {
            test: /environment\.ts?$/,
            loader: 'file-replace-loader',
            options: {
                condition: true,
                replacement: path.resolve(__dirname,'../src/environments/environment.dev.ts'),
                async: true
            }
        }
    ]},
    devServer: {
        port: 4200
    }




});