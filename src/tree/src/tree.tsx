
import {defineComponent, toRefs} from "vue";
import {treeProps, treeProps from "./tree-type";

export default defineComponent({
  name: 'Stree',
  props: treeProps,
  setup(props: treeProps) {
    const {type, size, disabled, block} = toRefs(props)
    return () => {
      return (
        <div class="s-tree"></div>
      )
    }
  }
})
  
