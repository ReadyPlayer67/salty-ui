import {computed, ref, Ref, unref} from "vue";
import {IInnerTreeNode, ITreeNode} from "../tree-type";
import {generateInnerTree} from "../utils";
import {randomId} from "../../../shared/utils";

export default function useTree(node: Ref<ITreeNode[]> | ITreeNode[]) {
  const innerData = ref(generateInnerTree(unref(node)))
  const toggleNode = (node: IInnerTreeNode) => {
    //这里应该修改元素数据，即innerData
    const cur = innerData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
    }
  }
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
  const getIndex = (node: IInnerTreeNode) => {
    if (!node) {
      return -1
    }
    return innerData.value.findIndex(item => item.id === node.id)
  }
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
    innerData,
    toggleNode,
    expandedTree,
    getChildren,
    toggleCheckNode,
    append,
    remove
  }
}
