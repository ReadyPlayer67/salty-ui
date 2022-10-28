import { IUseCore, IUseLazyLoad, LazyNodeResult } from './use-tree-types'
import { IInnerTreeNode } from '../tree-type'
import { ref, Ref, SetupContext } from 'vue'
import { generateInnerTree } from '../utils'

export function useLazyLoad(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  { emit }: SetupContext
): IUseLazyLoad {
  const { getNode, getIndex, getChildren } = core
  //懒加载流程：接收父节点，派发事件，外部调用异步方法获取数据，传入回调函数
  const lazyLoadNodes = (node: IInnerTreeNode) => {
    const innerNode = getNode(node)
    //当innerNode的isLeaf为false并且childNodeCount属性不存在，我们认为该节点需要进行懒加载
    if (innerNode && innerNode.isLeaf === false && !innerNode.childNodeCount) {
      innerNode.loading = true
      emit('lazy-load', innerNode, dealChildNodes)
    }
  }
  //用户获取子节点数据之后，调用该函数
  const dealChildNodes = (result: LazyNodeResult) => {
    const node = getNode(result.node)
    if (node) {
      //结束加载状态
      node.loading = false
      //拍平操作
      const childNodes = ref<IInnerTreeNode[]>(
        generateInnerTree(result.treeItems, node.level)
      )
      //处理子节点和父节点之间的关系
      setParent(node, childNodes)
      insertChildren(node, childNodes)
      //更新父节点孩子数量，代表该节点不需要再懒加载了
      // node.childNodeCount = childNodes.value.length
      node.childNodeCount = getChildren(node).length
    }
  }
  //处理父子节点关系，将子节点parentId设置为父节点的id
  const setParent = (
    parent: IInnerTreeNode,
    children: Ref<IInnerTreeNode[]>
  ) => {
    children.value.forEach(child => {
      if (child.level - 1 === parent.level && !child.parentId) {
        child.parentId = parent.id
      }
    })
  }
  //追加异步获取的节点到原始数据中
  const insertChildren = (
    parent: IInnerTreeNode,
    nodes: Ref<IInnerTreeNode[]>
  ) => {
    const parentIndex = getIndex(parent)
    if (parentIndex > -1) {
      innerData.value.splice(parentIndex + 1, 0, ...nodes.value)
    }
  }

  return {
    lazyLoadNodes
  }
}
