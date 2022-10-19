import {defineComponent, toRefs} from "vue";
import {FormProps, formProps} from "./form-type";

export default defineComponent({
  name: 'SForm',
  props: formProps,
  setup(props: FormProps,{slots}) {
    return () => {
      return (
        <div class="s-form">{slots.default?.()}</div>
      )
    }
  }
})
