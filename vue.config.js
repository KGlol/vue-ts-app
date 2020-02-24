// 内容修改时,需重新启动项目

module.exports = {
  // 反向代理
  devServer: {
    open: true,
    host: 'localhost',
    port: 8888,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://vuets-api.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
};

// npm i axios @types/axios --save 配置好反向代理 安装axios和@type/axios axios配置见http.ts
