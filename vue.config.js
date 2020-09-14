const webpack = require('webpack')
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
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ]
  }
}
