const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack/common');

module.exports = (_env, { mode }) => {
	const properlyConfig = require(`./webpack/${mode}`);
	const mergedConfig = merge(commonConfiguration, properlyConfig);

	return mergedConfig;
};

// ====================
// "start": "webpack-dev-server --hot --open",
//  "build": "webpack --config webpack.config.js --mode production"

// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const path = require("path");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.[hash].js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/index.html",
//     }),
//   ],
//   resolve: {
//     modules: [__dirname, "src", "node_modules"],
//     extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: require.resolve("babel-loader"),
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.png|svg|jpg|gif$/,
//         use: ["file-loader"],
//       },
//     ],
//   },
// };
