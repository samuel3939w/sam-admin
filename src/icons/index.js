// 1.導入所有的svg圖標
// 2.完成SvgIcon的全局註冊
import SvgIcon from '@/components/SvgIcon'

const svgRequire = require.context('./svg', false, /\.svg$/)
// 此時返回了一個svgRequire 函數,可以接收一個request 的參數,用於require的導入
// 該函數提供了三個屬性,可以通過 svgRequire.keys() 獲得所有的svg圖標
// 遍歷圖標,把圖標作為request參數傳入到 svgRequire 導入函數中,完成本地svg圖標的導入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
