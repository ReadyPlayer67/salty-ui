import { App } from 'vue'
import Popover from './src/popover'

// 具名导出
export { Popover }

// 导出插件
export default {
  install(app: App) {
    app.component('SPopover', Popover)
  }
}
