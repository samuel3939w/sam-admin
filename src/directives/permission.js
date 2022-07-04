import store from '@/store'

function checkPermission(el, binding) {
  // 獲取綁定的值，此處為權限
  const { value } = binding
  // 獲取所有的功能指定
  const points = store.getters.userInfo.permission.points
  // 當傳入的指令集為數組時
  if (value && value instanceof Array) {
    // 匹配對應的指令
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 如果無法匹配，則表示當前用戶無該指令，那麼刪除對應的功能按鈕
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is["admin","editor"...]')
  }
}

export default {
  // 在綁定元素的父組件被掛載後調用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含組件的 VNode 及其子組件的 VNode 更新後調用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
