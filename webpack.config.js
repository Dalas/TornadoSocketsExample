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
        chatPage: "./js/src/pages/ChatPage.js",
        vendor: ['react', 'react-dom', 'isomorphic-fetch']
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
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"})
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new ExtractTextPlugin({filename: "../../style/styles.css", allChunks: true})
    ],
    resolve: {
        extensions: ['.js', '.scss', '.css']
    }
};