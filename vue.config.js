const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // lintOnSave: false,
  // baseUrl: process.env.BASE_URL,
  devServer: {
    port: 8081,
    open: true, // 配置自动启动浏览器
    proxy: {
      '/admin': {
        target: 'http://ga.aopa.org.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
      '/index': {
        target: 'http://ga.aopa.org.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/index': '/',
        },
      },
    },
  },
  css: {
    // extract: true,
    loaderOptions: {
      sass: {
        data: '@import "@/styles/base/index.scss";',
      },
    },
  },

  chainWebpack: config => {
    config.resolve.alias
      // .set('@', path.resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));
  },

  lintOnSave: undefined,
};
