import {defineComponent, toRefs} from "vue";
import {TreeProps, treeProps} from "./tree-type";

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps) {
    const {data: innerData} = toRefs(props)
    return () => {
      return (
        <div class="s-tree">{
          innerData.value.map(treeNode => treeNode.label)
        }</div>
      )
    }
  }
})
