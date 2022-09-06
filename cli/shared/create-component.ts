import {ensureDirSync, writeFileSync} from 'fs-extra'
import {WriteFileOptions} from 'fs'
import {resolve} from 'path'
import {lightBlue, lightGreen} from 'kolorist'
import genCoreTemplate from "../template/core";
import genTypesTemplate from "../template/types";
import genStyleTemplate from "../template/style";
import genTestTemplate from "../template/test";
import genIndexTemplate from "../template";

export interface ComponentMeta {
  name: string
  title: string
  category: string
}

const WRITE_FILE_OPTIONS: WriteFileOptions = {encoding: 'utf-8'}

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

  //创建组件核心文件
  const coreFilePath = resolve(compSrcDir, name + '.tsx')
  writeFileSync(coreFilePath, genCoreTemplate(name), WRITE_FILE_OPTIONS)

  //创建组件类型文件
  const typesFilePath = resolve(compSrcDir, name + '-type.ts')
  writeFileSync(typesFilePath, genTypesTemplate(name), WRITE_FILE_OPTIONS)

  //创建组件样式文件
  const styleFilePath = resolve(styleDir, name + '.scss')
  writeFileSync(styleFilePath, genStyleTemplate(name), WRITE_FILE_OPTIONS)

  //创建组件测试文件
  const testFilePath = resolve(testDir, name + '.test.ts')
  writeFileSync(testFilePath, genTestTemplate(name), WRITE_FILE_OPTIONS)

  //创建组件索引文件
  const indexFilePath = resolve(componentDir, 'index.ts')
  writeFileSync(indexFilePath, genIndexTemplate(name), WRITE_FILE_OPTIONS)

  //创建成功通知
  console.log(
    lightGreen(`√ 组件${name}目录创建成功`)
  )
  console.log(
    lightBlue(`√ 组件目录：${componentDir}`)
  )
}
