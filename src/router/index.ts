import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'

Vue.use(VueRouter)
/**
 * 路由配置参数说明(用于sidebar的显示)
 * show: true, 为true则在sidebar展示
 * 
 * namr: 'router_name, 路由名称,用于绑定,必填
 * 
 * meta: { title: '', icon: 'fontawesome图标库' }
 */

// 为export方便在外部也可以访问路由信息(路由数组) 将定义的路由数组挂在到routes下 动态渲染路由
export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    show: true, //默认显示home主页
    component: Layout,
    redirect: '/home', 
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页', icon: 'fa fa-home' },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    show: true,
    meta: { title: '数据管理', icon: 'fa fa-database' },
    component: Layout,
    redirect: '/tableData', // 默认显示表格
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        meta: { title: '表格管理', icon: 'fa fa-table' },
        component: () => import('@/views/DataManage/TableData.vue')
      },
      {
        path: '/formData',
        name: 'formData',
        meta: { title: '表单管理', icon: 'fa fa-file-text-o' },
        component: () => import('@/views/DataManage/FormData.vue')
      },
      {
        path: '/chartsData',
        name: 'chartsData',
        meta: { title: '图表管理', icon: 'fa fa-bar-chart' },
        component: () => import('@/views/DataManage/ChartsData.vue')
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    show: true,
    component: Layout,
    redirect: '/accountData', // 默认显示表格
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        meta: { title: '账户管理', icon: 'fa fa-user-plus' },
        component: () => import('@/views/UserManage/AccountData.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    show: false,
    redirect: '/userInfo', // 默认显示表格
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心' },
        component: () => import('@/views/UserManage/UserInfo.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    show: false,
    meta: { title: '404' },
    component: () => import('@/views/404.vue')
  },
  {
    path: '/login',
    name: 'Login',
    show: false,
    meta: { title: '系统登录' },
    component: () => import( '@/views/Login/Login.vue')
  },
  {
    path: '/password',
    name: 'Password',
    show: false,
    meta: { title: '找回密码' },
    component: () => import('@/views/Login/Password.vue')
  },
  {
    path: '*',
    // component: () => import('@/views/404.vue')
    redirect: '/404'
  }
  // 惰性加载某个view 
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router:any = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})

// 路由拦截(判断登录状态)
router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false
  if (to.path == '/login' || to.path == '/password') next()
  else isLogin ? next() : next('/login')
})

export default router

// tips:
//   1.@代表当前的src路径 所有 vue-cli 创建的项目都默认配置了将 @ 指向 /src
