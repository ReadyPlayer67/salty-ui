import { IInnerTreeNode, ITreeNode } from '../tree-type'
import { ComputedRef, Ref } from 'vue'

export type IUseCore = {
  getChildren: (
    treeNode: IInnerTreeNode,
    recursive?: boolean
  ) => IInnerTreeNode[]
  getIndex: (node: IInnerTreeNode) => number
  expandedTree: ComputedRef<IInnerTreeNode[]>
  getNode: (node: IInnerTreeNode) => IInnerTreeNode | undefined
  getParent: (node: IInnerTreeNode) => IInnerTreeNode | undefined
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
  treeItems: ITreeNode[] //从后端获取的懒加载节点数据
}

export type IDragdrop = boolean | IDropType

export interface IDropType {
  dropPrev?: boolean
  dropNext?: boolean
  dropInner?: boolean
}

export interface IUseDraggable {
  onDragstart: (event: DragEvent, treeNode: IInnerTreeNode) => void //开始拖拽事件
  onDragover: (event: DragEvent) => void //拖拽经过某个节点的事件
  onDragleave: (event: DragEvent) => void //拖拽离开某个节点的事件
  onDrop: (event: DragEvent, treeNode: IInnerTreeNode) => void //释放到某个节点的事件
  onDragend: (event: DragEvent) => void //拖拽结束事件，做一些清理工作
}

//记录当前拖拽状态
export interface DragState {
  dropType?: keyof Required<IDropType> //约束值必须是IDropType三个key名字中的一种
  draggingNode?: HTMLElement | null //正在拖拽的节点html元素
  draggingTreeNode?: IInnerTreeNode | null //正在拖拽的节点数据
}

export type TreeUtils = {
  //原始tree中的数据
  innerData: Ref<IInnerTreeNode[]>
} & IUseCore &
  IUseToggle &
  IUseCheck &
  IUseOperate &
  IUseLazyLoad &
  IUseDraggable
