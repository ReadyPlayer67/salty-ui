import {ensureDirSync, writeFileSync} from 'fs-extra'
import {resolve} from 'path'
import {lightBlue, lightGreen} from 'kolorist'
import genCoreTemplate from "../template/core";

export interface ComponentMeta {
  name: string
  title: string
  category: string
}

export default function createComponent(meta: ComponentMeta) {
  const {name} = meta
  //拼接组件目录
  const componentDir = resolve('../src', name)
  //拼接核心文件目录：组件源文件，类型，样式，测试
  const compSrcDir = resolve(componentDir, 'src')
  const styleDir = resolve(componentDir, 'style')
  const testDir = resolve(componentDir, 'test')
  ensureDirSync(compSrcDir)
  ensureDirSync(styleDir)
  ensureDirSync(testDir)
  //创建文件和内容
  const coreFilePath = resolve(compSrcDir, name) + '.tsx'
  writeFileSync(coreFilePath, genCoreTemplate(name))
  //创建成功通知
  console.log(
    lightGreen(`√ 组件${name}目录创建成功`)
  )
  console.log(
    lightBlue(`√ 组件目录：${componentDir}`)
  )
}
