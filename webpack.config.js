const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const fileLoader = require("file-loader");
const webpack = require('webpack');

const argv = process.argv;
const modePath = String(argv).match(/production/) ? 'dist/prod/' : 'dist/dev/';

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
	  title: String(argv).match(/production/) ? 'Production mode' : 'Development mode'
	}),    
	new ExtractTextPlugin({filename:'index.css'})
]   

module.exports = config
