// 生产环境配置文件
const path = require('path')
// 引入基础配置
const webpackBase = require('./webpack.config.base');
// 引入 webpack-merge 插件
const webpackMerge = require('webpack-merge');
// 清理 dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 抽取 css
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 引入 webpack
const webpack = require('webpack');
// 引入多页面文件列表
const config = require('./config');
// 合并配置文件

module.exports = webpackMerge(webpackBase, {
    mode:'production',
    optimization: {
        minimize: true,
    },
    module: {
        rules: [
            {
                // 对 css 后缀名进行处理
                test: /\.(less|css|scss)$/,
                // 不处理 node_modules 文件中的 css 文件
                exclude: /node_modules/,
                // 抽取 css 文件到单独的文件夹
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // 设置 css 的 publicPath
                    publicPath: config.cssPublicPath,
                    use: [{
                        loader: 'css-loader',
                        options: {
                            // 开启 css 压缩
                            minimize: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                    {
                    	loader : "sass-loader"
                    }
                    ],
                }),
            },
        ],
    },
    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'all',
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: 'commons.bundle.js',
        }),
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(['./dist'], { root: path.resolve(__dirname, '../'),}),
    ],
});