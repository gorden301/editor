const webpack = require('webpack')
const packageName = require('./package.json').name;
module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: 'playground/main.js',
      template: 'playground/statics/index.html'
    }
  },
  productionSourceMap: false,
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
        library: 'xdapp-page-editor',
        libraryTarget: "umd",
        jsonpFunction: `webpackJsonp_${packageName}`,
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ]
  },
  devServer: {
    disableHostCheck: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
  }
}
