const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    filename: 'rin-vue.js',
    path: path.resolve(__dirname, 'dist'), // 打包路径：通过resolve保证为绝对路径
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  watchOptions: { // 监控选项
    poll: 1000, // 每秒问我一次
    aggregateTimeout: 500, // 防抖，防止一直输入代码一直运行(ms)
    ignored: '/node_modules/' // 不需要监控的文件
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: ['xlink:href', 'href'],
            use: ['xlink:href', 'href']
          }
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            // 使用babel-loader 把es6转化为es5
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // 主要转换的包
              plugins: [
                ['@babel/plugin-proposal-class-properties'], // 类处理插件
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        ],
        include: path.resolve(__dirname, 'src'), // 指定src目录下,不配置会导致@babel/polyfill报错
        exclude: '/node_modules/' // 忽略目录
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
          'postcss-loader',
        ],
        include: path.resolve(__dirname, 'src'), // 指定src目录下,不配置会导致@babel/polyfill报错
        exclude: '/node_modules/' // 忽略目录
      },
      { // 处理html中的图片
        test: /\.(html)$/,
        loader: 'html-loader',
      },
      { // 图片处理
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/', // 大于限制的图片放到images/文件下
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'head', // 引入js文件的位置
      minify: { // html压缩
        collapseWhitespace: true, // 去除空格
        removeComments: true, // 去除注释
        removeAttributeQuotes: true, // 移除属性的引号
        removeEmptyAttributes: true // 移除没有值的属性
      },
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'rin-vue.css',
    }),
    new OptimizeCSSAssetsPlugin()
  ],
  // 配置优化规则
  // optimization: {
  //   // =>压缩优化(产生问题：因为配置，导致js不会自动压缩)
  //   minimizer: [
  //     new OptimizeCSSAssetsPlugin({}),// 压缩css
  //     new UglifyJsPlugin({
  //       cache: true, // =>启用缓存
  //       parallel: true, // =>启用并发编译
  //       sourceMap: true, // =>启用源码映射=>方便调试
  //     }) // 压缩js
  //   ],
  // },
}