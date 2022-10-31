# Popover - 弹出框

## 基础用法
通过`host`属性建立宿主与浮层之间的绑定关系
:::demo
```vue
<template>
  <div>
    <s-button ref="host" @click="open">host</s-button>
    <s-popover v-model="visible" :host="host" title="title" show-arrow>overlay</s-popover>
  </div>
 
</template>
<script setup>
import { ref } from 'vue'

const visible = ref(false)
const open = () => {
  visible.value = !visible.value
}
const host = ref()
</script>
```
:::

## 显示位置
通过设置`placement`属性控制浮层的展示位置
:::demo
```vue
<template>
  <div style="display:flex;justify-content: space-around;">
    <s-button ref="host1" @click="visible1=!visible1">host</s-button>
    <s-popover v-model="visible1" :host="host1" title="title" show-arrow  placement="top">overlay1</s-popover>
    <s-button ref="host2" @click="visible2=!visible2">host</s-button>
    <s-popover v-model="visible2" :host="host2" title="title" show-arrow  placement="bottom">overlay2</s-popover>
    <s-button ref="host3" @click="visible3=!visible3">host</s-button>
    <s-popover v-model="visible3" :host="host3" title="title" show-arrow  placement="left">overlay3</s-popover>
    <s-button ref="host4" @click="visible4=!visible4">host</s-button>
    <s-popover v-model="visible4" :host="host4" title="title" show-arrow  placement="right">overlay4</s-popover>
  </div>
 
</template>
<script setup>
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)

const host1 = ref()
const host2 = ref()
const host3 = ref()
const host4 = ref()
</script>
```
:::

