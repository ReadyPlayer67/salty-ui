const path = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsxPlugin = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')

// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
// 输出目录
const outputDir = path.resolve(__dirname, '../build')

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsxPlugin()]
})

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

//生成package.json
const createPackageJson = () => {
  const fileStr = `{
    "name": "salt-ui",
    "version": "0.0.0",
    "main": "salt-ui.umd.js",
    "module": "salt-ui.js",
    "author": "ReadyPlayer67",
    "github": "",
    "description": "My first vue3 component library",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/ReadyPlayer67/salt-ui.git"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC"
  }`

  fsExtra.outputFile(
    path.resolve(outputDir, 'package.json'),
    fileStr,
    'utf-8'
  )
}

//全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'salt-ui',
          fileName: 'salt-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
}

const buildLib = async () => {
  await buildAll()
  createPackageJson()
}

buildLib()
