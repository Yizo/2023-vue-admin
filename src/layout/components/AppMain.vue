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
  flex: 1;
  padding: 0px 20px 20px;
  .view-wrapper {

  }
}
</style>