<script setup lang="ts">
import {generateInnerTree} from "./tree/src/utils";

const confirm = () => {
  console.log('confirm')
}
// const tree = [
//   {
//     label: 'docs',
//     id: 'docs',
//   },
//   {
//     label: 'packages',
//     id: 'packages',
//     expanded: true,
//     children: [
//       {
//         label: 'plugin-vue',
//         id: 'plugin-vue',
//       },
//       {
//         label: 'vite',
//         id: 'vite',
//         expanded: true,
//         children: [
//           {
//             label: 'src',
//             id: 'src',
//           },
//           {
//             label: 'README.md',
//             id: 'README.md',
//           },
//         ]
//       },
//     ]
//   },
//   {
//     label: 'scripts',
//     id: 'scripts',
//     children: [
//       {
//         label: 'release.ts',
//         id: 'release.ts',
//       },
//       {
//         label: 'verifyCommit.ts',
//         id: 'verifyCommit.ts',
//       },
//     ]
//   },
//   {
//     label: 'pnpm-workspace.yaml',
//     id: 'pnpm-workspace.yaml',
//   },
// ];
//
// console.log(generateInnerTree(tree))

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
