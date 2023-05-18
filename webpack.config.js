const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const THEME_NAME = 'labor-day';
const THEME_DIR = `/wp-content/themes/${THEME_NAME}`;

function snakeToCamel(str) {
	return str.replace(/([-_][a-z])/g, (group) =>
		group.toUpperCase().replace('-', '').replace('_', '')
	);
}

const appNames = ['front-page'];
const styleSheets = []; // for scss only

module.exports = {
	...defaultConfig,
	...{
		entry: function () {
			const entries = {
				global: `.${THEME_DIR}/src/index.js`,
				fontawesome: `.${THEME_DIR}/src/js/vendors/fontawesome.js`,
				vendors: `.${THEME_DIR}/src/styles/vendors/vendors.scss`,
				mySchedule: `.${THEME_DIR}/src/js/my-schedule/App.tsx`,
				search: `.${THEME_DIR}/src/js/search/App.tsx`,
				map: `.${THEME_DIR}/src/js/map/map.js`,
			};
			if (appNames.length > 0) {
				appNames.forEach((appName) => {
					const appNameOutput = snakeToCamel(appName);
					entries[
						appNameOutput
					] = `.${THEME_DIR}/src/js/${appName}/App.jsx`;
				});
			}
			if (styleSheets.length > 0) {
				styleSheets.forEach((styleSheet) => {
					const styleSheetOutput = snakeToCamel(styleSheet);
					entries[
						styleSheetOutput
					] = `.${THEME_DIR}/src/styles/pages/${styleSheet}.scss`;
				});
			}
			return entries;
		},
		resolve: {
			...defaultConfig.resolve,
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		},
		output: {
			path: __dirname + `${THEME_DIR}/dist`,
			filename: `[name].js`,
		},
	},
	plugins: [
		...defaultConfig.plugins,
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: path.join(
				__dirname,
				'bundle-analyzer',
				'report.html'
			),
			openAnalyzer: false,
		}),
	],
	optimization: {
		...defaultConfig.optimization,
		minimize: true, // Enable code minification
		minimizer: [
			new TerserPlugin({
				parallel: true,
				extractComments: true,
				terserOptions: {
					...defaultConfig.optimization.minimizer[0].options
						.terserOptions,
					keep_fnames: false, // Remove unused function names
					keep_classnames: false, // Remove unused class names
				},
			}),
		],
	},
};
