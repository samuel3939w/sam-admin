import request from '@/utils/request'

/**
 * 登入
 * return promise
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 獲取用戶信息
 * return promise
 */
 export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
  })
}