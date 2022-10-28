import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
//使用全量导出的方式引入组件库
import SaltUI from '../build/'

createApp(App).use(SaltUI).mount('#app')
