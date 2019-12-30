const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const __root = path.resolve(__dirname, '../../')


module.exports = {
  entry: ['@babel/polyfill', path.resolve(__root, 'src/main.js')],
  output: {
    filename: 'rin-vue.js',
    path: path.resolve(__root, 'dist'), // 打包路径：通过resolve保证为绝对路径
  },
  resolve: {
    alias: { '@': path.resolve(__root, 'src') }
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
          },
          'eslint-loader'
        ],
        include: path.resolve(__root, 'src'), // 指定src目录下,不配置会导致@babel/polyfill报错
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
        include: path.resolve(__root, 'src'), // 指定src目录下,不配置会导致@babel/polyfill报错
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
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__root, 'public/index.html'),
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
  ]
}