import { App } from 'vue'
import Icon from './src/icon'

// 具名导出
export { Icon }

// 导出插件
export default {
  install(app: App) {
    app.component('SIcon', Icon)
  }
}
