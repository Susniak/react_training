const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: {
		server: './api/server.js',
		frontend: './app/index.js'
	},
	target: 'node',
	watch: true,
	module: {
		rules: [
			{
				test: /\.js?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		]
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: './app/index.html',
			chunks: [
				"frontend"
			],
		})
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		port: 8000,
		open: true
	},
	optimization: {
		minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })] // mangle false else mysql blow ups with "PROTOCOL_INCORRECT_PACKET_SEQUENCE"
	},
};
