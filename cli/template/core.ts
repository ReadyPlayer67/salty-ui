//创建组件核心文件模板
import {upperFirst} from "./utils";

export default function genCoreTemplate(name: string) {
  const compName = 'S' + upperFirst(name)
  //属性类型名和属性名
  const propsTypeName = upperFirst(name) + 'Props'
  const propsName = name + 'Props'
  const propsFileName = name + '-type'
  const className = 's-' + name
  return `
import {defineComponent, toRefs} from "vue";
import {${propsTypeName}, ${propsName} from "./${propsFileName}";

export default defineComponent({
  name: '${compName}',
  props: ${propsName},
  setup(props: ${propsTypeName}) {
    const {type, size, disabled, block} = toRefs(props)
    return () => {
      return (
        <div class="${className}"></div>
      )
    }
  }
})
`
}