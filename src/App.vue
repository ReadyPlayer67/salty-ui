<script setup lang="ts">
import SBaseModal from './modal/src/base-modal'
import { ref } from 'vue'
import SBasePopover from './base-popover/base-popover'
import SPopover from './popover/src/popover'

const visible = ref(false)
const open = () => {
  visible.value = !visible.value
}
const host = ref()
</script>
<template>
  <div>
    <!--    <virtual-list/>-->
    <!-- <button @click="open">打开</button>
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
    </s-base-modal> -->
    <div ref="host" class="host" style="border: 1px solid red" @click="open">
      host
    </div>
    <!-- <s-base-popover v-model="visible" :host="host">overlay</s-base-popover> -->
    <s-popover v-model="visible" :host="host" title="title">overlay</s-popover>
  </div>
</template>

<style scoped></style>
