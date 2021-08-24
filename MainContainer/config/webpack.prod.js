const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Local imports
const {
  MICRO_FRONTEND_PATH: { MAIN_CONTAINER },
} = require('../../MicroFrontendPath');

const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');

const { NAME, REMOTES } = MAIN_CONTAINER;

console.log(REMOTES);

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: NAME,
      remotes: REMOTES,
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
