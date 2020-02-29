import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from 'jwt-decode'
import { asyncRouterMap } from '../router/index'

Vue.use(Vuex)

// 页面组件中调用actions中的方法->mutations中的方法->设置state中的状态
export default new Vuex.Store({
  state: {
    user: null,  //用户信息
    router: asyncRouterMap //系统路由信息存储到state中
  },
  getters: {
    // 获取用户信息
    user(state: any): void {
      return state.user
    },
    // 获取系统路由
    router(state: any): void {
      return state.router
    }
  },
  mutations: {
    SET_USER(state: any, user: any): void{
      state.user = user
    },
    SET_ROUTER(state: any, router: Object): void {
      state.router = router
    }
  },
  actions: {
    async setUser({ state, commit }, user: any) {
      const userInfoDecoded = jwt_decode(user)
      commit('SET_USER', userInfoDecoded)
    },
    async setRouter({ state, commit }, router: Object) {
      commit('SET_ROUTER', router)
    }
  },
  modules: {
  }
})
