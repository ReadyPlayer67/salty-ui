import {defineComponent, toRefs} from "vue";
import {PopoverProps, popoverProps} from "./popover-type";

export default defineComponent({
  name: 'SPopover',
  props: popoverProps,
  setup(props: PopoverProps) {
    return () => {
      return (
        <div class="s-popover"></div>
      )
    }
  }
})
