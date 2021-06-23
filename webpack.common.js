var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');


module.exports = {
    mode: 'none',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': ['./src/main.ts', './src/styles.css']
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            favicon:"./src/favicon.ico",
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['polyfills', 'vendor', 'app']
        }),
        new ManifestPlugin()

    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.html'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader', '@angularclass/hmr-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json-loader?name=assets/json/[name].[hash].[ext]'
               
            },
            {
                test: /\.(s*)css$/,
                use: ['to-string-loader','style-loader','css-loader','sass-loader']
            }
        ]
    }
    

}