import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  ArticleCreaterRouter,
  ArticleRouter,
  PermissionListRouter,
  RoleListRouter,
  UserManageRouter
]

/**
 * 公開路由表
 */

export const publicRoutes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index')
  },
  {
    path: '/',
    redirect: '/profile',
    component: () => import(/* webpackChunkName: "login" */ '@/layout'),
    children: [
      //個人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      //404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      //401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

export const resetRouter = () => {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((item) => {
      router.removeRoute(item)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
