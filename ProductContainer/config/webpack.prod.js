const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Local imports
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');
const {
  MICRO_FRONTEND_PATH: { PRODUCT_CONTAINER },
} = require('../../MicroFrontendPath');

const { NAME, FILE_NAME, EXPOSES, REMOTES } = PRODUCT_CONTAINER;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: NAME,
      filename: FILE_NAME,
      remotes: REMOTES,
      exposes: EXPOSES,
      shared: {
        ...packageJSON.dependencies,
        '@material-ui/styles': {
          singleton: true,
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
