const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/main/app.js',
  externals: [nodeExternals()],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: 'source-map',
  optimization: {
    minimize: false
  }
};
