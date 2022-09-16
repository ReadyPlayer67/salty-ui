# 分页 - Pagination

## 基础功能

设置`total`属性来设置总条目数
:::demo

```vue

<template>
  <SPagination :total="100"></SPagination>
</template>
```
:::

## 使用案例
:::demo

```vue

<template>
  <div class="essays-container">
    <ul>
      <li v-for="article of articles" :href="`http://juejin.cn/post/${article.article_id}`" target="_blank">
        <div class="essay-list">
          <div class="first-line">
            <span class="title">{{ article.title }}</span>
          </div>
          <div class="infos">
            <span class="split-line"></span>
            <span>{{ article.view_count }}阅读</span>
            <span class="dot">·</span>
            <span>{{ article.digg_count }}点赞</span>
            <span class="dot">·</span>
            <span>{{ article.comment_count }}评论</span>
            <span class="dot">·</span>
            <span>{{ article.collect_count }}收藏</span>
          </div>
        </div>
      </li>
    </ul>
    
  </div>
  <!-- 使用我们的 Pagination 对文章进行分页-->
  <SPagination :total="sourceArticles.length" :pageSize="pageSize" v-model="pageIndex"/>
</template>
<script setup>
import {ref, computed, watch, onMounted} from 'vue'
// 文章数据来自掘金后台接口
const sourceArticles = ref([
  {
    article_id: "7037336504418435103",
    title: "1", // 标题
    collect_count: 151, // 收藏
    comment_count: 46, // 评论数
    ctime: "1638507790", // 创建时间
    digg_count: 161, // 点赞数
    view_count: 8561, // 阅读数
  },
  {
    article_id: "7037336504418435103",
    title: "2", // 标题
    collect_count: 151, // 收藏
    comment_count: 46, // 评论数
    ctime: "1638507790", // 创建时间
    digg_count: 161, // 点赞数
    view_count: 8561, // 阅读数
  },
  {
    article_id: "7037336504418435103",
    title: "3", // 标题
    collect_count: 151, // 收藏
    comment_count: 46, // 评论数
    ctime: "1638507790", // 创建时间
    digg_count: 161, // 点赞数
    view_count: 8561, // 阅读数
  },
  {
    article_id: "7037336504418435103",
    title: "4", // 标题
    collect_count: 151, // 收藏
    comment_count: 46, // 评论数
    ctime: "1638507790", // 创建时间
    digg_count: 161, // 点赞数
    view_count: 8561, // 阅读数
  },
  {
    article_id: "7037336504418435103",
    title: "5", // 标题
    collect_count: 151, // 收藏
    comment_count: 46, // 评论数
    ctime: "1638507790", // 创建时间
    digg_count: 161, // 点赞数
    view_count: 8561, // 阅读数
  }
])

const pageIndex = ref(1)
const pageSize = ref(2)

const articles = computed(() => {
  return sourceArticles.value.slice((pageIndex.value - 1) * pageSize.value, pageIndex.value * pageSize.value)
})
</script>
```
:::
