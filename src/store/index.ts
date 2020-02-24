import Vue from 'vue'
import Vuex from 'vuex'
import { GetterTree } from 'vuex'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)

// 页面组件中调用actions中的方法->mutations中的方法->设置state中的状态
export default new Vuex.Store({
  state: {
    user: null  //用户信息
  },
  getters: {
    // 获取用户信息
    user(state: any): void {
      return state.user
    }
  },
  mutations: {
    SET_USER(state: any, user: any): void{
      state.user = user
    }
  },
  actions: {
    async setUser({ state, commit }, user: any) {
      const userInfoDecoded = jwt_decode(user)
      commit('SET_USER', userInfoDecoded)
    }
  },
  modules: {
  }
})
