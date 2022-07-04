import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

//請求攔截器
service.interceptors.request.use(
  (config) => {
    // 添加 icode
    config.headers.icode = 'A36D8E2C7003EE03'
    // 在這裡統一注入token
    if (store.getters.token) {
      if (isCheckTimeout()) {
        // 退出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    config.headers['Accept-Language'] = store.getters.language
    // 必須返回 config
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response攔截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    // 要根據success的成功與否決定下面的操作
    if (success) {
      return data
    } else {
      // 業務錯誤
      ElMessage.error(message) // 提示錯誤訊息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    // TODO: 將來處理token 超時問題
    ElMessage.error(error.message)
    return Promise.reject(error) //提示錯誤訊息
  }
)

export default service
