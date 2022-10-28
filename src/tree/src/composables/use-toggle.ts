import { IInnerTreeNode } from '../tree-type'
import { IUseCore, IUseLazyLoad, IUseToggle } from './use-tree-types'
import { Ref, SetupContext } from 'vue'

export function useToggle(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  context: SetupContext,
  lazyLoad: IUseLazyLoad
): IUseToggle {
  const toggleNode = (node: IInnerTreeNode) => {
    const { lazyLoadNodes } = lazyLoad
    //这里应该修改元素数据，即innerData
    const cur = innerData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
      if (cur.expanded) {
        lazyLoadNodes(cur)
      }
    }
  }
  return {
    toggleNode
  }
}
