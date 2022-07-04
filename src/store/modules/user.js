import { login, getUserInfo } from '@/api/sys'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'
import { TOKEN } from '@/constant'
import md5 from 'md5'
import router, { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN) || '',
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登入請求動作
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) })
          .then((data) => {
            this.commit('user/setToken', data.token)
            // 跳轉
            router.push('/')
            // 保存登入時間
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 獲取用戶信息
     */
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登入
     */
    logout() {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // TODO: 清理掉權限相關配置
      router.push('/login')
    }
  }
}
