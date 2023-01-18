<template>
  <div class="sidebar-container">
    <Menu :data="data" class="my-sidebar"></Menu>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Menu from './menu.vue'
import { generateRoutes } from '@/router'

const data = ref([])
data.value = generateRoutes()

</script>

<style lang="less" scoped>
:deep(.ant-menu-sub.ant-menu-inline) {
  background-color: #fff !important;
}
.sidebar-container {
  overflow-y: hidden;
  height: 100%;
  :deep(.my-sidebar) {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }
}
</style>
