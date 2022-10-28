module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  //用vue-eslint-parser去解析.vue文件中<template>中的代码
  parser: 'vue-eslint-parser',
  parserOptions: {
    //用@typescript-eslint/parser去解析.vue文件中<script>中的代码
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}
