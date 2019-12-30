const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true, // 自动打开浏览器
    disableHostCheck: false,
    host: '127.0.0.1',
    port: 8088,
    https: false,
    hotOnly: false,
    hot: true,
    inline: true, // 页面重新记载
    // contentBase: path.join(__dirname, "../public") // html默认根目录
  },
  watchOptions: { // 监控选项
    poll: 1000, // 每秒问我一次
    aggregateTimeout: 500, // 防抖，防止一直输入代码一直运行(ms)
    ignored: '/node_modules/' // 不需要监控的文件
  }
})