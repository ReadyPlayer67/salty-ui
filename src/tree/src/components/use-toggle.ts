import {IInnerTreeNode} from "../tree-type";
import {IUseCore, IUseToggle} from "./use-tree-types";
import {Ref} from "vue";

export function useToggle(innerData: Ref<IInnerTreeNode[]>, core: IUseCore): IUseToggle {
  const toggleNode = (node: IInnerTreeNode) => {
    //这里应该修改元素数据，即innerData
    const cur = innerData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
    }
  }
  return {
    toggleNode
  }
}
