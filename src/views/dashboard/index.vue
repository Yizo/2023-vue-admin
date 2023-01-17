<template>
  <div class="dashboard-container">
    dashboard-container
    <a-button @click="handleError">弹窗</a-button>
  </div>
</template>

<script setup>
import { userStore } from '@/store'
import { useModal } from '@/hook'
const user = userStore()
console.log(user.userInfo)

const handleError = () => {
  useModal({ title: '测试', content: '测试不通过!' })
}
</script>

<style lang="scss" scoped>

</style>