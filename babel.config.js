module.exports = (api) => {
	// api.cache(true);

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					// debug: true,
					// // The entry point for the corejs3 polyfill has not been found.
					modules: false,
					loose: false,
					// useBuiltIns: 'entry',
					// also need import 'core-js/stable' and 'regenerator-runtime/runtime' to entry (index.js)
					// 'entry': 210K, 'usage': 89K
					useBuiltIns: 'usage',
					corejs: {
						version: '3',
						proposals: true,
					},
					// targets: {
					//   browsers: ["defaults", "ie > 10"],
					//   // browsers: ['defaults', 'not IE 11'],
					// },
				},
			],
			[
				// Babel preset for all React plugins
				'@babel/preset-react',
				{
					runtime: 'automatic',
				},
			],
			['@babel/preset-typescript'],
		],
		plugins: [
			[
				// api.env('development') && 'react-refresh/babel',  // React 18 已內建
				'@babel/plugin-transform-runtime',
				// {
				// 	corejs: {
				// 		version: 3,
				// 		proposals: true,
				// 	},
				// },
			],
			// [
			// 	'styled-jsx/babel',
			// 	// { optimizeForSpeed: true }
			// ],
			!api.env('production') && 'react-refresh/babel',
		].filter(Boolean),
		compact: true,
		// prevent warning: 10% building 0/1 entries 22/31 dependencies 1/17 modules[BABEL] Note: The code generator has deoptimised the styling of /Users/orz99/zoo/electroteque/src/js/three.module.js as it exceeds the max of 500KB.
	};
};
