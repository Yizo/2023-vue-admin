<template>
<div class="user-info">
  <a-popover>
    <template #content>
      <a><poweroff-outlined style="margin-right: 6px"/>退出登录</a>
    </template>
    <span class="user-btn">
      {{ userInfo?.userName }}</span>
  </a-popover>
</div>
</template>

<script lang="ts">
export default {
  name: "user"
}
</script>

<script setup lang="ts">
import { PoweroffOutlined } from '@ant-design/icons-vue'
import {  userStore } from '@/store'

const store = userStore()

const userInfo = store.$state.userInfo
</script>

<style lang="less" scoped>
.user-info {
  .user-btn {
    cursor: pointer;
    font-size: 16px;
  }
}
</style>