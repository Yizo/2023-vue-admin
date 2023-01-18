<template>
  <div class="app-main">
    <Breadcrumb style="padding: 8px"></Breadcrumb>
    <div class="view-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index.vue'
</script>

<style lang="less" scoped>
.app-main {
  height: 100%;
  .view-wrapper {
    background: #fff;
    padding: 16px;
    height: 100%;
  }
}
</style>