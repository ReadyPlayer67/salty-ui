import {defineConfig} from 'vite'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'

//为vitepress项目添加jsx插件支持
export default defineConfig({
  plugins: [vueJsxPlugin()]
})
