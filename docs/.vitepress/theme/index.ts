import Theme from 'vitepress/dist/client/theme-default/index.js'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import {Button} from '../../../src/button'
import {Tree} from '../../../src/tree'

export default {
    ...Theme,
    //扩展应用程序实例
    enhanceApp({app}:{app:any}){
        //注册组件
        app.component('DemoBlock',DemoBlock)
        app.component('Demo',Demo)
        app.component('SButton',Button)
        app.component('STree',Tree)
    }
}
