// 新增數據
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 獲取數據
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 刪除指定數據
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

// 刪除所有數據
export const removeAllItem = () => {
  window.localStorage.clear()
}
