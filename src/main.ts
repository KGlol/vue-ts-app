import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/http'


// 使用中间件模块
Vue.use(ElementUI)

Vue.config.productionTip = false

// Vue原型链上注册封装的axios,方便全局使用请求
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
