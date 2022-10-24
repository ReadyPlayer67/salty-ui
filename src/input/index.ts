import { App } from 'vue'
import Input from './src/input'

// 具名导出
export { Input }

// 导出插件
export default {
  install(app: App) {
    app.component('SInput', Input)
  }
}
