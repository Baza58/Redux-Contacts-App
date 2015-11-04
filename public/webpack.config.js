var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
    entry: [
  
    	// 'webpack-hot-middleware/client',
    	'./index'
  ],
	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
	new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  	],
	module: {
		loaders: [
		{
			test: /\.js$/,
			loaders: ['babel?stage=0'],
			exclude: /node_modules/,
		},
		{
			test: /\.sass$/,
			loaders: ['style','css','sass?indentedSyntax']
		}
		]
	}

};