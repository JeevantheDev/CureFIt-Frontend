const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Local imports
const {
  MICRO_FRONTEND_PATH: { MAIN_CONTAINER },
} = require('../../MicroFrontendPath');

const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');

const { PATH, PORT, NAME, REMOTES } = MAIN_CONTAINER;

const devConfig = {
  mode: 'development',
  output: {
    publicPath: PATH,
  },
  devServer: {
    port: PORT,
    historyApiFallback: true,
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

module.exports = merge(commonConfig, devConfig);
