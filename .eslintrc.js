module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'plugin:import/recommended',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'standard-with-typescript',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		//
		'simple-import-sort',
		'import',
		'react',
		'@typescript-eslint',
	],
	rules: {
		// indent: ['error', 'tab'],
		// 'linebreak-style': ['error', 'unix'],
		// quotes: ['error', 'single'],
		// semi: ['error', 'always'],
		'sort-imports': 'off',
		'import/order': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		// 'import/no-unresolved': 'warn', // use eslint-import-resolver-alias
		'no-console': 'off',
		'no-unused-vars': 'warn',
		'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'react/jsx-uses-react': 'warn',
		'react/jsx-uses-vars': 'warn',
		'react/prop-types': 'off',
		//
		// esolve ESLint: Unknown property 'jsx' found
		'react/no-unknown-property': [
			'warn',
			{
				ignore: ['jsx'],
			},
		],
		//
		// // EslintPluginImportResolveError: react with invalid interface loaded as resolver
		// // Occurred while linting /Users/orz99/zoo/dadoPlayer/src/js/Components/Home.jsx:5
		// // Rule: "import/no-cycle"
		// 'import/no-cycle': [
		// 	'warn',
		// 	{
		// 		maxDepth: '∞',
		// 		// ignoreExternal: true,
		// 	},
		// ],
		//
		// 'import/no-unresolved': 'warn',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			}, // resolve ESLint: Unable to resolve path to module
			webpack: {
				config: './webpack.config.js',
			},
		},
		react: {
			version: 'detect',
		},
	},
};
