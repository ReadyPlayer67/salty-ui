import {defineComponent, toRefs} from "vue";
import {TreeProps, treeProps} from "./tree-type";
import useTree from "./composables/use-tree";

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps) {
    const {data} = toRefs(props)
    const {expandedTree, toggleNode} = useTree(data)
    return () => {
      return (
        <div class="s-tree">{
          expandedTree.value.map(treeNode => (
            <div class="s-tree-node" style={{paddingLeft: `${24 * (treeNode.level - 1)}px`}}>
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
