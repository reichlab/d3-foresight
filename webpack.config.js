const webpack = require('webpack')
const path = require('path')

const PROD = JSON.parse(process.env.PROD_ENV || '0')

let plugins = []

if (PROD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }))
}

const config = {
  entry: path.resolve(__dirname, 'src/index.js'),

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

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['latest']
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
  },

  plugins: plugins
}

module.exports = config
