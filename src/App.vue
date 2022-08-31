<script setup lang="ts">
const confirm = () => {
  console.log('confirm')
}
</script>

<template>
  <div style="margin: 50px auto;display: flex;justify-content: center">
    <SButton type="primary" size="large" disabled @click="confirm">确定</SButton>
    <SButton type="text" @click="confirm">确定</SButton>
    <SButton type="secondary" size="small" @click="confirm" block>确定</SButton>
  </div>

</template>

<style scoped>

</style>
