import { App } from 'vue'
import Modal from './src/modal'

// 具名导出
export { Modal }

// 导出插件
export default {
  install(app: App) {
    app.component('SModal', Modal)
  }
}
