import {computed, defineComponent, onMounted, ref, SetupContext, toRefs} from "vue";
import {VirtualListProps, virtualListProps} from "./virtual-list-type";

export default defineComponent({
  name: 'SVirtualList',
  props: virtualListProps,
  setup: function (props: VirtualListProps, {slots}: SetupContext) {
    const {data, itemHeight, component: Component} = toRefs(props)
    const containerRef = ref()
    const containerHeight = ref(0)
    //起始索引
    const startIndex = ref(0)
    //可视区域列表元素的数量
    const visibleCount = computed(() => {
      return Math.ceil(containerHeight.value / itemHeight.value)
    })
    //可视区域数据
    const visibleData = computed(() => {
      return data.value.slice(startIndex.value, Math.min( startIndex.value + visibleCount.value,data.value.length))
      // return data.value.slice(startIndex.value, startIndex.value + visibleCount.value)
    })
    onMounted(() => {
      //实现高度自适应
      containerHeight.value = containerRef.value.clientHeight
    })
    //列表在Y轴transform的偏移量
    const offsetY = ref(0)
    const scrollEvent = (event: UIEvent) => {
      const {scrollTop} = event.target as HTMLElement
      //当scrollTop发生变化，重新计算startIndex，同时依赖startIndex的visibleData也就动态变化了
      //某个元素被遮挡了一半也是需要显示的，所以这里要向下取整
      startIndex.value = Math.floor(scrollTop / itemHeight.value)
      //改变列表偏移量，让s-virtual-list一直跟着视窗移动
      offsetY.value = scrollTop - (scrollTop % itemHeight.value)
    }
    return () => {
      return (
        <div class="s-virtual-list__container" ref={containerRef} onScroll={scrollEvent}>
          <div class="s-virtual-list__blank" style={{height: `${data.value.length * itemHeight.value}px`}}></div>
          <div class="s-virtual-list" style={{transform: `translate3d(0,${offsetY.value}px,0)`}}>
            {
              visibleData.value.map((item, index) => (
                slots.default?.({item, index})
              ))
            }
          </div>
        </div>
      )
    }
  }
})
