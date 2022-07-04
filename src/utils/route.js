import path from 'path-browserify'
/**
 * 所有的子集路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 處理脫離層級的路由
 */
export const filterRoutes = (routes) => {
  // 所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根據子集路由進行查重操作
  return routes.filter((route) => {
    // 根據 route 在 childrenRoutes 中進行查重, 把所有的重複路由表剃除
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 根據 filterRoutes(routes) 數據, 返回對應的 menu 規則數據
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不滿足該條件 meta && meta.title && meta.icon 的數據不應該存在
  routes.forEach((item) => {
    // 不存在children && 不存在meta 直接return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在children && 不存在meta, 跌帶generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
    }
    // 不存在 children, 存在 meta || 存在 children, 存在 meta
    // 因為最終的 menu 需要進行跳轉, 此時我們需要合併path
    const routePath = path.resolve(basePath, item.path)
    // 路由分離之後, 可能存在同名父路由的情況
    let route = result.find((item) => item.path === routePath)
    // 當前路由尚未加入到result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon && title
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    // 存在 children && 存在 meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
