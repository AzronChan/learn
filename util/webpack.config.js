const path = require("path");
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //用于CSS单独提取

module.exports = {
	entry : './models/index.js',
	output : {
		path:path.resolve(__dirname, "./dist"),
		filename : 'util.js',
	},
	mode : 'development',	//开发模式|production 上线模式
	module:{
		rules :[
			{
		        test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
		        query: {
		          presets: ['es2015']
		        },
		        
		    },
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })		
			},
			{
				test:/\.(jpg|png|gif)$/,
				loaders:[
					'file-loader?name=img/[name].[ext]',
					'image-webpack-loader'
				]
			}
		]
	}
}
