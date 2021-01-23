const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/main/snapshooter.js',
  externals: [nodeExternals()],
  output: {
    filename: 'snapshooter.js',
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
