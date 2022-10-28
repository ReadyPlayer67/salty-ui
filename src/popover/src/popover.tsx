import { defineComponent, nextTick, PropType, ref, toRefs, watch } from 'vue'
import { PopoverProps, popoverProps } from './popover-type'
import BasePopover from '../../base-popover/base-popover'

export default defineComponent({
  name: 'SPopover',
  props: popoverProps,
  emits: ['update:modelValue'],
  setup(props: PopoverProps, { slots }) {
    //获取属性中的关键值
    const { modelValue, title } = toRefs(props)
    //浮动元素
    const overlayRef = ref()
    return () => (
      <>
        {modelValue.value && (
          <BasePopover class="s-popover" {...props}>
            <h4 class="s-popover__title">{title.value}</h4>
            {slots.default?.()}
          </BasePopover>
        )}
      </>
    )
  }
})
