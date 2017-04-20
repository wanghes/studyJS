var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
module.exports = {
    entry: {
        app: path.resolve(__dirname,'src/app.jsx')
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader:'babel-loader'
            },
            {
                test:/\.less$/,
                use: ExtractTextPlugin.extract(
                   [
                       "css-loader",
                       "less-loader"
                    ]
                )
            }
        ]
    },
    plugins: [
       new HtmlWebpackPlugin({
           title: 'App',
           filename : 'index.html',
           inject: 'body', // bundle.[js|css]注入到body部分
           template: 'src/index-template.html'
       }),
       new ExtractTextPlugin('styles.css')
    ],
    resolve: {
        extensions: [
            '.js', '.jsx','.less'
        ]
    }
}
