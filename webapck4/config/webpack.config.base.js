const path = require('path');
// 引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// 抽取 css
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// 引入多页面文件列表
const config = require('./config');
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {};

// 生成多页面的集合
config.HTMLDirs.forEach((page) => {
    const htmlPlugin = new HTMLWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `../src/html/${page}.html`),
        chunks: [page, 'commons'],
    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `../src/js/${page}.js`);
});

module.exports = {
    entry: Entries,
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'js/[name].bundle.[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    // 加载器
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // 打包生成图片的名字
                        name: '[name].[hash].[ext]',
                        // 图片的生成路径
                        outputPath: config.imgOutputPath,
                    },
                },
            },
            {
                test: /\.mp4$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: config.assetOutputPath,
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            {
                test: /\.art$/,
                use: ['art-template-loader'],
            },
   
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'zepto-webpack',
        }),
       
        // 将 css 抽取到某个文件夹
        new ExtractTextPlugin(config.cssOutputPath),
        // 自动生成 HTML 插件
        ...HTMLPlugins,
    ],
    externals: {
        KgMobileCall: 'KgMobileCall',
    },
};