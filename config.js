const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const fileLoader = require("file-loader");
const webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV || 'development'
const isDevelopment = NODE_ENV === 'development'
const modePath = argv.mode == 'production' ? 'dist/prod/' : 'dist/dev/';

const config = Object.assign({})

config.entry = "./src/js/index.js";
config.output = {
	path: path.resolve(__dirname, `${modePath}`),
	filename: 'main.js'
};
config.module = {		
	rules: [
	  {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		  loader: "babel-loader",
		  options: {
		  }
		}
	  },
	  {
		test: /\.(s)?css$/,
		use: [{
			loader: "style-loader"
		}, {
			loader: "css-loader"
		}, {
			loader: "sass-loader"
		}]
	  },
	  {
		test: /\.(woff|woff2|ttf|png|jpg|gif)$/,
		use: [
		  {
			loader: 'file-loader',
			options: {
			}
		  }
		]
	  }
   ]
};
config.plugins = [		
	new HtmlWebpackPlugin({
	  template: "./src/index.html",
	  filename: `index.html`,
	  title: NODE_ENV
	}),    
	new ExtractTextPlugin({filename:'index.css'})
]   

module.exports = config
