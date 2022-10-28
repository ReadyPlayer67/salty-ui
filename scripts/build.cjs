const path = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsxPlugin = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')
const fs = require('fs')

// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
//组件目录
const componentsDir = path.resolve(__dirname, '../src')
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
const createPackageJson = name => {
  const fileStr = `{
    "name": "${name || 'salty-ui'}",
    "version": "0.0.0",
    "main": "${name ? 'index.umd.js' : 'salty-ui.umd.js'}",
    "module": "${name ? 'index.js' : 'salty-ui.js'}",
    "author": "ReadyPlayer67",
    "github": "",
    "description": "My first vue3 component library",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/ReadyPlayer67/salty-ui.git"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC"
  }`
  if (name) {
    //单个组件，输出对应的package.json
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    //全量打包
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}

// 单组件按需构建
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          //入口文件为每个组件目录下的index.ts
          entry: path.resolve(componentsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: path.resolve(outputDir, name)
      }
    })
  )
  createPackageJson(name)
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
          name: 'salty-ui',
          fileName: 'salty-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
  createPackageJson()
}

const buildLib = async () => {
  await buildAll()

  fs.readdirSync(componentsDir)
    .filter(name => {
      //读取componentDir（即src）目录下，只要目录不要文件
      //且要求这个目录下必须有一个index.ts的文件，这样的目录我们才认为是一个组件目录
      const componentDir = path.resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => {
      //遍历组件目录，执行单独构建方法
      await buildSingle(name)
    })
}

buildLib()
