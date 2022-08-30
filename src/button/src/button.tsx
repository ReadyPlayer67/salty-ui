import {defineComponent, toRefs} from "vue";
import {ButtonProps,buttonProps} from "./button-types";

export default defineComponent({
  name:'SButton',
  props:buttonProps,
  setup(props:ButtonProps,{slots}){
    const {type,size,disabled} = toRefs(props)
    return () => {
      //和渲染有关的内容尽量写到render函数中
      const defaultSlot = slots.default ? slots.default() : '按钮'
      return (
        <button disabled={disabled.value} class={`s-btn s-btn--${type.value} s-btn--${size.value}`}>
          {defaultSlot}
        </button>
      )
    }
  }
})
