import {defineComponent, toRefs} from "vue";
import {TreeProps, treeProps} from "./tree-type";
import useTree from "./composables/use-tree";

const NODE_HEIGHT = 28
const NODE_INDENT = 24

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps) {
    const {data} = toRefs(props)
    const {expandedTree, toggleNode, getChildren} = useTree(data)
    return () => {
      return (
        <div class="s-tree">{
          expandedTree.value.map(treeNode => (
            <div class="s-tree-node hover:bg-slate-100 relative leading-8"
                 style={{paddingLeft: `${NODE_INDENT * (treeNode.level - 1)}px`}}>
              {/*连接线*/}
              {
                !treeNode.isLeaf && treeNode.expanded && (
                  <span class="s-tree-node_vline absolute w-px bg-gray-300" style={{
                    height: `${NODE_HEIGHT * getChildren(treeNode).length}px`,
                    left: `${NODE_INDENT * (treeNode.level-1) + 12}px`,
                    top: `${NODE_HEIGHT}px`
                  }}></span>
                )
              }
              {/*折叠图标*/}
              {treeNode.isLeaf ?
                <span style={{display: 'inline-block', width: '25px'}}></span> :
                <svg onClick={() => toggleNode(treeNode)} style={{
                  width: '25px',
                  height: '15px',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transform: treeNode.expanded ? 'rotate(90deg)' : ''
                }} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
                </svg>
              }
              {treeNode.label}
            </div>
          ))
        }</div>
      )
    }
  }
})
