const isProduction = process.env.NODE_ENV === 'production';

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  cache: true,
  entry: "./src/index.tsx",
  output: {
    // Chunkhash is not compatabile with webpack devserver
    filename: isProduction ? "[name].[chunkhash].js" : "[name].js",
    path: __dirname + "/dist/"
  },
  // Until webpack ships with CSS minification
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: !isProduction
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: isProduction ? false : 'source-map',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          "css-loader",
          "sass-loader"
        ],
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),

    // Fingerprint CSS
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    // This plugin will inject js and css
    new HtmlWebpackPlugin({
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      template: 'index.html'
    }),
  ],
  devServer: {
    publicPath: "http://localhost:8080",
  }
};
