const path = require('path');
const projectBase = path.join(__dirname, '..', '..', '..');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, 'index.js'),
  },
  devServer: {
    port: 4444,
    contentBase: __dirname,
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.join(__dirname, 'tsconfig.json'),
          },
        },
        exclude: [
          /node_modules/,
          /index\.test\.ts/,
          path.join(projectBase, 'lib'),
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'inline-source-map',
};
