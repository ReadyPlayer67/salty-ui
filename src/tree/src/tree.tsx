import {defineComponent, provide, toRefs} from "vue";
import {TreeProps, treeProps} from "./tree-type";
import useTree from "./composables/use-tree";
import STreeNode from "./components/tree-node";
import STreeNodeToggle from "./components/tree-node-toggle";

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps, {slots}) {
    const {data} = toRefs(props)
    const {expandedTree, toggleNode, getChildren, toggleCheckNode, append, remove} = useTree(data)
    provide('TREE_UTILS', {
      toggleNode, getChildren, toggleCheckNode, append, remove
    })
    return () => {
      return (
        <div class="s-tree">{
          expandedTree.value.map(treeNode => (
            <STreeNode {...props} treeNode={treeNode}>
              {/*透传slots*/}
              {{
                //将slots.content封装成一个函数传给tree-node，这样在子组件傻瓜式执行slots.content()即可
                content: () => slots.content ? slots.content(treeNode) : treeNode.label,
                icon: () => {
                  return slots.icon ?
                    (
                      slots.icon({nodeData: treeNode, toggleNode})
                    ) : (
                      <STreeNodeToggle expanded={!!treeNode.expanded} onClick={() => {
                        toggleNode(treeNode)
                      }}/>
                    )
                }
              }}
            </STreeNode>
          ))
        }</div>
      )
    }
  }
})
