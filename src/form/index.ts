import { App } from 'vue'
import Form from './src/form'
import FormItem from "./src/form-item";

// 具名导出
export { Form, FormItem }

// 导出插件
export default {
  install(app: App) {
    app.component('SForm', Form)
    app.component('SFormItem', FormItem)
  }
}
