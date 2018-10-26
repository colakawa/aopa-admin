const path = require('path');
// const url = 'http://ga.aopa.org.cn/';
// const testUrl = 'http://www.airport.com/';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // lintOnSave: false,
  // baseUrl: process.env.BASE_URL,
  // baseUrl: 'http://www.airport.com/',
  devServer: {
    port: 8081,
    open: true, // 配置自动启动浏览器
    proxy: {
      '/admin': {
        target: 'http://www.airport.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
      '/index': {
        target: 'http://www.airport.com/',
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
