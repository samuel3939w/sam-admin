import { createI18n } from 'vue-i18n'
import enLocale from './lang/en'
import zhLocale from './lang/zh'
import store from '@/store'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const locale = store.getters.language === 'zh' ? 'zh' : 'en'

const i18n = createI18n({
  //使用 conposition API
  legacy: false,
  //全局使用t函數
  globalInjection: true,
  locale,
  messages
})

export default i18n
