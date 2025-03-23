const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          util: require.resolve('util/'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          url: require.resolve('url/'),
          process: require.resolve('process/browser'),
        },
      },
      output: {
        publicPath: '/',
      },
      infrastructureLogging: {
        level: 'none',
      },
      ignoreWarnings: [/.*/],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  },
}; 