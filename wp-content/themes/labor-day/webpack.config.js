/**
 * WordPress Dependencies
 */

const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');

module.exports = {
	...defaultConfig,
	...{
		entry: {
			global: './src/index.js',
		},
		output: {
			path: __dirname + '/dist',
			filename: '[name].js',
		},
	},
};
