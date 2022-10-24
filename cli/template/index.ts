import { upperFirst } from './utils'

export default function genIndexTemplate(name) {
  const compName = upperFirst(name)
  return `\
import { App } from 'vue'
import ${compName} from './src/${name}'

// 具名导出
export { ${compName} }

// 导出插件
export default {
  install(app: App) {
    app.component('S${compName}', ${compName})
  }
}
`
}

