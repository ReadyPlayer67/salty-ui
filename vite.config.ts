/// <reference types="vitest" />
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsxPlugin()],
  test:{
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/.[jt]sx$/]
    }
  }
})
