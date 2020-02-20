import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Password from '../views/login/Password.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/login/Login.vue')
  },
  {
    path: '/password',
    name: 'Password',
    component: Password
  }

  // 多行加载某个view 
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// tips:
//   1.@代表当前的src路径
