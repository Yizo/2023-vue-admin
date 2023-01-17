<template>
  <div class="app-wrapper">
    <!-- 左侧 menu -->
    <sidebar
        id="guide-sidebar"
        class="sidebar-container"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>


<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
</script>

<style scoped>

</style>