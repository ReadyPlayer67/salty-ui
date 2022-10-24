//入口文件
//1.引入实现组件批量导出
import type {App} from "vue"
import ButtonPlugin,{Button} from "../src/button"
import TreePlugin, { Tree } from '../src/tree'
import PaginationPlugin, { Pagination } from '../src/pagination'
import FormPlugin, { Form } from '../src/form'
import InputPlugin, { Input } from '../src/input'

//2.导出这些组件
export { Button, Tree, Pagination, Form, Input }

//3.导出一个vue插件
const installs = [
  ButtonPlugin,
  TreePlugin,
  PaginationPlugin,
  FormPlugin,
  InputPlugin,
]
export default {
  install(app: App) {
    installs.forEach(p => app.use(p))
  }
}
