const webpack = require('webpack')
const path = require('path')

const PROD = JSON.parse(process.env.PROD_ENV || '0')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),

  mode: PROD ? 'production' : 'development',

  output: {
    filename: PROD ? 'd3-foresight.min.js' : 'd3-foresight.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'd3Foresight',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  externals: {
    'd3': 'd3',
    'moment': 'moment'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  }
}
