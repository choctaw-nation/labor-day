const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

const THEME_NAME = 'labor-day';
const THEME_DIR = `/wp-content/themes/${ THEME_NAME }`;

function snakeToCamel( str ) {
	return str.replace( /([-_][a-z])/g, ( group ) =>
		group.toUpperCase().replace( '-', '' ).replace( '_', '' )
	);
}

const appNames = [ 'front-page', 'my-schedule', 'search' ];
const styleSheets = []; // for scss only

module.exports = {
	...defaultConfig,
	...{
		entry: function () {
			const entries = {
				global: `.${ THEME_DIR }/src/index.ts`,
				'vendors/fontawesome': `.${ THEME_DIR }/src/js/vendors/fontawesome.js`,
				'vendors/bootstrap': `.${ THEME_DIR }/src/js/vendors/bootstrap.js`,
				'vendors/animate': `.${ THEME_DIR }/src/styles/vendors/animate.min.css`,
				'pages/map': `.${ THEME_DIR }/src/js/map/map.js`,
				'pages/singleEvents': `.${ THEME_DIR }/src/js/add-to-schedule/App.js`,
			};
			if ( appNames.length > 0 ) {
				appNames.forEach( ( appName ) => {
					const appNameOutput = snakeToCamel( appName );
					entries[
						`pages/${ appNameOutput }`
					] = `.${ THEME_DIR }/src/js/${ appName }/App.tsx`;
				} );
			}
			if ( styleSheets.length > 0 ) {
				styleSheets.forEach( ( styleSheet ) => {
					const styleSheetOutput = snakeToCamel( styleSheet );
					entries[
						`pages/${ styleSheetOutput }`
					] = `.${ THEME_DIR }/src/styles/pages/${ styleSheet }.scss`;
				} );
			}
			return entries;
		},
		output: {
			path: __dirname + `${ THEME_DIR }/dist`,
			filename: `[name].js`,
		},
	},
};
