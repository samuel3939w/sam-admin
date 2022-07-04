import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import installElementPlus from './plugins/element'
// 初始化樣式表
import './styles/index.scss'
// 導入svgIcon
import InstallIcons from '@/icons'
// 導入路由鑒權
import './permission'
// 全局屬性
import InstallFilter from '@/filters'
// 指令
import installDirective from '@/directives'
// 引入所有圖標，並命名為 Icons
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)

InstallIcons(app)
installElementPlus(app)
installDirective(app)
InstallFilter(app)
// 通过遍历的方式注册所有 svg组件，会牺牲一点点性能
for (let i in Icons) {
  app.component(i, Icons[i])
}

app.use(store).use(router).use(i18n).mount('#app')
