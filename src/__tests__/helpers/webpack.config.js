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
        exclude: [/node_modules/],
        include: [path.join(projectBase, 'src', 'index.ts')],
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: 'istanbul-instrumenter-loader',
        options: {
          esModules: true,
        },
        include: [path.join(projectBase, 'src', 'index.ts')],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'inline-source-map',
};
