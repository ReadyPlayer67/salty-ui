import {computed, defineComponent, provide} from "vue";
import {FormProps, formProps} from "./form-type";

export default defineComponent({
  name: 'SForm',
  props: formProps,
  setup(props: FormProps, {slots}) {
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign
    }))
    //这里把form上的props用provide-inject传给formItem使用而不是用props
    //原因是formItem是用户自己写的slots，不确定是不是form的子组件，有可能中间间隔了很多div
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
