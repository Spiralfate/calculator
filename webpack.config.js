const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const fileLoader = require("file-loader");

module.exports = {	
	entry: { main: './src/js/index.js' },
	output: {
	path: path.resolve(__dirname, 'dist'),
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
		test: /\.html$/,
		use: [
		  {
			loader: "html-loader"
		  }
		]
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
      filename: "./index.html"
    }),    
	new ExtractTextPlugin({filename:'index.css'})
  ]
};
