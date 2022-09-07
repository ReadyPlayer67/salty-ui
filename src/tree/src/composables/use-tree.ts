import {computed, ref, Ref, unref} from "vue";
import {IInnerTreeNode, ITreeNode} from "../tree-type";
import {generateInnerTree} from "../utils";

export default function useTree(node: Ref<ITreeNode[]> | ITreeNode[]){
  const innerData = ref(generateInnerTree(unref(node)))
  const toggleNode = (node: IInnerTreeNode) => {
    //这里应该修改元素数据，即innerData
    const cur = innerData.value.find(item => item.id === node.id)
    if(cur){
      cur.expanded = !cur.expanded
    }
  }
  const expandedTree = computed(() => {
    //维护一个数组用于存放应当折叠的节点
    let excludedNodes: IInnerTreeNode[] = []
    let result: IInnerTreeNode[] = []
    for(const item of innerData.value){
      //如果遍历的节点在excludedNodes，就直接忽略
      if(excludedNodes.includes(item)){
        continue
      }
      //如果当前节点是折叠状态的，将当前节点的children都加到折叠节点数组中
      if(item.expanded !== true){
        excludedNodes = [...excludedNodes,...getChildren(item)]
      }
      result.push(item)
    }
    return result
  })
  const getChildren = (node:IInnerTreeNode) => {
    let result = []
    const startIndex = innerData.value.findIndex(item => item.id === node.id)
    //从startIndex开始寻找level比node大的节点，即node的子节点
    //注意，i<innerData.value.length && node.level < innerData.value[i].level这种写法当遇到任意条件不满足，循环就会终止
    //所以当遇到非node的子节点时，循环就会停止，不会查找到其他的叶子节点
    for(let i=startIndex+1;i<innerData.value.length && node.level < innerData.value[i].level;i++){
      result.push(innerData.value[i])
    }
    return result
  }
  return {
    innerData,
    toggleNode,
    expandedTree,
    getChildren
  }
}
