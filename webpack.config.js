const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const tailwindcss = require('tailwindcss');

const isProduction = process.argv.includes('--mode=production');

module.exports = {
  entry: {
    index: './src/index.tsx',  // 第一个入口文件路径
    // main: './src/main.ts'      // 第二个入口文件路径
  },  
  output: {
    filename: '[name].bundle.js',   // 输出的文件名
    path: isProduction ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'temp')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']  // 支持的文件扩展名
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader" ,"css-loader", {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        tailwindcss
                    ]
                }
            }
        }],
      },

    ]
  },
  plugins: [
    // ...其他插件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static',  // 源文件夹路径
          to: '',  // 目标文件夹路径（此处为空，表示复制到输出根目录）
        },
      ],
    }),
  ],
  cache: true,
  mode: isProduction ? 'production' : 'development',
  // 根据命令行参数动态设置 devtool
  devtool: isProduction ? false : 'source-map',
  watchOptions: {
    aggregateTimeout: 300, // 延迟等待时间
    poll: 1000, // 轮询间隔
  },

};
