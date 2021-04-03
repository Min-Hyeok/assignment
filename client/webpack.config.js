const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../server/dist'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './src/')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        "targets": {"chrome": "55"}, /* chrome 55 이상으로 지정 */
                        "debug": true
                    }
                ]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  plugins: [
      new HTMLWebpackPlugin({
          template: './public/index.html'
      })
  ],
  devServer: {
    proxy: {
      '/api':  'http://localhost:3000',
    },
  },
  devtool: 'source-map', // 개발 끝나면 지울거임
  mode: 'development'
}
