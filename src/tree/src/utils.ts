import {IInnerTreeNode, ITreeNode} from "./tree-type";

export function generateInnerTree(
  tree: ITreeNode[],
  level = 0, //表示当前节点所处层级
  path = [] as IInnerTreeNode[] //表示递归过程的路径，用来判断父节点的id
): IInnerTreeNode[] {
  level++
  return tree.reduce((prev, cur) => {
    const o = {...cur} as IInnerTreeNode
    o.level = level
    if(path.length){
      o.parentId = path[path.length-1].id
    }
    if (o.children) {
      //递归地将o.children拍平成一个数组
      const children = generateInnerTree(o.children, level, [...path,o])
      //删除IInnerTreeNode上的children属性
      delete o.children
      //将当前节点和他所有的children节点拼接在一起
      return prev.concat(o, children)
    } else {
      o.isLeaf = true
      return prev.concat(o)
    }
  }, [] as IInnerTreeNode[])
}

