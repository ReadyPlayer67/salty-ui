import Theme from 'vitepress/dist/client/theme-default/index.js'
import HelloWorld from '../../../src/components/HelloWorld.vue'
import Test from "../../../src/components/Test"
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import 'vitepress-theme-demoblock/theme/styles/index.css'

export default {
    ...Theme,
    //扩展应用程序实例
    enhanceApp({app}:{app:any}){
        //注册组件
        app.component('DemoBlock',DemoBlock)
        app.component('Demo',Demo)
        app.component('HelloWorld',HelloWorld)
        app.component('Test',Test)
    }
}
