import {IInnerTreeNode} from "../tree-type";
import {computed, Ref} from "vue";
import {IUseCore} from "./use-tree-types";

export function useCore(innerData: Ref<IInnerTreeNode[]>) : IUseCore {
  const expandedTree = computed(() => {
    //维护一个数组用于存放应当折叠的节点
    let excludedNodes: IInnerTreeNode[] = []
    let result: IInnerTreeNode[] = []
    for (const item of innerData.value) {
      //如果遍历的节点在excludedNodes，就直接忽略
      if (excludedNodes.includes(item)) {
        continue
      }
      //如果当前节点是折叠状态的，将当前节点的children都加到折叠节点数组中
      if (item.expanded !== true) {
        excludedNodes = [...excludedNodes, ...getChildren(item)]
      }
      result.push(item)
    }
    return result
  })
  //获取一个节点子节点的方法，如果recursive=true，递归获取所有子孙节点，否则获取直接子节点
  const getChildren = (node: IInnerTreeNode, recursive = true) => {
    let result = []
    const startIndex = innerData.value.findIndex(item => item.id === node.id)
    //从startIndex开始寻找level比node大的节点，即node的子节点
    //注意，i<innerData.value.length && node.level < innerData.value[i].level这种写法当遇到任意条件不满足，循环就会终止
    //所以当遇到非node的子节点时，循环就会停止，不会查找到其他的叶子节点
    for (let i = startIndex + 1; i < innerData.value.length && node.level < innerData.value[i].level; i++) {
      if (recursive) {
        result.push(innerData.value[i])
      } else {
        if (node.level === innerData.value[i].level - 1) {
          result.push(innerData.value[i])
        }
      }
    }
    return result
  }
  const getIndex = (node: IInnerTreeNode) => {
    if (!node) {
      return -1
    }
    return innerData.value.findIndex(item => item.id === node.id)
  }
  return {
    expandedTree,
    getChildren,
    getIndex
  }
}
