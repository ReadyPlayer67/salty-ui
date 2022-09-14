<script setup lang="ts">
import {generateInnerTree} from "./tree/src/utils";
import {ref} from "vue";
import VirtualList from "./components/VirtualList.vue";

</script>

<template>
  <div style="margin: 50px auto;display: flex;justify-content: center">
    <virtual-list/>
  </div>

</template>

<style scoped>

</style>
