# 模态框 - Modal 

## 基础功能

:::demo

```vue
<template>
  <s-button @click="open">打开模态框</s-button>

  <s-modal v-model="visible" title="小贴士" :show-close="false" center>
    <span>这是一条消息！</span>
    <template #footer>
      <div class="dialog-footer">
        <s-button style="margin-right: 12px;" @click="visible = false">取消</s-button>
        <s-button @click="visible = false">确定</s-button>
      </div>
    </template>
  </s-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const open = () => {
      visible.value = true;
    }

    return {
      visible,
      open,
    }
  }
})
</script>

<style>
.dialog-footer {
  padding: 20px;
  text-align: right;
}
</style>
```
:::


## 自定义内容
通过插槽可以自定义Modal内容，一共有`header`，`default`，`footer`三个插槽可以使用。
:::demo

```vue
<template>
  <s-button @click="open">打开</s-button>
  <s-modal v-model="visible" title="Shipping address" width="50%">
    <table>
      <thead>
      <tr>
        <th>Date</th>
        <th>Name</th>
        <th>Address</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>2016-05-02</td>
        <td>John Smith</td>
        <td>No.1518, Jinshajiang Road, Putuo District</td>
      </tr>
      <tr>
        <td>2016-05-04</td>
        <td>John Smith</td>
        <td>No.1518, Jinshajiang Road, Putuo District</td>
      </tr>
      <tr>
        <td>2016-05-01</td>
        <td>John Smith</td>
        <td>No.1518, Jinshajiang Road, Putuo District</td>
      </tr>
      <tr>
        <td>2016-05-03</td>
        <td>John Smith</td>
        <td>No.1518, Jinshajiang Road, Putuo District</td>
      </tr>
      </tbody>
    </table>
  </s-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const open = () => {
      visible.value = true;
    }

    return {
      visible,
      open,
    }
  }
})
</script>
```
:::


## 自定义头部
通过插槽可以自定义Modal内容，一共有`header`，`default`，`footer`三个插槽可以使用。
:::demo

```vue
<template>
  <s-button @click="open">打开</s-button>

  <s-modal v-model="visible" :show-close="false" align-center>
    <template #header="{ close }">
      <div class="my-header">
        <h4>This is a custom header!</h4>
        <s-button type="danger" @click="close">
          Close
        </s-button>
      </div>
    </template>
    This is dialog content.
  </s-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const open = () => {
      visible.value = true;
    }

    return {
      visible,
      open,
    }
  }
})
</script>

<style>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-right: 16px;
  word-break: break-all;
}
</style>
```
:::
