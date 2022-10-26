# Icon - 图标

## 基本用法
设置图标字体中name或者远程资源地址
:::demo
```vue
<template>
  <s-icon name="vue"></s-icon>
  <s-icon name="https://vitejs.dev/logo.svg" width="30"></s-icon>
</template>
```
:::

## 尺寸
设置`size`属性可以设置图标尺寸
:::demo
```vue
<template>
  <s-icon name="vue" size="30px"></s-icon>
  <s-icon name="react" :size="30"></s-icon>
</template>
```
:::

## 颜色
设置`color`属性可以设置图标颜色
:::demo
```vue
<template>
  <s-icon name="vue" size="30px" color="green"></s-icon>
  <s-icon name="react" :size="30" color="blue"></s-icon>
</template>
```
:::
