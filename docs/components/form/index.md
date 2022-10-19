# 表单 - Form

## 基础功能

传入model属性设置数据模型

:::demo
```vue

<template>
  <SForm :model="model">

  </SForm>
  {{ model }}
</template>
<script setup>
import {ref} from 'vue'
const model = ref({
  user: 'tom'
})
</script>
```
:::
