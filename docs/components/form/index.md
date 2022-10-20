# 表单 - Form

## 基础功能

传入model属性设置数据模型

:::demo

```vue

<template>
  <SForm :model="model" layout="horizontal">
    <SFormItem label="用户名: ">
      <input/>
    </SFormItem>
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
