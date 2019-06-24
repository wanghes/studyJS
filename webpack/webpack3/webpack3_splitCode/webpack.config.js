const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const webpackConfig = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/main.js',
        main2: './src/main2.js',
        main3: './src/main3.js',
        vendors: ['webpack-zepto']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]_[hash:5].js',
        chunkFilename: 'js/lib/chunk_[name]_[hash:5].js'
    },
    devServer: {
        port: 4500,
        open: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'stage-2'],
                    plugins: [
                        "transform-runtime"
                    ]
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `./src/index.html`,
            filename: 'index.html',
            chunks: ['vendors', 'main'],
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            template: `./src/index2.html`,
            filename: 'index2.html',
            chunks: ['vendors', 'main2'],
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            template: `./src/index3.html`,
            filename: 'index3.html',
            chunks: ['vendors', 'main3'],
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new CommonsChunkPlugin({
            name: 'vendors', // 公共代码的chunk命名为 'vendors'
            filename: 'js/[name].bundle.js' // 生成的文件名为 vendors.bundle.js
        }),
        new UglifyJsPlugin({
            exclude: /\.min\.js$/, //排除的文件，用正则表示
            cache: true, //是否启用缓存
            sourceMap: false, //
            parallel: true, //多通道并行处理
            extractComments: false,
            uglifyOptions: {
                compress: {
                    unused: true, //是否去掉未关联的函数和变量
                    warnings: false,
                    drop_console: true //是否屏蔽掉控制台输出
                },
                output: {
                    comments: false
                }
            }
        })
    ]
}
module.exports = webpackConfig
