<script setup lang="ts">
import SBaseModal from './modal/src/base-modal'
import { ref } from 'vue'

const visible = ref(false)
const open = () => {
  visible.value = true
}
</script>
<template>
  <div style="margin: 50px auto; display: flex; justify-content: center">
    <!--    <virtual-list/>-->
    <button @click="open">打开</button>
    <s-base-modal v-model="visible">
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
        "
      >
        <img
          style="width: 100px"
          src="http://element-plus.org/images/element-plus-logo.svg"
        />
      </div>
    </s-base-modal>
  </div>
</template>

<style scoped></style>
