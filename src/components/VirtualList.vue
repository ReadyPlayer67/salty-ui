<template>
  <div class="s-virtual-list__container" @scroll="scrollEvent">
    <div class="s-virtual-list__blank" :style="{height:`${totalCount*itemHeight}px`}"></div>
    <div class="s-virtual-list" :style="{transform: `translate3d(0,${offsetY}px,0)`}">
      <!-- 实际的列表数据 -->
      <div v-for="(item,index) in visibleData" :key="index">Item {{item.value}}</div>
<!--      <div v-for="(item,index) in data" :key="index">Item {{item.value}}</div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
//静态值
//1.容器高度 containerHeight
//2.列表项高度 itemHeight
//动态值
//1.滚动条位置 scrollTop
import {computed, ref} from "vue";
import {MouseEvent, UIEvent} from "happy-dom";

const containerHeight = 300
const itemHeight = 24
//可视区域列表元素的数量
const visibleCount = Math.ceil(containerHeight / itemHeight)
//列表总数
const totalCount = 100000
//构建列表数据
const data = ref(Array.from({length: totalCount}).map((_, index) => ({value: index})))
//起始索引
const startIndex = ref(0)
//可视区域数据
const visibleData = computed(() => {
  return data.value.slice(startIndex.value, startIndex.value + visibleCount)
})
//列表在Y轴transform的偏移量
const offsetY = ref(0)
const scrollEvent = (event: Event) => {
  const {scrollTop} = event.target as HTMLElement
  //当scrollTop发生变化，重新计算startIndex，同时依赖startIndex的visibleData也就动态变化了
  //某个元素被遮挡了一半也是需要显示的，所以这里要向下取整
  startIndex.value = Math.floor(scrollTop / itemHeight)
  //改变列表偏移量，让s-virtual-list一直跟着视窗移动
  offsetY.value = scrollTop
}
</script>

<style scoped lang="scss">
.s-virtual-list {
  .item {
    height: 24px;
  }

  &__container {
    border: 3px solid palevioletred;
    width: 1000px;
    //height: 300px;
    overflow: auto;
    position: relative;
  }

  &__blank {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    //height: 10000px; // 列表项实际总高度：itemHeight * itemCount
  }

  & {
    transform: translate3d(0, 0, 0); // 中间的是列表区域在Y轴的偏移量，会跟随鼠标滚动实时变化
  }
}
</style>
