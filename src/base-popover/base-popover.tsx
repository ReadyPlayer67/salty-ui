import { computePosition } from '@floating-ui/dom'
import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch
} from 'vue'
import './base-popover.scss'

export default defineComponent({
  name: 'SBasePopover',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    host: {
      type: Object as PropType<HTMLElement>,
      default: () => null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs }) {
    //获取属性中的关键值
    const { modelValue, host: hostRef } = toRefs(props)
    //浮动元素
    const overlayRef = ref()
    const updatePosition = () => {
      //计算定位
      computePosition(hostRef.value, overlayRef.value).then(({ x, y }) => {
        Object.assign(overlayRef.value.style, {
          left: x + 'px',
          top: y + 'px'
        })
      })
    }
    //在modelValue变化时重新计算浮层位置
    watch(
      modelValue,
      newVal => {
        if (newVal) {
          nextTick(updatePosition)
        }
      },
      {
        //初始化时先计算一次，防止初始化时modelValue就为true
        immediate: true
      }
    )
    return () => (
      <>
        {modelValue.value && (
          <div ref={overlayRef} class="s-base-popover" {...attrs}>
            {slots.default?.()}
          </div>
        )}
      </>
    )
  }
})
