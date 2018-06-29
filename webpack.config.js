const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const PrettierPlugin = require("prettier-webpack-plugin")
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = [{
  mode: 'development',
  entry: {
    application: './src/js/index.ts'
  },
  output: {
    path: `${__dirname}/app/js`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json']
  },
  plugins: [
    new PrettierPlugin()
  ]
}, {
  mode: 'development',
  entry: {
    application: './src/scss/style.scss'
  },
  output: {
    path: `${__dirname}/app/css`,
    filename: `bundle.css`,
    publicPath: '/css'
  },
  module: {
    rules: [
      {
        test: /\.css|scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    modules: ["web_modules", "node_modules", "spritesmith-generated"]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new PrettierPlugin({
      parser: 'scss'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')(),
          require('stylelint')()
        ]
      }
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 8080,
        server: { baseDir: ['app'] }
      },
      {
        reload: true
      }
    )
  ]
}]
