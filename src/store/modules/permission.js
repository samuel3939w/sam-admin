// 專門處理權限路由的模塊
import { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 路由表:初始擁有靜態路由權限
    routes: publicRoutes
  },
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      // 永遠在靜態路由的基礎上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    // 根據權限篩選路由
    filterRoutes(context, menus) {
      //篩選之後, 獲取到的需要通過 addRoute 進行添加的路由表數組
      const routes = []
      menus.forEach((key) => {
        // 權限名 與 路由的 name 匹配
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })
      // 所有不匹配的路由, 全部進入404的路由配置
      // 注意: 該配置必須要在所有路由指定之後
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
