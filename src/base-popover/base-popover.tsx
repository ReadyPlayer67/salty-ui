import {
  computePosition,
  arrow,
  offset,
  Placement,
  autoPlacement
} from '@floating-ui/dom'
import {
  DefineComponent,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
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
      type: Object as PropType<HTMLElement | DefineComponent>,
      default: () => null
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs }) {
    //获取属性中的关键值
    const { modelValue, host, showArrow, placement } = toRefs(props)
    //这里要做一个兼容处理，因为宿主元素可能是一个组件也可能是一个element，如果是组件要通过$el属性获取他的dom节点
    const hostRef =
      host.value instanceof HTMLElement ? host.value : host.value.$el
    //箭头元素
    const arrowRef = ref()
    //浮动元素
    const overlayRef = ref()
    const updatePosition = () => {
      const middleware = []
      //如果设置了showArrow就添加offset,arrow中间件
      if (showArrow.value) {
        middleware.push(offset(8))
        middleware.push(arrow({ element: arrowRef.value }))
      }
      //如果用户没有指定placement，则自动调整定位
      if (!placement.value) {
        middleware.push(autoPlacement())
      }
      //计算定位
      computePosition(hostRef, overlayRef.value, {
        middleware,
        placement: placement.value || 'bottom'
      }).then(({ x, y, middlewareData, placement }) => {
        //设置浮层样式
        Object.assign(overlayRef.value.style, {
          left: x + 'px',
          top: y + 'px'
        })
        if (showArrow.value) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow!
          //获取当前浮层所在位置
          const currentSide = placement.split('-')[0]
          //获取箭头定位位置
          const statcSide = {
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left'
          }[currentSide]
          //获取正确显示箭头应当隐藏的border
          const SIDE = ['top', 'right', 'bottom', 'left']
          const prevIndex = SIDE.indexOf(currentSide) - 1
          const nextSide = SIDE[prevIndex < 0 ? SIDE.length - 1 : prevIndex]
          //设置箭头样式
          Object.assign(arrowRef.value.style, {
            left: arrowX + 'px',
            top: arrowY + 'px',
            [statcSide!]: '-4px',
            [`border-${currentSide}-color`]: 'transparent',
            [`border-${nextSide}-color`]: 'transparent'
          })
        }
      })
    }
    //创建mutationObserver监听宿主元素的状态变化
    const mutationObserver = new MutationObserver(() => updatePosition())
    //在modelValue变化时重新计算浮层位置
    watch(
      modelValue,
      newVal => {
        if (newVal) {
          nextTick(updatePosition)
          //监听页面resize，scroll事件和host元素的尺寸，定位变化
          hostRef && mutationObserver.observe(hostRef, { attributes: true })
          window.addEventListener('resize', updatePosition)
          window.addEventListener('scroll', updatePosition)
        } else {
          //浮层销毁时要同时销毁mutationObserver和事件监听
          mutationObserver.disconnect()
          window.removeEventListener('resize', updatePosition)
          window.removeEventListener('scroll', updatePosition)
        }
      },
      {
        //初始化时先计算一次，防止初始化时modelValue就为true
        immediate: true
      }
    )
    onUnmounted(() => {
      mutationObserver.disconnect()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    })
    return () => (
      <>
        {modelValue.value && (
          <div ref={overlayRef} class="s-base-popover" {...attrs}>
            {/* 弹窗内容 */}
            {slots.default?.()}
            {/* 箭头元素 */}
            {showArrow.value && (
              <div class="s-base-popover__arrow" ref={arrowRef}></div>
            )}
          </div>
        )}
      </>
    )
  }
})
