/**
 * Created by yura on 15.02.17.
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    context: path.join(__dirname, "static/"),
    entry: {
        styles_loader: "./js/src/pages/styles.loader.js",
        chatPage: "./js/src/pages/ChatPage.js"
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
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"})
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
        }),
        new ExtractTextPlugin({filename: "../../style/build.css", allChunks: true})
    ],
    resolve: {
        extensions: ['.js', '.scss', '.css']
    }
};