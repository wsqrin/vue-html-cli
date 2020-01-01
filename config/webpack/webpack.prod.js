const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  bail: true,  // 出错时，迫使webpack退出其打包
  // 配置优化规则
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    // =>压缩优化(产生问题：因为配置，导致js不会自动压缩)
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),// 压缩css
      new UglifyJsPlugin({
        cache: true, // =>启用缓存
        parallel: true, // =>启用并发编译
        sourceMap: true, // =>启用源码映射=>方便调试
      }) // 压缩js
    ],
  }
})