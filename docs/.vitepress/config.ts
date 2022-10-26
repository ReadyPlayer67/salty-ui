import {defineConfig} from 'vitepress'
import {demoBlockPlugin} from 'vitepress-theme-demoblock'

const sidebar = [
  // {
  //   text: '快速开始',
  //   items: [
  //     {text: '安装', link: '/guide/install'} // /guide/install.md
  //   ]
  // },
  {
    text: '通用',
    items: [
      {text: 'Button 按钮', link: '/components/button/'},
      {text: 'Icon 图标', link: '/components/icon/'},
    ]
  },
  {
    text: '导航',
    items: [
      {text: 'Pagination 分页', link: '/components/pagination/'}
    ]
  },
  {
    text: '反馈',
    items: [
      {text: 'Modal 模态框', link: '/components/modal/'}
    ]
  },
  {
    text: '数据录入',
    items: [
      {text: 'Form 表单', link: '/components/form/'}
    ]
  },
  {
    text: '数据展示',
    items: [
      {text: 'Tree 树', link: '/components/tree/'}
    ]
  },
  {text: '布局', items: []}
]

export default defineConfig({
  title:'Salty-UI',
  description: '一个小巧的，基于Vue3的组件库',
  themeConfig: {
    logo:'./logo.svg',
    sidebar
  },
  markdown: {
    config(md) {
      //这里可以使用markdown-it插件
      md.use(demoBlockPlugin, {
        scriptReplaces: [
          {
            searchValue: /import {ref} from 'vue'/g,
            replaceValue: 'const { ref } = Vue'
          }
        ]
      })
    }
  }
})
