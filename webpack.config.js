var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		main: [
			'webpack-dev-server/client?http://localhost:8080', //socket.io or polling
			'webpack/hot/only-dev-server',
			'./src/main.js'
		]
	},
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/public/',
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: path.join(__dirname, 'src'),
			loader: 'react-hot!babel'
		}, {
			test: /\.scss$/,
			include: path.join(__dirname, 'src'),
			loader: 'style!css!sass'
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
	}
};