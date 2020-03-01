import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from 'jwt-decode'
import { asyncRouterMap } from '../router/index'

Vue.use(Vuex)

// 路由过滤器
// 递归过滤 需过滤到子路由
const filterAsyncRouter = (asyncRouterMap: Array<any>, roles: string) => {
  const accessedRoutes = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRoutes
}

 export const hasPermission = (roles: string, route: any) => {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0)
  } else {
    // 默认可看
    return true
  }
}
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
      const userInfoDecoded: any = jwt_decode(user)
      // 获取用户的身份标识
      // 只在登录时设置权限无法阻止用户手动输入路径访问
      // 还要解决在登录状态下手动输入路径访问无权限页面的问题 见router/index.ts中的路由拦截
      const { key } = userInfoDecoded
      const accessedRoutes = filterAsyncRouter(asyncRouterMap, key)
      commit('SET_USER', userInfoDecoded)
      commit('SET_ROUTER', accessedRoutes)
      
    },

    async setRouter({ state, commit }, router: Object) {
      commit('SET_ROUTER', router)
    }

  },
  modules: {
  }
})
