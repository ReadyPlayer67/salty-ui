# 按钮 - Button

### 基本用法

使用`SButton`创建一个按钮，支持`type`、`size`属性
:::demo
  ```vue

<template>
  <div style="display: flex;gap: 8px 12px;margin-bottom: 10px">
    <SButton type="primary"></SButton>
    <SButton type="secondary"></SButton>
    <SButton type="text"></SButton>
  </div>
  <div style="display: flex;gap: 8px 12px;margin-bottom: 10px">
    <SButton size="large" type="primary"></SButton>
    <SButton size="large" type="secondary"></SButton>
    <SButton size="large" type="text"></SButton>
  </div>
  <div style="display: flex;gap: 8px 12px">
    <SButton size="small" type="primary"></SButton>
    <SButton size="small" type="secondary"></SButton>
    <SButton size="small" type="text"></SButton>
  </div>
</template>
  ```
:::

