/**
 * Created by yura on 15.02.17.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, "static/js/src/pages"),
    entry: {
        chatPage: "./ChatPage.js"
    },
    output: {
        path: path.join(__dirname, "static/js/build"),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
            minChunks: 2
        })
    ]
};