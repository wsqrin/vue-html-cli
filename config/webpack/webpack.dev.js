const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true, // 自动打开浏览器
    disableHostCheck: false,
    host: '127.0.0.1',
    port: 7777,
    https: false,
    hotOnly: true,
    hot: true,
    inline: true, // 内联模式=>模块热替换
    watchContentBase: true, // 热重载
    watchOptions: {
      aggregateTimeout: 500, // 防抖，防止一直输入代码一直运行(ms)
      poll: 1000, // 每秒检查一次变动
      ignored: '/node_modules/' // 不需要监控的文件
    }
    // contentBase: path.join(__dirname, "../public") // html默认根目录
  }
})