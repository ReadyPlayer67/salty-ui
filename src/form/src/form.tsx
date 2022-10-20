import {computed, defineComponent, provide} from "vue";
import {FormProps, formProps} from "./form-type";

export default defineComponent({
  name: 'SForm',
  props: formProps,
  setup(props: FormProps, {slots}) {
    const labelData = computed(() => ({
      layout: props.layout
    }))
    provide('LABEL_DATA', labelData)
    return () => {
      return (
        <div class="s-form">
          {slots.default?.()}
        </div>
      )
    }
  }
})
