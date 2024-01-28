const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	mode: "development",
	entry: {
		bundle: path.resolve(__dirname, "src/js/index.js"),
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name]-[contenthash].js",
		clean: true,
		assetModuleFilename: "assets/[name][ext]",
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" }),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.html",
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},
	module: {
		rules: [
			{ test: /\.(png|svg|jpg|jpeg|gif)$/, type: "asset/resource" },
			{ test: /\.html$/, loader: "html-loader" },
			{
				test: /\.css$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: "css-loader" },
				],
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: "css-loader" },
					{ loader: "sass-loader" },
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: { presets: ["@babel/preset-env"] },
					},
				],
			},
		],
	},
}
