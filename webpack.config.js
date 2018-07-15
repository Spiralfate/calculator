const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const fileLoader = require("file-loader");

module.exports = (env, argv) => {
	let modePath = argv.mode == 'production' ? 'dist/prod/' : 'dist/dev/';
	
	const config = {
		mode: argv.mode,
		entry: { main: './src/js/index.js' },
		output: {
		path: path.resolve(__dirname, `${modePath}`),
		filename: 'main.js'
		},
		module: {
			rules: [
			  {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
				  loader: "babel-loader"
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
	   },
	   plugins: [
		new HtmlWebpackPlugin({
		  template: "./src/index.html",
		  filename: `index.html`,
		  title: argv.mode == 'production' ? 'Production mode' : 'Development mode'
		}),    
		new ExtractTextPlugin({filename:'index.css'})
	  ]
			
	}
	return config;
}
