/**
 * 判斷是否為外部資源
 * @param {*} path
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
