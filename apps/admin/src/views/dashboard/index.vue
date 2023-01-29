<template>
  <div class="dashboard-container page-main">
    dashboard-container
    <a-button @click="handleError">弹窗</a-button>
  </div>
</template>

<script setup>
import { userStore } from '@/store'
import { useModal } from '@gm/hook'
const user = userStore()

const handleError = () => {
  useModal({ title: '测试', content: '测试通过!' + user.userInfo.userName })
}
</script>

<style lang="less" scoped>
</style>