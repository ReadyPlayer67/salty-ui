import {IInnerTreeNode, ITreeNode} from "../tree-type";
import {ComputedRef, Ref} from "vue";

export type IUseCore = {
  getChildren: (treeNode: IInnerTreeNode, recursive?: boolean) => IInnerTreeNode[]
  getIndex: (node:IInnerTreeNode) => number
  expandedTree: ComputedRef<IInnerTreeNode[]>
  getNode: (node: IInnerTreeNode) => IInnerTreeNode | undefined
}

export type IUseToggle = {
  toggleNode: (treeNode: IInnerTreeNode) => void
}

export type IUseCheck = {
  toggleCheckNode: (treeNode: IInnerTreeNode) => void
}

export type IUseOperate = {
  append: (parent: IInnerTreeNode, node: IInnerTreeNode) => void
  remove: (node: IInnerTreeNode) => void
}

export type IUseLazyLoad = {
  lazyLoadNodes: (node: IInnerTreeNode) => void
}

export type LazyNodeResult = {
  node: IInnerTreeNode
  treeItems: ITreeNode[]  //从后端获取的懒加载节点数据
}

export type TreeUtils = {
  //原始tree中的数据
  innerData: Ref<IInnerTreeNode[]>
} & IUseCore & IUseToggle & IUseCheck & IUseOperate & IUseLazyLoad
