/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const fs = require('fs');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Create the fallback path (the production .env)
const basePath = path.resolve(__dirname, './.env');

const envPath = `${basePath}.${process.env.NODE_ENV}.local`;

// Check if the file exists, otherwise fall back to the production .env
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

dotenv.config({ path: finalPath });

// call dotenv and it will return an Object with a parsed key
const dotEnv = dotenv.config({ path: finalPath }).parsed;
// const env = dotenv.config({ path: finalPath }).parsed;

// reduce it to a nice object, the same as before
const dotEnvKeys = Object.keys(dotEnv).reduce((prev, next) => {
	const processEnv = prev;
	processEnv[`process.env.${next}`] = JSON.stringify(dotEnv[next]);
	return processEnv;
}, {});
console.log('dotEnvKeys', dotEnvKeys);

const env = process.env.NODE_ENV || 'development';
// const nodeEnv = process.env.NODE_ENV || 'development';

const isDev = env !== 'production';

module.exports = {
	mode: env,

	target: isDev ? 'web' : 'browserslist',

	entry: {
		index: path.resolve(__dirname, './src/js/index.js'),
		// vendors: ['react', 'react-dom', 'react-refresh/runtime'],
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].[chunkhash:6].js',
		// assetModuleFilename: 'assets/[hash][ext][query]',
		clean: true,
	},

	// prevent HTTP error: status code 404, net::ERR_UNKNOWN_URL_SCHEME
	// devtool: isDev ? 'eval-source-map' : false,
	devtool: isDev ? 'inline-source-map' : false,

	devServer: {
		client: {
			overlay: false,
			logging: 'warn',
		},
		static: [
			{
				directory: path.resolve(__dirname, 'dist'),
				publicPath: 'dist',
				serveIndex: true,
			},

			{
				directory: path.resolve(__dirname, 'assets'),
				// publicPath: 'assets',
			},
		],
		watchFiles: ['src/**/*.html'],
		// open: ['/?env=dev'],
		hot: true,
		// compress: true,
		historyApiFallback: true,
		// server: {
		// 	type: 'https',
		// 	options: {
		// 		key: process.env.DEV_SERVER_HTTPS_KEY,
		// 		cert: process.env.DEV_SERVER_HTTPS_CERT,
		// 	},
		// },
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},

			{
				test: /\.css$/i,
				use: [
					isDev
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								// options: {
								//   publicPath: '../',
								// },
						  },
					// { loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.js'),
							},
						},
					},
				],
			},

			{
				test: /\.s[ca]ss$/i,
				use: [
					isDev
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								// options: {
								//   publicPath: '../',
								// },
						  },
					// { loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.js'),
							},
						},
					},
					{
						loader: 'sass-loader',
						// options: {
						//   sassOptions: {
						//     indentWidth: 2,
						//   }
						// },
					},
				],
			},

			{
				test: /\.styl(us)?$/i,
				use: [
					isDev
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								// options: {
								//   publicPath: '../',
								// },
						  },
					// { loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.js'),
							},
						},
					},
					{
						loader: 'stylus-loader',
						// options: {
						//   stylusOptions: {
						//     indentWidth: 2,
						//   }
						// },
					},
				],
			},

			{
				test: /\.less$/i,
				use: [
					isDev
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								// options: {
								//   publicPath: '../',
								// },
						  },
					// { loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.js'),
							},
						},
					},
					{
						loader: 'less-loader',
						// options: {
						//   lessOptions: {
						//     indentWidth: 2,
						//   }
						// },
					},
				],
			},

			{
				test: /\.(png|jpg|gif)$/i,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 10kb
					},
				},
				// generator: {
				// 	filename: 'images/[hash][ext][query]',
				// },
			},

			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)(\?.*)?$/i,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 10kb
					},
				},
				// generator: {
				// 	filename: 'media/[hash][ext][query]',
				// },
			},

			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 10kb
					},
				},
				// generator: {
				// 	filename: 'fonts/[hash][ext][query]',
				// },
			},
		],
	},

	resolve: {
		modules: [__dirname, 'src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
	},

	plugins: [
		new webpack.DefinePlugin(dotEnvKeys),

		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:6].css',
		}),

		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/index.html',
			// favicon: './src/assets/favicon.ico',
			inject: 'body',
			// chunks: ['index', 'main'],
			// excludeChunks: env === 'production' ? ['ie', 'popular', 'scroll', 'user'] : ['ie', 'user'],
			minify: isDev
				? false
				: {
						collapseWhitespace: true,
						removeComments: true,
						removeRedundantAttributes: false,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype: true,
				  },
		}),

		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './src/assets/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),

		// prevent Promise undefined when use axios in IE11
		new webpack.ProvidePlugin({
			Promise: 'es6-promise-promise', // works as expected
		}),

		new webpack.ProgressPlugin(),
		isDev && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),

	performance: {
		maxEntrypointSize: 5120000,
		// WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (500 KiB). This can impact web performance.
		// Entrypoints:
		// index (2.88 MiB)
		//     js/index.ea3aaa.js
		//     css/index.0c2f42.css
		maxAssetSize: 5120000,
		// WARNING in asset size limit: The following asset(s) exceed the recommended size limit (500 KiB).
		// This can impact web performance.
		// Assets:
		// js/index.ea3aaa.js (2.83 MiB)
		//
		// hints: false, // defaut "warn",
		// WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
	},

	optimization: {
		runtimeChunk: isDev ? 'single' : false, // Ensure there is only one instance to avoid multiple entry points for hot updates ChunkLoadError
		minimizer: isDev
			? []
			: [
					new CssMinimizerPlugin({
						minimizerOptions: {
							preset: [
								'default',
								{
									discardComments: { removeAll: true },
								},
							],
						},
					}),
					new TerserPlugin({
						terserOptions: {
							compress: {
								drop_console: true,
							},
							format: {
								// comments: /@license/i,
								comments: false,
							},
						},
						extractComments: true,
					}),
			  ],
	},
};
