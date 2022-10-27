import {App} from 'vue'
import Icon from './src/icon'
import {ArrowDownIcon} from './arrow-down'
import {CloseIcon} from './close'

// 具名导出
export {Icon, ArrowDownIcon, CloseIcon}

// 导出插件
export default {
  install(app: App) {
    app.component('SIcon', Icon)
    app.component('ArrowDownIcon', ArrowDownIcon)
    app.component('CloseIcon', CloseIcon)
  }
}
