import { App } from 'vue'
import Tabs from './src/tabs'
import Tab from './src/tab'

// 具名导出
export { Tab,Tabs }

// 导出插件
export default {
  install(app: App) {
    app.component('STabs', Tabs)
    app.component('STab', Tab)
  }
}
