//入口文件
//1.引入实现组件批量导出
import type { App } from 'vue'
import ButtonPlugin, { Button } from '../src/button'
import TreePlugin, { Tree } from '../src/tree'
import PaginationPlugin, { Pagination } from '../src/pagination'
import FormPlugin, { Form } from '../src/form'
import InputPlugin, { Input } from '../src/input'
import ModalPlugin, { Modal } from '../src/modal'
import IconPlugin, { Icon } from '../src/icon'
import TabPlugin, { Tab } from '../src/tab'
import PopoverPlugin, { Popover } from '../src/popover'

//2.导出这些组件
export { Button, Tree, Pagination, Form, Input, Modal, Icon, Tab, Popover }

//3.导出一个vue插件
const installs = [
  ButtonPlugin,
  TreePlugin,
  PaginationPlugin,
  FormPlugin,
  InputPlugin,
  ModalPlugin,
  IconPlugin,
  TabPlugin,
  PopoverPlugin
]
export default {
  install(app: App) {
    installs.forEach(p => app.use(p))
  }
}
