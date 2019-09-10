const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
// fucking shit https://www.webpackjs.com/guides/output-management/#%E6%B8%85%E7%90%86-dist-%E6%96%87%E4%BB%B6%E5%A4%B9 中文官方文档错误。大家还是看英文文档 https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

process.env.NODE_ENV = "development"
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: "../dist",
    open: true,
    compress: true,
    port: process.env.PORT || 3000
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].bundle.js"
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    //  clean dist
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "public/index.html"
        }
      )
    ),
    // HRM
    new webpack.HotModuleReplacementPlugin()
  ]
}
