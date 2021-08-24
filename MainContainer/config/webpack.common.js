const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  MICRO_FRONTEND_PATH: { MAIN_CONTAINER },
} = require('../../MicroFrontendPath');

const { TEMPLATE } = MAIN_CONTAINER;

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=100000'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE,
    }),
  ],
};
