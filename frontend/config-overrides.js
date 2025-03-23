const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add polyfills for Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    process: require.resolve('process/browser'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    util: require.resolve('util/'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    url: require.resolve('url/')
  };

  // Add plugins for global variables
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ];

  // Disable sourcemaps in production
  if (env === 'production') {
    config.devtool = false;
  }
  
  // Ignore all warnings
  config.ignoreWarnings = [/./];

  return config;
}; 