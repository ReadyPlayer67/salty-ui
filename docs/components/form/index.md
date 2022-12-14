# 表单 - Form

## 基础功能

传入model属性设置数据模型

:::demo

```vue

<template>
  <SForm :model="model">
    <SFormItem label="用户名: ">
      <SInput v-model="model.user"/>
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

## 表单样式
水平排列模式下，label-size可以设置label的宽度；label-align可以设置label的对齐方式。
label-size提供sm、md、lg三种大小，分别对应80px、100px、150px，默认为md；label-align可选值为start、center、end，默认为start。

:::demo

```vue

<template>
  <p>
    <span style="font-size:14px">labelSize:</span>
    <label>
      <input type="radio" value="sm" v-model="labelSize"/>
      sm
    </label>
    <label>
      <input type="radio" value="md" v-model="labelSize"/>
      md
    </label>
    <label>
      <input type="radio" value="lg" v-model="labelSize"/>
      lg
    </label>
  </p>
  <p>
    <span style="font-size:14px">labelAlign:</span>
    <label>
      <input type="radio" value="start" v-model="labelAlign"/>
      start
    </label>
    <label>
      <input type="radio" value="center" v-model="labelAlign"/>
      center
    </label>
    <label>
      <input type="radio" value="end" v-model="labelAlign"/>
      end
    </label>
  </p>
  <s-form :model="model" layout="horizontal" :labelAlign="labelAlign" :labelSize="labelSize">
    <s-form-item label="用户名：">
      <SInput/>
    </s-form-item>
    <s-form-item label="密码：">
      <SInput type="password"/>
    </s-form-item>
  </s-form>
  {{model}}
</template>
<script setup>
import {ref} from 'vue'

const model = ref({
  user: 'tom',
  password: ''
})
const labelSize = ref('md')
const labelAlign = ref('start')
</script>
```
:::

## 表单校验

:::demo

```vue

<template>
  <s-form
      :model="model"
      :rules="rules"
      layout="horizontal"
      @submit="onLogin"
      ref="loginForm"
  >
    <s-form-item label="用户名：" field="user">
      <s-input v-model="model.user"/>
    </s-form-item>
    <s-form-item label="密码：" field="pwd">
      <s-input type="password" v-model="model.pwd"/>
    </s-form-item>
    <s-form-item>
      <SButton>登录</SButton>
    </s-form-item>
  </s-form>
</template>
<script setup>
import {ref} from 'vue'

const model = ref({
  user: '',
  pwd: ''
})
const rules = ref({
  user: [{required: true, message: '用户名为必填项'}],
  pwd: [{required: true, message: '密码为必填项'}],
})

const loginForm = ref(null)
const onLogin = () => {
  loginForm.value.validate(valid => {
    if (valid) {
      alert('登录成功')
    } else {
      alert('校验失败，请重试！')
    }
  })
}
</script>
```
:::
