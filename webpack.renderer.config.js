const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path');

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@modules': path.resolve(__dirname, 'src/modules/'),
      '@appstate': path.resolve(__dirname, 'src/AppState.ts')
    }
  },
};
