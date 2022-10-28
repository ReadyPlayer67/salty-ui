import { IInnerTreeNode } from '../tree-type'
import { ref, Ref } from 'vue'
import { IUseCheck, IUseCore, IUseOperate } from './use-tree-types'
import { randomId } from '../../../shared/utils'

export function useOperate(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseOperate {
  const { getChildren, getIndex } = core
  const append = (parent: IInnerTreeNode, node: IInnerTreeNode) => {
    //获取parent节点的最后一个子节点
    const children = getChildren(parent, false)
    const lastChild = children[children.length - 1]
    //确定未来要插入新节点的位置索引，默认是parent接的的索引+1（parent为叶子节点）
    let insertIndex = getIndex(parent) + 1
    //如果parent不是叶子节点，即lastChild不为null，那么就应该插入到他最后一个child的后面
    if (lastChild) {
      insertIndex = getIndex(lastChild) + 1
    }
    //parent节点应该是展开，非叶子节点的状态，这样保证能看到新节点
    parent.expanded = true
    parent.isLeaf = false
    const currentNode = ref({
      ...node,
      level: parent.level + 1,
      isLeaf: true,
      parentId: parent.id
    })
    if (currentNode.value.id === undefined) {
      currentNode.value.id = randomId()
    }
    innerData.value.splice(insertIndex, 0, currentNode.value)
  }
  const remove = (node: IInnerTreeNode) => {
    const childrenIds = getChildren(node).map(item => item.id)
    innerData.value = innerData.value.filter(item => {
      return item.id !== node.id && !childrenIds.includes(item.id)
    })
  }
  return {
    append,
    remove
  }
}
