import router from '@/router'
import store from './store'

// 白名單
const whiteList = ['/login']

/**
 * 路由前置守衛
 * @param {*} to 要到哪裡去
 * @param {*} from 你從哪裡來
 * @param {*} next 是否要去?
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1. 用戶已登入. 則不允許進入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判斷當前用戶信息是否存在,如果不存在,則獲取用戶信息
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        // 處理用戶權限, 篩選出需要添加的路由
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 循環添加對應動態路由
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完動態路由之後,需要進行一次主動跳轉
        return next(to.path)
      }
      next()
    }
  } else {
    // 2. 用戶未登入. 只允許進入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
