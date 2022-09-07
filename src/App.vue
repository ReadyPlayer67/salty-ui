<script setup lang="ts">
import {generateInnerTree} from "./tree/src/utils";
import STree from "./tree/src/tree";
import {ref} from "vue";

const confirm = () => {
  console.log('confirm')
}
const tree = ref([
  {
    label: 'docs',
    id: 'docs',
  },
  {
    label: 'packages',
    id: 'packages',
    expanded: true,
    children: [
      {
        label: 'plugin-vue',
        id: 'plugin-vue',
      },
      {
        label: 'vite',
        id: 'vite',
        expanded: true,
        children: [
          {
            label: 'src',
            id: 'src',
          },
          {
            label: 'README.md',
            id: 'README.md',
          },
        ]
      },
    ]
  },
  {
    label: 'scripts',
    id: 'scripts',
    expanded: true,
    children: [
      {
        label: 'release.ts',
        id: 'release.ts',
      },
      {
        label: 'verifyCommit.ts',
        id: 'verifyCommit.ts',
      },
    ]
  },
  {
    label: 'pnpm-workspace.yaml',
    id: 'pnpm-workspace.yaml',
  },
])

</script>

<template>
  <div style="margin: 50px auto;display: flex;justify-content: center">
    <STree :data="tree"/>
  </div>

</template>

<style scoped>

</style>
