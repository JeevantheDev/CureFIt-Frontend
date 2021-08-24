const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Local imports
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');
const {
  MICRO_FRONTEND_PATH: { PRIVATE_CONTAINER },
} = require('../../MicroFrontendPath');

const { NAME, FILE_NAME, EXPOSES } = PRIVATE_CONTAINER;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: NAME,
      filename: FILE_NAME,
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
