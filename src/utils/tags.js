const whiteList = ['/login', '/import', '/404', '/401']

/**
 * path 是否需要被緩存
 * @param {*} path 
 * @returns 
 */
export function isTags(path) {
  return !whiteList.includes(path)
}
