const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./client/src/index.js",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader", "eslint-loader"]
			},
			{
				// https://getbootstrap.com/docs/4.0/getting-started/webpack/
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				//https://medium.com/a-beginners-guide-for-webpack-2/handling-images-e1a2a2c28f8d
				test: /\.(png|jp(e*)g|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8000 // Convert images < 8kb to base64 strings
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"]
	},
	output: {
		path: __dirname + "/dist",
		publicPath: "/",
		filename: "bundle.js"
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Wildlife.DATA",
			template: "./build-utils/index.html"
		})
	],
	devServer: {
		// https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
		historyApiFallback: true,
		contentBase: "./dist",
		hot: true,
		proxy: {
			"/api": "http://localhost:3000"
		}
	}
};
