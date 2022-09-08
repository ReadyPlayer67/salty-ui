import {defineComponent, inject, toRefs} from 'vue'
import {TreeNodeProps, treeNodeProps} from "./tree-node-type";
import {IInnerTreeNode} from "../tree-type";

const NODE_HEIGHT = 28
const NODE_INDENT = 24

type TreeUtils = {
  toggleNode: (treeNode: IInnerTreeNode) => void
  getChildren: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
  toggleCheckNode: (treeNode: IInnerTreeNode) => void
}

export default defineComponent({
  name: 'STreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, {slots}) {
    const {treeNode, checkable} = toRefs(props)
    const {toggleNode, toggleCheckNode, getChildren} = inject<TreeUtils>('TREE_UTILS') as TreeUtils
    return () => {
      return (
        <div class="s-tree-node hover:bg-slate-100 relative leading-8"
             style={{paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px`}}>
          {/*连接线*/}
          {
            !treeNode.value.isLeaf && treeNode.value.expanded && (
              <span class="s-tree-node_vline absolute w-px bg-gray-300" style={{
                height: `${NODE_HEIGHT * getChildren(treeNode.value).length}px`,
                left: `${NODE_INDENT * (treeNode.value.level - 1) + 12}px`,
                top: `${NODE_HEIGHT}px`
              }}></span>
            )
          }
          {/*折叠图标*/}
          {treeNode.value.isLeaf ?
            <span style={{display: 'inline-block', width: '25px'}}></span> :
            slots.icon!()
          }
          {/*复选框*/}
          {
            checkable.value && (
              <span class={`relative ${
                  treeNode.value.checked ? 's-tree__inChecked' : ''
                }`}
              >
                {/*{treeNode.value.checked && (*/}
                {/*  <span*/}
                {/*    class="s-tree-checkbox__inner cursor-pointer"*/}
                {/*    onClick={() => toggleCheckNode(treeNode.value)}*/}
                {/*  >*/}
                {/*    -*/}
                {/*  </span>*/}
                {/*)}*/}
                <input
                  type="checkbox"
                  style={{marginRight: '8px'}}
                  v-model={treeNode.value.checked}
                  onClick={() => toggleCheckNode(treeNode.value)}
                ></input>
                  </span>
            )
          }
          {slots.content!()}
        </div>
      )
    }
  }
})
