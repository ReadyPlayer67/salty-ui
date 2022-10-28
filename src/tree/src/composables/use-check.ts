import { IInnerTreeNode } from '../tree-type'
import { Ref } from 'vue'
import { IUseCheck, IUseCore } from './use-tree-types'

export function useCheck(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseCheck {
  const { getChildren } = core
  const toggleCheckNode = (node: IInnerTreeNode) => {
    //避免初始化的时候node中没有checked设置
    node.checked = !node.checked
    //父子联动：获取子节点并同步他们的选中状态和父节点一致
    getChildren(node).forEach(child => {
      child.checked = node.checked
    })
    //子父联动
    //获取当前节点的父节点
    const parentNode = innerData.value.find(item => item.id === node.parentId)
    if (!parentNode) {
      return
    }
    //获取node的兄弟节点，相当于获取parentNode的直接子节点
    const siblingNodes = getChildren(parentNode, false)
    const checkedSiblingNodes = siblingNodes.filter(item => item.checked)
    if (siblingNodes.length === checkedSiblingNodes.length) {
      parentNode.checked = true
    } else {
      parentNode.checked = false
    }
  }
  return {
    toggleCheckNode
  }
}
