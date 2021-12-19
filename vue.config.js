const path = require('path');

module.exports = {
  publicPath: '',
  outputDir: 'dist/popup',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.vue', '.json'],
    },
  },
};
