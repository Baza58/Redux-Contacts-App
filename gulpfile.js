var elixir = require('laravel-elixir');
var path = require('path');
var webpack = require('webpack');

require("laravel-elixir-webpack");
 
elixir(function(mix) {
    mix.webpack("app.js", {
    	devtool: 'eval',
    entry: [
  
    	'webpack-hot-middleware/client',
    	'./public/index'
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
			loaders: ['babel'],
			exclude: /node_modules/,
		},
		{
			test: /\.sass$/,
			loaders: ['style','css','sass?indentedSyntax']
		}
		]
	}

    });
});
