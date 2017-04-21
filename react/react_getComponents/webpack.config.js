var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
      'react-hot-loader/patch',
       // activate HMR for React

       'webpack-dev-server/client?http://localhost:8080',
       // bundle the client for webpack-dev-server
       // and connect to the provided endpoint

       'webpack/hot/only-dev-server',
       // bundle the client for hot reloading
       // only- means to only hot reload for successful updates

        path.resolve(__dirname,'src/app.jsx')
    ],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use:['babel-loader'],
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                use: ExtractTextPlugin.extract([
                   "css-loader?modules",
                   "less-loader"
                ]),
                exclude: /node_modules/
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
       new ExtractTextPlugin('styles.css'),
       new webpack.HotModuleReplacementPlugin(),
       new webpack.NamedModulesPlugin(),
       new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: [
            '.js', '.jsx','.less'
        ]
    },
    devServer:{
      hot:true,
      inline:true,
      open:true,
      historyApiFallback:true
    }
}
