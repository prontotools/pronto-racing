const isProd = process.env.NODE_ENV === 'production'
const isDeployingOnGhPages = process.env.GH_PAGES === 'true'
const exportPathMap = require('./exportPathMap')
const webpack = require('webpack')

module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      })
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.GH_PAGES': JSON.stringify(process.env.GH_PAGES)
      })
    )
    config.module.rules.push(
      {
        test: /\.css$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    )

    return config
  },
  exportPathMap: () => exportPathMap,
  assetPrefix: isProd && isDeployingOnGhPages ? '/pronto-racing/' : ''
}
