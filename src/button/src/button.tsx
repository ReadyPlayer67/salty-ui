import {defineComponent, toRefs} from "vue";
import {ButtonProps,buttonProps} from "./button-types";

export default defineComponent({
  name:'SButton',
  props:buttonProps,
  setup(props:ButtonProps,{slots}){
    const {type} = toRefs(props)
    return () => {
      //和渲染有关的内容尽量写到render函数中
      const defaultSlot = slots.default ? slots.default() : '按钮'
      return (
        <button class={`s-btn s-btn--${type.value}`}>
          {defaultSlot}
        </button>
      )
    }
  }
})
