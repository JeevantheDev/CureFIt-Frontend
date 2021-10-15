const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Local imports
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');
const {
  MICRO_FRONTEND_PATH: { PRODUCT_CONTAINER },
} = require('../../MicroFrontendPath');

const { PATH, PORT, NAME, FILE_NAME, EXPOSES, TEMPLATE } = PRODUCT_CONTAINER;

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
      filename: FILE_NAME,
      exposes: EXPOSES,
      shared: {
        ...packageJSON.dependencies,
        '@material-ui/styles': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: TEMPLATE,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
