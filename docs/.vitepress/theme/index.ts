import Theme from 'vitepress/dist/client/theme-default/index.js'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import '../../../src/index.scss'
//导入组件库
import SaltyUI from '../../../scripts/entry'
import './index.css'
import './iconfont.css'

export default {
  ...Theme,
  //扩展应用程序实例
  enhanceApp({app}: { app: any }) {
    //注册组件
    app.use(SaltyUI)
    app.component('DemoBlock', DemoBlock)
    app.component('Demo', Demo)
  }
}
